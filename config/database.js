const mysql = require('mysql');

let connection = function() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'def75315901',
        database : 'deposito'
    });
}; 

module.exports = function() {
    console.log('Conexão estabelecida com o banco de dados');
    return connection;
}