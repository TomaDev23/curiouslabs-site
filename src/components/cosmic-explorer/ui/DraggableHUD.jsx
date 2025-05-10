/**
 * DraggableHUD.jsx
 * Base component for draggable HUD panels
 * LEGIT compliance: UI5
 */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// LEGIT compliance metadata
export const metadata = {
  id: 'cosmic_explorer_draggable_hud',
  ui: 'UI5',
  type: 'component',
  doc: 'contract_draggable_hud.md'
};

// Keep track of highest z-index to bring active HUD to front
let globalZIndex = 1000;

/**
 * DraggableHUD component
 * Base component for all draggable HUD panels
 */
const DraggableHUD = ({
  title,
  children,
  initialPosition = { x: 20, y: 100 },
  onPositionChange,
  onClose,
  width = 300,
  minimizable = true,
  className = ''
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [zIndex, setZIndex] = useState(globalZIndex++);
  const dragRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  
  // Handle position change
  useEffect(() => {
    if (onPositionChange) {
      onPositionChange(position);
    }
  }, [position, onPositionChange]);
  
  // Start dragging
  const handleMouseDown = (e) => {
    // Bring to front
    const newZIndex = globalZIndex++;
    setZIndex(newZIndex);
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.preventDefault();
  };
  
  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      // Calculate new position
      const newX = e.clientX - dragStartRef.current.x;
      const newY = e.clientY - dragStartRef.current.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - width;
      const maxY = window.innerHeight - 50;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, width]);
  
  // Reset position if initialPosition changes
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);
  
  return (
    <div
      ref={dragRef}
      className={`draggable-hud ${isMinimized ? 'minimized' : ''} ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: isMinimized ? 'auto' : `${width}px`,
        zIndex
      }}
    >
      {/* HUD Header */}
      <div 
        className="hud-header"
        onMouseDown={handleMouseDown}
      >
        <div className="hud-title">{title}</div>
        <div className="hud-controls">
          {minimizable && (
            <button 
              className="hud-control minimize"
              onClick={() => setIsMinimized(prev => !prev)}
            >
              {isMinimized ? '+' : '-'}
            </button>
          )}
          {onClose && (
            <button 
              className="hud-control close"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      {/* HUD Content */}
      {!isMinimized && (
        <div className="hud-content">
          {children}
        </div>
      )}
      
      <style jsx>{`
        .draggable-hud {
          position: fixed;
          background: rgba(20, 20, 30, 0.8);
          border-radius: 6px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          backdrop-filter: blur(8px);
          user-select: none;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(70, 80, 180, 0.4);
          pointer-events: auto;
        }
        
        .draggable-hud.minimized {
          width: auto !important;
        }
        
        .hud-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(40, 40, 60, 0.9);
          color: white;
          font-size: 14px;
          padding: 8px 12px;
          cursor: move;
          border-bottom: 1px solid rgba(70, 80, 180, 0.4);
        }
        
        .hud-title {
          font-weight: 500;
          flex-grow: 1;
        }
        
        .hud-controls {
          display: flex;
          gap: 6px;
        }
        
        .hud-control {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          padding: 0;
          border-radius: 2px;
        }
        
        .hud-control:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .hud-control.close:hover {
          background: rgba(255, 50, 50, 0.3);
        }
        
        .hud-content {
          overflow-y: auto;
          padding: 12px;
          color: white;
          max-height: calc(80vh - 40px);
        }
      `}</style>
    </div>
  );
};

DraggableHUD.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPositionChange: PropTypes.func,
  onClose: PropTypes.func,
  width: PropTypes.number,
  minimizable: PropTypes.bool,
  className: PropTypes.string
};

export default DraggableHUD; 