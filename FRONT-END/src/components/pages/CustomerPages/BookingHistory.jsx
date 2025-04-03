import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../../../axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import RatingComponent from "../../modal/RatingComponent";

function BookingHistory() {

  const [showRating, setShowRating] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const { id } = useParams();
  const [Bookings, setBookings] = useState("");
  const pdfRef = useRef();

  useEffect(() => {
    async function getHistory() {
      try {
        let { data } = await axios.get(`/Payment/getBookingHistory/${id}`);
        if (data) setBookings(data.result);
      } catch (error) {
        console.error("error found in getHistory", error);
      }
    }
    getHistory();
  }, [id]);

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      ignoreElements: (element) => {
        const computedStyle = window.getComputedStyle(element);
        return (
          computedStyle.color.includes("oklch") ||
          computedStyle.backgroundColor.includes("oklch")
        );
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Order_${id}.pdf`);
    });
  };

  const handleRating = (id)=>{
    setSelectedPackageId(id)
   setShowRating(true)
  }
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-8">My Booking History</h1>
      <div className="grid gap-6">
        {Bookings &&
          Bookings.map((booking, index) => (
            <div
              key={index}
              className=" rounded-lg shadow-md overflow-hidden"
              ref={pdfRef}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <img
                    src={booking.image}
                    alt={booking.packageName}
                    className="h-62 w-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-24">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">
                          Package : {booking.packageName}
                        </h2>
                        <p className=" mb-2">
                          {" "}
                          Scheduled ON : {new Date(booking.Date).getDate()}/
                          {new Date(booking.Date).getMonth() + 1}/
                          {new Date(booking.Date).getFullYear()}
                        </p>
                        <p className="text-lg font-semibold ">
                          Total price :{booking.price}
                        </p>
                        <p className="text-lg font-semibold  pt-1">
                          Booked Seats :{booking.seat}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-lg">
                          {" "}
                          Company: {booking.companyName}
                        </h3>
                        <h3 className="font-semibold text-lg flex">
                          {" "}
                          Reciepent: {booking.userName}
                        </h3>
                        <h3 className="font-semibold text-lg">
                          {" "}
                          Email: {booking.userEmail}
                        </h3>
                      </div>
                    </div>
                    <p className="text-blue-600 text-md font-semibold">
                      {new Date(booking.Date) < new Date() ? "Completed" : ""}
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-4">
                    {/* <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    View Details
                  </button> */}
                    <button
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      onClick={downloadPDF}
                    >
                      Download Invoice
                    </button>
                    {new Date(booking.Date) < new Date() && (
                      <button className="px-4 py-2 border bg-blue-600 text-white border-gray-300 rounded hover:bg-blue-700 transition-colors"
                      onClick={()=>handleRating (booking.packageId)}>
                        Rate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      { showRating && <RatingComponent setShowRating={setShowRating} userId={id} selectedPackageId={selectedPackageId}/>}
    </div>
  );
}

export default BookingHistory;
