/**
 * @component DraggableHOC
 * @description Higher-order component for making elements draggable
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - DraggableHOC passes LEGIT protocol
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * Higher-order component that makes any component draggable
 * 
 * @param {React.Component} Component - Component to make draggable
 * @param {Object} options - Configuration options
 * @param {Object} options.defaultPosition - Default position {x, y}
 * @param {number} options.zIndex - z-index for the draggable element
 * @param {string} options.storageId - ID for localStorage persistence
 * @returns {React.Component} - Draggable component
 */
const withDraggable = (Component, options = {}) => {
  const {
    defaultPosition = { x: 20, y: 20 },
    zIndex = 10000,
    storageId = 'draggable_default_position'
  } = options;

  // Return the wrapped component
  return function DraggableComponent(props) {
    // State for tracking position
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    
    // Ref for the container element
    const containerRef = useRef(null);

    // Load position from localStorage on mount
    useEffect(() => {
      try {
        const savedPosition = localStorage.getItem(`v6_${storageId}`);
        if (savedPosition) {
          const parsedPos = JSON.parse(savedPosition);
          if (parsedPos && typeof parsedPos.x === 'number' && typeof parsedPos.y === 'number') {
            // Ensure position is within viewport bounds
            const maxX = window.innerWidth - 100;
            const maxY = window.innerHeight - 100;
            
            setPosition({
              x: Math.max(0, Math.min(maxX, parsedPos.x)),
              y: Math.max(0, Math.min(maxY, parsedPos.y))
            });
          }
        }
      } catch (error) {
        console.error(`[DraggableHOC] Error loading position for ${storageId}:`, error);
      }
    }, [storageId]);

    // Start dragging
    const handleMouseDown = (e) => {
      // Only handle left mouse button
      if (e.button !== 0) return;
      
      // Find if the click target or its parent has the draggable-handle class
      let target = e.target;
      let isHandle = false;
      
      // Check up to 5 levels of parents for draggable-handle class
      for (let i = 0; i < 5; i++) {
        if (!target) break;
        
        if (target.classList && (
          target.classList.contains('draggable-handle') || 
          target.classList.contains('draggable-component')
        )) {
          isHandle = true;
          break;
        }
        
        target = target.parentElement;
      }
      
      // If not clicking on a handle or the component itself, don't start dragging
      if (!isHandle && containerRef.current && !containerRef.current.contains(target)) {
        return;
      }
      
      // Start dragging
      setIsDragging(true);
      setDragStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      
      // Prevent text selection while dragging
      e.preventDefault();
    };

    // Handle dragging
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      // Calculate new position
      const newX = e.clientX - dragStartPos.x;
      const newY = e.clientY - dragStartPos.y;
      
      // Update position
      setPosition({ x: newX, y: newY });
      
      // Prevent text selection while dragging
      e.preventDefault();
    };

    // End dragging
    const handleMouseUp = () => {
      if (!isDragging) return;
      
      // Save position to localStorage
      try {
        localStorage.setItem(`v6_${storageId}`, JSON.stringify(position));
      } catch (error) {
        console.error(`[DraggableHOC] Error saving position for ${storageId}:`, error);
      }
      
      // End dragging
      setIsDragging(false);
    };

    // Add/remove event listeners
    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Calculate styles
    const containerStyle = {
      position: 'fixed',
      top: `${position.y}px`,
      left: `${position.x}px`,
      zIndex: zIndex,
      cursor: isDragging ? 'grabbing' : 'grab',
      userSelect: 'none',
      maxWidth: '90vw',
      maxHeight: '90vh',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
    };

    // Render the draggable container with the wrapped component
    return (
      <div
        ref={containerRef}
        className="draggable-component"
        style={containerStyle}
        onMouseDown={handleMouseDown}
      >
        <Component {...props} isDragging={isDragging} />
      </div>
    );
  };
};

export default withDraggable; 