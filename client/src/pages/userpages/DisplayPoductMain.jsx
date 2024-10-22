import React, { useEffect, useState } from 'react'
import ProductDisplay from '../../Majorcomponents/productDisplay/ProductDisplay'
import Header from '../../Majorcomponents/bars/Header'
import Review from '@/Majorcomponents/productDisplay/Review'
import Footer from '@/Majorcomponents/footer/Footer'
import Card1 from '@/Majorcomponents/cards/Card1'
import Card2 from '@/Majorcomponents/cards/Card2'
import axios from 'axios'
import axiosInstance from '@/config/axiosInstance'

const DisplayPoductMain = () => {
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance.get("admin/getproducts")
      const data = response.data.data
      setproductData(data)
    }
    fetchData()
  }, []);

  return (
    <div>
        <Header/>
        <ProductDisplay/>
        <div className="flex justify-center">
        <hr className="border-t border-gray-300 my-4 w-2/4  " />
        </div>
        <Review/>
        <Card1 productData={productData} name={"Related Products"}/>
        <Footer/>
    </div>
  )
}

export default DisplayPoductMain
