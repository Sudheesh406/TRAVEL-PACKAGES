import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "../../../axios";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";

function ReviewCard() {  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getAllReview() {
      try {
        let { data } = await axios.get("/Review/getAllReview",{
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data) setReviews(data.result);
      } catch (error) {
        console.error("Error in getAllReview", error);
      }
    }
    getAllReview();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        What Our Customers Say
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Real reviews from happy customers. See what they love about our services!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews &&
          reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={review.image.length > 1 ? {
                  nextEl: `.next-${index}`,
                  prevEl: `.prev-${index}`,
                } : false}
                pagination={{ clickable: true }}
                className="relative"
              >
                {review.image.map((img, imgIndex) => (
                  <SwiperSlide key={imgIndex}>
                    <img
                      src={img}
                      alt={`Slide ${imgIndex}`}
                      className="w-full h-52 object-cover rounded-t-xl"
                    />
                  </SwiperSlide>
                ))}
                {review.image.length > 1 && (
                  <>
                    <button
                      className={`prev-${index} absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition`}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      className={`next-${index} absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition`}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </Swiper>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {review.packageName}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-1">by {review.userName}</p>
                <p className="mt-3 text-gray-700">{review.review}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ReviewCard;
