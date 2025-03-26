const express = require("express")
const Router = express.Router();
const {createTransaction} = require("../services/rayzorpay")
// const {packageBooking}= require('../controls/Booking')
Router.post('/razorpay',createTransaction)

module.exports = Router;
