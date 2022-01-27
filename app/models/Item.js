function Item(connection) {
    this._connection = connection;
}

Item.prototype.getAll = function(callback) {
    this._connection.query("SELECT i.id, i.nome, i.quantidade, um.nome as nome_unidade_medida, DATE_FORMAT(i.data_item, '%d/%m/%Y') as data_item, c.nome as nome_categoria, m.nome as nome_modelo FROM tb_itens as i INNER JOIN tb_categorias as c ON i.categoria = c.id INNER JOIN tb_unidade_medida as um ON i.unidade_medida = um.id INNER JOIN tb_modelos as m ON i.modelo = m.id ORDER BY nome_categoria ASC, nome ASC, nome_modelo ASC", callback);
};

Item.prototype.getPaginacao = function(limit, callback) {
    this._connection.query(`SELECT i.id, i.nome, i.quantidade, um.nome as nome_unidade_medida, DATE_FORMAT(i.data_item, '%d/%m/%Y') as data_item, c.nome as nome_categoria, m.nome as nome_modelo FROM tb_itens as i INNER JOIN tb_categorias as c ON i.categoria = c.id INNER JOIN tb_unidade_medida as um ON i.unidade_medida = um.id INNER JOIN tb_modelos as m ON i.modelo = m.id ORDER BY nome_categoria ASC, nome ASC, nome_modelo ASC LIMIT ${limit.inicio}, ${limit.final}`, callback);
};

Item.prototype.getCount = function(callback) {
    this._connection.query("SELECT count(*) as num_rows from tb_itens", callback);
};

Item.prototype.salvarItem = function(item, callback) {
    this._connection.query("INSERT INTO tb_itens SET ?", item, callback);
}

Item.prototype.getItem = function(id, callback) {
    this._connection.query(`SELECT * FROM tb_itens WHERE id = ${id}`, callback);
}

Item.prototype.alterarQuantidadeItem = function(controle, id, callback) {
    this._connection.query(`UPDATE tb_itens SET quantidade = ${controle} WHERE id = ${id}`, callback);
}

Item.prototype.excluir = function(id, callback) {
    this._connection.query(`DELETE FROM tb_itens WHERE id = ${id}`, callback);
}

Item.prototype.update = function(form, callback) {
    this._connection.query(`UPDATE tb_itens SET nome = '${form.nome}', categoria = ${form.categoria}, quantidade = ${form.quantidade}, unidade_medida = ${form.unidade_medida}, modelo = ${form.modelo} WHERE id = ${form.id}`, callback);
}

module.exports = function() {
    return Item;
}