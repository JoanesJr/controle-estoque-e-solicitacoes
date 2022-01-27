function Modelo(connection) {
    this._connection = connection;
}

Modelo.prototype.salvar = function(modelo, callback) {
    this._connection.query("INSERT INTO tb_modelos SET ?", modelo, callback);
}

Modelo.prototype.getAll = function(callback) {
    this._connection.query("SELECT m.id, m.nome, c.id as categoria_id, c.nome as categoria_nome FROM tb_modelos AS m INNER JOIN tb_categorias as c ON m.categoria = c.id", callback);
} 

Modelo.prototype.getPaginacao = function(limit, callback) {
    this._connection.query(`SELECT m.id, m.nome, c.id as categoria_id, c.nome as categoria_nome FROM tb_modelos AS m INNER JOIN tb_categorias as c ON m.categoria = c.id LIMIT ${limit.inicio}, ${limit.final}`, callback);
};

Modelo.prototype.getCount = function(callback) {
    this._connection.query("SELECT count(*) as num_rows from tb_modelos", callback);
};


Modelo.prototype.excluir = function(id, callback) {
    this._connection.query(`DELETE FROM tb_modelos WHERE id = ${id.id}`, callback);
}

Modelo.prototype.getmodelo = function (id, callback) {
    this._connection.query(`SELECT * FROM tb_modelos WHERE id = ${id.id}`, callback);
}

Modelo.prototype.editar = function (form, callback) {
    this._connection.query(`UPDATE tb_modelos SET nome = '${form.nome}', categoria = ${form.categoria} WHERE id = ${form.id} `, callback);
}

Modelo.prototype.getModeloCategoria = function(categoria, callback) {
    this._connection.query(`SELECT id, nome as nome_modelo, categoria FROM tb_modelos WHERE categoria = ${categoria}`, callback);
}

module.exports = function () {
    return Modelo;
}