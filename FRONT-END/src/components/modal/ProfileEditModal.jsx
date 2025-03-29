import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, MapPin, User, Calendar, Phone, X, Info } from "lucide-react";
import axios from '../../axios'

function ProfileEditModal({ isOpen, setIsOpen, setUserDetails, userDetails }) {
  const [formData, setFormData] = useState({
    username: userDetails.username || "",
    dateOfBirth: userDetails.DateOfBirth || "",
    profileImage: userDetails.image || "",
    location: userDetails.location || "",
    phoneNumber: userDetails.phone || "",
    about: userDetails.about || ""
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (e) => {
    setShowWarning(false);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const hasFormChanged = () => {
    let valid = false;
    if(formData.username === userDetails.username){
      valid = true;
    } else if (formData.username === userDetails.username){
      valid = true;
    } else if (formData.dateOfBirth === userDetails.DateOfBirth){
      valid = true;
    } else if  (formData.profileImage === userDetails.image){
      valid = true;
    }else if (formData.location === userDetails.location){
      valid = true;
    }else if (formData.phoneNumber === userDetails.phone){
      valid = true;
    }else if (formData.about === userDetails.about){
      valid = true;
    }
    return valid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let value = hasFormChanged();
    console.log()
    if (!value) {
      console.log("done",userDetails);
      // try {
      //   let result = await axios.post('/editUser')
      // } catch (error) {
        
      // }
      
    } else {
      console.log("formData",formData)
      setShowWarning(true);
    }
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex bg-opacity-30 z-50">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white h-full w-100 shadow-lg p-6 fixed left-0 top-0"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          User Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User size={18} /> Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Upload size={18} /> Profile Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                name="profileImage"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Info size={18} /> About
            </label>

            <input
              type="text"
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Calendar size={18} /> Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin size={18} /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Phone size={18} /> Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              placeholder="1234567890"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
          >
            Submit
          </button>

          {showWarning && (
            <p className="text-red-500 text-sm text-center mt-2">
              Please change and submit
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}

export default ProfileEditModal;
