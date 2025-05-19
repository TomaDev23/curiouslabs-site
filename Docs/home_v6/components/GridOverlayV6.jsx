/**
 * @metadata
 * @component GridOverlayV6
 * @description Renders a subtle grid overlay with performance-optimized drawing
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { useRef, useEffect } from 'react';
import { useScene } from './SceneControllerV6';

const GridOverlayV6 = ({ opacity = 0.05 }) => {
  const canvasRef = useRef(null);
  const { deviceCapabilities } = useScene();
  
  // Setup and draw the grid overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { performanceTier, prefersReducedMotion } = deviceCapabilities;
    
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
      
      // Redraw grid after resize
      drawGrid();
    };
    
    // Draw grid function
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set grid styling
      ctx.strokeStyle = `rgba(132, 204, 22, ${opacity})`; // lime color with variable opacity
      ctx.lineWidth = 0.5;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Determine grid density based on performance tier
      const gridSpacing = {
        high: 40,
        medium: 60,
        low: 80,
        minimal: 100
      }[performanceTier] || 60;
      
      // Simple grid for reduced motion or minimal performance
      if (prefersReducedMotion || performanceTier === 'minimal') {
        // Draw horizontal lines
        for (let y = 0; y < height; y += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
        
        // Draw vertical lines
        for (let x = 0; x < width; x += gridSpacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        
        return;
      }
      
      // Advanced grid with perspective for better performance
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Horizon line (perspective vanishing point)
      const horizonY = height * 0.45;
      
      // Draw horizontal grid lines with perspective
      const horizonLines = performanceTier === 'high' ? 25 : 15;
      for (let i = 0; i < horizonLines; i++) {
        // More lines near the horizon, fewer far away
        const spacing = Math.pow(i / horizonLines, 1.5);
        const y = horizonY + spacing * height * 0.6;
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.globalAlpha = opacity * (1 - spacing * 0.7); // Fade out distant lines
        ctx.stroke();
      }
      
      // Draw vertical grid lines with perspective
      const vertLines = performanceTier === 'high' ? 30 : 20;
      for (let i = 0; i <= vertLines; i++) {
        const x = centerX + (i - vertLines/2) * gridSpacing;
        
        ctx.beginPath();
        ctx.moveTo(x, horizonY);
        ctx.lineTo(x + (x - centerX) * 0.8, height);
        ctx.globalAlpha = opacity * (1 - Math.abs(i - vertLines/2) / vertLines * 0.5);
        ctx.stroke();
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1;
    };
    
    // Initialize
    handleResize();
    drawGrid();
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity, deviceCapabilities]);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};

export default GridOverlayV6;