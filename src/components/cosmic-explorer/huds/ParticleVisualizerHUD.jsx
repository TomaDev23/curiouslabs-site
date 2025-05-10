/**
 * ParticleVisualizerHUD.jsx
 * Visualize particle distribution and properties
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_particle_visualizer_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_particle_visualizer_hud.md'
};

/**
 * ParticleVisualizerHUD component
 * Displays particle system statistics and distribution visualization
 */
const ParticleVisualizerHUD = ({
  initialPosition = { x: 20, y: 320 },
  onPositionChange,
  onClose,
  visualParams = {}
}) => {
  // Extract particle-related visual parameters with defaults
  const {
    starCount = 3000,
    galaxyCount = 15000
  } = visualParams;
  
  // Simulated particle distribution data (in a real implementation, this would come from the galaxy renderer)
  const [particleStats, setParticleStats] = useState({
    totalCount: starCount + galaxyCount,
    active: starCount + galaxyCount * 0.9,
    culled: galaxyCount * 0.1,
    distribution: [
      { range: '0-50', count: Math.round((starCount + galaxyCount) * 0.3) },
      { range: '50-100', count: Math.round((starCount + galaxyCount) * 0.25) },
      { range: '100-150', count: Math.round((starCount + galaxyCount) * 0.15) },
      { range: '150-200', count: Math.round((starCount + galaxyCount) * 0.2) },
      { range: '200+', count: Math.round((starCount + galaxyCount) * 0.1) }
    ],
    densityMap: [
      [0.1, 0.2, 0.3, 0.8, 0.7],
      [0.2, 0.4, 0.7, 0.9, 0.6],
      [0.3, 0.6, 0.8, 0.5, 0.4],
      [0.2, 0.5, 0.4, 0.3, 0.2],
      [0.1, 0.2, 0.1, 0.1, 0.1]
    ]
  });
  
  // Update simulated stats when visualParams change
  useEffect(() => {
    setParticleStats(prev => ({
      ...prev,
      totalCount: starCount + galaxyCount,
      active: starCount + galaxyCount * 0.9,
      culled: galaxyCount * 0.1,
      distribution: [
        { range: '0-50', count: Math.round((starCount + galaxyCount) * 0.3) },
        { range: '50-100', count: Math.round((starCount + galaxyCount) * 0.25) },
        { range: '100-150', count: Math.round((starCount + galaxyCount) * 0.15) },
        { range: '150-200', count: Math.round((starCount + galaxyCount) * 0.2) },
        { range: '200+', count: Math.round((starCount + galaxyCount) * 0.1) }
      ]
    }));
  }, [starCount, galaxyCount]);
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Calculate max count for distribution graph
  const maxDistCount = Math.max(...particleStats.distribution.map(d => d.count));
  
  return (
    <DraggableHUD
      title="Particle Visualizer"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={300}
    >
      <div className="particles-container">
        {/* Summary stats */}
        <div className="stats-row">
          <div className="stats-group">
            <div className="stat-label">Total Particles</div>
            <div className="stat-value">{formatNumber(particleStats.totalCount)}</div>
          </div>
          <div className="stats-group">
            <div className="stat-label">Active</div>
            <div className="stat-value">{formatNumber(Math.round(particleStats.active))}</div>
          </div>
          <div className="stats-group">
            <div className="stat-label">Culled</div>
            <div className="stat-value">{formatNumber(Math.round(particleStats.culled))}</div>
          </div>
        </div>
        
        {/* Particle systems */}
        <div className="section">
          <div className="section-title">Particle Systems</div>
          <div className="system-stats">
            <div className="system-row">
              <div className="system-name">Stars</div>
              <div className="system-count">{formatNumber(starCount)}</div>
            </div>
            <div className="system-row">
              <div className="system-name">Galaxy</div>
              <div className="system-count">{formatNumber(galaxyCount)}</div>
            </div>
          </div>
        </div>
        
        {/* Distribution graph */}
        <div className="section">
          <div className="section-title">Distance Distribution</div>
          <div className="distribution-graph">
            {particleStats.distribution.map((item, index) => (
              <div key={index} className="dist-row">
                <div className="dist-range">{item.range}</div>
                <div className="dist-bar-container">
                  <div 
                    className="dist-bar"
                    style={{ width: `${(item.count / maxDistCount) * 100}%` }}
                  ></div>
                </div>
                <div className="dist-count">{formatNumber(item.count)}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Density map */}
        <div className="section">
          <div className="section-title">Density Map</div>
          <div className="density-map">
            {particleStats.densityMap.map((row, rowIndex) => (
              <div key={rowIndex} className="density-row">
                {row.map((density, colIndex) => (
                  <div 
                    key={colIndex} 
                    className="density-cell"
                    style={{ 
                      backgroundColor: `rgba(100, 150, 255, ${density})`,
                      opacity: 0.5 + density * 0.5
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .particles-container {
          font-family: monospace;
          font-size: 12px;
        }
        
        .stats-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        
        .stats-group {
          text-align: center;
        }
        
        .stat-label {
          color: #aaa;
          font-size: 11px;
          margin-bottom: 2px;
        }
        
        .stat-value {
          color: white;
          font-weight: bold;
          font-size: 14px;
        }
        
        .section {
          margin-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 8px;
        }
        
        .section-title {
          color: #7388ff;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 13px;
        }
        
        .system-stats {
          margin-bottom: 8px;
        }
        
        .system-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        
        .system-name {
          color: #ccc;
        }
        
        .system-count {
          color: white;
        }
        
        .distribution-graph {
          margin-top: 8px;
        }
        
        .dist-row {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .dist-range {
          width: 55px;
          color: #aaa;
          font-size: 11px;
        }
        
        .dist-bar-container {
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.1);
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
          margin: 0 8px;
        }
        
        .dist-bar {
          height: 100%;
          background: linear-gradient(90deg, #4488ff, #44aaff);
          border-radius: 4px;
        }
        
        .dist-count {
          width: 60px;
          color: #ccc;
          font-size: 10px;
          text-align: right;
        }
        
        .density-map {
          display: flex;
          flex-direction: column;
          height: 100px;
          margin-top: 8px;
        }
        
        .density-row {
          display: flex;
          flex-grow: 1;
        }
        
        .density-cell {
          flex-grow: 1;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </DraggableHUD>
  );
};

ParticleVisualizerHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  visualParams: PropTypes.object
};

export default ParticleVisualizerHUD; 