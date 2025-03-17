import { Link } from 'react-router-dom';
import { useState } from 'react';
import imageSrc from "../../assets/signupimage.jpg";
import axios from '../../axios';
import OtpModal from '../modal/OtpModal';

function Signup() {
  const [otpModal, setOtpModal] = useState(false);
  const [handleOtp, setHandleOtp] = useState();
  const [identifyUser, setIdentifyUser] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIdentifyUser(false)
    if(formData){
    let data = {otpRequest : true, email: formData.email}
     await axios.post('/Signup',data)
      .then(res => {
        console.log('Signup response:', res.data);
        let result = localStorage.getItem('user');
        if(!result){
          localStorage.setItem('user',JSON.stringify(formData));
        }
        setOtpModal(true);
      })
      .catch(err => {
        console.log('Signup error:', err);
      });
    }
    console.log('Signup data:', formData);
  };

  const handleOpperatorSubmit = async(e) => {
    e.preventDefault();
    setIdentifyUser(true)
    if(formData){
      let data = {otpRequest : true, email: formData.email}
     await axios.post('/operatorSignup',data)
      .then(res => {
        console.log('Signup response:', res.data);
        let result = localStorage.getItem('user');
        if(!result){
          localStorage.setItem('user',JSON.stringify(formData));
        }
        setOtpModal(true);
      })
      .catch(err => {
        console.log('Signup error:', err);
      });
    }
    console.log('Signup data:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl h-[630px] w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl flex overflow-hidden">
      {/* left Side - Signup Form */}
      <div className="w-full lg:w-1/2 p-8 ">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Begin Your Journey</h1>
          <p className="text-lg text-gray-600">Join our community of travelers</p>
        </div>
        <div className="mt-4 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
              <input
                id="name"
                name="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="sudheesh kumar"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform transition-all duration-150 hover:scale-[1.02]"
              onClick={handleSubmit}>
              Start Your Adventure
            </button>
            <button
              type="button"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform transition-all duration-150 hover:scale-[1.02]"
              onClick={handleOpperatorSubmit}>
              Join as an Operator
            </button>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already an explorer?{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
       {/* Left Side - Image */}
       <div className="w-1/2 hidden lg:flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500">
       <img src={imageSrc} alt="Background" className="w-full h-full object-cover" />
       </div>
    </div>
    {otpModal && <OtpModal setOtpModal={setOtpModal} handleOtp={setHandleOtp} identifyUser={identifyUser} />}  
  </div>

  );
}

export default Signup;