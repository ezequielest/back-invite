var express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var mdAutentication = require('../middleware/autentication');

var app = express();

var User = require('../models/user.model');
var Gift = require('../models/gift.model');
var GuestGift = require('../models/guestGift.model');
var Guest = require('../models/guest.model');

app.get('/', (req,res) => {
    
    User.find({}, (err,user) => {
        if (err) {
            res.status(500).json({
                response: err,
                error: true
            })
        }

        res.status(200).json({
            response: 'Lista de usuarios',
            user: user,
            error: false
        })
        
    })
})

app.post('/login', (req, res) => {
    
    var body = req.body;

    User.findOne({
        email: body.email,
    },(err,user) => {
        if (err) {
            res.status(500).json({
                response: err,
                error: true
            })
        }

        if (!user) {
            res.status(200).json({
                response: 'Credentials error',
                error: true,
                user: []
            })
        } else {

            if (bcrypt.compareSync(body.password, user.password)) {

                //token
                user.password = "..."
                var tokenData = {
                    user: user
                }
                
                var token = jwt.sign(tokenData, 'invite.online', {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                })
                
                res.status(200).json({
                    response: user._id,
                    error: false,
                    token: token
                })

            } else {
                res.status(200).json({
                    response: 'Credentials error',
                    error: true,
                    user: []
                })
            }
        }


    })
})


/**create */
app.post('/', (req, res) => {
    var body = req.body;

    const saltRounds = 10;
    const myPlaintextPassword = body.password;

    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(myPlaintextPassword, salt);

    const user = new User({
        description: body.description, 
        password: hash,
        email: body.email
    });

    user.save((err, userSave) => {
        if (err) {
            return res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: userSave,
        })
    })
});

//update user
app.put('/:id', (req, res) => {
    var body = req.body;
    var id = req.params.id;

    User.findById(id, (err, user) =>{
        if (err) {
            res.status(500).json({
                response: 'error al buscar guest en la db'
            })
        }

        if (!user) {
            res.status(400).json({
                response: 'guest no encontrado'
            })
        }

        //the update use the save
        user.description = body.description;

        user.save((err, user) => {
            if (err) {
                res.status(500).json({
                    response: 'error al actualizar guest en la db'
                })
            }

            res.status(200).json({
                response: user,
                message: 'user actualizado con exito'
            })

        })
    });

})


app.delete('/:id', (req, res) => {
 
    var id = req.params.id;

    User.findByIdAndRemove(id,(err,user) =>{
        if (err) {
            res.status(500).json({
                response: 'error al borrar user en la db'
            })
        }

        if (!user) {
            res.status(400).json({
                response: 'user no encontrado'
            })
        }
        
        res.status(200).json({
            resonse: user,
            message: 'user eliminada con exito'
        })
    })
    
})

app.get('/summary',mdAutentication.verificationToken, (req, res) => {
 
    var user = req.currentUser;
    //var id = req.params.id;

    
    Gift.find({user: user._id},(err,gifts) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        console.log('gift ',gifts)

        GuestGift.find({user: user._id})
        .populate('giftedBy')
        .exec((err, guestGifts) => {
            if (err) {
                res.status(500).json({
                    response: err
                })
            }

            console.log('guestgift ',guestGifts)

            let giftsSummary = gifts.map((gift)=> {
                let done= guestGifts.filter((guestgift) => {
                    return gift._id.equals(guestgift.gift);
                });

                console.log('done ',done)

                let summary = {
                    _id: gift._id,
                    description: gift.description,
                    user: gift.user,
                    cant: gift.cant,
                    alreadyDone:  done.length === 0 ? false: true,
                    giftedBy: done.length === 0 ?  null : done[0].giftedBy
                }

                return summary;

            })

            Guest.find({user: user._id},(err,guests) => {

                res.status(200).json({
                    response: {
                        giftSummay: giftsSummary,
                        guestSummary: guests
                    }
                })

            })
            


        })

    })

   
    
})

module.exports = app;


module.exports = app;