import React from 'react';

export default function AegisCenterCard() {
  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
      
      {/* Card content */}
      <div className="relative bg-gradient-to-br from-[#2A2A45] to-[#1A1A30] p-8 rounded-lg border border-purple-500/20 h-full flex flex-col items-center text-center">
        {/* Sun/glow icon */}
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-md opacity-50"></div>
          <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 h-full w-full rounded-full flex items-center justify-center">
            <span className="text-3xl">🌞</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">AEGIS</h3>
        <p className="text-purple-200 mb-6">The Core Process Engine</p>
        <p className="text-gray-300 text-sm mb-6">
          The heart of CuriousLabs - powering all our products with 
          intelligent decision making and automation.
        </p>
        
        <a href="/products/aegis" className="mt-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-medium py-2 px-4 rounded-md transition-all duration-300">
          Explore Aegis
        </a>
      </div>
    </div>
  );
} 