const { DetailsToAdminPage,DisplayAllUser,HandleUserAcess,HandleOperatorAcess,DisplayAllOperators,DisplayAllPayments } = require("../services/adminService");

const getAdminPageDetails = async (req, res) => {
 try {
    let result = await DetailsToAdminPage()
    if(result)res.status(200).json({ message: "Successfully find Details for Admin page",result });

 } catch (error) {
    console.error("error found in getAdminPageDetails", error);
    res.status(400).json({ message: "Internal server error",error });
 }
}

const UserDetails = async(req,res)=>{
   try {
      let result = await DisplayAllUser()
      if(result)res.status(200).json({message:"Successfully finded all users",result})
   } catch (error) {
      console.error('error found in geting UserDetails',error);
      res.status(400).json({message:"Not find UserDetails",error})
   }
}

const OperatorDetails = async(req,res)=>{
   try {
      let result = await DisplayAllOperators()
      if(result)res.status(200).json({message:"Successfully finded all Operator",result})
   } catch (error) {
      console.error('error found in geting OperatorDetails',error);
      res.status(400).json({message:"Not find OperatorDetails",error})
   }
}

const PaymentDetails = async(req,res)=>{
   try {
      let result = await DisplayAllPayments()
      if(result)res.status(200).json({message:"Successfully finded all PaymentDetails",result})
   } catch (error) {
      console.error('error found in geting PaymentDetails',error);
      res.status(400).json({message:"Not find PaymentDetails",error})
   }
}

const UserAcess = async(req,res)=>{
   let id = req.body
   try {
      let result = await HandleUserAcess(id)
      if(result)res.status(200).json({message:"Successfully finded all users",result})
   } catch (error) {
      console.error('error found in geting UserDetails',error);
      res.status(400).json({message:"Not find UserDetails",error})
   }
}

const OperatorAcess = async(req,res)=>{
   let id = req.body
   try {
      let result = await HandleOperatorAcess(id)
      if(result)res.status(200).json({message:"Successfully finded all Operator",result})
   } catch (error) {
      console.error('error found in geting OperatorDetails',error);
      res.status(400).json({message:"Not find OperatorDetails",error})
   }
}

module.exports = { getAdminPageDetails,UserDetails,UserAcess,OperatorAcess,OperatorDetails,PaymentDetails };