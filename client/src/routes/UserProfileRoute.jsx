import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserProfile from '../pages/userprofile/profile/UserProfile'
import UserAddress from '../pages/userprofile/adress/UserAddress'
import EditAddress from '../pages/userprofile/adress/EditAddress'
import Orders from '../pages/userprofile/order/Orders'
import ViewOrder from '@/pages/userprofile/order/ViewOrder'
const UserProfileRoute = () => {
  return (
    <div>

          <Routes>
            <Route path='/profile' element={<UserProfile/>}></Route>
            <Route path='/address' element={<UserAddress/>}></Route>
            <Route path='/edit/:id' element={<EditAddress/>}></Route>
            <Route path='/orders' element={<Orders/>}></Route>
            <Route path='/vieworders/:id' element={<ViewOrder/>}></Route>
          </Routes>

    </div>
  )
}

export default UserProfileRoute
