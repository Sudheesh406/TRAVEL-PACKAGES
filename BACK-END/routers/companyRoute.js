const express = require("express")
const Router = express.Router();
const auth = require('../middleware/userAuth')
const {registeredCompany,getCompany}= require('../controls/company')

Router.post('/registeredCompany',auth,registeredCompany)
Router.get('/getCompany',auth,getCompany)
module.exports = Router;

