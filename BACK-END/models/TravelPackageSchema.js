const mongoose = require("mongoose");
const User = require('../models/userSchema');
const companyDetails = require('../models/CompanySchema')

const tourPackageSchema = new mongoose.Schema({
  company:{
    type:mongoose.Schema.ObjectId,
    ref:companyDetails,
    required:true
},
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  numberOfVisit:{
    type: Number,
    required: true,
    min:1
  },
  locations: {
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true }
  },
  images: [],
  vegFood: {
    type: Boolean,
    default: false 
  },
  nonVegFood: {
    type: Boolean,
    default: false 
  },
  category: {
    type: String,
    enum: ["Adventure", "Students-Basic", "Family", "Students-Advance","Culture"],
    required: true
  },
  vehicleSeatNumber: {
    type: Number,
    required: true
  },
  availableSeat:{
    type: Number,
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  contactNumber: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
   Date:{
    type:Date,
    require:true
   },
},{timestamps:true});

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);
module.exports = TourPackage;
