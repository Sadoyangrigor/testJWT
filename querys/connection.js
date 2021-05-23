var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'testjwt',
    password : '123456',
    database : 'testjwt',
});

module.exports = connection;
