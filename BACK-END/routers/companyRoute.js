const express = require("express")
const Router = express.Router();
const auth = require('../middleware/userAuth')
const {registeredCompany,getCompany,editCompanyProfile,checkRegister}= require('../controls/company')
const {upload} = require('../middleware/uploadImageToS3')
Router.post('/registeredCompany',auth,registeredCompany)
Router.get('/getCompany',auth,getCompany)
Router.get('/checkRegister',auth,checkRegister)
Router.post('/editCompanyProfile',upload.array('images',1),auth,editCompanyProfile)

module.exports = Router;