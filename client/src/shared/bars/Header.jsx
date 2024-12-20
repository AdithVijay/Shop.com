import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, User } from "lucide-react"
import shopco from "../../assets/shopco.png"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserMenuDropdown from './Dropdow'
import { useDispatch } from "react-redux"
import { logoutUser } from '@/redux/Userslice'
import DropdownMenu from './Dropdow'
import axiosInstance from '@/config/axiosInstance'
const Header = () => {

  const dispatch = useDispatch()  
  const [isSearchVisible, setSearchVisible] = useState(false)
  const navigate = useNavigate();
  const userData = useSelector((state)=>state.user.users)
  
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible)
  }
  function loginButton(){
    navigate("/login");
  }
  function logoutButton(){
    const response = axiosInstance.post("admin/logout")
    console.log(response);
    dispatch(logoutUser())
    navigate("/home")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={"/home"}>
          <div className="flex items-center">
                <div className="font-bold text-xl tracking-wide px-4 py-2">
            SHOP.CO
            </div>
          </div>
          </Link>
          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to={"/home"} className="text-sm font-medium text-muted-foreground hover:text-primary">Home</Link>
            <Link to={"/shop"} className="text-sm font-medium text-muted-foreground hover:text-primary">Shop</Link>
            {/* <Link to={"/our-story"} className="text-sm font-medium text-muted-foreground hover:text-primary">Our Story</Link>
            <Link to={"/contact-us"} className="text-sm font-medium text-muted-foreground hover:text-primary">Contact Us</Link> */}
          </nav>


          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            {/* <button onClick={toggleSearch} className="text-muted-foreground hover:text-primary">
              <Search className="h-5 w-5" />
            </button> */}

            {/* Search Input */}
            {/* {isSearchVisible && (
              <div className="relative hidden md:block">
                <Input
                  className="w-full max-w-xs"
                  type="text"
                  placeholder="Search..."
                />
              </div>
            )} */}

            {/* User Icon */}
            <div className="text-muted-foreground hover:text-primary">
            <DropdownMenu/>
            </div>

            {/* Login Button - Hidden on mobile */}
           
            {!userData? <button 
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:bg-gray-800 hover:shadow-lg hover:scale-105"
              onClick={loginButton}
            >
               Login
            </button>:<button 
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:bg-gray-800 hover:shadow-lg hover:scale-105"
              onClick={logoutButton}
            >
               LogOut
            </button>
          }
                       

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4">
                  <a to={"/"} className="text-sm font-medium hover:text-primary">Home</a>
                  <Link to={"/shop"} className="text-sm font-medium hover:text-primary">Shop</Link>
                  <a href="/our-story" className="text-sm font-medium hover:text-primary">Our Story</a>
                  <Link href="/contact-us" className="text-sm font-medium hover:text-primary">Contact Us</Link>
                  <button 
                    className="w-full bg-black text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out shadow-md hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                  onClick={loginButton}
                >
                  Login
                </button>
                  
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header