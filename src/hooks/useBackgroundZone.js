import { useEffect, useRef } from 'react';

/**
 * useBackgroundZone - Hook to sync a section with the BackgroundManager
 * Registers a section's ref with the zone registry to enable background transitions
 * 
 * @param {string} zoneName - The name of the zone (must match a key in ZONE_BACKGROUND_MAP)
 * @returns {Object} - The ref to attach to the section
 * 
 * @example
 * // In a section component:
 * const { ref } = useBackgroundZone('hero');
 * return <section ref={ref}>Content</section>;
 */
export const useBackgroundZone = (zoneName) => {
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Register this zone with the background manager
    if (window.__backgroundZoneRegistry?.register) {
      window.__backgroundZoneRegistry.register(zoneName, ref.current);
      console.log(`Registered zone: ${zoneName}`);
    } else {
      console.warn('BackgroundManager not initialized yet. Zone registration pending.');
    }
    
    return () => {
      // Cleanup logic if needed
      console.log(`Zone unregistered: ${zoneName}`);
    };
  }, [zoneName]);
  
  return { ref };
};

export default useBackgroundZone; 