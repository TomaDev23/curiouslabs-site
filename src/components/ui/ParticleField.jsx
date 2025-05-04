import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint.js';

/**
 * ParticleField - Creates ambient floating particles with random movement patterns
 * Implemented with Canvas for improved performance and reduced DOM elements
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
  
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  
  // Determine number of particles based on density and device
  const getParticleCount = () => {
    const counts = {
      low: isMobile ? 15 : 25,
      medium: isMobile ? 25 : 40,
      high: isMobile ? 35 : 60
    };
    return counts[density] || counts.medium;
  };
  
  // Calculate y-direction animation based on direction prop
  const getYAnimation = (randomFactor, baseDirection) => {
    if (baseDirection === 'up') return -30 * randomFactor;
    if (baseDirection === 'down') return 30 * randomFactor;
    // For mixed, randomly choose up or down
    return Math.random() > 0.5 ? -30 * randomFactor : 30 * randomFactor;
  };
  
  // Generate particles data - memoized
  const particles = useMemo(() => {
    return Array.from({ length: getParticleCount() }).map(() => {
      const randomFactor = Math.random() * 0.6 + 0.7; // 0.7 to 1.3
      const size = (Math.random() * 1.5 + 1) * (isMobile ? 0.8 : 1); // Slightly smaller on mobile
      const particleYDirection = yDirection === 'mixed' 
        ? (Math.random() > 0.5 ? 'up' : 'down')
        : yDirection;
      
      return {
        x: Math.random() * 100, // % position
        y: Math.random() * 100, // % position
        originalY: Math.random() * 100, // Store original position for animation
        size,
        speed: 10 + Math.random() * 15, // Movement speed (in seconds)
        progress: Math.random(), // Animation progress
        direction: particleYDirection,
        randomFactor,
        xOffset: (Math.random() - 0.5) * 20, // Horizontal drift
        opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
        color: Math.random() > 0.8 ? 'rgba(167, 139, 250, 0.3)' : 'rgba(139, 92, 246, 0.3)', // Purple tones
      };
    });
  }, [density, isMobile, yDirection]);
  
  // Generate bright particles data - memoized
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
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };
  
  // Animation loop for Canvas rendering
  const animate = () => {
    if (!canvasRef.current || !isVisible) return;
    
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
      
      // Calculate opacity based on animation curve
      const opacityCurve = Math.sin(particle.progress * Math.PI);
      const currentOpacity = particle.opacity * (0.5 + opacityCurve * 0.5);
      
      // Draw particle
      const x = (currentX / 100) * width;
      const y = (currentY / 100) * height;
      
      ctx.beginPath();
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = currentOpacity;
      ctx.arc(x, y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Update and draw bright particles
    brightParticles.forEach(particle => {
      // Update progress
      particle.progress += 1 / (particle.speed * 60); // 60fps target
      if (particle.progress >= 1) particle.progress = 0;
      
      // Calculate position
      const yMove = getYAnimation(particle.randomFactor, particle.direction);
      const currentY = particle.originalY + (yMove * particle.progress);
      const currentX = particle.x + (particle.xOffset * particle.progress);
      
      // Calculate opacity and scale based on animation curve
      const animCurve = Math.sin(particle.progress * Math.PI);
      const currentOpacity = particle.opacity * (0.5 + animCurve * 0.5);
      const currentScale = 1 + (animCurve * 0.3);
      
      // Draw particle
      const x = (currentX / 100) * width;
      const y = (currentY / 100) * height;
      
      ctx.beginPath();
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = currentOpacity;
      ctx.arc(x, y, particle.size * currentScale, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Set up Intersection Observer to pause animations when not visible
  useEffect(() => {
    // Create observer to pause animation when not in viewport
    const observer = new IntersectionObserver(
      entries => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }
    
    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);
  
  // Handle canvas setup, animation, and cleanup
  useEffect(() => {
    // Setup canvas
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Start animation if visible
    if (isVisible) {
      animate();
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, brightParticles, isVisible]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex }}
    />
  );
};

export default React.memo(ParticleField); 