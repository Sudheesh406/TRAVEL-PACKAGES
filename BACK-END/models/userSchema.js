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
        type: String
    },
    image:{
        type: String
    },
    DateOfBirth :{
        type: Date
    },
    about :{
        type: String
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    },acess:{
        type:Boolean,
        default:true
    }
})

const User = mongoose.model("User",Schema)
module.exports = User;