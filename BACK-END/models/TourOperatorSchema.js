const mongoose = require("mongoose");

const tourOperatorSchema = new mongoose.Schema({
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
role: { 
    type: String,
    default:"opperator"
},acess:{
    type:Boolean,
    default:true
}
});

const TourOperator = mongoose.model("TourOperator", tourOperatorSchema);
module.exports = TourOperator;
