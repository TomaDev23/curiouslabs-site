import { useRef, useEffect, useState } from 'react';
import BaseSpaceBackdrop from './BaseSpaceBackdrop';

// Change from export to const - preserve the information without breaking Fast Refresh
const metadata = {
  id: 'awakening_backdrop',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_backdrop.md'
};

/**
 * AwakeningBackdrop - The cosmic scene coming to life
 * Extends BaseSpaceBackdrop with awakening transition effects
 */
export default function AwakeningBackdrop({ progress = 0 }) {
  const auroraCanvasRef = useRef(null);
  const atmosphericGlowRef = useRef(null);
  const moonGlowRef = useRef(null);
  
  // Calculate transition colors based on progress
  // As progress increases, we shift from blues to purples and hints of violet
  const awakeningColors = {
    background: {
      core: progress < 0.5 
        ? '#040c36' 
        : interpolateColor('#040c36', '#2a1344', (progress - 0.5) * 2),
      mid: progress < 0.5
        ? '#030928'
        : interpolateColor('#030928', '#1c1040', (progress - 0.5) * 2),
      outer: progress < 0.5
        ? '#02051c' 
        : interpolateColor('#02051c', '#120a30', (progress - 0.5) * 2),
      edge: progress < 0.5
        ? '#01020f'
        : interpolateColor('#01020f', '#0a0520', (progress - 0.5) * 2)
    },
    nebula: {
      core: `rgba(${100 + progress * 40}, ${120 + progress * 0}, ${255 - progress * 20}, ${0.08 + progress * 0.04})`,
      mid: `rgba(${80 + progress * 50}, ${100 - progress * 10}, ${220 + progress * 20}, ${0.06 + progress * 0.03})`,
      outer: `rgba(${50 + progress * 70}, ${70 - progress * 0}, ${180 + progress * 40}, ${0.04 + progress * 0.02})`,
      edge: `rgba(${20 + progress * 60}, ${30 + progress * 0}, ${100 + progress * 80}, ${0.02 + progress * 0.01})`,
      fade: `rgba(${10 + progress * 30}, ${10 + progress * 0}, ${50 + progress * 100}, 0)`
    },
    celestialBodies: {
      hue: 180 + (progress * 80), // Shift toward purple
      variation: 60 + (progress * 20) // More variation with progress
    }
  };
  
  // Color interpolation helper
  function interpolateColor(color1, color2, factor) {
    // Parse hex colors into r,g,b components
    const c1 = {
      r: parseInt(color1.substring(1, 3), 16),
      g: parseInt(color1.substring(3, 5), 16),
      b: parseInt(color1.substring(5, 7), 16)
    };
    
    const c2 = {
      r: parseInt(color2.substring(1, 3), 16),
      g: parseInt(color2.substring(3, 5), 16),
      b: parseInt(color2.substring(5, 7), 16)
    };
    
    // Interpolate
    const r = Math.round(c1.r + factor * (c2.r - c1.r));
    const g = Math.round(c1.g + factor * (c2.g - c1.g));
    const b = Math.round(c1.b + factor * (c2.b - c1.b));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Aurora hints effect - starting to appear at edges with progress
  useEffect(() => {
    const canvas = auroraCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Draw aurora hints
    const drawAurora = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw subtle aurora at bottom edges
      const height = canvas.height;
      const width = canvas.width;
      
      // The progress determines how visible the auroras are
      const auroraOpacity = Math.min(progress * 0.3, 0.2); // Max 0.2
      
      // Skip drawing if almost invisible
      if (auroraOpacity < 0.01) return;
      
      // Left aurora hint
      const leftGrd = ctx.createLinearGradient(0, height, width * 0.3, height * 0.7);
      leftGrd.addColorStop(0, `rgba(70, 100, 200, ${auroraOpacity})`);
      leftGrd.addColorStop(0.5, `rgba(100, 120, 220, ${auroraOpacity * 0.7})`);
      leftGrd.addColorStop(1, 'rgba(120, 140, 230, 0)');
      
      ctx.fillStyle = leftGrd;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.quadraticCurveTo(
        width * 0.15, 
        height - height * 0.2 - Math.sin(time * 0.001) * 30, 
        width * 0.3, 
        height * 0.7
      );
      ctx.lineTo(width * 0.3, height);
      ctx.closePath();
      ctx.fill();
      
      // Right aurora hint
      const rightGrd = ctx.createLinearGradient(width, height, width * 0.7, height * 0.8);
      rightGrd.addColorStop(0, `rgba(100, 70, 220, ${auroraOpacity})`);
      rightGrd.addColorStop(0.5, `rgba(120, 90, 230, ${auroraOpacity * 0.7})`);
      rightGrd.addColorStop(1, 'rgba(140, 110, 240, 0)');
      
      ctx.fillStyle = rightGrd;
      ctx.beginPath();
      ctx.moveTo(width, height);
      ctx.quadraticCurveTo(
        width * 0.85, 
        height - height * 0.15 - Math.cos(time * 0.0015) * 25, 
        width * 0.7, 
        height * 0.8
      );
      ctx.lineTo(width * 0.7, height);
      ctx.closePath();
      ctx.fill();
      
      // Center aurora - appears later in the transition
      if (progress > 0.3) {
        const centerOpacity = (progress - 0.3) * 0.3;
        const centerGrd = ctx.createLinearGradient(width * 0.5, height, width * 0.5, height * 0.65);
        centerGrd.addColorStop(0, `rgba(140, 100, 240, ${centerOpacity})`);
        centerGrd.addColorStop(0.6, `rgba(170, 130, 255, ${centerOpacity * 0.6})`);
        centerGrd.addColorStop(1, 'rgba(200, 170, 255, 0)');
        
        ctx.fillStyle = centerGrd;
        ctx.beginPath();
        ctx.moveTo(width * 0.4, height);
        ctx.quadraticCurveTo(
          width * 0.5, 
          height - height * 0.25 - Math.sin(time * 0.002) * 20, 
          width * 0.6, 
          height
        );
        ctx.closePath();
        ctx.fill();
      }
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    // Animate aurora
    let time = 0;
    const animate = () => {
      time += 16; // Approximately 60fps
      drawAurora(time);
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [progress]);
  
  // Atmospheric glow - increases with progress
  useEffect(() => {
    const canvas = atmosphericGlowRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Draw atmospheric glow
    const drawAtmosphericGlow = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (progress < 0.1) return; // Don't draw in initial state
      
      const { width, height } = canvas;
      
      // Increase visibility with progress
      const glowOpacity = progress * 0.3; // Max 0.3
      
      // Dawn atmospheric glow from the right side
      const grd = ctx.createRadialGradient(
        width * 0.7, height * 0.3, 0,
        width * 0.7, height * 0.3, width * 0.9
      );
      
      // Dawn atmosphere colors - violet-indigo that intensifies with progress
      grd.addColorStop(0, `rgba(180, 140, 255, ${glowOpacity * 1.5})`);
      grd.addColorStop(0.3, `rgba(150, 120, 230, ${glowOpacity * 1.2})`);
      grd.addColorStop(0.6, `rgba(120, 100, 200, ${glowOpacity * 0.9})`);
      grd.addColorStop(1, `rgba(80, 60, 160, 0)`);
      
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
      
      // Additional atmospheric glow points - appear with higher progress
      if (progress > 0.2) {
        const secondaryGlowOpacity = (progress - 0.2) * 0.25;
        
        // Create smaller glow spots
        for (let i = 0; i < 3; i++) {
          const spotGrd = ctx.createRadialGradient(
            width * (0.5 + i * 0.15), 
            height * (0.3 - i * 0.05), 
            0,
            width * (0.5 + i * 0.15), 
            height * (0.3 - i * 0.05),
            width * (0.1 + i * 0.05)
          );
          
          spotGrd.addColorStop(0, `rgba(${170 + i * 15}, ${130 + i * 10}, ${255 - i * 5}, ${secondaryGlowOpacity})`);
          spotGrd.addColorStop(1, 'rgba(100, 80, 200, 0)');
          
          ctx.fillStyle = spotGrd;
          ctx.beginPath();
          ctx.arc(
            width * (0.5 + i * 0.15), 
            height * (0.3 - i * 0.05),
            width * (0.1 + i * 0.05),
            0, 
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    // Animate subtle movement
    let angle = 0;
    const animate = () => {
      angle += progress * 0.002 + 0.0005; // Animation speed increases with progress
      
      const offsetFactor = 0.5 + progress * 1.5; // 0.5 to 2.0 - more active as progress increases
      const offsetX = Math.sin(angle) * 4 * offsetFactor;
      const offsetY = Math.cos(angle * 0.7) * 2 * offsetFactor;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(offsetX, offsetY);
      drawAtmosphericGlow();
      ctx.restore();
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [progress]);
  
  // Moon glow effect that intensifies with progress
  useEffect(() => {
    const canvas = moonGlowRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Draw intensifying moon glow
    const drawMoonGlow = (time) => {
      const { width, height } = canvas;
      
      // Moon position (matches the moon in DormantBackdrop)
      const moonX = width * 0.15;
      const moonY = height * 0.08; // Adjusted to match DormantBackdrop (was 0.08)
      const moonRadius = width * 0.0675; // 13.5vw / 2 = 6.75% of width
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Skip drawing if minimal progress
      if (progress < 0.05) return;
      
      // Outer glow intensity increases with progress
      const glowOpacity = progress * 0.4; // Max 0.4
      const glowRadius = moonRadius * (5 + progress * 10); // Grows with progress
      
      // Create outer glow gradient
      const grd = ctx.createRadialGradient(
        moonX, moonY, moonRadius * 1.5,
        moonX, moonY, glowRadius
      );
      
      // Color shifts from blue to purple as progress increases
      const r = 180 + progress * 50;
      const g = 200 - progress * 70;
      const b = 255;
      
      grd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowOpacity})`);
      grd.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${glowOpacity * 0.6})`);
      grd.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${glowOpacity * 0.3})`);
      grd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      // Draw glow
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(moonX, moonY, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Light beams - appear after progress threshold
      if (progress > 0.3) {
        const beamOpacity = (progress - 0.3) * 0.3; // Max 0.21
        const time = Date.now() * 0.001; // Current time in seconds
        
        // Draw a few light beams
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2 + time * 0.2;
          const beamLength = moonRadius * (7 + Math.sin(time * 0.5 + i) * 2 + progress * 5);
          
          const startX = moonX + Math.cos(angle) * moonRadius * 1.2;
          const startY = moonY + Math.sin(angle) * moonRadius * 1.2;
          const endX = moonX + Math.cos(angle) * beamLength;
          const endY = moonY + Math.sin(angle) * beamLength;
          
          // Create beam gradient
          const beamGrd = ctx.createLinearGradient(startX, startY, endX, endY);
          beamGrd.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${beamOpacity})`);
          beamGrd.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          
          // Draw beam
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.strokeStyle = beamGrd;
          ctx.lineWidth = 5 + progress * 10; // Beam width grows with progress
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
          ctx.restore();
        }
      }
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    // Animate moon glow
    const animate = () => {
      const time = Date.now();
      drawMoonGlow(time);
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [progress]);
  
  // Calculate beam animation based on progress
  const beamIntensity = Math.min(1, progress * 2.5); // Increases more dramatically with progress
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Base cosmic scene with color transition */}
      <BaseSpaceBackdrop 
        progress={progress}
        enableMouseParallax={true}
        colors={awakeningColors}
      />
      
      {/* Atmospheric glow layer */}
      <canvas 
        ref={atmosphericGlowRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{ 
          mixBlendMode: 'screen',
          transform: 'none !important' // Force no transform
        }}
      />
      
      {/* Enhanced moon glow */}
      <canvas 
        ref={moonGlowRef}
        className="absolute inset-0 w-full h-full z-20"
        style={{ 
          mixBlendMode: 'screen',
          transform: 'none !important' // Force no transform
        }}
      />
      
      {/* Aurora hints at edges */}
      <canvas 
        ref={auroraCanvasRef}
        className="absolute inset-0 w-full h-full z-30"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Central light beam - appears as progress increases */}
      {progress > 0.4 && (
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40"
          style={{
            width: `${30 + beamIntensity * 20}vw`,
            height: `${30 + beamIntensity * 20}vw`,
            opacity: (progress - 0.4) * 1.2, // Fades in after 40% progress
            background: `radial-gradient(circle, 
              rgba(200,170,255,${0.3}) 0%, 
              rgba(160,130,250,${0.2}) 40%, 
              rgba(120,90,220,${0.1}) 70%, 
              transparent 100%)`,
            filter: `blur(${25 + beamIntensity * 10}px)`,
            animation: 'pulseGlow 8s infinite alternate ease-in-out',
          }}
        />
      )}
      
      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes pulseGlow {
          0% { opacity: ${Math.max(0.2, (progress - 0.4) * 0.8)}; transform: translate(-50%, -50%) scale(0.9); }
          50% { opacity: ${Math.max(0.3, (progress - 0.4) * 1.2)}; transform: translate(-50%, -50%) scale(1.05); }
          100% { opacity: ${Math.max(0.25, (progress - 0.4) * 1.0)}; transform: translate(-50%, -50%) scale(1.0); }
        }
      `}</style>
    </div>
  );
} 