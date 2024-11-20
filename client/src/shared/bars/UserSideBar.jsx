import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, User, MapPin, Package, Wallet, Ticket, LogOut } from 'lucide-react';
import shopco from "../../assets/shopco.png";
import { useSelector } from 'react-redux';
import axiosInstance from '@/config/axiosInstance';

const UserSideBar = () => {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth >= 768); // Default expanded for medium/large screens
  const location = useLocation();
  const [name, setName] = useState("");
  const id = useSelector((state) => state.user.users);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await axiosInstance.get(`user/userdetails/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsExpanded(false); // Collapse for small screens
      } else {
        setIsExpanded(true); // Expand for medium/large screens
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'My Profile', icon: <User size={16} />, path: '/profile' },
    { name: 'Address', icon: <MapPin size={16} />, path: '/address' },
    { name: 'My Orders', icon: <Package size={16} />, path: '/orders' },
    { name: 'My Wallet', icon: <Wallet size={16} />, path: '/wallet' },
    { name: 'Coupons', icon: <Ticket size={16} />, path: '/user-coupons' },
    { name: 'Cart', icon: <Package size={16} />, path: '/addtocart' },
  ];

  return (
    <div
      className={`bg-white h-screen flex flex-col fixed left-0 top-0 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-16'
      } shadow-[0_4px_12px_rgba(0,0,139,0.4)]`}
    >
      <div className="p-2 border-b flex items-center justify-between flex-shrink-0">
        {isExpanded ? (
          <div className="flex items-center">
            <img src={shopco} alt="Company Logo" className="h-8 w-24" />
          </div>
        ) : (
          <div className="w-8 h-8"></div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <Menu size={18} />
        </button>
      </div>
      <Link to="/shop">
        <div className={`p-4 border-b flex items-center ${isExpanded ? 'justify-start' : 'justify-center'}`}>
          <div className="flex justify-center bg-slate-500 items-center w-10 h-10 rounded-full border-2 border-gray-300 object-cover">
            <div>{name.charAt(0)}</div>
          </div>
          {isExpanded && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{name}</p>
            </div>
          )}
        </div>
      </Link>
      <nav className="flex-grow overflow-y-auto">
        <ul className="py-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center px-5 py-4 text-gray-700 hover:bg-gray-200 transition-colors duration-200 ${
                  isExpanded ? 'justify-start' : 'justify-center'
                } ${location.pathname === item.path ? 'bg-gray-200' : ''}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isExpanded && <span className="ml-2 truncate">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-2 border-t mt-auto flex-shrink-0">
        <Link
          to="/logout"
          className={`flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors duration-200 ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut size={16} />
          {isExpanded && <span className="ml-2">Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default UserSideBar;
