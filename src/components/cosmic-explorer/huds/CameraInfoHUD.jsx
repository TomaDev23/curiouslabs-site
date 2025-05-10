/**
 * CameraInfoHUD.jsx
 * Camera information and settings display
 * LEGIT compliance: UI5
 */
import React from 'react';
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
  
  // Function to format numbers nicely
  const formatNumber = (num, decimals = 2) => {
    return typeof num === 'number' 
      ? num.toFixed(decimals) 
      : 'N/A';
  };
  
  return (
    <DraggableHUD
      title="Camera & Scene Info"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={280}
    >
      <div className="camera-info-container">
        {/* Camera Section */}
        <div className="info-section">
          <div className="section-title">Camera Position</div>
          <div className="info-grid">
            <div className="info-label">X:</div>
            <div className="info-value">{formatNumber(cameraPosition.x)}</div>
            
            <div className="info-label">Y:</div>
            <div className="info-value">{formatNumber(cameraPosition.y)}</div>
            
            <div className="info-label">Z:</div>
            <div className="info-value">{formatNumber(cameraPosition.z)}</div>
          </div>
        </div>
        
        {/* Rotation Section */}
        <div className="info-section">
          <div className="section-title">Camera Rotation</div>
          <div className="info-grid">
            <div className="info-label">X:</div>
            <div className="info-value">{formatNumber(cameraRotation.x * (180/Math.PI))}°</div>
            
            <div className="info-label">Y:</div>
            <div className="info-value">{formatNumber(cameraRotation.y * (180/Math.PI))}°</div>
            
            <div className="info-label">Z:</div>
            <div className="info-value">{formatNumber(cameraRotation.z * (180/Math.PI))}°</div>
            
            <div className="info-label">FOV:</div>
            <div className="info-value">{formatNumber(fov, 0)}°</div>
          </div>
        </div>
        
        {/* Scene Parameters */}
        <div className="info-section">
          <div className="section-title">Scene Parameters</div>
          <div className="info-grid">
            <div className="info-label">Stars:</div>
            <div className="info-value">{starCount.toLocaleString()}</div>
            
            <div className="info-label">Galaxy:</div>
            <div className="info-value">{galaxyCount.toLocaleString()}</div>
            
            <div className="info-label">Brightness:</div>
            <div className="info-value">{formatNumber(brightness, 1)}x</div>
            
            <div className="info-label">Color Shift:</div>
            <div className="info-value">{formatNumber(colorShift, 0)}°</div>
          </div>
        </div>
        
        {/* Visual Coordinate System */}
        <div className="coordinate-system">
          <div className="axis x-axis"></div>
          <div className="axis y-axis"></div>
          <div className="axis z-axis"></div>
          <div className="axis-label x-label">X</div>
          <div className="axis-label y-label">Y</div>
          <div className="axis-label z-label">Z</div>
        </div>
      </div>
      
      <style jsx>{`
        .camera-info-container {
          font-family: monospace;
          font-size: 12px;
        }
        
        .info-section {
          margin-bottom: 16px;
        }
        
        .section-title {
          color: #7388ff;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 4px 8px;
        }
        
        .info-label {
          color: #aaa;
        }
        
        .info-value {
          color: white;
          font-weight: 500;
        }
        
        .coordinate-system {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 20px auto 0;
          perspective: 400px;
          transform-style: preserve-3d;
          transform: rotateX(30deg) rotateY(45deg);
        }
        
        .axis {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
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
        
        .axis-label {
          position: absolute;
          color: white;
          font-weight: bold;
          font-size: 10px;
        }
        
        .x-label {
          color: #ff4444;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .y-label {
          color: #44ff44;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .z-label {
          color: #4488ff;
          top: 50%;
          left: 15%;
          transform: translateY(-50%);
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