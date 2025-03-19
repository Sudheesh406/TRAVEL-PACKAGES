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
      return await TourPackage.find({isAvailable:true}).sort({createdAt:-1}).limit(3);
    }else{
      const [totalCount, tourPackages] = await Promise.all([
        TourPackage.countDocuments({ tourOperator: value }),
        TourPackage.find({ tourOperator: value, isAvailable:true }).sort({createdAt:-1}).limit(3)   
      ]);
      return { totalCount, tourPackages };
    }
  }
  } catch (error) {
    throw new Error(error.message);
  }
};

const findAllPackage = async (data) => {
  if(data){
  try {
    const query = { isAvailable: true };
    if (data.location && data.location !== "Any Location") {
      query.name = data.location;
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
    console.log("Query:", query);
    const skip = data.limit ? data.limit - 9 : 0;
    const limit = 9;
    const packages = await TourPackage.find(query).skip(skip).limit(limit);
    return packages.length > 0 ? packages : null;
  } catch (error) {
    throw new Error(error.message);
  }
}else{
  return await TourPackage.find({isAvailable:true}).limit(9);
}
};


const findLocationPackage = async (data) => {
  try {
    if(data.location != "Any Location" && data.duration == "Any Duration" && data.filter == ""){
      return await TourPackage.find({name:data.location}).limit(9);
    }else if (data.location == "Any Location" && data.duration != "Any Duration" && data.filter == ""){
      if(data.duration[0] == 8){
        let value = await TourPackage.find({duration:{$gte:8}}).limit(9);
        if(value.length > 0){
          return value
        }else{
          return null
        }
      }else{
        let value = await TourPackage.find({
          duration: {
              $gte: data.duration[0], 
              $lte: data.duration[1]  
          }
      }).limit(9)

      if(value.length > 0){
        return value
      }else{
        return null
      }
    }
    }else if(data.location == "Any Location" && data.duration == "Any Duration" && data.filter != ""){
     let value = await TourPackage.find({
        price: {
          $gte: data.filter[0],
          $lte: data.filter[1]  
        }
      }).limit(9);
      if(value.length > 0){
        return value
      }else{
        return null
      }
    }else if(data.location != "Any Location" && data.duration != "Any Duration" && data.filter == ""){
      let firstValue = await TourPackage.find({
        duration: {
            $gte: data.duration[0], 
            $lte: data.duration[1]  
        }
    }).limit(9)
    let secondValue = await TourPackage.find({
      name:data.location
    }).limit(9)
        if(firstValue.length >0 && secondValue.length >0){
          return await TourPackage.find({
            duration: {
                $gte: data.duration[0], 
                $lte: data.duration[1]  
            }, name:data.location
          }).limit(9)
        }else{
          return null
        }

    }else if(data.location != "Any Location" && data.duration != "Any Duration" && data.filter != ""){
      let firstValue = await TourPackage.find({
        duration: {
            $gte: data.duration[0], 
            $lte: data.duration[1]  
        }
    }).limit(9)
    let secondValue =  await TourPackage.find({
      name:data.location
    }).limit(9)
    let thirdValue = await TourPackage.find({
      price: {
        $gte: data.filter[0],
        $lte: data.filter[1]  
      }
    }).limit(9);
    if(firstValue.length >0 && secondValue.length >0 && thirdValue.length >0){
    return await TourPackage.find({
        duration: {
            $gte: data.duration[0], 
            $lte: data.duration[1]  
        },
        name:data.location,
        price: {
          $gte: data.filter[0],
          $lte: data.filter[1]  
        }
    }).limit(9)
    }else{
      return null
    }

    }else if(data.location == "Any Location" && data.duration != "Any Duration" && data.filter != ""){
      let firstValue = await TourPackage.find({
        duration: {
            $gte: data.duration[0], 
            $lte: data.duration[1]  
        }
    }).limit(9)
    let secondValue = await TourPackage.find({
      price: {
        $gte: data.filter[0],
        $lte: data.filter[1]  
      }
  }).limit(9)
  if(firstValue.length >0 && secondValue.length >0 ){
    return await TourPackage.find({
      duration: {
          $gte: data.duration[0], 
          $lte: data.duration[1]  
      },
      price: {
        $gte: data.filter[0],
        $lte: data.filter[1]  
      }
  }).limit(9)
  }else{
    return null
  }
    }else if(data.location != "Any Location" && data.duration == "Any Duration" && data.filter != ""){
      let firstValue = await TourPackage.find({
        name:data.location
    }).limit(9)
    let secondValue = await TourPackage.find({
      price: {
        $gte: data.filter[0],
        $lte: data.filter[1]  
      }
    }).limit(9)
    if(firstValue.length >0 && secondValue.length >0){
      return await TourPackage.find({
        price: {
          $gte: data.filter[0],
          $lte: data.filter[1]  
        },
        name:data.location
      }).limit(9)
    }else{
      return null
    }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//now location work duration work . so need to work filter and all this 

module.exports = { createNewTourPackage,findPackage,findAllPackage,findLocationPackage };
