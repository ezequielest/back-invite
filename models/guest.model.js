var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var guestModel = new Schema({
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cant: {
        type: Number,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    cantConfirmed: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Guest', guestModel);