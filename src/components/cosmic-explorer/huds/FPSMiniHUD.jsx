/**
 * FPSMiniHUD.jsx
 * Compact FPS counter with alert capabilities
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_fps_mini_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_fps_mini_hud.md'
};

/**
 * FPSMiniHUD component
 * Small, visually striking FPS counter with low FPS alerts
 */
const FPSMiniHUD = ({
  initialPosition = { x: 20, y: 20 },
  onPositionChange,
  onClose,
  lowThreshold = 30,
  criticalThreshold = 20
}) => {
  const [fps, setFps] = useState(60);
  const [fpsStatus, setFpsStatus] = useState('normal'); // 'normal', 'low', 'critical'
  const [showAverage, setShowAverage] = useState(false);
  const [fpsHistory, setFpsHistory] = useState([]);
  const [isGlowing, setIsGlowing] = useState(false);
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef(null);
  
  // FPS calculation effect
  useEffect(() => {
    const updateFPS = () => {
      frameCountRef.current++;
      
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;
      
      if (elapsed >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
        setFps(currentFps);
        
        // Update status based on thresholds
        if (currentFps <= criticalThreshold) {
          setFpsStatus('critical');
        } else if (currentFps <= lowThreshold) {
          setFpsStatus('low');
        } else {
          setFpsStatus('normal');
        }
        
        // Update history for average calculation
        const newHistory = [...fpsHistory, currentFps].slice(-30); // Keep last 30 readings
        setFpsHistory(newHistory);
        
        // Reset for next update
        lastTimeRef.current = now;
        frameCountRef.current = 0;
      }
      
      animationFrameRef.current = requestAnimationFrame(updateFPS);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateFPS);
    
    // Blinking effect for critical FPS
    let glowInterval;
    if (fpsStatus === 'critical') {
      glowInterval = setInterval(() => {
        setIsGlowing(prev => !prev);
      }, 500);
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (glowInterval) {
        clearInterval(glowInterval);
      }
    };
  }, [fpsHistory, fpsStatus, lowThreshold, criticalThreshold]);
  
  // Calculate average FPS
  const averageFps = fpsHistory.length > 0 
    ? Math.round(fpsHistory.reduce((sum, val) => sum + val, 0) / fpsHistory.length) 
    : fps;
  
  return (
    <DraggableHUD
      title=""
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={80}
      hideTitle
    >
      <div 
        className={`fps-mini-container ${fpsStatus} ${isGlowing && fpsStatus === 'critical' ? 'glow' : ''}`}
        onClick={() => setShowAverage(!showAverage)}
      >
        <div className="fps-digit-container">
          <div className="fps-digits">
            {showAverage ? averageFps : fps}
          </div>
          <div className="fps-label">
            {showAverage ? 'AVG FPS' : 'FPS'}
          </div>
        </div>
        
        <div className="fps-bar-container">
          <div 
            className="fps-bar"
            style={{ height: `${Math.min(100, (fps / 120) * 100)}%` }}
          ></div>
        </div>
      </div>
      
      <style jsx>{`
        .fps-mini-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px;
          border-radius: 6px;
          background: rgba(25, 30, 45, 0.85);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(60, 80, 180, 0.4);
          overflow: hidden;
          position: relative;
        }
        
        .fps-mini-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #3050ff, #80a0ff);
          opacity: 0.7;
        }
        
        .fps-mini-container.normal {
          border-color: rgba(60, 170, 255, 0.6);
        }
        
        .fps-mini-container.low {
          border-color: rgba(255, 170, 60, 0.7);
        }
        
        .fps-mini-container.critical {
          border-color: rgba(255, 60, 60, 0.7);
        }
        
        .fps-mini-container.glow {
          box-shadow: 0 0 12px rgba(255, 0, 0, 0.5);
        }
        
        .fps-digit-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .fps-digits {
          font-family: monospace;
          font-size: 24px;
          font-weight: 600;
          color: white;
          text-align: center;
          text-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
        }
        
        .normal .fps-digits {
          text-shadow: 0 0 10px rgba(100, 150, 255, 0.5);
        }
        
        .low .fps-digits {
          text-shadow: 0 0 10px rgba(255, 150, 50, 0.5);
          color: #ffaa44;
        }
        
        .critical .fps-digits {
          text-shadow: 0 0 10px rgba(255, 50, 50, 0.7);
          color: #ff4444;
        }
        
        .fps-label {
          font-size: 9px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-top: -3px;
          letter-spacing: 0.5px;
        }
        
        .fps-bar-container {
          width: 6px;
          height: 30px;
          background: rgba(40, 40, 60, 0.4);
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }
        
        .fps-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(0deg, #3050ff, #80c0ff);
          border-radius: 3px;
          transition: height 0.2s ease;
        }
        
        .low .fps-bar {
          background: linear-gradient(0deg, #ff7700, #ffaa44);
        }
        
        .critical .fps-bar {
          background: linear-gradient(0deg, #ff0000, #ff6666);
        }
      `}</style>
    </DraggableHUD>
  );
};

FPSMiniHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  lowThreshold: PropTypes.number,
  criticalThreshold: PropTypes.number
};

export default FPSMiniHUD; 