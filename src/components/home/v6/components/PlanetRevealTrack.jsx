/**
 * @metadata
 * @component PlanetRevealTrack
 * @description Handles planet growth and orbit animations based on scene phase
 * @version 1.0.0
 * @legit true
 */

import React, { useEffect, useRef } from 'react';
import AegisPlanetV6 from '../AegisPlanetV6';

const PlanetRevealTrack = ({ className = '', scenePhase }) => {
  const planetRef = useRef(null);
  const orbitRef = useRef(null);
  
  // Force complete state for testing
  const forcedPhase = 'complete';

  return (
    <div className={`relative ${className}`}>
      {/* Planet */}
      <div
        ref={planetRef}
        className="transform-gpu"
      >
        <AegisPlanetV6 
          className="w-[45vmin] h-[45vmin]"
          size={400}
        />
      </div>
      
      {/* Orbit rings - static positioning */}
      <div 
        ref={orbitRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          top: '0',
          left: '0'
        }}
      >
        {/* First orbit ring */}
        <div className="absolute inset-0 rounded-full border-2 border-lime-500/20 transform scale-[1.4]" />
        
        {/* Second orbit ring */}
        <div className="absolute inset-0 rounded-full border border-blue-500/15 transform scale-[1.6] rotate-[30deg]" />
        
        {/* Third orbit ring */}
        <div className="absolute inset-0 rounded-full border border-purple-500/10 transform scale-[1.8] rotate-[60deg]" />
      </div>
    </div>
  );
};

export default PlanetRevealTrack; 