import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserProfile from '../pages/userprofile/profile/UserProfile'
import UserAddress from '../pages/userprofile/adress/UserAddress'
import EditAddress from '../pages/userprofile/adress/EditAddress'
import Orders from '../pages/userprofile/order/Orders'
import ViewOrder from '@/pages/userprofile/order/ViewOrder'
import ProtecHome from '@/protect/ProtectedHome'
import ProtectOther from '@/protect/ProtectOther'
import Wallet from '@/pages/userprofile/wallet/Wallet'
const UserProfileRoute = () => {
  return (
    <div>

          <Routes>
            <Route path='/profile' element={
              <ProtectOther>
              <UserProfile/>
              </ProtectOther>
              }></Route>
            <Route path='/address' element={
              <ProtectOther>
              <UserAddress/>
              </ProtectOther>
              }></Route>
            <Route path='/edit/:id' element={
              <ProtectOther>
              <EditAddress/>
              </ProtectOther>
              }></Route>
            <Route path='/orders' element={
              <ProtecHome>
              <Orders/>
              </ProtecHome>
              }></Route>
            <Route path='/vieworders/:id' element={
               <ProtecHome>
              <ViewOrder/>
              </ProtecHome>
              }></Route>
              <Route path='/wallet' element={
               <ProtecHome>
                <Wallet/>
              </ProtecHome>
              }></Route>
          </Routes>

    </div>
  )
}

export default UserProfileRoute
