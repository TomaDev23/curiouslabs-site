import React, { useState, useEffect, useRef } from 'react';

// Metadata for LEGIT compliance
const metadata = {
  id: 'cosmic_rev_dev',
  scs: 'SCS3',
  type: 'dev',
  doc: 'contract_dev_page.md'
};

export default function CosmicRevDev() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeScene, setActiveScene] = useState('dormant');
  const [sceneProgress, setSceneProgress] = useState(0);
  const containerRef = useRef(null);
  
  // Define scene ranges for testing
  const SCENES = [
    { key: 'dormant', range: [0, 0.05] },
    { key: 'awakening', range: [0.05, 0.25] },
    { key: 'cosmicReveal', range: [0.25, 0.5] },
    { key: 'cosmicFlight', range: [0.5, 0.75] },
    { key: 'sunApproach', range: [0.75, 0.9] },
    { key: 'sunLanding', range: [0.9, 1.0] }
  ];

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Get scroll progress (0-1)
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(progress);
      
      // Update active scene
      const currentScene = SCENES.find(scene => 
        progress >= scene.range[0] && progress < scene.range[1]
      );
      
      if (currentScene) {
        setActiveScene(currentScene.key);
        
        // Calculate progress within scene (0-1)
        const sceneStart = currentScene.range[0];
        const sceneEnd = currentScene.range[1];
        const sceneRange = sceneEnd - sceneStart;
        
        if (sceneRange > 0) {
          const sceneProgressValue = (progress - sceneStart) / sceneRange;
          setSceneProgress(Math.max(0, Math.min(1, sceneProgressValue)));
        }
      }
    };
    
    // Set up initial virtual height for scrolling (5000px = 500vh)
    containerRef.current.style.height = '5000px';
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Debug display
  const DebugOverlay = () => (
    <div className="fixed top-4 left-4 z-[9999] bg-black/80 p-4 rounded-lg text-xs text-white font-mono">
      <div className="mb-1 text-lg">Scroll Progress: {(scrollProgress * 100).toFixed(2)}%</div>
      <div className="mb-1">Position: {window.scrollY}px / {document.documentElement.scrollHeight}px</div>
      <div className="mb-1">Scene: <span className="text-green-400">{activeScene}</span></div>
      <div className="mb-2">Scene Progress: {(sceneProgress * 100).toFixed(2)}%</div>
      
      <div className="text-xs mt-2 pt-2 border-t border-gray-700">
        {SCENES.map(scene => (
          <div key={scene.key} className="flex items-center mb-1">
            <div className={`w-2 h-2 rounded-full mr-2 ${activeScene === scene.key ? 'bg-green-500' : 'bg-gray-500'}`}></div>
            <div className={`${activeScene === scene.key ? 'text-green-400' : 'text-gray-400'}`}>
              {scene.key}: {scene.range[0] * 100}% - {scene.range[1] * 100}%
            </div>
          </div>
        ))}
      </div>
      
      {/* Scene Controls */}
      <div className="mt-4 pt-2 border-t border-gray-700">
        <div className="text-sm mb-2">Scene Controls:</div>
        <div className="flex flex-wrap gap-2">
          {SCENES.map(scene => (
            <button
              key={scene.key}
              className={`px-2 py-1 text-xs rounded ${activeScene === scene.key ? 'bg-green-500' : 'bg-gray-600'}`}
              onClick={() => {
                // Scroll to scene
                const targetScroll = scene.range[0] * (document.documentElement.scrollHeight - window.innerHeight);
                window.scrollTo({ top: targetScroll, behavior: 'smooth' });
              }}
            >
              {scene.key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
  return (
    <div ref={containerRef} className="w-full">
      {/* Simple Clean Background - changes color based on active scene */}
      <div 
        className="fixed inset-0 z-0 transition-colors duration-1000"
        style={{
          background: (() => {
            switch(activeScene) {
              case 'dormant': return 'linear-gradient(to bottom, #0a0a0a, #1a0a1a)';
              case 'awakening': return 'linear-gradient(to bottom, #1a0a1a, #2a1a2a)';
              case 'cosmicReveal': return 'linear-gradient(to bottom, #2a1a2a, #1a1a3a)';
              case 'cosmicFlight': return 'linear-gradient(to bottom, #1a1a3a, #2a2a4a)';
              case 'sunApproach': return 'linear-gradient(to bottom, #2a2a4a, #4a3a2a)';
              case 'sunLanding': return 'linear-gradient(to bottom, #4a3a2a, #6a4a3a)';
              default: return 'linear-gradient(to bottom, #0a0a0a, #1a0a1a)';
            }
          })()
        }}
      />
      
      {/* Debug Overlay */}
      <DebugOverlay />
      
      {/* Scene Markers */}
      <div className="fixed right-4 inset-y-0 w-1 z-50 opacity-20">
        {SCENES.map(scene => (
          <div 
            key={scene.key}
            className="absolute w-full bg-white"
            style={{
              top: `${scene.range[0] * 100}%`,
              height: `${(scene.range[1] - scene.range[0]) * 100}%`,
              backgroundColor: activeScene === scene.key ? '#00ff00' : '#ffffff'
            }}
          />
        ))}
      </div>
    </div>
  );
} 