const companyDetails = require("../models/CompanySchema");
const Booked = require('../models/BookedSchema')

const createRegisteredCompany = async (data,operator) => {

    if (data) {
      data.operator = operator
      try {
        let result = await companyDetails.create(data);
        if (result) {
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
          if (data) {
            return {data,booking}
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