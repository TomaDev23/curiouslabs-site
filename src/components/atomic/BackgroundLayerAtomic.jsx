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
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  }

  const updateSquarePosition = (id) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq,
      ),
    );
  };

  // Update squares when dimensions change
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(config.numSquares));
    }
  }, [dimensions, config.numSquares]);

  // Resize observer to update container dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 h-[200%] w-full fill-lime-400/10 stroke-lime-400/10 skew-y-12 animate-pulse ${className}`}
      style={{ 
        zIndex: 1,
        maskImage: 'radial-gradient(800px circle at center, white, transparent)',
        WebkitMaskImage: 'radial-gradient(800px circle at center, white, transparent)',
        top: '-30%',
        animation: 'shimmer 3s ease-in-out infinite alternate'
      }}
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
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [x, y], id }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: prefersReducedMotion ? config.maxOpacity : [0, config.maxOpacity, config.maxOpacity * 0.3, config.maxOpacity]
            }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 6,
              repeat: prefersReducedMotion ? 0 : Infinity,
              delay: prefersReducedMotion ? 0 : index * 0.2,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            onAnimationComplete={() => !prefersReducedMotion && updateSquarePosition(id)}
            key={`${x}-${y}-${index}`}
            width={config.width - 1}
            height={config.height - 1}
            x={x * config.width + 1}
            y={y * config.height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
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
  
  // Add breathing animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes nebulaBreath {
        0% { 
          opacity: 1; 
          transform: scale(1);
        }
        100% { 
          opacity: 0.7; 
          transform: scale(1.05);
        }
      }
      @keyframes nebulaBreathCentered {
        0% { 
          opacity: 1; 
          transform: scale(1) translateY(-50%);
        }
        100% { 
          opacity: 0.7; 
          transform: scale(1.05) translateY(-50%);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" aria-hidden="true">
      {/* Base gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900 transition-opacity duration-1000
          ${phase === 'void' ? 'opacity-100' : 'opacity-80'}`}
      />
      
      {/* Moon Light Nebula - Left border half circle - Extended and Taller */}
      <div 
        className="absolute left-0 top-0 w-[500px] h-[120vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 500px 120vh at 0% 50%, rgba(255, 255, 255, 0.15) 0%, rgba(200, 220, 255, 0.12) 20%, rgba(150, 180, 255, 0.08) 40%, rgba(120, 160, 255, 0.04) 60%, transparent 80%)',
          filter: 'blur(25px)',
          zIndex: 2,
          top: '-10vh',
          animation: 'nebulaBreath 8s ease-in-out infinite alternate'
        }}
      />
      
      {/* Additional moon glow layer for more intensity - Extended */}
      <div 
        className="absolute left-0 top-0 w-[350px] h-[120vh] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 350px 120vh at 0% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(220, 235, 255, 0.06) 30%, rgba(180, 200, 255, 0.03) 50%, transparent 70%)',
          filter: 'blur(50px)',
          zIndex: 1,
          top: '-10vh',
          animation: 'nebulaBreath 10s ease-in-out infinite alternate-reverse'
        }}
      />

      {/* Directional Lighting - Left to Right illumination */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.06) 0%, rgba(220, 235, 255, 0.04) 15%, rgba(180, 200, 255, 0.03) 30%, rgba(150, 180, 255, 0.015) 45%, transparent 60%)',
          filter: 'blur(30px)',
          zIndex: 3
        }}
      />

      {/* Focused Globe Lighting - Concentrated beam towards center */}
      <div 
        className="absolute left-0 top-1/2 w-[700px] h-80 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 700px 320px at 0% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(200, 220, 255, 0.05) 25%, rgba(150, 180, 255, 0.025) 50%, transparent 75%)',
          filter: 'blur(40px)',
          zIndex: 4,
          animation: 'nebulaBreathCentered 12s ease-in-out infinite alternate'
        }}
      />
      
      {/* Nebula Tail Extension - for page transition dissolve */}
      <div 
        className="absolute left-0 w-full h-[25vh] pointer-events-none"
        style={{
          top: '100vh',
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 0%, rgba(200, 220, 255, 0.02) 20%, rgba(150, 180, 255, 0.015) 40%, rgba(120, 160, 255, 0.01) 60%, transparent 80%)',
          filter: 'blur(40px)',
          zIndex: 5
        }}
      />

      {/* Enhanced Transition Zone - coordinates with next page 10vh dissolve */}
      <div 
        className="absolute left-0 w-[600px] h-[20vh] pointer-events-none"
        style={{
          top: '95vh',
          background: 'radial-gradient(ellipse 600px 200px at 0% 0%, rgba(255, 255, 255, 0.06) 0%, rgba(200, 220, 255, 0.04) 30%, rgba(150, 180, 255, 0.02) 60%, transparent 100%)',
          filter: 'blur(35px)',
          zIndex: 6,
          animation: 'nebulaBreath 15s ease-in-out infinite alternate'
        }}
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
        <AnimatedGridPattern 
          performanceTier={performanceTier} 
          prefersReducedMotion={prefersReducedMotion}
        />
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