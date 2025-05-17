import React from 'react';
import { clamp } from '../useScrollProgress';
import CosmicRevealBackdrop from '../visual/backdrops/CosmicRevealBackdrop';

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
  
  return (
    <section className="h-screen w-screen relative overflow-hidden">
      {/* Black background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Three.js backdrop with red cube */}
      <CosmicRevealBackdrop progress={intensity} />
    </section>
  );
} 