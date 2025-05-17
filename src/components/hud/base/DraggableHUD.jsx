/**
 * DraggableHUD.jsx
 * Base component for draggable HUD elements
 */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * DraggableHUD component
 * Provides a draggable container with title bar for HUD elements
 */
const DraggableHUD = ({
  title,
  children,
  width = 300,
  onClose,
  onToggleExpand,
  isExpanded = true
}) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const hudRef = useRef(null);
  
  // Handle mouse down on header (start dragging)
  const handleMouseDown = (e) => {
    if (hudRef.current) {
      const rect = hudRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };
  
  // Handle mouse move (dragging)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
  
  return (
    <div 
      ref={hudRef}
      className="fixed z-50 bg-gray-900 border border-gray-700 rounded shadow-lg overflow-hidden"
      style={{ 
        width: `${width}px`, 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity: 0.95
      }}
    >
      {/* Header */}
      <div 
        className="bg-gray-800 px-3 py-2 flex justify-between items-center cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="text-white text-sm font-medium">{title}</div>
        <div className="flex gap-2">
          {onToggleExpand && (
            <button 
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={onToggleExpand}
            >
              {isExpanded ? '▼' : '▲'}
            </button>
          )}
          {onClose && (
            <button 
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={onClose}
            >
              ✕
            </button>
          )}
        </div>
      </div>
      
      {/* Content */}
      {isExpanded && (
        <div className="hud-content bg-gray-900 text-white max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      )}
    </div>
  );
};

DraggableHUD.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  onClose: PropTypes.func,
  onToggleExpand: PropTypes.func,
  isExpanded: PropTypes.bool
}; 

export default DraggableHUD; 