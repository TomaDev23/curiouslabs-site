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
      {/* Deep space backdrop with parallax */}
      <div className="absolute inset-0 z-0">
        <DormantBackdrop progress={intensity} />
      </div>
      
      {/* Robot character - static in dormant state */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-8xl z-50">
        🤖
      </div>
      
      {/* Scene title for development */}
      <div className="absolute bottom-10 right-10 text-white text-2xl font-bold opacity-70 z-50">
        Scene: Dormant
      </div>
    </section>
  );
} 