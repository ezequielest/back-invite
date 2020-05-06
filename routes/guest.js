var express = require('express');
var app = express();

var Guest = require('./../models/guest.model')

app.get('/', (req, res) => {

    Guest.find({},(err,guest) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: guest
        })
    })
})


app.post('/', (req, res) => {
    var body = req.body;

    const guest = new Guest({ description: body.description, cant: body.cant });
    guest.save((err, guestSave) => {
        if (err) {
            return res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: guestSave,
        })
    })
});

app.put('/:id', (req, res) => {
    var body = req.body;
    var id = req.params.id;

    Guest.findById(id, (err, guest) =>{
        if (err) {
            res.status(500).json({
                response: 'error al buscar guest en la db'
            })
        }

        if (!guest) {
            res.status(400).json({
                response: 'guest no encontrado'
            })
        }

        //the update use the save
        guest.description = body.description;

        guest.save((err, guest) => {
            if (err) {
                res.status(500).json({
                    response: 'error al actualizar guest en la db'
                })
            }
            res.status(200).json({
                resonse: guest,
                message: 'guest actualizado con exito'
            })

        })

        
    });

})

app.delete('/:id', (req, res) => {
 
    var id = req.params.id;

    Guest.findByIdAndRemove(id,(err,guest) =>{
        if (err) {
            res.status(500).json({
                response: 'error al borrar guest en la db'
            })
        }

        if (!guest) {
            res.status(400).json({
                response: 'guest no encontrado'
            })
        }
        
        res.status(200).json({
            resonse: guest,
            message: 'guest eliminada con exito'
        })
    })
    
})
module.exports = app;