import React from 'react'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import UserProfile from '../pages/userprofile/profile/UserProfile'
import UserAddress from '../pages/userprofile/adress/UserAddress'
import EditAddress from '../pages/userprofile/adress/EditAddress'
import Orders from '../pages/userprofile/order/Orders'
const UserProfileRoute = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/profile' element={<UserProfile/>}></Route>
            <Route path='/address' element={<UserAddress/>}></Route>
            <Route path='/edit' element={<EditAddress/>}></Route>
            <Route path='/orders' element={<Orders/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default UserProfileRoute
