import React, { useEffect, useState } from 'react'
import ProductDisplay from '../../Majorcomponents/productDisplay/ProductDisplay'
import Header from '../../Majorcomponents/bars/Header'
import Review from '@/Majorcomponents/productDisplay/Review'
import Footer from '@/Majorcomponents/footer/Footer'
import Card1 from '@/Majorcomponents/cards/Card1'
import axiosInstance from '@/config/axiosInstance'
import { Link, useParams } from 'react-router-dom'

const DisplayPoductMain = () => {
  const {id}= useParams()
  const [productData, setproductData] = useState([]);
  const [relatedProducts, setrelatedProducts] = useState([]);

  //=========================DATA FOR PRODUCT DISPLAY=======================

  useEffect(() => {
    async function fetchData(){
      const response = await axiosInstance.get("admin/getproducts")
      const data = response.data.data
      setproductData(data)
    }
    fetchData()
  }, [])
//=========================RELATED PRODUCTS FOR CARDS=======================
  useEffect(() => {
    console.log(id);
    
    async function fetchData(){
      try {
        const response = await axiosInstance.get(`user/relatedproducts/${id}`)
        const data = response.data.data
        setrelatedProducts(data)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [id])

  return (
    <div>
        <Header/>
        <ProductDisplay/>
        <div className="flex justify-center">
        <hr className="border-t border-gray-300 my-4 w-2/4  " />
        </div>
        <Review/>
        <Link to={"/display/:id"}>
        <Card1 productData={relatedProducts} name={"Related Products"}/>
        </Link>
        <Footer/>
    </div>
  )
}

export default DisplayPoductMain
