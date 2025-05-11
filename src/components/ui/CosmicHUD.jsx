import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '../../context/ScrollContext';

/**
 * CosmicHUD - A space-themed heads-up display showing scroll position and active section
 * Designed to complement the cosmic theme of the site
 */
const CosmicHUD = ({ showSectionLabel = true, showProgress = true, position = 'bottom-left' }) => {
  const { scrollY, scrollProgress, activeSection, isAtTop, isAtBottom } = useScroll();
  
  // Define position classes based on the position prop
  const positionClasses = useMemo(() => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
      default:
        return 'bottom-4 left-4';
    }
  }, [position]);
  
  // Format active section name for display
  const formattedSectionName = useMemo(() => {
    if (!activeSection) return 'Cosmos';
    
    // Convert kebab-case to Title Case
    return activeSection
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }, [activeSection]);
  
  // Don't show when at very top of page
  if (isAtTop && !activeSection) return null;
  
  return (
    <motion.div
      className={`fixed ${positionClasses} z-[95] pointer-events-none`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/30 backdrop-blur-md p-2 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/10 flex flex-col items-center">
        {/* Section label */}
        {showSectionLabel && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection || 'cosmos'}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-mono text-purple-300 mb-1 px-1 flex items-center"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5"></span>
              {formattedSectionName}
            </motion.div>
          </AnimatePresence>
        )}
        
        {/* Progress visualization */}
        {showProgress && (
          <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CosmicHUD; 