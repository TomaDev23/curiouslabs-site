/**
 * ScrollPositionHUD.jsx
 * Displays scroll position metrics with visual indicators
 * LEGIT compliance: UI5
 */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_scroll_position_hud',
  ui: 'UI5',
  type: 'hud',
  doc: 'contract_scroll_position_hud.md'
};

/**
 * ScrollPositionHUD component
 * Real-time scroll position tracking with visual indicators
 */
const ScrollPositionHUD = ({
  initialPosition = { x: 20, y: 120 },
  onPositionChange,
  onClose
}) => {
  // Scroll tracking state
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    scrollPercent: 0,
    vhPosition: 0,
    scrollHeight: 0,
    viewportHeight: 0
  });
  
  // Track scroll sections
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [showSections, setShowSections] = useState(true);
  
  // History of scroll positions for velocity calculation
  const [scrollHistory, setScrollHistory] = useState([]);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  
  // Find all section anchors on the page
  const findSections = useCallback(() => {
    // Look for elements with data-section or id attribute
    const sectionElements = document.querySelectorAll('[data-section], [id]');
    const foundSections = [];
    
    sectionElements.forEach(element => {
      const id = element.getAttribute('data-section') || element.id;
      if (id) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const top = rect.top + scrollTop;
        
        foundSections.push({
          id,
          top,
          height: rect.height,
          bottom: top + rect.height
        });
      }
    });
    
    // Sort by position
    foundSections.sort((a, b) => a.top - b.top);
    setSections(foundSections);
  }, []);
  
  // Update scroll state
  const updateScrollInfo = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY;
    const scrollPercent = (scrollY / scrollHeight) * 100;
    const vhPosition = (scrollY / window.innerHeight) * 100;
    
    // Update scroll info
    setScrollInfo({
      scrollY,
      scrollPercent,
      vhPosition,
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight
    });
    
    // Update scroll history for velocity calculation
    const now = Date.now();
    setScrollHistory(prevHistory => {
      const newHistory = [
        ...prevHistory,
        { position: scrollY, timestamp: now }
      ].slice(-10); // Keep last 10 positions
      
      // Calculate velocity if we have at least 2 points
      if (newHistory.length >= 2) {
        const newest = newHistory[newHistory.length - 1];
        const oldest = newHistory[0];
        const timeDiff = newest.timestamp - oldest.timestamp;
        
        if (timeDiff > 0) {
          const posDiff = newest.position - oldest.position;
          setScrollVelocity((posDiff / timeDiff) * 1000); // pixels per second
        }
      }
      
      return newHistory;
    });
    
    // Determine active section
    if (sections.length > 0) {
      let currentSection = null;
      const viewportMiddle = scrollY + (window.innerHeight / 2);
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (viewportMiddle >= section.top && viewportMiddle <= section.bottom) {
          currentSection = section.id;
          break;
        }
      }
      
      if (!currentSection && viewportMiddle < sections[0].top) {
        currentSection = 'before-first';
      } else if (!currentSection && viewportMiddle > sections[sections.length - 1].bottom) {
        currentSection = 'after-last';
      }
      
      setActiveSection(currentSection);
    }
  }, [sections]);
  
  // Initialize scroll tracking
  useEffect(() => {
    // Find sections initially
    findSections();
    
    // Set up scroll handler
    const handleScroll = () => {
      updateScrollInfo();
    };
    
    // Handle resize to recalculate section positions
    const handleResize = () => {
      findSections();
      updateScrollInfo();
    };
    
    // Initialize
    updateScrollInfo();
    
    // Set up event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [findSections, updateScrollInfo]);
  
  // Format values for display
  const formatValue = (value, decimals = 0) => {
    return typeof value === 'number' ? value.toFixed(decimals) : 'N/A';
  };
  
  // Get color based on scroll velocity
  const getVelocityColor = () => {
    const absVelocity = Math.abs(scrollVelocity);
    if (absVelocity < 100) return '#4CAF50'; // Slow - green
    if (absVelocity < 500) return '#FFC107'; // Medium - yellow
    return '#F44336'; // Fast - red
  };
  
  return (
    <DraggableHUD
      title="Scroll Position"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
      width={240}
      height={350}
      className="scroll-position-hud"
    >
      <div className="scroll-position-content">
        {/* Primary metrics */}
        <div className="metrics-container">
          <div className="primary-metric">
            <div className="metric-label">Scroll Position</div>
            <div className="metric-value">{formatValue(scrollInfo.scrollY)}px</div>
          </div>
          
          <div className="metrics-grid">
            <div className="metric">
              <div className="metric-label">Progress</div>
              <div className="metric-value">{formatValue(scrollInfo.scrollPercent, 1)}%</div>
            </div>
            
            <div className="metric">
              <div className="metric-label">VH Position</div>
              <div className="metric-value">{formatValue(scrollInfo.vhPosition, 1)}vh</div>
            </div>
            
            <div className="metric">
              <div className="metric-label">Velocity</div>
              <div className="metric-value" style={{ color: getVelocityColor() }}>
                {formatValue(scrollVelocity, 0)}px/s
              </div>
            </div>
            
            <div className="metric">
              <div className="metric-label">Document</div>
              <div className="metric-value">{formatValue(scrollInfo.scrollHeight)}px</div>
            </div>
          </div>
        </div>
        
        {/* Visual indicator */}
        <div className="scroll-visual-container">
          <div className="scroll-track">
            <div 
              className="scroll-indicator"
              style={{ top: `${scrollInfo.scrollPercent}%` }}
            ></div>
            
            {/* Section markers */}
            {showSections && sections.map((section, index) => {
              const position = (section.top / scrollInfo.scrollHeight) * 100;
              const heightPercent = (section.height / scrollInfo.scrollHeight) * 100;
              const isActive = section.id === activeSection;
              
              return (
                <div 
                  key={section.id} 
                  className={`section-marker ${isActive ? 'active' : ''}`}
                  style={{ 
                    top: `${position}%`,
                    height: `${heightPercent}%`
                  }}
                  title={section.id}
                >
                  {heightPercent > 5 && (
                    <span className="section-label">{section.id}</span>
                  )}
                </div>
              );
            })}
            
            {/* Viewport indicator */}
            <div 
              className="viewport-indicator"
              style={{ 
                top: `${(scrollInfo.scrollY / scrollInfo.scrollHeight) * 100}%`,
                height: `${(scrollInfo.viewportHeight / scrollInfo.scrollHeight) * 100}%`
              }}
            ></div>
          </div>
        </div>
        
        {/* Active section display */}
        <div className="active-section-container">
          <div className="active-section-label">Active Section</div>
          <div className="active-section-value">
            {activeSection || 'None'}
          </div>
        </div>
        
        {/* Controls */}
        <div className="controls">
          <button 
            className={`control-button ${showSections ? 'active' : ''}`}
            onClick={() => setShowSections(!showSections)}
          >
            {showSections ? 'Hide Sections' : 'Show Sections'}
          </button>
          
          <button 
            className="control-button"
            onClick={findSections}
          >
            Refresh Sections
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .scroll-position-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 12px;
          padding: 0 6px;
        }
        
        .metrics-container {
          background: rgba(30, 30, 40, 0.6);
          border-radius: 4px;
          padding: 8px;
        }
        
        .primary-metric {
          margin-bottom: 8px;
          text-align: center;
        }
        
        .primary-metric .metric-value {
          font-size: 20px;
          font-weight: 500;
          color: #8eccff;
          text-shadow: 0 0 8px rgba(100, 180, 255, 0.5);
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        
        .metric {
          background: rgba(40, 40, 60, 0.4);
          border-radius: 4px;
          padding: 4px 8px;
        }
        
        .metric-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2px;
        }
        
        .metric-value {
          font-family: monospace;
          font-size: 12px;
          color: white;
        }
        
        .scroll-visual-container {
          height: 160px;
          background: rgba(30, 30, 40, 0.6);
          border-radius: 4px;
          padding: 8px;
          position: relative;
        }
        
        .scroll-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          width: 20px;
          height: 100%;
          position: relative;
          margin: 0 auto;
        }
        
        .scroll-indicator {
          position: absolute;
          width: 20px;
          height: 4px;
          background: #4fc3f7;
          border-radius: 2px;
          left: 0;
          transform: translateY(-50%);
          box-shadow: 0 0 6px rgba(79, 195, 247, 0.8);
        }
        
        .section-marker {
          position: absolute;
          width: 100%;
          background: rgba(100, 100, 150, 0.3);
          border-left: 2px solid rgba(120, 120, 160, 0.5);
          left: 0;
          display: flex;
          align-items: center;
        }
        
        .section-marker.active {
          background: rgba(100, 150, 220, 0.3);
          border-left: 2px solid rgba(100, 180, 255, 0.8);
        }
        
        .section-label {
          position: absolute;
          left: 24px;
          font-size: 9px;
          white-space: nowrap;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .viewport-indicator {
          position: absolute;
          width: 6px;
          right: -3px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 3px;
        }
        
        .active-section-container {
          background: rgba(30, 30, 40, 0.6);
          border-radius: 4px;
          padding: 8px;
          text-align: center;
        }
        
        .active-section-label {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 4px;
        }
        
        .active-section-value {
          font-family: monospace;
          font-size: 14px;
          color: #9ccc65;
          text-shadow: 0 0 6px rgba(156, 204, 101, 0.4);
        }
        
        .controls {
          display: flex;
          gap: 8px;
        }
        
        .control-button {
          flex: 1;
          background: rgba(60, 60, 80, 0.4);
          border: 1px solid rgba(100, 100, 140, 0.2);
          color: rgba(255, 255, 255, 0.8);
          font-size: 10px;
          padding: 4px 0;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .control-button:hover {
          background: rgba(70, 70, 100, 0.6);
          border-color: rgba(120, 120, 160, 0.4);
        }
        
        .control-button.active {
          background: rgba(80, 120, 180, 0.5);
          border-color: rgba(100, 150, 220, 0.4);
        }
      `}</style>
    </DraggableHUD>
  );
};

ScrollPositionHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func
};

export default ScrollPositionHUD; 