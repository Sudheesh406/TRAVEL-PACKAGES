const {newBooking ,bookingDetails, BookingHistory} = require('../services/bookingService')

async function booking (req,res){
    try {
        let details = req.body
        if(details){
            console.log("details",details);
            
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


const getbookingDetails = async (req,res)=>{
    let id = req.params
    if(id){
        try {
            let result = await bookingDetails(id)
            if(result)res.status(200).json({message:"successfully find booking details",result})
        } catch (error) {
            console.error("error found in getbookingDetails",error);
            res.status(400).json({message:"error font in  booking details",error})
        }

    }else{
        res.status(404).json({message:"id is missing",error})
    }
}

const getBookingHistory = async (req,res)=>{
    let {id} = req.params
    try {
        let result = await BookingHistory(id)
        if(result)res.status(200).json({message:"successfully finded Booking history",result})
    } catch (error) {
        console.error("error foundgetBookingHistory",error);
        res.status(400).json({message:"error in find Booking history",error})
    }
}

module.exports = {booking, getbookingDetails, getBookingHistory}