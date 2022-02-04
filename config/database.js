const mysql = require('mysql');

let connection = function() {
    return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'aloisk#Sepaco#TIPaineiras',
        database : 'deposito'
    });
}; 

module.exports = function() {
    console.log('Conexão estabelecida com o banco de dados');
    return connection;
}