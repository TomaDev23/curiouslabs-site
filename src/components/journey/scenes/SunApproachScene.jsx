import React from 'react';
import { clamp } from '../useScrollProgress';
import StarfieldCanvas from '../visual/StarfieldCanvas';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'sun_approach_scene',
  scs: 'SCS5',
  type: 'scene',
  doc: 'contract_cosmic_scene.md'
};

export default function SunApproachScene({ progress = 0, particleConfig = {} }) {
  const intensity = clamp(progress, 0, 1);
  
  // Use particle config from controller or defaults
  const { 
    density = 150, // Increased density for more visible particles
    fps = 15,     // Increased FPS for smoother animation
    glow = 1.5    // Increased glow intensity
  } = particleConfig;
  
  return (
    <section className="h-screen w-screen relative overflow-hidden bg-gradient-to-b from-[#fffbe6] to-[#facc15]">
      {/* Warm subtle particles - Solar Flicker Dust */}
      <div className="absolute inset-0 z-10">
        <StarfieldCanvas
          opacity={0.7} // Increased opacity for better visibility
          density={density}
          fps={fps}
          baseColor="#ff9500" // Changed to more visible orange
          breathing={true}
          glow={glow}
        />
      </div>
      
      {/* Enhanced radial glow from center */}
      <div 
        className="absolute inset-0 z-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(255, 215, 120, 0.9) 0%, rgba(255, 180, 50, 0.6) 50%, transparent 80%)',
          opacity: 0.9 // Increased opacity
        }}
      />
      
      {/* Scene title indicator for development */}
      <div className="absolute bottom-4 right-4 text-white text-sm opacity-50 z-50">
        Scene: Sun Approach
      </div>
    </section>
  );
} 