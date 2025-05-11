import React, { useState, useEffect, useRef } from 'react';

// LEGIT compliance metadata
export const metadata = {
  id: 'draggable_hoc',
  scs: 'SCS-DEBUG',
  type: 'utility',
  doc: 'contract_draggable_hoc.md'
};

/**
 * Higher-order component that adds drag functionality to any component
 * 
 * @param {React.ComponentType} Component - The component to make draggable
 * @param {Object} options - Configuration options
 * @param {Object} options.defaultPosition - Initial position {x, y}
 * @param {number} options.zIndex - z-index value for the draggable component
 * @param {string} options.storageId - Custom storage ID for localStorage
 * @returns {React.FC} - A draggable version of the component
 */
const withDraggable = (Component, { defaultPosition = { x: 20, y: 20 }, zIndex = 1000, storageId = null }) => {
  return function DraggableComponent(props) {
    // Use custom storage ID if provided, otherwise generate based on component name
    const componentStorageId = storageId || `draggable_${Component.name || 'component'}_position`;
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    
    // Load position from localStorage with error handling
    useEffect(() => {
      try {
        const savedPosition = localStorage.getItem(componentStorageId);
        if (savedPosition) {
          try {
            const parsed = JSON.parse(savedPosition);
            
            // Validate parsed position
            if (parsed && typeof parsed === 'object' && typeof parsed.x === 'number' && typeof parsed.y === 'number') {
              // Check if the saved position is valid and visible on screen
              const isSafePosition = 
                parsed.x >= 0 && 
                parsed.x <= window.innerWidth - 100 &&
                parsed.y >= 0 && 
                parsed.y <= window.innerHeight - 100;
                
              if (isSafePosition) {
                setPosition(parsed);
                console.log(`Loaded position for ${componentStorageId}:`, parsed);
              } else {
                // Reset to default if position is off-screen
                console.warn(`Position for ${componentStorageId} was off-screen, using default`);
                setPosition(defaultPosition);
              }
            } else {
              throw new Error('Invalid position data format');
            }
          } catch (parseError) {
            console.error(`Error parsing position for ${componentStorageId}:`, parseError);
            // If parsing fails, use default position
            localStorage.removeItem(componentStorageId);
            setPosition(defaultPosition);
          }
        }
      } catch (error) {
        console.error(`Error loading draggable position for ${componentStorageId}:`, error);
        setPosition(defaultPosition);
      }
      
      // Fade in after position is set
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }, [componentStorageId, defaultPosition]);
    
    // Save position to localStorage
    useEffect(() => {
      // Don't save during drag operations to reduce localStorage writes
      if (!isDragging && isVisible) {
        try {
          localStorage.setItem(componentStorageId, JSON.stringify(position));
        } catch (error) {
          console.error('Error saving draggable position:', error);
        }
      }
    }, [position, isDragging, isVisible, componentStorageId]);
    
    // Handle mouse down to start dragging
    const handleMouseDown = (e) => {
      // Check if the target has data-no-drag attribute - if so, don't initiate dragging
      if (e.target.getAttribute('data-no-drag') === 'true' || 
          e.target.closest('[data-no-drag="true"]') ||
          e.target.getAttribute('data-temp-no-drag') === 'true' || 
          e.target.closest('[data-temp-no-drag="true"]')) {
        console.log('[Draggable] Ignoring drag on element with no-drag attribute');
        return; // Exit early without initiating drag
      }
      
      // Check for draggable handle or direct click (not on buttons)
      const hasHandle = e.target.closest('.draggable-handle');
      const hasButton = e.target.closest('button');
      const shouldDrag = hasHandle || !hasButton;
      
      // Log for debugging
      console.log(`[Draggable] Click on ${Component.name || componentStorageId}: hasHandle=${!!hasHandle}, hasButton=${!!hasButton}, will drag=${shouldDrag}`);
      
      if (shouldDrag) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        
        // Get the bounding rectangle of the container
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate the offset from the mouse position to the container's position
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        
        console.log(`[Draggable] Started dragging at ${e.clientX},${e.clientY}, offset: ${e.clientX - rect.left},${e.clientY - rect.top}`);
      }
    };
    
    // Handle mouse move
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      e.preventDefault();
      e.stopPropagation();
      
      // Calculate new position ensuring it stays within viewport
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 50));
      const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 50));
      
      // Only update if position actually changed to avoid unnecessary renders
      if (position.x !== newX || position.y !== newY) {
        setPosition({ x: newX, y: newY });
        
        // Periodically log position for debugging (throttled to avoid console spam)
        if (Math.random() < 0.05) { // Log ~5% of move events
          console.log(`[Draggable] Moving to ${newX},${newY}`);
        }
      }
    };
    
    // Handle mouse up to end dragging
    const handleMouseUp = (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        console.log(`[Draggable] Stopped dragging at ${position.x},${position.y}`);
        
        // Save position immediately on mouse up
        try {
          localStorage.setItem(componentStorageId, JSON.stringify(position));
          console.log(`[Draggable] Saved position for ${componentStorageId}:`, position);
        } catch (error) {
          console.error(`[Draggable] Error saving position for ${componentStorageId}:`, error);
        }
      }
    };
    
    // Add and remove event listeners
    useEffect(() => {
      const moveHandler = handleMouseMove;
      const upHandler = handleMouseUp;
      
      if (isDragging) {
        console.log(`[Draggable] Adding document event listeners for dragging`);
        document.addEventListener('mousemove', moveHandler, { passive: false });
        document.addEventListener('mouseup', upHandler, { passive: false });
        // Add capture phase listeners to ensure we get the events
        document.addEventListener('mousemove', moveHandler, { passive: false, capture: true });
        document.addEventListener('mouseup', upHandler, { passive: false, capture: true });
      } else {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
        document.removeEventListener('mousemove', moveHandler, { capture: true });
        document.removeEventListener('mouseup', upHandler, { capture: true });
      }
      
      return () => {
        console.log(`[Draggable] Removing document event listeners`);
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
        document.removeEventListener('mousemove', moveHandler, { capture: true });
        document.removeEventListener('mouseup', upHandler, { capture: true });
      };
    }, [isDragging]);
    
    // Handle window resize
    useEffect(() => {
      const handleResize = () => {
        // Keep component in viewport on resize
        setPosition(prev => ({
          x: Math.min(prev.x, window.innerWidth - 50),
          y: Math.min(prev.y, window.innerHeight - 50)
        }));
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
      <div
        ref={containerRef}
        className={`fixed cursor-move draggable transition-opacity duration-500 ease-in-out ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: zIndex,
          touchAction: 'none',
          pointerEvents: 'auto',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          handleMouseDown({ 
            preventDefault: () => e.preventDefault(),
            stopPropagation: () => e.stopPropagation(),
            clientX: touch.clientX,
            clientY: touch.clientY,
            target: e.target
          });
        }}
      >
        <Component {...props} />
      </div>
    );
  };
};

export default withDraggable; 