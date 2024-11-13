import axiosInstance from '@/config/axiosInstance';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams ,Link} from 'react-router-dom';
import { toast } from 'sonner';
import { CiHeart } from "react-icons/ci";


const product = {
  name: "One Life Graphic T-shirt",
  price: 299,
  rating: 4.5,
  description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  sizes: ["Small", "Medium", "Large", "X-Large"],
  images: [
    "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266344/vhusqafix4hbasxzub14.jpg",
    "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266346/mc5hv6lhpemjccgbd0u9.jpg",
    "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266346/mc5hv6lhpemjccgbd0u9.jpg",
    "https://res.cloudinary.com/dxmoiixw3/image/upload/v1729266346/mc5hv6lhpemjccgbd0u9.jpg"
  ],
  offers: [
    { price: 1189, discount: "Flat 10% Off your first purchase. Download the app and use Code: APP10" },
    { price: 1119, discount: "Flat 20% Off on minimum purchase of 4599/-. Code: FLAT20" },
    { price: 1189, discount: "Flat 15% Off on minimum purchase of 2999/-. Code: FLAT15" },
    { price: 1259, discount: "Flat 10% Off on minimum purchase of 1999/-. Code: FLAT10" }
  ]
};

const ProductDetail = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [outOfStck, setoutOfStck] = useState(false)
  const [mainImage, setMainImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [productData, setproductData] = useState([]);
  const[size,setsize]=useState('')
  const [displayWishlist, setdisplayWishlist] = useState(false);
  const[displayCart,setdisplayCart]=useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(0); 
  const userId =  useSelector(state=>state.user.users)
  console.log("userid", userId);
  console.log("product id",id);

  
// ============================FETCHING THE PRODUCT FOR THE DISPLAY========================
async function fetchProduct(){
  try {
    const response = await axiosInstance.get(`/user/getproduct/${id}`)
    console.log(response)
    const SingleproductData = response.data.data
    setproductData(SingleproductData)
    if (SingleproductData?.images?.length > 0) {
      setMainImage(SingleproductData.images[0]);
    }
  } catch (error) {
    console.log(error);
  }
}
  useEffect(() => {
    fetchProduct()
  }, [id]);
  console.log("sales price",productData.salePrice);
  
// ======================LOGIC TO DISPLAY THE SIZE OF THE PRODUCT ========================
   const data =productData.sizes?Object.keys( productData?.sizes).map((x)=>{
        return x
    }):[] 

// ===================================ADD TO CART==============================
    const price = productData.salePrice
    async function addtocart(){
      try {
        if(size){
          const response = await axiosInstance.post("user/cartadd",{
            productId:id,
            userId,
            selectedSize:size,
            price,
            quantity: 1}
          )
        console.log(response)
        setdisplayCart(true)
        toast.success("product added to cart")
        }
        else{
          toast.error("please select a size")
        }
      } catch (error) {
        console.log(error)
      }
    }
    console.log(size);

// ================TO CHECK WHETHER THE SIZE IS SELECTED OR NOT=============
   async function selectSize (size){
      setsize(size)
      setSelectedQuantity(productData.sizes[size])
      try {
        const response = await axiosInstance.post("/user/checksizeexist",{selectedSize:size,productId:id,userId})
        console.log(response)
        if(response.data.success){
          setdisplayCart(true)
        }else{
          setdisplayCart(false)
        }
      } catch (error){
        console.log(error);
      }
    }

//==================ADDING PROUDUCT TO WISHLIST=========================
   async function addToWishlist(){
    try {
      const response = await axiosInstance.post("/user/addtowishlist",{id,userId})
      console.log(response)
      toast(response.data.message)
      setdisplayWishlist(true)
    } catch (error) {
      console.log(error)
    }
    }
// ======================================================================================================================================================================================================
  return (
    <div>
      <div className="text-sm text-gray-500 flex justify-center mt-4">
              <Link to="/shop" className="hover:underline">Shop </Link>&gt; Product Display
      </div>
    <div className="flex flex-col md:flex-row p-4 max-w-screen-lg mx-auto">
      {/* Thumbnails Section */}
      <div className="flex md:flex-col md:w-1/12 md:pr-4 space-x-2 md:space-x-0 md:space-y-2 mb-4 md:mb-0 justify-center">
        {productData?.images?.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`Thumbnail ${index + 1}`} 
            className="w-20 h-20 lg:w-24 lg:h-24 object-cover cursor-pointer border border-gray-300 rounded-md hover:opacity-80 transition duration-200"
            onClick={() => setMainImage(img)} 
          />
        ))}
      </div>

      {/* Main Image Section */}
      <div className="md:w-5/12 px-2 flex-shrink-0 mb-4 md:mb-0">
        <img 
          src={mainImage} 
          alt={productData.productName} 
          className="w-full cursor-pointer rounded-md shadow-md lg:max-w-lg"  // Larger image for large screens
          onClick={() => setModalOpen(true)} 
        />
      </div>

      {/* Product Details Section */}
      <div className="md:w-1/2 pl-6 md:pl-12 lg:pl-16 lg:text-lg lg:leading-relaxed"> {/* Adjust padding and text size here */}
        <h1 className="text-2xl lg:text-3xl font-bold">{productData.productName}</h1>  {/* Larger heading */}
        
        {/* Rating */}
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={`text-lg lg:text-xl ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
          <span className="ml-1 text-sm lg:text-base">{product.rating}/5</span>
        </div>

        {/* Price */}
        <p className="text-xl lg:text-2xl font-bold mt-2">₹{productData.salePrice}</p>  {/* Larger price text */}
        
        {/* Description */}
        <p className="mt-2 text-sm lg:text-base">{productData.description}</p>  {/* Larger description text */}
        
        {/* Offers */}
        <div className="mt-3 space-y-9">
          {product.offers.map((offer, index) => (
            <div key={index} className="text-xs lg:text-sm">  {/* Larger offer text */}
              <p className="font-semibold">Get this for INR {offer.price}</p>
              <p>{offer.discount}</p>
            </div>
          ))}
        </div>

        {/* Sizes */}
        <div className="mt-4">
          <p className="font-bold text-sm lg:text-base">Choose Size:</p>
          <div className="flex mt-1">
              {data.map((sizeOption) => {
                const stockCount = productData.sizes[sizeOption];
                const isOutOfStock = stockCount === 0;
                  return (
                  <button 
                    key={sizeOption} 
                    onClick={() => selectSize(sizeOption)} 
                    disabled={isOutOfStock}
                    className={`mr-2 px-3 py-1 border rounded text-sm lg:text-base lg:px-4 lg:py-2 ${
                      size === sizeOption ? 'bg-black text-white' : 'bg-white text-black'
                    } ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}
                  >
                    {sizeOption} 
                    {isOutOfStock }
                  </button>
                );
              })}
        </div>
        </div>

            {/* Add to Wishlist Button */}
              {!userId?
              <button 
              onClick={()=>(navigate("/login"))}
              className="mt-4 w-full bg-gray-300 text-black py-2 rounded text-sm lg:text-base lg:py-3"
            >
              {displayWishlist ? "Go to Wishlist" : "Add to Wishlist"} 
            </button> 
              :
            <button 
            onClick={displayWishlist?()=>navigate("/wishlist"):()=>addToWishlist()}
            className="mt-4 w-full bg-gray-300 text-black py-2 rounded text-sm lg:text-base lg:py-3"
          >
            {displayWishlist ?`Go to Wishlist` : "Add to Wishlist"} 
          </button>
              }

        {/* Add to Cart Button */}

              {!userId?
                <button 
                onClick={() => navigate('/login')} 
                className="mt-4 w-full bg-black text-white py-2 rounded text-sm lg:text-base lg:py-3"
              >
                Add to Cart
                </button> 
                 :
                <button 
                    onClick={() => displayCart ? navigate('/addtocart') : addtocart(id)} 
                    className="mt-4 w-full bg-black text-white py-2 rounded text-sm lg:text-base lg:py-3"
                  >
                    {displayCart ? "Go to Cart" : "Add to Cart"}
              </button>

            }

        {/* <button 
            onClick={() => displayCart ? navigate('/addtocart') : addtocart(id)} 
            className="mt-4 w-full bg-black text-white py-2 rounded text-sm lg:text-base lg:py-3"
          >
            {displayCart ? "Go to Cart" : "Add to Cart"}
        </button> */}
      </div>

      {/* Modal for Image */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
          onClick={() => setModalOpen(false)}
        >
          <img src={mainImage} alt={product.name} className="max-w-full max-h-full" />
        </div>
      )}
    </div>
    </div>
  );
};

export default ProductDetail;