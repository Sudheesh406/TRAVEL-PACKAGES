const { createNewTourPackage,findPackage, findAllPackage,findLocationPackage } = require("../services/TravelService");

const createPackage = async (req, res) => {
  try {
    let id = req.User.id
    let packageData = req.body;
    let fullImages  = req.files
    let images = []
    fullImages.map((img)=>{
      images.push(img.location)
    })
      packageData.images = images
      packageData.tourOperator = id
      const locationObj = JSON.parse(packageData.locations);
      packageData.locations = locationObj
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
    }
  }
} catch (error) {
  res.status(500).json({
    message: "Failed to DisplayHomePackage",
    error: error.message
  });
}

}

//full check the conditon

module.exports = { createPackage,DisplayPackage, DisplayHomePackage,DisplayMorePackage,DisplayLocationPackage };
