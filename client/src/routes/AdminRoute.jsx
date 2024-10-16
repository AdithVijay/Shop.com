import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import AdminLogin from '@/pages/adminpages/AdminLogin'
import CategoryEdit from '@/pages/adminpages/category/CategoryEdit'
import Category from '@/pages/adminpages/category/Category'
import ProductAdd from '@/pages/adminpages/product/ProductAdd'
import ProductList from '@/pages/adminpages/product/ProductList'
import UserManagement from '@/pages/adminpages/usermanagement/UserManagement'
import ProductEdit from '@/pages/adminpages/product/ProductEdit'

const AdminRoute = () => {
  return (
    <div>
         <BrowserRouter>
          <Routes>
            <Route path='/admin' element={<AdminLogin/>}></Route>
            <Route path='/category' element={<Category/>}></Route>
            <Route path='/categoryedit/:id' element={<CategoryEdit/>}></Route>
            <Route path='/productadd' element={<ProductAdd/>}></Route>
            <Route path='/productlist' element={<ProductList/>}></Route>
            <Route path='/usermanagement' element={<UserManagement/>}></Route>
            <Route path='/productedit/:id' element={<ProductEdit/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AdminRoute
