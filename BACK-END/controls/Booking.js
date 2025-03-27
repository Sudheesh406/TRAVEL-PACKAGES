const {newBooking} = require('../services/bookingService')

async function booking (req,res){
    try {
        let details = req.body
        if(details){
         let value = await newBooking(details)
         if(value){
            res.status(200).json({message:"booking successfull"})
         }else{
            res.status(400).json({message:"Booking is not confirmed"})
         }
        }else{
            res.status(400).json({message:"data is missing"})
        }
    } catch (error) {
        console.error("error found in packageBooking",error);
        res.status(400).json({message:"error found in booking",error})
    }
}

module.exports = {booking}