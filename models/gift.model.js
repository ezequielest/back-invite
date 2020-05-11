var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GiftModel = new Schema({
    description: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cant: {
        type: Number,
        required: true
    }
});

 module.exports =  mongoose.model('Gift', GiftModel);