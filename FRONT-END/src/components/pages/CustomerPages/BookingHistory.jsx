import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "../../../axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import RatingComponent from "../../modal/RatingComponent";

function BookingHistory() {

  const [showRating, setShowRating] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();
  const [Bookings, setBookings] = useState("");
  const pdfRef = useRef();

  useEffect(() => {
    async function getHistory() {
      try {
        let { data } = await axios.get(`/Payment/getBookingHistory/${id}`);
        if (data){
          setBookings(data.result);
          if(data.result.length === 0){
          setNotFound(true)
          }

        }else{
          setNotFound(true)
        }
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
    <div className="container mx-auto px-4 py-8 relative ">
    <h1 className="text-3xl font-bold mb-8 text-center md:text-left flex justify-center">My Booking History</h1>
    <div className="grid gap-6">
     {notFound && <p className="flex justify-center font-bold">No previews Bookings</p>}
      {Bookings &&
        Bookings.map((booking, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md overflow-hidden"
            ref={pdfRef}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 w-full">
                <img
                  src={booking.image}
                  alt={booking.packageName}
                  className="h-62 w-full object-cover"
                />
              </div>
              <div className="p-4 md:p-6 w-full md:w-3/4">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6 gap-4 w-full">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">
                        Package : {booking.packageName}
                      </h2>
                      <p className="mb-2">
                        Scheduled ON : {new Date(booking.Date).getDate()}/
                        {new Date(booking.Date).getMonth() + 1}/
                        {new Date(booking.Date).getFullYear()}
                      </p>
                      <p className="text-lg font-semibold">
                        Total price : {booking.price}
                      </p>
                      <p className="text-lg font-semibold pt-1">
                        Booked Seats : {booking.seat}
                      </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <h3 className="font-semibold text-lg">
                        Company: {booking.companyName}
                      </h3>
                      <h3 className="font-semibold text-lg">
                        Reciepent: {booking.userName}
                      </h3>
                      <h3 className="font-semibold text-lg">
                        Email: {booking.userEmail}
                      </h3>
                    </div>
                  </div>
                  <p className="text-blue-600 text-md font-semibold whitespace-nowrap">
                    {new Date(booking.Date) < new Date() ? "Completed" : ""}
                  </p>
                </div>
  
                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    onClick={downloadPDF}
                  >
                    Download Invoice
                  </button>
                  {new Date(booking.Date) < new Date() && (
                    <button
                      className="px-4 py-2 border bg-blue-600 text-blue border-gray-300 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => handleRating(booking.packageId)}
                    >
                      Rate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
    {showRating && (
      <RatingComponent
        setShowRating={setShowRating}
        userId={id}
        selectedPackageId={selectedPackageId}
      />
    )}
  </div>
  
  );
}

export default BookingHistory;
