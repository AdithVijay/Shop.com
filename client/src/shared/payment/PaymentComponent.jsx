import { toast } from 'sonner';
import React, { useState } from 'react';

function PaymentComponent({user,amount,handlePlaceOrder}) {


  const handleSubmit = () => {

      var options = {
        key: "rzp_test_qCInnPOVC7vtPP", // Replace with your Razorpay key
        key_secret: "ebNDS0TwQxpjL3VyQGuzb4O6", // Replace with your Razorpay secret
        amount: amount * 100, // Convert amount to paise
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        handler: function(response) { 
        handlePlaceOrder()
        },
        prefill: {
          name: "Velmurugan",
          email: "mvel1620r@gmail.com",
          contact: "7904425033",
        },
        notes: {
          address: "Razorpay Corporate office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const pay = new window.Razorpay(options);
      pay.open();
  }

  return (
    <div >
      
      <button 
        onClick={handleSubmit} 
        className="bg-black text-white px-8 py-2 font-medium uppercase tracking-wide rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default PaymentComponent;
