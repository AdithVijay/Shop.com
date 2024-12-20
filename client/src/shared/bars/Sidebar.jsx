import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, Package, List, Users, BarChart2, Tag, Folder, Image, Settings, LogOut } from 'lucide-react';
import shopco from "../../assets/shopco.png";
import { useDispatch } from 'react-redux';
import { logoutAdmin } from '@/redux/Adminslice';
import axiosInstance from '@/config/axiosInstance';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(() => {
    // Load the initial state from localStorage or default to true
    return localStorage.getItem("sidebarExpanded") === "true" || false;
  });

  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { name: 'Dashboard', icon: <Home size={16} />, path: '/dashboard' },
    { name: 'Products', icon: <Package size={16} />, path: '/productlist' },
    { name: 'Order Lists', icon: <List size={16} />, path: '/admin-orders' },
    { name: 'Users', icon: <Users size={16} />, path: '/usermanagement' },
    { name: 'Sales Report', icon: <BarChart2 size={16} />, path: '/sales-report' },
    { name: 'Coupons', icon: <Tag size={16} />, path: '/coupons' },
    { name: 'Category', icon: <Folder size={16} />, path: '/category' },
    // { name: 'Banner management', icon: <Image size={16} />, path: '/banners' },
    // { name: 'Settings', icon: <Settings size={16} />, path: '/settings' },
  ];

  const handleToggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    localStorage.setItem("sidebarExpanded", newExpandedState); // Save the state in localStorage
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("admin/logout");
      console.log(response);
      dispatch(logoutAdmin());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`bg-white h-screen flex flex-col fixed left-0 top-0 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-12'
      } shadow-[0_4px_12px_rgba(0,0,139,0.4)]`} // Custom dark blue shadow
    >
      <div className="p-2 border-b flex items-center justify-between flex-shrink-0">
        {isExpanded ? (
          <div className="flex items-center">
            <img src={shopco} alt="Company Logo" className="h-8 w-24" />
          </div>
        ) : (
          <div className="w-8 h-8"></div> // Placeholder to maintain layout
        )}
        <button
          onClick={handleToggleSidebar}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
        >
          <Menu size={18} />
        </button>
      </div>

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

      <button onClick={handleLogout} className="p-2 border-t mt-auto flex-shrink-0">
        <Link
          to="/admin"
          className={`flex items-center px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 transition-colors duration-200 ${
            isExpanded ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut size={16} />
          {isExpanded && <span className="ml-2">Logout</span>}
        </Link>
      </button>
    </div>
  );
};

export default Sidebar;
