import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserLogin from '@/pages/userpages/UserLogin'
import UserSignup from '@/pages/userpages/UserSignup'
import OtpSignup from '@/Majorcomponents/OtpSignup'
import Home from '@/pages/userpages/Home'
import { Toaster } from '@/components/ui/sonner'

const UserRoute = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Home/>}></Route>
            <Route path='/signup' element={<UserSignup/>}></Route>
            <Route path='/otp' element={<OtpSignup/>}></Route>
            <Route path='/login' element={<UserLogin/>}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster/>
    </div>
  )
}

export default UserRoute
