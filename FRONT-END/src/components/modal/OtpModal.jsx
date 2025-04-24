import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';  
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '../../redux/user/userSlice';
import toast from 'react-hot-toast';

function OtpModal({ setOtpModal, handleOtp, identifyUser,SubmitBtn,setPassWordField,setEmailField}) {
  let dispatch = useDispatch()
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleModal = () => {
    setOtpModal(false);
    console.log('Modal closed');
  };

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); 
    }
  };

  const handleResent = async()=>{
    try {
      toast('Your request accepted, please wait');
      let user = JSON.parse(localStorage.getItem("user"));
      let email = user.email
      let response = await axios.post('/reSentOtp',{email})
      if(response){
      toast.success('OTP Resented')
      }
    } catch (error) {
      console.error("error in handleResent",error);
      
    }
  }

  const handleSubmit = async () => {
    const enteredOtp = otp.join(""); 
    let user = localStorage.getItem('user');  
    let data = JSON.parse(user); 
    if (data) {  
        data.otp = enteredOtp; 
    }
    if(!identifyUser){
      try {
        let result = await axios.post('/Signup',data)
        if(result){
            localStorage.setItem('token', result.data.result.accessToken);
            dispatch(setUser(result.data.result.newUser));
            setOtpModal(false);
              navigate('/');
              localStorage.removeItem('user');
          }
      } catch (error) {
        console.log('Otp error:', error);
      }

    }else if(identifyUser){
      try {
        let result = await axios.post('/operatorSignup',data)
        if(result){
          localStorage.setItem('token', result.data.result.accessToken);
          dispatch(setUser(result.data.result.newUser));
          setOtpModal(false);

          navigate('/operator/operatorRegister')
          localStorage.removeItem('user');
        }
    } catch (error) {
      console.log('Otp error:', error);
    }
    }
    handleOtp(enteredOtp); 
  };
 
  async function handleNewPasword(){
    try {
      let email = JSON.parse(localStorage.getItem("user"))
      const enteredOtp = otp.join(""); 
      setOtpModal(false)
      const data = {enteredOtp,email}
      const response = await axios.post('/ChangePassword',{data})
      if(response){
         setEmailField(false)
         setPassWordField(true)
       }
    } catch (error) {
      console.error("error found in handleNewPasword",error);
      toast.error('Something went wrong during verification. Please recheck your email and OTP.');
    }
  }

  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg" onClick={handleModal}>
              X
            </button>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900" id="modal-title">Enter OTP</h3>
                <p className="mt-2 text-sm text-gray-500">We have sent a 6-digit OTP to your registered mobile number. Please enter it below.</p>

                <div className="mt-4 flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)} // Assign ref
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
             {SubmitBtn && <button type="button" className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={handleSubmit}>
                Verify OTP
              </button>}
             {!SubmitBtn && <button type="button" className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={handleNewPasword}>
                Verify OTP
              </button>}
              <button type="button" className="w-full inline-flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 sm:ml-3 sm:w-auto" onClick={handleResent}>
                Resent OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpModal;
