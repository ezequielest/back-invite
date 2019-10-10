var express = require('express');
bodyParser = require('body-parser');

var app = express();

var Gift = require('./../models/gift');

app.get('/', (req, res) => {

    Gift.find({},(err,gift) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: gift
        })
    })
})


app.post('/', (req, res) => {
    var body = req.body;

    const gift = new Gift({ description: body.description });
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

app.delete('/:id', (req, res) => {
 
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