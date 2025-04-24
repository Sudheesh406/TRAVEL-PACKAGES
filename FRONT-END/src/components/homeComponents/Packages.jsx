import { MapPin, Clock, Tag } from 'lucide-react';
import {Link} from 'react-router-dom'
import axios from '../../axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
const Packages = () => {
  const navigate = useNavigate() 
  const [allPackage,setAllPackage] = useState()

  useEffect(()=>{
    async function getPackages (){
      try {
        let {data} = await axios.get('/Package/DisplayHomePackage')
        if(data){
          setAllPackage(data.Package)
        }
      } catch (error) {

      }
    }
    getPackages ()
  },[])

  const handleDetails = (id)=>{
    let operator = false
  navigate(`packages/packageDetails/${operator}/${id}`);
  }

  return (
    <section id="packages" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Travel Packages</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Choose from our carefully curated travel packages for an unforgettable experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPackage && allPackage.map((pkg,index) => (
            <div key={index} className={`bg-white rounded-lg overflow-hidden shadow-lg border ${pkg.featured ? 'border-blue-500' : 'border-transparent'}`}>
              <div className="h-48 overflow-hidden">
              <div className="h-[260px] w-full relative">
                  {pkg?.images?.length > 0 && (
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      navigation
                      pagination={{ clickable: true }}
                      loop={pkg.images.length > 1}
                      slidesPerView={1}
                      slidesPerGroup={1}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      className="w-full h-64"
                    >
                      {pkg.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={image}
                            alt={`${pkg.name} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h3>
                {/* <p className="text-gray-600 mb-4">{pkg.description}</p> */}
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <span>{pkg.duration} Days</span>
                  </div>
                  <div className="flex items-center text-gray-700 gap-2">
                  <MapPin size={18} />
                    <span>{pkg.numberOfVisit} Sites</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Tag className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold text-lg">{pkg.price}</span>
                    <span className="text-sm text-gray-500 ml-1">per person</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                onClick={() => handleDetails(pkg._id)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/packages/travelPackages">
          <button className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition duration-300">
          View All Packages
          </button>
            </Link>
        </div>
      </div>
    </section>
  );
};

export default Packages;