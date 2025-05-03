import React from 'react';
import { motion } from 'framer-motion';

/**
 * ServiceCardShell - Enhanced card component with hover effects and visual polish
 * Used for services, features, and other card-based content
 */
const ServiceCardShell = ({
  title,
  description,
  icon,
  onClick,
  href,
  tag,
  className = "",
  children,
}) => {
  // Determine if the card should be a link, button, or just a div
  const isClickable = onClick || href;
  
  // Wrapper component based on props
  const CardWrapper = ({ children }) => {
    if (href) {
      return (
        <a href={href} className="block w-full h-full">
          {children}
        </a>
      );
    } else if (onClick) {
      return (
        <button 
          onClick={onClick} 
          className="block w-full h-full text-left"
        >
          {children}
        </button>
      );
    } else {
      return <>{children}</>;
    }
  };

  return (
    <motion.div
      className={`relative group rounded-2xl bg-gray-800/70 backdrop-blur-sm p-6 shadow-md hover:shadow-xl shadow-purple-500/10 hover:shadow-purple-500/30 transition-all ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/50 to-blue-500/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Optional tag/badge */}
      {tag && (
        <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
          {tag}
        </div>
      )}
      
      {/* Card content wrapper */}
      <CardWrapper>
        <div className="relative z-10"> {/* Ensure content is above the gradient border */}
          {icon && (
            <div className="text-purple-400 mb-4 text-2xl">
              {icon}
            </div>
          )}
          
          {title && (
            <h3 className="text-xl font-bold mb-2 text-white">
              {title}
            </h3>
          )}
          
          {description && (
            <p className="text-gray-300">
              {description}
            </p>
          )}
          
          {children}
        </div>
      </CardWrapper>
    </motion.div>
  );
};

export default ServiceCardShell; 