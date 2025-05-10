/**
 * GPUTempHUD.jsx
 * GPU temperature monitoring with heat visualization
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_gpu_temp_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_gpu_temp_hud.md'
};

/**
 * GPUTempHUD component
 * Small, visually striking GPU temperature monitor with heat visualization
 */
const GPUTempHUD = ({
  initialPosition = { x: 110, y: 20 },
  onPositionChange,
  onClose
}) => {
  const [temperature, setTemperature] = useState(65);
  const [usage, setUsage] = useState(45);
  const [throttleLevel, setThrottleLevel] = useState(0); // 0-3 (none, light, moderate, heavy)
  
  // Simulate GPU temperature and usage readings
  useEffect(() => {
    const simulateGPUMetrics = () => {
      // Simulate varying but somewhat realistic GPU temperature behavior
      const baseTemp = 65;
      const variation = Math.sin(Date.now() / 10000) * 5; // Slow oscillation
      const randomFactor = Math.random() * 2 - 1; // Random fluctuation
      
      const newTemp = Math.round(baseTemp + variation + randomFactor);
      setTemperature(newTemp);
      
      // Simulate GPU usage
      const baseUsage = 45;
      const usageVariation = Math.sin(Date.now() / 5000) * 20; // Faster oscillation
      const usageRandom = Math.random() * 10 - 5;
      
      const newUsage = Math.max(5, Math.min(98, Math.round(baseUsage + usageVariation + usageRandom)));
      setUsage(newUsage);
      
      // Set throttling level based on temperature
      if (newTemp > 85) {
        setThrottleLevel(3); // Heavy throttling
      } else if (newTemp > 80) {
        setThrottleLevel(2); // Moderate throttling
      } else if (newTemp > 75) {
        setThrottleLevel(1); // Light throttling
      } else {
        setThrottleLevel(0); // No throttling
      }
    };
    
    const intervalId = setInterval(simulateGPUMetrics, 1000);
    return () => clearInterval(intervalId);
  }, []);
  
  // Determine the temperature color gradient
  const getTempColor = (temp) => {
    if (temp >= 85) return '#ff2200';
    if (temp >= 80) return '#ff6600';
    if (temp >= 75) return '#ffaa00';
    if (temp >= 70) return '#ffcc00';
    if (temp >= 65) return '#dddd00';
    if (temp >= 60) return '#88cc00';
    return '#00aa00';
  };
  
  // Generate heat wave effect
  const generateHeatWave = () => {
    const intensity = Math.min(1, (temperature - 50) / 40); // 0-1 scale based on temp
    if (intensity <= 0) return 'none';
    
    return `
      drop-shadow(0 0 ${2 + intensity * 3}px rgba(255, ${Math.round(255 - intensity * 255)}, 0, ${0.3 + intensity * 0.4}))
      drop-shadow(0 0 ${1 + intensity * 2}px rgba(255, ${Math.round(100 - intensity * 100)}, 0, ${0.2 + intensity * 0.3}))
    `;
  };
  
  // Heat wave animation speed based on temperature
  const getAnimationDuration = () => {
    const baseSpeed = 3;
    const tempFactor = Math.max(0, Math.min(1, (temperature - 60) / 30));
    return baseSpeed - tempFactor * 1.5; // Between 1.5s and 3s
  };
  
  return (
    <DraggableHUD
      title=""
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={90}
      hideTitle
    >
      <div className="gpu-temp-container">
        <div 
          className="heat-glow"
          style={{ 
            filter: generateHeatWave(),
            animationDuration: `${getAnimationDuration()}s`
          }}
        ></div>
        
        <div className="temp-info">
          <div 
            className="temp-value"
            style={{ color: getTempColor(temperature) }}
          >
            {temperature}°C
          </div>
          <div className="temp-label">GPU</div>
        </div>
        
        <div className="gpu-metrics">
          <div className="usage-bar-container">
            <div className="usage-label">Usage</div>
            <div className="usage-bar-wrapper">
              <div 
                className="usage-bar"
                style={{ 
                  width: `${usage}%`,
                  background: `linear-gradient(90deg, #7080ff, ${getTempColor(temperature)})`
                }}
              ></div>
            </div>
            <div className="usage-value">{usage}%</div>
          </div>
          
          {throttleLevel > 0 && (
            <div className="throttle-indicator">
              <div className={`throttle-dot level-${throttleLevel}`}></div>
              <div className="throttle-text">
                {throttleLevel === 1 && 'Throttling'}
                {throttleLevel === 2 && 'THROTTLING'}
                {throttleLevel === 3 && 'CRITICAL'}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .gpu-temp-container {
          position: relative;
          padding: 10px;
          border-radius: 6px;
          background: rgba(25, 30, 45, 0.85);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }
        
        .heat-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(255, 150, 50, 0.15) 0%,
            rgba(255, 100, 0, 0.05) 60%,
            transparent 80%
          );
          pointer-events: none;
          z-index: 0;
          animation: pulse linear infinite;
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.6;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.6;
            transform: scale(0.95);
          }
        }
        
        .temp-info {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .temp-value {
          font-family: 'Courier New', monospace;
          font-size: 22px;
          font-weight: bold;
          text-shadow: 0 0 8px rgba(255, 150, 0, 0.4);
        }
        
        .temp-label {
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1px;
          margin-top: -2px;
        }
        
        .gpu-metrics {
          position: relative;
          z-index: 1;
        }
        
        .usage-bar-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .usage-label {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .usage-bar-wrapper {
          height: 4px;
          background: rgba(40, 40, 60, 0.5);
          border-radius: 2px;
          overflow: hidden;
        }
        
        .usage-bar {
          height: 100%;
          transition: width 0.3s ease-out;
        }
        
        .usage-value {
          font-size: 9px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          text-align: right;
          margin-top: 1px;
        }
        
        .throttle-indicator {
          display: flex;
          align-items: center;
          margin-top: 5px;
          gap: 5px;
          animation: blink 1s ease-in-out infinite alternate;
        }
        
        @keyframes blink {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        .throttle-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }
        
        .throttle-dot.level-1 {
          background-color: #ffaa00;
          box-shadow: 0 0 5px #ffaa00;
        }
        
        .throttle-dot.level-2 {
          background-color: #ff6600;
          box-shadow: 0 0 6px #ff6600;
        }
        
        .throttle-dot.level-3 {
          background-color: #ff2200;
          box-shadow: 0 0 8px #ff2200;
        }
        
        .throttle-text {
          font-size: 9px;
          font-weight: 600;
          color: #ff6600;
        }
        
        .throttle-indicator:has(.level-2) .throttle-text {
          color: #ff6600;
        }
        
        .throttle-indicator:has(.level-3) .throttle-text {
          color: #ff2200;
        }
      `}</style>
    </DraggableHUD>
  );
};

GPUTempHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default GPUTempHUD; 