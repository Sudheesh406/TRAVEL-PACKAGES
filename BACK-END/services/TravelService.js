const TourPackage = require("../models/TravelPackageSchema");
const companyDetails = require("../models/CompanySchema")

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
      return await TourPackage.find({isAvailable:true}).sort({createdAt:-1}).limit(3);
    }else{
      let companyData = await companyDetails.find({operator:value})
      let id = companyData[0]
      const [totalCount, tourPackages] = await Promise.all([
        TourPackage.countDocuments({ company: id }),
        TourPackage.find({company: id, isAvailable:true }).sort({createdAt:-1}).limit(3)   
      ]);
      return { totalCount, tourPackages};
    }
  }
  } catch (error) {
    throw new Error(error.message);
  }
};

// const findBySearch = async (search)=>{
//   try {
//     if(search){
//       let upperCaseName = search.toUpperCase();
//     let value = await TourPackage.find({name:upperCaseName}).limit(9)
//     if(value.length >0){
//       return value
//     }else{
//       return null
//     }
//     }else{
//       return null
//     }
//   } catch (error) {
//     console.error("error found in findBySearch",error);
    
//   }
// }

const findAllPackage = async (data) => {
  if(data){
      try {
        const query = { isAvailable: true };
        if (data.location && data.location !== "Any Location") {
          let upperCaseName = data.location.toUpperCase()
          query.name = upperCaseName
        }
        if (data.duration && data.duration !== "Any Duration") {
          if (data.duration[0] === 8) {
            query.duration = { $gte: 8 };
          } else {
            query.duration = {
              $gte: data.duration[0],
              $lte: data.duration[1],
            };
          }
        }
        if (data.filter && data.filter.length === 2) {
          query.price = {
            $gte: data.filter[0],
            $lte: data.filter[1],
          };
        }
        const skip = data.limit ? data.limit - 9 : 0;
        const limit = 9;
        const packages = await TourPackage.find(query).skip(skip).limit(limit);
        return packages.length > 0 ? packages : null;
      } catch (error) {
        throw new Error(error.message);
      }
  
}else{
  return await TourPackage.find({isAvailable:true}).sort({createdAt:-1}).limit(9);
}
};


const findLocationPackage = async (data) => {
  
  try {
    let query = {};
    if (data.location !== "Any Location") {
      query.name = data.location.toUpperCase();
    }
    if (data.duration !== "Any Duration") {
      if (data.duration[0] === 8) {
        query.duration = { $gte: 8 };
      } else {
        query.duration = { $gte: data.duration[0], $lte: data.duration[1] };
      }
    }
    if (data.filter !== "") {
      query.price = { $gte: data.filter[0], $lte: data.filter[1] };
    }
    const result = await TourPackage.find(query).limit(9);
    return result.length > 0 ? result : [];
    
  } catch (error) {
    throw new Error(error.message);
  }
};

const findPackageDetail = async (id) => {
  try {
    let data = await TourPackage.find({ _id: id }); 
    if (!data.length) return []; 
    let compId = data[0].company;
    let cmp = await companyDetails.findOne({ _id: compId });
    if (cmp) {
      let modifiedData = data.map((item) => {
        let obj = item.toObject(); 
        obj.companyName = cmp.companyName; 
        return obj;
      });
      return modifiedData; 
    }
    return data; 
  } catch (error) {
    console.error("Error found in findPackageDetail", error);
  }
};



module.exports = { createNewTourPackage,findPackage,findAllPackage,findLocationPackage,findPackageDetail };
