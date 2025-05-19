/**
 * @component StarfieldBackground
 * @description Static starfield background with nebula overlay for CuriousLabs V6
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - StarfieldBackground passes LEGIT protocol
 */

import React from 'react';

// Shimmer animation keyframes
const shimmerAnimation = `
@keyframes shimmer {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}

@keyframes shimmer-delayed {
  0% { opacity: 0.3; }
  50% { opacity: 0.8; }
  100% { opacity: 0.3; }
}

.shimmer {
  animation: shimmer 4s ease-in-out infinite;
}

.shimmer-delayed {
  animation: shimmer-delayed 3s ease-in-out infinite;
}
`;

const StarfieldBackground = () => {
  return (
    <>
      <style jsx>{shimmerAnimation}</style>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Base star layer - smaller, more numerous */}
        <div className="absolute inset-0 shimmer-delayed" style={{ 
          backgroundImage: `
            radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.15) 1px, transparent 0),
            radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.15) 1px, transparent 0),
            radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.15) 1px, transparent 0),
            radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.15) 1px, transparent 0),
            radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.15) 1px, transparent 0),
            radial-gradient(1px 1px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.15) 1px, transparent 0)
          `,
          backgroundSize: '150px 150px, 140px 140px, 130px 130px, 120px 120px, 110px 110px, 100px 100px'
        }} />
        
        {/* Medium stars layer */}
        <div className="absolute inset-0 shimmer" style={{ 
          backgroundImage: `
            radial-gradient(1.5px 1.5px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.2) 1px, transparent 0),
            radial-gradient(1.5px 1.5px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.2) 1px, transparent 0),
            radial-gradient(1.5px 1.5px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.2) 1px, transparent 0)
          `,
          backgroundSize: '200px 200px, 180px 180px, 160px 160px'
        }} />
        
        {/* Large stars layer */}
        <div className="absolute inset-0 shimmer-delayed" style={{ 
          backgroundImage: `
            radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.3) 1px, transparent 0),
            radial-gradient(2px 2px at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(255, 255, 255, 0.3) 1px, transparent 0)
          `,
          backgroundSize: '250px 250px, 220px 220px'
        }} />
        
        {/* Nebula layers with random positions */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(76, 29, 149, 0.4) 0%, rgba(0, 0, 0, 0) 45%),
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(124, 58, 237, 0.3) 0%, rgba(0, 0, 0, 0) 40%),
            radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(139, 92, 246, 0.2) 0%, rgba(0, 0, 0, 0) 35%)
          `,
          backgroundSize: '100% 100%'
        }} />
      </div>
    </>
  );
};

export default StarfieldBackground; 