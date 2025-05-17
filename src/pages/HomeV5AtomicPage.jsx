import React, { Suspense, useRef, useState, useEffect } from 'react';
import { AtomicPageFrame } from '../components/layouts/AtomicPageFrame';
import HUDSystem from '../components/ui/HUDSystem';
import SceneBoundaryDebug from '../components/journey/debug/SceneBoundaryDebug';
import SceneFaderHUD from '../components/home/v5/SceneFaderHUD';

const metadata = {
  id: 'home_v5_atomic_page',
  scs: 'SCS-HOME-V5',
  type: 'page',
  doc: 'contract_home_v5_atomic.md'
};

export default function HomeV5AtomicPage() {
  // Reference to AtomicPageFrame to access its data
  const atomicPageFrameRef = useRef(null);
  
  // State to store scroll progress and scene data
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scenes, setScenes] = useState([]);
  
  // Effect to track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Default scenes for SceneBoundaryDebug
  const DEFAULT_SCENES = [
    { key: 'dormant', range: [0.0, 0.05], transitionDuration: 1.0, fadeZone: 0.01 }, 
    { key: 'awakening', range: [0.05, 0.15], transitionDuration: 1.0, fadeZone: 0.015 },
    { key: 'cosmicReveal', range: [0.15, 0.3], transitionDuration: 0.8, fadeZone: 0.015 },
    { key: 'cosmicFlight', range: [0.3, 0.8], transitionDuration: 0.6, fadeZone: 0.015 },
    { key: 'sunApproach', range: [0.8, 0.9], transitionDuration: 1.0, fadeZone: 0.015 },
    { key: 'sunLanding', range: [0.9, 1.0], transitionDuration: 1.0, fadeZone: 0.01 },
  ];
  
  // Use default scenes
  useEffect(() => {
    setScenes(DEFAULT_SCENES);
  }, []);
  
  return (
    <>
      {/* Scene Fader HUD - Mounted at root level */}
      <SceneFaderHUD />
      
      <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
          <p className="text-xl">Loading...</p>
        </div>
      }>
        <AtomicPageFrame 
          ref={atomicPageFrameRef}
          scenes={scenes}
          scrollProgress={scrollProgress}
        />
      </Suspense>
      
      {/* Add HUD ATOMIC 2 - Scene Boundary Debug */}
      <SceneBoundaryDebug 
        scenes={scenes}
        scrollProgress={scrollProgress}
      />
      
      {/* Add HUD System for development with scroll and scene data */}
      <HUDSystem 
        devOnly={true}
        scrollProgress={scrollProgress}
        scenes={scenes}
      />
    </>
  );
} 