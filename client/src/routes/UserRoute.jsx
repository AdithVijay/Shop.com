import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserLogin from '@/pages/userpages/UserLogin'
import UserSignup from '@/pages/userpages/UserSignup'
import OtpSignup from '@/Majorcomponents/OtpSignup'


const UserRoute = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<UserSignup/>}></Route>
            <Route path='/otp' element={<OtpSignup/>}></Route>
            <Route path='/login' element={<UserLogin/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default UserRoute
