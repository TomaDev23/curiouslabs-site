import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// LEGIT-compliant metadata
const metadata = {
  id: 'scene_boundary_debug',
  scs: 'SCS0',
  type: 'debug',
  doc: 'contract_debug_tools.md'
};

/**
 * SceneBoundaryDebug - Visualizes scene boundaries and scroll position
 * Updated for TILE v5.0.D to show dissolve zones and transition timing
 * Only visible in development mode
 * 
 * @param {Array} scenes - Array of scene objects with key, range properties
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @returns {React.ReactElement} Scene boundary debug overlay
 */
export default function SceneBoundaryDebug({ scenes, scrollProgress }) {
  const [showVhValues, setShowVhValues] = useState(true);
  const [showDissolveZones, setShowDissolveZones] = useState(false);
  const [showTransitionTiming, setShowTransitionTiming] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastTransitionTime, setLastTransitionTime] = useState(null);
  const [currentSceneKey, setCurrentSceneKey] = useState('');
  
  // Enhanced scene data with fade zones
  const scenesWithFadeZones = scenes.map(scene => ({
    ...scene,
    fadeZone: scene.key === 'dormant' || scene.key === 'sunLanding' ? 0.03 : 0.05
  }));
  
  // Toggle VH values display with V key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'v' || e.key === 'V') {
        setShowVhValues(prev => !prev);
      } else if (e.key === 'd' || e.key === 'D') {
        setShowDissolveZones(prev => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        setShowTransitionTiming(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Track scene transitions for timing display
  useEffect(() => {
    const currentScene = scenes.find(
      ({ range }) => scrollProgress >= range[0] && scrollProgress < range[1]
    );
    
    if (currentScene && currentScene.key !== currentSceneKey) {
      setLastTransitionTime(new Date());
      setCurrentSceneKey(currentScene.key);
    }
  }, [scrollProgress, scenes, currentSceneKey]);
  
  // Calculate the total height for vh calculations (700vh for AtomicPageFrame)
  const totalVhHeight = 700;
  
  if (!scenes || scenes.length === 0) return null;
  
  return (
    <motion.div 
      className="fixed right-4 top-4 z-50 bg-black/80 rounded-lg p-2 text-xs font-mono text-white backdrop-blur-sm border border-gray-700 shadow-xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-green-400 font-bold text-xs">Scene Boundaries</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowVhValues(prev => !prev)} 
            className={`text-[10px] px-1.5 py-0.5 rounded ${showVhValues ? 'bg-blue-600' : 'bg-gray-700'}`}
            title="Toggle VH values display (V key)"
          >
            VH
          </button>
          <button 
            onClick={() => setShowDissolveZones(prev => !prev)} 
            className={`text-[10px] px-1.5 py-0.5 rounded ${showDissolveZones ? 'bg-green-600' : 'bg-gray-700'}`}
            title="Toggle dissolve zone highlights (D key)"
          >
            DZ
          </button>
          <button 
            onClick={() => setShowTransitionTiming(prev => !prev)} 
            className={`text-[10px] px-1.5 py-0.5 rounded ${showTransitionTiming ? 'bg-purple-600' : 'bg-gray-700'}`}
            title="Toggle transition timing (T key)"
          >
            MS
          </button>
          <button 
            onClick={() => setIsExpanded(prev => !prev)} 
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="text-xs mb-2">
            <div className="text-gray-400">Current: {Math.round(scrollProgress * 100)}%{showVhValues && ` (${Math.round(scrollProgress * totalVhHeight)}vh)`}</div>
          </div>
          
          <div className="relative h-64 w-6 bg-gray-800 rounded-full overflow-hidden mb-2">
            {/* Scene ranges visualization */}
            {scenesWithFadeZones.map(({ key, range, fadeZone }, i) => {
              const [start, end] = range;
              const height = (end - start) * 100;
              const top = start * 100;
              
              // Is the current scene active?
              const isActive = scrollProgress >= start && scrollProgress < end;
              
              return (
                <React.Fragment key={key}>
                  {/* Main scene range */}
                  <div 
                    className={`absolute left-0 w-full rounded-sm ${isActive ? 'bg-green-500' : 'bg-gray-600'}`}
                    style={{ 
                      height: `${height}%`, 
                      top: `${top}%`,
                    }}
                    title={`${key}: ${start * 100}% - ${end * 100}%`}
                  />
                  
                  {/* Fade zones (if enabled) */}
                  {showDissolveZones && (
                    <>
                      {/* Fade-in zone */}
                      <div 
                        className="absolute left-0 w-full rounded-sm bg-yellow-500/40"
                        style={{ 
                          height: `${fadeZone * 100}%`, 
                          top: `${(start - fadeZone) * 100}%`,
                        }}
                        title={`${key} fade-in: ${(start - fadeZone) * 100}% - ${start * 100}%`}
                      />
                      
                      {/* Fade-out zone */}
                      <div 
                        className="absolute left-0 w-full rounded-sm bg-yellow-500/40"
                        style={{ 
                          height: `${fadeZone * 100}%`, 
                          top: `${end * 100}%`,
                        }}
                        title={`${key} fade-out: ${end * 100}% - ${(end + fadeZone) * 100}%`}
                      />
                    </>
                  )}
                </React.Fragment>
              );
            })}
            
            {/* Current scroll position indicator */}
            <div 
              className="absolute left-0 w-full h-0.5 bg-white z-10"
              style={{ top: `${scrollProgress * 100}%` }}
            />
          </div>
          
          {/* Scene details list */}
          <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
            {scenesWithFadeZones.map(({ key, range, fadeZone, transitionDuration = 0.8 }, i) => {
              const [start, end] = range;
              const isActive = scrollProgress >= start && scrollProgress < end;
              const startVh = Math.round(start * totalVhHeight);
              const endVh = Math.round(end * totalVhHeight);
              const fadeInStartVh = Math.round((start - fadeZone) * totalVhHeight);
              const fadeOutEndVh = Math.round((end + fadeZone) * totalVhHeight);
              
              return (
                <div 
                  key={key}
                  className={`text-[10px] flex justify-between ${isActive ? 'text-green-400 font-bold' : 'text-gray-400'}`}
                >
                  <span>{key}</span>
                  <span>
                    {Math.round(start * 100)}% - {Math.round(end * 100)}%
                    {showVhValues && (
                      <span className="ml-1 text-blue-400">
                        ({startVh}vh - {endVh}vh)
                      </span>
                    )}
                    {showDissolveZones && (
                      <span className="ml-1 text-yellow-400">
                        [{fadeInStartVh}vh - {fadeOutEndVh}vh]
                      </span>
                    )}
                    {transitionDuration && (
                      <span className="ml-1 text-purple-400">
                        {transitionDuration}s
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Transition timing display */}
          {showTransitionTiming && lastTransitionTime && (
            <div className="mt-2 text-[10px] bg-purple-950/50 p-1 rounded">
              <div className="text-purple-300">Last transition: {currentSceneKey}</div>
              <div className="text-purple-300">
                Time: {lastTransitionTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}
              </div>
              <div className="text-purple-300">
                MS since: {new Date() - lastTransitionTime}ms
              </div>
            </div>
          )}
          
          <div className="mt-2 text-[10px] text-gray-500">
            Press V to toggle VH values
            <br />
            Press D to toggle dissolve zones
            <br />
            Press T to toggle transition timing
          </div>
        </>
      )}
    </motion.div>
  );
} 