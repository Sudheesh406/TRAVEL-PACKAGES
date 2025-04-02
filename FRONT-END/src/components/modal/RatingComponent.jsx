import { useState } from "react";
import axios from '../../axios'

const RatingComponent = ({ setShowRating,userId,selectedPackageId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }
    let data = {review,rating,userId,selectedPackageId}
    let result = axios.post('/Review/newReview',cddata)
    console.log(data)
  };


  return (
    <div className="p-4 rounded-lg shadow-2xl bg-white absolute top-[160px] left-[560px] h-96 w-96">
      <h3 className="text-lg font-semibold mb-2">Rate Your Experience</h3>
      <button
          onClick={() => setShowRating(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
      {/* Star Rating */}
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Review Input */}
      <textarea
        className="w-full h-48 p-2 border rounded-md"
        rows="3"
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>

      {/* Submit Button */}
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default RatingComponent;
