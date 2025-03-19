import { Search, MapPin, Calendar, Filter } from "lucide-react";
import axios from "../../axios";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import FilterModal from '../modal/FilterModal'

export default function TravelPackages() {
  const [packages, setPackages] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [checked, setChecked] = useState();
  const [limit,setLimit] = useState(18)
  const [location,setLocation] = useState("Any Location")
  const [duration,setDuration] = useState("Any Duration")
  const [filter,setFilter] = useState("")
  
  useEffect(() => {
    if(location === "Any Location" && duration === "Any Duration" && filter == ""){
    async function findPackages() {
      try {
        let { data } = await axios.get("/Package/DisplayPackage");
        if (data) {
          setPackages(data.Package);
        }
      } catch (error) {
        console.error("error found in TravelPackages", error);
      }
    }

    findPackages();
  }else{
    let pageDetail = {location, duration, filter}
    async function findLocationPackages() {
      try {
        let { data } = await axios.post("/Package/DisplayLocationPackage",pageDetail);
        console.log("data",data)
        if (data) {
          setPackages(data.data);
        }
      } catch (error) {
        console.log("no data found")
        setPackages([]);
      }
    }
    findLocationPackages()
  }
  }, [location, duration, filter]);

  async function handleChangeLocation(e){
    setLocation(e.target.value)
    setLimit(16)
  }

  async function handleChangeDuration(e){
    if (e.target.value === "Any Duration") {
      setDuration("Any Duration");
      return
    }
    let arr = e.target.value.split('')
    let first = Number(arr[0])
    if(first == 8){
      let durationArray = [8]
      setDuration(durationArray)
    }else{
      let last = Number(arr[2])
      let durationArray = [first,last]
      setDuration(durationArray)
    }
  }

  const handleChangeFilter = (range, isChecked) => {
    if (isChecked)setChecked(range);
    if(range == 'Show All'){
      setFilter("")
    }else{
      let data = range.split('-')
      let first = data[0].trim().replace(/,/g, '') 
      let second = data[1].trim().replace(/,/g, '')
      let value1 = Number(first)
      let value2 = Number(second)
      let arr = [value1, value2]
      setFilter(arr)
    }
  };

  async function showFilterModal(){
    setShowFilter(true) 
  }

  async function morePackages() {
  let lmtAndLocation = {location,duration,filter,limit}
    try {
      let { data } = await axios.post("/Package/DisplayMorePackage",lmtAndLocation);
      if (data) {
        let inc = 9
        setLimit((prev)=>prev+inc)
        if(data.Package){
          data.Package.map((p)=>{
            setPackages((prev) => [...prev, p]);
          })

        }
      }
    } catch (error) {
      console.error("error found in TravelPackages", error);
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search locations..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select className="px-4 py-2 border rounded-lg bg-white" onChange={handleChangeLocation}>
                <option>Any Location</option>
                <option>David musk</option>
                <option>w</option>
                <option>New zealand</option>
              </select>
              <select className="px-4 py-2 border rounded-lg bg-white" onChange={handleChangeDuration}>
                <option>Any Duration</option>
                <option>1-3 days</option>
                <option>4-7 days</option>
                <option>8+ days</option>
              </select>
              <button className="px-4 py-2 border rounded-lg bg-white flex items-center gap-2" onClick={()=>showFilterModal()}>
                <Filter size={20} />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        <h2 className="text-2xl font-bold mb-6">Travel Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {packages &&
            packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
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
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <div className="flex w-full justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>
                        {pkg.locations.city}, {pkg.locations.state},{" "}
                        {pkg.locations.country}
                        </span>
                      </div>
                      <span>
                        Plan : {new Date(pkg.Date).toLocaleDateString("en-GB")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Calendar size={18} />
                    <span>{pkg.duration} Days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {pkg.price}
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex justify-center p-4">
      <button className="bg-transparent border border-blue-600 text-blue-600 px-12 py-3 rounded-md hover:bg-blue-50 transition duration-300"
      onClick={()=>morePackages()}>
         View More
      </button>
      </div>
      {showFilter && (<FilterModal handleChangeFilter={handleChangeFilter} setShowFilter={setShowFilter} showFilter={showFilter} checked={checked} setSubmit={setSubmit}/>)}
    </div>
  );
}
