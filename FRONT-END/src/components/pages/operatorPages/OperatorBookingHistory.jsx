
import { useParams } from "react-router-dom";
import axios from "../../../axios";
import { useEffect, useState } from "react";
import Listings from "../../CommonComponents/ListingComponents/Listings";

function OperatorBookingHistory() {
  const { id } = useParams();
  const [BookingDetails, setBookingDetails] = useState();
  const [Props, setProps] = useState("null");

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
 },[])

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
