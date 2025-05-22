/**
 * @component BackgroundLayerAtomic
 * @description Self-contained background visual system with starfield, grid and nebula effects
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { useEffect, useState, useRef } from 'react';

// Internal performance detection
const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState({
    performanceTier: 'high',
    prefersReducedMotion: false,
    isMobile: false,
    isTablet: false
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Check device type
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const isTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
      
      // Try to detect memory (not supported in all browsers)
      const memory = navigator.deviceMemory || 8; // Default to 8GB if not available
      
      // Determine performance tier based on device capabilities
      let performanceTier = 'high';
      
      if (prefersReducedMotion) {
        performanceTier = 'minimal';
      } else if (isMobile && memory <= 2) {
        performanceTier = 'minimal';
      } else if (isMobile || (memory <= 4)) {
        performanceTier = 'low';
      } else if (isTablet || (memory <= 6)) {
        performanceTier = 'medium';
      }
      
      setCapabilities({
        performanceTier,
        prefersReducedMotion,
        isMobile,
        isTablet
      });
    };
    
    detectCapabilities();
    window.addEventListener('resize', detectCapabilities);
    
    return () => {
      window.removeEventListener('resize', detectCapabilities);
    };
  }, []);

  return capabilities;
};

// Starfield Canvas Component
const StarfieldCanvas = ({ performanceTier, prefersReducedMotion }) => {
  const canvasRef = useRef(null);
  
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
      switch (performanceTier) {
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
    if (!prefersReducedMotion) {
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
  }, [performanceTier, prefersReducedMotion]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

// Grid Overlay Component
const GridOverlay = ({ performanceTier }) => {
  const canvasRef = useRef(null);
  
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
      
      switch (performanceTier) {
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
  }, [performanceTier]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
};

// Main component
export const metadata = {
  id: 'background_layer_atomic',
  scs: 'SCS-BG-COSMIC',
  type: 'atomic',
  doc: 'contract_background_atomic.md'
};

const BackgroundLayerAtomic = ({ phase = 'activation' }) => {
  const { performanceTier, prefersReducedMotion } = useDeviceCapabilities();
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Base gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900 transition-opacity duration-1000
          ${phase === 'void' ? 'opacity-100' : 'opacity-80'}`}
      />
      
      {/* Starfield layer */}
      <div className={`transition-opacity duration-1000 ${phase === 'void' ? 'opacity-0' : 'opacity-100'}`}>
        <StarfieldCanvas 
          performanceTier={performanceTier} 
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Grid overlay */}
      <div className={`transition-opacity duration-1000 ${phase === 'void' ? 'opacity-0' : 'opacity-100'}`}>
        <GridOverlay performanceTier={performanceTier} />
      </div>
      
      {/* Nebula effect - only show on high performance devices */}
      {performanceTier === 'high' && (
        <div 
          className={`absolute inset-0 mix-blend-screen opacity-30 transition-opacity duration-1000
            ${phase === 'void' ? 'opacity-0' : 'opacity-30'}`}
          style={{
            backgroundImage: 'url("/images/nebula-texture.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)'
          }}
        />
      )}
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />
    </div>
  );
};

export default BackgroundLayerAtomic; 