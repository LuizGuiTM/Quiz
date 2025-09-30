import * as SQLite from 'expo-sqlite/next';

async function closeConnection(cx) {
    if (cx) {
        try {
            await cx.closeAsync();
        } catch (error) {
            console.log('Erro ao fechar conexão:', error);
        }
    }
}

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

export async function createTables() {
    let cx = null;
    try {
        const queries = [
            `CREATE TABLE IF NOT EXISTS temas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE
            )`,
            `CREATE TABLE IF NOT EXISTS perguntas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                texto TEXT NOT NULL,
                tema_id INTEGER NOT NULL,
                FOREIGN KEY (tema_id) REFERENCES temas(id)
            )`,
            `CREATE TABLE IF NOT EXISTS alternativas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                texto TEXT NOT NULL,
                correta INTEGER NOT NULL,
                pergunta_id INTEGER NOT NULL,
                FOREIGN KEY (pergunta_id) REFERENCES perguntas(id)
            )`
        ];
        cx = await getDbConnection();
        for (const query of queries) {
            await cx.execAsync(query);
        }
    } finally {
        await closeConnection(cx);
    }
}

// Temas
export async function adicionaTema(nome) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        let query = 'INSERT INTO temas (nome) VALUES (?)';
        const result = await dbCx.runAsync(query, [nome]);
        return result.changes == 1;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function obtemTodosTemas() {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM temas');
        return registros;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function obtemTemaPorId(id) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM temas WHERE id = ?', [id]);
        return registros.length ? registros[0] : null;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function atualizaTema(id, novoNome) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        const result = await dbCx.runAsync('UPDATE temas SET nome = ? WHERE id = ?', [novoNome, id]);
        return result.changes === 1;
    } finally {
        await closeConnection(dbCx);
    }
}

// Perguntas
export async function adicionaPergunta(texto, tema_id) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        let query = 'INSERT INTO perguntas (texto, tema_id) VALUES (?, ?)';
        const result = await dbCx.runAsync(query, [texto, tema_id]);
        let perguntaId = result.lastInsertRowid;
        // Fallback: se não veio o id, buscar o último id inserido
        if (!perguntaId) {
            const rows = await dbCx.getAllAsync('SELECT id FROM perguntas ORDER BY id DESC LIMIT 1');
            perguntaId = rows.length > 0 ? rows[0].id : null;
        }
        return perguntaId;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function obtemPerguntasPorTema(tema_id, dbCxParam = null) {
    let dbCx = dbCxParam;
    let shouldClose = false;
    if (!dbCx) {
        dbCx = await getDbConnection();
        shouldClose = true;
    }
    try {
        const registros = await dbCx.getAllAsync('SELECT * FROM perguntas WHERE tema_id = ?', [tema_id]);
        return registros;
    } finally {
        if (shouldClose) await closeConnection(dbCx);
    }
}

export async function obtemPerguntaPorId(id) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM perguntas WHERE id = ?', [id]);
        return registros.length ? registros[0] : null;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function atualizaPergunta(id, novoTexto, novoTemaId) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        const result = await dbCx.runAsync('UPDATE perguntas SET texto = ?, tema_id = ? WHERE id = ?', [novoTexto, novoTemaId, id]);
        return result.changes === 1;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function removeTema(id) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        // Primeiro, remove todas as alternativas das perguntas deste tema
        const perguntas = await obtemPerguntasPorTema(id, dbCx);
        for (const pergunta of perguntas) {
            await dbCx.execAsync('DELETE FROM alternativas WHERE pergunta_id = ' + pergunta.id);
        }
        // Depois remove as perguntas
        await dbCx.execAsync('DELETE FROM perguntas WHERE tema_id = ' + id);
        // Por fim, remove o tema
        const result = await dbCx.runAsync('DELETE FROM temas WHERE id = ?', [id]);
        return result.changes === 1;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function obtemAlternativasPorPergunta(pergunta_id) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        const registros = await dbCx.getAllAsync('SELECT * FROM alternativas WHERE pergunta_id = ?', [pergunta_id]);
        return registros;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function removeAlternativasPorPergunta(pergunta_id) {
    const dbCx = await getDbConnection();
    const result = await dbCx.runAsync('DELETE FROM alternativas WHERE pergunta_id = ?', [pergunta_id]);
    return result.changes; 
}

export async function listarPerguntas() {
    const dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync(`
        SELECT p.id, p.texto, p.tema_id, t.nome as tema_nome
        FROM perguntas p
        JOIN temas t ON t.id = p.tema_id
        ORDER BY p.id DESC
    `);
    return registros;
}


export async function atualizaAlternativas(pergunta_id, alternativas) {
    const dbCx = await getDbConnection();
    try {
        await dbCx.execAsync('BEGIN TRANSACTION');
        await dbCx.runAsync('DELETE FROM alternativas WHERE pergunta_id = ?', [pergunta_id]);
        for (const alt of alternativas) {
            await dbCx.runAsync('INSERT INTO alternativas (texto, correta, pergunta_id) VALUES (?, ?, ?)', [alt.texto, alt.correta ? 1 : 0, pergunta_id]);
        }
        await dbCx.execAsync('COMMIT');
        return true;
    } catch (e) {
        try { await dbCx.execAsync('ROLLBACK'); } catch(_) {}
        throw e;
    }
}

export async function adicionaAlternativa(texto, correta, pergunta_id) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        let query = 'INSERT INTO alternativas (texto, correta, pergunta_id) VALUES (?, ?, ?)';
        const result = await dbCx.runAsync(query, [texto, correta ? 1 : 0, pergunta_id]);
        return result.changes == 1;
    } finally {
        await closeConnection(dbCx);
    }
}

export async function removePergunta(id) {
    let dbCx = null;
    try {
        dbCx = await getDbConnection();
        await dbCx.runAsync('DELETE FROM alternativas WHERE pergunta_id = ?', [id]);
        const result = await dbCx.runAsync('DELETE FROM perguntas WHERE id = ?', [id]);
        return result.changes === 1;
    } catch (e) {
        console.log('Erro ao remover pergunta:', e);
        throw e;
    } finally {
        await closeConnection(dbCx);
    }
}
