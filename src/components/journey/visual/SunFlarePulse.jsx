import React, { useEffect, useRef } from 'react';

// LEGIT-compliant metadata
const metadata = {
  id: 'sun_flare_pulse',
  scs: 'SCS-FLARE-PULSE',
  type: 'visual',
  doc: 'contract_cosmic_visuals.md'
};

export default function SunFlarePulse({ opacity = 1, fps = 30 }) {
  const divRef = useRef(null);

  // Update opacity based on prop changes
  useEffect(() => {
    const div = divRef.current;
    if (div) {
      div.style.opacity = opacity;
    }
  }, [opacity]);

  return (
    <div
      ref={divRef}
      className="w-[300px] h-[300px] rounded-full bg-gradient-radial from-[#fde68a] to-transparent animate-sun-pulse z-30"
      style={{ 
        animationDuration: `${Math.max(6000, 6000)}ms`, // Fixed at 6s for gentle breathing
        opacity: opacity,
        boxShadow: '0 0 40px 20px rgba(255, 214, 0, 0.4)'
      }}
    />
  );
} 