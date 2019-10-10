var mongoose = require ('mongoose');

var guestModel = {
    description: String,
    confirmed: Number
}

module.exports = mongoose.model('Guest', guestModel);