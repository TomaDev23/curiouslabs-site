import { useRef, useEffect, useState } from 'react';

// Change from export to const - preserve the information without breaking Fast Refresh
const metadata = {
  id: 'cosmic_reveal_backdrop',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_cosmic_backdrop.md'
};

export default function CosmicRevealBackdrop({ progress = 0 }) {
  const nebulaCanvasRef = useRef(null);
  const particleRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  
  // Particle acceleration effect - gentler and more refined
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Particle properties
    let particles = [];
    
    // Generate particles - reduced count for performance
    const generateParticles = () => {
      // Reduced particle count by 50% for performance (was 120)
      const particleCount = 60 + Math.floor(progress * 20); 
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const isStreakParticle = Math.random() < 0.35; // Increased from 0.3
        
        // More refined pastel colors
        const hue = Math.floor(Math.random() * 40) + (Math.random() < 0.7 ? 190 : 240); // More blues
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: isStreakParticle ? Math.random() * 1.8 + 0.9 : Math.random() * 1 + 0.3, // Larger streaks for visibility
          speed: isStreakParticle ? 
            (1.5 + Math.random() * 4) * (1 + progress * 2.5) : // Faster streaks for smoother motion
            (0.3 + Math.random() * 1.5) * (1 + progress * 1.5), // Keep gentle background particles
          angle: Math.random() * Math.PI * 2,
          color: `hsla(${hue}, ${60 + Math.random() * 20}%, ${75 + Math.random() * 15}%, ${0.3 + Math.random() * 0.4})`,
          tail: isStreakParticle ? 12 + Math.random() * 35 : 0, // Longer tails
          rotate: 0.005 + Math.random() * 0.015,
          rotateDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };
    
    // Animation loop with performance throttling
    let animationId;
    let lastFrameTime = 0;
    const targetFPS = 30; // Reduced from 60 for better performance
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp) => {
      // Only render if enough time has passed (throttle to target FPS)
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime = timestamp - (elapsed % frameInterval);
      
      // Clear with less fade for smoother trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Back to original alpha
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Update and draw particles
      particles.forEach(particle => {
        // Gentler transition - start later and progress more smoothly
        if (progress > 0.25) {
          const toCenter = Math.atan2(centerY - particle.y, centerX - particle.x);
          // More responsive alignment
          const alignFactor = Math.min(1, (progress - 0.25) * 1.8); // Increased for more definite direction
          const oppositeAngle = toCenter + Math.PI;
          
          // Smoother rotation
          particle.angle = particle.angle * (1 - alignFactor * 0.8) + oppositeAngle * alignFactor * 0.8;
        } else {
          // Slightly faster random drift
          particle.angle += particle.rotate * particle.rotateDir * 0.9;
        }
        
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Draw particle
        if (particle.tail > 0) {
          // Draw streak with tail
          const tailX = particle.x - Math.cos(particle.angle) * particle.tail;
          const tailY = particle.y - Math.sin(particle.angle) * particle.tail;
          
          // Create gradient for tail
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y, 
            tailX, tailY
          );
          
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(1, particle.color.replace(')', ', 0)'));
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = particle.size;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
        } else {
          // Draw normal particle
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resize();
    generateParticles();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [progress]);
  
  // Nebula cloud effect - more elegant, less intense
  useEffect(() => {
    const canvas = nebulaCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Draw nebula with more elegance and subtlety
    const drawNebula = (time, hueOffset = 0) => {
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      
      // Draw nebula clouds - fewer, more subtle clouds
      const cloudCount = Math.floor(2 + progress * 3); // Reduced from 3 + progress * 4
      
      for (let i = 0; i < cloudCount; i++) {
        const angleOffset = (i / cloudCount) * Math.PI * 2;
        // Slower movement (0.0002 instead of 0.0003)
        const timeOffset = time * 0.0002 + angleOffset;
        
        // More subtle positioning
        const distanceFactor = 0.3 + 0.15 * Math.sin(timeOffset);
        const posX = centerX + width * distanceFactor * Math.cos(timeOffset) * (0.25 + progress * 0.25);
        const posY = centerY + height * distanceFactor * Math.sin(timeOffset) * (0.25 + progress * 0.15);
        
        // More elegant colors - deeper blues and teals
        const hue = (((i * 30) + hueOffset) % 360 + 360) % 360;
        // Less saturation for elegance
        const saturation = 60 + i * 2 + progress * 10;
        // Deeper, less flashy colors
        const lightness = 40 + i * 3 + progress * 8;
        
        // Slightly smaller, more subtle clouds
        const size = width * (0.12 + 0.12 * Math.sin(timeOffset * 1.3) + progress * 0.15);
        // Lower opacity for subtlety
        const opacity = 0.03 + 0.015 * Math.sin(timeOffset) + progress * 0.04;
        
        drawNebulaCloud(
          ctx,
          posX, posY,
          size,
          `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`,
          timeOffset
        );
      }
    };
    
    const drawNebulaCloud = (ctx, x, y, radius, color, angle) => {
      ctx.save();
      
      // Subtler blending
      ctx.globalCompositeOperation = 'screen';
      
      // Fewer shapes for cleaner look
      const shapeCount = 8 + Math.floor(progress * 6); // Reduced from 10 + progress * 10
      
      for (let i = 0; i < shapeCount; i++) {
        const offsetAngle = (i / shapeCount) * Math.PI * 2;
        // More subtle offsets
        const offsetX = Math.cos(offsetAngle + angle) * radius * 0.4;
        const offsetY = Math.sin(offsetAngle + angle) * radius * 0.3;
        // Smaller shapes overall
        const size = radius * (0.25 + Math.random() * 0.6) * (0.4 + progress * 0.4);
        
        // Create gradient
        const grd = ctx.createRadialGradient(
          x + offsetX, y + offsetY, 0,
          x + offsetX, y + offsetY, size
        );
        
        // Extract hue from color string
        let hueMatch = color.match(/hsla\((\d+)/);
        if (hueMatch) {
          const baseHue = parseInt(hueMatch[1]);
          // Less variation for more cohesive look
          const hueVariation = (i * 6) % 30 - 15; // Reduced from -20 to +20
          
          grd.addColorStop(0, color);
          grd.addColorStop(0.6, color.replace(`${baseHue}`, `${(baseHue + hueVariation + 360) % 360}`));
          grd.addColorStop(1, 'rgba(20, 10, 60, 0)');
        } else {
          grd.addColorStop(0, color);
          grd.addColorStop(1, 'rgba(20, 10, 60, 0)');
        }
        
        ctx.fillStyle = grd;
        
        // Draw smoother cloud shape
        ctx.beginPath();
        ctx.ellipse(
          x + offsetX, 
          y + offsetY, 
          size * (0.7 + Math.random() * 0.3), 
          size * (0.5 + Math.random() * 0.3),
          Math.random() * Math.PI * 2,
          0, Math.PI * 2
        );
        ctx.fill();
      }
      
      ctx.restore();
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    // Slower, gentler animation
    let time = 0;
    let lastTimestamp = 0;
    
    // Fix the animation loop to avoid constant reassignment
    let animationId;
    const animate = (timestamp) => {
      const deltaTime = lastTimestamp ? timestamp - lastTimestamp : 16;
      lastTimestamp = timestamp;
      
      // Slightly smoother time progression
      time += deltaTime * 0.8; // Increased from 0.7
      
      // Gentler hue shifts
      const hueRange = 10 + progress * 25; // Reduced from 15 + progress * 35
      const hueOffset = Math.sin(time * 0.0002) * hueRange; // Slower shift (0.0002 vs 0.0003)
      
      drawNebula(time, hueOffset);
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [progress]);
  
  // Calculate aurora animation - more subtle intensity
  const auroraIntensity = Math.min(1, progress * 1.5); // Gentler increase (1.5 vs 2)
  
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Cosmic background with more elegant, deeper colors */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(${70 + progress * 15}, ${90 + progress * 25}, ${160 + progress * 30}, 1) 0%, 
            rgba(${50 + progress * 25}, ${70 + progress * 25}, ${130 + progress * 30}, 1) 40%, 
            rgba(${30 + progress * 15}, ${40 + progress * 25}, ${90 + progress * 30}, 1) 70%, 
            rgba(${20 + progress * 10}, ${25 + progress * 20}, ${60 + progress * 30}, 1) 100%)`,
          animation: 'breatheBackground 20s infinite alternate ease-in-out', // Slower animation (20s vs 15s)
        }}
      />
      
      {/* Nebula canvas layer */}
      <canvas 
        ref={nebulaCanvasRef}
        className="absolute inset-0 w-full h-full opacity-70" // Reduced opacity (70% vs 90%)
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Particle acceleration effect - flowing outward as progress increases */}
      <canvas 
        ref={particleRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Aurora effects - glow from the edges */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          boxShadow: `inset 0 0 ${150 + progress * 100}px ${60 + progress * 40}px rgba(100, 120, 255, ${Math.min(0.35, auroraIntensity * 0.35)})`,
          opacity: auroraIntensity * 0.9, // Reduced from 1.0
          animation: 'auroraGlow 45s infinite alternate ease-in-out', // Slower animation (45s vs 30s)
        }}
      />
      
      {/* Add keyframes */}
      <style jsx>{`
        @keyframes breatheBackground {
          0% { background-position: 50% 50%; }
          50% { background-position: 51% 51%; }
          100% { background-position: 49% 49%; }
        }
        
        @keyframes auroraGlow {
          0% { box-shadow: inset 0 0 ${150 + progress * 100}px ${60 + progress * 40}px rgba(100, 120, 255, ${Math.min(0.3, auroraIntensity * 0.3)}); }
          50% { box-shadow: inset 0 0 ${150 + progress * 100}px ${60 + progress * 40}px rgba(120, 100, 255, ${Math.min(0.32, auroraIntensity * 0.32)}); }
          100% { box-shadow: inset 0 0 ${150 + progress * 100}px ${60 + progress * 40}px rgba(90, 110, 255, ${Math.min(0.27, auroraIntensity * 0.27)}); }
        }
      `}</style>
    </div>
  );
} 