import React, { useEffect, useRef } from 'react';

// LEGIT-compliant metadata
const metadata = {
  id: 'constellation_glow',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_visuals.md'
};

export default function ConstellationGlow({ opacity = 1, fps = 30, layer = 'A', position = 'center', rotation = 0, type = 'default' }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false });
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size with high DPI support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    // Call resize initially and on window resize
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Get vertical positioning offset based on position prop
    const getYPositionOffset = () => {
      switch(position) {
        case 'top': return 0.15; // 15% from top
        case 'center': return 0.5; // Center
        case 'bottom': return 0.85; // 85% from top (15% from bottom)
        default: return 0.5; // Default to center
      }
    };

    // Define constellations based on type parameter
    let constellation;
    let constellationOpacity = 1.0;
    
    // Ursa Minor / Little Dipper constellation
    const ursaMinorConstellation = {
      // Position based on position prop
      x: canvas.width * 0.3 / dpr, // Positioned toward left side
      y: canvas.height * getYPositionOffset() / dpr,
      stars: [
        { x: 0, y: 0, size: 14.0, phase: 0 },             // Polaris (North Star)
        { x: 60, y: 140, size: 8.0, phase: 0.5 },         // Yildun
        { x: -88, y: 260, size: 12.0, phase: 1.0 },       // Epsilon UMi
        { x: -280, y: 300, size: 10.0, phase: 1.5 },      // Zeta UMi
        { x: -380, y: 200, size: 12.8, phase: 2.0 },      // Eta UMi
        { x: -260, y: 80, size: 11.2, phase: 2.5 },       // Delta UMi
        { x: -60, y: -40, size: 11.2, phase: 3.0 },       // Kochab
      ],
      // How stars are connected
      connections: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]
      ],
      glow: 0.8,
      pulseFactor: 0.15,
      scale: 1.15
    };
    
    // Orion constellation
    const orionConstellation = {
      // Position based on position prop
      x: canvas.width * 0.7 / dpr, // Positioned toward right side
      y: canvas.height * getYPositionOffset() / dpr,
      stars: [
        { x: 0, y: 0, size: 16.0, phase: 0.7 },          // Alnitak
        { x: 160, y: -40, size: 15.2, phase: 1.2 },      // Alnilam
        { x: 320, y: -100, size: 14.0, phase: 1.8 },     // Mintaka
        { x: -200, y: 240, size: 10.0, phase: 0.2 },     // Rigel
        { x: 400, y: 280, size: 12.0, phase: 2.5 },      // Betelgeuse
        { x: -80, y: -240, size: 8.0, phase: 3.1 },      // Saiph
        { x: 440, y: -320, size: 8.8, phase: 0.5 },      // Bellatrix
      ],
      // How stars are connected
      connections: [
        [0, 1], [1, 2], [0, 3], [2, 4], [3, 5], [2, 6]
      ],
      glow: 0.6,
      pulseFactor: 0.12,
      scale: 1.15,
      rotation: rotation // Apply rotation from props
    };
    
    // Select constellation based on type prop
    switch(type) {
      case 'ursaMinor':
        constellation = ursaMinorConstellation;
        constellationOpacity = 1.0;
        break;
      case 'orion':
        constellation = orionConstellation;
        constellationOpacity = 0.7;
        break;
      default:
        // Default to layer A/B selection for backward compatibility
        constellation = layer === 'A' ? ursaMinorConstellation : orionConstellation;
        constellationOpacity = layer === 'A' ? 1.0 : 0.7;
    }

    // Store positions and calculations to reduce recalculations
    const starCache = {};
    
    // Pre-calculate absolute star positions
    const calculateStarPositions = (time) => {
      const { stars, x, y, pulseFactor, rotation = 0, scale = 1 } = constellation;
      const key = Math.floor(time / 100); // Cache for 100ms chunks
      
      if (starCache[key]) return starCache[key];
      
      // Apply rotation if specified
      const cosRot = Math.cos(rotation * Math.PI / 180);
      const sinRot = Math.sin(rotation * Math.PI / 180);
      
      const absoluteStars = stars.map(star => {
        // Apply scale
        const scaledX = star.x * scale;
        const scaledY = star.y * scale;
        
        // Apply rotation if needed
        let rotatedX = scaledX;
        let rotatedY = scaledY;
        
        if (rotation !== 0) {
          rotatedX = scaledX * cosRot - scaledY * sinRot;
          rotatedY = scaledX * sinRot + scaledY * cosRot;
        }
        
        return {
          ...star,
          absX: x + rotatedX,
          absY: y + rotatedY,
          // Calculate pulse based on time and star's phase
          pulse: star.size * (1 - pulseFactor + pulseFactor * Math.sin(time * 0.001 + star.phase))
        };
      });
      
      starCache[key] = absoluteStars;
      
      // Limit cache size
      const keys = Object.keys(starCache);
      if (keys.length > 10) {
        delete starCache[keys[0]];
      }
      
      return absoluteStars;
    };

    // Animation function with FPS throttling and optimization
    const draw = (time) => {
      // Only draw at specified FPS
      if (time - lastFrameTimeRef.current < 1000 / fps) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = time;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Get absolute star positions (cached when possible)
      const absoluteStars = calculateStarPositions(time);
      
      // Draw the constellation with optimized rendering
      drawConstellation(ctx, constellation, absoluteStars, opacity * constellationOpacity);

      animationFrameRef.current = requestAnimationFrame(draw);
    };
    
    // Helper function to draw a constellation
    const drawConstellation = (ctx, constellation, absoluteStars, opacity) => {
      const { connections, glow } = constellation;
      
      // Draw connections first (lines between stars)
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
      
      // Optimize by batching draw operations
      ctx.beginPath();
      connections.forEach(([fromIdx, toIdx]) => {
        const fromStar = absoluteStars[fromIdx];
        const toStar = absoluteStars[toIdx];
        
        ctx.moveTo(fromStar.absX, fromStar.absY);
        ctx.lineTo(toStar.absX, toStar.absY);
      });
      ctx.stroke();
      
      // Draw stars with glow
      absoluteStars.forEach(star => {
        // Star glow
        const glowSize = star.pulse * 7;
        const gradient = ctx.createRadialGradient(
          star.absX, star.absY, 0,
          star.absX, star.absY, glowSize
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * glow * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
        
        ctx.beginPath();
        ctx.arc(star.absX, star.absY, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Star center
        ctx.beginPath();
        ctx.arc(star.absX, star.absY, star.pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(draw);

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [opacity, fps, layer, position, rotation, type]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full" 
      style={{ 
        pointerEvents: "none",
        transform: "translateZ(0)", // Force GPU acceleration 
        willChange: "transform", // Hint to browser for optimization
      }}
    />
  );
} 