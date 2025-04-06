const companyDetails = require("../models/CompanySchema");
const Booked = require('../models/BookedSchema')
const Review = require('../models/reviewSchema')
const RegistrationPayment = require('../models/RegistrationPaymentSchema')
 
const createRegisteredCompany = async (data,operator) => {

    if (data) {
      data.operator = operator
      try {
        let result = await companyDetails.create(data);
        let payment = await RegistrationPayment.create({operatorId:operator, gstNumber:data.gstNumber, companyName:data.companyName, amount:499})

        if (result && payment) {
          return result;    
        } else {
          return null;
        }
      } catch (error) {
        console.error("error found in createRegisteredCompany", error);
      }
    }
  };

  async function findCompanyById(id) {
    if (id) {
        try {
          let data = await companyDetails.findOne({operator: id });
          let booking = await Booked.find({companyDetails: data._id })
          let reviews = await Review.find({ company: data._id });

          let packageRatings = {};
  
       if(reviews){
        reviews.forEach(review => {
              const { packageId, star } = review;
              
              if (!packageRatings[packageId]) {
                  packageRatings[packageId] = { total: 0, count: 0 };
              }
              
              packageRatings[packageId].total += star;
              packageRatings[packageId].count += 1;
          });
        }
  
          let averageRatings = {};
          for (let packageId in packageRatings) {
              averageRatings = packageRatings[packageId].total / packageRatings[packageId].count;
          }  
          if (data) {
            return {data,booking,averageRatings}
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error found in finding company:", error);
        }
      } else {
        console.log("No data provided");
        return null;
      }
  }


  const updateCompanyProfile = async (newData) => {
    try {
        if (!newData?.id) {
            throw new Error("User ID is required");
        }
        const updated = await companyDetails.findByIdAndUpdate(
            newData.id, 
            { $set: newData }, 
            { new: true, runValidators: true }
        );
        return updated;
    } catch (error) {
        console.error("Error in profile updation:", error);
        return null;
    }
};


  module.exports = {createRegisteredCompany,findCompanyById,updateCompanyProfile}