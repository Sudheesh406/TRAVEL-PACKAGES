import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../../../axios'
import Swal from "sweetalert2";
import { useDispatch, useSelector } from 'react-redux';
import { setCompany, clearCompany } from '../../../redux/company/companySlice';
function OpperatorRegister() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    companyName: '',
    Tagline: '',
    phoneNumber: '',
    gstNumber: '',
    address: ''
  })
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    newRegisteration()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  async function navigateToOpperatorPage(){
    try {
      let {data} = await axios.post('/Company/registeredCompany',formData)
      if(data){
        navigate('/OperatorDashboard')
        console.log("result:",data)
      }
    } catch (error) {
      console.error("error found in company data posting",error);
    }
  }


  const checkoutPayment = async (order) => {
    
    const options = {
      key: "rzp_test_ZKcJLyt29WoYex",
      amount: order.amount,
      currency: order.currency,
      name: "VINERGO",
      description: "Thank you for shopping with us!",
      order_id: order.id,
      handler: async function (response) {
        Swal.fire({
          title: "Registered Successfully!",
          text: "Your registeration process is Completed.",
          icon: "success",
          showCancelButton: false, 
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((response)=>{
          dispatch(setCompany(formData))
          navigateToOpperatorPage()
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
  

  const newRegisteration = async () => {
    try {
      let response = await axios.post("/Payment/razorpay", {
        amount: 499,
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


  return (
    <div className="h-[727px] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Company Registration
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label htmlFor="Tagline" className="block text-sm font-medium text-gray-700">
              Tag line
            </label>
            <input
              type="text"
              id="Tagline"
              name="Tagline"
              value={formData.Tagline}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Company Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">
              Company GST Number
            </label>
            <input
              type="text"
              id="gstNumber"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Company Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
            />
          </div>

          <div className="text-center text-lg font-medium text-gray-900 py-4">
            Registration Amount: ₹499
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default OpperatorRegister