import React from 'react';
import { clamp } from '../useScrollProgress';
import DormantBackdrop from '../visual/backdrops/DormantBackdrop';

export default function DormantScene({ progress = 0 }) {
  const intensity = clamp(progress, 0, 1);
  
  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b]">
      {/* Deep space backdrop with stars */}
      <DormantBackdrop />
      
      {/* Robot character - static in dormant state */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span className="text-[5rem]">🔬</span>
      </div>
      
      {/* Scene title */}
      <div className="absolute inset-x-0 bottom-20 flex justify-center">
        <h1 className="text-4xl font-bold text-white">Scene: Dormant</h1>
      </div>
    </section>
  );
} 