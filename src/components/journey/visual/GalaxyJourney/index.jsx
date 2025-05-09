import React, { useRef, useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';

// Lazy-load the renderer component for better performance
const GalaxyRenderer = lazy(() => import('./GalaxyRenderer'));

// LEGIT metadata declaration
export const metadata = {
  id: 'galaxy_journey',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_galaxy_journey.md'
};

/**
 * GalaxyJourney - Particle-based WebGL galaxy experience with scroll-synced transitions
 * 
 * @typedef {Object} GalaxyJourneyProps
 * @property {number} [width] - Width of canvas in pixels (defaults to container width)
 * @property {number} [height] - Height of canvas in pixels (defaults to container height)
 * @property {boolean} [isDebug] - Enable debug overlay and controls
 * @property {Object} [options] - Override default visual parameters
 * @property {number} [options.starCount=2000] - Number of background stars
 * @property {number} [options.galaxyCount=15000] - Number of galaxy particles
 * @property {number} [options.trailCount=5000] - Number of trail particles
 * 
 * @param {GalaxyJourneyProps} props
 */
export default function GalaxyJourney({ 
  width, 
  height, 
  isDebug = false,
  options = {}
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [sceneData, setSceneData] = useState({
    scene: 'dormant',
    progress: 0,
    isExploding: false,
    explosionProgress: 0,
    scrollPosition: 0
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Handle resize to update dimensions
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: width || containerRef.current.clientWidth,
          height: height || containerRef.current.clientHeight
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);
  
  // Handle scroll to update scene data
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll height (document height minus viewport height)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      // Calculate normalized scroll progress (0 to 1)
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
      
      // Calculate scroll position in vh units (0-550vh)
      const totalHeight = 550; // vh units
      const scrollPosition = window.scrollY / window.innerHeight * 100; // in vh
      
      // Determine active scene and scene-specific progress
      let scene = 'dormant';
      let sceneProgress = 0;
      
      if (scrollPosition < 50) {
        // Small milky way (0-50vh)
        scene = 'dormant';
        sceneProgress = scrollPosition / 50;
      } else if (scrollPosition < 100) {
        // Swirl animation (50-100vh)
        scene = 'awakening';
        sceneProgress = (scrollPosition - 50) / 50;
      } else if (scrollPosition < 200) {
        // Explosion and stabilization (100-200vh)
        scene = 'cosmicReveal';
        sceneProgress = (scrollPosition - 100) / 100;
      } else if (scrollPosition <= 550) {
        // Play around (200-550vh)
        scene = 'cosmicFlight';
        sceneProgress = (scrollPosition - 200) / 350;
      }
      
      // Special flag for explosion effect at 115-125vh
      const isExploding = scrollPosition >= 115 && scrollPosition <= 125;
      const explosionProgress = isExploding ? 
        (scrollPosition - 115) / 10 : 
        (scrollPosition < 115 ? 0 : 1);
      
      setSceneData({
        scene,
        progress: sceneProgress,
        isExploding,
        explosionProgress,
        scrollPosition
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Debug overlay component
  const DebugOverlay = () => {
    if (!isDebug) return null;
    
    return (
      <div className="fixed top-4 left-4 z-[9999] bg-black/80 p-4 rounded-lg text-xs text-white font-mono">
        <div className="mb-1 text-lg">Scroll Progress: {(scrollProgress * 100).toFixed(2)}%</div>
        <div className="mb-1">Position: {sceneData.scrollPosition.toFixed(2)}vh</div>
        <div className="mb-1">Scene: <span className="text-green-400">{sceneData.scene}</span></div>
        <div className="mb-1">Scene Progress: {(sceneData.progress * 100).toFixed(2)}%</div>
        {sceneData.isExploding && (
          <div className="text-yellow-300">Explosion: {(sceneData.explosionProgress * 100).toFixed(2)}%</div>
        )}
        
        <div className="text-xs mt-2 pt-2 border-t border-gray-700">
          {['dormant', 'awakening', 'cosmicReveal', 'cosmicFlight'].map(sceneName => (
            <div key={sceneName} className="flex items-center mb-1">
              <div className={`w-2 h-2 rounded-full mr-2 ${sceneData.scene === sceneName ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <div className={`${sceneData.scene === sceneName ? 'text-green-400' : 'text-gray-400'}`}>
                {sceneName}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true" // Accessibility: mark as decorative
    >
      {dimensions.width > 0 && (
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <GalaxyRenderer 
            width={dimensions.width}
            height={dimensions.height}
            sceneData={sceneData}
            scrollProgress={scrollProgress}
            options={options}
          />
        </Suspense>
      )}
      
      <DebugOverlay />
    </div>
  );
} 