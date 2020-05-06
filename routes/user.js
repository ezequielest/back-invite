var express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')

var app = express();

var User = require('../models/user.model')
var Gifts = require('../models/gift.model')

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

//public
app.get('/:id', (req, res) => {
    console.log('get user id')
    var id = req.params.id;
    console.log('id ', id)

    User.findOne({_id: id},(err,user) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        //busco la lista de regalos para poder administrarlos
        Gifts.find({}, function(err, gifts){
            if (err) {
                res.status(500).json({
                    response: err
                })
            }

            res.status(200).json({
                response: user,
                gifts: gifts
            })

        })
 

    })
})



app.get('/', (req, res) => {
    console.log('get user')
    User.find({},(err,user) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        res.status(200).json({
            response: user
        })
    })
})

function findUser() {
    User.find({},(err,user) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        return user
    })
}



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

    User.findById(id, (err, å) =>{
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


//update user guest
app.put('/:id/guest/', (req, res) => {
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
        //update de guest
        var guest = {
            description: body.description,
            cant: body.cant
        }

        user.guests.push(guest)

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


//update user gift
app.put('/gift/:id', (req, res) => {
    var body = req.body;
    var id = req.params.id;

    console.log("update gift");
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

        console.log('guest id ', body.guest.id)

        //the update use the save
        user.gifts.forEach(gift => {
            if (gift._id == body.gift.id) {
                gift.gifted = true;
                gift.gifted_by = body.guest.description;
            }
        });

        console.log(user)

        user.save((err, user) => {
            if (err) {
                res.status(500).json({
                    response: 'error al actualizar user gift en la db'
                })
            }
            res.status(200).json({
                response: user,
                message: 'user gift actualizado con exito'
            })

        })

        
    });

})

//update user gift
app.put('/gift/free/:id', (req, res) => {
    var body = req.body;
    var id = req.params.id;

    console.log("update free gift");
    console.log(body)
    console.log(id)

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
        user.gifts.forEach(gift => {
            if (gift._id == body.id) {
                gift.gifted = false;
                gift.gifted_by.description = body.description;
            }
        });

        console.log(user)

        user.save((err, user) => {
            if (err) {
                res.status(500).json({
                    response: 'error al actualizar user gift en la db'
                })
            }
            res.status(200).json({
                response: user,
                message: 'user gift actualizado con exito'
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

app.delete('/:userId/gift/:giftId', (req, res) => {
 
    var userId = req.params.userId;
    var giftId = req.params.giftId;

    User.findOne({_id: userId},(err,user) =>{
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        if (!user) {
            res.status(400).json({
                response: 'user no encontrado'
            })
        }
        
        user.gifts = user.gifts.filter((gift)=> gift._id != giftId);

        user.save((err, user) => {
            if (err) {
                res.status(500).json({
                    response: 'error al actualizar user gift en la db'
                })
            }
            res.status(200).json({
                response: user,
                message: 'user gift actualizado con exito'
            })

        })
    })
    
})

module.exports = app;


module.exports = app;