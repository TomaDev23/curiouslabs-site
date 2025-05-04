import React, { useMemo, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ErrorBoundary from '../../ui/ErrorBoundary';
import { startComponentRender, endComponentRender } from '../../../utils/performanceMonitor';
import useAccessibilityCheck from '../../../hooks/useAccessibilityCheck';

/**
 * SpaceCanvas - Enhanced space-themed background using Canvas for performance
 * Provides a starfield background with density gradients and animated nebula effects
 * Canvas implementation drastically reduces DOM element count for better performance
 */
const SpaceCanvas = () => {
  // Performance monitoring
  const renderStartTime = startComponentRender('SpaceCanvas');
  
  // Accessibility checks
  const { ref: accessibilityRef } = useAccessibilityCheck('SpaceCanvas', {
    checkContrast: true,
    checkFocus: false, // No interactive elements
    checkAria: false  // No interactive elements
  });

  // Canvas refs
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  
  // Handle resize
  const handleResize = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Trigger redraw after resize
      if (canvasInitialized) {
        renderStarfield();
      }
    }
  };

  // Create stars with density gradient (more at top, fewer at bottom) - now used for canvas
  const createStars = (count, densityFactor = 1) => {
    return Array.from({ length: count }).map(() => {
      // Calculate vertical position - contained within viewport height (0-100%)
      const verticalPosition = Math.random() * 100;
      
      return {
        x: Math.random() * 100,
        y: verticalPosition,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3 * densityFactor,
        animationDuration: Math.random() * 3 + 2,
        twinklePhase: Math.random() * Math.PI * 2, // Random starting phase for twinkling
        // Generate a random color with slight variations for stars
        color: Math.random() > 0.8 
          ? `rgba(${220 + Math.random() * 35}, ${220 + Math.random() * 35}, ${255}, 1)` 
          : 'rgba(255, 255, 255, 1)'
      };
    });
  };
  
  // Generate different star layers - memoized
  const stars = useMemo(() => {
    const staticStars = createStars(250, 1);
    const animatedStars = createStars(80, 1.2);
    const distantStars = createStars(150, 0.7);
    
    return {
      staticStars,
      animatedStars,
      distantStars
    };
  }, []);
  
  // Render the starfield on canvas
  const renderStarfield = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate time for animations
    const time = performance.now() * 0.001; // Convert to seconds
    
    // Render static stars
    stars.staticStars.forEach(star => {
      const x = (star.x / 100) * canvas.width;
      const y = (star.y / 100) * canvas.height;
      
      ctx.beginPath();
      ctx.fillStyle = star.color;
      ctx.globalAlpha = star.opacity;
      ctx.arc(x, y, star.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow for larger stars
      if (star.size > 1.8) {
        const glow = ctx.createRadialGradient(
          x, y, 0,
          x, y, star.size * 4
        );
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = glow;
        ctx.globalAlpha = star.opacity * 0.5;
        ctx.arc(x, y, star.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    
    // Render distant stars
    stars.distantStars.forEach(star => {
      const x = (star.x / 100) * canvas.width;
      const y = (star.y / 100) * canvas.height;
      
      ctx.beginPath();
      ctx.fillStyle = star.color;
      ctx.globalAlpha = star.opacity * 0.6;
      ctx.arc(x, y, star.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Render animated stars with twinkling
    stars.animatedStars.forEach(star => {
      const x = (star.x / 100) * canvas.width;
      const y = (star.y / 100) * canvas.height;
      
      // Calculate twinkling effect
      const twinkle = Math.sin(time * (1 / star.animationDuration) + star.twinklePhase);
      const twinkleOpacity = star.opacity * 0.5 + (twinkle + 1) * 0.25 * star.opacity;
      const twinkleSize = star.size * 1.2 * (1 + twinkle * 0.1);
      
      // Draw the star
      ctx.beginPath();
      ctx.fillStyle = star.color;
      ctx.globalAlpha = twinkleOpacity;
      ctx.arc(x, y, twinkleSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect
      const glowOpacity = 0.4 * ((twinkle + 1) * 0.5);
      const glow = ctx.createRadialGradient(
        x, y, 0,
        x, y, star.size * 4
      );
      glow.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity})`);
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.globalAlpha = twinkleOpacity * 0.5;
      ctx.arc(x, y, star.size * 4, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Request next frame for animation
    requestRef.current = requestAnimationFrame(renderStarfield);
  };
  
  // Initialize canvas on mount and handle cleanup
  useEffect(() => {
    // Set up canvas
    if (canvasRef.current) {
      handleResize();
      renderStarfield();
      setCanvasInitialized(true);
    }
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Log render duration when component renders
    endComponentRender('SpaceCanvas', renderStartTime);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [renderStartTime, stars]);

  return (
    <ErrorBoundary 
      componentName="SpaceCanvas"
      fallback={<div className="fixed inset-0 z-0 overflow-hidden bg-black"></div>}
    >
      <div ref={accessibilityRef} className="fixed inset-0 z-0 overflow-hidden bg-black">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        
        {/* Starfield canvas - single DOM element for all stars */}
        <canvas 
          ref={canvasRef}
          className="fixed inset-0"
          style={{ zIndex: 1 }}
        />
        
        {/* Cosmic noise overlay */}
        <CosmicNoiseOverlay opacity={0.03} blendMode="soft-light" />
        
        {/* Enhanced nebula effects - fixed to viewport 
            These are kept as DOM elements because they use blur filters
            that are more efficient with CSS than Canvas */}
        <motion.div 
          className="fixed top-1/4 left-1/3 w-2/3 h-2/3 rounded-full opacity-10 blur-[100px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(30, 64, 175, 0.1) 50%, transparent 80%)',
            zIndex: 2
          }}
          animate={{ 
            opacity: [0.06, 0.1, 0.06],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="fixed bottom-[40%] right-1/4 w-1/2 h-1/2 rounded-full opacity-10 blur-[80px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(91, 33, 182, 0.1) 60%, transparent 80%)', 
            zIndex: 2 
          }}
          animate={{ 
            opacity: [0.06, 0.12, 0.06],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
        
        <motion.div 
          className="fixed top-[60%] left-1/5 w-1/3 h-1/3 rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(216, 180, 254, 0.3) 0%, rgba(129, 140, 248, 0.1) 60%, transparent 80%)',
            zIndex: 2
          }}
          animate={{ 
            opacity: [0.05, 0.09, 0.05],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />
        
        {/* Overlay gradient for fading to black at the bottom */}
        <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent pointer-events-none" style={{ zIndex: 3 }}></div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(SpaceCanvas); 