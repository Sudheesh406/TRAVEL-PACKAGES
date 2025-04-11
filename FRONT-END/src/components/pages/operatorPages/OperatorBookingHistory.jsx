
import { useParams } from "react-router-dom";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import Listings from "../../CommonComponents/ListingComponents/Listings";

function OperatorBookingHistory() {
  const { id } = useParams();
  const [BookingDetails, setBookingDetails] = useState();
  const [Props, setProps] = useState("null");
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    async function PackageBookedDetails() {
        let token = localStorage.getItem("token");
        try {
          let { data } = await axios.get(`/Package/PackageBookedDetails/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
         if (data){
              setBookingDetails(data.data);
              setProps("Booking")
          }
        } catch (error) {
          console.error("error found in PackageBookedDetails", error);
        }
      }
      PackageBookedDetails();

      async function RegisterOrNot(){
        try {
          let token = localStorage.getItem("token");
          let {data} = await axios.get('/Company/checkRegister',{
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,})
          if(!data.result){
            navigate("/Operator/OperatorRegister")
            setLoading(false)
          }else{
            setLoading(false)
          }
        } catch (error) {
          console.error('error found in RegisterOrNot',error);
        }
      }RegisterOrNot()
 },[])

 if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow"></div>
      <div className="absolute top-3 left-3 right-3 bottom-3 border-4 border-yellow-400 border-b-transparent rounded-full animate-spin-reverse"></div>
    </div>
  </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Bookings Details</h1>
        </div>
      </header>
    <Listings Data={BookingDetails} Props={Props} />
     
    </div>
  );
}

export default OperatorBookingHistory;
