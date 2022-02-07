const mysql = require('mysql');

let connection = function() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'senhaDb',
        database : 'deposito'
    });
}; 

module.exports = function() {
    console.log('Conexão estabelecida com o banco de dados');
    return connection;
}
