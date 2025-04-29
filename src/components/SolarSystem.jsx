import React from 'react';
import AegisCenterCard from './AegisCenterCard';
import OrbitProductCard from './OrbitProductCard';

/**
 * SolarSystem Component
 * Displays products in an orbital layout around a central Aegis component.
 * 
 * @param {Object} props Component props
 * @param {Array} props.products Array of product objects with title, description, icon, link, color
 * @param {string} [props.className] Additional class names for the container
 */
export default function SolarSystem({ products, className = '' }) {
  if (!products || products.length !== 4) {
    console.warn('SolarSystem component requires exactly 4 products');
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Desktop View - Orbital Layout */}
      <div className="hidden lg:block relative">
        {/* Center Aegis card with absolute positioning for perfect centering */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md">
          <AegisCenterCard />
        </div>
        
        {/* Grid for orbit products */}
        <div className="grid grid-cols-3 gap-8">
          {/* Top row */}
          <div className="col-span-1 mb-40">
            <OrbitProductCard {...products[0]} />
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 mb-40">
            <OrbitProductCard {...products[1]} />
          </div>
          
          {/* Middle row - empty for Aegis (which is absolutely positioned) */}
          <div className="col-span-3" style={{ height: "280px" }}></div>
          
          {/* Bottom row */}
          <div className="col-span-1 mt-40">
            <OrbitProductCard {...products[2]} />
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1 mt-40">
            <OrbitProductCard {...products[3]} />
          </div>
        </div>
      </div>
      
      {/* Mobile View - Vertical Stack */}
      <div className="lg:hidden space-y-8">
        <div className="mx-auto max-w-sm px-4">
          <AegisCenterCard />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-6">
          {products.map((product, index) => (
            <div key={index} className="transform transition-transform duration-300 hover:scale-102">
              <OrbitProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-8 px-4">
          <p>View on larger screens to see our orbital layout!</p>
        </div>
      </div>
    </div>
  );
} 