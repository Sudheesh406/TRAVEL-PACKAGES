const express = require("express")
const Router = express.Router();
const {createTransaction} = require("../services/rayzorpay")
const {booking, getbookingDetails, getBookingHistory, getPopularDestination}= require('../controls/Booking')
const auth = require("../middleware/userAuth")
Router.post('/razorpay',auth,createTransaction)
Router.post('/booking',auth,booking)
Router.get('/getbookingDetails/:id',auth,getbookingDetails)
Router.get('/getBookingHistory/:id',auth,getBookingHistory)
Router.get('/getPopularDestination',getPopularDestination)

module.exports = Router;
