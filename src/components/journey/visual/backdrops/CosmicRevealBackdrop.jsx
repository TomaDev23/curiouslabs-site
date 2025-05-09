import React from 'react';

// Metadata for LEGIT compliance
const metadata = {
  id: 'cosmic_reveal_backdrop',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_backdrop.md'
};

export default function CosmicRevealBackdrop({ progress = 0 }) {
  // This is now a simple placeholder component that will use the global particle system
  return (
    <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-50 text-sm">
      Scene using global particle system
    </div>
  );
} 