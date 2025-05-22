/**
 * @component CosmicBackgroundMini
 * @description Simplified cosmic background for visual demonstrations
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { useRef, useEffect } from 'react';

// Metadata for LEGIT compliance
export const metadata = {
  id: 'cosmic_background_mini',
  scs: 'SCS-BG-MINI',
  type: 'atomic',
  doc: 'cosmic_background_mini.md'
};

const CosmicBackgroundMini = ({ className = '' }) => {
  const canvasRef = useRef(null);
  
  // Draw starfield on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      drawStars();
    };
    
    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw 100 stars
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5 + 0.5;
        const opacity = Math.random() * 0.8 + 0.2;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
      
      // Draw grid
      ctx.strokeStyle = 'rgba(132, 204, 22, 0.05)';
      ctx.lineWidth = 1;
      
      const cellSize = 40;
      const cols = Math.ceil(canvas.width / cellSize);
      const rows = Math.ceil(canvas.height / cellSize);
      
      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        const x = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let i = 0; i <= rows; i++) {
        const y = i * cellSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900" />
      
      {/* Starfield and grid layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 100%)'
        }}
      />
    </div>
  );
};

export default CosmicBackgroundMini; 