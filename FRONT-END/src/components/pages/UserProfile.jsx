import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

const bookings = [
  {
    id: 1,
    destination: "Swiss Alps Adventure",
    date: "Mar 15, 2024",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b"
  },
  {
    id: 2,
    destination: "Bali Beach Retreat",
    date: "Feb 10, 2024",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4"
  },
  {
    id: 3,
    destination: "Paris City Break",
    date: "Jan 5, 2024",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
  }
];

export default function UserProfile() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">John Doe</h1>
              <p className="text-gray-600 mb-4">Travel enthusiast | 15 trips completed</p>
              <div className="flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Share Profile
                </button>
              </div>
            </div>
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
                <p className="font-medium">john.doe@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">+1 234 567 890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">New York, USA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-400" size={20} />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">January 2023</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking History */}
        <h2 className="text-2xl font-bold mt-12 mb-6">Booking History</h2>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
              <img
                src={booking.image}
                alt={booking.destination}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{booking.destination}</h3>
                <p className="text-gray-600">{booking.date}</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${
                booking.status === 'Upcoming' 
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {booking.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}