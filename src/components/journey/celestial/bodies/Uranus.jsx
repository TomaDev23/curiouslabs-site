import React, { useEffect } from 'react';
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'uranus',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

// Add global keyframes
const injectStyles = () => {
  const styleId = 'uranus-keyframes';
  if (!document.getElementById(styleId)) {
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.innerHTML = `
      @keyframes uranusClouds {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100px); }
      }
    `;
    document.head.appendChild(styleTag);
  }
};

export default function Uranus({ size = 100, position = { x: 50, y: 40 }, ...props }) {
  // Inject keyframes on mount
  useEffect(() => {
    injectStyles();
    return () => {
      // Optional cleanup
      const styleTag = document.getElementById('uranus-keyframes');
      if (styleTag && document.head.contains(styleTag)) {
        document.head.removeChild(styleTag);
      }
    };
  }, []);

  // Calculate ring dimensions - larger than before
  const ringWidth = size * 2.2;
  const ringHeight = size * 0.12;

  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(80, 220, 230, 0.25)"
      glowSize={size * 0.3}
      {...props}
    >
      {/* Base planet with more teal/cyan gradient */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100,220,230,1) 0%, rgba(50,180,200,1) 50%, rgba(0,140,160,1) 100%)'
        }}
      ></div>
      
      {/* White flare in the middle */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 40% 45%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 15%)
          `,
          filter: 'blur(2px)'
        }}
      ></div>
      
      {/* Swirling clouds */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(150,240,255,0.4) 0%, rgba(150,240,255,0) 20%),
            radial-gradient(circle at 75% 30%, rgba(150,240,255,0.3) 0%, rgba(150,240,255,0) 15%),
            radial-gradient(circle at 35% 65%, rgba(150,240,255,0.4) 0%, rgba(150,240,255,0) 25%),
            radial-gradient(circle at 65% 70%, rgba(150,240,255,0.3) 0%, rgba(150,240,255,0) 15%)
          `,
          animation: 'uranusClouds 12s infinite linear'
        }}
      ></div>
      
      {/* Tilted axis effect with larger rings */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          transform: 'rotateX(-90deg) rotateY(25deg)',
          transformOrigin: 'center center'
        }}
      >
        {/* Rings system - larger and more visible */}
        <div 
          className="absolute rounded-full overflow-hidden"
          style={{
            width: `${ringWidth}px`,
            height: `${ringHeight}px`,
            left: `${(size - ringWidth) / 2}px`,
            top: `${(size - ringHeight) / 2}px`,
            background: 'linear-gradient(180deg, rgba(180,240,255,0.1) 0%, rgba(180,240,255,0.8) 40%, rgba(200,250,255,0.6) 60%, rgba(220,255,255,0.4) 80%, rgba(255,255,255,0.1) 100%)',
            boxShadow: '0 0 10px 2px rgba(180, 240, 255, 0.3)',
            transform: 'rotateZ(-15deg)',
            zIndex: -1
          }}
        ></div>
        <div 
          className="absolute rounded-full overflow-hidden"
          style={{
            width: `${ringWidth}px`,
            height: `${ringHeight}px`,
            left: `${(size - ringWidth) / 2}px`,
            top: `${(size - ringHeight) / 2}px`,
            background: 'linear-gradient(0deg, rgba(180,240,255,0.1) 0%, rgba(180,240,255,0.8) 40%, rgba(200,250,255,0.6) 60%, rgba(220,255,255,0.4) 80%, rgba(255,255,255,0.1) 100%)',
            boxShadow: '0 0 10px 2px rgba(180, 240, 255, 0.3)',
            transform: 'rotateZ(-15deg)',
            zIndex: 1
          }}
        ></div>
      </div>
      
      {/* Polar auroras */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 5%, rgba(100,220,230,0.2) 0%, rgba(100,220,230,0) 50%),
            radial-gradient(ellipse at 50% 95%, rgba(100,220,230,0.2) 0%, rgba(100,220,230,0) 50%)
          `,
          filter: 'blur(5px)'
        }}
      ></div>
    </CelestialBody>
  );
} 