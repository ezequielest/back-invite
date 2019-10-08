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
        res.status(200).json({
            response: result
        })
    });
})

app.post('/', (req, res) => {
    var guest = req.body;

    con.query(`INSERT INTO guest(description) VALUES ('${guest.description}')`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM guest", function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({
                response: result
            })
        });
    })
})

app.put('/:id', (req, res) => {

    var guest = req.body;

    con.query(`UPDATE guest SET description='${guest.description}'  WHERE id=(${req.params.id})`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM guest", function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({
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
            res.status(200).json({
                response: result
            })
        });
    })
    
})

module.exports = app;