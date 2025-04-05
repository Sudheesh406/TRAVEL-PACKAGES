const User = require('../models/userSchema');
const TourOperator = require('../models/TourOperatorSchema');    
const RegistrationPayment = require('../models/RegistrationPaymentSchema');
const companyDetails = require("../models/CompanySchema");

const DetailsToAdminPage = async () => {
  try {
    const userCount = await User.countDocuments({ role: "user" });
    const operators = await TourOperator.countDocuments()
    const payments = await RegistrationPayment.find({}, 'amount');
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    return {userCount,operators,totalAmount}
  } catch (error) {
    console.error("Error fetching admin page details:", error);
    return null
  }
}

const DisplayAllUser = async ()=>{
  try {
    let allUser = await User.find({ role: "user" }).select("-password");
    if(allUser)return allUser
  } catch (error) {
    console.error("error found in finding user Details",error);
    return null
  }
}

const DisplayAllOperators = async ()=>{
  try {
    let allOperator = await TourOperator.find().select("-password");
    if(allOperator)return allOperator
  } catch (error) {
    console.error("error found in finding Operator Details",error);
    return null
  }
}

const DisplayAllPayments = async ()=>{
  try {
    let allPayments = await companyDetails.find()
    if(allPayments)return allPayments
  } catch (error) {
    console.error("error found in finding Operator Details",error);
    return null
  }
}

const HandleUserAcess = async (id) => {
  const userId = id.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return null;
    }
    if (user.acess === false) {
      user.acess = true;
    } else {
      user.acess = false;
    }
    await user.save();
    return user;
  } catch (error) {
    console.error("Error while updating user acess:", error);
    return null;
  }
};

const HandleOperatorAcess = async (id) => {
  const OperatorId = id.id;

  try {
    let Operator = await TourOperator.findById(OperatorId);
    if (!Operator) {
      console.error("Operator not found");
      return null;
    }
    if (Operator.acess === false) {
      Operator.acess = true;
    } else {
      Operator.acess = false;
    }
    await Operator.save();
    return Operator;
  } catch (error) {
    console.error("Error while updating Operator acess:", error);
    return null;
  }
};



module.exports ={DetailsToAdminPage,DisplayAllUser,HandleUserAcess,HandleOperatorAcess,DisplayAllOperators,DisplayAllPayments}