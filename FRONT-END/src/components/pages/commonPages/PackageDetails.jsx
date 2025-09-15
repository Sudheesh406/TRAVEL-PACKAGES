import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import BookingModal from "../../modal/BookingModal";
import Nav from '../../CommonComponents/NavComponents/Nav'

function PackageDetails() {
  let company = useSelector((state) => state.company);
  const { operator, id } = useParams();
  const operatorBool = operator === "true";
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [packageDetails, setPackageDetails] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(false);

  useEffect(() => {
    async function getPackageDetails() {
      try {
        let { data } = await axios.get(`Package/getPackage/${id}`);
        if (data && data.result.length > 0) {
          setPackageDetails(data.result[0]);
          setValue(false);
        } else {
          setValue(true);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package details", error);
        setValue(true);
        setLoading(false);
      }
    }

    getPackageDetails();
  }, []);

  useEffect(() => {
    setValue(false);
    if (packageDetails) {
      setSelectedImage(packageDetails.images[0]);
    }
  }, [packageDetails]);

  const handleSubmit = () => {
    let token = localStorage.getItem("token");
    console.log('np token',token)
    if (!token) {
      console.log('np token',token)
      navigate("/login");
    } else {
      setShow(true);
    }
  };

  const handleCancel = (id) => {
    cancelPackage(id);
  };

  async function cancelPackage(id) {
    try {
      let token = localStorage.getItem("token");
      let { data } = await axios.post(
        "/Package/packageHandle",
        { id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      if (data) console.log("data", data.result);
      setPackageDetails(data.result);
    } catch (error) {
      console.error("error found in cancel package", error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
        <div className="absolute top-3 left-3 right-3 bottom-3 border-4 border-yellow-400 border-b-transparent rounded-full animate-spin-reverse"></div>
      </div>
    </div>
    );
  }

  if (!value && !packageDetails) {
    return (
      <div>
      {!operatorBool && <Nav/>}
      <div className="container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-red-600">Package Not Found</h1>
        <button
          onClick={() => navigate("/packages/travelPackages")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Back to Packages
        </button>
      </div>
      </div>
    );
  }

  return (
    <div>
      {!operatorBool && <Nav/>}
    
    <div className="container mx-auto px-4 sm:px-6 py-12 max-w-6xl h-[500px] relative">
    {operatorBool && <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back
      </button>}

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2 w-full">
          <img
            src={selectedImage}
            alt={packageDetails.name}
            className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {packageDetails.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500 flex-shrink-0"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 w-full bg-gray-200 p-6 h-[600px] sm:p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
            {packageDetails.name}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 mt-1">
            {packageDetails.locations.country}, {packageDetails.locations.state}
            , {packageDetails.locations.city}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-3">
            ${packageDetails.price}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-600 text-sm sm:text-base">
            <p>
              <strong>Duration:</strong> {packageDetails.duration} days
            </p>
            <p>
              <strong>Category:</strong> {packageDetails.category}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(packageDetails.Date).toDateString()}
            </p>
            <p>
              <strong>Number of Visits:</strong> {packageDetails.numberOfVisit}
            </p>
            <p>
              <strong>Non-Veg Food:</strong>{" "}
              {packageDetails.nonVegFood ? "Yes" : "No"}
            </p>
            <p>
              <strong>Veg Food:</strong> {packageDetails.vegFood ? "Yes" : "No"}
            </p>
            <p>
              <strong>Vehicle Number:</strong> {packageDetails.vehicleNumber}
            </p>
            <p>
              <strong>Vehicle Seats:</strong> {packageDetails.vehicleSeatNumber}
            </p>
            <p>
              <strong>Available Seats:</strong> {packageDetails.availableSeat}
            </p>
          </div>

          <div className="mt-6 border-t border-gray-300 pt-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Description
            </h2>
            <p
              className="text-gray-700 leading-relaxed mt-2 max-h-24 overflow-y-auto pr-2 text-sm sm:text-base"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`p::-webkit-scrollbar { display: none; }`}</style>
              {packageDetails.description}
            </p>
          </div>

          <div className="mt-5 text-center">
            {!operatorBool && (
              <button
                className={`w-full px-5 py-2 rounded-lg text-lg font-semibold transition ${
                  packageDetails.availableSeat === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                onClick={handleSubmit}
                disabled={packageDetails.availableSeat === 0}
              >
                Book This Package
              </button>
            )}

            {operatorBool && (
              <div>
                {packageDetails.isAvailable ? (
                  <button
                    className="w-full sm:w-[90%] px-5 py-2 rounded-lg text-lg font-semibold transition bg-green-600 text-white hover:bg-green-700"
                    onClick={() => handleCancel(packageDetails._id)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="w-full sm:w-[90%] px-5 py-2 rounded-lg text-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => handleCancel(packageDetails._id)}
                  >
                    Approve
                  </button>
                )}
              </div>
            )}

            {packageDetails.availableSeat === 0 && (
              <p className="mt-2 text-red-600 font-medium text-sm sm:text-base">
                This package is fully booked.
              </p>
            )}
          </div>
        </div>
      </div>

      {show && (
        <BookingModal packageDetails={packageDetails} setShow={setShow} />
      )}
    </div>
    </div>
  );
}

export default PackageDetails;
