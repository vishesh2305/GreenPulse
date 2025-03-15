import React, {useState} from "react";
import axios from 'axios';

import { useNavigate, useLocation } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";


const OtpVerification = () => {
    const [otp, setotp] = useState(["","","","","",""]);
    const [alert, setAlert] = useState({message: "", type: ""});
    const navigate = useNavigate();
    const location = useLocation();
    const email= location.state?.email || "Your Entered Email Address !"


    const handleChange = (index, event) => {
        const value = event.target.value.replace(/[^0-9]/g, "");
        if (value.length > 1) return;


        const newOtp = [...otp];
        newOtp[index]=value;
        setotp(newOtp);

        if(value && index < otp.length -1){
            document.getElementById(`otp-${index +1}`).focus();
        };

    };


        const handleBackspace = (index, event) => {
            if (event.key === "Backspace" && !otp[index]) {
                document.getElementById(`otp-${index -1}`).focus();
        };
    };

    const handleResend = (event) => {
        event.preventDefault();
        handleSubmit();
    };
        const handleSubmit = async (e) => {
            e.preventDefault();
            const otpValue = parseInt(otp.join(""));
            try{
              const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/verify-otp`, {otp:otpValue}, { withCredentials: true });
              console.log(otpValue);
            if(response.data.message==true) {
                setAlert({message: "Otp Verified Successfully !", type: "success"});
                setTimeout(() => navigate("/home"), 1500);
            } else {
                setAlert({message: "Invalid Otp ! Please Enter a Valid OTP !", type: "error"});
            }}
            catch(error){console.log(error.response);setAlert({message:"Error Fetching in OTP",type:"failed"})}
        };
        

        return (
            <section className="flex flex-col items-center justify-center h-screen bg-gray-100 w-full ">
                <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert({ message: "", type: "" })} />
              <div className="bg-white p-6 py-20 shadow-md rounded-lg  text-center w-3/5 border">
                <h2 className="text-2xl font-semibold text-gray-800">OTP Verification</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Enter the 6-digit OTP sent to <span className="font-bold">{email}</span>
                </p>
        
                {/* OTP Input Fields */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleBackspace(index, e)}
                        className="w-10 h-10 bg-transparent text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 my-5"
                      />
                    ))}
                  </div>
        
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="mt-6 w-60 my-10 bg-darkGray text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    Verify OTP
                  </button>
                </form>
        
                {/* Resend OTP */}
                <p className="text-xs text-gray-500 mt-4">
                  Didn't receive the code? <span className="font-bold cursor-pointer text-darkGray" onClick={handleResend}>Resend</span>
                </p>




              </div>
            </section>
          );


    };



export default OtpVerification;