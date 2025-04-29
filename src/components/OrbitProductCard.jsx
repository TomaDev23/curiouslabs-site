import React from 'react';
import { Link } from 'react-router-dom';

export default function OrbitProductCard({ title, description, icon, link, color = "blue" }) {
  // Color variants
  const colorVariants = {
    blue: "from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 border-blue-500/20",
    purple: "from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 border-purple-500/20",
    green: "from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 border-green-500/20",
    orange: "from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 border-orange-500/20",
  };
  
  const gradientClass = colorVariants[color] || colorVariants.blue;
  
  return (
    <div className="relative group transform transition-transform duration-500 hover:scale-105">
      {/* Subtle glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
      
      {/* Card content */}
      <div className="relative bg-[#1F1F35] p-4 sm:p-6 rounded-lg border border-white/10 h-full flex flex-col">
        <div className="mb-3 sm:mb-4 text-xl sm:text-2xl">{icon}</div>
        <h3 className="text-lg sm:text-xl font-medium text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm flex-grow">{description}</p>
        
        <Link to={link} className={`mt-3 sm:mt-4 self-start bg-gradient-to-r ${gradientClass} text-white text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md transition-all duration-300`}>
          Learn More
        </Link>
      </div>
    </div>
  );
} 