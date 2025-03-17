const {createRegisteredCompany,findCompanyById} =require("../services/companyService")
const { findPackage } = require("../services/TravelService");const registeredCompany = async (req,res)=>{
    let data = req.body
    let operator = req.User.id
    if(data){
      try {
       let result = await createRegisteredCompany(data,operator) 
       if(result)res.status(200).json({message:"created successfully",result})
      } catch (error) {
       console.error("error found in registeredCompany",error);
       res.status(400).json({message:"error found in registeredCompany",error})
      }
    }
}

const getCompany = async (req,res)=>{
  try {
    let result = await findCompanyById(req.User.id)
    const data = await findPackage(req.User.id)
    let totalCount = data.totalCount
    let tourPackages = data.tourPackages
    if(result){
    return res.status(200).json({ message: "company details",result,totalCount,tourPackages })   
     }else{
      return res.status(400).json({ message: "No user Found" })    
    }
  } catch (error) {
    console.error("error found in getUser",error);
    return res.status(400).json({ message: "error found in getUser" })    
  }
}

module.exports = { registeredCompany,getCompany}