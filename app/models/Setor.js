function Setor(connection) {
    this._connection = connection;
};

Setor.prototype.getAll = function(callback) {
    this._connection.query("SELECT s.id, s.nome, s.localizacao, l.nome as nome_localizacao FROM tb_setores as s INNER JOIN tb_locais as l on s.localizacao = l.id ORDER BY nome ASC", callback);
};

Setor.prototype.salvar = function(Setor, callback) {
    this._connection.query("INSERT INTO tb_setores SET ?", Setor, callback);
};

Setor.prototype.getSetor = function(id, callback) {
    this._connection.query(`SELECT * FROM tb_setores WHERE id = '${id.id}'`, callback);
};

Setor.prototype.editar = function(form, callback) {
    this._connection.query(`UPDATE tb_setores SET nome = '${form.nome}', localizacao = '${form.localizacao}' WHERE id = ${form.id} `, callback);
};

Setor.prototype.getSetorLocalizacao = function(localizacao, callback) {
    this._connection.query(`SELECT * FROM tb_setores WHERE localizacao = '${localizacao}' ORDER BY nome ASC`, callback);
}

Setor.prototype.excluir = function(id, callback) {
    this._connection.query(`DELETE FROM tb_setores WHERE id = ${id.id}`, callback);
}

module.exports = function() {
    return Setor;
};