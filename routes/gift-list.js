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
        gifts.id AS giftId,
        gifts.description AS giftDescription,
        guest.id AS guestId,
        gifted,
        guest.description AS guestDescription
        FROM gift_list 
            INNER JOIN gifts ON gift_list.gift_id = gifts.id
            LEFT JOIN guest ON gift_list.gifted_by = guest.id
    `
    con.query(query, function (err, result, fields) {
        if (err) throw err;
        res.status(200).json({
            response: result
        })
    });
})

app.get('/gifted/:id', (req, res) => {
    var query = 
    `SELECT
        gifts.id AS giftId,
        gifts.description AS giftDescription,
        guest.id AS guestId,
        gifted,
        guest.description AS guestDescription
        FROM gift_list 
            INNER JOIN gifts ON gift_list.gift_id = gifts.id
            LEFT JOIN guest ON gift_list.gifted_by = guest.id
        WHERE gifted = ${req.params.id}
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

        var query = 
        `SELECT
            gifts.id AS giftId,
            gifts.description AS giftDescription,
            guest.id AS guestId,
            gifted,
            guest.description AS guestDescription
            FROM gift_list 
                INNER JOIN gifts ON gift_list.gift_id = gifts.id
                LEFT JOIN guest ON gift_list.gifted_by = guest.id
        `

        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })
})

app.put('/', (req, res) => {
    var payload = req.body;
    console.log(payload)

    con.query(`UPDATE gift_list SET gifted = 1, gifted_by = ${payload.guest.id} WHERE gift_id = ${payload.gift.id}`, function (err, result, fields) {
        if (err) throw err;
        
        var query = 
        `SELECT
            gifts.id AS giftId,
            gifts.description AS giftDescription,
            gifted,
            guest.id AS guestId,
            guest.description AS guestDescription
            FROM gift_list 
                INNER JOIN gifts ON gift_list.gift_id = gifts.id
                LEFT JOIN guest ON gift_list.gifted_by = guest.id
        `

        con.query(query, function (err, result, fields) {
            if (err) throw err;
            res.status(200).json({
                response: result
            })
        });
    })
})

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