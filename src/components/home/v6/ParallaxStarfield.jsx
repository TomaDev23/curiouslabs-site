/**
 * @component ParallaxStarfield
 * @description Canvas-based parallax starfield effect for CuriousLabs V6
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - ParallaxStarfield passes LEGIT protocol
 */

import React, { useEffect, useRef } from 'react';

const ParallaxStarfield = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    
    // Initialize stars
    const initStars = () => {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 4000); // Adjust density
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 2 + 0.5, // Depth between 0.5 and 2.5
          size: Math.random() * 1.5 + 0.5, // Size between 0.5 and 2
          color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})` // Varying opacity
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      if (prefersReducedMotion) {
        // Just render static stars if reduced motion is preferred
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        });
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get scroll position for parallax effect
      const scrollY = window.scrollY;
      
      // Draw and update stars
      stars.forEach(star => {
        // Calculate parallax offset based on depth (z) and scroll position
        const parallaxOffset = (scrollY * star.z * 0.2) % canvas.height;
        
        // Calculate y position with parallax
        let y = (star.y + parallaxOffset) % canvas.height;
        if (y < 0) y += canvas.height;
        
        // Draw star
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Setup
    handleResize();
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParallaxStarfield; 