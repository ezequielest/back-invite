var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
    gifts: [{
        description: { 
            type: String, 
            required: true
        },
        gifted: {
            type: Boolean,
            default: false
        },
        gifted_by: {
            description: {
                type: String
            }
        }
    }],
    guests: [{
        guest: {
            type: mongoose.Schema.Types.ObjectId
        },
        confirmed: {
            type: Boolean,
            default: false
        },
        cant: {
            type: Number
        },
        description: {
            type: String,
        }
    }]
})

module.exports = mongoose.model('User', UserModel);