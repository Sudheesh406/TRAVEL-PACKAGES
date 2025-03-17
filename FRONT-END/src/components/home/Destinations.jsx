import { MapPin } from 'lucide-react';
import { Link } from "react-router-dom";
const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    description: 'Tropical paradise with beautiful beaches and rich culture.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    description: 'Stunning white buildings and breathtaking ocean views.',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Kyoto, Japan',
    description: 'Ancient temples and beautiful cherry blossoms.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Machu Picchu, Peru',
    description: 'Ancient Incan citadel set high in the Andes Mountains.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    rating: 4.9,
  },
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore our most visited and highly rated destinations around the world.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 mr-1" />
                  <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">{destination.rating}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
        <Link to="/DestinationDetail">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
            View All Destinations
          </button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;