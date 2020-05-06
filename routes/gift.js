var express = require('express');
var mdAutentication = require('../middleware/autentication');
bodyParser = require('body-parser');

var app = express();

var Gift = require('./../models/gift.model');

app.get('/', (req, res) => {

    Gift.find({},(err,gifts) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: gifts
        })
    })
})

/**PUBLIC */
app.get('/userId/:id', (req, res) => {

    var userId = req.params.id;

    Gift.find({user: userId},(err,gifts) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: gifts
        })
    })
})


/**PRIVATE */
app.get('/userId', mdAutentication.verificationToken, (req, res) => {

    var user = req.currentUser;

    Gift.find({user: user._id},(err,gifts) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: gifts
        })
    })
})


//payload
//*description | string
//get user for token currentUser middleware
app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    
    var user = req.currentUser;

    const gift = new Gift(
        { 
            description: body.description,
            user: user._id
        }
    );
    gift.save((err, giftSave) => {
        if (err) {
            return res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: giftSave,
        })
    })
});


//payload
//
//
//
//
app.put('/:id', (req, res) => {
    var body = req.body;
    var id = req.params.id;

    Gift.findById(id, (err, gift) =>{
        if (err) {
            res.status(500).json({
                response: 'error al buscar gift en la db'
            })
        }

        if (!gift) {
            res.status(400).json({
                response: 'gift no encontrado'
            })
        }

        //the update use the save
        gift.description = body.description;

        gift.save((err, gift) => {
            if (err) {
                res.status(500).json({
                    response: 'error al actualizar gift en la db'
                })
            }
            res.status(200).json({
                resonse: gift,
                message: 'gift actualizado con exito'
            })

        })

        
    });

})


//payload
//*id url
//*
app.delete('/:id',mdAutentication.verificationToken, (req, res) => {
 
    var id = req.params.id;

    Gift.findByIdAndRemove(id,(err,gift) =>{
        if (err) {
            res.status(500).json({
                response: 'error al borrar gift en la db'
            })
        }

        if (!gift) {
            res.status(400).json({
                response: 'gift no encontrado'
            })
        }
        
        res.status(200).json({
            resonse: gift,
            message: 'gift actualizado con exito'
        })
    })
    
})

module.exports = app;