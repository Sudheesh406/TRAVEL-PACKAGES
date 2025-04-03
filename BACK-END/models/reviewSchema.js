const mongoose = require('mongoose')

const schema = mongoose.Schema({
    userId:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true
    },
    userProfile:{
        type:String
    },
    image:[ ],
    
    packageId:{
        type:String,
        required:true
    },
    packageName:{
        type:String,
        required:true
    },
    PackageDescription:{
        type:String,
        required:true
    },
    review:{
        type:String
    },
    star:{
        type:String
    },
    company:{
        type:String,
        required:true
    }
})
const Review = mongoose.model('Review',schema)
module.exports = Review
