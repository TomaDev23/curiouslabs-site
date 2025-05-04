import React, { createContext, useEffect, useState, useContext } from 'react';

// ✅ Tile W1.3 — Cosmic HUD Sync
// Create scroll context to broadcast section + scroll state

/**
 * Context for tracking scroll position and active section
 * Used by navigation components and the floating HUD
 */
export const ScrollContext = createContext({
  scrollY: 0,
  scrollDirection: 'none',
  activeSection: '',
  scrollProgress: 0,
  isAtTop: true,
  isAtBottom: false
});

/**
 * Hook for easy access to scroll context
 */
export const useScroll = () => useContext(ScrollContext);

/**
 * Provider component for scroll tracking
 * Broadcasts scroll position, direction, active section and overall progress
 */
export const ScrollProvider = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Update scroll position
      setScrollY(currentY);
      
      // Determine scroll direction
      if (currentY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentY < lastScrollY) {
        setScrollDirection('up');
      }
      setLastScrollY(currentY);
      
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentY / totalHeight) : 0;
      setScrollProgress(progress);
      
      // Determine if at top/bottom of page
      setIsAtTop(currentY <= 10);
      setIsAtBottom(Math.abs(currentY + window.innerHeight - document.documentElement.scrollHeight) <= 10);
      
      // Find active section based on viewport position
      const sections = document.querySelectorAll('section[id]');
      let found = '';
      for (let section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          found = section.id;
          break;
        }
      }
      setActiveSection(found);
    };
    
    // Initialize values
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // Context value object
  const value = {
    scrollY,
    scrollDirection,
    activeSection,
    scrollProgress,
    isAtTop,
    isAtBottom
  };
  
  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}; 