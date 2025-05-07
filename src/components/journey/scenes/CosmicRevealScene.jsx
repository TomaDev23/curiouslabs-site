import React from 'react';
import { clamp } from '../useScrollProgress';
import CosmicRevealBackdrop from '../visual/backdrops/CosmicRevealBackdrop';

export default function CosmicRevealScene({ progress = 0 }) {
  const intensity = clamp(progress, 0, 1);
  
  // Debug log
  console.log("CosmicRevealScene rendering with progress:", progress);
  
  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#475569] via-[#64748b] to-[#94a3b8]">
      {/* Scene backdrop with aurora waves */}
      <CosmicRevealBackdrop progress={intensity} />
      
      {/* Scene content will be added incrementally */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <h1 className="text-4xl font-bold text-white">Scene: Cosmic Reveal</h1>
      </div>
    </section>
  );
} 