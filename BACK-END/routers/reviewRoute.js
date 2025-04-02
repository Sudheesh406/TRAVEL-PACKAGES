const express = require("express")
const Router = express.Router();
const {newReview} = require('../controls/review')
Router.post('/newReview',newReview)


module.exports = Router;
