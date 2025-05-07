import { useRef, useEffect } from 'react';

export default function AwakeningBackdrop({ progress = 0 }) {
  const canvasRef = useRef(null);
  const nebulaCanvasRef = useRef(null);
  const auroraCanvasRef = useRef(null);
  
  // Aurora hints effect - starting to appear at edges
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
      const auroraOpacity = 0.05 + progress * 0.15; // 0.05 to 0.2
      
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
  
  // Nebula/atmosphere glow effect
  useEffect(() => {
    const canvas = nebulaCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawNebula();
    };
    
    // Draw atmospheric glow
    const drawNebula = () => {
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient for the early dawn atmospheric glow
      const grd = ctx.createRadialGradient(
        width * 0.7, height * 0.3, 0,
        width * 0.7, height * 0.3, width * 0.9
      );
      
      // Dawn atmosphere colors - violet-indigo that intensifies with progress
      const baseOpacity = 0.1 + progress * 0.1; // 0.1 to 0.2
      grd.addColorStop(0, `rgba(180, 140, 255, ${baseOpacity * 1.5})`);
      grd.addColorStop(0.3, `rgba(150, 120, 230, ${baseOpacity * 1.2})`);
      grd.addColorStop(0.6, `rgba(120, 100, 200, ${baseOpacity * 0.9})`);
      grd.addColorStop(1, `rgba(80, 60, 160, 0)`);
      
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
      
      // Draw atmospheric light spread
      for (let i = 0; i < 4; i++) {
        drawAtmosphericGlow(
          ctx,
          width * (0.5 + i * 0.1 - Math.sin(i) * 0.2),
          height * (0.4 - i * 0.05),
          150 + i * 30 + Math.random() * 20,
          `rgba(${160 + i * 10}, ${120 + i * 20}, ${230 + i * 10}, ${(baseOpacity * 0.7).toFixed(3)})`
        );
      }
    };
    
    const drawAtmosphericGlow = (ctx, x, y, radius, color) => {
      ctx.save();
      
      // Create soft glow effect
      ctx.globalCompositeOperation = 'screen';
      
      const grd = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grd.addColorStop(0, color);
      grd.addColorStop(1, 'rgba(20, 10, 60, 0)');
      
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    // Animate subtle atmosphere shifts
    let angle = 0;
    const animate = () => {
      angle += 0.002;
      
      // Very subtle movement based on progress - more active as progress increases
      const offsetFactor = 0.5 + progress * 1.5; // 0.5 to 2.0
      const offsetX = Math.sin(angle) * 4 * offsetFactor;
      const offsetY = Math.cos(angle * 0.7) * 2 * offsetFactor;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(offsetX, offsetY);
      drawNebula();
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
  
  // Star field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Regenerate stars when resizing
      generateStars();
    };
    
    // Star properties
    let stars = [];
    const generateStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 2200); // Balanced density
      stars = [];
      
      // Create different star layers with varying properties
      for (let i = 0; i < starCount; i++) {
        // Determine star type - more active shimmer based on progress
        const starType = Math.random();
        let starProps;
        
        // Increase twinkle amount based on progress
        const twinkleEnhancement = 1 + progress * 1.5; // 1.0 to 2.5 times more twinkle
        
        if (starType > 0.95) { // Very bright stars - 5%
          starProps = {
            radius: Math.random() * 1.2 + 0.8, // 0.8-2.0
            opacity: Math.random() * 0.2 + 0.8, // 0.8-1.0
            twinkleSpeed: (Math.random() * 0.015 + 0.005) * twinkleEnhancement,
            twinkleAmount: (Math.random() * 0.3 + 0.2) * twinkleEnhancement, // Increased twinkle
            color: `hsl(${260 + Math.random() * 40}, ${80 + Math.random() * 20}%, ${80 + Math.random() * 20}%)`
          };
        } else if (starType > 0.8) { // Medium stars - 15%
          starProps = {
            radius: Math.random() * 0.7 + 0.5, // 0.5-1.2
            opacity: Math.random() * 0.3 + 0.5, // 0.5-0.8
            twinkleSpeed: (Math.random() * 0.02 + 0.003) * twinkleEnhancement,
            twinkleAmount: (Math.random() * 0.4 + 0.2) * twinkleEnhancement,
            color: `hsl(${250 + Math.random() * 50}, ${70 + Math.random() * 20}%, ${85 + Math.random() * 15}%)`
          };
        } else { // Background stars - 80%
          starProps = {
            radius: Math.random() * 0.5 + 0.2, // 0.2-0.7
            opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
            twinkleSpeed: (Math.random() * 0.01 + 0.002) * twinkleEnhancement,
            twinkleAmount: (Math.random() * 0.3 + 0.1) * twinkleEnhancement,
            color: `hsl(${240 + Math.random() * 60}, ${50 + Math.random() * 30}%, ${90 + Math.random() * 10}%)`
          };
        }
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          ...starProps,
          twinklePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.05 * (1 + progress), // Slightly faster with progress
          driftY: (Math.random() - 0.5) * 0.05 * (1 + progress),
        });
      }
    };
    
    // Animation loop
    let animationId;
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each star
      stars.forEach(star => {
        // Update twinkle
        star.twinklePhase += star.twinkleSpeed;
        const twinkleFactor = 1 - star.twinkleAmount + star.twinkleAmount * Math.sin(star.twinklePhase);
        
        // Update position (very slow drift)
        star.x += star.driftX;
        star.y += star.driftY;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Draw star with realistic glow
        const radius = star.radius * twinkleFactor;
        const opacity = star.opacity * twinkleFactor;
        
        // Draw glow for larger stars
        if (radius > 0.7) {
          ctx.shadowColor = star.color;
          ctx.shadowBlur = radius * 4;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        
        // Convert hsl to hsla with opacity
        const colorParts = star.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (colorParts) {
          ctx.fillStyle = `hsla(${colorParts[1]}, ${colorParts[2]}%, ${colorParts[3]}%, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [progress]);
  
  // Calculate beam animation based on progress
  const beamIntensity = Math.min(1, progress * 2.5); // Increases more dramatically with progress
  
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Dawn color gradient background - transitions from midnight to indigo dawn */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: `radial-gradient(ellipse at 70% 30%, 
            ${progress > 0.5 ? '#463a8c' : '#2e2560'} 0%, 
            ${progress > 0.5 ? '#2c2165' : '#1e1845'} 30%, 
            ${progress > 0.5 ? '#1e1650' : '#141035'} 60%, 
            ${progress > 0.5 ? '#12103c' : '#0c0a25'} 100%)`,
          transition: 'background 0.8s ease-in-out',
        }}
      />
      
      {/* Nebula/atmosphere canvas layer */}
      <canvas 
        ref={nebulaCanvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Star field canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Aurora hints at edges */}
      <canvas 
        ref={auroraCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Pulsing lavender radial glow behind robot - intensifies with progress */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: `${30 + beamIntensity * 20}vw`,
          height: `${30 + beamIntensity * 20}vw`,
          background: `radial-gradient(circle, 
            rgba(200,170,255,${0.2 + beamIntensity * 0.2}) 0%, 
            rgba(160,130,250,${0.15 + beamIntensity * 0.15}) 40%, 
            rgba(120,90,220,${0.05 + beamIntensity * 0.1}) 70%, 
            transparent 100%)`,
          opacity: 0.4 + (beamIntensity * 0.6),
          filter: `blur(${25 + beamIntensity * 10}px)`,
          animation: 'pulseGlow 8s infinite alternate ease-in-out',
        }}
      />
      
      {/* Light beam shaft 1 - larger, more prominent */}
      <div 
        className="absolute top-0 left-1/4 h-screen origin-top-left"
        style={{
          width: `${15 + beamIntensity * 10}vw`,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(200,180,255,0.1) 30%, rgba(160,140,240,0.07) 60%, transparent)',
          transform: `rotate(25deg) scaleY(${1 + beamIntensity * 0.8})`,
          opacity: 0.1 + (beamIntensity * 0.5),
          filter: `blur(${15 + beamIntensity * 10}px)`,
        }}
      />
      
      {/* Light beam shaft 2 - more vibrant */}
      <div 
        className="absolute top-0 right-1/4 h-screen origin-top-right"
        style={{
          width: `${20 + beamIntensity * 15}vw`,
          background: 'linear-gradient(225deg, rgba(255,255,255,0.18), rgba(220,180,255,0.12) 40%, rgba(180,140,240,0.08) 70%, transparent)',
          transform: `rotate(-30deg) scaleY(${1 + beamIntensity * 0.8})`,
          opacity: 0.1 + (beamIntensity * 0.5),
          filter: `blur(${20 + beamIntensity * 10}px)`,
        }}
      />
      
      {/* Additional diagonal beam - creates intersecting effect */}
      <div 
        className="absolute top-0 right-1/2 h-screen"
        style={{
          width: `${12 + beamIntensity * 8}vw`,
          background: 'linear-gradient(210deg, rgba(230,200,255,0.15), rgba(190,160,255,0.10) 30%, rgba(150,120,240,0.05) 60%, transparent)',
          transform: `rotate(-15deg) translateX(${30 + beamIntensity * 20}px)`,
          opacity: 0.1 + (beamIntensity * 0.4),
          filter: `blur(${12 + beamIntensity * 8}px)`,
        }}
      />
      
      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes pulseGlow {
          0% { opacity: ${0.4 + (beamIntensity * 0.3)}; transform: translate(-50%, -50%) scale(0.9); }
          50% { opacity: ${0.6 + (beamIntensity * 0.4)}; transform: translate(-50%, -50%) scale(1.05); }
          100% { opacity: ${0.5 + (beamIntensity * 0.35)}; transform: translate(-50%, -50%) scale(1.0); }
        }
      `}</style>
    </div>
  );
} 