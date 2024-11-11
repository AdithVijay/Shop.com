import { toast } from 'sonner';
import React, { useState } from 'react';

function PaymentComponent() {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount === "") {
      alert("Please enter an amount");
    } else {
      var options = {
        key: "rzp_test_qCInnPOVC7vtPP", // Replace with your Razorpay key
        key_secret: "ebNDS0TwQxpjL3VyQGuzb4O6", // Replace with your Razorpay secret
        amount: amount * 100, // Convert amount to paise
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        handler: function(response) { 
        //   alert(response.razorpay_payment_id);
        toast.success("succes")
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
  };

  return (
    <div className="App">
      <h2>Razorpay Payment Integration Using React</h2>
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default PaymentComponent;
