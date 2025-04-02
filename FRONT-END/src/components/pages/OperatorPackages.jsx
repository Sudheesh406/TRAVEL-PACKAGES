
import {useParams , useNavigate} from 'react-router-dom'
import axios from '../../axios'
import { useEffect,useState } from 'react';

function OperatorPackages() {
  const navigate = useNavigate()
    const {id}  = useParams();
    console.log("id",id)
    const [packages,setPackages] = useState()

    useEffect(()=>{
        async function findAllPackages(){
            try {
                let {data} = await axios.get(`Package/findAllPackages/${id}`)
                setPackages(data.result)
            } catch (error) {
                console.error("errorn found in findAllPackages",error);
                
            }
         } 
         findAllPackages()
    },[id])

    const ViewPackageDetails = async (id)=>{
      navigate(`/OperatorPackageDetail/${id}`);
    }
 
console.log("packages",packages)
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Travel Packages</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages && packages.map((pkg,index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src={pkg.images[0]} 
                alt={pkg.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className='flex justify-between'>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{pkg.name}</h2>
                <p className="text-gray-600 mb-4">{new Date(pkg.Date).getDate()}/
                    {new Date(pkg.Date).getMonth() + 1}/
                    {new Date(pkg.Date).getFullYear()}</p>
                </div>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Duration:</span>
                    <span className="ml-2 text-gray-900">{pkg.duration}</span>
                  </div>
                
                  <div className="text-xl font-bold text-indigo-600">{pkg.price}</div>
                </div>
                <div className='flex justify-between pt-4'>

                <div>
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className="ml-2 text-gray-900">{pkg.category}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Available Seat:</span>
                    <span className="ml-2 text-gray-900">{pkg.availableSeat}</span>
                  </div>

                  </div>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                onClick={()=>ViewPackageDetails(pkg._id)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default OperatorPackages