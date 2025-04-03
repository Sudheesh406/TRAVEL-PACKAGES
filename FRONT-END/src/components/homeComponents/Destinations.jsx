import { MapPin } from 'lucide-react';
import { Link } from "react-router-dom";

import {useEffect, useState} from 'react'
import axios from '../../axios'

const Destinations = () => {
 const [details,setDetails] = useState()


useEffect(()=>{
  async function getPopularDestination() {
    try {
     let {data} = await axios.get('Payment/getPopularDestination')
      setDetails(data.result)      
      console.log("data.result",data.result)
   } catch (error) {
     console.error("error found in getPopularDestination",error);
     
   }
  }
  getPopularDestination()
},[])

  return (
    <section id="destinations" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Explore our most visited and highly rated destinations around the world.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {details && details.map((destination, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 mr-1" />
                  <h3 className="text-xl font-semibold text-gray-900">{destination.packageName}</h3>
                </div>
                <p className="text-gray-600 mb-4">{destination.packageDetails.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">{destination.review}</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
        {/* <Link to="/DestinationDetail">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
            View All Destinations
          </button>
            </Link> */}
        </div>
      </div>
    </section>
  );
};

export default Destinations;