var mongoose = require('mongoose');

var GiftModel = {
    description: String
}

 module.exports =  mongoose.model('Gift', GiftModel);