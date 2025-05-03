import React from 'react';

/**
 * CosmicNoiseOverlay - Adds extremely subtle texture to backgrounds
 * Enhances visual depth without being noticeable on its own
 */
const CosmicNoiseOverlay = ({ opacity = 0.02, blendMode = "overlay", className = "" }) => (
  <div 
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{ 
      backgroundImage: "url('/images/noise-texture.svg')",
      backgroundSize: '200px 200px',
      opacity,
      mixBlendMode: blendMode
    }}
    aria-hidden="true"
  />
);

export default CosmicNoiseOverlay; 