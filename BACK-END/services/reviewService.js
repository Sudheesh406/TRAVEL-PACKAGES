const TourPackage = require('../models/TravelPackageSchema')
const User = require('../models/userSchema')
const Review = require('../models/reviewSchema')

const reviewUpdate = async(data,imgLocations)=>{
    try {
        let package = await TourPackage.findById(data.selectedPackageId);
        let user = await User.findById(data.userId);
    
        if (!package || !user) {
            console.log('Package or User not found');
            return null;
        }
    
        let existingReview = await Review.findOne({
            userId: data.userId,
            packageId: data.selectedPackageId
        });
    
        let value = {
            userId: data.userId,
            userName: user.username,
            userProfile: user.image,
            image: imgLocations,
            packageId: data.selectedPackageId,
            packageName: package.name,
            PackageDescription: package.description,
            review: data.review,
            star: data.rating,
            company:package.company
        };
    
        if (existingReview) {
            let updatedReview = await Review.findByIdAndUpdate(existingReview._id, value, { new: true });
            return updatedReview;
        } else {
            let newReview = await Review.create(value);
            return newReview;
        }
    } catch (error) {
        console.error('Error in review update:', error);
        return null;
    }
    
}

const getReviewToHome = async () => {
    try {
        let result = await Review.find({ star: { $gte: 4 } }).limit(3);
        if (result.length >0) return result
    } catch (error) {
        console.error('Error found in getReviewToHome:', error);
        return null;
    }
};

const getReviewToPage = async () => {
    try {
        let result = await Review.find()
        if (result.length >0) return result
    } catch (error) {
        console.error('Error found in getReviewToHome:', error);
        return null;
    }
};


module.exports = {reviewUpdate, getReviewToHome,getReviewToPage}


