/**
 * MemoryUsageHUD.jsx
 * RAM and VRAM usage monitor with futuristic design
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_memory_usage_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_memory_usage_hud.md'
};

/**
 * MemoryUsageHUD component
 * Small, futuristic memory usage monitor with visual indicators
 */
const MemoryUsageHUD = ({
  initialPosition = { x: 210, y: 20 },
  onPositionChange,
  onClose
}) => {
  const [ramUsage, setRamUsage] = useState(0);
  const [vramUsage, setVramUsage] = useState(0);
  const [ramTotal, setRamTotal] = useState(16384); // MB
  const [vramTotal, setVramTotal] = useState(8192); // MB
  const [detailsVisible, setDetailsVisible] = useState(false);
  
  // Animation control
  const [animatePulse, setAnimatePulse] = useState(false);
  
  // Simulate memory usage
  useEffect(() => {
    // Initial values
    setRamTotal(16384); // 16GB
    setVramTotal(8192); // 8GB
    
    // Simulate RAM usage that follows a curve
    const simulateMemoryUsage = () => {
      // RAM usage simulation - follows a wavy pattern with some small random fluctuations
      const baseRamUsage = 5120; // Base usage around 5GB
      const ramWave = Math.sin(Date.now() / 20000) * 1024; // ~1GB oscillation
      const ramNoise = (Math.random() * 200) - 100; // Small random fluctuations
      
      const newRamUsage = Math.max(1024, Math.min(ramTotal - 512, 
        Math.round(baseRamUsage + ramWave + ramNoise)
      ));
      setRamUsage(newRamUsage);
      
      // VRAM usage simulation - follows a different pattern
      const baseVramUsage = 2048; // Base usage around 2GB
      const vramWave = Math.cos(Date.now() / 15000) * 1536; // ~1.5GB oscillation
      const vramNoise = (Math.random() * 100) - 50; // Small random fluctuations
      
      const newVramUsage = Math.max(256, Math.min(vramTotal - 256, 
        Math.round(baseVramUsage + vramWave + vramNoise)
      ));
      setVramUsage(newVramUsage);
      
      // Create pulse animation when memory usage spikes
      if (newRamUsage > 7168 || newVramUsage > 6144) { // 7GB RAM or 6GB VRAM
        setAnimatePulse(true);
        setTimeout(() => setAnimatePulse(false), 300);
      }
    };
    
    const interval = setInterval(simulateMemoryUsage, 1000);
    return () => clearInterval(interval);
  }, [ramTotal, vramTotal]);
  
  // Format memory size with appropriate unit
  const formatMemory = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(1)} GB`;
    } else {
      return `${sizeInMB} MB`;
    }
  };
  
  // Calculate usage percentages
  const ramPercentage = Math.round((ramUsage / ramTotal) * 100);
  const vramPercentage = Math.round((vramUsage / vramTotal) * 100);
  
  // Determine color based on usage
  const getUsageColor = (percentage) => {
    if (percentage >= 90) return '#ff3366';
    if (percentage >= 75) return '#ffaa22';
    if (percentage >= 60) return '#ffcc00';
    return '#44eeff';
  };
  
  return (
    <DraggableHUD
      title=""
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={110}
      hideTitle
    >
      <div 
        className={`memory-container ${animatePulse ? 'pulse' : ''}`}
        onClick={() => setDetailsVisible(!detailsVisible)}
      >
        <div className="memory-header">
          <div className="memory-title">MEMORY</div>
          <div className="expand-icon">{detailsVisible ? '▲' : '▼'}</div>
        </div>
        
        {/* RAM Usage */}
        <div className="memory-type">
          <div className="memory-label">RAM</div>
          <div className="memory-bars">
            <div 
              className="memory-bar-fill"
              style={{ 
                width: `${ramPercentage}%`,
                backgroundColor: getUsageColor(ramPercentage)
              }}
            ></div>
            
            {/* Memory segments */}
            <div className="memory-segments">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="segment-line"></div>
              ))}
            </div>
          </div>
          <div className="memory-percentage">{ramPercentage}%</div>
        </div>
        
        {/* VRAM Usage */}
        <div className="memory-type">
          <div className="memory-label">VRAM</div>
          <div className="memory-bars">
            <div 
              className="memory-bar-fill"
              style={{ 
                width: `${vramPercentage}%`,
                backgroundColor: getUsageColor(vramPercentage)
              }}
            ></div>
            
            {/* Memory segments */}
            <div className="memory-segments">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="segment-line"></div>
              ))}
            </div>
          </div>
          <div className="memory-percentage">{vramPercentage}%</div>
        </div>
        
        {/* Detailed information */}
        {detailsVisible && (
          <div className="memory-details">
            <div className="detail-row">
              <div className="detail-label">RAM Used:</div>
              <div className="detail-value">{formatMemory(ramUsage)}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">RAM Total:</div>
              <div className="detail-value">{formatMemory(ramTotal)}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">VRAM Used:</div>
              <div className="detail-value">{formatMemory(vramUsage)}</div>
            </div>
            <div className="detail-row">
              <div className="detail-label">VRAM Total:</div>
              <div className="detail-value">{formatMemory(vramTotal)}</div>
            </div>
          </div>
        )}
        
        {/* Decorative elements */}
        <div className="memory-decorations">
          <div className="memory-circuit-lines">
            <div className="circuit-line line-1"></div>
            <div className="circuit-line line-2"></div>
            <div className="circuit-line line-3"></div>
          </div>
          <div className="memory-glow"></div>
        </div>
      </div>
      
      <style jsx>{`
        .memory-container {
          position: relative;
          padding: 10px;
          border-radius: 6px;
          background: rgba(10, 20, 40, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6),
                      inset 0 0 15px rgba(30, 150, 255, 0.1);
          border: 1px solid rgba(30, 150, 255, 0.2);
          cursor: pointer;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        
        .memory-container:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.6),
                      inset 0 0 20px rgba(30, 150, 255, 0.15);
        }
        
        .memory-container.pulse {
          animation: memory-pulse 0.3s ease;
        }
        
        @keyframes memory-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .memory-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .memory-title {
          font-size: 10px;
          font-weight: 700;
          color: rgba(50, 220, 255, 0.9);
          letter-spacing: 1px;
          text-shadow: 0 0 8px rgba(50, 150, 255, 0.5);
        }
        
        .expand-icon {
          font-size: 8px;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .memory-type {
          display: flex;
          align-items: center;
          margin-bottom: 6px;
          position: relative;
          z-index: 2;
        }
        
        .memory-label {
          width: 32px;
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .memory-bars {
          position: relative;
          flex: 1;
          height: 6px;
          background: rgba(20, 40, 80, 0.5);
          border-radius: 3px;
          overflow: hidden;
          margin: 0 5px;
        }
        
        .memory-bar-fill {
          position: absolute;
          height: 100%;
          border-radius: 3px;
          z-index: 1;
          box-shadow: 0 0 10px rgba(50, 200, 255, 0.4);
          transition: width 0.3s ease-out, background-color 0.3s ease;
        }
        
        .memory-segments {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 2px;
          z-index: 2;
        }
        
        .segment-line {
          width: 1px;
          height: 100%;
          background: rgba(10, 20, 30, 0.5);
        }
        
        .memory-percentage {
          width: 25px;
          font-size: 9px;
          font-weight: 600;
          text-align: right;
          color: rgba(255, 255, 255, 0.85);
        }
        
        .memory-details {
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px solid rgba(50, 150, 255, 0.2);
          animation: fade-in 0.3s ease-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 8px;
          margin-bottom: 3px;
        }
        
        .detail-label {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .detail-value {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .memory-decorations {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 0;
        }
        
        .memory-circuit-lines {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 40px;
          height: 40px;
        }
        
        .circuit-line {
          position: absolute;
          background: rgba(30, 100, 200, 0.15);
        }
        
        .line-1 {
          width: 30px;
          height: 1px;
          bottom: 10px;
          right: 5px;
        }
        
        .line-2 {
          width: 1px;
          height: 20px;
          bottom: 10px;
          right: 5px;
        }
        
        .line-3 {
          width: 15px;
          height: 1px;
          bottom: 20px;
          right: 5px;
        }
        
        .memory-glow {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 60px;
          height: 60px;
          background: radial-gradient(
            circle at center,
            rgba(30, 150, 255, 0.1) 0%,
            rgba(30, 150, 255, 0.05) 30%,
            rgba(30, 150, 255, 0) 70%
          );
        }
      `}</style>
    </DraggableHUD>
  );
};

MemoryUsageHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default MemoryUsageHUD; 