import React, { useState } from 'react';

const PasswordResetOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Reset Your Password</h2>
        <p className="text-gray-600 text-center text-sm sm:text-base mb-6 sm:mb-8">
          Enter your 6 digit OTP code to reset.
        </p>
        <div className="flex justify-between mb-6">
          {otp.map((data, index) => {
            return (
              <input
                className="w-10 h-10 sm:w-12 sm:h-12 border-2 rounded-lg text-center text-lg sm:text-xl focus:border-black focus:outline-none"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            )
          })}
        </div>
        <button 
          className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 sm:py-3 px-4 rounded-lg transition duration-300 mb-4"
        >
          Reset Password
        </button>
        <p className="text-center text-gray-600 text-sm sm:text-base">
          Didn't receive the code?{''}
          <button className="text-black hover:text-gray-800 font-semibold">
            Re-send OTP Code
          </button>
        </p>
      </div>
    </div>
  );
};

export default PasswordResetOTP;