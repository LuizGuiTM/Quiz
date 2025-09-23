
import * as SQLite from 'expo-sqlite/next';

export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbQuiz.db');
    return cx;
}

export async function createTables() {
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
    var cx = await getDbConnection();
    for (const query of queries) {
        await cx.execAsync(query);
    }
    await cx.closeAsync();
}

// Temas
export async function adicionaTema(nome) {
    let dbCx = await getDbConnection();
    let query = 'INSERT INTO temas (nome) VALUES (?)';
    const result = await dbCx.runAsync(query, [nome]);
    await dbCx.closeAsync();
    return result.changes == 1;
}

export async function obtemTodosTemas() {
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM temas');
    await dbCx.closeAsync();
    return registros;
}

// Perguntas
export async function adicionaPergunta(texto, tema_id) {
    let dbCx = await getDbConnection();
    let query = 'INSERT INTO perguntas (texto, tema_id) VALUES (?, ?)';
    const result = await dbCx.runAsync(query, [texto, tema_id]);
    let perguntaId = result.lastInsertRowid;
    // Fallback: se não veio o id, buscar o último id inserido
    if (!perguntaId) {
        const rows = await dbCx.getAllAsync('SELECT id FROM perguntas ORDER BY id DESC LIMIT 1');
        perguntaId = rows.length > 0 ? rows[0].id : null;
    }
    await dbCx.closeAsync();
    return perguntaId;
}

export async function obtemPerguntasPorTema(tema_id) {
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM perguntas WHERE tema_id = ?', [tema_id]);
    await dbCx.closeAsync();
    return registros;
}

// Alternativas
export async function adicionaAlternativa(texto, correta, pergunta_id) {
    let dbCx = await getDbConnection();
    let query = 'INSERT INTO alternativas (texto, correta, pergunta_id) VALUES (?, ?, ?)';
    const result = await dbCx.runAsync(query, [texto, correta ? 1 : 0, pergunta_id]);
    await dbCx.closeAsync();
    return result.changes == 1;
}

export async function obtemAlternativasPorPergunta(pergunta_id) {
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM alternativas WHERE pergunta_id = ?', [pergunta_id]);
    await dbCx.closeAsync();
    return registros;
}
