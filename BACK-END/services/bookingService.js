const Booked = require('../models/BookedSchema') 
const TourPackage = require('../models/TravelPackageSchema')

const newBooking = async (data)=>{
    try {
        let obj = data.data
        let result = await Booked.create({
            packageName: obj.packageName,
            packageId: obj.packageId,
            price: obj.price,
            Date: obj.Date,
            user: obj.user,
            companyDetails: obj.company,
            seat: obj.seat,
            image: obj.image,
            companyName: obj.companyName
          })
          let package = await TourPackage.findByIdAndUpdate(
            obj.packageId, 
            { $inc: { availableSeat: - obj.seat } }, 
            { new: true } 
        );
        if(result && package){
            return result
        }else{
            return null
        }
    } catch (error) {
        console.error("error found in new booking",error);
        
    }
}

const bookingDetails = async (id)=>{
    if(id){
        try {
            let result = await Booked.find({user:id.id})
            if(result)return result
        } catch (error) {
            console.error("error found in bookingDetails",error);
            
        }
    }else{
        return null
    }
}
module.exports = {newBooking, bookingDetails}