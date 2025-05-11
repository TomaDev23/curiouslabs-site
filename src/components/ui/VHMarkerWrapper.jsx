import React from 'react';
import { useHUDContext } from './HUDHub';
import withDraggable from './DraggableHOC';

// LEGIT compliance metadata
export const metadata = {
  id: 'vh_marker_wrapper',
  scs: 'SCS-DEBUG-OVERLAY',
  type: 'utility',
  doc: 'contract_vh_marker_wrapper.md'
};

/**
 * Wrapper for VH Markers to integrate with the HUD system
 * 
 * @returns {React.ReactElement|null} The VH Markers control or null if hidden
 */
function VHMarkerWrapper() {
  // Use HUD context for visibility control
  const { hudVisibility } = useHUDContext();
  const isVisible = hudVisibility['hud_4'] !== false; // Default to visible if not set
  
  if (!isVisible) return null;
  
  // Toggle VH markers visibility
  React.useEffect(() => {
    const markers = document.querySelectorAll('[data-vh-marker]');
    markers.forEach(marker => {
      marker.style.display = isVisible ? 'block' : 'none';
    });
    
    return () => {
      // Make sure markers are visible when this component unmounts
      markers.forEach(marker => {
        marker.style.display = 'block';
      });
    };
  }, [isVisible]);
  
  return (
    <div className="bg-orange-800/90 text-white p-4 rounded-lg shadow-lg">
      <div className="draggable-handle flex justify-between items-center mb-2 pb-1 border-b border-orange-600">
        <span className="font-bold">HUD 4: VH Markers</span>
      </div>
      
      <div className="text-xs">
        <p className="mb-2">VH Markers are currently {isVisible ? 'visible' : 'hidden'}</p>
        
        <div className="flex gap-2 items-center">
          {[100, 200, 300, 400, 500, 600].map((vh) => (
            <div 
              key={vh}
              className="bg-orange-900/80 rounded px-2 py-1 text-orange-300"
            >
              {vh}vh
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Export the draggable version of the component
export default withDraggable(VHMarkerWrapper, {
  defaultPosition: { x: window.innerWidth - 200, y: 20 },
  zIndex: 9000
});
