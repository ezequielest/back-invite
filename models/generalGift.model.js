var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GeneralGiftModel = new Schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
});

 module.exports =  mongoose.model('GeneralGift', GeneralGiftModel);