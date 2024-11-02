import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from "@/pages/userpages/UserLogin";
import UserSignup from "@/pages/userpages/UserSignup";
// import OtpSignup from "@/shared/OtpSignup";
import Home from "@/pages/userpages/Home";
import Landing from "@/pages/userpages/Landing";
import { Toaster } from "@/components/ui/sonner";
import ProtecHome from "@/protect/ProtectedHome";
import ProtectLanding from "@/protect/ProtectLanding";
import ShoppingPage from "@/pages/userpages/Shop";
import DisplayPoductMain from "@/pages/userpages/DisplayPoductMain";
import AddToCart from "@/pages/userpages/AddToCart";
import Wishlist from "@/shared/wishlist/Wishlist";
import CheckOutPage from "@/pages/userpages/CheckOutPage";
import ForgotPass from "@/pages/userpages/ForgotPass";
import ResetPassword from "@/pages/userpages/ResetPassword";
import Shop1 from "@/pages/userpages/Shop1";

const UserRoute = () => {
  return (
    <div>
      <Routes>

      {/* THIS IS THE LANDING PAGE */}
        <Route
          path="/"
          element={
            <ProtectLanding>
              <Landing /> 
            </ProtectLanding>
          }
        ></Route>

      {/* THIS IS THE HOME PAGE */}
        <Route
          path="/home"
          element={
            <ProtecHome>
              <Home />
            </ProtecHome>
          }
        ></Route>

        <Route path="/signup" element={<UserSignup />}></Route>
        {/* <Route path="/otp" element={<OtpSignup />}></Route> */}
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/password-forgot" element={<ForgotPass/>}></Route>
        <Route path="/password-reset/:id" element={<ResetPassword/>}></Route>

        {/* THIS IS THE SHOPIING PAGE */}
        {/* <Route path="/shop" element={<ShoppingPage />}></Route> */}
        <Route path="/shop" element={<Shop1/>}></Route>
        <Route path="/display/:id" element={<DisplayPoductMain />}></Route>
        <Route path="/addtocart" element={<AddToCart />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/checkout" element={<CheckOutPage/>}></Route>
        
      </Routes>

      <Toaster />
    </div>
  );
};

export default UserRoute;
