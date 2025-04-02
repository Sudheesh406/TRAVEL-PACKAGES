const express = require("express")
const Router = express.Router();
const {createTransaction} = require("../services/rayzorpay")
const {booking, getbookingDetails, getBookingHistory, getPopularDestination}= require('../controls/Booking')
Router.post('/razorpay',createTransaction)
Router.post('/booking',booking)
Router.get('/getbookingDetails/:id',getbookingDetails)
Router.get('/getBookingHistory/:id',getBookingHistory)
Router.get('/getPopularDestination',getPopularDestination)

module.exports = Router;
