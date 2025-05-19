/**
 * @metadata
 * @component StarfieldCanvasV6
 * @description Renders a dynamic starfield with performance optimization
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { useRef, useEffect } from 'react';
import { useScene } from './SceneControllerV6';

const StarfieldCanvasV6 = ({ density = 1.0 }) => {
  const canvasRef = useRef(null);
  const { scenePhase, deviceCapabilities } = useScene();
  
  // Setup and animate the starfield canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { prefersReducedMotion } = deviceCapabilities;
    
    // Set canvas dimensions with pixel ratio consideration
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      ctx.scale(dpr, dpr);
    };
    
    handleResize();
    
    // Create stars
    const stars = [];
    const initStars = () => {
      stars.length = 0; // Clear existing stars
      
      // Calculate appropriate star count based on screen size and density
      const area = window.innerWidth * window.innerHeight;
      const baseCount = Math.floor(area / 6000); // Base number of stars
      const starCount = Math.min(Math.floor(baseCount * density), 1500); // Cap at 1500 for performance
      
      // Create stars with varied parameters
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random() * 2 + 0.5, // Used for size and parallax
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          flickerSpeed: Math.random() * 0.03,
          flickerPhase: Math.random() * Math.PI * 2 // Random starting phase
        });
      }
    };
    
    initStars();
    
    // Animation variables
    let animationFrameId;
    let lastTime = 0;
    
    // Main animation loop
    const animate = (currentTime) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Update and draw stars
      stars.forEach(star => {
        // Skip animation for reduced motion preference
        const flicker = prefersReducedMotion 
          ? 1 
          : 0.7 + 0.3 * Math.sin(currentTime * star.flickerSpeed + star.flickerPhase);
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (star.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * flicker})`;
        ctx.fill();
        
        // Optional: add glow for larger stars on high-performance devices
        if (deviceCapabilities.performanceTier === 'high' && star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.2})`;
          ctx.fill();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, deviceCapabilities, scenePhase]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};

export default StarfieldCanvasV6;