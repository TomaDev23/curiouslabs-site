import React from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'venus',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Venus({ size = 85, position = { x: 40, y: 70 }, ...props }) {
  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(255, 250, 200, 0.25)"
      glowSize={size * 0.3}
      {...props}
    >
      {/* Base planet with yellowish-white appearance */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,250,220,1) 0%, rgba(245,235,190,1) 50%, rgba(235,220,170,1) 100%)'
        }}
      ></div>
      
      {/* Dense swirling cloud patterns */}
      <div 
        className="absolute inset-0 rounded-full animated-layer"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%),
            radial-gradient(ellipse at 70% 40%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 30%),
            radial-gradient(circle at 25% 60%, rgba(235,225,190,0.3) 0%, rgba(235,225,190,0) 25%),
            radial-gradient(circle at 60% 70%, rgba(245,235,200,0.3) 0%, rgba(245,235,200,0) 30%),
            linear-gradient(30deg, transparent 0%, rgba(255,240,200,0.1) 25%, transparent 50%, rgba(255,240,200,0.1) 75%, transparent 100%)
          `,
          animation: 'venusCloud 120s infinite linear'
        }}
      ></div>
      
      {/* Cloud movement animation */}
      <style jsx>{`
        @keyframes venusCloud {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </CelestialBody>
  );
} 
