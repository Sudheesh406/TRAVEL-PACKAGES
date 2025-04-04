const express = require("express")
const Router = express.Router();
const auth = require('../middleware/userAuth')
const {Signup,login,operatorSignup,getUser,logOut} = require("../controls/login")

Router.post('/login',login)
Router.get('/logOut',logOut)
Router.get('/getUser',auth,getUser)
Router.post('/Signup',Signup)
Router.post('/operatorSignup',operatorSignup)
module.exports = Router;
 