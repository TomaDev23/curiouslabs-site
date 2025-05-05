import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint.js';

/**
 * ParticleField - Creates ambient floating particles with random movement patterns
 * Optimized version using Canvas API for rendering instead of DOM elements
 * 
 * @param {Object} props
 * @param {string} props.density - Particle density: 'low', 'medium', 'high'
 * @param {number} props.zIndex - z-index value for positioning
 * @param {string} props.yDirection - Direction of movement: 'up', 'down', 'mixed'
 */
const ParticleField = ({ 
  density = 'medium', 
  zIndex = 0,
  yDirection = 'up'
}) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  // Canvas references
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // State for tracking visibility and errors
  const [isVisible, setIsVisible] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Check if we're on the client side
  const isClient = typeof window !== 'undefined';
  
  // Determine number of particles based on density and device - REDUCED COUNT BY 40%
  const getParticleCount = () => {
    const counts = {
      low: isMobile ? 9 : 15,     // Reduced from 15/25
      medium: isMobile ? 15 : 24, // Reduced from 25/40
      high: isMobile ? 21 : 36    // Reduced from 35/60
    };
    return counts[density] || counts.medium;
  };
  
  // Calculate y-direction animation based on direction prop
  const getYAnimation = (randomFactor, dir = yDirection) => {
    if (dir === 'up') return -30 * randomFactor;
    if (dir === 'down') return 30 * randomFactor;
    // For mixed, randomly choose up or down
    return Math.random() > 0.5 ? -30 * randomFactor : 30 * randomFactor;
  };
  
  // Memoize particles to prevent unnecessary re-renders
  const particles = useMemo(() => {
    return Array.from({ length: getParticleCount() }).map((_, i) => {
      const randomFactor = Math.random() * 0.6 + 0.7; // 0.7 to 1.3
      const size = (Math.random() * 1.5 + 1) * (isMobile ? 0.8 : 1); // Slightly smaller on mobile
      const particleYDirection = yDirection === 'mixed' 
        ? (Math.random() > 0.5 ? 'up' : 'down')
        : yDirection;
      
      return {
        id: i,
        x: Math.random() * 100, // % position
        y: Math.random() * 100, // % position
        originalY: Math.random() * 100, // Store original position for animation
        size,
        duration: 10 + Math.random() * 15, // 10-25 seconds
        speed: 10 + Math.random() * 15, // Speed for canvas animation
        delay: Math.random() * 5,
        progress: Math.random(), // Current progress in the animation (0-1)
        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
        direction: particleYDirection,
        randomFactor,
        xOffset: (Math.random() - 0.5) * 20, // Slight horizontal drift
        color: 'rgba(167, 139, 250, 0.3)' // Purple tint
      };
    });
  }, [density, isMobile, yDirection]);
  
  // Generate a few brighter particles for visual interest
  const brightParticles = useMemo(() => {
    return Array.from({ length: Math.floor(getParticleCount() / 6) }).map(() => {
      const randomFactor = Math.random() * 0.5 + 0.8;
      const particleYDirection = yDirection === 'mixed' 
        ? (Math.random() > 0.5 ? 'up' : 'down')
        : yDirection;
      
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        originalY: Math.random() * 100,
        size: Math.random() * 2 + 1.5,
        speed: 8 + Math.random() * 10,
        progress: Math.random(),
        direction: particleYDirection,
        randomFactor,
        xOffset: (Math.random() - 0.5) * 15,
        opacity: 0.6,
        color: 'rgba(96, 165, 250, 0.4)', // Blue tone
      };
    });
  }, [density, yDirection]);
  
  // Handle canvas resize
  const handleResize = () => {
    if (!canvasRef.current || !isClient) return;
    
    try {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    } catch (error) {
      console.error("[ParticleField] Resize error:", error);
      setHasError(true);
    }
  };
  
  // Animation loop for Canvas rendering
  const animate = () => {
    if (!canvasRef.current || !isVisible || !isClient) return;
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw regular particles
      particles.forEach(particle => {
        // Update progress
        particle.progress += 1 / (particle.speed * 60); // 60fps target
        if (particle.progress >= 1) particle.progress = 0;
        
        // Calculate position
        const yMove = getYAnimation(particle.randomFactor, particle.direction);
        const currentY = particle.originalY + (yMove * particle.progress);
        const currentX = particle.x + (particle.xOffset * particle.progress);
        
        // Draw particle
        const xPos = (currentX / 100) * width;
        const yPos = (currentY / 100) * height;
        
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(xPos, yPos, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw bright particles
      brightParticles.forEach(particle => {
        // Update progress
        particle.progress += 1 / (particle.speed * 60);
        if (particle.progress >= 1) particle.progress = 0;
        
        // Calculate position
        const yMove = getYAnimation(particle.randomFactor, particle.direction);
        const currentY = particle.originalY + (yMove * particle.progress);
        const currentX = particle.x + (particle.xOffset * particle.progress);
        
        // Draw particle with glow effect
        const xPos = (currentX / 100) * width;
        const yPos = (currentY / 100) * height;
        
        // Fluctuating opacity based on progress
        const currentOpacity = particle.opacity * (0.8 + Math.sin(particle.progress * Math.PI * 2) * 0.2);
        
        // Draw glow
        const glow = ctx.createRadialGradient(
          xPos, yPos, 0,
          xPos, yPos, particle.size * 3
        );
        glow.addColorStop(0, 'rgba(147, 197, 253, 0.3)');
        glow.addColorStop(1, 'rgba(147, 197, 253, 0)');
        
        ctx.globalAlpha = currentOpacity * 0.7;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(xPos, yPos, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw center
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(xPos, yPos, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Request next animation frame
      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error("[ParticleField] Animation error:", error);
      setHasError(true);
      
      // Cancel animation on error
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };
  
  // Initialize canvas and animation
  useEffect(() => {
    if (!isClient) return;
    
    let isMounted = true;
    
    try {
      handleResize();
      window.addEventListener('resize', handleResize);
      animate();
      
      // Observer to pause animation when not visible
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (isMounted) {
              setIsVisible(entry.isIntersecting);
            }
          },
          { threshold: 0.1 }
        );
        
        if (canvasRef.current) {
          observer.observe(canvasRef.current);
        }
        
        return () => {
          isMounted = false;
          observer.disconnect();
        };
      }
    } catch (error) {
      console.error("[ParticleField] Setup error:", error);
      if (isMounted) {
        setHasError(true);
      }
    }
    
    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);
  
  // Update animation when visibility changes
  useEffect(() => {
    if (isVisible && !animationRef.current) {
      animate();
    } else if (!isVisible && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [isVisible]);
  
  // Early return for server-side rendering
  if (!isClient) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none" 
        style={{ zIndex }}
      ></div>
    );
  }
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ 
          opacity: hasError ? 0 : 1,
          transition: 'opacity 0.5s ease'
        }}
      />
    </div>
  );
};

export default ParticleField; 