import React, { Suspense, useState, useEffect, useRef } from 'react';
import { lazy } from 'react';

// Lazy-load LEGIT components
const GalaxyJourney = lazy(() => import('../components/journey/visual/GalaxyJourney/StaticGalaxy'));
const HUDManager = lazy(() => import('../components/cosmic-explorer/core/HUDManager'));
const ModeSwitcher = lazy(() => import('../components/cosmic-explorer/core/ModeSwitcher'));
const HUDSelector = lazy(() => import('../components/cosmic-explorer/core/HUDSelector'));

// LEGIT metadata declaration
export const metadata = {
  id: 'cosmic_rev_page',
  scs: 'SCS5',
  type: 'page',
  doc: 'contract_cosmic_rev_page.md'
};

// Scene presets
const SCENE_PRESETS = {
  dormant: {
    name: "Dormant Galaxy",
    description: "Initial tranquil state before cosmic awakening"
  },
  awakening: {
    name: "Awakening",
    description: "The beginning of cosmic activation - stars intensify"
  },
  cosmicReveal: {
    name: "Cosmic Reveal",
    description: "Full galaxy appears with nebula effects"
  },
  cosmicFlight: {
    name: "Cosmic Flight",
    description: "Traveling through the galaxy at high speed"
  }
};

// Explorer mode definitions
const EXPLORER_MODES = {
  SHOW: {
    label: 'SHOW',
    description: 'Professional sequence visualization'
  },
  SANDBOX: {
    label: 'SANDBOX',
    description: 'Interactive parameter adjustment'
  },
  DEBUG: {
    label: 'DEBUG',
    description: 'Technical visualization overlays'
  },
  DEV: {
    label: 'DEV',
    description: 'Advanced developer tools'
  }
};

/**
 * CosmicRevDev - Static 3D galaxy space experience
 * Creates a non-scrolling, fixed viewport experience with galaxy visualization
 */
const CosmicRevDev = () => {
  // Explorer mode state
  const [explorerMode, setExplorerMode] = useState('SHOW');

  // Camera and scene state for HUDs
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 30 });
  const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0, z: 0 });

  // Original states
  const [selectedScene, setSelectedScene] = useState('cosmicReveal');
  const [sceneProgress, setSceneProgress] = useState(0.5);
  const [showControls, setShowControls] = useState(true);
  const [activeTab, setActiveTab] = useState('scene');
  
  // 🛠️ ADDED: Camera movement toggle state
  const [cameraMovementEnabled, setCameraMovementEnabled] = useState(true);
  
  // Active HUDs state
  const [activeHUDs, setActiveHUDs] = useState(['selector']);
  
  // Visual parameter states
  const [visualParams, setVisualParams] = useState({
    starCount: 3000,
    galaxyCount: 15000,
    cameraDistance: 30,
    rotation: 0,
    brightness: 1.0,
    colorShift: 0
  });

  // Load active HUDs from localStorage when mode changes
  useEffect(() => {
    try {
      const savedActiveHUDs = localStorage.getItem(`cosmic_explorer_${explorerMode.toLowerCase()}_huds`);
      if (savedActiveHUDs) {
        setActiveHUDs(JSON.parse(savedActiveHUDs));
      } else {
        // Default to showing selector HUD
        setActiveHUDs(['selector']);
      }
    } catch (error) {
      console.error('Error loading HUD state from localStorage:', error);
    }
  }, [explorerMode]);
  
  // Handle explorer mode change
  const handleModeChange = (newMode) => {
    setExplorerMode(newMode);
    
    // Switch to appropriate tab based on mode
    switch(newMode) {
      case 'SHOW':
        setActiveTab('scene');
        break;
      case 'SANDBOX':
        setActiveTab('visual');
        break;
      case 'DEBUG':
        // Show only the selector HUD when switching to DEBUG mode
        setActiveHUDs(['selector']);
        
        // Save to localStorage for persistence
        try {
          localStorage.setItem(`cosmic_explorer_${newMode.toLowerCase()}_huds`, JSON.stringify(['selector']));
        } catch (error) {
          console.error('Error saving HUD state to localStorage:', error);
        }
        break;
      case 'DEV':
        // These will have custom UI later
        break;
      default:
        break;
    }
  };

  // Handle galaxy state change
  const handleGalaxyStateChange = (stateData) => {
    if (stateData) {
      if (stateData.cameraPosition) setCameraPosition(stateData.cameraPosition);
      if (stateData.cameraRotation) setCameraRotation(stateData.cameraRotation);
    }
  };

  // Handle HUD toggling
  const handleToggleHUD = (newActiveHUDs) => {
    setActiveHUDs(newActiveHUDs);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem(`cosmic_explorer_${explorerMode.toLowerCase()}_huds`, JSON.stringify(newActiveHUDs));
    } catch (error) {
      console.error('Error saving HUD state to localStorage:', error);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle controls with 'c' key
      if (e.key === 'c') {
        setShowControls(prev => !prev);
      }
      
      // Switch tabs with number keys
      if (e.key === '1') setActiveTab('scene');
      if (e.key === '2') setActiveTab('camera');
      if (e.key === '3') setActiveTab('visual');
      if (e.key === '4') setActiveTab('mode');
      
      // Explorer mode shortcuts
      if (e.shiftKey) {
        if (e.key === '1') setExplorerMode('SHOW');
        if (e.key === '2') setExplorerMode('SANDBOX');
        if (e.key === '3') setExplorerMode('DEBUG');
        if (e.key === '4') setExplorerMode('DEV');
      }
      
      // Save preset with 's' key
      if (e.key === 's') {
        const savedState = {
          scene: selectedScene,
          progress: sceneProgress,
          visualParams,
          explorerMode
        };
        localStorage.setItem('cosmicRevState', JSON.stringify(savedState));
        alert('Current state saved!');
      }
      
      // Load preset with 'l' key
      if (e.key === 'l') {
        try {
          const savedState = JSON.parse(localStorage.getItem('cosmicRevState'));
          if (savedState) {
            setSelectedScene(savedState.scene || 'cosmicReveal');
            setSceneProgress(savedState.progress || 0.5);
            setVisualParams(savedState.visualParams || visualParams);
            if (savedState.explorerMode) setExplorerMode(savedState.explorerMode);
            alert('Saved state loaded!');
          }
        } catch (e) {
          console.error('Error loading saved state:', e);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedScene, sceneProgress, visualParams, explorerMode]);

  const handleVisualParamChange = (param, value) => {
    setVisualParams(prev => ({
      ...prev,
      [param]: value
    }));

    // Update camera position for HUDs when changing distance or rotation
    if (param === 'cameraDistance' || param === 'rotation') {
      const distance = param === 'cameraDistance' ? value : visualParams.cameraDistance;
      const rotation = param === 'rotation' ? value * (Math.PI / 180) : visualParams.rotation * (Math.PI / 180);
      
      setCameraPosition({
        x: Math.sin(rotation) * distance,
        y: 0,
        z: Math.cos(rotation) * distance
      });
      
      setCameraRotation({
        x: 0,
        y: rotation,
        z: 0
      });
    }
  };

  // Generate HUD selector content for ModeSwitcher to use
  const renderHUDSelectorContent = () => {
    return (
      <Suspense fallback={<div className="p-2 text-white text-xs">Loading HUD Selector...</div>}>
        <HUDSelector
          mode={explorerMode}
          activeHUDs={activeHUDs}
          onToggleHUD={handleToggleHUD}
          visualParams={visualParams}
        />
      </Suspense>
    );
  };

  return (
    <div id="cosmic-rev-container" className="h-screen w-screen overflow-hidden relative bg-black">
      {/* Fixed background */}
      <div className="fixed inset-0 bg-black z-0" />
      
      {/* Title bar */}
      <div className="fixed top-0 left-0 w-full bg-black/60 p-2 flex justify-between items-center z-50">
        <h1 className="text-white text-2xl font-bold ml-4">Cosmic Galaxy Explorer</h1>
        <div className="text-white opacity-50 mr-4 text-sm">
          Press 'c' to toggle controls | 's' to save | 'l' to load
        </div>
      </div>
      
      {/* Galaxy Journey Component */}
      <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center text-white">Loading Galaxy...</div>}>
        <GalaxyJourney 
          scene={selectedScene} 
          progress={sceneProgress} 
          isDebug={explorerMode === 'DEBUG'} // Now uses explorer mode
          options={{
            starCount: visualParams.starCount,
            galaxyCount: visualParams.galaxyCount,
            cameraDistance: visualParams.cameraDistance,
            rotation: visualParams.rotation,
            brightness: visualParams.brightness,
            colorShift: visualParams.colorShift,
            cameraMovementEnabled
          }}
          onStateChange={handleGalaxyStateChange}
        />
      </Suspense>
      
      {/* 🛠️ ADDED: Camera movement toggle button */}
      <button
        onClick={() => setCameraMovementEnabled(prev => !prev)}
        className="fixed top-4 right-4 z-[9999] px-5 py-3 bg-black bg-opacity-80 text-white rounded-md shadow-lg hover:bg-opacity-90 transition-all"
        style={{
          border: '3px solid rgba(100, 200, 255, 0.8)',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 0 20px rgba(100, 200, 255, 0.6)',
          cursor: 'pointer'
        }}
      >
        {cameraMovementEnabled ? '🛑 Stop Camera' : '▶️ Start Camera'}
      </button>
      
      {/* HUD Manager */}
      <Suspense fallback={<div className="fixed top-5 right-5 bg-black/60 p-2 rounded text-xs text-white">Loading HUDs...</div>}>
        <HUDManager
          activeMode={explorerMode}
          visualParams={visualParams}
          cameraPosition={cameraPosition}
          cameraRotation={cameraRotation}
          activeHUDs={activeHUDs}
          onToggleHUD={handleToggleHUD}
        />
      </Suspense>
      
      {/* Mode indicator for DEBUG and DEV modes */}
      {(explorerMode === 'DEBUG' || explorerMode === 'DEV') && (
        <div className="fixed top-4 right-4 bg-black/60 py-1 px-3 text-xs font-mono text-white rounded-full z-40">
          {explorerMode} MODE
        </div>
      )}
      
      {/* Scene Controls with ModeSwitcher at the top */}
      {showControls && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 rounded-lg max-w-2xl w-full">
          {/* ModeSwitcher component */}
          <Suspense fallback={<div className="p-3 text-center text-white text-sm">Loading mode switcher...</div>}>
            <ModeSwitcher
              currentMode={explorerMode}
              onModeChange={handleModeChange}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              hudSelectorContent={renderHUDSelectorContent()}
            />
          </Suspense>
          
          {/* Only show these controls for SHOW and SANDBOX modes */}
          {(explorerMode === 'SHOW' || explorerMode === 'SANDBOX') && (
            <div className="p-4 pt-0">
              {/* Scene tab */}
              {activeTab === 'scene' && (
                <>
                  <p className="text-gray-300 text-sm mb-4">{SCENE_PRESETS[selectedScene]?.description}</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {Object.keys(SCENE_PRESETS).map(scene => (
                      <button
                        key={scene}
                        className={`px-3 py-1 rounded ${selectedScene === scene ? 'bg-green-500' : 'bg-gray-600'}`}
                        onClick={() => setSelectedScene(scene)}
                      >
                        {SCENE_PRESETS[scene].name}
                      </button>
                    ))}
                  </div>
                  
                  <div className="w-full px-2">
                    <label className="text-white text-sm block mb-1">
                      Scene Progress: {(sceneProgress * 100).toFixed(0)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={sceneProgress}
                      onChange={(e) => setSceneProgress(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </>
              )}
              
              {/* Camera tab */}
              {activeTab === 'camera' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm block mb-1">
                        Camera Distance: {visualParams.cameraDistance}
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        step="1"
                        value={visualParams.cameraDistance}
                        onChange={(e) => handleVisualParamChange('cameraDistance', parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="text-white text-sm block mb-1">
                        Rotation: {visualParams.rotation}°
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        value={visualParams.rotation}
                        onChange={(e) => handleVisualParamChange('rotation', parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      className="px-4 py-2 bg-blue-800 rounded"
                      onClick={() => handleVisualParamChange('rotation', (visualParams.rotation + 45) % 360)}
                    >
                      Rotate +45°
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-800 rounded"
                      onClick={() => handleVisualParamChange('cameraDistance', 30)}
                    >
                      Reset Camera
                    </button>
                  </div>
                </>
              )}
              
              {/* Visual tab */}
              {activeTab === 'visual' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm block mb-1">
                      Star Count: {visualParams.starCount}
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="500"
                      value={visualParams.starCount}
                      onChange={(e) => handleVisualParamChange('starCount', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white text-sm block mb-1">
                      Galaxy Particles: {visualParams.galaxyCount}
                    </label>
                    <input
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      value={visualParams.galaxyCount}
                      onChange={(e) => handleVisualParamChange('galaxyCount', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white text-sm block mb-1">
                      Brightness: {visualParams.brightness.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="2.0"
                      step="0.1"
                      value={visualParams.brightness}
                      onChange={(e) => handleVisualParamChange('brightness', parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white text-sm block mb-1">
                      Color Shift: {visualParams.colorShift}
                    </label>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      step="10"
                      value={visualParams.colorShift}
                      onChange={(e) => handleVisualParamChange('colorShift', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              )}
              
              {/* Mode tab - removed as redundant, now handled by ModeSwitcher */}
            </div>
          )}
          
          {/* Keyboard shortcut hint at the bottom */}
          <div className="text-xs text-center text-gray-500 pb-2">
            Shift+1-4: Switch modes | Alt+1-2: Toggle HUDs | `: Toggle HUD selector
          </div>
        </div>
      )}
      
      {/* Current scene name */}
      <div className="fixed top-1/2 transform -translate-y-1/2 right-8 text-lg text-white opacity-60 z-10 font-mono">
        <div className="text-green-400">{explorerMode === 'SHOW' && selectedScene && SCENE_PRESETS[selectedScene]?.name}</div>
        <div>{explorerMode === 'SHOW' && <div className="text-xs">Scene Progress: {(sceneProgress * 100).toFixed(0)}%</div>}</div>
      </div>
    </div>
  );
};

export default CosmicRevDev; 