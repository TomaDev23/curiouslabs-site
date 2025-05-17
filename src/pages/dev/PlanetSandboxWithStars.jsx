import React, { useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Helmet } from 'react-helmet-async';
import PlanetSandboxPage from './planet-sandbox';
import StarField from '../../components/journey/celestial/environment/StarField';

/**
 * Enhanced PlanetSandboxPage that includes a StarField background
 * 
 * @id planet_sandbox_with_stars
 * @scs SCS-PAGE-WRAPPER
 * @type page
 * @doc Docs/contracts/Solar_System/contract_planet_sandbox.md
 */

// This component wraps the planet-sandbox functionality and adds stars
export default function PlanetSandboxWithStars() {
  const [showCosmicDust, setShowCosmicDust] = useState(true);
  
  // Function to toggle cosmic dust visibility
  const toggleCosmicDust = () => {
    console.log("Toggling cosmic dust from", showCosmicDust, "to", !showCosmicDust);
    setShowCosmicDust(prev => !prev);
  };
  
  return (
    <div className="min-h-screen relative bg-black">
      <Helmet>
        <title>Planet Sandbox with Stars | Cosmic Journey</title>
      </Helmet>
      
      <PlanetSandboxPage 
        backgroundComponent={
          <StarField 
            includeCosmicDust={showCosmicDust}
            starCount={600}
            nebulaParticleCount={3000}
            cosmicDustCount={2000}
            rotationSpeed={0.02}
            baseOpacity={0.5}
            starDensity={0.7}
            cosmicIntensity={0.3}
            baseSize={6.0}
            renderOrder={0}
          />
        }
      />
      
      {/* Controls panel */}
      <div className="fixed top-4 right-4 bg-black/70 text-white p-4 z-50 rounded-lg shadow-lg">
        <div className="text-lg font-bold">Planet Sandbox with StarField</div>
        <div className="text-sm mt-2">
          Enhanced version with cosmic background
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <button 
              onClick={toggleCosmicDust}
              className={`px-3 py-1 rounded text-sm ${showCosmicDust ? 'bg-blue-600' : 'bg-gray-700'}`}
            >
              {showCosmicDust ? 'Hide Cosmic Dust' : 'Show Cosmic Dust'}
            </button>
            <div className="text-xs mt-1 text-gray-300">
              Current status: {showCosmicDust ? 'Visible' : 'Hidden'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 