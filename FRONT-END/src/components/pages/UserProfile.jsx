import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/userSlice";
import axios from "../../axios";
import ProfileEditModal from "../../components/modal/ProfileEditModal";

export default function UserProfile() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState();
  const [userDetails, setUserDetails] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      async function getUser() {
        try {
          let result = await axios.get("/getUser");
          if (result.data) {
            dispatch(
              setUser({
                ...result.data.result,
                DateOfBirth: result.data.result.DateOfBirth
                  ? new Date(result.data.result.DateOfBirth)
                      .toISOString()
                      .split("T")[0]
                  : "",
              })
            );
            setUserDetails((prev) => ({
              ...prev,
              ...result.data.result,
              DateOfBirth: result.data.result.DateOfBirth
                ? new Date(result.data.result.DateOfBirth)
                    .toISOString()
                    .split("T")[0]
                : "",
            }));
            BookingDetails(result.data.result);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      getUser();
    } else {
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
      let { data } = await axios.get(`/Payment/getbookingDetails/${id}`);
      if (data) setBookings(data.result);
    } catch (error) {
      console.error("error found in booking", error);
    }
  }

  const handleHistory = ()=>{
    navigate(`/BookingHistory/${user._id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <img
                src={userDetails && userDetails.image}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {userDetails && userDetails.username}
                  </h1>
                </div>
                <p className="text-gray-600 mb-4">
                  {userDetails?.about ? userDetails.about : "About"}
                </p>
                <div className="flex flex-wrap gap-4">
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
            {/* Back Button - Positioned to the right */}
            {/* <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              ← Back
            </button> */}
          </div>
        </div>
      </div>

      {/* Personal Information */}
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
                  {userDetails && userDetails.phone}{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">
                  {userDetails && userDetails.location}{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">
                  {userDetails && new Date(userDetails.DateOfBirth).getDate()}/
                  {new Date(userDetails.DateOfBirth).getMonth() + 1}/
                  {new Date(userDetails.DateOfBirth).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <div className="flex gap-4 items-center mt-10 mb-6">
          <h2 className="text-2xl font-bold ">Booking History</h2>
          <button className="h-11 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          onClick={handleHistory}>
            View All
          </button>
        </div>
        <div className="space-y-4">
          {bookings &&
            bookings.map((booking, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4"
              >
                <img
                  src={booking.image}
                  alt={booking.packageName}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {booking.packageName}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(booking.Date).getDate()}/
                    {new Date(booking.Date).getMonth() + 1}/
                    {new Date(booking.Date).getFullYear()}
                  </p>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {" "}
                    Booked Seats: {booking.seat}
                  </h3>
                  <p className="text-gray-600">Price: {booking.price}</p>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {" "}
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
  );
}
