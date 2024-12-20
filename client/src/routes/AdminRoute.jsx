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
import OrderListing from '@/pages/adminpages/orders/OrderListing'
import ViewUserOrder from '@/pages/adminpages/orders/ViewUserOrder'
import OfferModal from '@/shared/modal/OfferModal'
import CouponList from '@/pages/adminpages/coupons/CouponList'
import AddCoupoun from '@/pages/adminpages/coupons/AddCoupoun'
import SalesReport from '@/pages/adminpages/salesreport/SalesReport'
import ConfirmationModal from '@/shared/modal/ConfirmationModal'
import ChartDash from '@/pages/adminpages/dashboard/ChartDash'
const AdminRoute = () => {

  const handleDelete = () => {
    console.log("Item deleted");
  };
  return (
    <div>

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
            <Route path='/admin-orders' element={
                    <AdminHome>
              <OrderListing/>
              </AdminHome>
              }></Route>

            <Route path='/admin-view-order/:id' element={
                    <AdminHome>
              <ViewUserOrder/>
              </AdminHome>
              }></Route>

              <Route path='/coupons' element={
                    <AdminHome>
                      <CouponList/>
              </AdminHome>
              }></Route>

              <Route path='/add-coupon' element={
                    <AdminHome>
                      <AddCoupoun/>
              </AdminHome>
              }></Route>

              <Route path='/sales-report' element={
                    <AdminHome>
                      <SalesReport/>
              </AdminHome>
              }></Route>

              <Route path='/confirm' element={
                    <AdminHome>
                      <ConfirmationModal
                         message="Are you sure you want to delete this item?"
                         onConfirm={handleDelete}
                      />
              </AdminHome>
              }></Route>
              
              <Route path='/dashboard' element={
                    <AdminHome>
                      <ChartDash/>
              </AdminHome>
              }></Route>

          </Routes>
        <Toaster/>
    </div>
  )
}

export default AdminRoute
