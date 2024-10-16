import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserSignup from './pages/userpages/UserSignup'
import OtpSignup from './Majorcomponents/OtpSignup'
import UserLogin from './pages/userpages/UserLogin'

import AdminLogin from './pages/adminpages/AdminLogin'
import Category from './pages/adminpages/category/Category'
import CategoryEdit from './pages/adminpages/category/CategoryEdit'
import ProductAdd from './pages/adminpages/product/ProductAdd'
import ProductList from './pages/adminpages/product/ProductList'
import UserManagement from './pages/adminpages/usermanagement/UserManagement'

import AdminRoute from './routes/AdminRoute'
import UserRoute from './routes/UserRoute'

const App = () => {
  return (
    <div>
        {/* <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<UserSignup/>}></Route>
            <Route path='/otp' element={<OtpSignup/>}></Route>
            <Route path='/login' element={<UserLogin/>}></Route>
          </Routes>
        </BrowserRouter> */}
              <UserRoute/>
              <AdminRoute/>
    </div>
  )
}

export default App
