const { createNewTourPackage,findPackage, findAllPackage,
  findLocationPackage,findPackageDetail,getCompanyPackage,acticeNonActive,BookedDetails } = require("../services/TravelService");

const createPackage = async (req, res) => {
  try {
    let packageData = req.body;
    let fullImages  = req.files
    let images = []
    fullImages.map((img)=>{
      images.push(img.location)
    })
      packageData.images = images
      const locationObj = JSON.parse(packageData.locations);
      packageData.locations = locationObj
      packageData.availableSeat = packageData.vehicleSeatNumber
    const savedPackage = await createNewTourPackage(packageData);
    res.status(201).json({
      message: "Tour package created successfully",savedPackage 
    });
  } catch (error) {
    console.error("Error creating tour package:", error);
    res.status(500).json({ 
      message: "Failed to create tour package",
      error: error.message
    });
  }
};

const DisplayPackage = async (req, res) => {
  try {
    const Package = await findAllPackage()
    if(Package) res.status(201).json({message: "Total Package",Package});
  } catch (error) {
    console.error("Error in DisplayPackage :", error);
    res.status(500).json({
      message: "Failed to DisplayPackage tour package",
      error: error.message
    });
  }
};

const DisplayMorePackage = async (req, res) => {
  let lmt = req.body
  try {
    const Package = await findAllPackage(lmt)
    if(Package) res.status(201).json({message: "Total Package",Package});
  } catch (error) {
    console.error("Error in DisplayPackage :", error);
    res.status(500).json({
      message: "Failed to DisplayPackage tour package",
      error: error.message
    });
  }
};

const DisplayHomePackage = async (req, res) => {
   limit = 3
  try {
    const Package = await findPackage(limit);
    if(Package) res.status(201).json({message: "Total Package",Package});
  } catch (error) {
    console.error("Error in DisplayHomePackage:", error);
    res.status(500).json({
      message: "Failed to DisplayHomePackage",
      error: error.message
    });
  }
};

const DisplayLocationPackage = async (req, res) => {
  let value =  req.body
  value.limit = 9
  ;
try {
  if(req.body.location != "Any Location"  || req.body.duration != "Any Duration" || req.body.filter != ""){
    let data = await findLocationPackage(value)
    if(data.length > 0){
      res.status(200).json({
        message: "success",
        data
      })
    }else{
      res.status(400).json({
        message: "nothing found",
      })
    }
  }
} catch (error) {
  res.status(401).json({
    message: "Failed to DisplayHomePackage",
    error: error.message
  });
}
}

const findCompanyPackages = async (req,res)=>{
  try {
    let id  = req.params
    let result = await getCompanyPackage(id)
    if(result)res.status(200).json({message:"successfully find packages",result})
  } catch (error) {
    console.error("error found in findAllPackages",error);
    res.status(400).json({message:"error in finding packages",error})
  }
}

let getPackage = async (req,res)=>{
  try {
    let value = req.params
    if(value){
      let result = await findPackageDetail(value.id)
     res.status(200).json({message:"successfully get package",result})
 }else{
   res.status(400).json({message:"package not found"})
 }
  } catch (error) {
    console.error("error found in getPackage",error);
    res.status(400).json({message:"error found in get package",error})
  }
}

const packageHandle = async (req,res)=>{
  try {
    let {id} = req.body
    console.log("id",id)
    let result = await acticeNonActive(id)
    if(result)res.status(200).json({message:"Sucessfully change",result})
  } catch (error) {
    console.error("error found in packageHandle",error);
    res.status(200).json({message:"error found in packageHandle",error})
  }
}

const PackageBookedDetails = async (req,res)=>{
  try {
    let {id} = req.params 
    let data = await BookedDetails(id)
    if(data.length > 0)res.status(200).json({message:"successfully finded package Booked details",data})
  } catch (error) {
    console.error("error found in PackageBookedDetails",error);
    res.status(400).json({message:"error in finding booking Details",error})
  }
}

module.exports = { createPackage,DisplayPackage, DisplayHomePackage,packageHandle,
  DisplayMorePackage,DisplayLocationPackage,getPackage,findCompanyPackages,PackageBookedDetails };
