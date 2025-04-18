const TourPackage = require("../models/TravelPackageSchema");
const companyDetails = require("../models/CompanySchema")
const Booked = require("../models/BookedSchema")

const createNewTourPackage = async (packageData) => {
  try {
    return await TourPackage.create(packageData);
  } catch (error) {
    throw new Error(error.message);
  }
}; 

const findPackage = async (value) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  try {
  if(value){
    if (value == 3) {
      return await TourPackage.find({isAvailable:true,Date: { $gte: today }}).sort({createdAt:-1}).limit(3);
    }else{
      let companyData = await companyDetails.find({operator:value})
      let id = companyData[0]
      const [totalCount, tourPackages] = await Promise.all([
        TourPackage.countDocuments({ company: id }),
        TourPackage.find({company: id, isAvailable:true }).sort({createdAt:-1}).limit(1)   
      ]);
      return { totalCount, tourPackages};
    }
  }
  } catch (error) {
    throw new Error(error.message);
  }
};

 const getCompanyPackage = async (data)=>{
  try {
    let id = data.id 
    let result = await TourPackage.find({company:id})
    if(result)return result
  } catch (error) {
    console.error("error found in getCompanyPackage",error);
    return null
  }
 }

const findAllPackage = async (data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  if(data){
      try {
        const query = { isAvailable: true , Date: { $gte: today }};
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
        const packages = await TourPackage.find(query).skip(skip).limit(limit)
        const totalCount = await TourPackage.countDocuments(query);
        let detail = {packages,totalCount}
        return packages.length > 0 ? detail : null;
      } catch (error) {
        throw new Error(error.message);
      }
  
}else{
   let all = await TourPackage.find({isAvailable:true, Date: { $gte: today }}).sort({createdAt:-1}).limit(9);
  let count = await TourPackage.countDocuments({ isAvailable: true, Date: { $gte: today } })
  let data = {all,count}
  return data

}
};


const findLocationPackage = async (data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0)
  try {
    let query = { isAvailable: true , Date: { $gte: today }};
    if (data.location !== "Any Location") {
      query.name = { $regex: '^' + data.location, $options: 'i' };
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
    const count = await TourPackage.countDocuments(query)
    let details = {result,count}
    return result.length > 0 ? details : [];
    
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

const acticeNonActive = async (id) => {
  try {
    let package = await TourPackage.find({ _id: id }); 

    if (!package.length) {
      console.log("Package not found");
      return null;
    }

    const updatedPackage = await TourPackage.findOneAndUpdate(
      { _id: id },
      { isAvailable: !package[0].isAvailable }, 
      { new: true } 
    );
    return updatedPackage;
  } catch (error) {
    console.error("Error found in acticeNonActive", error);
    return null;
  }
};

const BookedDetails = async(id)=>{
  try {
    let booking = await Booked.find({packageId: id})
    return booking
  } catch (error) {
    console.error("error found in BookedDetails",error);
    return null
  }
}


module.exports = { createNewTourPackage,findPackage,findAllPackage,findLocationPackage,
  findPackageDetail,getCompanyPackage,acticeNonActive,BookedDetails };
