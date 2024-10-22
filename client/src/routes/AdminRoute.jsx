import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import AdminLogin from '@/pages/adminpages/AdminLogin'
import CategoryEdit from '@/pages/adminpages/category/CategoryEdit'
import Category from '@/pages/adminpages/category/Category'
import ProductAdd from '@/pages/adminpages/product/ProductAdd'
import ProductList from '@/pages/adminpages/product/ProductList'
import UserManagement from '@/pages/adminpages/usermanagement/UserManagement'
import ProductEdit from '@/pages/adminpages/product/ProductEdit'
import { Toaster } from '@/components/ui/sonner'
import AdminHome from '@/protect/AdminHome'
import AdminReturnLogin from '@/protect/AdminReturnLogin'
const AdminRoute = () => {
  return (
    <div>
         <BrowserRouter>
          <Routes>
            <Route path='/admin' element={
              <AdminReturnLogin>
              <AdminLogin/>
              </AdminReturnLogin>
              }></Route>

            <Route path='/category' element={
              <AdminHome>
              <Category/>
              </AdminHome>
              }></Route>

            <Route path='/categoryedit/:id' element={
                <AdminHome>
              <CategoryEdit/>
              </AdminHome>
              }></Route>

            <Route path='/productadd' element={
                 <AdminHome>
              <ProductAdd/>
              </AdminHome>
              }></Route>

            <Route path='/productlist' element={
                 <AdminHome>
              <ProductList/>
              </AdminHome>
              }></Route>
            <Route path='/usermanagement' element={
                  <AdminHome>
              <UserManagement/>
              </AdminHome>
              }></Route>
            <Route path='/productedit/:id' element={
                    <AdminHome>
              <ProductEdit/>
              </AdminHome>
              }></Route>
          </Routes>
        </BrowserRouter>
        <Toaster/>
    </div>
  )
}

export default AdminRoute