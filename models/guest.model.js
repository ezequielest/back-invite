var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var guestModel = new Schema({
    description: {
        type: String,
    }
});

module.exports = mongoose.model('Guest', guestModel);