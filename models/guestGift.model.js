
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuestGiftModel = new Schema({

    gifted_by: {
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
    },
    isMoney: {
        type: Boolean,
        required: true
    }

});

module.exports = mongoose.model('GuestGift', GuestGiftModel);

