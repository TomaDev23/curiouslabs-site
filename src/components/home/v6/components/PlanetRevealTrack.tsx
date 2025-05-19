/**
 * @component PlanetRevealTrack
 * @description Handles planet growth and orbit animations based on scene phase
 */

import React, { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { useScene } from '../SceneControllerV6';
import AegisPlanetV6 from '../AegisPlanetV6';

// Use explicit phase strings since we can't import the constants
const PHASE_VOID = 'void';
const PHASE_EMERGENCE = 'emergence';
const PHASE_ACTIVATION = 'activation';

// Add this to the stylesheet if not already present
// @keyframes orbit-slow {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

export const PlanetRevealTrack: React.FC = () => {
  const { scenePhase } = useScene();
  const planetRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (scenePhase === PHASE_EMERGENCE && !hasAnimated.current && planetRef.current) {
      hasAnimated.current = true;
      
      // Start planet growth animation
      const planet = planetRef.current;
      planet.style.transition = 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
      planet.style.transform = 'scale(1)';
      planet.style.opacity = '1';
      planet.style.filter = 'brightness(1)';
      
      // Animate orbit rings after planet grows
      if (orbitRef.current) {
        setTimeout(() => {
          const orbit = orbitRef.current;
          if (orbit) {
            orbit.style.transition = 'opacity 0.8s ease-out';
            orbit.style.opacity = '1';
            
            // Add orbit animation
            const rings = orbit.querySelectorAll('.orbit-ring');
            rings.forEach((ring, i) => {
              const ringEl = ring as HTMLDivElement;
              ringEl.style.animation = `orbit-slow ${25 + i * 5}s linear infinite`;
            });
          }
        }, 1500);
      }
    }
    
    // Handle scroll back to reset animations
    if (scenePhase === PHASE_VOID && hasAnimated.current && planetRef.current) {
      hasAnimated.current = false;
      
      const planet = planetRef.current;
      planet.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      planet.style.transform = 'scale(0.3)';
      planet.style.opacity = '0.6';
      planet.style.filter = 'brightness(0.7)';
      
      // Hide orbit rings
      if (orbitRef.current) {
        const orbit = orbitRef.current;
        orbit.style.transition = 'opacity 0.5s ease-out';
        orbit.style.opacity = '0';
        
        // Stop orbit animation
        const rings = orbit.querySelectorAll('.orbit-ring');
        rings.forEach(ring => {
          const ringEl = ring as HTMLDivElement;
          ringEl.style.animation = 'none';
        });
      }
    }
  }, [scenePhase]);

  return (
    <div className="relative">
      {/* Planet */}
      <div
        ref={planetRef}
        className="transform-gpu"
        style={{
          transform: 'scale(0.3)',
          opacity: '0.6',
          filter: 'brightness(0.7)',
          willChange: 'transform, opacity, filter'
        }}
      >
        <AegisPlanetV6 
          className="w-[45vmin] h-[45vmin]"
          size={400}
        />
      </div>
      
      {/* Orbit rings */}
      <div 
        ref={orbitRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          willChange: 'opacity',
          transform: 'translateZ(0)'
        }}
      >
        {/* First orbit ring */}
        <div className="orbit-ring absolute inset-0 rounded-full border-2 border-lime-500/20 transform scale-[1.4]" />
        
        {/* Second orbit ring */}
        <div className="orbit-ring absolute inset-0 rounded-full border border-blue-500/15 transform scale-[1.6] rotate-[30deg]" />
        
        {/* Third orbit ring */}
        <div className="orbit-ring absolute inset-0 rounded-full border border-purple-500/10 transform scale-[1.8] rotate-[60deg]" />
      </div>
      
      {/* Add orbit keyframes */}
      <style>
        {`
        @keyframes orbit-slow {
          0% { transform: rotate(0deg) scale(var(--scale, 1.4)); }
          100% { transform: rotate(360deg) scale(var(--scale, 1.4)); }
        }
        
        .orbit-ring:nth-child(1) {
          --scale: 1.4;
        }
        
        .orbit-ring:nth-child(2) {
          --scale: 1.6;
        }
        
        .orbit-ring:nth-child(3) {
          --scale: 1.8;
        }
        `}
      </style>
    </div>
  );
};

export default PlanetRevealTrack;