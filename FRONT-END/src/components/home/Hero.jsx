import { Search } from 'lucide-react';


const Hero = () => {

  return (
<div
  className="relative h-[80vh] bg-cover bg-center"
  style={{
    backgroundImage: `url('/hero.jpg')`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
       <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Discover the World s Beauty</h1>
        <p className="text-xl text-white mb-8 max-w-2xl">Explore breathtaking destinations and create unforgettable memories with our premium travel packages.</p>
        
        {/* <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input type="text" placeholder="Where do you want to go?" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
              <input type="date" className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex items-end">
              <button className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300 h-10 w-10 flex items-center justify-center">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;