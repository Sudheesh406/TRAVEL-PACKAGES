const express = require("express")
const Router = express.Router();
const {profileEdit} = require("../controls/userProfile")
const {upload} = require('../middleware/uploadImageToS3')
const auth = require('../middleware/userAuth')

Router.post('/editUser',upload.array('images',1),auth,profileEdit)

module.exports = Router;