import React, { useState, useEffect } from 'react';
import withDraggable from '../../../components/ui/DraggableHOC';
import { useHUDContext } from '../../../components/ui/HUDHub';

// LEGIT compliance metadata
export const metadata = {
  id: 'vh_markers',
  scs: 'SCS-DEBUG',
  type: 'utility',
  doc: 'contract_vh_markers.md'
};

/**
 * VHMarkers Content Component
 * Visualizes viewport height markers on the page
 * Will be wrapped with draggable HOC
 */
function VHMarkersContent() {
  // Remove 700vh marker to avoid bottom markers
  const [markers, setMarkers] = useState([100, 200, 300, 400, 500, 600]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showMarkers, setShowMarkers] = useState(false);
  
  // Get visibility state directly from HUDContext
  const { hudVisibility } = useHUDContext?.() || { hudVisibility: {} };
  const isVisible = hudVisibility['hud_4'] !== false;
  
  // Log visibility state for debugging
  useEffect(() => {
    console.log('[HUD4] Visibility state:', isVisible, 'from context:', hudVisibility);
  }, [isVisible, hudVisibility]);
  
  // Early return if not visible based on HUD hub toggle
  if (!isVisible) return null;

  // Use purple theme colors to match HUDHub
  const borderColor = 'border-purple-500';
  const bgColor = 'bg-gray-900/90';
  const markerColor = 'border-purple-400';
  const markerBg = 'bg-gray-800';
  
  return (
    <div className={`vh-markers-controls ${bgColor} text-white p-2 rounded-lg font-mono text-xs border-2 ${borderColor} shadow-lg`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xs text-purple-300">HUD 4: VH MARKERS</h3>
        <button 
          onClick={() => setIsExpanded(prev => !prev)}
          className="text-gray-300 hover:text-white"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-2 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold text-xs">ACTIVE MARKERS:</span>
            <button
              onClick={() => setShowMarkers(prev => !prev)}
              className={`px-2 py-0.5 rounded text-[10px] ${showMarkers ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              {showMarkers ? 'HIDE' : 'SHOW'}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-1">
            {markers.map(vh => (
              <div key={vh} className="bg-gray-800/70 px-1.5 py-0.5 rounded text-[10px] font-bold text-purple-200">
                {vh}vh
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* The actual markers are rendered directly in the DOM only when showMarkers is true */}
      {showMarkers && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
          {markers.map((vh) => (
            <div 
              key={vh}
              data-vh-marker
              className={`absolute left-0 w-full border-t-2 border-dashed ${markerColor} transition-colors duration-300`}
              style={{ 
                top: `${vh}vh`,
                display: 'block',
                opacity: 0.6
              }}
            >
              <span className={`${markerBg} text-white px-3 py-1 text-xs font-bold rounded-md border-2 ${borderColor} shadow-md transition-colors duration-300`}>
                {vh}vh
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Create draggable version with specific storage key for position
const DraggableVHMarkers = withDraggable(VHMarkersContent, {
  defaultPosition: { x: 20, y: 120 },
  zIndex: 10000  // High z-index to ensure it appears above everything in the global layer
});

/**
 * VHMarkers - Exports the draggable VH Markers component
 */
export default function VHMarkers() {
  console.log('[HUD4] VHMarkers rendering with static markers');
  return <DraggableVHMarkers />;
} 