import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1A1A2E] to-[#121225] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CuriousLabs Cambodia. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/products" className="text-gray-400 hover:text-white text-sm transition">Products</Link>
            <Link to="/codelab" className="text-gray-400 hover:text-white text-sm transition">CodeLab</Link>
            <Link to="/about" className="text-gray-400 hover:text-white text-sm transition">About</Link>
            <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 