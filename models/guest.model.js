var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var guestModel = new Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Guest', guestModel);