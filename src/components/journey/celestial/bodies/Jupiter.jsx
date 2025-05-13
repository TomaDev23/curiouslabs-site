import React from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'jupiter',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Jupiter({ size = 120, position = { x: 70, y: 40 }, ...props }) {
  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(255, 200, 150, 0.2)"
      glowSize={size * 0.25}
      {...props}
    >
      {/* Base planet with cream color */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,240,220,1) 0%, rgba(230,210,180,1) 100%)'
        }}
      ></div>
      
      {/* Horizontal bands */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          background: `
            linear-gradient(0deg, 
              rgba(200,160,120,0.7) 0%, 
              rgba(200,160,120,0) 5%,
              rgba(230,180,120,0.6) 10%,
              rgba(230,180,120,0) 15%,
              rgba(200,150,100,0.5) 20%,
              rgba(200,150,100,0) 25%,
              rgba(230,190,140,0.6) 30%,
              rgba(230,190,140,0) 35%,
              rgba(180,130,90,0.7) 40%,
              rgba(180,130,90,0) 45%,
              rgba(210,170,130,0.6) 50%,
              rgba(210,170,130,0) 55%,
              rgba(190,140,100,0.7) 60%,
              rgba(190,140,100,0) 65%,
              rgba(220,180,140,0.6) 70%,
              rgba(220,180,140,0) 75%,
              rgba(200,160,120,0.5) 80%,
              rgba(200,160,120,0) 85%,
              rgba(230,190,150,0.6) 90%,
              rgba(230,190,150,0) 95%,
              rgba(200,160,120,0.7) 100%
            )
          `
        }}
      ></div>
      
      {/* Great Red Spot */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '30%',
          height: '20%',
          top: '40%',
          right: '25%',
          background: 'radial-gradient(ellipse at center, rgba(210,90,60,0.8) 0%, rgba(210,90,60,0) 70%)',
          transform: 'rotate(-10deg)'
        }}
      ></div>
      
      {/* Animated cloud movement */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden animated-layer"
        style={{
          backgroundImage: `
            linear-gradient(90deg, 
              rgba(255,255,255,0) 0%,
              rgba(255,255,255,0.05) 20%,
              rgba(255,255,255,0) 40%,
              rgba(255,255,255,0.03) 60%,
              rgba(255,255,255,0) 80%,
              rgba(255,255,255,0.04) 100%
            )
          `,
          animation: 'jupiter-clouds 60s linear infinite'
        }}
      ></div>
      
      {/* Add keyframes for cloud animation */}
      <style jsx>{`
        @keyframes jupiter-clouds {
          0% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </CelestialBody>
  );
} 
