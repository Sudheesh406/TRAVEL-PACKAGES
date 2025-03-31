const express = require("express")
const Router = express.Router();
const {createTransaction} = require("../services/rayzorpay")
const {booking, getbookingDetails}= require('../controls/Booking')
Router.post('/razorpay',createTransaction)
Router.post('/booking',booking)
Router.get('/getbookingDetails/:id',getbookingDetails)

module.exports = Router;
