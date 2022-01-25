function Local(connection) {
    this._connection = connection;
};

Local.prototype.getAll = function(callback) {
    this._connection.query("SELECT * FROM tb_locais ORDER BY nome ASC", callback);
};

Local.prototype.salvar = function(local, callback) {
    this._connection.query("INSERT INTO tb_locais SET ?", local, callback);
};

Local.prototype.getLocal = function(id, callback) {
    this._connection.query(`SELECT * FROM tb_locais WHERE id = '${id.id}'`, callback);
};

Local.prototype.editar = function(form, callback) {
    this._connection.query(`UPDATE tb_locais SET nome = '${form.nome}' WHERE id = ${form.id} `, callback);
};


Local.prototype.excluir = function(id, callback) {
    this._connection.query(`DELETE FROM tb_locais WHERE id = ${id.id}`, callback);
}

module.exports = function() {
    return Local;
};