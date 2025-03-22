import { useParams, useNavigate } from 'react-router-dom';

// Sample detailed tour package data
const tourPackagesDetails = {
  1: {
    id: 1,
    name: "Paradise Beach Getaway",
    place: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500",
    price: "$1,999",
    duration: "7 days",
    description: "Experience luxury and tranquility in the heart of the Maldives. This all-inclusive package offers pristine beaches, crystal-clear waters, and world-class amenities.",
    highlights: [
      "5-star beachfront resort accommodation",
      "All meals included at premium restaurants",
      "Snorkeling and diving experiences",
      "Sunset cruise",
      "Spa treatment session"
    ],
    itinerary: [
      "Day 1: Arrival and welcome dinner",
      "Day 2: Island tour and snorkeling",
      "Day 3: Diving experience",
      "Day 4: Spa and relaxation day",
      "Day 5: Water sports activities",
      "Day 6: Sunset cruise",
      "Day 7: Departure"
    ]
  },
  2: {
    id: 2,
    name: "Mountain Adventure",
    place: "Swiss Alps",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
    price: "$2,499",
    duration: "5 days",
    description: "Embark on an exciting adventure in the majestic Swiss Alps. Perfect for thrill-seekers and nature lovers alike.",
    highlights: [
      "Luxury mountain lodge accommodation",
      "Professional hiking guides",
      "Cable car passes included",
      "Equipment rental",
      "Traditional Swiss dining experiences"
    ],
    itinerary: [
      "Day 1: Arrival and orientation",
      "Day 2: Guided hiking expedition",
      "Day 3: Mountain climbing basics",
      "Day 4: Alpine lakes tour",
      "Day 5: Departure"
    ]
  }
};

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const packageDetails = tourPackagesDetails[id];

  if (!packageDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Package not found</h1>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-600"
      >
        <span>← Back to Packages</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={packageDetails.image}
          alt={packageDetails.name}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{packageDetails.name}</h1>
              <p className="text-xl text-gray-600">{packageDetails.place}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">{packageDetails.price}</p>
              <p className="text-gray-600">{packageDetails.duration}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700">{packageDetails.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Highlights</h2>
            <ul className="list-disc list-inside space-y-2">
              {packageDetails.highlights.map((highlight, index) => (
                <li key={index} className="text-gray-700">{highlight}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
            <div className="space-y-3">
              {packageDetails.itinerary.map((day, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-700">{day}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors">
              Book This Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;