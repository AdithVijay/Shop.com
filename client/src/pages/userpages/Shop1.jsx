import axiosInstance from '@/config/axiosInstance';
import Header from '@/shared/bars/Header';
import Sidebar from '@/shared/bars/Sidebar';
import Card4 from '@/shared/cards/Card4'
import Footer from '@/shared/footer/Footer';
import React, { useEffect, useState } from 'react'


const Shop1 = () => {
  const [productData, setproductData] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance.get("admin/getproducts")
      const data = response && response?.data?.data
      setproductData(data)
    }
    fetchData()
  }, []);


  return (
    <div>
      <Header/>
        <Card4 />
      <Footer/>
    </div>
  )
}

export default Shop1
