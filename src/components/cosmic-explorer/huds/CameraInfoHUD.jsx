/**
 * CameraInfoHUD.jsx
 * Camera information and settings display
 * LEGIT compliance: UI5
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_camera_info_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_camera_info_hud.md'
};

/**
 * CameraInfoHUD component
 * Displays camera position, rotation and scene settings
 */
const CameraInfoHUD = ({
  initialPosition = { x: 20, y: 220 },
  onPositionChange,
  onClose,
  cameraPosition = { x: 0, y: 0, z: 30 },
  cameraRotation = { x: 0, y: 0, z: 0 },
  fov = 75,
  visualParams = {}
}) => {
  // Extract visual parameters with defaults
  const {
    starCount = 3000,
    galaxyCount = 15000,
    brightness = 1.0,
    colorShift = 0
  } = visualParams;
  
  // Camera control states
  const [activePreset, setActivePreset] = useState('default');
  
  // Function to format numbers nicely
  const formatNumber = (num, decimals = 2) => {
    return typeof num === 'number' 
      ? num.toFixed(decimals) 
      : 'N/A';
  };
  
  // Camera presets
  const cameraPresets = [
    { id: 'default', name: 'Default View' },
    { id: 'top', name: 'Top Down' },
    { id: 'side', name: 'Side View' },
    { id: 'cinematic', name: 'Cinematic' }
  ];
  
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
  
  return (
    <DraggableHUD
      title="Camera & Scene Info"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={370}
    >
      <div className="camera-info-container">
        {/* Top row: Position & Rotation + 3D Visualization */}
        <div className="top-row">
          {/* Position & Rotation */}
          <div className="position-rotation-section">
            <div className="section-title">Position & Rotation</div>
            <div className="info-grid">
              <div className="info-row">
                <div className="info-label">Position</div>
                <div className="values-triple">
                  <span className="axis-x">{formatNumber(cameraPosition.x)}</span>
                  <span className="axis-y">{formatNumber(cameraPosition.y)}</span>
                  <span className="axis-z">{formatNumber(cameraPosition.z)}</span>
                </div>
              </div>
              
              <div className="info-row">
                <div className="info-label">Rotation</div>
                <div className="values-triple">
                  <span className="axis-x">{formatNumber(cameraRotation.x * (180/Math.PI))}</span>
                  <span className="axis-y">{formatNumber(cameraRotation.y * (180/Math.PI))}</span>
                  <span className="axis-z">{formatNumber(cameraRotation.z * (180/Math.PI))}</span>
                </div>
              </div>
              
              <div className="info-row">
                <div className="info-label">FOV</div>
                <div className="info-value">{formatNumber(fov, 0)}°</div>
              </div>
            </div>
          </div>
          
          {/* 3D Visualization */}
          <div className="visualization-container">
            <div className="coordinate-system">
              <div className="axis x-axis"></div>
              <div className="axis y-axis"></div>
              <div className="axis z-axis"></div>
              <div className="camera-orientation">
                {/* FOV Visualization */}
                <svg className="fov-visualization" viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
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
        </div>
        
        {/* Middle row: Camera Controls + Scene Parameters */}
        <div className="middle-row">
          {/* Camera Controls */}
          <div className="camera-controls-section">
            <div className="section-title">Camera Controls</div>
            <div className="controls-wrapper">
              {/* Camera Joystick */}
              <div className="camera-joystick">
                <div className="joystick-background">
                  <div className="joystick-center"></div>
                  <div className="joystick-cardinal north" title="Move Forward">⬆</div>
                  <div className="joystick-cardinal east" title="Move Right">⮕</div>
                  <div className="joystick-cardinal south" title="Move Back">⬇</div>
                  <div className="joystick-cardinal west" title="Move Left">⬅</div>
                </div>
                <div className="joystick-label">Position Control</div>
              </div>
              
              {/* Scene Parameters */}
              <div className="scene-params-container">
                <div className="mini-section-title">Scene Parameters</div>
                <div className="compact-info-grid">
                  <div className="compact-info-row">
                    <div className="compact-info-label">Stars</div>
                    <div className="compact-info-value">{starCount.toLocaleString()}</div>
                  </div>
                  
                  <div className="compact-info-row">
                    <div className="compact-info-label">Galaxy</div>
                    <div className="compact-info-value">{galaxyCount.toLocaleString()}</div>
                  </div>
                  
                  <div className="compact-info-row">
                    <div className="compact-info-label">Brightness</div>
                    <div className="compact-info-value">{formatNumber(brightness, 1)}x</div>
                  </div>
                  
                  <div className="compact-info-row">
                    <div className="compact-info-label">Color Shift</div>
                    <div className="compact-info-value">{formatNumber(colorShift, 0)}°</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom row: Camera Presets + Screenshot Controls */}
        <div className="bottom-row">
          {/* Camera Presets */}
          <div className="presets-container">
            <div className="mini-section-title">Camera Presets</div>
            <div className="preset-buttons">
              {cameraPresets.map(preset => (
                <button
                  key={preset.id}
                  className={`preset-button ${activePreset === preset.id ? 'active' : ''}`}
                  onClick={() => setActivePreset(preset.id)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Screenshot Controls */}
          <div className="screenshot-bar">
            <button className="screenshot-button">Take Screenshot</button>
            <div className="resolution-dropdown">
              <select className="resolution-select">
                <option>720p</option>
                <option>1080p</option>
                <option>4K</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .camera-info-container {
          font-family: monospace;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        /* Top row styles */
        .top-row {
          display: flex;
          gap: 14px;
        }
        
        .position-rotation-section {
          flex: 1;
        }
        
        .section-title {
          color: #7388ff;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 13px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 3px;
        }
        
        .mini-section-title {
          color: #7388ff;
          font-size: 11px;
          margin-bottom: 6px;
          font-weight: bold;
        }
        
        .info-grid {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
        }
        
        .info-label {
          color: #aaa;
          font-size: 11px;
        }
        
        .info-value {
          color: white;
          font-weight: 500;
          text-align: right;
        }
        
        .values-triple {
          display: flex;
          gap: 5px;
        }
        
        .axis-x, .axis-y, .axis-z {
          min-width: 30px;
          text-align: right;
        }
        
        .axis-x {
          color: #ff8888;
        }
        
        .axis-y {
          color: #88ff88;
        }
        
        .axis-z {
          color: #8888ff;
        }
        
        .visualization-container {
          width: 100px;
          height: 100px;
        }
        
        .coordinate-system {
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 400px;
          transform-style: preserve-3d;
          transform: rotateX(30deg) rotateY(45deg);
        }
        
        .axis {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60px;
          height: 2px;
          transform-origin: 0 0;
        }
        
        .x-axis {
          background: linear-gradient(to right, rgba(255,0,0,0.2), #ff0000);
          transform: translateY(-1px);
        }
        
        .y-axis {
          background: linear-gradient(to right, rgba(0,255,0,0.2), #00ff00);
          transform: rotateZ(90deg) translateY(-1px);
        }
        
        .z-axis {
          background: linear-gradient(to right, rgba(0,120,255,0.2), #0088ff);
          transform: rotateY(-90deg) translateY(-1px);
        }
        
        .camera-orientation {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
        }
        
        .fov-visualization {
          width: 100%;
          height: 100%;
        }
        
        /* Middle row styles */
        .middle-row {
          display: flex;
        }
        
        .camera-controls-section {
          flex: 1;
        }
        
        .controls-wrapper {
          display: flex;
          gap: 20px;
        }
        
        .camera-joystick {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .joystick-background {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(40, 40, 60, 0.5);
          position: relative;
          border: 1px solid rgba(80, 100, 180, 0.5);
        }
        
        .joystick-center {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(100, 120, 200, 0.8);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }
        
        .joystick-cardinal {
          position: absolute;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          font-size: 12px;
          user-select: none;
        }
        
        .north {
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .east {
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .south {
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .west {
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .joystick-label {
          margin-top: 5px;
          font-size: 10px;
          color: #aaa;
        }
        
        .scene-params-container {
          flex: 1;
        }
        
        .compact-info-grid {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        
        .compact-info-row {
          display: flex;
          justify-content: space-between;
        }
        
        .compact-info-label {
          color: #aaa;
          font-size: 10px;
        }
        
        .compact-info-value {
          color: white;
          font-size: 10px;
          text-align: right;
        }
        
        /* Bottom row styles */
        .bottom-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .presets-container {
          width: 100%;
        }
        
        .preset-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        
        .preset-button {
          flex: 1;
          min-width: 80px;
          background: rgba(40, 40, 60, 0.5);
          border: 1px solid rgba(80, 100, 180, 0.5);
          color: #ddd;
          font-size: 10px;
          padding: 3px 6px;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .preset-button:hover {
          background: rgba(50, 50, 80, 0.7);
        }
        
        .preset-button.active {
          background: rgba(70, 90, 200, 0.5);
          border-color: rgba(100, 140, 255, 0.8);
          color: white;
        }
        
        .screenshot-bar {
          display: flex;
          gap: 8px;
          align-items: center;
          padding-top: 6px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .screenshot-button {
          background: rgba(40, 60, 120, 0.5);
          border: 1px solid rgba(80, 100, 180, 0.5);
          color: white;
          padding: 4px 8px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 10px;
          flex-grow: 1;
        }
        
        .screenshot-button:hover {
          background: rgba(50, 70, 150, 0.7);
        }
        
        .resolution-select {
          background: rgba(30, 30, 40, 0.5);
          border: 1px solid rgba(80, 100, 180, 0.5);
          color: white;
          padding: 3px;
          border-radius: 3px;
          font-size: 10px;
          width: 65px;
        }
      `}</style>
    </DraggableHUD>
  );
};

CameraInfoHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  cameraPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
  cameraRotation: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
  }),
  fov: PropTypes.number,
  visualParams: PropTypes.object
};

export default CameraInfoHUD; 