/**
 * @component SimpleOrbitalRings
 * @description Exact reproduction of the v6 orbital rings with pill shapes
 */

import React from 'react';

const SimpleOrbitalRings = () => {
  return (
    <div className="absolute inset-0 overflow-hidden w-full h-full">
      {/* First orbit ring */}
      <div 
        className="absolute inset-0 rounded-full border-[0.3px] border-lime-500/60 transform scale-[0.6]"
        style={{ animation: 'orbit1 60s linear infinite' }}
      />
      
      {/* Second orbit ring */}
      <div 
        className="absolute inset-0 rounded-full border-[0.3px] border-blue-500/60 transform scale-[0.72] rotate-[30deg]"
        style={{ animation: 'orbit2 90s linear infinite' }}
      />
      
      {/* Third orbit ring */}
      <div 
        className="absolute inset-0 rounded-full border-[0.3px] border-purple-500/50 transform scale-[0.85] rotate-[60deg]"
        style={{ animation: 'orbit3 120s linear infinite' }}
      />

      {/* Add orbit keyframes */}
      <style jsx>{`
        @keyframes orbit1 {
          0% { transform: rotate(0deg) scale(0.6); }
          100% { transform: rotate(360deg) scale(0.6); }
        }
        
        @keyframes orbit2 {
          0% { transform: rotate(30deg) scale(0.72); }
          100% { transform: rotate(390deg) scale(0.72); }
        }
        
        @keyframes orbit3 {
          0% { transform: rotate(60deg) scale(0.85); }
          100% { transform: rotate(420deg) scale(0.85); }
        }
      `}</style>
    </div>
  );
};

export default SimpleOrbitalRings; 