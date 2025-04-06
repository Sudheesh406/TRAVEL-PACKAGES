import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, MapPin, User, Calendar, Phone, X, Info } from "lucide-react";
import axios from '../../axios'

function OperatorProfileEditModal({ setIsOpen, details, setDetails }) {

  const [formData, setFormData] = useState({
    companyName: details.companyName,
    id: details._id,
    image: details.image || "",
    address: details.address || "",
    phoneNumber: details.phoneNumber || "",
    Tagline: details.Tagline || "",
  });

  const [showWarning, setShowWarning] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(details.image ? details.image : "");

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleInputChange = (e) => {
    setShowWarning(false);
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: [file],
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const hasFormChanged = () => {
    let valid = true;
    if (formData.companyName !== details.companyName) {
      valid = false;
    } else if (formData.image !== '' && formData.image !== details.image) {
      valid = false;
    } else if (formData.address !== '' && formData.address !== details.address) {
      valid = false;
    } else if (formData.phoneNumber !== '' && formData.phoneNumber !== details.phoneNumber) {
      valid = false;
    } else if (formData.Tagline !== '' && formData.Tagline !== details.Tagline) {
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    let value = hasFormChanged();
    if (!value) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("companyName", formData.companyName);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("phoneNumber", formData.phoneNumber);
        formDataToSend.append("Tagline", formData.Tagline);
        formDataToSend.append("id", formData.id);
        if (formData.image) {
          formDataToSend.append("images", formData.image[0])
        }
        const token = localStorage.getItem("token");
        let { data } = await axios.post("/Company/editCompanyProfile", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        });
        setDetails(data.result)
        handleClose()
      } catch (error){
        console.error("error found in posting Data", error);
      }
    }

  }

  return (
    <div className="fixed inset-0 flex bg-opacity-30 z-50">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="bg-white h-full w-full sm:w-[90%] md:w-[50%] lg:w-[30%] shadow-lg p-4 sm:p-6 fixed left-0 top-0 overflow-y-auto"
      >
        <button
          onClick={() => handleClose()}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Company Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <User size={18} /> Company
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <Upload size={18} /> Profile Image
            </label>
            <div className="mt-1 flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <input
                type="file"
                name="image"
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
              <Info size={18} /> tag Line
            </label>

            <input
              type="text"
              name="Tagline"
              value={formData.Tagline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
              <MapPin size={18} /> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
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

export default OperatorProfileEditModal;
