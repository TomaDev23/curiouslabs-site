import { useEffect, useRef } from "react";

/**
 * SimpleStarfield component creates a lightweight canvas-based starfield background
 * More performant than the Three.js solution for devices that don't need complex 3D
 * Can be used as a drop-in replacement for StarfieldBackground
 */
export default function SimpleStarfield({ isLowPerf = false }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Create stars
    let stars = [];
    
    function createStars() {
      stars = [];
      // Adjust star density based on performance
      const starCount = Math.floor(canvas.width * canvas.height / (isLowPerf ? 5000 : 3000));
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    }
    
    // Animation loop
    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Subtle twinkle effect
        star.opacity += Math.random() * 0.02 - 0.01;
        star.opacity = Math.max(0.2, Math.min(1, star.opacity));
      });
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowPerf]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 z-0 bg-gradient-to-b from-blue-900/30 to-black"
    />
  );
} 