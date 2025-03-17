const companyDetails = require("../models/CompanySchema");

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
          if (data) {
            return data;
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

  module.exports = {createRegisteredCompany,findCompanyById}