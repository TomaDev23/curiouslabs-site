import React from 'react';

export const metadata = {
  id: 'base_starfield_backdrop',
  scs: 'SCS0',
  type: 'visual',
  doc: 'contract_base_starfield_backdrop.md',
};

export default function BaseStarfieldBackdrop() {
  return (
    <div className="absolute inset-0 w-full min-h-full z-0 pointer-events-none select-none">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <img
        src="/images/home_v6/stars-tiny.png"
        alt="starfield"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
    </div>
  );
} 