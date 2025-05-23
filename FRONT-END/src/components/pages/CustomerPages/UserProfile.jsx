import { Mail, Phone, MapPin, Calendar, UserCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../../../axios";
import ProfileEditModal from "../../modal/ProfileEditModal";
import Nav from "../../CommonComponents/NavComponents/Nav";

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bookings, setBookings] = useState();
  const [userDetails, setUserDetails] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      BookingDetails(user);
      setUserDetails({
        ...user,
        DateOfBirth: user.DateOfBirth
          ? new Date(user.DateOfBirth).toISOString().split("T")[0]
          : "",
      });
    }
  }, [user, dispatch]);

  const editProfile = () => {
    setIsOpen(true);
  };

  async function BookingDetails(user) {
    let id;
    if (user) {
      id = user._id;
    }
    try {
      let token = localStorage.getItem("token");
      let { data } = await axios.get(`/Payment/getbookingDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) setBookings(data.result);
    } catch (error) {
      console.error("error found in booking", error);
    }
  }

  const handleHistory = () => {
    navigate(`/history/bookingHistory/${user._id}`);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Nill";
    }
    return date.toLocaleDateString();
  }

  return (
    <div>
      <Nav />
    <div className="min-h-screen bg-gray-50 relative">
      <div className="absolute top-4 right-4 md:hidden z-50 ">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex flex-col space-y-1"
        >
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {showMenu && (
        <div className="absolute top-6 right-0 bg-white shadow-md rounded-lg p-4 z-40 md:hidden flex flex-col gap-2 w-full">
          <button
            className="px-4 py-2  text-black border border-gray-300 rounded-lg "
            onClick={editProfile}
          >
            Edit Profile
          </button>
          <Link to="/TravelPackages">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 w-full">
              Book Now
            </button>
          </Link>
        </div>
      )}

      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-left md:justify-between md:gap-8">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6 w-full">
              {userDetails && userDetails.image ? (
                <img
                  src={userDetails.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-white shadow-lg bg-gray-100">
                  <UserCircle className="w-24 h-24 text-gray-400" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {userDetails && userDetails.username}
                </h1>
                <p className="text-gray-600 mb-4">
                  {userDetails?.about ? userDetails.about : "About"}
                </p>
                {/* Desktop Buttons */}
                <div className="hidden md:flex flex-wrap justify-start gap-4">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={editProfile}
                  >
                    Edit Profile
                  </button>
                  <Link to="/TravelPackages">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">
                  {userDetails && userDetails.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">
                  {userDetails && userDetails.phone}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{userDetails?.location || "Nill"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">
                  {formatDate(userDetails.DateOfBirth)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {bookings && bookings.length > 0 && (
          <div className="flex gap-4 items-center mt-10 mb-6">
            <h2 className="text-2xl font-bold">Booking History</h2>
            <button
              className="h-11 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={handleHistory}
            >
              View
            </button>
          </div>
        )}

        <div className="space-y-4">
          {bookings &&
            bookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 flex flex-col md:flex-row items-center gap-4"
              >
                <img
                  src={booking.image}
                  alt={booking.packageName}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg">
                    {booking.packageName}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(booking.Date).getDate()}/
                    {new Date(booking.Date).getMonth() + 1}/
                    {new Date(booking.Date).getFullYear()}
                  </p>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg">
                    Booked Seats: {booking.seat}
                  </h3>
                  <p className="text-gray-600">Price: {booking.price}</p>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg">
                    Company: {booking.companyName}
                  </h3>
                </div>
                <div>
                  <p className="text-blue-600 text-sm font-semibold">
                    {new Date(booking.Date) < new Date() ? "Completed" : ""}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {isOpen && (
        <ProfileEditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setUserDetails={setUserDetails}
          userDetails={userDetails}
        />
      )}
    </div>
    </div>
  );
}
