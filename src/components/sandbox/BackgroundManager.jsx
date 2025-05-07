import React, { useEffect, useState, useRef, useMemo } from 'react';
import ParticleField from '../../components/ui/ParticleField';
import SpaceCanvas from '../../components/visual/SpaceCanvas';
// No longer a TODO - we have implemented SpaceCanvas

console.log("✅ SANDBOX BackgroundManager.jsx FILE LOADED");

// Simple throttle implementation to avoid lodash dependency
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Simplified ZONE_CONFIG - direct 3-zone structure
const ZONE_CONFIG = {
  hero: {
    label: 'Starry Night',
    range: [0, 100], // vh units
  },
  services: {
    label: 'Cosmic Dawn',
    range: [90, 200],
  },
  community: {
    label: 'Sunrise Embrace',
    range: [190, 300],
  }
};

// Configuration for transitions
const ZONE_TRANSITION_CONFIG = {
  transitionDuration: 0.8, // seconds
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const BackgroundManager = ({ children }) => {
  console.log("✅ SANDBOX BackgroundManager COMPONENT MOUNTED");
  
  const [scrollY, setScrollY] = useState(0);
  const [activeZones, setActiveZones] = useState({});
  const [viewportHeight, setViewportHeight] = useState(0);
  const animationFrame = useRef(null);
  
  // Calculate viewport height once component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("✅ SANDBOX BackgroundManager useEffect EXECUTED");
      setViewportHeight(window.innerHeight);
      
      const handleResize = throttle(() => {
        setViewportHeight(window.innerHeight);
      }, 200);
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Handle scroll position updates
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      animationFrame.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);
  
  // Calculate which zones are active and their opacity based on scroll position
  useEffect(() => {
    if (!viewportHeight) return;

    const newActiveZones = {};
    const scrollInVh = (scrollY / viewportHeight) * 100;
    
    Object.entries(ZONE_CONFIG).forEach(([zoneId, zone]) => {
      const [start, end] = zone.range;
      let opacity = 0;
      
      // Calculate opacity based on scroll position
      if (scrollInVh < start) {
        opacity = 0;
      } else if (scrollInVh > end) {
        opacity = 0;
      } else if (scrollInVh > start + 10 && scrollInVh < end - 10) {
        opacity = 1;
      } else if (scrollInVh >= start && scrollInVh <= start + 10) {
        opacity = (scrollInVh - start) / 10;
      } else if (scrollInVh >= end - 10 && scrollInVh <= end) {
        opacity = (end - scrollInVh) / 10;
      }
      
      newActiveZones[zoneId] = opacity;
    });
    
    setActiveZones(newActiveZones);
  }, [scrollY, viewportHeight]);
  
  // Render backgrounds directly with hardcoded zones
  const renderZone = (zoneId, opacity) => {
    if (opacity === 0) return null;
    
    const transitionStyle = {
      opacity,
      transition: `opacity ${ZONE_TRANSITION_CONFIG.transitionDuration}s ${ZONE_TRANSITION_CONFIG.easing}`,
      zIndex: 0,
    };
    
    switch (zoneId) {
      case 'hero':
        return (
          <div key={zoneId} className="fixed inset-0 w-full h-full pointer-events-none" style={transitionStyle}>
            {/* Zone 1: Pure Starfield */}
            <div className="absolute inset-0 z-0 bg-black" />
            <SpaceCanvas zone={zoneId} className="absolute inset-0 z-1" />
          </div>
        );
        
      case 'services':
        return (
          <div key={zoneId} className="fixed inset-0 w-full h-full pointer-events-none" style={transitionStyle}>
            {/* Zone 2: Cosmic Night */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d0d12] to-[#1a1a1f]" />
            <ParticleField
              density="medium"
              yDirection="up"
              className="absolute inset-0 z-1"
            />
            <div className="absolute inset-0 z-2 opacity-20 pointer-events-none bg-gradient-to-br from-indigo-900/30 via-purple-800/10 to-blue-900/20" />
          </div>
        );
        
      case 'community':
        return (
          <div key={zoneId} className="fixed inset-0 w-full h-full pointer-events-none" style={transitionStyle}>
            {/* Zone 3: Sunrise Embrace */}
            <div className="absolute inset-0 z-0 bg-black" />
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-yellow-700/10 via-orange-500/10 to-transparent" />
            <div 
              className="absolute bottom-0 left-0 w-full h-[70vh] z-2 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'url(/images/bg/sun_beams_overlay.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                mixBlendMode: 'screen',
                backgroundColor: 'rgba(251, 113, 133, 0.05)'
              }}
            />
            <div 
              className="absolute inset-0 z-3 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'url(/images/bg/warm_noise.png)',
                backgroundSize: 'cover',
                mixBlendMode: 'overlay',
                backgroundColor: 'rgba(217, 119, 6, 0.02)'
              }}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  // Debug overlay
  const DebugOverlay = () => {
    return (
      <div className="fixed top-4 right-4 z-50 bg-black/70 p-2 rounded text-xs text-white">
        <div>Scroll: {Math.round((scrollY / viewportHeight) * 100)}vh</div>
        <div>
          Active: {Object.entries(activeZones)
            .filter(([_, opacity]) => opacity > 0)
            .map(([id, opacity]) => `${id}(${opacity.toFixed(2)})`)
            .join(', ') || 'none'}
        </div>
      </div>
    );
  };
  
  return (
    <>
      {/* Background Container */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        {Object.entries(activeZones).map(([zoneId, opacity]) => 
          renderZone(zoneId, opacity)
        )}
      </div>
      
      {/* Debug Overlay */}
      <DebugOverlay />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default BackgroundManager; 