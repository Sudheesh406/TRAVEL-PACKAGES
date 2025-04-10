import { Users, Package, Star, Calendar, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCompany } from "../../../redux/company/companySlice";
import {clearPackageForm} from "../../../redux/forms/package/packageFormSlice";
import { clearPackageSecondForm } from "../../../redux/forms/package/packageSecondFormSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import OperatorProfileEditModal from "../../modal/OperatorProfileEditModal";

export default function OperatorDashboard() {
  clearPackageForm(null)
  clearPackageSecondForm(null)
  const [details, setDetails] = useState(null);
  const [Packages, setPackages] = useState([]);
  const [PackagesCount, setPackagesCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState("");
  const [review, setReview] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompanyDetails() {
      try {
        let token = localStorage.getItem("token");
        let { data } = await axios.get("/Company/getCompany", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (data) {
          dispatch(setCompany(data.result.data));
          setDetails(data.result.data);
          setPackages(data.tourPackages);
          setPackagesCount(data.totalCount);
          setBooking(data.result.booking);
          const rating = data.result.averageRatings;
          if (typeof rating === "object") {
            setReview(rating?.avg || 0);
          } else {
            setReview(rating || 0);
          }
        }
      } catch (error) {
        console.error("Error fetching company details", error);
      }
    }

    fetchCompanyDetails();
  }, []);

  let totalBookings = 0;
  if (booking && booking.length > 0) totalBookings = booking.length;

  const editProfile = () => {
    setIsOpen(true);
  };

  const handlePackages = () => {
    let id = Packages[0]?.company;
    if (id) {
      navigate(`/OperatorPackages/${id}`);
    }
  };

  const viewBookings = (id) => {
    navigate(`/OperatorBookingHistory/${id}`);
  };

  const handleLogout = async () => {
    try {
      let result = await axios.get("/logOut");
      if (result) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={details?.image || "image"}
              alt={details?.companyName || "Company Logo"}
              className="w-16 h-16 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-xl md:text-3xl font-bold">
                {details?.companyName || "Company Name"}
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {details?.Tagline || "No tagline available"}
              </p>
            </div>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={28} />
          </button>

          <div className="hidden md:flex gap-4">
            <Link to="/OperatorPackageFirstPage">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add New Package
              </button>
            </Link>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={editProfile}
            >
              Edit Profile
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white px-4 pb-4 flex flex-col gap-2">
            <Link to="/PackageFirstPage">
              <button className="w-full px-4 py-2  text-black border border-gray-300  rounded-lg ">
                Add New Package
              </button>
            </Link>
            <button
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={editProfile}
            >
              Edit Profile
            </button>
            <button
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Package className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Active Packages</p>
                <p className="text-2xl font-bold">{PackagesCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Star className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-gray-600">Customer Rating</p>
                <p className="text-2xl font-bold">
                  {typeof review === "number" ? review.toFixed(1) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 items-center mt-10 mb-6">
          <h2 className="text-2xl font-bold">Recently Added Packages</h2>
          <button
            className="h-11 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={handlePackages}
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {Packages.length > 0 ? (
            Packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={pkg?.images?.[0] || ""}
                  alt={pkg?.name || "Package Image"}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-lg">
                    {pkg?.name || "No Name"}
                  </h3>
                  <div className="flex justify-center sm:justify-start items-center gap-2 text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {pkg?.Date
                        ? new Date(pkg.Date).toLocaleDateString("en-GB")
                        : "No Date"}
                    </span>
                  </div>
                </div>
                <button
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  onClick={() => viewBookings(pkg._id)}
                >
                  View Bookings
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No packages available.</p>
          )}
        </div>
      </div>

      {isOpen && (
        <OperatorProfileEditModal
          setIsOpen={setIsOpen}
          details={details}
          setDetails={setDetails}
        />
      )}
    </div>
  );
}
