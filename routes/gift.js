var express = require('express');
var mdAutentication = require('../middleware/autentication');
bodyParser = require('body-parser');

var app = express();

var Gift = require('../models/gift.model');
var GuestGift = require('../models/guestGift.model');
var Guest = require('../models/guest.model');

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

        GuestGift.find({user: userId},(err,guestGifts) => {
            if (err) {
                res.status(500).json({
                    response: err
                })
            }

            let giftsAux = gifts.map((gift)=> {
                let done= guestGifts.filter((guestgift) => {
                    return gift._id.equals(guestgift.gift);
                });

                let newGift = {
                    _id: gift._id,
                    description: gift.description,
                    user: gift.user,
                    cant: gift.cant,
                    alreadyDone:  done.length === 0 ? false: true
                }

                return newGift;

            })

            res.status(200).json({
                response: giftsAux
            })

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

app.get('/summary', mdAutentication.verificationToken, (req, res) => {

    var user = req.currentUser;

    Gift.find({user: user._id},(err,gifts) => {
        if (err) {
            res.status(500).json({
                response: err
            })
        }

        GuestGift.find({user: user._id})
        .populate('giftedBy')
        .exec((err, guestGifts) => {
            if (err) {
                res.status(500).json({
                    response: err
                })
            }

            let giftsSummary = gifts.map((gift)=> {
                let done= guestGifts.filter((guestgift) => {
                    return gift._id.equals(guestgift.gift);
                });

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

            res.status(200).json({
                response: giftsSummary
            })

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
            user: user._id,
            cant: body.cant
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
                response: gift,
                message: 'gift actualizado con exito'
            })

        })

        
    });

})

/** public data =
 * giftedBy: id,
 * gift: id 
 * cant: number,
 * userID: id,
 * isMoney: boolean
 **/
app.post('/toGift', (req, res) => {
    var data = req.body;

    console.log(data);

    var gustGift = new GuestGift({
        giftedBy: data.giftedBy,
        gift: data.gift,
        cant: data.cant,
        user: data.userID,
        isMoney: data.isMoney
    });

    gustGift.save((err, guestGift)=> {
        if (err){
            return res.status(200).json({
                err: err,
                response: 'error al realizar el regalo'
            })
        }

        res.status(200).json({
            response: guestGift,
            message: 'regalo realizado con exito'
        })
    });
})

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
            response: gift,
            message: 'gift actualizado con exito'
        })
    })
    
})

module.exports = app;