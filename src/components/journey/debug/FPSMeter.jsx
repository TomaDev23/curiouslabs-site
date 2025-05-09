import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// LEGIT-compliant metadata
const metadata = {
  id: 'fps_meter',
  scs: 'SCS0',
  type: 'debug',
  doc: 'contract_debug_tools.md'
};

/**
 * FPSMeter - Performance monitoring component
 * Updated for TILE v5.0.C to include VH marker toggle
 * Only visible in development mode
 * 
 * @returns {React.ReactElement} FPS meter overlay
 */
export default function FPSMeter() {
  const [fps, setFps] = useState(0);
  const [showMarkers, setShowMarkers] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const framesRef = useRef(0);
  
  // Calculate FPS
  useEffect(() => {
    const updateFPS = () => {
      const now = performance.now();
      framesRef.current++;
      
      // Update FPS every 500ms
      if (now - lastTimeRef.current >= 500) {
        setFps(Math.round((framesRef.current * 1000) / (now - lastTimeRef.current)));
        framesRef.current = 0;
        lastTimeRef.current = now;
      }
      
      frameRef.current = requestAnimationFrame(updateFPS);
    };
    
    frameRef.current = requestAnimationFrame(updateFPS);
    
    return () => {
      cancelAnimationFrame(frameRef.current);
    };
  }, []);
  
  // Toggle VH markers with M key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'm' || e.key === 'M') {
        setShowMarkers(prev => !prev);
        
        // Update all VH markers visibility
        const markers = document.querySelectorAll('[data-vh-marker]');
        markers.forEach(marker => {
          marker.style.display = !showMarkers ? 'block' : 'none';
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMarkers]);
  
  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') return null;
  
  // Get color based on FPS
  const getFpsColor = () => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  return (
    <motion.div 
      className="fixed left-4 bottom-4 z-50 bg-black/80 p-2 rounded-lg text-white text-xs font-mono backdrop-blur-sm border border-gray-700 shadow-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xs">FPS Monitor</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setShowMarkers(prev => !prev);
              // Update all VH markers visibility
              const markers = document.querySelectorAll('[data-vh-marker]');
              markers.forEach(marker => {
                marker.style.display = !showMarkers ? 'block' : 'none';
              });
            }} 
            className={`text-[10px] px-1.5 py-0.5 rounded ${showMarkers ? 'bg-blue-600' : 'bg-gray-700'}`}
            title="Toggle VH markers (M key)"
          >
            VH
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
          <div className="mt-1 flex items-center gap-2">
            <span>FPS:</span>
            <span className={`${getFpsColor()} font-bold`}>{fps}</span>
            <div className="relative w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`absolute inset-y-0 left-0 ${fps >= 55 ? 'bg-green-500' : fps >= 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(100, fps * 100 / 60)}%` }}
              />
            </div>
          </div>
          
          <div className="mt-2 text-[10px] text-gray-400 flex items-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span>60fps+</span>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <span>30-59fps</span>
            </div>
            <div className="flex items-center gap-1 ml-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span>&lt;30fps</span>
            </div>
          </div>
          
          <div className="mt-2 text-[10px] text-gray-500">
            Press M to toggle VH markers
          </div>
        </>
      )}
    </motion.div>
  );
} 