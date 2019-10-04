var express = require('express');
var mysql = require('mysql');
bodyParser = require('body-parser');

var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "invite",
    port: "3306"
})

con.connect((err) => {
    if (err) throw err;
})

app.get('/', (req, res) => {
    con.query("SELECT * FROM gifts", function (err, result, fields) {
        if (err) throw err;
        res.status(500).json({
            response: result
        })
    });
})

app.post('/', (req, res) => {
    var gift = req.body;

    con.query(`INSERT INTO gifts(description) VALUES ('${gift.description}')`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM gifts", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
})

app.put('/:id', (req, res) => {

    var gift = req.body;

    con.query(`UPDATE gifts SET description='${gift.description}' WHERE id=(${req.params.id})`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM gifts", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
})

app.delete('/:id', (req, res) => {

    con.query(`DELETE FROM gifts WHERE id=(${req.params.id})`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM gifts", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
    
})

module.exports = app;