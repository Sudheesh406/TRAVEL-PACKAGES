const {reviewUpdate} = require('../services/reviewService')

const newReview = async (req,res)=>{
    try {
        let data = req.body
        if(data){
           let result = await reviewUpdate(data)
           if(result)console.log("result",result)
        }
    } catch (error) {
        console.error("error found in newReview",error);
        res.status(400).json({message:"error found in review update",error})
    }
}

module.exports = {newReview}