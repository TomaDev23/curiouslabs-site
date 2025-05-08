import React from 'react';
import { clamp } from '../useScrollProgress';
import SunFlarePulse from '../visual/SunFlarePulse';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'sun_landing_scene',
  scs: 'SCS6',
  type: 'scene',
  doc: 'contract_cosmic_scene.md',
  status: 'implemented'
};

export default function SunLandingScene({ progress = 0 }) {
  const intensity = clamp(progress, 0, 1);
  
  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-[#ffa500] via-[#ff8c00] to-[#ff4500]">
      {/* Enhanced sun core glow - more intense but original size */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-200 via-orange-500 to-transparent opacity-90"></div>
      
      {/* Sun flare pulse effect - centered with adjusted intensity */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SunFlarePulse 
          opacity={0.7} 
          fps={24}
        />
      </div>
      
      {/* Intense center glow - original size */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-white opacity-70 blur-3xl"></div>
      
      {/* Development indicator - remove in production */}
      <div className="absolute bottom-4 right-4 text-white text-sm opacity-50">
        Scene: Sun Landing
      </div>
    </section>
  );
} 