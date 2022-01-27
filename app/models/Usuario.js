const md5 = require('md5');

function Usuario(connection) {
    this._connection = connection;
}

Usuario.prototype.criarUsuario = function(usuario, callback) {
    usuario.senha = md5(usuario.senha);
    this._connection.query("INSERT INTO tb_usuarios SET ?", usuario, callback);
}

Usuario.prototype.validacao = function(usuario, callback) {
    usuario.senha = md5(usuario.senha);
    this._connection.query(`SELECT id, nome, usuario, senha, cargo FROM tb_usuarios WHERE usuario = '${usuario.usuario}' AND senha = '${usuario.senha}'`, callback);
}

Usuario.prototype.autenticarAdministrador = function(administrador, callback) {
    administrador.senha = md5(administrador.senha);
    this._connection.query(`SELECT id, nome, usuario, senha, cargo FROM tb_usuarios WHERE usuario = '${administrador.usuario}' AND senha = '${administrador.senha}' AND cargo = 'Administrador'`, callback);
}

Usuario.prototype.getAll = function(usuario, callback) {
    this._connection.query(`SELECT id, nome, usuario, senha, cargo, date_format(data_criacao, '%d/%m/%Y') as data_criacao FROM tb_usuarios WHERE usuario <> '${usuario}' ORDER BY nome ASC`, callback);
}

Usuario.prototype.excluir = function(id, callback) {
    this._connection.query(`DELETE FROM tb_usuarios WHERE id = ${id}`, callback);
}

module.exports = function() {
    return Usuario;
};