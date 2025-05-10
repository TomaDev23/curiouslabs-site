/**
 * HUDManager.jsx
 * Component for managing HUD visibility and positions
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import HUD components
import PerformanceMetricsHUD from '../huds/PerformanceMetricsHUD';
import CameraInfoHUD from '../huds/CameraInfoHUD';
import ParticleVisualizerHUD from '../huds/ParticleVisualizerHUD';
import WebGLPipelineHUD from '../huds/WebGLPipelineHUD';
import SceneGraphHUD from '../huds/SceneGraphHUD';
import ShaderInspectorHUD from '../huds/ShaderInspectorHUD';
import FPSMiniHUD from '../huds/FPSMiniHUD';
import GPUTempHUD from '../huds/GPUTempHUD';
import MemoryUsageHUD from '../huds/MemoryUsageHUD';
import AudioSpectrumHUD from '../huds/AudioSpectrumHUD';
import MaterialInspectorHUD from '../huds/MaterialInspectorHUD';
import TimelineAnimationHUD from '../huds/TimelineAnimationHUD';
import NetworkMonitorHUD from '../huds/NetworkMonitorHUD';
import ShaderLabHUD from '../huds/ShaderLabHUD';
import ConsoleLoggerHUD from '../huds/ConsoleLoggerHUD';
import ParticleDesignerHUD from '../huds/ParticleDesignerHUD';
import ComponentInspectorHUD from '../huds/ComponentInspectorHUD';
import RenderingProfilerHUD from '../huds/RenderingProfilerHUD';
import ScrollPositionHUD from '../huds/ScrollPositionHUD';
import HistogramHUD from '../huds/HistogramHUD';
import SystemStatusHUD from '../huds/SystemStatusHUD';
import RouteNavigatorHUD from '../huds/RouteNavigatorHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_hud_manager',
  ui: 'UI5',
  type: 'controller',
  doc: 'contract_hud_manager.md'
};

// Default HUD positions
const DEFAULT_POSITIONS = {
  selector: { x: 20, y: 80 },
  performance: { x: 20, y: 350 },
  camera: { x: 1068, y: 342 },
  particles: { x: 943, y: 47 },
  webgl: { x: 792, y: 47 },
  scene: { x: 1256, y: 47 },
  shader: { x: 1375, y: 342 },
  fpsCounter: { x: 20, y: 20 },
  gpuTemp: { x: 110, y: 20 },
  memoryUsage: { x: 210, y: 20 },
  audioSpectrum: { x: 20, y: 120 },
  materialInspector: { x: 400, y: 100 },
  timelineAnimation: { x: 300, y: 500 },
  networkMonitor: { x: 700, y: 500 },
  shaderLab: { x: 250, y: 50 },
  consoleLogger: { x: 300, y: 300 },
  particleDesigner: { x: 350, y: 100 },
  componentInspector: { x: 400, y: 150 },
  profiler: { x: 450, y: 200 },
  scrollPosition: { x: 580, y: 20 },
  histogram: { x: 280, y: 120 },
  systemStatus: { x: 20, y: 400 },
  routeNavigator: { x: 500, y: 100 }
};

// HUD definitions for different modes
const DEBUG_MODE_HUDS = [
  {
    id: 'performance',
    name: 'Performance Metrics',
    description: 'Monitor renderer performance',
    component: PerformanceMetricsHUD,
    defaultPosition: DEFAULT_POSITIONS.performance
  },
  {
    id: 'camera',
    name: 'Camera Info',
    description: 'View and modify camera settings',
    component: CameraInfoHUD,
    defaultPosition: DEFAULT_POSITIONS.camera
  },
  {
    id: 'webgl',
    name: 'WebGL Pipeline',
    description: 'Inspect WebGL state and operations',
    component: WebGLPipelineHUD,
    defaultPosition: DEFAULT_POSITIONS.webgl
  },
  {
    id: 'scene',
    name: 'Scene Graph',
    description: 'Navigate object hierarchy',
    component: SceneGraphHUD,
    defaultPosition: DEFAULT_POSITIONS.scene
  },
  {
    id: 'shader',
    name: 'Shader Inspector',
    description: 'View active shader programs',
    component: ShaderInspectorHUD,
    defaultPosition: DEFAULT_POSITIONS.shader
  },
  {
    id: 'fpsCounter',
    name: 'FPS Counter',
    description: 'Compact FPS display with alerts',
    component: FPSMiniHUD,
    defaultPosition: DEFAULT_POSITIONS.fpsCounter
  },
  {
    id: 'gpuTemp',
    name: 'GPU Temperature',
    description: 'GPU temperature and usage monitor',
    component: GPUTempHUD,
    defaultPosition: DEFAULT_POSITIONS.gpuTemp
  },
  {
    id: 'memoryUsage',
    name: 'Memory Usage',
    description: 'RAM and VRAM usage monitor',
    component: MemoryUsageHUD,
    defaultPosition: DEFAULT_POSITIONS.memoryUsage
  },
  {
    id: 'audioSpectrum',
    name: 'Audio Spectrum',
    description: 'Audio visualization with spectrum analyzer',
    component: AudioSpectrumHUD,
    defaultPosition: DEFAULT_POSITIONS.audioSpectrum
  },
  {
    id: 'timelineAnimation',
    name: 'Timeline Animation',
    description: 'Control and edit animations with keyframes',
    component: TimelineAnimationHUD,
    defaultPosition: DEFAULT_POSITIONS.timelineAnimation
  },
  {
    id: 'networkMonitor',
    name: 'Network Monitor',
    description: 'Monitor API calls and network performance',
    component: NetworkMonitorHUD,
    defaultPosition: DEFAULT_POSITIONS.networkMonitor
  },
  {
    id: 'histogram',
    name: 'Histogram',
    description: 'Visualize data distribution with configurable histogram',
    component: HistogramHUD,
    defaultPosition: DEFAULT_POSITIONS.histogram
  },
  {
    id: 'systemStatus',
    name: 'System Status',
    description: 'Monitor component health and status',
    component: SystemStatusHUD,
    defaultPosition: DEFAULT_POSITIONS.systemStatus
  }
];

const DEV_MODE_HUDS = [
  {
    id: 'shaderLab',
    name: 'Shader Lab',
    description: 'Real-time GLSL shader editing',
    component: ShaderLabHUD,
    defaultPosition: DEFAULT_POSITIONS.shaderLab,
    available: true
  },
  {
    id: 'consoleLogger',
    name: 'Console & Logger',
    description: 'Interactive console with logging capabilities',
    component: ConsoleLoggerHUD,
    defaultPosition: DEFAULT_POSITIONS.consoleLogger,
    available: true
  },
  {
    id: 'particleDesigner',
    name: 'Particle Designer',
    description: 'Advanced particle system configuration',
    component: ParticleDesignerHUD,
    defaultPosition: DEFAULT_POSITIONS.particleDesigner,
    available: true
  },
  {
    id: 'componentInspector',
    name: 'Component Inspector',
    description: 'View and modify all objects',
    component: ComponentInspectorHUD,
    defaultPosition: DEFAULT_POSITIONS.componentInspector,
    available: true
  },
  {
    id: 'profiler',
    name: 'Rendering Profiler',
    description: 'Detailed performance analysis',
    component: RenderingProfilerHUD,
    defaultPosition: DEFAULT_POSITIONS.profiler,
    available: true
  },
  {
    id: 'particles',
    name: 'Particle Visualizer',
    description: 'View particle system details',
    component: ParticleVisualizerHUD,
    defaultPosition: DEFAULT_POSITIONS.particles,
    available: true
  },
  {
    id: 'materialInspector',
    name: 'Material Inspector',
    description: 'View and edit material properties',
    component: MaterialInspectorHUD,
    defaultPosition: DEFAULT_POSITIONS.materialInspector,
    available: true
  },
  {
    id: 'scrollPosition',
    name: 'Scroll Position',
    description: 'Track scroll position and section visibility',
    component: ScrollPositionHUD,
    defaultPosition: DEFAULT_POSITIONS.scrollPosition,
    available: true
  },
  {
    id: 'routeNavigator',
    name: 'Route Navigator',
    description: 'Visualize and navigate application routes',
    component: RouteNavigatorHUD,
    defaultPosition: DEFAULT_POSITIONS.routeNavigator,
    available: true
  }
];

/**
 * Get available HUDs for the current mode
 */
const getAvailableHudsForMode = (mode) => {
  switch(mode) {
    case 'DEBUG':
      return DEBUG_MODE_HUDS;
    case 'DEV':
      return DEV_MODE_HUDS;
    default:
      return [];
  }
};

/**
 * HUDManager component
 * Manages which HUDs are displayed and coordinates positions
 */
const HUDManager = ({
  activeMode,
  visualParams,
  cameraPosition,
  cameraRotation,
  activeHUDs = ['selector'],
  onToggleHUD
}) => {
  // State for tracking HUD positions
  const [hudPositions, setHudPositions] = useState(DEFAULT_POSITIONS);
  
  // Get available HUDs for the current mode
  const availableHUDs = getAvailableHudsForMode(activeMode);
  
  // Handle position update for a specific HUD
  const handlePositionChange = (hudId, position) => {
    setHudPositions(prev => ({
      ...prev,
      [hudId]: position
    }));
    
    // Save to localStorage with mode prefix
    localStorage.setItem(`cosmic_explorer_${activeMode.toLowerCase()}_positions`, JSON.stringify({
      ...hudPositions,
      [hudId]: position
    }));
  };
  
  // Toggle a specific HUD
  const toggleHUD = (hudId) => {
    if (!onToggleHUD) return;
    
    const newActiveHUDs = activeHUDs.includes(hudId) 
      ? activeHUDs.filter(id => id !== hudId)
      : [...activeHUDs, hudId];
      
    onToggleHUD(newActiveHUDs);
  };
  
  // Load saved positions from localStorage when mode changes
  useEffect(() => {
    try {
      // Load HUD positions for this mode
      const savedPositions = localStorage.getItem(`cosmic_explorer_${activeMode.toLowerCase()}_positions`);
      if (savedPositions) {
        setHudPositions(prev => ({
          ...prev,
          ...JSON.parse(savedPositions)
        }));
      }
    } catch (error) {
      console.error(`Error loading ${activeMode} HUD positions from localStorage:`, error);
    }
  }, [activeMode]);
  
  // Toggle HUDs with keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Quick toggles for specific HUDs with Alt+number
      if (e.altKey && onToggleHUD) {
        if (e.key === '1') {
          toggleHUD('performance');
        }
        if (e.key === '2') {
          toggleHUD('camera');
        }
        if (e.key === '3') {
          toggleHUD('particles');
        }
        if (e.key === '4') {
          toggleHUD('webgl');
        }
        if (e.key === '5') {
          toggleHUD('scene');
        }
        if (e.key === '6') {
          toggleHUD('shader');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggleHUD, activeHUDs]);
  
  // Only show HUDs in DEBUG or DEV mode
  if (activeMode !== 'DEBUG' && activeMode !== 'DEV') {
    return null;
  }
  
  // Find implemented HUDs for the current mode
  const implementedHUDs = availableHUDs.filter(hud => hud.available !== false);
  
  return (
    <div className="hud-manager">
      {/* Render active HUDs */}
      {activeMode === 'DEBUG' && (
        <>
          {/* Performance Metrics HUD */}
          {activeHUDs.includes('performance') && (
            <PerformanceMetricsHUD
              initialPosition={hudPositions.performance || DEFAULT_POSITIONS.performance}
              onPositionChange={(pos) => handlePositionChange('performance', pos)}
              onClose={() => toggleHUD('performance')}
            />
          )}
          
          {/* Camera Info HUD */}
          {activeHUDs.includes('camera') && (
            <CameraInfoHUD
              initialPosition={hudPositions.camera || DEFAULT_POSITIONS.camera}
              onPositionChange={(pos) => handlePositionChange('camera', pos)}
              onClose={() => toggleHUD('camera')}
              cameraPosition={cameraPosition}
              cameraRotation={cameraRotation}
              visualParams={visualParams}
            />
          )}

          {/* WebGL Pipeline HUD */}
          {activeHUDs.includes('webgl') && (
            <WebGLPipelineHUD
              initialPosition={hudPositions.webgl || DEFAULT_POSITIONS.webgl}
              onPositionChange={(pos) => handlePositionChange('webgl', pos)}
              onClose={() => toggleHUD('webgl')}
              visualParams={visualParams}
            />
          )}

          {/* Scene Graph HUD */}
          {activeHUDs.includes('scene') && (
            <SceneGraphHUD
              initialPosition={hudPositions.scene || DEFAULT_POSITIONS.scene}
              onPositionChange={(pos) => handlePositionChange('scene', pos)}
              onClose={() => toggleHUD('scene')}
              visualParams={visualParams}
            />
          )}

          {/* Shader Inspector HUD */}
          {activeHUDs.includes('shader') && (
            <ShaderInspectorHUD
              initialPosition={hudPositions.shader || DEFAULT_POSITIONS.shader}
              onPositionChange={(pos) => handlePositionChange('shader', pos)}
              onClose={() => toggleHUD('shader')}
              visualParams={visualParams}
            />
          )}
          
          {/* FPS Mini HUD */}
          {activeHUDs.includes('fpsCounter') && (
            <FPSMiniHUD
              initialPosition={hudPositions.fpsCounter || DEFAULT_POSITIONS.fpsCounter}
              onPositionChange={(pos) => handlePositionChange('fpsCounter', pos)}
              onClose={() => toggleHUD('fpsCounter')}
            />
          )}
          
          {/* GPU Temperature HUD */}
          {activeHUDs.includes('gpuTemp') && (
            <GPUTempHUD
              initialPosition={hudPositions.gpuTemp || DEFAULT_POSITIONS.gpuTemp}
              onPositionChange={(pos) => handlePositionChange('gpuTemp', pos)}
              onClose={() => toggleHUD('gpuTemp')}
            />
          )}
          
          {/* Memory Usage HUD */}
          {activeHUDs.includes('memoryUsage') && (
            <MemoryUsageHUD
              initialPosition={hudPositions.memoryUsage || DEFAULT_POSITIONS.memoryUsage}
              onPositionChange={(pos) => handlePositionChange('memoryUsage', pos)}
              onClose={() => toggleHUD('memoryUsage')}
            />
          )}
          
          {/* Audio Spectrum HUD */}
          {activeHUDs.includes('audioSpectrum') && (
            <AudioSpectrumHUD
              initialPosition={hudPositions.audioSpectrum || DEFAULT_POSITIONS.audioSpectrum}
              onPositionChange={(pos) => handlePositionChange('audioSpectrum', pos)}
              onClose={() => toggleHUD('audioSpectrum')}
            />
          )}
          
          {/* Timeline Animation HUD */}
          {activeHUDs.includes('timelineAnimation') && (
            <TimelineAnimationHUD
              initialPosition={hudPositions.timelineAnimation || DEFAULT_POSITIONS.timelineAnimation}
              onPositionChange={(pos) => handlePositionChange('timelineAnimation', pos)}
              onClose={() => toggleHUD('timelineAnimation')}
              visualParams={visualParams}
            />
          )}
          
          {/* Network Monitor HUD */}
          {activeHUDs.includes('networkMonitor') && (
            <NetworkMonitorHUD
              initialPosition={hudPositions.networkMonitor || DEFAULT_POSITIONS.networkMonitor}
              onPositionChange={(pos) => handlePositionChange('networkMonitor', pos)}
              onClose={() => toggleHUD('networkMonitor')}
              visualParams={visualParams}
            />
          )}
          
          {/* Histogram HUD */}
          {activeHUDs.includes('histogram') && (
            <HistogramHUD
              initialPosition={hudPositions.histogram || DEFAULT_POSITIONS.histogram}
              onPositionChange={(pos) => handlePositionChange('histogram', pos)}
              onClose={() => toggleHUD('histogram')}
            />
          )}
          
          {/* System Status HUD */}
          {activeHUDs.includes('systemStatus') && (
            <SystemStatusHUD
              initialPosition={hudPositions.systemStatus || DEFAULT_POSITIONS.systemStatus}
              onPositionChange={(pos) => handlePositionChange('systemStatus', pos)}
              onClose={() => toggleHUD('systemStatus')}
            />
          )}
        </>
      )}
      
      {activeMode === 'DEV' && (
        <>
          {/* ShaderLabHUD */}
          {activeHUDs.includes('shaderLab') && (
            <ShaderLabHUD
              key="shaderLab"
              initialPosition={hudPositions.shaderLab || DEFAULT_POSITIONS.shaderLab}
              onPositionChange={(position) => handlePositionChange('shaderLab', position)}
              onClose={() => toggleHUD('shaderLab')}
              visualParams={visualParams}
            />
          )}

          {/* ConsoleLoggerHUD */}
          {activeHUDs.includes('consoleLogger') && (
            <ConsoleLoggerHUD
              key="consoleLogger"
              initialPosition={hudPositions.consoleLogger || DEFAULT_POSITIONS.consoleLogger}
              onPositionChange={(position) => handlePositionChange('consoleLogger', position)}
              onClose={() => toggleHUD('consoleLogger')}
              visualParams={visualParams}
            />
          )}
          
          {/* ParticleDesignerHUD */}
          {activeHUDs.includes('particleDesigner') && (
            <ParticleDesignerHUD
              key="particleDesigner"
              initialPosition={hudPositions.particleDesigner || DEFAULT_POSITIONS.particleDesigner}
              onPositionChange={(position) => handlePositionChange('particleDesigner', position)}
              onClose={() => toggleHUD('particleDesigner')}
              visualParams={visualParams}
            />
          )}
          
          {/* ComponentInspectorHUD */}
          {activeHUDs.includes('componentInspector') && (
            <ComponentInspectorHUD
              key="componentInspector"
              initialPosition={hudPositions.componentInspector || DEFAULT_POSITIONS.componentInspector}
              onPositionChange={(position) => handlePositionChange('componentInspector', position)}
              onClose={() => toggleHUD('componentInspector')}
              visualParams={visualParams}
            />
          )}
          
          {/* RenderingProfilerHUD */}
          {activeHUDs.includes('profiler') && (
            <RenderingProfilerHUD
              key="profiler"
              initialPosition={hudPositions.profiler || DEFAULT_POSITIONS.profiler}
              onPositionChange={(position) => handlePositionChange('profiler', position)}
              onClose={() => toggleHUD('profiler')}
              visualParams={visualParams}
            />
          )}
          
          {/* Particle Visualizer HUD */}
          {activeHUDs.includes('particles') && (
            <ParticleVisualizerHUD
              initialPosition={hudPositions.particles || DEFAULT_POSITIONS.particles}
              onPositionChange={(pos) => handlePositionChange('particles', pos)}
              onClose={() => toggleHUD('particles')}
              visualParams={visualParams}
            />
          )}
          
          {/* Material Inspector HUD */}
          {activeHUDs.includes('materialInspector') && (
            <MaterialInspectorHUD
              initialPosition={hudPositions.materialInspector || DEFAULT_POSITIONS.materialInspector}
              onPositionChange={(pos) => handlePositionChange('materialInspector', pos)}
              onClose={() => toggleHUD('materialInspector')}
              visualParams={visualParams}
            />
          )}
          
          {/* Scroll Position HUD */}
          {activeHUDs.includes('scrollPosition') && (
            <ScrollPositionHUD
              initialPosition={hudPositions.scrollPosition || DEFAULT_POSITIONS.scrollPosition}
              onPositionChange={(pos) => handlePositionChange('scrollPosition', pos)}
              onClose={() => toggleHUD('scrollPosition')}
            />
          )}
          
          {/* Route Navigator HUD */}
          {activeHUDs.includes('routeNavigator') && (
            <RouteNavigatorHUD
              initialPosition={hudPositions.routeNavigator || DEFAULT_POSITIONS.routeNavigator}
              onPositionChange={(pos) => handlePositionChange('routeNavigator', pos)}
              onClose={() => toggleHUD('routeNavigator')}
            />
          )}
          
          {/* If no HUDs are active, show a message */}
          {!activeHUDs.some(hud => DEV_MODE_HUDS.filter(h => h.available).map(h => h.id).includes(hud)) && (
            <div className="coming-soon-message">
              <p>Select DEV tools from the HUD Selector</p>
              <p className="subtext">More developer tools coming soon!</p>
            </div>
          )}
        </>
      )}
      
      {/* Help tooltip */}
      {activeHUDs.some(hud => ['performance', 'camera', 'particles', 'webgl', 'scene', 'shader'].includes(hud)) && (
        <div className="hud-help-tooltip">
          Drag HUDs to reposition | Keyboard shortcuts: <kbd>Alt+1-6</kbd> to toggle HUDs
        </div>
      )}
      
      <style jsx>{`
        .hud-manager {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }
        
        .hud-help-tooltip {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(30, 30, 40, 0.8);
          color: rgba(255, 255, 255, 0.7);
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          pointer-events: none;
          backdrop-filter: blur(5px);
          transition: opacity 0.3s;
          opacity: 0.7;
        }
        
        .hud-help-tooltip:hover {
          opacity: 0.2;
        }
        
        kbd {
          background: rgba(60, 60, 70, 0.8);
          border: 1px solid rgba(100, 100, 120, 0.4);
          border-radius: 3px;
          padding: 1px 4px;
          font-family: monospace;
          font-size: 11px;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }
        
        .coming-soon-message {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(40, 40, 60, 0.8);
          border: 1px solid rgba(70, 80, 180, 0.4);
          color: white;
          padding: 20px 30px;
          border-radius: 8px;
          text-align: center;
          backdrop-filter: blur(8px);
          pointer-events: auto;
          z-index: 1001;
          font-size: 16px;
        }
        
        .coming-soon-message .subtext {
          margin-top: 8px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

HUDManager.propTypes = {
  activeMode: PropTypes.string.isRequired,
  visualParams: PropTypes.object,
  cameraPosition: PropTypes.object,
  cameraRotation: PropTypes.object,
  activeHUDs: PropTypes.array,
  onToggleHUD: PropTypes.func
};

export default HUDManager; 