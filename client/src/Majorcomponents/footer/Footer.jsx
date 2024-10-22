import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <>
     <hr className="border-t border-gray-300 my-4   " />
    <footer className="bg-white text-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">OFFLINE STORE</h3>
            <a href="#" className="block mb-2 hover:underline">Find Stores Near Me</a>
          </div>
          <div>
            <h3 className="font-bold mb-4">GET TO KNOW US</h3>
            <ul>
              <li><a href="#" className="block mb-2 hover:underline">Contact Us</a></li>
              <li><a href="#" className="block mb-2 hover:underline">FAQ's</a></li>
              <li><a href="#" className="block mb-2 hover:underline">Blogs</a></li>
              <li><a href="#" className="block mb-2 hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">TRACK OR RETURN/EXCHANGE ORDER</h3>
            <ul>
              <li><a href="#" className="block mb-2 hover:underline">TRACK ORDER</a></li>
              <li><a href="#" className="block mb-2 hover:underline">PLACE RETURN/EXCHANGE REQUEST</a></li>
              <li><a href="#" className="block mb-2 hover:underline">RETURNS/EXCHANGE POLICY</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">CUSTOMER CARE</h3>
            <p className="mb-2">Timings: 10 AM - 7 PM (Mon - Sat)</p>
            <p className="mb-2">Whatsapp: +91 6364438801</p>
            <p className="mb-2">Instagram: @shop.co</p>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="font-bold mb-4">SIGN UP AND SAVE</h3>
          <p className="mb-4">Sign up now and be the first to know about exclusive offers, latest fashion trends & style tips!</p>
          <form className="flex mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800"><Instagram size={24} /></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><Facebook size={24} /></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><Youtube size={24} /></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><Twitter size={24} /></a>
            <a href="#" className="text-gray-600 hover:text-gray-800"><Linkedin size={24} /></a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2024 Shop.co</p>
          <p>Made in India, for the World 🌍</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;