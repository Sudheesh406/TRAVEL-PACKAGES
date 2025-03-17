const TourPackage = require("../models/TravelPackageSchema");

const createNewTourPackage = async (packageData) => {
  try {
    return await TourPackage.create(packageData);
  } catch (error) {
    throw new Error(error.message);
  }
}; 

const findPackage = async (value) => {
  try {
  if(value){
    if (value == 3) {
      return await TourPackage.find({isAvailable:true}).limit(3);
    }else{
      const [totalCount, tourPackages] = await Promise.all([
        TourPackage.countDocuments({ tourOperator: value }),
        TourPackage.find({ tourOperator: value, isAvailable:true }).limit(3)   
      ]);
      return { totalCount, tourPackages };
    }
  }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findAllPackage = async (lmt) => {
  try {
  if(lmt){
   if(lmt.limit > 8 && lmt.location == "Any Location") return await TourPackage.find({isAvailable:true}).skip(lmt-8).limit(8);
   if(lmt.limit > 8 && lmt.location != "Any Location") return await TourPackage.find({isAvailable:true,name:lmt.location}).skip(lmt.limit-8).limit(8);
}else{
  return await TourPackage.find({isAvailable:true}).limit(8);
}
  } catch (error) {
    throw new Error(error.message);
  }
};

const findLocationPackage = async (location) => {
  try {
    return await TourPackage.find({name:location}).limit(8);
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = { createNewTourPackage,findPackage,findAllPackage,findLocationPackage };
