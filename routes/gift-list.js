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
    var query = 
    `SELECT
        gifts.description AS giftDescription,
        guest.description AS guestDescription
        FROM gift_list 
            INNER JOIN gifts ON gift_list.gift_id = gifts.id
            INNER JOIN guest ON gift_list.gifted_by = guest.id
    `
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            response: result
        })
    });
})

app.post('/', (req, res) => {
    var gift = req.body;

    con.query(`INSERT INTO gift_list(gift_id) VALUES ('${gift.id}')`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM gift_list", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
})

/*
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
*/

app.delete('/:id', (req, res) => {

    con.query(`DELETE FROM gift_list WHERE id=(${req.params.id})`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM gift_list", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
    
})

module.exports = app;