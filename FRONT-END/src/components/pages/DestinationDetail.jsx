import { Search, MapPin, Filter } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: "Santorini",
    country: "Greece",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff"
  },
  {
    id: 2,
    name: "Machu Picchu",
    country: "Peru",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1"
  },
  {
    id: 3,
    name: "Venice",
    country: "Italy",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0"
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
  }
];

export default function DestinationsDetails() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 border rounded-lg bg-white">
                <option>All Regions</option>
                <option>Europe</option>
                <option>Americas</option>
                <option>Asia</option>
              </select>
              <button className="px-4 py-2 border rounded-lg bg-white flex items-center gap-2">
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
              <div className="h-64 w-full relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{destination.country}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  ⭐️ {destination.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}