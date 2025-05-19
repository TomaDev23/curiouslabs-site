/**
 * @metadata
 * @component PlanetVisualizationV6
 * @description Visualization for product-specific planets
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScene } from './SceneControllerV6';

// 2D visualization of product planets
const PlanetVisualizationV6 = ({ variant, color, isCore = false }) => {
  const { deviceCapabilities } = useScene();
  const { performanceTier, prefersReducedMotion } = deviceCapabilities;
  const canvasRef = useRef(null);
  
  // Determine if we should use canvas-based or CSS-based visualization
  const useCanvas = performanceTier !== 'minimal' && !prefersReducedMotion;
  
  // Canvas-based visualization
  useEffect(() => {
    if (!useCanvas || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions with proper pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const size = 300;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    
    // Animation logic
    let animationFrameId;
    let rotation = 0;
    
    const renderPlanet = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center of the canvas
      const centerX = size / 2;
      const centerY = size / 2;
      
      // Update rotation
      rotation += 0.002;
      
      // Planet base
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      
      // Create planet gradient based on variant
      let gradient;
      switch (variant) {
        case 'operations':
          gradient = ctx.createLinearGradient(centerX - 100, centerY - 100, centerX + 100, centerY + 100);
          gradient.addColorStop(0, '#1e40af');
          gradient.addColorStop(1, '#3b82f6');
          break;
        case 'financial':
          gradient = ctx.createLinearGradient(centerX - 100, centerY - 100, centerX + 100, centerY + 100);
          gradient.addColorStop(0, '#6b21a8');
          gradient.addColorStop(1, '#9333ea');
          break;
        case 'companion':
          gradient = ctx.createLinearGradient(centerX - 100, centerY - 100, centerX + 100, centerY + 100);
          gradient.addColorStop(0, '#0f766e');
          gradient.addColorStop(1, '#14b8a6');
          break;
        case 'core':
        default:
          gradient = ctx.createLinearGradient(centerX - 100, centerY - 100, centerX + 100, centerY + 100);
          gradient.addColorStop(0, '#4d7c0f');
          gradient.addColorStop(1, '#84cc16');
          break;
      }
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw surface details
      ctx.save();
      ctx.clip();
      
      // Rotate the canvas for the detail layer
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.translate(-centerX, -centerY);
      
      // Draw surface pattern based on variant
      if (variant === 'operations') {
        // Grid pattern for operations
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = -100; i <= 100; i += 20) {
          // Horizontal lines
          ctx.beginPath();
          ctx.moveTo(centerX - 100, centerY + i);
          ctx.lineTo(centerX + 100, centerY + i);
          ctx.stroke();
          
          // Vertical lines
          ctx.beginPath();
          ctx.moveTo(centerX + i, centerY - 100);
          ctx.lineTo(centerX + i, centerY + 100);
          ctx.stroke();
        }
      } else if (variant === 'financial') {
        // Wave pattern for financial
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        
        for (let i = -100; i <= 100; i += 15) {
          ctx.beginPath();
          ctx.moveTo(centerX - 100, centerY + i);
          
          for (let x = -100; x <= 100; x += 10) {
            const y = i + Math.sin(x * 0.05 + timestamp * 0.001) * 5;
            ctx.lineTo(centerX + x, centerY + y);
          }
          
          ctx.stroke();
        }
      } else if (variant === 'companion') {
        // Circular pattern for companion
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 20; i <= 100; i += 20) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, i, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Radial lines
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle) * 100,
            centerY + Math.sin(angle) * 100
          );
          ctx.stroke();
        }
      } else {
        // Core pattern
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        
        // Randomly positioned "continents"
        for (let i = 0; i < 8; i++) {
          const x = centerX + Math.cos(i * Math.PI / 4 + rotation * 2) * 60;
          const y = centerY + Math.sin(i * Math.PI / 4 + rotation * 2) * 60;
          const size = 20 + Math.sin(rotation + i) * 10;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      ctx.restore();
      
      // Highlight
      ctx.beginPath();
      ctx.arc(centerX - 30, centerY - 30, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
      
      // Glow effect
      const glow = ctx.createRadialGradient(
        centerX, centerY, 90,
        centerX, centerY, 150
      );
      glow.addColorStop(0, `${color}33`); // 20% opacity
      glow.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      
      // Orbit rings for core planet
      if (isCore) {
        ctx.strokeStyle = `${color}50`; // 30% opacity
        ctx.lineWidth = 1;
        
        // Draw multiple orbits
        for (let i = 1; i <= 3; i++) {
          const radius = 120 + i * 20;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.stroke();
          
          // Draw orbital object
          const orbitAngle = rotation * i + (i * Math.PI / 3);
          const orbitX = centerX + Math.cos(orbitAngle) * radius;
          const orbitY = centerY + Math.sin(orbitAngle) * radius;
          
          ctx.beginPath();
          ctx.arc(orbitX, orbitY, 5, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }
      
      animationFrameId = requestAnimationFrame(renderPlanet);
    };
    
    animationFrameId = requestAnimationFrame(renderPlanet);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, isCore, variant, useCanvas]);
  
  // Render either canvas or CSS-based visualization
  return useCanvas ? (
    <div className="relative w-[300px] h-[300px]">
      <canvas 
        ref={canvasRef} 
        className="block" 
        width={300} 
        height={300}
        aria-label={`${variant} planet visualization`}
      />
    </div>
  ) : (
    <CSSPlanetVisualization 
      variant={variant} 
      color={color} 
      isCore={isCore}
    />
  );
};

// Fallback CSS-based planet visualization
const CSSPlanetVisualization = ({ variant, color, isCore }) => {
  // Get background colors based on variant
  const getGradient = () => {
    switch (variant) {
      case 'operations':
        return 'from-blue-800 to-blue-500';
      case 'financial':
        return 'from-purple-900 to-purple-600';
      case 'companion':
        return 'from-teal-800 to-teal-500';
      case 'core':
      default:
        return 'from-green-800 to-lime-500';
    }
  };
  
  // Get pattern class based on variant
  const getPatternClass = () => {
    switch (variant) {
      case 'operations':
        return 'bg-grid-pattern';
      case 'financial':
        return 'bg-wave-pattern';
      case 'companion':
        return 'bg-circle-pattern';
      case 'core':
      default:
        return 'bg-dot-pattern';
    }
  };
  
  return (
    <div className="relative w-[300px] h-[300px]">
      {/* Base planet */}
      <div 
        className={`absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br ${getGradient()} shadow-lg`}
      >
        {/* Surface pattern */}
        <div 
          className={`absolute inset-0 opacity-20 ${getPatternClass()}`}
        ></div>
        
        {/* Highlight */}
        <div 
          className="absolute w-1/3 h-1/3 rounded-full bg-white opacity-10 blur-sm"
          style={{ top: '15%', left: '15%' }}
        ></div>
      </div>
      
      {/* Glow effect */}
      <div 
        className="absolute -inset-8 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${color}50 0%, transparent 70%)`
        }}
      ></div>
      
      {/* Orbit rings for core */}
      {isCore && (
        <div className="absolute inset-0">
          {/* Multiple orbit rings */}
          {[1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <div 
                className="absolute inset-0 rounded-full border opacity-30"
                style={{
                  borderColor: color,
                  transform: `scale(${1.2 + i * 0.2})`,
                }}
              ></div>
              
              {/* Orbital object */}
              <motion.div
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: color,
                  top: '50%',
                  left: '50%',
                  marginTop: '-5px',
                  marginLeft: '-5px',
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20 / i, // Faster for closer orbits
                  ease: "linear",
                  repeat: Infinity,
                }}
              ></motion.div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanetVisualizationV6;