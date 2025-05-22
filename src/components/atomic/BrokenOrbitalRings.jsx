/**
 * @component BrokenOrbitalRings
 * @description Recreation of the "broken" orbital rings effect from v6 with animation
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Metadata for LEGIT compliance
export const metadata = {
  id: 'broken_orbital_rings',
  scs: 'SCS-ORBIT-BROKEN',
  type: 'atomic',
  doc: 'broken_orbital_rings.md'
};

// A single broken ring with fragments
const BrokenRing = ({ scale, color, opacity, rotationSpeed, fragments = 6, offset = 0 }) => {
  // Generate fragment angles with some randomness
  const fragmentAngles = Array.from({ length: fragments }, (_, i) => {
    const baseAngle = (i * 360 / fragments) + offset;
    const randomOffset = Math.random() * 15 - 7.5; // Random offset between -7.5 and 7.5 degrees
    return baseAngle + randomOffset;
  });
  
  return (
    <div 
      className={`absolute inset-0 rounded-full`}
      style={{
        transform: `scale(${scale})`,
      }}
    >
      {/* Create ring fragments */}
      {fragmentAngles.map((angle, i) => {
        // Random arc length between 20 and 40 degrees
        const arcLength = 20 + Math.random() * 20;
        
        return (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `rotate(${angle}deg)`,
            }}
            animate={{
              rotate: [angle, angle + 360]
            }}
            transition={{
              duration: rotationSpeed,
              ease: "linear",
              repeat: Infinity
            }}
          >
            <div
              className="absolute top-0 w-[2px] h-1/2 origin-bottom"
              style={{
                left: 'calc(50% - 1px)',
                background: color,
                opacity: opacity,
                transformOrigin: 'bottom center',
                transform: `rotate(${-arcLength/2}deg)`,
                clipPath: `polygon(0 0, 100% 0, 100% ${Math.random() * 15 + 35}%, 0 ${Math.random() * 15 + 35}%)`
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

// Main component
const BrokenOrbitalRings = ({ className = '', planetSize = 300 }) => {
  const containerRef = useRef(null);
  
  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: planetSize, height: planetSize }}
    >
      {/* Base planet visualization - simple gradient sphere */}
      <div className="absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900 shadow-xl">
        {/* Atmospheric glow */}
        <div className="absolute inset-0 rounded-full bg-lime-500 opacity-20 blur-xl transform scale-110" />
      </div>
      
      {/* First broken orbital ring - largest, slowest */}
      <BrokenRing 
        scale={1.8} 
        color="rgba(132, 204, 22, 0.5)" 
        opacity={0.3} 
        rotationSpeed={60} 
        fragments={7}
        offset={0}
      />
      
      {/* Second broken orbital ring */}
      <BrokenRing 
        scale={1.6} 
        color="rgba(59, 130, 246, 0.5)" 
        opacity={0.25} 
        rotationSpeed={45} 
        fragments={5}
        offset={20}
      />
      
      {/* Third broken orbital ring - smallest, fastest */}
      <BrokenRing 
        scale={1.4} 
        color="rgba(216, 180, 254, 0.5)" 
        opacity={0.2} 
        rotationSpeed={30} 
        fragments={9}
        offset={45}
      />
      
      {/* Subtle dust particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 2 + 1;
          const angle = Math.random() * 360;
          const distance = (Math.random() * 0.6 + 1.2) * (planetSize / 2);
          const x = Math.cos(angle * Math.PI / 180) * distance + (planetSize / 2);
          const y = Math.sin(angle * Math.PI / 180) * distance + (planetSize / 2);
          const duration = Math.random() * 30 + 30;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: size,
                height: size,
                left: x,
                top: y,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                x: [0, Math.random() * 20 - 10],
                y: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BrokenOrbitalRings; 