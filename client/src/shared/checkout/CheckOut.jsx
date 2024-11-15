import React, { useEffect, useState } from 'react';
import { CreditCard, Truck, Wallet } from 'lucide-react';
import { MdDelete } from "react-icons/md";
import axiosInstance from '@/config/axiosInstance';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import OrderSuccessModal from '../modal/OrderSuccessModal';
import PaymentComponent from '../payment/PaymentComponent';

const CheckOut = () => {
  const user = useSelector((state) => state.user.users)//userId 
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [adress, setadress] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cartdata,setcartdata]=useState([])
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [relaod, setrelaod] = useState(false);
  const [coupons, setcoupon] = useState([]);
  const [selectedCoupun, setselectedCoupun] = useState("");
  const [coupoundiscount,setcoupoundiscount] = useState();
  const [actualCoupounDiscount, setactualCoupounDiscount] = useState(null);
  const [paymentfail,setPaymentFail]=useState(false)
  
  // console.log("thiissisivjgfjdsgfdsgjhfgjklds",paymentfail);
  

  const [a, seta] = useState(null);
  const shipping = 'Free';


// ========================USEEFECT==========================
    useEffect(() => {
        fetchAdress()
        fetchProduct() 
        fetchCoupuns()
    },[relaod]);

    useEffect(()=>{
      submitCheckout
    },[paymentfail])

//=======================FETCHING ADRESS======================
    async function fetchAdress(){
        try {
            const response = await axiosInstance.get(`/user/fetchuseraddress/${user}`)
            // console.log(response);
            setadress(response.data) 
            setrelaod(false)
        } catch (error) {
            console.log(error);
        }
    }

//=======================FETCHING PRODUCT DATA FROM CART======================
    async function fetchProduct() {
        try {
          const response = await axiosInstance.get(`/user/cartdata/${user}`);
          // console.log("resposnsss",response)
          // console.log("response from the server", response.data.items)
          setcartdata(response.data.items)         
          const calculatedSubtotal = response.data.items.reduce(
            (acc, item) => acc + item.totalItemPrice,
            0
          );
          setSubtotal(calculatedSubtotal)
          setrelaod(false)
        } catch (error) {
          console.log(error)
        }
      }

  //=======================SUBITING CHECKOUT DETAILS TO BACKEND==================
    async function submitCheckout(orderStatus,paymentstatus) {
      if(!paymentMethod){
        return toast.error("choose a payment method")
      }
      if(!selectedAddress){
        return toast.error("choose an address")
       }

       try {
        // IF COUPOUN APPLIED THEN THIS FUNCTION 
          console.log("payment successs")
          
          const response =await axiosInstance.post("/user/checkout",{
            user,
            subtotal,
            total_price_with_discount:actualCoupounDiscount||0,
            payment_method:paymentMethod,
            cartdata,
            order_status: orderStatus || "Pending",
            payment_status: paymentstatus || "Paid",
            coupon_discount:coupoundiscount,
            shipping_address:selectedAddress
          })
          setShowSuccessModal(true)
          setrelaod(true)

          // MODAL PROPS 
          setOrderDetails({
            orderId: `ORD${Date.now()}`,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            paymentMethod: paymentMethod,
            amount: actualCoupounDiscount||subtotal,
            expectedDelivery: "27 - September - 2024" 
          });
      
         
       } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message)
        
       }
    }

  //============================FETCHING COUPOUN ===========================    
  async function fetchCoupuns() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get("/admin/get-coupons");
      // console.log(response, "Data reciving");
      setcoupon(response.data.coupouns)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  //=======================COPY COUPOUN===============
  function copyCoupoun(code,discountValue) {
    seta(discountValue) 
    navigator.clipboard.writeText(code)
    toast("Coupoun copied")
  }
  
  //=====================FUNCTION TO SUBMIT COUPOUN TO BACKEND==================
  async function submitCoupoun(){
    try {
        if(coupons.length==0){
          return toast.error("coupons not available")
        }
        if(!selectedCoupun){
        return toast.error("Select a coupoun")
        }    

        const response = await axiosInstance.post("/user/apply-coupoun",{selectedCoupun,user,subtotal})
        console.log("coupoun db response",response)
        setactualCoupounDiscount(response.data.newSubtotal)//The price displayed as total 
        setcoupoundiscount(a)//The amount to be displayed in Coupoun discount
        toast.success(response.data.message) 
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  
//==========================FUNCTION TO REMOVE COUPOUN========================
  function handleDeleteCoupon(){
    setcoupoundiscount(null)
    setactualCoupounDiscount(null)
    setselectedCoupun("")
  }




  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            {adress.map((address) => (
              <div key={address._id} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`address-${address.id}`}
                  name="address"
                  checked={selectedAddress === address._id}
                  onChange={() => setSelectedAddress(address._id)}
                  className="mr-2"
                />
                <label htmlFor={`address-${address.id}`} className="flex-grow border p-2 rounded">
                  <p>{address.name}</p>
                  <p>{address.address}</p>
                  <p>{address.place}</p>
                  <p>{address.district}</p>
                  <p>Contact: {address.phonenumber}</p>
                  <p>{address.state}</p>
                </label>
              </div>
            ))}
          </div>
          <Link to={"/address"}>
          <button className="bg-black text-white px-4 py-2 rounded">Add New Address</button>
          </Link>
          <h3 className="font-semibold mt-6 mb-2">Payment Methods</h3>
          <div className="space-y-2">
            {['RazorPay', 'Cash on delivery', 'Wallet'].map((method) => (
              <div key={method} className="flex items-center">
                <input
                  type="radio"
                  id={method}
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor={method}>{method}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cartdata.map((product) => (
            <div key={product._id} className="flex items-center mb-4">
              <img src={product.productId.images[0]} alt={product.name} className="w-16 h-18 object-cover mr-4" />
              <div>
                <h3 className="font-semibold">{product.productId.productName}</h3>
                <p className='text-sm text-gray-600 mb-1'>QTY : {product.quantity}</p>
                <p className='text-sm text-gray-600 mb-1'>SIZE : {product.selectedSize}</p>
                <p className=' text-sm font-semibold'>₹{product.price}</p>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>{shipping}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Coupoun Discount:</span>
              <span>₹{coupoundiscount?coupoundiscount:0}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{actualCoupounDiscount?actualCoupounDiscount:subtotal}</span>
            </div>

          </div>
          <div className="mt-4">

            <input value={selectedCoupun} onChange={(e)=>setselectedCoupun(e.target.value)} type="text" placeholder="Coupon Code" className="border p-2 w-full mb-2" />
          {actualCoupounDiscount?
          <button   onClick={handleDeleteCoupon} className="bg-black text-white px-4 py-2 w-full">Remove Coupon</button>
          :
          <button  onClick={()=>submitCoupoun()} className="bg-black text-white px-4 py-2 w-full">Apply Coupon</button>
          }


          </div>

            {/* Coupon Display Area */}
                <div className="border p-4 rounded-lg mt-4">
                  {coupons.length === 0 ?
                    <h3 className="text-lg font-semibold mb-4">Coupons Not Available</h3>
                    :
                    <div>
                      <h3 className="text-lg font-semibold pb-4">Available Coupons</h3>
                    </div>
                  }
                  {coupons.slice(0,3).map((coupon) => (
                    <div key={coupon?._id} className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-bold">{coupon?.code}</p>
                        <p className="text-sm text-gray-600">valid for orders above ₹{coupon?.minPurchaseAmount}</p>
                      </div>
                      <button 
                        className="bg-black text-white px-4 py-1"
                        onClick={() => copyCoupoun(coupon?.code,coupon.discountValue) }
                      >
                        COPY
                      </button>
                      
                    </div>
                   ))} 
                      {coupons.length === 0 ?
                      " "
                       :
                    <Link to={"/user-coupons"} className='underline text-sm flex justify-center pt-3 '>View all Coupouns</Link>
                       }
           
                </div>

                   {/* PAYMENT SUBMISSION */}

          {paymentMethod!= "RazorPay"?
          <button onClick={()=>submitCheckout()} className="bg-black text-white px-4 py-2 w-full mt-4">Place Order</button>:
          
          <PaymentComponent
           user={user}
           amount={subtotal}
           handlePlaceOrder={submitCheckout}
           setPaymentFail={setPaymentFail}
           paymentfail={paymentfail}
          />
          }

        </div>
      </div>
      <OrderSuccessModal
        isOpen={showSuccessModal}
        // onClose={() => setShowSuccessModal(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default CheckOut;