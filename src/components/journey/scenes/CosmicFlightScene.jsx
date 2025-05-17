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

export default function CosmicFlightScene({ progress = 0, scrollProgress, particleConfig = {} }) {
  const intensity = clamp(progress, 0, 1);
  
  // Default values with safe fallbacks
  const { 
    density = 40, 
    fps = 30, 
    speed = 3,
    hue = 0,
    glow = 0.8
  } = particleConfig;

  // White stars with enhanced glow
  const starColorHue = "hsl(0, 0%, 100%)";

  // Only render parallax when we're actually in the cosmic flight scene
  const shouldRenderParallax = scrollProgress >= 0.3 && scrollProgress <= 0.8;

  return (
    <section className="h-screen w-screen relative overflow-hidden cosmic-flight-layer">
      {/* Scene backdrop with cosmic warp and mint trails */}
      <div className="absolute inset-0 z-[2]">
        <CosmicFlightBackdrop progress={intensity} />
      </div>

      {/* Dynamic star field - these move with the warp effect */}
      <div className="absolute inset-0 z-10">
        <StarfieldCanvas
          opacity={0.7}
          density={density}
          fps={fps}
          baseColor={starColorHue}
          breathing={false}
          glow={glow}
        />
      </div>
      
      {/* Green aurora effects */}
      <GreenAuroraEffects />
      
      {/* Parallax Speed Dust - only render when in scene range */}
      {shouldRenderParallax && (
        <div className="absolute inset-0 z-20 w-full h-full">
          <ParallaxSpeedDust
            opacity={intensity * 0.8}
            speed={speed}
            density={density}
            fps={fps}
            scrollProgress={scrollProgress}
          />
        </div>
      )}
      
      {/* Scene title indicator for development */}
      <div className="absolute bottom-10 right-10 text-white text-2xl font-bold opacity-70 z-50">
        Scene: Cosmic Flight
      </div>
    </section>
  );
} 