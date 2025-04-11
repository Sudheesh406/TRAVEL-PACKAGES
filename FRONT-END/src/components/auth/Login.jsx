import { Link } from 'react-router-dom';
import { useState } from 'react';
import imageSrc from "../../assets/loginimage.jpg";
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../../redux/user/userSlice';

function Login() {
  let dispatch = useDispatch()
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setErrorDisplay(true)
      setErrorMessage('Email and password are required');
      return;
    }
    if (password.length <=0) {
      setErrorDisplay(true)
      setErrorMessage('Password is required');
      return;
    }
    try {
      let result = await axios.post('/Login',formData)
      dispatch(setUser(result.data.result))
      localStorage.setItem('token', result.data.accessToken);
      if(result.data.result.role === "user" && result.data.accessToken){
        navigate('/');
        console.log('Login response:', result.data.result);
      }else if(result.data.result.role === "operator"){
        navigate('/Operator/OperatorDashboard');
      }else if(result.data.result.role === "admin"){
        navigate('/Admin/AdminDashboard');
      }
    } catch (error) {
      if(error.response.status === 401){
        setErrorDisplay(true)
        setErrorMessage('Invalid email or password');
      }
      if(error.response.status === 403){
        setErrorDisplay(true)
        setErrorMessage('Your account is not verified');
      }
      if(error.response.status === 404){
        setErrorDisplay(true)
        setErrorMessage('Email has not been registered');
      }
    }
  };

  const handleChange = (e) => {
    setErrorDisplay(false)
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl h-[630px] w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl flex overflow-hidden">
      <div className="w-1/2 hidden lg:flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-500">
      <img src={imageSrc} alt="Background" className="object-cover w-full" />
      </div>
      
      <div className="w-full lg:w-1/2 p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-lg text-gray-600">Your next adventure awaits</p>
          <div className="mt-4 flex justify-center">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        <form className="mt-8 space-y-12" onSubmit={handleSubmit}>
          <div className="space-y-8">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
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
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
          {errorDisplay && <p className='p-0 m-0 flex justify-center text-red-600'>{errorMessage}</p> } 
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transform transition-all duration-150 hover:scale-[1.02]"
            >
              Start Your Journey
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            New explorer?{' '}
            <Link to="/signup" className="font-medium text-teal-600 mb-24 hover:text-teal-500 transition-colors">
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Login;