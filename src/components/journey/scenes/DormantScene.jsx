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

export default function DormantScene({ progress = 0 }) {
  const intensity = clamp(progress, 0, 1);
  
  return (
    <section className="h-screen relative overflow-hidden">
      {/* Deep space backdrop with stars and parallax */}
      <DormantBackdrop progress={intensity} />
      
      {/* Robot character - static in dormant state */}
      <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-8xl">
        🤖
      </div>
      
      {/* Scene title for development */}
      <div className="absolute bottom-10 right-10 text-white text-2xl font-bold opacity-70">
        Scene: Dormant
      </div>
    </section>
  );
} 