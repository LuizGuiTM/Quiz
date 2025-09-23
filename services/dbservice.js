import * as SQLite from 'expo-sqlite/next'; 


export async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbUsuarios.db');
    return cx;
}


export async function createTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbUsuarios
        (
            codigo INTEGER not null primary key,
            nome TEXT not null,
            email TEXT not null,
            senha TEXT not null
        )`;
    var cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
};


export async function obtemTodosUsuarios() {
    var retorno = [];
    var dbCx = await getDbConnection();
    const registros = await dbCx.getAllAsync('SELECT * FROM tbUsuarios');
    await dbCx.closeAsync();
    for (const registro of registros) {
        let obj = {
            codigo: registro.codigo,
            nome: registro.nome,
            email: registro.email
        };
        retorno.push(obj);
    }
    return retorno;
}


export async function adicionaUsuario(usuario) {
    let dbCx = await getDbConnection();
    let query = 'insert into tbUsuarios (codigo, nome, email, senha) values (?,?,?,?)';
    const result = await dbCx.runAsync(query, [usuario.codigo, usuario.nome, usuario.email, usuario.senha]);
    await dbCx.closeAsync();
    return result.changes == 1;
}


export async function alteraUsuario(usuario) {
    let dbCx = await getDbConnection();
    let query = 'update tbUsuarios set nome=?, email=?, senha=? where codigo=?';
    const result = await dbCx.runAsync(query, [usuario.nome, usuario.email, usuario.senha, usuario.codigo]);
    await dbCx.closeAsync();
    return result.changes == 1;
}


export async function excluiUsuario(codigo) {
    let dbCx = await getDbConnection();
    let query = 'delete from tbUsuarios where codigo=?';
    const result = await dbCx.runAsync(query, codigo);
    await dbCx.closeAsync();
    return result.changes == 1;
}


export async function excluiTodosUsuarios() {
    let dbCx = await getDbConnection();
    let query = 'delete from tbUsuarios';
    await dbCx.execAsync(query);
    await dbCx.closeAsync();
}
