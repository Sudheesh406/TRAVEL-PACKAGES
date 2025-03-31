const User = require('../models/userSchema')

const updateProfile = async (newData) => {
    try {
        if (!newData?.id) {
            throw new Error("User ID is required");
        }
        const updatedUser = await User.findByIdAndUpdate(
            newData.id, 
            { $set: newData }, 
            { new: true, runValidators: true }
        );
        return updatedUser;
    } catch (error) {
        console.error("Error in profile updation:", error);
        return null;
    }
};

module.exports = {updateProfile}