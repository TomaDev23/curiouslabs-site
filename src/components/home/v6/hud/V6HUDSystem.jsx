/**
 * @component V6HUDSystem
 * @description Main container for V6 HUD components
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - V6HUDSystem passes LEGIT protocol
 */

import React from 'react';
import V6HUDHub, { V6HUDProvider, useV6HUDContext } from './V6HUDHub';
import MissionTrackerHUD from './MissionTrackerHUD';

/**
 * Error boundary for HUD components
 */
class HUDErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`[V6HUD] Error in ${this.props.name}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed bg-red-900/80 text-white p-3 rounded-lg text-xs z-[10000]">
          Error in {this.props.name}: {this.state.error?.message || 'Unknown error'}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Placeholder for ScrollDebugV6 component
 * This will be implemented in the next phase
 */
const ScrollDebugV6Placeholder = ({ scrollProgress }) => {
  const { hudVisibility } = useV6HUDContext();
  
  if (!hudVisibility['hud_2']) return null;
  
  return (
    <div className="fixed top-20 right-4 bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg text-xs border-2 border-blue-500">
      <h3 className="font-bold text-blue-400 mb-2">Scroll Debug (Placeholder)</h3>
      <p>Scroll Progress: {Math.round(scrollProgress * 100)}%</p>
    </div>
  );
};

/**
 * Placeholder for SectionControlPanel component
 * This will be implemented in the next phase
 */
const SectionControlPanelPlaceholder = ({ sections }) => {
  const { hudVisibility } = useV6HUDContext();
  
  if (!hudVisibility['hud_1']) return null;
  
  return (
    <div className="fixed top-20 left-4 bg-gray-900/90 backdrop-blur-sm text-white p-3 rounded-lg text-xs border-2 border-purple-500">
      <h3 className="font-bold text-purple-400 mb-2">Section Control (Placeholder)</h3>
      <p className="mb-2">Sections: {sections?.length || 0}</p>
      <div className="space-y-1">
        {sections?.map((section, index) => (
          <div key={section.id} className="flex justify-between">
            <span>{section.name || `Section ${index + 1}`}</span>
            <span>{section.position || 0}vh</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Main V6HUDSystem component
 * @param {Object} props Component props
 * @param {Object[]} props.sections Array of section data
 * @param {number} props.scrollProgress Current scroll progress (0-1)
 * @returns {React.ReactElement|null} HUD System or null in production
 */
const V6HUDSystem = ({ 
  sections = [],
  scrollProgress = 0
}) => {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <HUDErrorBoundary name="V6HUDSystem">
      <V6HUDProvider>
        {/* Main HUD Hub */}
        <V6HUDHub />
        
        {/* Placeholders for future HUDs */}
        <HUDErrorBoundary name="SectionControlPanel">
          <SectionControlPanelPlaceholder sections={sections} />
        </HUDErrorBoundary>
        
        <HUDErrorBoundary name="ScrollDebug">
          <ScrollDebugV6Placeholder scrollProgress={scrollProgress} />
        </HUDErrorBoundary>
        
        {/* Mission Tracker HUD */}
        <HUDErrorBoundary name="MissionTracker">
          <MissionTrackerHUD />
        </HUDErrorBoundary>
      </V6HUDProvider>
    </HUDErrorBoundary>
  );
};

export default V6HUDSystem; 