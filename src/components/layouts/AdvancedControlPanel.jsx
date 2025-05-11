import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHUDContext } from '../ui/HUDHub';
import withDraggable from '../ui/DraggableHOC';

// LEGIT compliance metadata
export const metadata = {
  id: 'advanced_control_panel',
  scs: 'SCS-ADMIN-PANEL',
  type: 'control',
  doc: 'contract_admin_panel.md'
};

/**
 * AdvancedControlPanel component combining section controls and scene debug
 * Provides UI for section management and scene visualization
 */
export function AdvancedControlPanel({ 
  // Section control props
  sections, 
  onSectionMove, 
  onToggleEditMode, 
  isEditMode,
  onSave,
  onReset,
  hiddenSections = [],
  onToggleSectionVisibility,
  onShowAllSections,
  onHideAllSections,
  // Scene debug props
  scenes,
  scrollProgress,
  // Custom styling
  customClassName = '',
  // Custom title
  customTitle = 'HUD 5: Dev Controls'
}) {
  // State to track if panel is minimized
  const [isMinimized, setIsMinimized] = useState(false);
  // State to track current active tab
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' or 'scenes'
  // State for scene debug options
  const [showVhValues, setShowVhValues] = useState(true);
  const [showDissolveZones, setShowDissolveZones] = useState(false);
  const [showTransitionTiming, setShowTransitionTiming] = useState(false);
  const [lastTransitionTime, setLastTransitionTime] = useState(null);
  const [currentSceneKey, setCurrentSceneKey] = useState('');
  // Reference to the panel
  const panelRef = useRef(null);
  
  // Use HUD visibility from context
  const { hudVisibility } = useHUDContext?.() || { hudVisibility: {} };
  
  // Only check visibility if this is HUD 5, not when it's ATOMIC HUD 1
  const isHUD5 = customTitle === 'HUD 5: Dev Controls';
  const isVisible = isHUD5 ? hudVisibility['hud_5'] !== false : true;
  
  // Log visibility state for debugging - explicitly log the context values
  useEffect(() => {
    // Added timestamp to make logs easier to track
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    console.log(`[${customTitle} ${timestamp}] Visibility state:`, isVisible);
    console.log(`[${customTitle} ${timestamp}] Context values:`, hudVisibility);
    console.log(`[${customTitle} ${timestamp}] Component mounted with ref:`, panelRef.current);
    console.log(`[${customTitle} ${timestamp}] Added draggable-handle class to panel header and title text`);
    
    // Clean up function to log when component is unmounted
    return () => {
      console.log(`[${customTitle} ${timestamp}] Component unmounting`);
    };
  }, [isVisible, hudVisibility, customTitle]);

  // Enhanced scene data with fade zones
  const scenesWithFadeZones = scenes ? scenes.map(scene => ({
    ...scene,
    fadeZone: scene.key === 'dormant' || scene.key === 'sunLanding' ? 0.03 : 0.05
  })) : [];

  // Track scene transitions for timing display
  useEffect(() => {
    if (!scenes) return;
    
    const currentScene = scenes.find(
      ({ range }) => scrollProgress >= range[0] && scrollProgress < range[1]
    );
    
    if (currentScene && currentScene.key !== currentSceneKey) {
      setLastTransitionTime(new Date());
      setCurrentSceneKey(currentScene.key);
    }
  }, [scrollProgress, scenes, currentSceneKey]);

  // Add keyboard shortcuts for scene debug
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab === 'scenes') {
        if (e.key === 'v' || e.key === 'V') {
          setShowVhValues(prev => !prev);
        } else if (e.key === 'd' || e.key === 'D') {
          setShowDissolveZones(prev => !prev);
        } else if (e.key === 't' || e.key === 'T') {
          setShowTransitionTiming(prev => !prev);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  // Function to toggle minimized state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Check if all sections are hidden or all are visible
  const allHidden = sections.length > 0 && sections.every(section => hiddenSections.includes(section.id));
  const allVisible = hiddenSections.length === 0;

  // Calculate the total height for vh calculations (700vh for AtomicPageFrame)
  const totalVhHeight = 700;
  
  // If the component is not visible, return null
  if (!isVisible) {
    console.log(`[${customTitle}] Not visible, returning null`);
    return null;
  }

  return (
    <div 
      ref={panelRef}
      className={`fixed z-[10000] text-white bg-black/80 rounded shadow-lg border-2 border-purple-500 ${isMinimized ? 'w-auto' : 'w-80'} ${customClassName}`}
    >
      {/* Header - always visible, used for dragging */}
      <div 
        className="draggable-handle panel-header flex justify-between items-center bg-gray-900/90 px-4 py-2 rounded-t cursor-grab border-b-2 border-purple-500"
        onMouseDown={(e) => {
          // Don't initiate drag if clicking on a button
          if (!e.target.closest('button')) {
            e.preventDefault();
            console.log('[HUD5] Header mouse down - should initiate drag');
          }
        }}
      >
        <h3 className="text-sm font-bold text-purple-300 draggable-handle">{customTitle}</h3>
        <div className="flex gap-1">
          <button 
            onClick={toggleMinimize} 
            className="text-xs px-2 bg-gray-700 hover:bg-gray-600 rounded"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? "+" : "-"}
          </button>
        </div>
      </div>

      {/* Main content - only visible when not minimized */}
      {!isMinimized && (
        <div className="flex flex-col">
          {/* Tab navigation */}
          <div className="flex border-b border-purple-500/30">
            <button
              className={`flex-1 py-2 text-xs font-medium ${activeTab === 'sections' ? 'bg-gray-900/90 text-purple-300' : 'bg-gray-900/40 text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('sections')}
            >
              Sections
            </button>
            <button
              className={`flex-1 py-2 text-xs font-medium ${activeTab === 'scenes' ? 'bg-gray-900/90 text-purple-300' : 'bg-gray-900/40 text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('scenes')}
            >
              Scenes
            </button>
          </div>

          {/* Content area */}
          <div className="p-4">
            {activeTab === 'sections' && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <button 
                    onClick={onToggleEditMode}
                    className={`px-2 py-1 text-xs rounded ${
                      isEditMode 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
                  </button>
                </div>

                {/* Instruction text */}
                {isEditMode && (
                  <div className="mb-3 text-xs text-gray-300 bg-gray-800/30 p-2 rounded border border-purple-500/30">
                    <p>Drag sections to reposition or use controls below.</p>
                    <p>Positions are in viewport height (vh) units.</p>
                    <p>Toggle visibility to help with positioning.</p>
                  </div>
                )}
                
                {/* Global visibility controls */}
                <div className="mb-4 pb-3 border-b border-purple-500/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-purple-200">Visibility:</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={onShowAllSections}
                        className={`px-2 py-1 text-xs rounded ${allVisible ? 'bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                        disabled={allVisible}
                        title="Show all sections"
                      >
                        Show All
                      </button>
                      <button 
                        onClick={onHideAllSections}
                        className={`px-2 py-1 text-xs rounded ${allHidden ? 'bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                        disabled={allHidden}
                        title="Hide all sections"
                      >
                        Hide All
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Global position adjustment */}
                {isEditMode && (
                  <div className="mb-4 pb-3 border-b border-red-500/30">
                    <div className="text-xs text-red-200 mb-1">Adjust All Sections:</div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => sections.forEach(section => onSectionMove(section.id, section.position - 50))}
                        className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-xs rounded flex-1"
                      >
                        Move All Up (50vh)
                      </button>
                      <button 
                        onClick={() => sections.forEach(section => onSectionMove(section.id, section.position + 50))}
                        className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-xs rounded flex-1"
                      >
                        Move All Down (50vh)
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Section list */}
                <div className="max-h-64 overflow-y-auto mb-4">
                  {sections.map(section => {
                    const isHidden = hiddenSections.includes(section.id);
                    return (
                      <div key={section.id} className={`flex items-center my-2 gap-2 text-sm ${isHidden ? 'opacity-50' : ''}`}>
                        <div className="w-24 truncate" title={section.id}>{section.id}</div>
                        <div className="text-xs text-red-300 w-14">{section.position}vh</div>
                        
                        {/* Visibility toggle */}
                        <button 
                          onClick={() => onToggleSectionVisibility(section.id)}
                          className={`px-1 py-0.5 text-xs rounded ${isHidden ? 'bg-gray-600' : 'bg-red-600'}`}
                          title={isHidden ? "Show section" : "Hide section"}
                        >
                          {isHidden ? "👁️" : "✓"}
                        </button>
                        
                        {/* Position controls (only when in edit mode) */}
                        {isEditMode && (
                          <div className="flex-1 flex gap-1">
                            <button 
                              onClick={() => onSectionMove(section.id, section.position - 10)}
                              className="px-2 bg-gray-700 hover:bg-gray-600 rounded flex-1"
                              title="Move up 10vh"
                            >
                              ↑
                            </button>
                            <button 
                              onClick={() => onSectionMove(section.id, section.position + 10)}
                              className="px-2 bg-gray-700 hover:bg-gray-600 rounded flex-1"
                              title="Move down 10vh"
                            >
                              ↓
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {/* Action buttons */}
                {isEditMode && (
                  <div className="flex gap-2">
                    <button 
                      onClick={onSave}
                      className="flex-1 px-2 py-1 bg-red-700 hover:bg-red-600 text-xs rounded"
                      title="Save positions to localStorage"
                    >
                      Save Positions
                    </button>
                    <button
                      onClick={() => {
                        // Format the config in a way it can be pasted directly into code
                        const configStr = JSON.stringify(
                          sections.map(({ id, position }) => ({ id, position })), 
                          null, 
                          2
                        );
                        
                        // Create a temporary textarea to copy to clipboard
                        const el = document.createElement('textarea');
                        el.value = configStr;
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        document.body.removeChild(el);
                        
                        // Alert the user
                        alert('Section configuration copied to clipboard!');
                      }}
                      className="flex-1 px-2 py-1 bg-blue-700 hover:bg-blue-600 text-xs rounded"
                      title="Copy configuration to clipboard"
                    >
                      Export Config
                    </button>
                    <button 
                      onClick={onReset}
                      className="flex-1 px-2 py-1 bg-red-700 hover:bg-red-600 text-xs rounded"
                      title="Reset to original positions"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </>
            )}
            
            {activeTab === 'scenes' && scenes && scenes.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xs text-red-300 font-bold">Scene Boundaries</h3>
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
                  </div>
                </div>
              
                <div className="text-xs mb-2">
                  <div className="text-gray-400">Current: {Math.round(scrollProgress * 100)}%{showVhValues && ` (${Math.round(scrollProgress * totalVhHeight)}vh)`}</div>
                </div>
                
                <div className="flex">
                  {/* Visual timeline */}
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
                  <div className="ml-3 flex-1 space-y-1 max-h-64 overflow-y-auto pr-1">
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
          </div>
        </div>
      )}
    </div>
  );
}

AdvancedControlPanel.propTypes = {
  // Section control props
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired
  })).isRequired,
  onSectionMove: PropTypes.func.isRequired,
  onToggleEditMode: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  hiddenSections: PropTypes.arrayOf(PropTypes.string),
  onToggleSectionVisibility: PropTypes.func.isRequired,
  onShowAllSections: PropTypes.func.isRequired,
  onHideAllSections: PropTypes.func.isRequired,
  
  // Scene debug props
  scenes: PropTypes.array.isRequired,
  scrollProgress: PropTypes.number.isRequired,
  
  // Custom styling
  customClassName: PropTypes.string,
  // Custom title
  customTitle: PropTypes.string
}; 

/**
 * AdvancedControlPanel - Exports the draggable component
 */
const DraggableAdvancedControlPanel = withDraggable(AdvancedControlPanel, {
  defaultPosition: { x: 20, y: 320 },
  zIndex: 10000,
  storageId: 'draggable_advanced_control_panel_position'
});

// Export with the original name expected by HUDSystem.jsx
export default DraggableAdvancedControlPanel;