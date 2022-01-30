function Categoria(connection) {
    this._connection = connection;
}

Categoria.prototype.salvar = function(categoria, callback) {
    this._connection.query("INSERT INTO tb_categorias SET ?", categoria, callback);
}

Categoria.prototype.getAll = function(callback) {
    this._connection.query("SELECT * FROM tb_categorias", callback);
} 

Categoria.prototype.getNomeCategoria = function(nome, callback) {
    this._connection.query(`SELECT nome FROM tb_categorias WHERE nome = '${nome}'`, callback);
} 

Categoria.prototype.getPaginacao = function(limit, callback) {
    this._connection.query(`SELECT * FROM tb_categorias LIMIT ${limit.inicio}, ${limit.final}`, callback);
};

Categoria.prototype.getCount = function(callback) {
    this._connection.query("SELECT count(*) as num_rows from tb_categorias", callback);
};

Categoria.prototype.excluir = function(id, callback) {
    this._connection.query(`DELETE FROM tb_categorias WHERE id = ${id.id}`, callback);
}

Categoria.prototype.getCategoria = function (id, callback) {
    this._connection.query(`SELECT * FROM tb_categorias WHERE id = ${id.id}`, callback);
}

Categoria.prototype.editar = function (form, callback) {
    this._connection.query(`UPDATE tb_categorias SET nome = '${form.nome}' WHERE id = ${form.id} `, callback);
}

module.exports = function () {
    return Categoria;
}