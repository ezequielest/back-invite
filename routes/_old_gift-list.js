var express = require('express');

bodyParser = require('body-parser');

var app = express();

var GiftList = require('./../models/gift-list.model')

app.get('/', (req, res) => {

    GiftList.find({},(err,giftList) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: giftList
        })
    })
})

app.get('/gifted/:id', (req, res) => {
    
    var body = req.body;

    var objSave = {
        gift: body.gift._id,
        guest: body.guest._id
    }

    const giftList = new GiftList(objSave);
    giftList.save((err, giftListSave) => {
        if (err) {
            return res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: giftListSave,
        })
    })
})

app.post('/', (req, res) => {

    var body = req.body;

    var objSave = {
        gift: body.gift._id,
        guest: body.guest._id
    }

    const giftList = new GiftList(objSave);
    giftList.save((err, giftListSave) => {
        if (err) {
            return res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: giftListSave,
        })
    })

    /*con.query(`INSERT INTO gift_list(gift_id) VALUES ('${gift.id}')`, function (err, result, fields) {
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
    })*/
})

app.put('/', (req, res) => {
    var payload = req.body;
    console.log(payload)

    /*con.query(`UPDATE gift_list SET gifted = 1, gifted_by = ${payload.guest.id} WHERE gift_id = ${payload.gift.id}`, function (err, result, fields) {
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
    })*/
})

app.delete('/:id', (req, res) => {

    /*con.query(`DELETE FROM gift_list WHERE id=(${req.params.id})`, function (err, result, fields) {
        if (err) throw err;

        con.query("SELECT * FROM gift_list", function (err, result, fields) {
            if (err) throw err;
            res.status(500).json({
                response: result
            })
        });
    })*/
    
})

module.exports = app;