/**
 * CameraInfoHUD.jsx
 * Camera information and control HUD for planet-sandbox
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Vector3 } from 'three';
import DraggableHUD from './base/DraggableHUD';

/**
 * CameraInfoHUD component
 * Displays camera position, rotation, and provides controls for camera movement
 */
const CameraInfoHUD = ({
  initialPosition = { x: 20, y: 80 },
  onPositionChange,
  onClose,
  cameraPosition = new Vector3(0, 20, 50),
  cameraTarget = new Vector3(0, 0, 0),
  fov = 50,
  onUpdatePosition,
  onUpdateTarget,
  onUpdateFOV,
  // New props for advanced camera controls
  cameraMode = 'overview',
  targetObject = null,
  cameraSettings = {
    distance: 50,
    height: 20,
    fov: 50,
    tilt: 0,
    damping: 0.05
  },
  onCameraModeChange,
  onTargetObjectChange,
  onCameraSettingsChange,
  planetList = [],
  onApplyZoomPreset,
  onStartCinematic,
  onStartCinematicOrbit
}) => {
  // Camera control states
  const [activePreset, setActivePreset] = useState('default');
  const [activeTab, setActiveTab] = useState('position');
  
  // Function to format numbers nicely
  const formatNumber = (num, decimals = 2) => {
    return typeof num === 'number' 
      ? num.toFixed(decimals) 
      : (num?.toFixed ? num.toFixed(decimals) : 'N/A');
  };
  
  // Handle camera mode change with additional logic for mode-aware presets
  const handleCameraModeChange = (mode) => {
    if (onCameraModeChange) {
      onCameraModeChange(mode);
      
      // Implement mode-aware preset behaviors
      if (mode === 'orbit' && !targetObject && planetList.length > 0) {
        // When switching to orbit mode, auto-select a target if none is selected
        const defaultTarget = planetList.includes('earth') ? 'earth' : planetList[0];
        handleTargetObjectChange(defaultTarget);
      } else if (mode === 'overview') {
        // When switching to overview, clear the target selection
        handleTargetObjectChange(null);
      }
    }
  };
  
  // Handle target object change with auto mode switching
  const handleTargetObjectChange = (target) => {
    if (onTargetObjectChange) {
      onTargetObjectChange(target);
      
      // When target is manually changed to a specific object, auto-switch to orbit mode
      if (target && cameraMode !== 'orbit' && onCameraModeChange) {
        onCameraModeChange('orbit');
      }
    }
  };
  
  // Handle camera settings change
  const handleCameraSettingsChange = (key, value) => {
    if (onCameraSettingsChange) {
      // Parse numeric values properly
      const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(parsedValue)) {
        onCameraSettingsChange({
          ...cameraSettings,
          [key]: parsedValue
        });
      }
    }
  };
  
  // Properly handle zoom preset application
  const handleApplyZoomPreset = (preset) => {
    if (onApplyZoomPreset) {
      // First ensure camera is in orbit mode for zoom presets
      if (cameraMode !== 'orbit') {
        // Switch to orbit mode before applying presets
        handleCameraModeChange('orbit');
      }
      
      // Ensure there's a target object
      if (!targetObject && planetList.length > 0) {
        // Set a default target (sun or first planet in list)
        const defaultTarget = planetList.includes('sun') ? 'sun' : planetList[0];
        if (onTargetObjectChange) {
          onTargetObjectChange(defaultTarget);
        }
      }
      
      // Now apply the zoom preset
      onApplyZoomPreset(preset);
      
      // Force FOV update directly
      switch(preset) {
        case 'wide':
          if (onUpdateFOV) onUpdateFOV(70);
          break;
        case 'medium':
          if (onUpdateFOV) onUpdateFOV(50);
          break;
        case 'close':
          if (onUpdateFOV) onUpdateFOV(35);
          break;
      }
    }
  };
  
  // Camera presets
  const cameraPresets = [
    { 
      id: 'default', 
      name: 'Default View',
      position: new Vector3(0, 20, 50),
      target: new Vector3(0, 0, 0),
      fov: 50
    },
    { 
      id: 'top', 
      name: 'Top Down',
      position: new Vector3(0, 100, 0),
      target: new Vector3(0, 0, 0),
      fov: 45
    },
    { 
      id: 'side', 
      name: 'Side View',
      position: new Vector3(80, 10, 0),
      target: new Vector3(0, 0, 0),
      fov: 50
    },
    { 
      id: 'cinematic', 
      name: 'Cinematic',
      position: new Vector3(30, 15, 45),
      target: new Vector3(0, 0, 0),
      fov: 35
    }
  ];
  
  // Apply camera preset
  const applyPreset = (presetId) => {
    const preset = cameraPresets.find(p => p.id === presetId);
    if (preset) {
      setActivePreset(preset.id);
      
      // Update camera position, target and FOV
      if (onUpdatePosition) onUpdatePosition(preset.position);
      if (onUpdateTarget) onUpdateTarget(preset.target);
      if (onUpdateFOV) onUpdateFOV(preset.fov);
      
      // When applying a preset, switch to overview mode
      if (onCameraModeChange) onCameraModeChange('overview');
    }
  };
  
  // Handle position change
  const handlePositionChange = (axis, value) => {
    if (!onUpdatePosition) return;
    
    const newPosition = new Vector3().copy(cameraPosition);
    newPosition[axis] = parseFloat(value);
    onUpdatePosition(newPosition);
  };
  
  // Handle target change
  const handleTargetChange = (axis, value) => {
    if (!onUpdateTarget) return;
    
    const newTarget = new Vector3().copy(cameraTarget);
    newTarget[axis] = parseFloat(value);
    onUpdateTarget(newTarget);
  };
  
  // Handle FOV change
  const handleFOVChange = (value) => {
    if (onUpdateFOV) {
      onUpdateFOV(parseFloat(value));
    }
  };
  
  // Field of view visualization
  const fovVisualization = () => {
    const maxFOV = 120;
    const fovAngle = Math.min(fov, maxFOV);
    const halfAngle = (fovAngle / 2) * (Math.PI / 180);
    const visualFactor = 75; // scale factor
    
    // Calculate the endpoints of the FOV visualization lines
    const endX = Math.sin(halfAngle) * visualFactor;
    const endZ = Math.cos(halfAngle) * visualFactor;
    
    return {
      leftLine: { x1: 0, z1: 0, x2: -endX, z2: endZ },
      rightLine: { x1: 0, z1: 0, x2: endX, z2: endZ }
    };
  };
  
  const fovLines = fovVisualization();
  
  // Effect to update FOV in camera settings when main FOV changes
  useEffect(() => {
    if (onCameraSettingsChange && Math.abs(fov - cameraSettings.fov) > 0.1) {
      handleCameraSettingsChange('fov', fov);
    }
  }, [fov]);
  
  // Effect to ensure we have a target when in orbit mode
  useEffect(() => {
    if (cameraMode === 'orbit' && !targetObject && planetList.length > 0) {
      const defaultTarget = planetList.includes('earth') ? 'earth' : planetList[0];
      handleTargetObjectChange(defaultTarget);
    }
  }, [cameraMode, targetObject, planetList]);
  
  return (
    <DraggableHUD
      title="Camera Controls"
      onClose={onClose}
      width={340}
    >
      <div className="p-4 bg-gray-900 text-white">
        {/* Tab navigation */}
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-3 py-1 ${activeTab === 'position' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('position')}
          >
            Position
          </button>
          <button
            className={`px-3 py-1 ${activeTab === 'target' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('target')}
          >
            Target
          </button>
          <button
            className={`px-3 py-1 ${activeTab === 'advanced' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced
          </button>
          <button
            className={`px-3 py-1 ${activeTab === 'presets' ? 'bg-blue-900 text-white' : 'bg-gray-800 text-gray-300'}`}
            onClick={() => setActiveTab('presets')}
          >
            Presets
          </button>
        </div>
        
        {/* Position controls */}
        {activeTab === 'position' && (
          <div className="mb-4">
            <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Position</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-6 text-xs">X</div>
                <input
                  type="range"
                  min="-300"
                  max="300"
                  step="1"
                  value={cameraPosition.x}
                  onChange={(e) => handlePositionChange('x', e.target.value)}
                  className="flex-1 mx-2"
                />
                <div className="w-14 text-right text-xs">{formatNumber(cameraPosition.x)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 text-xs">Y</div>
                <input
                  type="range"
                  min="-50"
                  max="150"
                  step="1"
                  value={cameraPosition.y}
                  onChange={(e) => handlePositionChange('y', e.target.value)}
                  className="flex-1 mx-2"
                />
                <div className="w-14 text-right text-xs">{formatNumber(cameraPosition.y)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 text-xs">Z</div>
                <input
                  type="range"
                  min="-300"
                  max="300"
                  step="1"
                  value={cameraPosition.z}
                  onChange={(e) => handlePositionChange('z', e.target.value)}
                  className="flex-1 mx-2"
                />
                <div className="w-14 text-right text-xs">{formatNumber(cameraPosition.z)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 text-xs">FOV</div>
                <input
                  type="range"
                  min="20"
                  max="110"
                  step="1"
                  value={fov}
                  onChange={(e) => handleFOVChange(e.target.value)}
                  className="flex-1 mx-2"
                />
                <div className="w-14 text-right text-xs">{formatNumber(fov, 0)}°</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Target controls */}
        {activeTab === 'target' && (
          <div className="mb-4">
            <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Look At</div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-6 text-xs">X</div>
                <input
                  type="range"
                  min="-300"
                  max="300"
                  step="1"
                  value={cameraTarget.x}
                  onChange={(e) => handleTargetChange('x', e.target.value)}
                  className="flex-1 mx-2"
                />
                <div className="w-14 text-right text-xs">{formatNumber(cameraTarget.x)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 text-xs">Y</div>
                <input
                  type="range"
                  min="-50"
                  max="150"
                  step="1"
                  value={cameraTarget.y}
                  onChange={(e) => handleTargetChange('y', e.target.value)}
                  className="flex-1 mx-2"
                />
                <div className="w-14 text-right text-xs">{formatNumber(cameraTarget.y)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-6 text-xs">Z</div>
                <input
                  type="range"
                  min="-300"
                  max="300"
                  step="1"
                  value={cameraTarget.z}
                  onChange={(e) => handleTargetChange('z', e.target.value)}
                  className="flex-1 mx-2"
                />
                <div className="w-14 text-right text-xs">{formatNumber(cameraTarget.z)}</div>
              </div>
            </div>
            
            {/* FOV Visualization */}
            <div className="mt-4">
              <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Field of View</div>
              <div className="mt-2 h-24 bg-gray-800 rounded relative overflow-hidden">
                <svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <line 
                    x1={fovLines.leftLine.x1} 
                    y1={-fovLines.leftLine.z1} 
                    x2={fovLines.leftLine.x2} 
                    y2={-fovLines.leftLine.z2} 
                    stroke="rgba(255, 255, 255, 0.6)" 
                    strokeWidth="1" 
                  />
                  <line 
                    x1={fovLines.rightLine.x1} 
                    y1={-fovLines.rightLine.z1} 
                    x2={fovLines.rightLine.x2} 
                    y2={-fovLines.rightLine.z2} 
                    stroke="rgba(255, 255, 255, 0.6)" 
                    strokeWidth="1" 
                  />
                  <path 
                    d={`M ${fovLines.leftLine.x2} ${-fovLines.leftLine.z2} A 75 75 0 0 1 ${fovLines.rightLine.x2} ${-fovLines.rightLine.z2}`} 
                    fill="none" 
                    stroke="rgba(255, 255, 255, 0.3)" 
                    strokeWidth="1" 
                    strokeDasharray="2,2"
                  />
                  <circle cx="0" cy="0" r="5" fill="rgba(255, 255, 255, 0.8)" />
                  <text x="10" y="5" fill="white" fontSize="10px">Camera</text>
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Advanced controls */}
        {activeTab === 'advanced' && (
          <div className="mb-4">
            <div className="space-y-4">
              {/* Camera Mode */}
              <div>
                <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Camera Mode</div>
                <div className="flex space-x-2 mt-2">
                  <button
                    className={`px-3 py-1 text-xs rounded ${cameraMode === 'overview' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => handleCameraModeChange('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded ${cameraMode === 'orbit' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => handleCameraModeChange('orbit')}
                  >
                    Orbit
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded ${cameraMode === 'cinematic-orbit' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => handleCameraModeChange('cinematic-orbit')}
                  >
                    Cinematic
                  </button>
                  <button
                    className={`px-3 py-1 text-xs rounded ${cameraMode === 'cinematic' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => handleCameraModeChange('cinematic')}
                  >
                    Tour
                  </button>
                </div>
              </div>
              
              {/* Target Object */}
              <div>
                <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Target Object</div>
                <select
                  className="w-full bg-gray-800 text-white px-2 py-1 rounded text-sm"
                  value={targetObject || ''}
                  onChange={(e) => handleTargetObjectChange(e.target.value)}
                >
                  <option value="">None</option>
                  {planetList.map((planet) => (
                    <option key={planet} value={planet}>
                      {planet.charAt(0).toUpperCase() + planet.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Camera Settings */}
              <div>
                <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Camera Settings</div>
                <div className="space-y-2">
                  {/* Distance */}
                  <div className="flex items-center">
                    <div className="w-16 text-xs">Distance</div>
                    <input
                      type="range"
                      min="5"
                      max="200"
                      step="1"
                      value={cameraSettings.distance}
                      onChange={(e) => handleCameraSettingsChange('distance', e.target.value)}
                      className="flex-1 mx-2"
                    />
                    <div className="w-14 text-right text-xs">{formatNumber(cameraSettings.distance)}</div>
                  </div>
                  
                  {/* Height */}
                  <div className="flex items-center">
                    <div className="w-16 text-xs">Height</div>
                    <input
                      type="range"
                      min="-50"
                      max="50"
                      step="1"
                      value={cameraSettings.height}
                      onChange={(e) => handleCameraSettingsChange('height', e.target.value)}
                      className="flex-1 mx-2"
                    />
                    <div className="w-14 text-right text-xs">{formatNumber(cameraSettings.height)}</div>
                  </div>
                  
                  {/* Tilt */}
                  <div className="flex items-center">
                    <div className="w-16 text-xs">Tilt</div>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      step="1"
                      value={cameraSettings.tilt}
                      onChange={(e) => handleCameraSettingsChange('tilt', e.target.value)}
                      className="flex-1 mx-2"
                    />
                    <div className="w-14 text-right text-xs">{formatNumber(cameraSettings.tilt)}°</div>
                  </div>
                  
                  {/* FOV */}
                  <div className="flex items-center">
                    <div className="w-16 text-xs">FOV</div>
                    <input
                      type="range"
                      min="30"
                      max="90"
                      step="1"
                      value={cameraSettings.fov}
                      onChange={(e) => handleCameraSettingsChange('fov', e.target.value)}
                      className="flex-1 mx-2"
                    />
                    <div className="w-14 text-right text-xs">{formatNumber(cameraSettings.fov)}°</div>
                  </div>
                  
                  {/* Damping */}
                  <div className="flex items-center">
                    <div className="w-16 text-xs">Smoothness</div>
                    <input
                      type="range"
                      min="0.01"
                      max="0.2"
                      step="0.01"
                      value={cameraSettings.damping}
                      onChange={(e) => handleCameraSettingsChange('damping', e.target.value)}
                      className="flex-1 mx-2"
                    />
                    <div className="w-14 text-right text-xs">{formatNumber(cameraSettings.damping, 2)}</div>
                  </div>
                  
                  {/* Orbit Speed */}
                  <div className="flex items-center">
                    <div className="w-16 text-xs">Orbit Speed</div>
                    <input
                      type="range"
                      min="0.01"
                      max="1"
                      step="0.01"
                      value={cameraSettings.orbitSpeed || 0.1}
                      onChange={(e) => handleCameraSettingsChange('orbitSpeed', e.target.value)}
                      className="flex-1 mx-2"
                    />
                    <div className="w-14 text-right text-xs">{formatNumber(cameraSettings.orbitSpeed || 0.1, 2)}</div>
                  </div>
                </div>
              </div>
              
              {/* Zoom Presets */}
              <div>
                <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Zoom Presets</div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <button
                    className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600"
                    onClick={() => handleApplyZoomPreset('wide')}
                  >
                    Wide
                  </button>
                  <button
                    className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600"
                    onClick={() => handleApplyZoomPreset('medium')}
                  >
                    Medium
                  </button>
                  <button
                    className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600"
                    onClick={() => handleApplyZoomPreset('close')}
                  >
                    Close
                  </button>
                </div>
              </div>
              
              {/* Cinematic Tour Button */}
              <div className="mt-4">
                <button
                  className="w-full px-3 py-2 text-sm rounded bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => onStartCinematic && onStartCinematic()}
                >
                  Start Cinematic Tour
                </button>
              </div>
              
              {/* Cinematic Orbit Button */}
              <div className="mt-2">
                <button
                  className="w-full px-3 py-2 text-sm rounded bg-purple-600 hover:bg-purple-700"
                  onClick={() => onStartCinematicOrbit && onStartCinematicOrbit()}
                >
                  Start Cinematic Orbit
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Camera Presets */}
        {activeTab === 'presets' && (
          <div>
            <div className="text-sm font-bold mb-2 border-b border-gray-700 pb-1">Camera Presets</div>
            <div className="grid grid-cols-2 gap-2">
              {cameraPresets.map(preset => (
                <button
                  key={preset.id}
                  className={`px-3 py-1 text-xs rounded ${activePreset === preset.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  onClick={() => applyPreset(preset.id)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </DraggableHUD>
  );
};

CameraInfoHUD.propTypes = {
  initialPosition: PropTypes.object,
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  cameraPosition: PropTypes.object,
  cameraTarget: PropTypes.object,
  fov: PropTypes.number,
  onUpdatePosition: PropTypes.func,
  onUpdateTarget: PropTypes.func,
  onUpdateFOV: PropTypes.func,
  // New prop types for advanced camera controls
  cameraMode: PropTypes.string,
  targetObject: PropTypes.string,
  cameraSettings: PropTypes.object,
  onCameraModeChange: PropTypes.func,
  onTargetObjectChange: PropTypes.func,
  onCameraSettingsChange: PropTypes.func,
  planetList: PropTypes.array,
  onApplyZoomPreset: PropTypes.func,
  onStartCinematic: PropTypes.func,
  onStartCinematicOrbit: PropTypes.func
};

// Export the component as default
export default CameraInfoHUD;