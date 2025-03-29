const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    username: { 
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true,
    },
    location: { 
        type: String
    },
    phone: { 
        type: Number
    },
    image:{
        type: String
    },
    DateOfBirth :{
        type: Date
    },
    about :{
        type: Date
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
})

const User = mongoose.model("User",Schema)
module.exports = User;