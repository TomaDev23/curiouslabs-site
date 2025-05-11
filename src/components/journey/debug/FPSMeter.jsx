import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import withDraggable from '../../../components/ui/DraggableHOC';

// Import HUDContext directly from HUDHub
import { useHUDContext } from '../../../components/ui/HUDHub';

// LEGIT-compliant metadata
export const metadata = {
  id: 'fps_meter',
  scs: 'SCS0',
  type: 'debug',
  doc: 'contract_debug_tools.md'
};

/**
 * FPSMeter Internal Component - Performance monitoring component
 * Will be wrapped with withDraggable
 */
function FPSMeterContent() {
  const [fps, setFps] = useState(0);
  const [showMarkers, setShowMarkers] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const framesRef = useRef(0);
  
  // Get visibility state directly from HUDContext
  const { hudVisibility } = useHUDContext?.() || { hudVisibility: {} };
  const isVisible = hudVisibility['hud_3'] !== false;
  
  // Log visibility state for debugging
  useEffect(() => {
    console.log('[HUD3] Visibility state:', isVisible, 'from context:', hudVisibility);
  }, [isVisible, hudVisibility]);
  
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
  
  // Early return if not visible based on HUD context
  if (!isVisible) return null;
  
  // Get color based on FPS
  const getFpsColor = () => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  return (
    <div className="bg-gray-900/90 p-2 rounded-lg text-white text-xs font-mono backdrop-blur-sm border-2 border-purple-500 shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xs text-purple-300">HUD 3: FPS Monitor</h3>
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
            className={`text-[10px] px-1.5 py-0.5 rounded ${showMarkers ? 'bg-purple-600' : 'bg-gray-700'}`}
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
    </div>
  );
}

// Create draggable version with specific storage key for position
const DraggableFPSMeter = withDraggable(FPSMeterContent, {
  defaultPosition: { x: 20, y: 220 },
  zIndex: 10000,
  storageId: 'draggable_FPSMeterContent_position'
});

/**
 * FPSMeter - Exports the draggable FPS meter component
 */
export default function FPSMeter() {
  console.log('[HUD3] FPSMeter rendering');
  return <DraggableFPSMeter />;
} 