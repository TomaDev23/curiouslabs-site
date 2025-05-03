import React from 'react';

/**
 * ServiceModalContent - Polished modal interior for CodeLab services
 * Provides consistent styling for modal interiors with headings, tags, and CTAs
 */
const ServiceModalContent = ({
  title,
  description,
  trustTag,
  ctaText = "Get Started",
  onCtaClick,
  children
}) => {
  return (
    <div className="pt-6 pb-6 px-6 flex flex-col gap-4">
      {/* Large white headline with subtle drop shadow */}
      <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
        {title}
      </h2>
      
      {/* Optional trust tags */}
      {trustTag && (
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-green-300 bg-green-900/40 px-2 py-0.5 rounded-md uppercase tracking-wide border border-green-800/40">
            {trustTag}
          </span>
        </div>
      )}
      
      {/* Description text */}
      {description && (
        <p className="text-gray-300 leading-relaxed">
          {description}
        </p>
      )}
      
      {/* Modal content */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* CTA Section */}
      <div className="flex flex-col items-center gap-3 mt-2">
        {/* CTA button with specified tailwind classes */}
        <button 
          onClick={onCtaClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default ServiceModalContent; 