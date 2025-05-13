import React from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'saturn',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Saturn({ size = 100, position = { x: 50, y: 60 }, ...props }) {
  // Calculate ring dimensions
  const ringWidth = size * 2;
  const ringHeight = size * 0.4;
  
  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(255, 240, 200, 0.2)"
      glowSize={size * 0.25}
      {...props}
    >
      {/* Base planet with pale yellow/beige color */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,235,210,1) 0%, rgba(220,200,160,1) 100%)'
        }}
      ></div>
      
      {/* Subtle banding */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: `
            linear-gradient(0deg, 
              rgba(200,180,140,0.3) 10%, 
              rgba(200,180,140,0) 20%,
              rgba(230,210,170,0.3) 30%,
              rgba(230,210,170,0) 40%,
              rgba(200,180,140,0.3) 50%,
              rgba(200,180,140,0) 60%,
              rgba(230,210,170,0.3) 70%,
              rgba(230,210,170,0) 80%
            )
          `
        }}
      ></div>
      
      {/* Rings - behind planet (bottom half) */}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: `${ringWidth}px`,
          height: `${ringHeight}px`,
          left: `${(size - ringWidth) / 2}px`,
          top: `${(size - ringHeight) / 2}px`,
          background: 'linear-gradient(180deg, rgba(200,180,140,0) 49%, rgba(200,180,140,0.6) 50%, rgba(230,210,170,0.8) 60%, rgba(245,235,210,0.6) 70%, rgba(255,245,220,0.4) 80%, rgba(255,245,220,0) 90%)',
          transform: 'rotate(-15deg)',
          zIndex: -1
        }}
      ></div>
      
      {/* Rings - in front of planet (top half) */}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: `${ringWidth}px`,
          height: `${ringHeight}px`,
          left: `${(size - ringWidth) / 2}px`,
          top: `${(size - ringHeight) / 2}px`,
          background: 'linear-gradient(0deg, rgba(200,180,140,0) 49%, rgba(200,180,140,0.6) 50%, rgba(230,210,170,0.8) 60%, rgba(245,235,210,0.6) 70%, rgba(255,245,220,0.4) 80%, rgba(255,245,220,0) 90%)',
          transform: 'rotate(-15deg)',
          zIndex: 1
        }}
      ></div>
      
      {/* Ring shadow on planet */}
      <div 
        className="absolute"
        style={{
          width: '100%',
          height: '10%',
          left: '0',
          top: '45%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0) 100%)',
          transform: 'rotate(-15deg)',
          zIndex: 0
        }}
      ></div>
    </CelestialBody>
  );
} 
