import React, { Suspense, useRef, useState, useEffect, useCallback } from 'react';
import { AtomicPageFrame } from '../components/layouts/AtomicPageFrame';
import HUDSystem from '../components/ui/HUDSystem';
import SceneBoundaryDebug from '../components/journey/debug/SceneBoundaryDebug';

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
  
  // Refs for smooth scroll handling
  const rafRef = useRef(null);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  
  // Smooth scroll progress updater
  const updateScrollProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    
    // Calculate target scroll progress
    targetScrollRef.current = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
    
    // Smoothly interpolate current scroll to target
    const updateScroll = () => {
      // Smooth interpolation factor (adjust for desired smoothness)
      const smoothFactor = 0.15;
      
      // Calculate difference and apply smooth interpolation
      const diff = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += diff * smoothFactor;
      
      // Update state only if change is significant
      if (Math.abs(diff) > 0.0001) {
        setScrollProgress(currentScrollRef.current);
        rafRef.current = requestAnimationFrame(updateScroll);
      } else {
        // Snap to target when very close
        setScrollProgress(targetScrollRef.current);
      }
    };
    
    // Start the smooth update loop
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScroll);
  }, []);
  
  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    // Use RAF to avoid scroll jank
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateScrollProgress);
  }, [updateScrollProgress]);
  
  // Effect to track scroll progress
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);
  
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
      
      {process.env.NODE_ENV === 'development' && (
        <>
          <SceneBoundaryDebug 
            scenes={scenes}
            scrollProgress={scrollProgress}
          />
          
          <HUDSystem 
            devOnly={true}
            scrollProgress={scrollProgress}
            scenes={scenes}
          />
        </>
      )}
    </>
  );
} 