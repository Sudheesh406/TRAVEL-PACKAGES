const {reviewUpdate, getReviewToHome, getReviewToPage} = require('../services/reviewService')

const newReview = async (req,res)=>{
    try {
        let data = req.body
        let images = req.files
        let imgLocations = []
        images.forEach((element) => {
            imgLocations.push(element.location)
        });
        if(data){
           let result = await reviewUpdate(data,imgLocations)
           if(result)res.status(200).json({message:"review added successfully",result}) 
        }else{
            res.status(400).json({message:"missing some fields"})
        }
    } catch (error) {
        console.error("error found in newReview",error);
        res.status(400).json({message:"error found in review update",error})
    }
}

const getReviews = async(req,res)=>{
    try {
     let result = await getReviewToHome()
     if(result)res.status(200).json({message:"review get successfully",result})
    } catch (error) {
        console.error('error found in getReviews',error);
        res.status(400).json({message:"error in getting reviews",error})
    }
}

const getAllReview = async(req,res)=>{
    try {
     let result = await getReviewToPage()
     if(result)res.status(200).json({message:"review get successfully",result})
    } catch (error) {
        console.error('error found in getReviews',error);
        res.status(400).json({message:"error in getting reviews",error})
    }
}

module.exports = {newReview,getReviews,getAllReview}