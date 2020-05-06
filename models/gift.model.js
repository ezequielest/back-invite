var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GiftModel = new Schema({
    description: {
        type: String,
        required: true
    },
    gifted_by: {
        type: Schema.Types.ObjectId,
        ref: 'Guest'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

 module.exports =  mongoose.model('Gift', GiftModel);