import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axiosInstance from "@/config/axiosInstance"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function Wishlist() {

  const [wishlist, setwishlist] = useState(null)
  const [size, setsize] = useState({})
  const [reload, setreload] = useState(false);
  const [displayCart, setdisplayCart] = useState({});
  const navigate = useNavigate()
  
  
  
  const userId = useSelector((state)=>state.user.users)
  console.log(userId,"user=================");

  //=========================USEFFECT========================
  useEffect(()=>{
    fetchData()
  },[userId])

  //================DATA FETCHING FOR WISHLIST==============
  async function fetchData(){
    try {
      const response  = await axiosInstance.get(`/user/get-wishlist-data/${userId}`)
      console.log(response)
      setwishlist(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }
  console.log("This is the wishlist", wishlist)

  //==============HANDLING THE SIZE CHANGE================
  async function handlesizechange(productId,size){
    console.log("product id", productId);
    setsize((prev)=>({...prev,[productId]:size}))
    try {
      const response = await axiosInstance.post("/user/checksizeexist",{selectedSize:size,productId:productId,userId})
      console.log("==================",response)
      if(response.data.success===true){
        setdisplayCart((prev)=>({...prev,[productId]:response.data.success}))
      }else{
        setdisplayCart(false)
      }
    } catch (error){
      console.log(error);
    }
  }
   console.log(displayCart);
   
  //==============ADDING THE DATA TO CART==================
  async function addtoCart(productId,price){
    try {
      console.log("cart being pressed",size,productId,price)
      //logic to destrucutre the object
      const selectedSize =size[productId]
      if(!selectedSize){
        return toast("select a size")
      }
      const response = await axiosInstance.post("user/cartadd",{
        userId,
        productId,
        price,
        quantity:1,
        selectedSize
      })
      console.log(response)      
      toast(response.data.message) 
    } catch (error) {
      
    }
  }

  //====================DELETING THE PRODUCT IN THE WISHLIST================
    async function deleteItem(productId){
      const response = await axiosInstance.post("/user/delete-wishlist",{productId,userId})
      setwishlist(response.data.items)
    }

   
 

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-4xl font-bold mb-4 text-center">Favourites</h1>
      <p className="text-gray-600 mb-8 text-center">{wishlist && wishlist.length} Items</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-2 ">
        {wishlist && wishlist.map((item) => (
          <div key={item._id} className="flex flex-col transform transition-transform duration-200 hover:scale-105 ">
            <div className="relative aspect-[3/4] mb-4">
              <img
                src={item?.productId?.images[0]}
                alt={item.name}
                layout="fill"
                style={{ objectFit: "cover" }} 
                className="rounded-lg"
              />
              <button onClick={()=>deleteItem(item?.productId._id)} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
            <div className=" flex flex-col items-center">
              <h2 className="text-md font-semibold mb-2">{item?.productId?.productName}</h2>
              <p className="text-gray-600 mb-2">₹{item?.productId?.salePrice}</p>
            </div>
            <div className="relative w-full mb-4">
                <select onChange={(e)=>handlesizechange(item.productId._id,e.target.value)} className=" flex text-center appearance-none w-full bg-gray-100 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value="">Select Size</option>
                {Object.entries(item?.productId?.sizes).map(([size,stock])=>(
                  <option value={size} key={size}  disabled={stock==0} >
                      {size} {stock > 0 ?`( stocks available)`:"Out Of Stock"}
                  </option>
                ))}
                </select>
            
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.25 7.25l4.5 4.5 4.5-4.5" />
                </svg>
              </div>
            </div>
            {displayCart[item.productId._id]?
              <button onClick={()=>navigate("/addtocart")} className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800  transition duration-200">
              Go to cart
           </button>:
            <button onClick={()=>addtoCart(item?.productId._id,item?.productId?.salePrice)} className="w-full bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800  transition duration-200">
            Add to cart
            </button>
            }
          </div>
        ))}
      </div>
    </div>
  )
}
