function UnidadeMedida(connection) {
    this._connection = connection;
}

UnidadeMedida.prototype.getAll = function(callback) {
    this._connection.query("SELECT * FROM tb_unidade_medida", callback);
}

UnidadeMedida.prototype.salvar = function(unidadeMedida, callback) {
    this._connection.query("INSERT INTO tb_unidade_medida SET ?", unidadeMedida, callback);
}

UnidadeMedida.prototype.excluir = function(id, callback) {
    this._connection.query(`DELETE FROM tb_unidade_medida WHERE id = ${id.id}`, callback);
}

UnidadeMedida.prototype.getUnidadeMedida = function (id, callback) {
    this._connection.query(`SELECT * FROM tb_unidade_medida WHERE id = ${id.id}`, callback);
}

UnidadeMedida.prototype.editar = function (form, callback) {
    this._connection.query(`UPDATE tb_unidade_medida SET nome = '${form.nome}' WHERE id = ${form.id} `, callback);
}

module.exports = function() {
    return UnidadeMedida;
}