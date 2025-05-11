import React, { useState, useEffect } from 'react';
import HUDHub, { HUDProvider, useHUDContext } from './HUDHub';
import ScrollDebugOverlay from './ScrollDebugOverlay';
import FPSMeter from '../journey/debug/FPSMeter';
// Import SceneBoundaryDebug9 for button 9
import SceneBoundaryDebug9 from '../journey/debug/SceneBoundaryDebug9';
import AdvancedControlPanel from '../layouts/AdvancedControlPanel';
import VHMarkers from '../journey/debug/VHMarkers';
// Import SceneDebugOverlay for HUD 6
import { SceneDebugOverlay } from '../journey/CosmicJourneyController';

// LEGIT compliance metadata
export const metadata = {
  id: 'hud_system',
  scs: 'SCS-DEBUG',
  type: 'utility',
  doc: 'contract_hud_system.md'
};

// A simple error boundary component to catch rendering errors
function HUDErrorBoundary({ children, name, fallback }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  
  // Reset error state when children change
  useEffect(() => {
    setHasError(false);
    setError(null);
  }, [children]);
  
  // If component has error, show fallback
  if (hasError) {
    return fallback || (
      <div className="fixed bg-red-900/80 text-white p-3 rounded-lg text-xs z-[10000]">
        Error in {name}: {error?.message || 'Unknown error'}
      </div>
    );
  }
  
  // Otherwise try to render children with error catching
  try {
    return children;
  } catch (err) {
    console.error(`Error rendering ${name}:`, err);
    setHasError(true);
    setError(err);
    // Return null on first error to prevent potential layout shifts
    return null;
  }
}

/**
 * HUD System Component
 * Integrates the HUD Hub into any page
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.devOnly - Whether to only show in development mode
 * @param {Array} props.scenes - Scene data for SceneBoundaryDebug (optional)
 * @param {number} props.scrollProgress - Scroll progress data (optional)
 * @param {Array} props.sections - Section data for AdvancedControlPanel (optional)
 * @returns {React.ReactElement|null} HUD System if in development, null otherwise
 */
export default function HUDSystem({ 
  devOnly = true,
  scenes = [],
  scrollProgress = 0,
  sections = [],
  onSectionMove,
  onToggleEditMode,
  isEditMode, 
  onSave,
  onReset,
  hiddenSections = [],
  onToggleSectionVisibility,
  onShowAllSections,
  onHideAllSections
}) {
  // Only show in development mode by default
  if (devOnly && process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  // Get current scene key for HUD 6
  const currentSceneKey = scenes.find(
    scene => scrollProgress >= scene.range[0] && scrollProgress < scene.range[1]
  )?.key || '';
  
  // Calculate scene progress for HUD 6
  const currentScene = scenes.find(
    scene => scrollProgress >= scene.range[0] && scrollProgress < scene.range[1]
  );
  
  let sceneProgress = 0;
  if (currentScene) {
    const { range } = currentScene;
    sceneProgress = (scrollProgress - range[0]) / (range[1] - range[0]);
    sceneProgress = Math.max(0, Math.min(1, sceneProgress));
  }
  
  // Safely render SceneBoundaryDebug9 with error handling
  const renderSceneBoundaryDebug9 = () => {
    try {
      return (
        <HUDErrorBoundary name="SceneBoundaryDebug9">
          <SceneBoundaryDebug9 
            scenes={scenes} 
            scrollProgress={scrollProgress}
          />
        </HUDErrorBoundary>
      );
    } catch (error) {
      console.error('[HUDSystem] Error rendering SceneBoundaryDebug9:', error);
      return null;
    }
  };
  
  return (
    <HUDProvider>
      <HUDHub />
      
      {/* HUD 1: Scroll Debug Overlay */}
      <ScrollDebugOverlay />
      
      {/* HUD 3: FPS Meter */}
      <FPSMeter />
      
      {/* HUD 4: VH Markers */}
      <VHMarkers />
      
      {/* HUD 5: Advanced Control Panel */}
      <HUDErrorBoundary name="AdvancedControlPanel">
        <AdvancedControlPanel 
          sections={sections}
          onSectionMove={onSectionMove}
          onToggleEditMode={onToggleEditMode}
          isEditMode={isEditMode}
          onSave={onSave}
          onReset={onReset}
          hiddenSections={hiddenSections}
          onToggleSectionVisibility={onToggleSectionVisibility}
          onShowAllSections={onShowAllSections}
          onHideAllSections={onHideAllSections}
          scenes={scenes}
          scrollProgress={scrollProgress}
        />
      </HUDErrorBoundary>
      
      {/* HUD 6: Scene Progress Debug */}
      <SceneDebugOverlay 
        scrollProgress={scrollProgress}
        currentSceneKey={currentSceneKey}
        sceneProgress={sceneProgress}
      />
      
      {/* HUD 9: Scene Debug v2 */}
      {renderSceneBoundaryDebug9()}
    </HUDProvider>
  );
} 