import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserSignup from './pages/userpages/UserSignup'
import OtpSignup from './Majorcomponents/OtpSignup'
import UserLogin from './pages/userpages/UserLogin'
import AdminLogin from './pages/adminpages/AdminLogin'
import Category from './pages/adminpages/category/Category'

const App = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<UserSignup/>}></Route>
            <Route path='/otp' element={<OtpSignup/>}></Route>
            <Route path='/login' element={<UserLogin/>}></Route>
            <Route path='/admin' element={<AdminLogin/>}></Route>
            <Route path='/category' element={<Category/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
