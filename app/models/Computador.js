function Computador(connection) {
    this._connection = connection;
}

Computador.prototype.getAll = function(callback) {
    this._connection.query("SELECT c.id as id, c.nome as nome, c.localizacao, c.setor, c.ram, c.armazenamento, c.tipo_armazenamento as tipo_armazenamento, c.processador as processador, c.modelo_gabinete as modelo_gabinete, l.nome as nome_localizacao, s.nome as nome_setor FROM tb_computadores as c INNER JOIN tb_locais as l ON c.localizacao = l.id INNER JOIN tb_setores as s ON c.setor = s.id ORDER BY l.nome ASC", callback);
}

Computador.prototype.getPaginacao = function(limit, callback) {
    this._connection.query(`SELECT c.id as id, c.nome as nome, c.localizacao, c.setor, c.ram, c.armazenamento, c.tipo_armazenamento as tipo_armazenamento, c.processador as processador, c.modelo_gabinete as modelo_gabinete, l.nome as nome_localizacao, s.nome as nome_setor FROM tb_computadores as c INNER JOIN tb_locais as l ON c.localizacao = l.id INNER JOIN tb_setores as s ON c.setor = s.id ORDER BY l.nome ASC LIMIT ${limit.inicio}, ${limit.final}`, callback);
};

Computador.prototype.getCount = function(callback) {
    this._connection.query("SELECT count(*) as num_rows from tb_computadores", callback);
};


Computador.prototype.excluir = function(form, callback) {
    this._connection.query(`DELETE FROM tb_computadores WHERE id = ${form}`, callback);
}

Computador.prototype.salvar = function(form, callback) {
    this._connection.query("INSERT INTO tb_computadores SET ?", form, callback);
}

Computador.prototype.update = function(form, callback) {
    this._connection.query(`UPDATE tb_computadores SET localizacao = ${form.localizacao}, setor = ${form.setor}, ram = ${form.ram}, armazenamento = ${form.armazenamento}, tipo_armazenamento = '${form.tipo_armazenamento}', processador = '${form.processador}', modelo_gabinete = '${form.modelo_gabinete}' WHERE id = '${form.id}'`, callback);
}

Computador.prototype.getComputador = function(id, callback) {
    this._connection.query(`SELECT * FROM tb_computadores WHERE id = ${id}`, callback);
}

Computador.prototype.getComputadorNome = function(nome, callback) {
    this._connection.query(`SELECT * FROM tb_computadores WHERE nome = '${nome}'`, callback);
}

Computador.prototype.getComputadorNomeEditar = function(nome, callback) {
    this._connection.query(`SELECT * FROM tb_computadores WHERE nome = '${nome}'`, callback);
}

module.exports = function() {
    return Computador;
}