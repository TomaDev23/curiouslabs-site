/**
 * @component BackgroundLayerAtomic
 * @description Self-contained background visual system with starfield, grid and nebula effects
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true
 */

import React, { useEffect, useState, useRef, useId } from 'react';
import { motion } from 'framer-motion';

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

// Animated Grid Pattern Component
const AnimatedGridPattern = ({ 
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className = "",
  maxOpacity = 0.3,
  duration = 4,
  repeatDelay = 0.5,
  performanceTier = 'high',
  prefersReducedMotion = false
}) => {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState([]);

  // Adjust grid settings based on performance tier
  const getGridConfig = () => {
    switch (performanceTier) {
      case 'high':
        return { width: 40, height: 40, numSquares: 50, maxOpacity: 0.15 };
      case 'medium':
        return { width: 50, height: 50, numSquares: 35, maxOpacity: 0.125 };
      case 'low':
        return { width: 60, height: 60, numSquares: 20, maxOpacity: 0.1 };
      default:
        return { width: 80, height: 80, numSquares: 10, maxOpacity: 0.075 };
    }
  };

  const config = getGridConfig();

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / config.width),
      Math.floor((Math.random() * dimensions.height) / config.height),
    ];
  }

  function generateSquares(count) {
    return Array.from({ length: count }, (_, i) => {
      const [x, y] = getPos();
      return {
        id: i,
        x,
        y,
        opacity: 0,
      };
    });
  }

  const updateSquarePosition = (id) => {
    setSquares(currentSquares =>
      currentSquares.map(square =>
        square.id === id
          ? { ...square, ...getPos().reduce((acc, coord, index) => ({ ...acc, [index === 0 ? 'x' : 'y']: coord }), {}) }
          : square
      )
    );
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(config.numSquares));
    }
  }, [dimensions, config.numSquares]);

  return (
    <div 
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      <svg 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30"
        style={{ opacity: 0.5 }}
      >
        <defs>
          <pattern
            id={id}
            width={config.width}
            height={config.height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path 
              d={`M.5 ${config.height}V.5H${config.width}`} 
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      {!prefersReducedMotion && squares.map((square) => (
        <motion.div
          key={square.id}
          className="absolute bg-lime-500"
          style={{
            left: square.x * config.width,
            top: square.y * config.height,
            width: config.width,
            height: config.height,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, config.maxOpacity, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatDelay,
            delay: Math.random() * duration,
          }}
          onAnimationComplete={() => updateSquarePosition(square.id)}
        />
      ))}
    </div>
  );
};

const BackgroundLayerAtomic = () => {
  const { performanceTier, prefersReducedMotion } = useDeviceCapabilities();
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900 opacity-80" />
      
      {/* Moon Light Nebula - Left border half circle - Extended and Taller */}
      <div 
        className="absolute left-0 top-0 w-[500px] h-[120vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 500px 120vh at 0% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(200, 220, 255, 0.12) 20%, rgba(150, 180, 255, 0.08) 40%, rgba(120, 160, 255, 0.04) 60%, transparent 80%)',
          filter: 'blur(25px)',
          zIndex: 30,
          top: '-10vh'
        }}
      />
      
      {/* Additional moon glow layer for more intensity - Extended */}
      <div 
        className="absolute left-0 top-0 w-[350px] h-[120vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 350px 120vh at 0% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(220, 235, 255, 0.06) 30%, rgba(180, 200, 255, 0.03) 50%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 28,
          top: '-10vh'
        }}
      />

      {/* Directional Lighting - Left to Right illumination */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.06) 0%, rgba(220, 235, 255, 0.04) 15%, rgba(180, 200, 255, 0.03) 30%, rgba(150, 180, 255, 0.015) 45%, transparent 60%)',
          filter: 'blur(30px)',
          zIndex: 32
        }}
      />
      
      {/* Nebula Tail Extension - for page transition dissolve */}
      <div 
        className="absolute left-0 w-full h-[25vh] pointer-events-none"
        style={{
          top: '100vh',
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 0%, rgba(200, 220, 255, 0.02) 20%, rgba(150, 180, 255, 0.015) 40%, rgba(120, 160, 255, 0.01) 60%, transparent 80%)',
          filter: 'blur(40px)',
          zIndex: 3
        }}
      />

      {/* Enhanced Transition Zone - coordinates with next page 10vh dissolve */}
      <div 
        className="absolute left-0 w-[600px] h-[20vh] pointer-events-none"
        style={{
          top: '95vh',
          background: 'radial-gradient(ellipse 600px 200px at 0% 0%, rgba(255, 255, 255, 0.06) 0%, rgba(200, 220, 255, 0.04) 30%, rgba(150, 180, 255, 0.02) 60%, transparent 100%)',
          filter: 'blur(35px)',
          zIndex: 2
        }}
      />

      {/* Starfield layer */}
      <div className="opacity-100">
        <StarfieldCanvas 
          performanceTier={performanceTier} 
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
      
      {/* Nebula effect - only show on high performance devices */}
      {performanceTier === 'high' && (
        <div 
          className="absolute inset-0 mix-blend-screen opacity-30"
          style={{
            backgroundImage: 'url("/images/nebula-texture.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(40px)'
          }}
        />
      )}
      
      {/* Main Full Page Black Mask - Primary page darkening overlay - z-[25] */}
      <div
        className="fixed w-[100vw] h-[300vh] pointer-events-none"
        style={{
          top: '0',
          left: '0',
          background: 'radial-gradient(ellipse 65% 60% at 75% 45%, transparent 5%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.8) 65%, rgba(0,0,0,0.95) 80%)',
          zIndex: 25
        }}
      />
      
    </div>
  );
};

export default BackgroundLayerAtomic; 
