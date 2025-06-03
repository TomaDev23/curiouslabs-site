/**
 * @metadata
 * @component HeroSequenceV6
 * @description Main hero section with scroll-triggered animations following Z-pattern layout
 * @legit true
 * @version 1.1.0
 * @author CuriousLabs
 */

import React, { useEffect, useRef, useState } from 'react';
import { useScene } from './SceneControllerV6.jsx';
import PlanetRevealTrack from './components/PlanetRevealTrack.jsx';
import TextRevealBlock from './components/TextRevealBlock.jsx';

// Constants for scene phases
const PHASE_VOID = 'void';
const PHASE_EMERGENCE = 'emergence';
const PHASE_ACTIVATION = 'activation';
const PHASE_COMPLETE = 'complete';

const HeroSequenceV6 = () => {
  // FORCE COMPLETE STATE - this overrides any context
  // Remove this line when ready to re-enable animations
  const scenePhase = PHASE_COMPLETE;
  
  // Get setPhase from context but don't use the phase
  const { setPhase } = useScene();
  const [hasTriggered, setHasTriggered] = useState(false);

  // REMOVED SCROLL BLOCKING CODE - was causing scroll interference
  // const blockScroll = () => {
  //   document.body.style.overflow = 'hidden';
  // };

  // const allowScroll = () => {
  //   document.body.style.overflow = '';
  // };

  // REMOVED SCROLL LOCK - was preventing natural scrolling
  // useEffect(() => {
  //   blockScroll();
  //   // Allow scroll immediately since we're in forced complete state
  //   setTimeout(() => allowScroll(), 100);
  //   return () => allowScroll();
  // }, []);

  // ANIMATIONS DISABLED FOR TESTING
  // useEffect(() => {
  //   const handleScroll = (e) => {
  //     if (!hasTriggered) {
  //       e.preventDefault();
  //       setHasTriggered(true);
  //       setPhase(PHASE_EMERGENCE);
  //       // Simulate full sequence
  //       setTimeout(() => setPhase(PHASE_ACTIVATION), 1200);
  //       setTimeout(() => setPhase(PHASE_COMPLETE), 2600);
  //       setTimeout(() => allowScroll(), 3000);
  //     }
  //   };
  //   window.addEventListener('wheel', handleScroll, { passive: false });
  //   return () => window.removeEventListener('wheel', handleScroll);
  // }, [hasTriggered, setPhase]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Header positioned just above the milkyway image */}
      <div 
        className="absolute bottom-[12vh] left-8 z-10"
        style={{
          opacity: 0.9,
        }}
      >
        <h1 className="text-2xl font-serif text-lime-400">CuriousLabs</h1>
        <p className="text-sm text-white/60">Runtime core for intelligent systems</p>
      </div>

      {/* Planet on right side */}
      <PlanetRevealTrack 
        className="absolute right-[10vw] top-1/2 -translate-y-1/2 z-10" 
        scenePhase={scenePhase} 
      />
      
      {/* Text on left side */}
      <TextRevealBlock 
        className="absolute left-[10vw] top-[40%] -translate-y-1/2 z-10" 
        scenePhase={scenePhase} 
      />

      {/* Scroll hint appears when animation is complete */}
      {scenePhase === PHASE_COMPLETE && (
        <div className="absolute bottom-6 right-6 text-sm text-white/40 animate-pulse z-10">
          Scroll to explore
        </div>
      )}
    </section>
  );
};

export default HeroSequenceV6;

