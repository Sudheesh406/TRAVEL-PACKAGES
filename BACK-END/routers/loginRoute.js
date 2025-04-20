const express = require("express")
const Router = express.Router();
const auth = require('../middleware/userAuth')
const {Signup,login,operatorSignup,getUser,logOut,reSentOtp,ChangePassword,Newpassword} = require("../controls/login")

Router.post('/login',login)
Router.get('/logOut',logOut)
Router.get('/getUser',auth,getUser)
Router.post('/Signup',Signup)
Router.post('/operatorSignup',operatorSignup)
Router.post('/reSentOtp',reSentOtp)
Router.post('/ChangePassword',ChangePassword)
Router.post('/Newpassword',Newpassword)
module.exports = Router;
 