import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// LEGIT compliance metadata
export const metadata = {
  id: 'admin_panel',
  scs: 'SCS-ADMIN-PANEL',
  type: 'control',
  doc: 'contract_admin_panel.md'
};

/**
 * AdminPanel component for controlling section positions
 * Provides UI for adjusting, saving, and exporting section configurations
 */
export function AdminPanel({ 
  sections, 
  onSectionMove, 
  onToggleEditMode, 
  isEditMode,
  onSave,
  onReset,
  hiddenSections = [],
  onToggleSectionVisibility,
  onShowAllSections,
  onHideAllSections
}) {
  // State to track panel position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to track if panel is being dragged
  const [isDragging, setIsDragging] = useState(false);
  // State to track offset of drag
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // State to track if panel is minimized
  const [isMinimized, setIsMinimized] = useState(false);
  // Reference to the panel
  const panelRef = useRef(null);

  // Function to handle mouse down on panel header
  const handleMouseDown = (e) => {
    // Only allow dragging from header
    if (e.target.closest('.panel-header')) {
      setIsDragging(true);
      const rect = panelRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      // Prevent text selection during drag
      e.preventDefault();
    }
  };

  // Function to handle mouse move
  const handleMouseMove = (e) => {
    if (isDragging && panelRef.current) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      setPosition({ x: newX, y: newY });
    }
  };

  // Function to handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  // Function to toggle minimized state
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Function to export current configuration
  const handleExport = () => {
    // Format the config in a way it can be pasted directly into code
    const configStr = JSON.stringify(
      sections.map(({ id, position }) => ({ id, position })), 
      null, 
      2
    );
    
    // Create a temporary textarea to copy to clipboard
    const el = document.createElement('textarea');
    el.value = configStr;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    // Alert the user
    alert('Section configuration copied to clipboard!');
  };

  // Function to adjust all positions proportionally
  const adjustAllPositions = (amount) => {
    sections.forEach(section => {
      onSectionMove(section.id, section.position + amount);
    });
  };

  // Check if all sections are hidden or all are visible
  const allHidden = sections.length > 0 && sections.every(section => hiddenSections.includes(section.id));
  const allVisible = hiddenSections.length === 0;

  return (
    <div 
      ref={panelRef}
      className={`fixed z-[100] text-white bg-black/80 rounded shadow-lg border border-purple-500/50 ${isMinimized ? 'w-auto' : 'w-72'}`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        right: position.x === 0 ? '1rem' : 'auto',
        top: position.y === 0 ? '5rem' : 'auto',
        cursor: isDragging ? 'grabbing' : 'auto'
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header - always visible, used for dragging */}
      <div className="panel-header flex justify-between items-center bg-purple-900/60 px-4 py-2 rounded-t cursor-grab">
        <h3 className="text-sm font-bold text-purple-300">Section Controls</h3>
        <div className="flex gap-1">
          <button 
            onClick={toggleMinimize} 
            className="text-xs px-2 bg-gray-700 hover:bg-gray-600 rounded"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? "+" : "-"}
          </button>
        </div>
      </div>

      {/* Main content - only visible when not minimized */}
      {!isMinimized && (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={onToggleEditMode}
              className={`px-2 py-1 text-xs rounded ${
                isEditMode 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
          </div>

          {/* Instruction text */}
          {isEditMode && (
            <div className="mb-3 text-xs text-gray-300 bg-purple-900/30 p-2 rounded">
              <p>Drag sections to reposition or use controls below.</p>
              <p>Positions are in viewport height (vh) units.</p>
              <p>Toggle visibility to help with positioning.</p>
            </div>
          )}
          
          {/* Global visibility controls */}
          <div className="mb-4 pb-3 border-b border-purple-500/30">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-purple-200">Visibility:</span>
              <div className="flex gap-2">
                <button 
                  onClick={onShowAllSections}
                  className={`px-2 py-1 text-xs rounded ${allVisible ? 'bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                  disabled={allVisible}
                  title="Show all sections"
                >
                  Show All
                </button>
                <button 
                  onClick={onHideAllSections}
                  className={`px-2 py-1 text-xs rounded ${allHidden ? 'bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                  disabled={allHidden}
                  title="Hide all sections"
                >
                  Hide All
                </button>
              </div>
            </div>
          </div>
          
          {/* Global position adjustment */}
          {isEditMode && (
            <div className="mb-4 pb-3 border-b border-purple-500/30">
              <div className="text-xs text-purple-200 mb-1">Adjust All Sections:</div>
              <div className="flex gap-2">
                <button 
                  onClick={() => adjustAllPositions(-50)}
                  className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-xs rounded flex-1"
                >
                  Move All Up (50vh)
                </button>
                <button 
                  onClick={() => adjustAllPositions(50)}
                  className="px-2 py-1 bg-blue-700 hover:bg-blue-600 text-xs rounded flex-1"
                >
                  Move All Down (50vh)
                </button>
              </div>
            </div>
          )}

          {/* Section list */}
          <div className="max-h-64 overflow-y-auto mb-4">
            {sections.map(section => {
              const isHidden = hiddenSections.includes(section.id);
              return (
                <div key={section.id} className={`flex items-center my-2 gap-2 text-sm ${isHidden ? 'opacity-50' : ''}`}>
                  <div className="w-24 truncate" title={section.id}>{section.id}</div>
                  <div className="text-xs text-purple-300 w-14">{section.position}vh</div>
                  
                  {/* Visibility toggle */}
                  <button 
                    onClick={() => onToggleSectionVisibility(section.id)}
                    className={`px-1 py-0.5 text-xs rounded ${isHidden ? 'bg-gray-600' : 'bg-purple-600'}`}
                    title={isHidden ? "Show section" : "Hide section"}
                  >
                    {isHidden ? "👁️" : "✓"}
                  </button>
                  
                  {/* Position controls (only when in edit mode) */}
                  {isEditMode && (
                    <div className="flex-1 flex gap-1">
                      <button 
                        onClick={() => onSectionMove(section.id, section.position - 10)}
                        className="px-2 bg-gray-700 hover:bg-gray-600 rounded flex-1"
                        title="Move up 10vh"
                      >
                        ↑
                      </button>
                      <button 
                        onClick={() => onSectionMove(section.id, section.position + 10)}
                        className="px-2 bg-gray-700 hover:bg-gray-600 rounded flex-1"
                        title="Move down 10vh"
                      >
                        ↓
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Action buttons */}
          {isEditMode && (
            <div className="flex gap-2">
              <button
                onClick={onSave}
                className="flex-1 px-2 py-1 bg-purple-700 hover:bg-purple-600 text-xs rounded"
                title="Save positions to localStorage"
              >
                Save Positions
              </button>
              <button
                onClick={handleExport}
                className="flex-1 px-2 py-1 bg-blue-700 hover:bg-blue-600 text-xs rounded"
                title="Copy configuration to clipboard"
              >
                Export Config
              </button>
              <button
                onClick={onReset}
                className="flex-1 px-2 py-1 bg-red-700 hover:bg-red-600 text-xs rounded"
                title="Reset to original positions"
              >
                Reset
              </button>
            </div>
          )}
          
          <div className="mt-3 text-xs text-gray-400">
            Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">Ctrl</kbd>+<kbd className="px-1 py-0.5 bg-gray-700 rounded">Alt</kbd>+<kbd className="px-1 py-0.5 bg-gray-700 rounded">P</kbd> to toggle panel
          </div>
        </div>
      )}
    </div>
  );
}

AdminPanel.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired
  })).isRequired,
  onSectionMove: PropTypes.func.isRequired,
  onToggleEditMode: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  hiddenSections: PropTypes.arrayOf(PropTypes.string),
  onToggleSectionVisibility: PropTypes.func.isRequired,
  onShowAllSections: PropTypes.func.isRequired,
  onHideAllSections: PropTypes.func.isRequired
}; 