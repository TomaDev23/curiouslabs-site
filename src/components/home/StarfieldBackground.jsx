// 🛡️ STAR_LOCKED: Do not remove or alter – see STAR_LOCK_V1.md
import React, { useEffect, useRef } from 'react';

/**
 * Starfield Background Component - Phase 1 Placeholder
 * Will be fully implemented in Phase 2
 */
const StarfieldBackground = ({ isLowPerf = false }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || isLowPerf) return;
    
    // This will be fully implemented in Phase 2
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Simple placeholder stars for Phase 1
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5 + 0.5;
      
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const handleResize = () => {
      if (canvasRef.current) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLowPerf]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-black"
    />
  );
};

export default StarfieldBackground; 