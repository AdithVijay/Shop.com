
import Header from '@/shared/bars/Header'
import HeroSection from '@/shared/banner/HeroSection'
import Card1 from '@/shared/cards/Card1'
import Card2 from '@/shared/cards/Card2'
import Card3 from '@/shared/cards/Card3'

import axiosInstance from '@/config/axiosInstance'
import React, { useEffect, useState } from 'react'
import Footer from '@/shared/footer/Footer'

// =================THIS ITHE FIRST THIJNG THATS USER GONNA SEEE============

const Landing = () => {
  const [productData, setproductData] = useState([]);

  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance.get("admin/getproducts")
      console.log("card3", response)
      var productData = response.data.data
      setproductData(productData)
      console.log(productData);
    }
    fetchData()
  }, []);

  return (
    <div>
      <Header/>
      <HeroSection/>
      <Card1 name={"Categories"} productData ={productData} />
      {/* <Card2/> */}
      <Card3 productData ={productData}  />
      <Footer/>
    </div>
  )
}
export default Landing
