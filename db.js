const mysql = require('mysql')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'express',
    password: 'password',
    database: 'express_cms'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;