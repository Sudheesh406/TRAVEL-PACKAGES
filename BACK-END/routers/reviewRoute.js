const express = require("express")
const Router = express.Router();
const {newReview,getReviews,getAllReview} = require('../controls/review')
const {upload} = require('../middleware/uploadImageToS3')
const auth = require('../middleware/userAuth')

Router.post('/newReview',upload.array('images', 10),auth,newReview)
Router.get('/getReviews',getReviews)
Router.get('/getAllReview',getAllReview)


module.exports = Router;
