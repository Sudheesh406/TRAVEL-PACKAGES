const {createRegisteredCompany,findCompanyById, updateCompanyProfile, findRegister} =require("../services/companyService")
const { findPackage } = require("../services/TravelService");

const registeredCompany = async (req,res)=>{
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
  let value = req.User

  if(value){
  try {
    let result = await findCompanyById(value.id)
    const data = await findPackage(value.id)
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
}

const editCompanyProfile = async (req,res)=>{
  let img = req.files
  console.log("img",img)
  let profile = req.body
  if(img.length > 0){
      let image = img [0].location
      profile.image = image
  }
try {
  let result = await updateCompanyProfile(profile)
  if(result)return res.status(200).json({message:"successfully Updated",result})
} catch (error) {
  return res.status(400).json({message:"error found in update company",error})
}
}

const checkRegister = async(req,res)=>{
  id = req.User.id
  try {
    let result = await findRegister(id)
    if(result){
    return res.status(200).json({message:"It is a Registered company",result})
    }else{
      return res.status(200).json({message:"It is not Registered",result})
    }
  } catch (error) {
    console.log("error found in checkRegister",error);
    return res.status(400).json({message:"error found in checking Register",error})

  }
}

module.exports = { registeredCompany,getCompany, editCompanyProfile,checkRegister}