var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var giftListModel = new Schema({
    gift: [{ 
        type: Schema.ObjectId,
        ref: 'Gift'
    }],
    guest: [{ 
        type: Schema.ObjectId,
        ref: 'Guest'
    }],
}, { collection: 'giftList'})

module.exports = mongoose.model('GiftList', giftListModel);