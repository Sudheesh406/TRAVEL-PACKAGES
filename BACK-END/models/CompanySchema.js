const mongoose = require('mongoose');
const { operatorSignup } = require('../controls/login');
const TourOperator = require("../models/TourOperatorSchema");
const schema = mongoose.Schema({
    operator: {
        type: mongoose.Schema.ObjectId,
        ref: TourOperator,
        required: true,
        unique: true
    },
    companyName:{
        type:String,
        required:true
    },
    Tagline:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    gstNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String 
    }
})

const companyDetails = mongoose.model('companyDetails',schema)
module.exports = companyDetails
