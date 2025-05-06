import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Enhanced 404 Page
 * - Provides helpful navigation links back to main pages
 * - Cosmic theme integration
 * - Helpful error messaging
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">      
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/stars-bg.png')] opacity-30 bg-repeat"></div>
      </div>
      
      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl"></div>
      
      <div className="relative z-10 max-w-xl w-full text-center">
        <h1 className="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          404
        </h1>
        
        <p className="text-2xl mb-8">
          Lost in the cosmic void? This page doesn't exist.
        </p>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for has been moved, deleted, or may be temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium transition-all hover:shadow-lg hover:shadow-purple-500/20"
          >
            Return Home
          </Link>
          
          <Link 
            to="/legacy" 
            className="px-6 py-3 bg-transparent border border-gray-700 hover:border-purple-500 rounded-xl text-white font-medium transition-all"
          >
            Visit Legacy Site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 