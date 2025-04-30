import React from 'react';
import { Link } from 'react-router-dom';

const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link to="/products" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-3 px-6 rounded-md transition-all duration-300">
        Explore Our Products
      </Link>
      <Link to="/codelab" className="bg-transparent border border-purple-500 text-white hover:bg-purple-500/10 font-medium py-3 px-6 rounded-md transition-all duration-300">
        Visit CodeLab
      </Link>
    </div>
  );
};

export default HeroButtons; 