const mysql = require('mysql');

var config = {
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: '123456',
    database: 'marketplace'
};

const connection = mysql.createConnection(config);

connection.connect();

module.exports = connection;