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
import NewFilter from "@/shared/bars/NewFilter";
import ProtectOther from "@/protect/ProtectOther";
import UserWishList from "@/pages/userpages/UserWishList";
import PaymentComponent from "@/shared/payment/PaymentComponent";


const UserRoute = () => {
  return (
    <div>
      <Routes>
        {/* THIS IS THE LANDING PAGE */}
        <Route path="/" element={<Landing />}></Route>

        {/* THIS IS THE HOME PAGE */}
        <Route
          path="/home"
          element={
              <Home />
          }
        ></Route>

        <Route
          path="/signup"
          element={
              <UserSignup />
          }
        ></Route>

        <Route
          path="/login"
          element={
              <UserLogin />
          }
        ></Route>

        <Route
          path="/password-forgot"
          element={
              <ForgotPass />
          }
        ></Route>

        <Route
          path="/password-reset/:id"
          element={
              <ResetPassword />
          }
        ></Route>

        {/* THIS IS THE SHOPIING PAGE */}
        <Route path="/shop" element={<Shop1 />}></Route>

        {/* THIS IS PRODUCT PAGE */}
        <Route path="/display/:id" element={<DisplayPoductMain />}></Route>

        {/* THIS IS ADD TO CART */}
        <Route
          path="/addtocart"
          element={
            <ProtectOther>
              <AddToCart />
            </ProtectOther>
          }
        ></Route>



        <Route
          path="/checkout"
          element={
            <ProtecHome>
              <CheckOutPage />
            </ProtecHome>
          }
        ></Route>

        <Route
          path="/wishlist"
          element={
            <ProtecHome>
                <UserWishList/>
            </ProtecHome>
          }
        ></Route>

        <Route
          path="/payment"
          element={
            <ProtecHome>
                <PaymentComponent/>
            </ProtecHome>
          }
        ></Route>

      </Routes>

      <Toaster />
    </div>
  );
};

export default UserRoute;
