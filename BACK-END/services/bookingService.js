const Booked = require('../models/BookedSchema') 
const TourPackage = require('../models/TravelPackageSchema')

const newBooking = async (data)=>{
    try {
        console.log("data:::",data.data)
        let obj = data.data
        let result = await Booked.create({
            packageName: obj.packageName,
            
            packageId: obj.packageId,
            price: obj.price,
            Date: obj.Date,
            user: obj.user,
            companyDetails: obj.company,
            seat: obj.seat
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
module.exports = {newBooking}