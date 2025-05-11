import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// LEGIT compliance metadata
export const metadata = {
  id: 'content_layer',
  scs: 'SCS-CONTENT',
  type: 'layout',
  doc: 'contract_content_layer.md'
};

/**
 * ContentLayer component for rendering page sections
 * Renders each section with the appropriate component and position
 */
export function ContentLayer({ 
  sections, 
  SectionRegistry, 
  isEditMode = false, 
  onSectionDrag = null,
  hiddenSections = [] 
}) {
  // Track mouse dragging state
  const [draggedSectionId, setDraggedSectionId] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  
  // Filter out hidden sections
  const visibleSections = sections.filter(section => !hiddenSections.includes(section.id));
  
  // Mouse drag handlers
  const handleMouseDown = (e, sectionId) => {
    if (!isEditMode) return;
    
    // Prevent default to avoid text selection
    e.preventDefault();
    
    // Calculate offset within the section element
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    
    setDraggedSectionId(sectionId);
    setDragOffset(offsetY);
  };
  
  const handleMouseMove = (e) => {
    if (!draggedSectionId || !isEditMode) return;
    
    // Calculate new position based on mouse position and viewport height
    const viewportHeight = window.innerHeight;
    const newY = (e.clientY - dragOffset) / viewportHeight * 100;
    
    // Round to nearest 10vh for easier positioning
    const newPosition = Math.round(newY / 10) * 10;
    
    // Update the section position
    if (onSectionDrag) {
      onSectionDrag(draggedSectionId, newPosition);
    }
  };
  
  const handleMouseUp = () => {
    setDraggedSectionId(null);
  };
  
  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (draggedSectionId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedSectionId]);
  
  return (
    <div className="relative w-full">
      {visibleSections.map((section) => {
        const SectionComponent = SectionRegistry[section.id];
        if (!SectionComponent) {
          console.warn(`No component found for section ID: ${section.id}`);
          return null;
        }

        // Style for positioning the section
        const style = {
          position: 'absolute',
          top: `${section.position}vh`,
          left: 0,
          width: '100%',
          transition: isEditMode ? 'none' : 'top 0.3s ease-out'
        };

        return (
          <div 
            key={section.id} 
            style={style}
            className={`
              section-container
              ${isEditMode ? 'cursor-move border-2 border-dashed border-purple-500/50' : ''}
            `}
            data-section-id={section.id}
            draggable={isEditMode}
            onMouseDown={isEditMode ? (e) => handleMouseDown(e, section.id) : undefined}
            onDragStart={isEditMode && onSectionDrag ? (e) => {
              e.dataTransfer.setData('text/plain', section.id);
              e.dataTransfer.effectAllowed = 'move';
              
              // Store the initial Y position and section ID for position calculation
              if (typeof e.clientY === 'number') {
                e.dataTransfer.setData('application/json', JSON.stringify({
                  startY: e.clientY,
                  sectionId: section.id,
                  initialPosition: section.position
                }));
              }
            } : undefined}
          >
            {/* Section label for edit mode */}
            {isEditMode && (
              <div className="absolute top-0 left-0 bg-purple-800/80 text-white px-2 py-1 text-xs z-10 flex gap-2 items-center">
                <span>{section.id}</span>
                <span className="text-purple-300">{section.position}vh</span>
              </div>
            )}
            
            <SectionComponent />
          </div>
        );
      })}

      {/* Show dropzone indicators while in edit mode */}
      {isEditMode && Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={`dropzone-${i}`}
          className="absolute left-0 w-full h-2 bg-purple-400/10 hover:bg-purple-400/30 z-0"
          style={{ top: `${i * 50}vh` }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (onSectionDrag) {
              const sectionId = e.dataTransfer.getData('text/plain');
              
              // Calculate the new position (dropzone position)
              const newPosition = i * 50;
              
              // Call the drag handler
              onSectionDrag(sectionId, newPosition);
            }
          }}
        />
      ))}
    </div>
  );
}

ContentLayer.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired
  })).isRequired,
  SectionRegistry: PropTypes.object.isRequired,
  isEditMode: PropTypes.bool,
  onSectionDrag: PropTypes.func,
  hiddenSections: PropTypes.arrayOf(PropTypes.string)
}; 