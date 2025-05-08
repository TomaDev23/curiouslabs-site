import React from 'react';
import { clamp } from '../useScrollProgress';
import CosmicRevealBackdrop from '../visual/backdrops/CosmicRevealBackdrop';
import StarfieldCanvas from '../visual/StarfieldCanvas';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'cosmic_reveal_scene',
  scs: 'SCS3',
  type: 'scene',
  doc: 'contract_cosmic_scene.md'
};

export default function CosmicRevealScene({ progress = 0, particleConfig = {} }) {
  const intensity = clamp(progress, 0, 1);
  
  // Use particle config from controller or defaults
  const { 
    density = 20, 
    fps = 10, 
    hue = 0,
    glow = 0.8
  } = particleConfig;
  
  // White stars with enhanced glow
  const starColorHue = "hsl(0, 0%, 100%)";
  
  return (
    <section className="h-screen w-screen relative overflow-hidden cosmic-reveal-layer">
      {/* Scene backdrop with aurora waves */}
      <div className="absolute inset-0 z-0">
        <CosmicRevealBackdrop progress={intensity} />
      </div>
      
      {/* Reduced star field */}
      <div className="absolute inset-0 z-10">
        <StarfieldCanvas
          opacity={0.7}
          density={density} // Fewer stars to make constellations more visible
          fps={fps}
          baseColor={starColorHue}
          breathing={true}
          glow={glow}
        />
      </div>
      
      {/* Scene title indicator for development */}
      <div className="absolute bottom-10 right-10 text-white text-2xl font-bold opacity-70 z-50">
        Scene: Cosmic Reveal
      </div>
    </section>
  );
} 