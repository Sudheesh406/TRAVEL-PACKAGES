import { useState } from "react";
import axios from "../../axios";
import toast from 'react-hot-toast';

const RatingComponent = ({ setShowRating, userId, selectedPackageId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    const formData = new FormData();
    formData.append("review", review);
    formData.append("rating", rating);
    formData.append("userId", userId);
    formData.append("selectedPackageId", selectedPackageId);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      let token = localStorage.getItem("token")
      let result = await axios.post("/Review/newReview", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
           Authorization: `Bearer ${token}`
         },
      });
      if (result){
        setShowRating(false)
        toast.success('Review Added Successfully!')
      }
    } catch (error) {
      console.error("Error found in submitting rating", error);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-2xl bg-white absolute top-[160px] left-[50%] transform -translate-x-1/2 h-auto w-96 border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-center">Rate Your Experience</h3>
      <button
        onClick={() => setShowRating(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
      >
        &times;
      </button>

      <div className="flex justify-center space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl transition-colors duration-200 ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        className="w-full h-32 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>

      <div className="mt-4">
        <label className="block text-gray-700 mb-1">Upload Images (Optional)</label>
        <input 
          type="file" 
          accept="image/*" 
          multiple
          onChange={handleImageChange} 
          className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {images.length > 0 && images.map((image, index) => (
          <img 
            key={index} 
            src={URL.createObjectURL(image)} 
            alt="Selected Preview" 
            className="w-16 h-16 object-cover rounded-md border" 
          />
        ))}
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default RatingComponent;
