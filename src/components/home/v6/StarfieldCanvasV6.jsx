/**
 * @component StarfieldCanvasV6
 * @description Performance-optimized starfield background using canvas
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - StarfieldCanvasV6 passes LEGIT protocol
 */

import React, { useEffect, useRef } from 'react';
import { useScene } from './SceneControllerV6';

const StarfieldCanvasV6 = () => {
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
    
    // Star configuration based on performance tier
    const getStarCount = () => {
      switch (deviceCapabilities.performanceTier) {
        case 'high': return 200;
        case 'medium': return 150;
        case 'low': return 100;
        default: return 50;
      }
    };
    
    // Create stars
    const stars = Array.from({ length: getStarCount() }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1
    }));
    
    // Animation loop
    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw stars
      stars.forEach(star => {
        // Move star
        star.y += star.speed;
        
        // Reset position if off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        
        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.7})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start animation if not in reduced motion mode
    if (!deviceCapabilities.prefersReducedMotion) {
      animate();
    } else {
      // Draw static stars for reduced motion
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
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

export default StarfieldCanvasV6; 