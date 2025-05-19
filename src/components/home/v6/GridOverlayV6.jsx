/**
 * @metadata
 * @component GridOverlayV6
 * @description Renders a subtle perspective grid overlay with performance-based density
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { useEffect, useRef } from 'react';
import { useScene } from './SceneControllerV6';

const GridOverlayV6 = () => {
  const canvasRef = useRef(null);
  const { deviceCapabilities } = useScene();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Grid configuration based on performance tier
    const getGridConfig = () => {
      const base = {
        cellSize: 50,
        fadeStart: 0.2,
        fadeEnd: 0.8,
        lineWidth: 1
      };
      
      switch (deviceCapabilities.performanceTier) {
        case 'high':
          return { ...base, cellSize: 40, lineWidth: 1 };
        case 'medium':
          return { ...base, cellSize: 50, lineWidth: 1 };
        case 'low':
          return { ...base, cellSize: 60, lineWidth: 1 };
        default:
          return { ...base, cellSize: 80, lineWidth: 1 };
      }
    };
    
    // Draw grid
    const drawGrid = () => {
      const config = getGridConfig();
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Set line style
      ctx.strokeStyle = 'rgba(132, 204, 22, 0.1)'; // Lime color
      ctx.lineWidth = config.lineWidth;
      
      // Calculate grid dimensions
      const cols = Math.ceil(width / config.cellSize);
      const rows = Math.ceil(height / config.cellSize);
      
      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        const x = i * config.cellSize;
        const opacity = Math.min(
          1,
          Math.abs(x - width / 2) / (width / 2) * 0.5
        );
        
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.globalAlpha = 1 - opacity;
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let i = 0; i <= rows; i++) {
        const y = i * config.cellSize;
        const opacity = Math.min(
          1,
          Math.abs(y - height / 2) / (height / 2) * 0.5
        );
        
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.globalAlpha = 1 - opacity;
        ctx.stroke();
      }
    };
    
    // Initial draw
    drawGrid();
    
    // Redraw on resize
    window.addEventListener('resize', drawGrid);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('resize', drawGrid);
    };
  }, [deviceCapabilities]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default GridOverlayV6;