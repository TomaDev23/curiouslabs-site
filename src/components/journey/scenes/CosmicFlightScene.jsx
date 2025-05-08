import React from 'react';
import { clamp } from '../useScrollProgress';
import CosmicFlightBackdrop from '../visual/backdrops/CosmicFlightBackdrop';
import StarfieldCanvas from '../visual/StarfieldCanvas';
import ParallaxSpeedDust from '../visual/ParallaxSpeedDust';
import GreenAuroraEffects from '../visual/GreenAuroraEffects';

// Internal metadata for LEGIT compliance
const metadata = {
  id: 'cosmic_flight_scene',
  scs: 'SCS4',
  type: 'scene',
  doc: 'contract_cosmic_scene.md'
};

export default function CosmicFlightScene({ progress = 0, particleConfig = {} }) {
  const intensity = clamp(progress, 0, 1);
  
  // Use particle config from controller or defaults
  const { 
    density = 40, 
    fps = 30, 
    hue = 0,
    glow = 0.8,
    speed = 3
  } = particleConfig;
  
  // White stars with enhanced glow
  const starColorHue = "hsl(0, 0%, 100%)";

  return (
    <section className="h-screen w-screen relative overflow-hidden cosmic-flight-layer">
      {/* Scene backdrop with cosmic warp and mint trails */}
      <div className="absolute inset-0 z-0">
        <CosmicFlightBackdrop progress={intensity} />
      </div>

      {/* Dynamic star field - these move with the warp effect */}
      <div className="absolute inset-0 z-10">
        <StarfieldCanvas
          opacity={0.7}
          density={density}
          fps={fps}
          baseColor={starColorHue}
          breathing={false} // No breathing in flight mode - stars streak by
          glow={glow}
        />
      </div>
      
      {/* Green aurora effects - confirmed working component */}
      <GreenAuroraEffects />
      
      {/* Parallax Speed Dust - adds streaking particles with parallax effect */}
      <div className="absolute inset-0 z-20 w-full h-full">
        <ParallaxSpeedDust
          opacity={intensity * 0.8}
          speed={speed || 3}
          density={density}
          fps={fps}
        />
      </div>
      
      {/* Scene title indicator for development */}
      <div className="absolute bottom-10 right-10 text-white text-2xl font-bold opacity-70 z-50">
        Scene: Cosmic Flight
      </div>
    </section>
  );
} 