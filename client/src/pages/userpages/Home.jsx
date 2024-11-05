
import Header from '@/shared/bars/Header'
import HeroSection from '@/shared/banner/HeroSection'
import Card1 from '@/shared/cards/Card1'
import Card2 from '@/shared/cards/Card2'
import Card3 from '@/shared/cards/Card3'
import Footer from '@/shared/footer/Footer'
import axiosInstance from '@/config/axiosInstance'
import React, { useEffect, useState } from 'react'


const Home = () => {
  const [productData, setproductData] = useState([]);
  const [categoryData, setcategoryData] = useState([]);
  console.log("home");
  
  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance.get("admin/getproducts")
      const data = response.data.data
      setproductData(data)
    }
    fetchData()
  }, []);
  useEffect(() => {
    async function fetchCategoryData(){
      const response = await axiosInstance.get("admin/getdifferentcategory")
      const data = response.data.data
      setcategoryData(data)
    }
    fetchCategoryData()
  }, []);

console.log("home",productData);    

  return (
    
    <div>
      <Header/>
      <HeroSection/>
      <Card1 productData={productData} name={"Related Category"}/>
      <Card2/>
      <Card3 productData ={productData}  />
      <Footer/>
    </div>
  )
}
export default Home
