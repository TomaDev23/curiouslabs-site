import React, { useState, useEffect, useRef, forwardRef } from 'react';
import MissionControlNavbar from '../navigation/MissionControlNavbar';
import FooterExperience from '../home/v4/FooterExperience';
import CosmicJourneyController from '../journey/CosmicJourneyController';
import { ContentLayer } from './ContentLayer';
import { AdvancedControlPanel } from './AdvancedControlPanel';
import { HOME_V5_SECTIONS, SectionRegistry } from '../../config/SectionRegistry';
import HUDHub, { HUDProvider } from '../ui/HUDHub';
import withDraggable from '../ui/DraggableHOC';
import BaseStarfieldBackdrop from '../home/v5/BaseStarfieldBackdrop';

// LEGIT compliance metadata
export const metadata = {
  id: 'atomic_page_frame',
  scs: 'SCS-PAGE-FRAME',
  type: 'layout',
  doc: 'contract_atomic_page_frame.md'
};

// Local storage key for saving section positions
const STORAGE_KEY = 'home-v5-section-positions';
const VISIBILITY_KEY = 'home-v5-section-visibility';

// Create a draggable version of AdvancedControlPanel for the page
const PageDraggableAdvancedControlPanel = withDraggable(AdvancedControlPanel, {
  defaultPosition: { x: 100, y: 100 },
  zIndex: 20000,
  storageId: 'page_draggable_admin_panel_position'
});

export const AtomicPageFrame = forwardRef(({ scenes = [], scrollProgress = 0 }, ref) => {
  // Track whether we're in edit mode
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Track whether to show the admin panel
  const [showAdminPanel, setShowAdminPanel] = useState(false); // Start invisible by default
  
  // Track hidden sections by ID
  const [hiddenSections, setHiddenSections] = useState(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedVisibility = localStorage.getItem(VISIBILITY_KEY);
        if (savedVisibility) {
          return JSON.parse(savedVisibility);
        }
      } catch (e) {
        console.error('Error loading saved visibility:', e);
      }
    }
    
    // Default to no hidden sections
    return [];
  });
  
  // State for section configurations, initialized from localStorage or defaults
  const [sections, setSections] = useState(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const savedPositions = localStorage.getItem(STORAGE_KEY);
        if (savedPositions) {
          // Parse saved positions and merge with default sections
          const positionMap = JSON.parse(savedPositions);
          
          // Return sections with saved positions
          return HOME_V5_SECTIONS.map(section => {
            const savedSection = positionMap.find(s => s.id === section.id);
            return savedSection 
              ? { ...section, position: savedSection.position } 
              : section;
          });
        }
      } catch (e) {
        console.error('Error loading saved positions:', e);
      }
    }
    
    // Fall back to default positions
    return HOME_V5_SECTIONS;
  });
  
  // Effect to handle keyboard shortcuts and development mode
  useEffect(() => {
    // Only enable in development mode
    if (process.env.NODE_ENV !== 'development') {
      setShowAdminPanel(false);
      return;
    }

    const handleKeyDown = (e) => {
      // Toggle admin panel with Ctrl+Alt+P
      if (e.ctrlKey && e.altKey && e.key === 'p') {
        setShowAdminPanel(prev => !prev);
        console.log('[HUD ATOMIC 1] Visibility toggled with keyboard shortcut');
      }
    };

    // Listen for custom event from NavBar button
    const handleToggleHudAtomic1 = () => {
      setShowAdminPanel(prev => !prev);
      console.log('[HUD ATOMIC 1] Visibility toggled from NavBar button');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggleHudAtomic1', handleToggleHudAtomic1);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggleHudAtomic1', handleToggleHudAtomic1);
    };
  }, []);
  
  // Handle section drag for positioning
  const handleSectionDrag = (id, newPosition) => {
    // Ensure position is within reasonable bounds (0 to 1000vh)
    const position = Math.max(0, Math.min(1000, newPosition));
    
    // Update the section position
    setSections(prevSections => {
      const newSections = prevSections.map(section => 
        section.id === id 
          ? { ...section, position } 
          : section
      );
      
      // Auto-save to localStorage for immediate persistence
      try {
        const positionsToSave = newSections.map(({ id, position }) => ({ id, position }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(positionsToSave));
      } catch (e) {
        console.warn('Auto-save failed:', e);
      }
      
      return newSections;
    });
  };
  
  // For backward compatibility - use handleSectionDrag
  const handleSectionPositionChange = handleSectionDrag;
  
  // Save current positions to localStorage
  const handleSavePositions = () => {
    try {
      // Validate sections before saving
      if (!sections || !Array.isArray(sections)) {
        throw new Error('Invalid sections data');
      }
      
      // Extract and validate positions
      const positionsToSave = sections.map(section => {
        if (!section.id || typeof section.position !== 'number') {
          throw new Error(`Invalid section data: ${JSON.stringify(section)}`);
        }
        return {
          id: section.id,
          position: Math.max(0, Math.min(1000, section.position)) // Ensure valid range
        };
      });
      
      // Save positions
      localStorage.setItem(STORAGE_KEY, JSON.stringify(positionsToSave));
      
      // Save visibility state
      if (Array.isArray(hiddenSections)) {
        localStorage.setItem(VISIBILITY_KEY, JSON.stringify(hiddenSections));
      }
      
      alert('Section positions and visibility saved successfully!');
      
      // Log for verification
      console.log('Saved positions:', positionsToSave);
    } catch (e) {
      console.error('Error saving positions:', e);
      alert('Error saving positions. See console for details.');
    }
  };
  
  // Reset positions to defaults
  const handleResetPositions = () => {
    if (window.confirm('Reset all positions to default and show all sections?')) {
      setSections(HOME_V5_SECTIONS);
      setHiddenSections([]);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(VISIBILITY_KEY);
    }
  };
  
  // Toggle section visibility
  const handleToggleSectionVisibility = (id) => {
    setHiddenSections(prev => {
      if (prev.includes(id)) {
        // Section is currently hidden, so show it
        return prev.filter(sectionId => sectionId !== id);
      } else {
        // Section is currently visible, so hide it
        return [...prev, id];
      }
    });
  };
  
  // Show all sections
  const handleShowAllSections = () => {
    setHiddenSections([]);
  };
  
  // Hide all sections
  const handleHideAllSections = () => {
    setHiddenSections(sections.map(section => section.id));
  };
  
  // Toggle edit mode
  const handleToggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };
  
  // Calculate spacer height based on the last section position
  const maxPosition = sections.reduce(
    (max, section) => Math.max(max, section.position), 
    0
  );
  const spacerHeight = Math.max(800, maxPosition + 100); // Add 100vh for last section height
  
  return (
    <HUDProvider>
      {/* Root container - optimize for proper scroll event propagation */}
      <div 
        className="w-full text-white"
        ref={ref}
        data-legit-root="atomic-page-frame"
      >
        {/* Base Layer (z-0 to z-9): CosmicJourneyController */}
        <div className="fixed inset-0 z-0" data-legit-layer="base">
          <BaseStarfieldBackdrop />
          <CosmicJourneyController 
            scenes={scenes} 
            scrollProgress={scrollProgress} 
          />
        </div>
        
        {/* Navigation Layer (z-110 to z-119): NavBar */}
        <div className="z-[110]" data-legit-layer="navigation">
          <MissionControlNavbar />
        </div>
        
        {/* Content Layer (z-10 to z-50): ContentLayer */}
        <div className="z-[10]" data-legit-layer="content">
          <ContentLayer 
            sections={sections} 
            SectionRegistry={SectionRegistry}
            isEditMode={isEditMode} 
            hiddenSections={hiddenSections}
          />
        </div>
        
        {/* Spacer to create page height */}
        <div 
          className="w-full pointer-events-none" 
          style={{ height: `${spacerHeight}vh` }}
          data-legit-element="spacer"
        >
          {/* VH Markers for design reference (hidden in production) */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <div className="absolute top-[100vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">100vh</span>
              </div>
              <div className="absolute top-[200vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">200vh</span>
              </div>
              <div className="absolute top-[300vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">300vh</span>
              </div>
              <div className="absolute top-[400vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">400vh</span>
              </div>
              <div className="absolute top-[500vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">500vh</span>
              </div>
              <div className="absolute top-[600vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">600vh</span>
              </div>
              <div className="absolute top-[700vh] left-0 w-full border-t border-dashed border-purple-500/30">
                <span className="bg-black/70 text-purple-400 px-2 py-1 text-xs rounded">700vh</span>
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <FooterExperience />
        
        {/* UI Control Layer (z-60 to z-90): Admin Panel */}
        {showAdminPanel && (
          <div className="z-[80]" data-legit-layer="ui-control">
            <PageDraggableAdvancedControlPanel 
              sections={sections}
              onSectionMove={handleSectionPositionChange}
              onToggleEditMode={handleToggleEditMode}
              isEditMode={isEditMode}
              onSave={handleSavePositions}
              onReset={handleResetPositions}
              hiddenSections={hiddenSections}
              onToggleSectionVisibility={handleToggleSectionVisibility}
              onShowAllSections={handleShowAllSections}
              onHideAllSections={handleHideAllSections}
              customClassName=""
              customTitle="HUD ATOMIC 1"
              scenes={scenes}
              scrollProgress={scrollProgress}
            />
          </div>
        )}
        
        {/* HUD Layer (z-100 to z-109): HUD Hub */}
        {process.env.NODE_ENV === 'development' && (
          <div className="z-[100]" data-legit-layer="hud">
            <HUDHub />
          </div>
        )}
      </div>
    </HUDProvider>
  );
}); 