import React, { useState, useEffect } from 'react';
import withDraggable from './DraggableHOC';

// Import HUDContext directly from HUDHub
import { useHUDContext } from './HUDHub';

// LEGIT compliance metadata
export const metadata = {
  id: 'scroll_debug_overlay',
  scs: 'SCS-DEBUG-OVERLAY',
  type: 'utility',
  doc: 'contract_scroll_debug_overlay.md'
};

// Inner content component - this will be wrapped with withDraggable
function ScrollDebugOverlayContent() {
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    scrollPercent: 0,
    vhPosition: 0
  });
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Key change: Get visibility state directly from HUDContext
  const { hudVisibility } = useHUDContext?.() || { hudVisibility: {} };
  const isVisible = hudVisibility['hud_1'] !== false;
  
  // Log visibility state for debugging
  useEffect(() => {
    console.log('[HUD1] Visibility state:', isVisible, 'from context:', hudVisibility);
  }, [isVisible, hudVisibility]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPercent = (scrollY / scrollHeight) * 100;
      const vhPosition = (scrollY / window.innerHeight) * 100;

      setScrollInfo({
        scrollY: scrollY.toFixed(0),
        scrollPercent: scrollPercent.toFixed(2),
        vhPosition: vhPosition.toFixed(2)
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Early return if not visible based on HUD hub toggle
  if (!isVisible) return null;

  return (
    <div className="bg-gray-900/90 text-white p-3 rounded-lg font-mono text-xs border-2 border-purple-500 shadow-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-purple-300 font-bold">HUD 1: Scroll Debug</h3>
        <button 
          onClick={() => setIsExpanded(prev => !prev)}
          className="text-gray-300 hover:text-white"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="flex flex-col space-y-1 mt-2">
          <p>Scroll Position: <span className="text-green-400">{scrollInfo.scrollY}px</span></p>
          <p>Scroll Progress: <span className="text-blue-400">{scrollInfo.scrollPercent}%</span></p>
          <p>VH Position: <span className="text-purple-400">{scrollInfo.vhPosition}vh</span></p>
        </div>
      )}
    </div>
  );
}

// Create a draggable version with explicit storage ID to match HUDHub expectations
const DraggableScrollDebugOverlay = withDraggable(ScrollDebugOverlayContent, {
  defaultPosition: { x: 20, y: 20 },
  zIndex: 10000,  // High z-index to ensure it appears above everything in the global layer
  storageId: 'draggable_ScrollDebugOverlayContent_position' // Explicitly match the ID in HUDHub
});

// Export the draggable wrapper component
export default function ScrollDebugOverlay() {
  console.log('[HUD1] ScrollDebugOverlay rendering');
  return <DraggableScrollDebugOverlay />;
}