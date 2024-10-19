import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserLogin from '@/pages/userpages/UserLogin'
import UserSignup from '@/pages/userpages/UserSignup'
import OtpSignup from '@/Majorcomponents/OtpSignup'
import Home from '@/pages/userpages/Home'
import Landing from '@/pages/userpages/Landing'
import { Toaster } from '@/components/ui/sonner'
import ProtecHome from '@/protect/ProtectedHome'
import ProtectLanding from '@/protect/ProtectLanding'
import ShoppingPage from '@/pages/userpages/Shop'
const UserRoute = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={
            <ProtectLanding>
            <Landing/>
            </ProtectLanding>
            }></Route>

            <Route path='/home' element={
              <ProtecHome>
                <Home/>
              </ProtecHome>
              }></Route>

            <Route path='/signup' element={<UserSignup/>}></Route>
            <Route path='/otp' element={<OtpSignup/>}></Route>
            <Route path='/login' element={<UserLogin/>}></Route>
            <Route path='/shop' element={<ShoppingPage/>}></Route>
          </Routes>
        </BrowserRouter>
        <Toaster/>
    </div>
  )
}

export default UserRoute
