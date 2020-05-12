var express = require('express');
var app = express();
var mdAutentication = require('../middleware/autentication');

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

app.get('/userId', mdAutentication.verificationToken, (req, res) => {

    var userId = req.currentUser._id;

    Guest.find({user: userId},(err,guest) => {
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



app.post('/', mdAutentication.verificationToken, (req, res) => {
    var body = req.body;
    var user = req.currentUser;

    const guest = new Guest({ description: body.description, user: user._id, cant: body.cant, confirmed: body.confirmed });
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

app.put('/:id',mdAutentication.verificationToken, (req, res) => {
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
        guest.cant = body.cant;
        guest.confirmed = body.confirmed;

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

app.delete('/:id',mdAutentication.verificationToken, (req, res) => {
 
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

//PUBLICS
/**Public by userId */
app.get('/userId/:id', (req, res) => {

    var userId = req.params.id;

    Guest.find({user: userId},(err,guest) => {
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

module.exports = app;