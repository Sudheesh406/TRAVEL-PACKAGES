const mongoose = require('mongoose');
const User = require('../models/userSchema')
const companyDetails = require('../models/CompanySchema')
const TourPackage = require('../models/TravelPackageSchema')
const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
   },
    packageId:{
        type: mongoose.Schema.ObjectId,
        ref: TourPackage,
        required: true
    },
    packageName:{
        type:String,
        required:true
    },
    companyDetails: {
        type: mongoose.Schema.ObjectId,
        ref: companyDetails,
        required: true,
    },
    companyName:{
        type:String,
        require:true
    },
    price: {
        type: Number,
        required: true,
    },
    Date:{
        type:Date,
        require:true
    },
    seat:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    userEmail:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }

},{timestamps:true})

const Booked = mongoose.model('Booked',schema)
module.exports = Booked
