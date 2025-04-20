import { useFormStatus } from "react-dom";
import { useState } from "react";
import OtpModal from "./OtpModal";
import axios from "../../axios";
import toast from "react-hot-toast";

function SubmitButton({passWordField}) {
  const { pending, success } = useFormStatus();
  return (
    <div>
    {!passWordField && <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? "#ccc" : "#0070f3",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: pending ? "not-allowed" : "pointer",
      }}
    >
      {pending ? "Submitting..." : success ? "Submitted" : "Submit"}
    </button>}

    {passWordField && <button
      type="submit"
      disabled={pending}
      style={{
        background: pending ? "#ccc" : "#0070f3",
        color: "#fff",
        padding: "10px 10px",
        border: "none",
        borderRadius: "5px",
        cursor: pending ? "not-allowed" : "pointer",
        width: '200px'
      }}
    >
      {pending ? "Submitting..." : success ? "Submitted" : "Submit"}
    </button>}

    </div>
  );
}

function ForgetPasswordModal({ setForgetModal }) {
  const [submitBtn, setSubmitBtn] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [emailField, setEmailField] = useState(true);
  const [passWordField, setPassWordField] = useState(false);

  async function handleSubmit(formData) {
   
    let passwordInput = formData.get("password")
    let confirmPasswordInput = formData.get("confirmPassword")
    let email = formData.get("email")

    if(email){
      localStorage.setItem('user',JSON.stringify(email))
      let response = await axios.post('/reSentOtp',{email})
      if(response){
        console.log('OTP sented')
      }
      setOtpModal(true);
    }
    
    if(passwordInput && passwordInput == confirmPasswordInput){
      const userEmail = JSON.parse(localStorage.getItem("user"))
      const data = {userEmail,passwordInput}
      const response = await axios.post('/Newpassword',data)
      if(response){
        // if(response.data.result.role == "operator"){
          
        // }
        toast.success('Your password is changed successfully');

        setForgetModal(false)
      }else{
     toast.error('Something went wrong during verification.');
      }
  }
  }

  const handleModal = () => {
    setForgetModal(false);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500/75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
              onClick={handleModal}
            >
              &times;
            </button>

            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="text-center">
                <h3
                  className="text-lg font-semibold text-gray-900"
                  id="modal-title"
                >
                  Verification
                </h3>
                {emailField && (
                  <div>
                    <p className="mt-2 text-sm text-gray-500">
                      Enter your email address to get a one-time password.
                    </p>
                    <form action={handleSubmit} className="pt-2 flex justify-center">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        style={{
                          padding: "10px",
                          marginRight: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          width: "220px",
                        }}
                      />
                      <SubmitButton />
                    </form>
                  </div>
                )}

                {passWordField && (
                  <div>
                    <p className="mt-2 text-sm text-gray-500 pb-2">
                      Enter New Password
                    </p>
                    <form action={handleSubmit} className="pt-2 flex flex-col items-center gap-4">
                      <input
                        type="password"
                        name="password"
                        placeholder="New password"
                        required
                        style={{
                          padding: "10px",
                          marginRight: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          width:"300px"
                        }}
                      />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        required
                        style={{
                          padding: "10px",
                          marginTop: "10px",
                          marginRight: "10px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          display: "block",
                          width:"300px"
                        }}
                      />
                      <SubmitButton passWordField={passWordField} />
                    </form>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"></div>
          </div>
        </div>
      </div>
      {otpModal && <OtpModal setOtpModal={setOtpModal} submitBtn={submitBtn} setEmailField={setEmailField} setPassWordField={setPassWordField} />}
    </div>
  );
}

export default ForgetPasswordModal;
