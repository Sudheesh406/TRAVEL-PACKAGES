import axios from "../../../axios";
import { useEffect, useState } from "react";
import Listing from "../../CommonComponents/ListingComponents/Listings";

function AdminPaymentDetails() {
  const [payment, setPayment] = useState();
  const [Props, setProps] = useState("null");

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
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">PAYMENT DETAILS</h1>
        </div>
      </header>
      <Listing Data={payment} Props={Props} />
     
    </div>
  );
}

export default AdminPaymentDetails;
