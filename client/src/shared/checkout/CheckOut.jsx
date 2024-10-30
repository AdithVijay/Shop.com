import React, { useEffect, useState } from 'react';
import { CreditCard, Truck, Wallet } from 'lucide-react';
import dp1 from '../../assets/dp1.jpg'
import axiosInstance from '@/config/axiosInstance';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CheckOut = () => {
  const [addresses] = useState([
    { id: 1, name: 'Home House', place: 'Place Kerala', pincode: '689201', contact: '+91 98765 86265' },
    { id: 2, name: 'Work House', place: 'Place Kerala', pincode: '689201', contact: '+91 98765 86265' },
  ]);

  const [products] = useState([
    { id: 1, name: 'Nothing Phone 2a', price: 345, image: '/placeholder.svg' },
    { id: 2, name: 'Nothing Phone 2a', price: 345, image: '/placeholder.svg' },
    { id: 3, name: 'Nothing Phone 2a', price: 345, image: '/placeholder.svg' },
  ])
  const user = useSelector((state) => state.user.users)//userId 
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [adress, setadress] = useState([]);
//   const [subtotal, setSubtotal] = useState(0);
const [cartdata,setcartdata]=useState([])
  const subtotal = products.reduce((sum, product) => sum + product.price, 0);
  const shipping = 'Free';
  const total = subtotal;

// ========================USEEFECT==========================
    useEffect(() => {
        fetchAdress()
        fetchProduct() 
    },[]);

    async function fetchAdress(){
        try {
            const response = await axiosInstance.get(`/user/fetchuseraddress/${user}`)
            console.log(response);
            setadress(response.data)   
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProduct() {
        try {
          const response = await axiosInstance.get(`/user/cartdata/${user}`);
          console.log("resposnsss",response)
          console.log("response from the server", response.data.items);
          setcartdata(response.data.items)
          const calculatedSubtotal = response.data.items.reduce(
            (acc, item) => acc + item.totalItemPrice,
            0
          );
        //   setSubtotal(calculatedSubtotal)
        } catch (error) {
          console.log(error)
        }
      }
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            {adress.map((address) => (
              <div key={address.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={`address-${address.id}`}
                  name="address"
                  checked={selectedAddress === address.id}
                  onChange={() => setSelectedAddress(address.id)}
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
            <div key={product.id} className="flex items-center mb-4">
              <img src={product.productId.images[0]} alt={product.name} className="w-16 h-18 object-cover mr-4" />
              <div>
                <h3 className="font-semibold">{product.productId.productName}</h3>
                <p>₹{product.price}</p>
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
            <input type="text" placeholder="Coupon Code" className="border p-2 w-full mb-2" />
            <button className="bg-black text-white px-4 py-2 w-full">Apply Coupon</button>
          </div>
          <button className="bg-black text-white px-4 py-2 w-full mt-4">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;