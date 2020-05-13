var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuestGiftModel = new Schema({

    giftedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Guest'
    },
    gift: {
        type: Schema.Types.ObjectId,
        ref: 'Gift'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cant: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('GuestGift', GuestGiftModel);

