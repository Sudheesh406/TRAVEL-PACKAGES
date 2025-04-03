const express = require("express")
const Router = express.Router()
const auth = require('../middleware/userAuth')
const {createPackage, DisplayPackage, DisplayHomePackage,DisplayMorePackage,
    DisplayLocationPackage,getPackage,findCompanyPackages,packageHandle,PackageBookedDetails} = require("../controls/TravelPackage")
const {upload} = require('../middleware/uploadImageToS3')

Router.post("/newPackage",upload.array('images', 10),createPackage)
Router.get("/DisplayPackage",DisplayPackage)
Router.post("/DisplayMorePackage",DisplayMorePackage)
Router.get("/DisplayHomePackage",DisplayHomePackage)
Router.post("/DisplayLocationPackage",DisplayLocationPackage)
Router.get("/getPackage/:id", getPackage);
Router.get("/findAllPackages/:id", findCompanyPackages);
Router.post("/packageHandle", packageHandle);
Router.get("/PackageBookedDetails/:id", PackageBookedDetails);
 
module.exports = Router