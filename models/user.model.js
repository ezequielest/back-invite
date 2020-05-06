var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
};

var UserModel = new Schema({
    description: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    role: { type: String, 
        required: true, 
        default: 'USER_ROLE', 
        enum: rolesValidos 
    }
})

module.exports = mongoose.model('User', UserModel);