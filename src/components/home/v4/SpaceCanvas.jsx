import React, { useMemo, useEffect, useState, useRef } from 'react';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ErrorBoundary from '../../ui/ErrorBoundary';
import { startComponentRender, endComponentRender } from '../../../utils/performanceMonitor';
import useAccessibilityCheck from '../../../hooks/useAccessibilityCheck';

/**
 * SpaceCanvas - Enhanced space-themed background for cosmic components
 * Provides an extended starfield background with density gradients and animated nebula effects
 * Optimized version using HTML5 Canvas instead of DOM elements for stars
 */
const SpaceCanvas = () => {
  // Performance monitoring
  const renderStartTime = startComponentRender('SpaceCanvas');
  
  // Canvas refs
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  
  // State for canvas initialization and error handling
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Accessibility checks
  const { ref: accessibilityRef } = useAccessibilityCheck('SpaceCanvas', {
    checkContrast: true,
    checkFocus: false, // No interactive elements
    checkAria: false  // No interactive elements
  });
  
  // Check if we're on the client side
  const isClient = typeof window !== 'undefined';
  
  // Create stars with density gradient (more at top, fewer at bottom)
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
    // Check if we're on mobile
    const isMobile = isClient && window.innerWidth < 768;
    
    // Reduce star count on mobile devices
    const staticStars = createStars(isMobile ? 150 : 250, 1);
    const animatedStars = createStars(isMobile ? 40 : 80, 1.2);
    const distantStars = createStars(isMobile ? 90 : 150, 0.7);
    
    return {
      staticStars,
      animatedStars,
      distantStars
    };
  }, [isClient]);
  
  // Handle resize - keeps canvas sized to the window
  const handleResize = () => {
    if (!canvasRef.current) return;
    
    try {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Trigger redraw after resize
      if (canvasInitialized) {
        renderStarfield();
      }
    } catch (error) {
      console.error("[SpaceCanvas] Error in resize handler:", error);
      setHasError(true);
      setErrorMessage(`Resize error: ${error.message}`);
    }
  };
  
  // Render the starfield on canvas
  const renderStarfield = () => {
    if (!canvasRef.current) return;
    
    try {
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
    } catch (error) {
      console.error("[SpaceCanvas] Error rendering starfield:", error);
      setHasError(true);
      setErrorMessage(`Render error: ${error.message}`);
      
      // Cancel animation loop on error
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }
  };
  
  // Initialize canvas on mount and handle cleanup
  useEffect(() => {
    // Safety check for client-side rendering
    if (!isClient) return;
    
    let isMounted = true;
    
    // Set up canvas - wrapped in try/catch for safety
    try {
      if (canvasRef.current) {
        handleResize(); // Set initial canvas size
        renderStarfield(); // Start animation
        
        if (isMounted) {
          setCanvasInitialized(true);
        }
      }
      
      // Add resize listener
      window.addEventListener('resize', handleResize);
    } catch (error) {
      console.error("[SpaceCanvas] Error initializing canvas:", error);
      if (isMounted) {
        setHasError(true);
        setErrorMessage(`Initialization error: ${error.message}`);
      }
    }
    
    // Log render duration when component renders
    endComponentRender('SpaceCanvas', renderStartTime);
    
    // Cleanup
    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isClient, renderStartTime]);

  // Early return for server-side rendering
  if (!isClient) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden bg-black">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary 
      componentName="SpaceCanvas"
      fallback={<div className="fixed inset-0 z-0 overflow-hidden bg-black"></div>}
    >
      <div ref={accessibilityRef} className="fixed inset-0 z-0 overflow-hidden bg-black">
        {/* Background gradient */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-gray-900 to-black"></div>
        
        {/* Cosmic noise overlay */}
        <CosmicNoiseOverlay opacity={0.03} blendMode="soft-light" />
        
        {/* Canvas starfield - replaces all individual star divs */}
        <canvas 
          ref={canvasRef}
          className="fixed inset-0"
          style={{ zIndex: 1 }}
        />
        
        {/* Show error message if something goes wrong */}
        {hasError && (
          <div className="fixed inset-0 flex items-center justify-center z-20">
            <div className="bg-red-900/80 p-6 rounded-lg max-w-md">
              <h3 className="text-xl text-white mb-2">Canvas Error</h3>
              <p className="text-red-200 mb-4">{errorMessage || "An error occurred initializing the canvas."}</p>
              <div className="text-red-200 text-sm">
                Using fallback display mode. Please reload the page to try again.
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default SpaceCanvas; 