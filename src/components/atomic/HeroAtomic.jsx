/**
 * @component HeroAtomic
 * @description Self-contained hero section with planet visual and static content - ANIMATION PURGED
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { useState, Suspense, lazy } from 'react';
// import HeroVisualPlanet from './HeroVisualPlanet';

// Lazy load HeroVisualPlanet to prevent Three.js from contaminating main bundle
const HeroVisualPlanet = lazy(() => import('./HeroVisualPlanet'));

import BackgroundLayerAtomic from './BackgroundLayerAtomic';
import HeroStageManager from './hero/HeroStageManager';

// Export metadata for LEGIT compliance
// export const metadata = {
//   id: 'hero_atomic',
//   scs: 'SCS-HERO-AEGIS',
//   type: 'atomic',
//   doc: 'contract_heroAtomic.md'
// };

const HeroAtomic = () => {
  const [sceneStep, setSceneStep] = useState(8);

  return (
    <>
      {/* HUD and Hero Stage Manager */}
      <HeroStageManager setSceneStep={setSceneStep} />
      
      {/* Debug HUD - shows current scene step */}
      <div className="fixed top-4 right-4 z-[100] bg-black/80 text-lime-400 px-3 py-2 rounded-md font-mono text-sm">
        Scene: {sceneStep}
      </div>
      
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background layer */}
        <BackgroundLayerAtomic />
        
        {/* Controlled Planet Bloom - Atmospheric glow behind planet - EFFECTS TIER */}
        <div
          className="absolute z-[15] w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{
            top: '60%',
            left: '75%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 70%)'
          }}
        />
        
        {/* Planet visual - positioned absolutely in top-right */}
        <Suspense fallback={
          <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-violet-800/30 animate-pulse" />
        }>
          <HeroVisualPlanet 
            sceneStep={sceneStep}
            className="w-[400px] h-[400px]"
            size={400}
          />
        </Suspense>
        
        {/* Text content - positioned in bottom-left - ELEVATED TO FOREGROUND TIER */}
        <div className="absolute bottom-[6%] left-[4%] max-w-[450px] z-[250]">
          {/* Static header */}
          <h1 
            className="text-3xl md:text-4xl font-bold mb-5 text-white leading-tight tracking-tight"
            role="heading"
            aria-level={1}
          >
            We bring you a universe of solutions
          </h1>
          
          {/* Static paragraph */}
          <p className="text-lg text-white/85 mb-6 max-w-md leading-relaxed tracking-wide">
            We're building next-generation digital experiences powered by cutting-edge AI technology. Join us in shaping tomorrow's web.
          </p>
          
          {/* Static call-to-action button */}
          <button
            className="px-5 py-2.5 bg-gradient-to-r from-lime-400 to-emerald-500 text-curious-dark-900 font-medium text-sm rounded-full hover:shadow-lg hover:shadow-lime-400/20 transition-shadow hover:scale-105 active:scale-98 tracking-wide"
          >
            Explore Our Universe
          </button>
        </div>
      </section>
    </>
  );
};

export default HeroAtomic; 