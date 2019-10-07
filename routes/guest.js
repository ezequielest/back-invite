var express = require('express');
var mysql = require('mysql');
bodyParser = require('body-parser');

var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "invite",
    port: "8889"
})

con.connect((err) => {
    if (err) throw err;
})

app.get('/', (req, res) => {
    con.query("SELECT * FROM guest", function (err, result, fields) {
        if (err) throw err;
        res.status(500).json({
            response: result
        })
    });
})

app.post('/', (req, res) => {
    var guest = req.body;

    con.query(`INSERT INTO guest(name,lastname) VALUES ('${guest.name}','${guest.lastname}')`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM guest", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
})

app.put('/:id', (req, res) => {

    var gift = req.body;

    con.query(`UPDATE guest SET name='${gift.name}', lastname='${gift.lastname}'  WHERE id=(${req.params.id})`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM guest", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
})

app.delete('/:id', (req, res) => {

    con.query(`DELETE FROM guest WHERE id=(${req.params.id})`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM guest", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
    
})

module.exports = app;