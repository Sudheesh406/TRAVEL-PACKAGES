const { updateProfile } = require("../services/userProfileService");

async function profileEdit(req,res) {
    
    let img = req.files
    let profile = req.body
    if(img.length > 0){
        let image = img [0].location
        profile.image = image
    }
    try {
        let result = await updateProfile(profile)
        if(result)res.status(200).json({message:"Profile updated",result})
    } catch (error) {
        console.error("error found in profileEdit",error);
        res.status(400).json({message:"error found in updating",error})
    }
}

module.exports = {profileEdit}