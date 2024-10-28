import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut } from 'lucide-react';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Logout handler function
  const handleLogout = () => {
    // Clear any stored authentication tokens
    localStorage.removeItem('token');
    // Clear any other user-related data
    localStorage.removeItem('userData');
    // Navigate to login page
    navigate('/login');
  };

  const profile=()=>{
    <Link to="/profile"></Link>
  }

  const menuItems = [
    { 
      icon: <ShoppingCart size={18} />, 
      label: 'Cart',
      path: '/cart',
      action: () => navigate('/addtocart')
    },
    { 
      icon: <Heart size={18} />, 
      label: 'Wishlist',
      path: '/wishlist',
      action: () => navigate('/wishlist')
    },
    { 
      icon: <User size={18} />, 
      label: 'Profile',
      path: '/profile',
      action: () => navigate('/profile')
    },
    { 
      icon: <LogOut size={18} />, 
      label: 'Logout',
      action: handleLogout
    }
  ];

  const handleMenuClick = (item) => {
    item.action();
    setIsOpen(false); // Close dropdown after action
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User size={24} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          role="menu"
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item)}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
                role="menuitem"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;