const express = require("express")
const Router = express.Router();
const {profileEdit} = require("../controls/userProfile")
const {upload} = require('../middleware/uploadImageToS3')

Router.post('/editUser',upload.array('images',1),profileEdit)

module.exports = Router;