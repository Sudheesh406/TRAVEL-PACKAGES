const Booked = require('../models/BookedSchema') 
const TourPackage = require('../models/TravelPackageSchema')
const Review = require('../models/reviewSchema')

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
            companyName: obj.companyName,
            userName : obj.userName,
            userEmail : obj.userEmail,
            description : obj.description
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
            let result = await Booked.find({ user: id.id }).sort({ Date: -1 }).limit(1);
            if(result){
                return result
            }else{
                result = await Booked.find({companyDetails: id.id }).sort({ Date: -1 }).limit(1);
                return result
            }
        } catch (error) {
            console.error("error found in bookingDetails",error);
            
        }
    }else{
        return null
    }
}

const BookingHistory = async(id)=>{
    if(id){
        return Booked.find({ user: id })

    }else{
        return null
    }
}

const popularDestination = async () => {
    try {
        let data = await Booked.aggregate([
            { $group: { _id: "$packageId", count: { $sum: 1 }, 
            packageName: { $first: "$packageName" }, image: { $first: "$image" } } },
            { $sort: { count: -1 } }, 
            { $limit: 4 },
            { 
                $lookup: { 
                    from: "tourpackages", 
                    localField: "_id", 
                    foreignField: "_id", 
                    as: "packageDetails" 
                } 
            }, 
            { $unwind: "$packageDetails" } 
        ]);
        
        return data;
    } catch (error) {
        console.error('Error in popularDestination', error);
        return null;
    }
};


module.exports = {newBooking, bookingDetails, BookingHistory, popularDestination}