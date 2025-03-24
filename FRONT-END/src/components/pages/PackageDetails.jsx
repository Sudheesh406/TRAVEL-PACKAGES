import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../axios'
import BookingModal from '../modal/BookingModal'

function PackageDetails() {
  const { id } = useParams();
  const packages = useSelector((state) => state.package.package);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [packageDetails, setPackageDetails] = useState()
  const [show, setShow] = useState(false)

useEffect(()=>{
  async function getPackageDetails(){
    if(!packages){
      try {
        let {data} = await axios.get(`Package/getPackage/${id}`);
        if(data){
          setPackageDetails(data.result[0])
        }
        } catch (error) {
        console.error("error found in geting package",error);
      }
    }else{
      packages.forEach((element) => {
        if (element._id == id) {
          setPackageDetails(element)
        }
      });
    }
  }
  getPackageDetails()
},[])

  useEffect(() => {
    if (packageDetails) {
      setSelectedImage(packageDetails.images[0]);
    }
  }, [packageDetails]);

  const handleSubmit = ()=>{
    setShow(true)
  }

  if (!packageDetails) {
    return (
      <div className="container mx-auto px-6 py-16 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-red-600">Package Not Found</h1>
        <button
          onClick={() => navigate('/TravelPackages')}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          Back to Packages
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl h-[600px] relative ">
      <button
        onClick={() => navigate('/TravelPackages')}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Back to Packages
      </button>
      
      <div className="flex gap-10">
        {/* Left Side: Image Gallery */}
        <div className="w-1/2">
          <img
            src={selectedImage}
            alt={packageDetails.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
          <div className="flex gap-2 mt-4">
            {packageDetails.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-blue-500"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>
        
        {/* Right Side: Package Details */}
        <div className="w-1/2 bg-gray-200 p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900">{packageDetails.name}</h1>
          <p className="text-lg text-gray-500 mt-1">{packageDetails.locations.country}, {packageDetails.locations.state}, {packageDetails.locations.city}</p>
          <p className="text-3xl font-bold text-blue-600 mt-3">${packageDetails.price}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-600 ">
            <p><strong>Duration:</strong> {packageDetails.duration} days</p>
            <p><strong>Category:</strong> {packageDetails.category}</p>
            <p><strong>Date:</strong> {new Date(packageDetails.Date).toDateString()}</p>
            <p><strong>Number of Visits:</strong> {packageDetails.numberOfVisit}</p>
            <p><strong>Non-Veg Food:</strong> {packageDetails.nonVegFood ? 'Yes' : 'No'}</p>
            <p><strong>Veg Food:</strong> {packageDetails.vegFood ? 'Yes' : 'No'}</p>
            <p><strong>Vehicle Number:</strong> {packageDetails.vehicleNumber}</p>
            <p><strong>Vehicle Seats:</strong> {packageDetails.vehicleSeatNumber}</p>
          </div>
          
          <div className="mt-6 border-t border-gray-300 pt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
            <p className="text-gray-700 leading-relaxed mt-2">{packageDetails.description}</p>
          </div>

          <div className="mt-14 text-center">
            <button className="bg-green-600 w-[90%] text-white px-5 py-2 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            onClick={handleSubmit}>
              Book This Package
            </button>
          </div>
        </div>
      </div>
      {show && <BookingModal packageDetails={packageDetails} setShow={setShow}/>}
    </div>
  );
}

export default PackageDetails;