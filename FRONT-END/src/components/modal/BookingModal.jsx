import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector } from 'react-redux';
import axios from '../../axios'
import Swal from "sweetalert2";

//take user details from redux and give it to the rayzor pay set a page for see all bookings

function BookingModal({ setShow, packageDetails }) { 
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.user);
  console.log(packageDetails)
  const [itemCount, setItemCount] = useState(0);
  const PRICE_PER_ITEM = packageDetails.price;
  const TAX_RATE = 0.00; 

  const handleIncrement = () => {
    if (itemCount < packageDetails.availableSeat) {
      setItemCount(itemCount + 1);
    }
  };

  const handleDecrement = () => {
    if (itemCount > 0) {
      setItemCount(itemCount - 1);
    }
  };

  const subtotal = itemCount * PRICE_PER_ITEM;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  
  const checkoutPayment = async (order) => {
    console.log("order:",order);
    
    const options = {
      key: "rzp_test_ZKcJLyt29WoYex",
      amount: order.amount,
      currency: order.currency,
      name: "VINERGO",
      description: "Thank you for shopping with us!",
      order_id: order.id,
      handler: async function (response) {
        Swal.fire({
          title: "Booking Confirmed!",
          text: "Your Seat has been successfully Booked.",
          icon: "success",
          showCancelButton: false, 
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((response)=>{
          setShow(false)
          let data = {packageName : packageDetails.name,
            packageId : packageDetails._id,
            price : total,
            Date: packageDetails.Date,
            user : user._id,
            company: packageDetails.company,
            seat: itemCount,
            image: packageDetails.images[0],
            companyName : packageDetails.companyName,
            userName : user.username,
            userEmail : user.email,
            description : packageDetails.description
           }
          packageBooked(data)
         })

         
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
  
        try {
          const result = await axios.post("/Payment/verify-payment", paymentData);
          if (result.data.success) {
            console.log("Payment is successful");
            toast.success("Order Created");
          } else {
            console.log("Payment verification failed"); 
            toast.error("Error while creating order");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
        }
      },
      prefill: {
        name: user.username,
        email: user.email,
        contact: "8078115004",
      },
      theme: {
        color: "#AF6900",
      },
    };
  
    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  const packageBooked = async(data)=>{
    try {
      let result = await axios.post('/payment/booking',{data})
      if(result){
        navigate(`/BookingHistory/${user._id}`)      }
    } catch (error) {
      console.error("error found in packageBooked",error);
    }
  }

  const newBooking = async () => {
    try {
      let response = await axios.post("/Payment/razorpay", {
        amount: subtotal,
        currency: "INR",
      });
      if (response) {
        await checkoutPayment(response.data.order);
        // change order status ton completed
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = ()=>{
    newBooking()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-opacity-20 backdrop-blur-xs"
        onClick={() => setShow(false)} 
      ></div>

      <div className="relative bg-white p-6 rounded-xl shadow-lg w-full max-w-md z-10">
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-center text-red-600">Reserve Your Seats</h1>
          <p className="text-center text-gray-500 text-sm mt-2">Maximum {packageDetails.availableSeat} Seats Available</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700">Regular Ticket</span>
            <span className="text-red-600 font-semibold">₹{PRICE_PER_ITEM}</span>
          </div>
          
          <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
            <button
              onClick={handleDecrement}
              disabled={itemCount === 0}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                itemCount === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              -
            </button>
            
            <span className="text-xl font-bold text-gray-800">{itemCount}</span>
            
            <button
              onClick={handleIncrement}
              disabled={itemCount === packageDetails.availableSeat}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                itemCount === packageDetails.availableSeat
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax </span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
              <span className="text-gray-800">Total</span>
              <span className="text-red-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <button
          disabled={itemCount === 0}
          className={`w-full py-4 rounded-lg text-lg font-bold text-white transition-colors ${
            itemCount === 0
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
          onClick={handleSubmit}
        >
          {itemCount === 0 ? 'Select tickets to continue' : `Proceed to Pay ₹${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}

export default BookingModal;
