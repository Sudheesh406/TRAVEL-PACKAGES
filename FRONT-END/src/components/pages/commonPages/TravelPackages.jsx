import { Search, MapPin, Calendar, Filter, Menu } from "lucide-react";
import axios from "../../../axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import FilterModal from '../../modal/FilterModal'
import {debounce} from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import {setPackage,clearPackage,} from "../../../redux/package/packageSlice";
import { toast } from 'react-hot-toast';
import Nav from '../../CommonComponents/NavComponents/Nav'

export default function TravelPackages() {
  const [packages, setPackages] = useState();
  const [showFilter, setShowFilter] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [checked, setChecked] = useState();
  const [limit,setLimit] = useState(18)
  const [location,setLocation] = useState("Any Location")
  const [duration,setDuration] = useState("Any Duration")
  const [filter,setFilter] = useState("")
  const [search, SetSearch] = useState("")
  const [debounceValue, setDebounceValue] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [viewBtn,setViewBtn] = useState(false)


  useEffect(() => {
    if(location === "Any Location" && duration === "Any Duration" && filter == ""){
    async function findPackages() {
      try {
        let { data } = await axios.get("/Package/DisplayPackage");
        if (data) {
          setPackages(data.Package.all);
          setViewBtn(data.Package.count > data.Package.all.length);
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
        if (data) {
          setPackages(data.data.result);
          setViewBtn(data.data.count > data.data.result.length);
        }else{
          setViewBtn(false)
          setPackages([]);
          setError(true);
        }
      } catch (error) {
        setError(true);
        setPackages([]);
      }
    }
    findLocationPackages()
  }
  }, [location, duration, filter]);

  async function handleChangeLocation(e){
    setError(false)
    if(e.target.value == "Any Location"){
      SetSearch("")
    }else{
      SetSearch(e.target.value)
    }
    setLocation(e.target.value)
    setLimit(16)
  }

  async function handleChangeDuration(e){
    setError(false)
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
    setError(false)
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
  let lmtAndLocation = {location,duration,filter,limit,debounceValue}
    try {
      let { data } = await axios.post("/Package/DisplayMorePackage",lmtAndLocation);
      if (data) {

        let inc = 9
        setLimit((prev)=>prev+inc)
        if(data.Package){
          data.Package.packages.map((p)=>{
            setPackages((prev) => [...prev, p]);
          })
          setViewBtn(data.Package.totalCount > (packages?.length || 0))        }
      }
    } catch (error) {
      if(error.response.status == 401){
        toast('No more packages')
      }
    }
  }
  
  let coverAllLeterToSearch = useCallback(
    debounce((value) => {
      setDebounceValue(value)
      if(!value){
        setLocation("Any Location")
      }else{
        setLocation(value)
      }
    }, 2000),
  []
  )

  const handleSearch = (e) => {
    const value = e.target.value;
    SetSearch(value);
    coverAllLeterToSearch(value); 
  };

const handleDetails = (id)=>{
  let operator = false
  navigate(`/packages/packageDetails/${operator}/${id}`);
}

useEffect(() => {
  dispatch(setPackage(packages)); 
}, [packages, dispatch]);


return (
  <div className="min-h-screen bg-gray-50">
<Nav/>
    <div className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 py-6">
    {/* Top Row with Back, Search and Hamburger */}
    <div className="flex items-center justify-between gap-4 mb-4">
      {/* Back Button
      <button
        onClick={() => navigate('/')}
        className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        <span>←</span> <span>Back</span>
      </button> */}

      {/* Search Input */}
      <div className="relative flex-1 mx-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search locations..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Hamburger Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-blue-600 hover:text-blue-800 sm:hidden"
      >
        <Menu size={24} />
      </button>
    </div>

    {/* Dropdown inside hamburger */}
    {menuOpen && (
      <div className="flex flex-col sm:hidden gap-4">
        <select
          className="px-4 py-2 border rounded-lg bg-white"
          onChange={handleChangeLocation}
          value={location}
        >
          <option>Any Location</option>
          <option>THIRUVANANTHAPURAM</option>
          <option>KOLLAM</option>
          <option>ALAPPUZHA</option>
          <option>THRISSUR</option>
        </select>
        <select
          className="px-4 py-2 border rounded-lg bg-white"
          onChange={handleChangeDuration}
        >
          <option>Any Duration</option>
          <option>1-3 days</option>
          <option>4-7 days</option>
          <option>8+ days</option>
        </select>
        <button
          className="px-4 py-2 border rounded-lg bg-white flex items-center gap-2 justify-center"
          onClick={() => showFilterModal()}
        >
          <Filter size={20} />
          Filters
        </button>
      </div>
    )}

    {/* Show the full row of filters in larger screens */}
    <div className="hidden sm:flex gap-4 mt-4">
      <select
        className="px-4 py-2 border rounded-lg bg-white"
        onChange={handleChangeLocation}
        value={location}
      >
        <option>Any Location</option>
        <option>THIRUVANANTHAPURAM</option>
        <option>KOLLAM</option>
        <option>ALAPPUZHA</option>
        <option>THRISSUR</option>
      </select>
      <select
        className="px-4 py-2 border rounded-lg bg-white"
        onChange={handleChangeDuration}
      >
        <option>Any Duration</option>
        <option>1-3 days</option>
        <option>4-7 days</option>
        <option>8+ days</option>
      </select>
      <button
        className="px-4 py-2 border rounded-lg bg-white flex items-center gap-2 justify-center"
        onClick={() => showFilterModal()}
      >
        <Filter size={20} />
        Filters
      </button>
    </div>
  </div>


    </div>

    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Travel Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-600 mb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>
                      {pkg.locations.city}, {pkg.locations.state},{" "}
                      {pkg.locations.country}
                    </span>
                  </div>
                  <span>
                    Plan :{" "}
                    {new Date(pkg.Date).toLocaleDateString("en-GB")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Calendar size={18} />
                  <span>{pkg.duration} Days</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <span className="text-2xl font-bold text-blue-600">
                   ${pkg.price}
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                    onClick={() => handleDetails(pkg._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

    {error && (
      <p className="flex justify-center text-lg font-bold">
        No Package Found
      </p>
    )}

<div className="w-full flex justify-center p-4">
  {!error && viewBtn && (
    <div>
      <button
        className="bg-transparent border border-blue-600 text-blue-600 px-12 py-3 rounded-md hover:bg-blue-50 transition duration-300"
        onClick={() => morePackages()}
      >
        View More
      </button>
    </div>
  )}
</div>

    {showFilter && (
      <FilterModal
        handleChangeFilter={handleChangeFilter}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
        checked={checked}
        setSubmit={setSubmit}
      />
    )}
  </div>
);
}
