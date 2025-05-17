import React from 'react';
import { clamp } from '../useScrollProgress';
import DormantBackdrop from '../visual/backdrops/DormantBackdrop';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'dormant_scene',
  scs: 'SCS1',
  type: 'scene',
  doc: 'contract_cosmic_scene.md'
};

export default function DormantScene({ progress = 0, particleConfig = {} }) {
  const intensity = clamp(progress, 0, 1);
  
  // Use particle config from controller or defaults
  const { 
    density = 115, 
    fps = 15,
    hue = 220,
    glow = 0.8
  } = particleConfig;
  
  return (
    <section className="h-screen w-screen relative overflow-hidden dormant-layer">
      {/* Base layer with reduced opacity */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50" />
        <DormantBackdrop progress={intensity} />
      </div>
    </section>
  );
} 