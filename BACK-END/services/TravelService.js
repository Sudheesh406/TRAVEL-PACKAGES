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
   if(lmt.limit > 9 && lmt.location == "Any Location") return await TourPackage.find({isAvailable:true}).skip(lmt.limit-9).limit(9);
   if(lmt.limit > 9 && lmt.location != "Any Location") return await TourPackage.find({isAvailable:true,name:lmt.location}).skip(lmt.limit-9).limit(9);
}else{
  return await TourPackage.find({isAvailable:true}).limit(9);
}
  } catch (error) {
    throw new Error(error.message);
  }
};

const findLocationPackage = async (data) => {
  try {
    if(data.location != "Any Location"){
      return await TourPackage.find({name:data.location}).limit(9);
    }else if (data.duration != "Any Duration"){
      if(data.duration[0] == 8){
        return await TourPackage.find({duration:{$gte:8}}).limit(9);
      }else{
        return await TourPackage.find({
          duration: {
              $gte: data.duration[0], 
              $lte: data.duration[1]  
          }
      }).limit(9)
    }
    }else if(data.filter != ""){
     return await TourPackage.find({
        price: {
          $gte: data.filter[0],
          $lte: data.filter[1]  
        }
      }).limit(9);
    }

  } catch (error) {
    throw new Error(error.message);
  }
};
//now location work duration work . so need to work filter and all this 


module.exports = { createNewTourPackage,findPackage,findAllPackage,findLocationPackage };
