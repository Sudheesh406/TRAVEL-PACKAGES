const express = require("express")
const Router = express.Router();
const {newReview,getReviews,getAllReview} = require('../controls/review')
const {upload} = require('../middleware/uploadImageToS3')

Router.post('/newReview',upload.array('images', 10),newReview)
Router.get('/getReviews',getReviews)
Router.get('/getAllReview',getAllReview)


module.exports = Router;
