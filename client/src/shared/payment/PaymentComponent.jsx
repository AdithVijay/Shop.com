import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import axiosInstance from '@/config/axiosInstance';
import { useSelector } from 'react-redux';

function PaymentComponent({amount,handlePlaceOrder,selectedAddress,cartdata,subtotal}) {

  const user = useSelector((state)=>state.user.users)
  console.log(user);
  
  const handleSubmit =async () => {

    try {
      const response = await axiosInstance.post("/user/size-check-in-payment",{cartdata,user})
      console.log("this is the resposnse" , response);
    } catch (error) {
      console.log(error);
      return toast.error(error?.response?.data?.message)
    }
     
    if(!selectedAddress){
      return toast.error("Select address")
    }
     
      var options = {
        key: "rzp_test_qCInnPOVC7vtPP", // Replace with your Razorpay key
        key_secret: "ebNDS0TwQxpjL3VyQGuzb4O6", // Replace with your Razorpay secret
        amount: amount * 100, // Convert amount to paise
        currency: "INR",
        name: "SHOPCO",
        // description: "for testing purpose",

        handler: function(response) { 
          if (response.razorpay_payment_id) {
            toast.success('Payment successful!');
            handlePlaceOrder()
          }
        },
        modal: {
          ondismiss: function() {

          }
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

        try {
          const pay = new window.Razorpay(options);
          // Handle payment failures
          pay.on('payment.failed', function(response) {
            const { error } = response;
            toast.error(`Payment failed: ${error.description}`);
             let orderStatus = "Failed"
              let paymentstatus = "Failed"
              handlePlaceOrder(orderStatus,paymentstatus)
            
            // You might want to log the full error details
            console.error('Payment failed:', {
              code: error.code,
              description: error.description,
              source: error.source,
              step: error.step,
              reason: error.reason,
            });
          });
          pay.open();
        } catch (error) {
          toast.error('Failed to initialize payment. Please try again.');
          console.error('Razorpay initialization error:', error);
        }

  }

  return (
    <div >
      
      <button 
        onClick={handleSubmit} 
        className="bg-black text-white px-4 py-2 w-full mt-4"
      >
        Razor Pay
      </button>
    </div>
  );
}

export default PaymentComponent;
