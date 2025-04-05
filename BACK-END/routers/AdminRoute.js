const express = require("express")
const Router = express.Router();
const {getAdminPageDetails,UserDetails,UserAcess,OperatorAcess,OperatorDetails,PaymentDetails} = require("../controls/Admin")
const auth = require("../middleware/userAuth")
Router.get('/getAdminPageDetails',auth,getAdminPageDetails)
Router.get('/UserDetails',auth,UserDetails)
Router.post('/UserAcess',auth,UserAcess)
Router.post('/OperatorAcess',auth,OperatorAcess)
Router.get('/OperatorDetails',auth,OperatorDetails)
Router.get('/PaymentDetails',auth,PaymentDetails)


module.exports = Router;
