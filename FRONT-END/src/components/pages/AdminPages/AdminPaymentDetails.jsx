import axios from "../../../axios";
import { useEffect, useState } from "react";
import Listing from "../../CommonComponents/ListingComponents/Listings";
import { useNavigate } from "react-router-dom";

function AdminPaymentDetails() {
  const [payment, setPayment] = useState();
  const [Props, setProps] = useState("null");
  const navigate = useNavigate()

  useEffect(() => {
    async function DisplayAllPayment() {
      const token = localStorage.getItem("token");
      try {
        let { data } = await axios.get("/Admin/PaymentDetails", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (data) {
            setPayment(data.result);
            setProps('payment')
        }
      } catch (error) {
        console.error("Error fetching payment details", error);
      }
    }
    DisplayAllPayment();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">PAYMENT DETAILS</h1>
          <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:text-blue-800 flex text-lg items-center gap-2"
      >
        ← Back
      </button>
        </div>
      </header>
      <Listing Data={payment} Props={Props} />
     
    </div>
  );
}

export default AdminPaymentDetails;
