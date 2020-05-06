var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GiftModel = new Schema({
    description: {
        type: String,
        required: true
    },
    gifted_by: {
        type: String,
        required: true,
        default: ""
    },
    gifted: {
        type: Boolean,
        required: true,
        default: 0
    }
});

 module.exports =  mongoose.model('Gift', GiftModel);