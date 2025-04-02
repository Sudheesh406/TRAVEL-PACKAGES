
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { useEffect, useState } from "react";

function OperatorBookingHistory() {
  const { id } = useParams();
  const [BookingDetails, setBookingDetails] = useState();

  useEffect(()=>{
    async function PackageBookedDetails() {
        try {
          let { data } = await axios.get(`/Package/PackageBookedDetails/${id}`);
          if (data){

              setBookingDetails(data.data);
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

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Travel Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Number of Guests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {BookingDetails && BookingDetails.map((booking,index) => (
                    <tr key={index}>
                      <td className="px-12 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.userName}
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.Date).getDate()}/
                    {new Date(booking.Date).getMonth() + 1}/
                    {new Date(booking.Date).getFullYear()}
                      </td>
                      <td className="px-18 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.seat}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                      <p className="text-blue-600 text-md font-semibold">
                    {new Date(booking.Date) < new Date() ? "Completed" : ""}
                  </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OperatorBookingHistory;
