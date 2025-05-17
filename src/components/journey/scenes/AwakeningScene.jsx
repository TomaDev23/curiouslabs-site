import React from 'react';
import { clamp } from '../useScrollProgress';
import AwakeningBackdrop from '../visual/backdrops/AwakeningBackdrop';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'awakening_scene',
  scs: 'SCS2',
  type: 'scene',
  doc: 'contract_cosmic_scene.md'
};

export default function AwakeningScene({ progress = 0, particleConfig = {} }) {
  const intensity = clamp(progress, 0, 1);
  
  // Use particle config from controller or defaults
  const { 
    density = 95, 
    fps = 10, 
    hue = 260,
    glow = 0.8
  } = particleConfig;
  
  // Nebula fade opacity reduced by 50%
  const nebulaOpacity = Math.min(0.5, intensity * 0.75); // Halved from original 1.0/1.5
  
  return (
    <section className="absolute inset-0 w-full h-full overflow-hidden awakening-layer">
      {/* Scene backdrop */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50" />
        <AwakeningBackdrop progress={intensity} />
      </div>
      
      {/* Nebula aurora effect - reduced intensity */}
      <div 
        className="absolute inset-0 nebula-fade z-20" 
        style={{ 
          opacity: nebulaOpacity,
          transform: `scale(${1 + intensity * 0.1})`
        }}
      />
    </section>
  );
} 