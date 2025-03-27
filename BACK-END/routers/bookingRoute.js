const express = require("express")
const Router = express.Router();
const {createTransaction} = require("../services/rayzorpay")
const {booking}= require('../controls/Booking')
Router.post('/razorpay',createTransaction)
Router.post('/booking',booking)

module.exports = Router;
