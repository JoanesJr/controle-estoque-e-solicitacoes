function Retirada(connection) {
    this._connection = connection;
}

Retirada.prototype.getAll = function(callback) {
    this._connection.query("SELECT r.id, r.nome, r.quantidade, r.usuario, um.nome as nome_unidade_medida, DATE_FORMAT(r.data_retirada, '%d/%m/%Y %H:%i:%S') as data_retirada, c.nome as nome_categoria, m.nome as nome_modelo FROM tb_retiradas as r INNER JOIN tb_categorias as c ON r.categoria = c.id INNER JOIN tb_unidade_medida as um ON r.unidade_medida = um.id INNER JOIN tb_modelos as m ON r.modelo = m.id ORDER BY data_retirada DESC", callback);
};


Retirada.prototype.adicionar = function(item, callback) {
    this._connection.query("INSERT INTO tb_retiradas SET ?", item, callback);
}

module.exports = function() {
    return Retirada;
}