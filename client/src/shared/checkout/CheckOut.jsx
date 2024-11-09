import React, { useEffect, useState } from 'react';
import { CreditCard, Truck, Wallet } from 'lucide-react';
import dp1 from '../../assets/dp1.jpg'
import axiosInstance from '@/config/axiosInstance';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import OrderSuccessModal from '../modal/OrderSuccessModal';

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
  
  const shipping = 'Free';
  const total = subtotal;

// ========================USEEFECT==========================
    useEffect(() => {
        fetchAdress()
        fetchProduct() 
        fetchCoupuns()
    },[relaod]);

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
          console.log("resposnsss",response)
          console.log("response from the server", response.data.items)
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
    async function submitCheckout() {
      if(!paymentMethod){
        return toast.error("choose a payment method")
       }
      if(!selectedAddress){
        return toast.error("choose an address")
       }

       try {
        const response =await axiosInstance.post("/user/checkout",{
          user,
          subtotal,
          payment_method:paymentMethod,
          cartdata,
          shipping_address:selectedAddress
        })
          console.log("order db scess",response);

          // MODAL PROPS 
          setOrderDetails({
            orderId: response.data.orderId || `ORD${Date.now()}`,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            paymentMethod: paymentMethod,
            amount: subtotal,
            expectedDelivery: "27 - September - 2024" 
          });
         
          setShowSuccessModal(true);
          setrelaod(true)
       } catch (error) {
        console.log(error);
       }
    }

  //============================FETCHING COUPOUN ===========================
    
  async function fetchCoupuns() {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const response = await axiosInstance.get("/admin/get-coupons");
      console.log(response, "Data reciving");

      setcoupon(response.data.coupouns)
      // setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  //=======================COPY COUPOUN===============
  function copyCoupoun(code) {
    navigator.clipboard.writeText(code)
    toast("Coupoun copied")
  }

  //=====================FUNCTION TO SUBMIT COUPOUN TO BACKEND==================
  async function submitCoupoun(){
    if(coupons.length==0){
      return toast.error("coupons not available")
     }
    if(!selectedCoupun){
     return toast.error("Select a coupoun")
    }
    console.log(selectedCoupun)
    
    const response = await axiosInstance.post("/user/apply-coupoun",{selectedCoupun,user})
    console.log(response);
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
            {['Debit Card / Credit Card', 'Bank', 'UPI Method', 'Cash on delivery', 'Wallet'].map((method) => (
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
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>
          <div className="mt-4">
            <input onChange={(e)=>setselectedCoupun(e.target.value)} type="text" placeholder="Coupon Code" className="border p-2 w-full mb-2" />
            <button onClick={()=>submitCoupoun()} className="bg-black text-white px-4 py-2 w-full">Apply Coupon</button>
          </div>

            {/* Coupon Display Area */}
                <div className="border p-4 rounded-lg mt-4">
                  {coupons.length === 0 && (
                    <h3 className="text-lg font-semibold mb-4">Coupons Not Available</h3>
                  )}
                  {coupons.length > 0 && (
                    <h3 className="text-lg font-semibold mb-4">Available Coupons</h3>
                  )}
                  {coupons.map((coupon) => (
                    <div key={coupon?._id} className="flex justify-between items-center mb-2">
                      <div>
                        <p className="font-bold">{coupon?.code}</p>
                        <p className="text-sm text-gray-600">valid for orders above ₹{coupon?.minPurchaseAmount}</p>
                      </div>
                      <button 
                        className="bg-black text-white px-4 py-1"
                        onClick={() => copyCoupoun(coupon?.code) }
                      >
                        COPY
                      </button>
                      
                    </div>
                   ))} 
                </div>

          <button onClick={()=>submitCheckout()} className="bg-black text-white px-4 py-2 w-full mt-4">Place Order</button>
        </div>
      </div>
      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
};

export default CheckOut;