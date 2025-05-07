import { useRef, useEffect, useState } from 'react';

export default function CosmicRevealBackdrop({ progress = 0 }) {
  const canvasRef = useRef(null);
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
    
    // Generate particles - balanced count for smooth movement
    const generateParticles = () => {
      const particleCount = 120; // Increased from 100
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
    
    // Animation loop
    let animationId;
    const animate = () => {
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
  
  // Star field animation - more elegant, less flashy
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let stars = [];
    let initialized = false;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Regenerate stars when resizing
      generateStars();
      initialized = true;
    };
    
    // Star properties - more refined
    const generateStars = () => {
      // Slightly lower density
      const density = 0.8 + progress * 1.5; // Reduced from 1 + progress * 2
      const starCount = Math.floor((canvas.width * canvas.height) / (2800 / density)); // Reduced density
      stars = [];
      
      // Create different star types with more refined properties
      for (let i = 0; i < starCount; i++) {
        // Fewer bright stars for subtlety
        const starType = Math.random();
        const brightStarThreshold = 0.92 - (progress * 0.1); // 8%-18% chance (reduced from 12%-27%)
        let starProps;
        
        if (starType > brightStarThreshold) { // Bright stars
          starProps = {
            radius: Math.random() * 1.2 + 0.7, // 0.7-1.9 (reduced from 0.8-2.3)
            opacity: Math.random() * 0.25 + 0.65, // 0.65-0.9 (reduced from 0.7-1.0)
            twinkleSpeed: Math.random() * 0.015 + 0.008, // Half speed
            flickerSpeed: Math.random() * 0.01 + 0.004, // Half speed
            // More refined colors - deeper blues
            color: Math.random() < 0.4 + (progress * 0.2) ? 
              `hsl(${170 + Math.random() * 40}, 75%, 70%)` : // More muted teals
              `hsl(${220 + Math.random() * 30}, 70%, 75%)`, // Deeper blues
            expansion: 1 + Math.random() * progress * 1.5, // Gentler growth (1.5 vs 2)
          };
        } else { // Background stars
          starProps = {
            radius: Math.random() * 0.5 + 0.2, // 0.2-0.7 (reduced from 0.2-0.9)
            opacity: Math.random() * 0.3 + 0.25, // 0.25-0.55 (reduced from 0.3-0.7)
            twinkleSpeed: Math.random() * 0.01 + 0.004, // Half speed
            flickerSpeed: Math.random() * 0.005 + 0.001, // Half speed
            color: `hsl(${210 + Math.random() * 60}, ${45 + progress * 20}%, ${80 + Math.random() * 15}%)`,
            expansion: 1 + Math.random() * progress * 0.7, // Much less growth (0.7 vs 1)
          };
        }
        
        // Distance from center affects movement (gentler movement)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // Calculate angle from center for expansion direction
        const angleFromCenter = Math.atan2(y - centerY, x - centerX);
        
        stars.push({
          x,
          y,
          ...starProps,
          twinklePhase: Math.random() * Math.PI * 2,
          flickerPhase: Math.random() * Math.PI * 2,
          centerDist: Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)),
          moveAngle: angleFromCenter,
        });
      }
      
      // Mark as initialized
      setInitialized(true);
    };
    
    // Fix animation loop to avoid constant reassignment
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center for expansion effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw each star
      stars.forEach(star => {
        // Update twinkle and flicker - gentler animation
        star.twinklePhase += star.twinkleSpeed;
        star.flickerPhase += star.flickerSpeed;
        
        // More subtle variations (0.8-1.0 instead of 0.7-1.0)
        const twinkleFactor = 0.8 + 0.2 * Math.sin(star.twinklePhase);
        const flickerFactor = 0.8 + 0.2 * Math.sin(star.flickerPhase * 0.5);
        
        // Calculate expansion-based movement (gentler)
        const expansionSpeed = 0.09 + (progress * 0.3); // Slightly increased from 0.07 + 0.28
        const speedFactor = star.centerDist * 0.0002 * expansionSpeed * star.expansion; // Consistent speed factor
        
        // Move stars outward with progress - more gradually
        if (progress > 0.25) { // Delayed start (0.25 vs 0.2)
          const moveAmount = speedFactor * (progress - 0.25) * 2.3; // Increased from 2.0 for smoother movement
          star.x += Math.cos(star.moveAngle) * moveAmount;
          star.y += Math.sin(star.moveAngle) * moveAmount;
        }
        
        // Wrap around edges
        if (star.x < -50) star.x = canvas.width + 50;
        if (star.x > canvas.width + 50) star.x = -50;
        if (star.y < -50) star.y = canvas.height + 50;
        if (star.y > canvas.height + 50) star.y = -50;
        
        // Draw star with more subtle glow
        const radius = star.radius * twinkleFactor * star.expansion;
        const opacity = star.opacity * twinkleFactor * flickerFactor;
        
        // Subtler glow for stars
        if (radius > 0.7) {
          ctx.shadowColor = star.color;
          ctx.shadowBlur = radius * (2 + progress * 2); // Gentler glow (2+2 vs 3+3)
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        
        // Extract hue from color for vibrance adjustment with progress
        const colorParts = star.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (colorParts) {
          // More subtle saturation/lightness boost
          const satBoost = Math.min(100, parseInt(colorParts[2]) + (progress * 7)); // Reduced (7 vs 10)
          const lightBoost = Math.min(100, parseInt(colorParts[3]) + (progress * 3)); // Reduced (3 vs 5)
          ctx.fillStyle = `hsla(${colorParts[1]}, ${satBoost}%, ${lightBoost}%, ${opacity})`;
        } else {
          ctx.fillStyle = star.color.replace('hsl', 'hsla').replace(')', `, ${opacity})`);
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize once
    if (!initialized) {
      resize();
      window.addEventListener('resize', resize);
    }
    
    animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [progress, initialized]);
  
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
      
      {/* Star field canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Particle acceleration canvas */}
      <canvas 
        ref={particleRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          mixBlendMode: 'screen',
          opacity: Math.min(1, 0.15 + progress * 0.6) // Reduced opacity (0.15+0.6 vs 0.2+0.8)
        }}
      />
      
      {/* Aurora wave 1 - left side with more subtle glow */}
      <div 
        className="absolute left-0 bottom-0 w-1/3 h-screen"
        style={{
          background: `linear-gradient(to top, 
            rgba(${70 + progress * 50}, ${120 + progress * 70}, ${160 + progress * 40}, ${0.12 + auroraIntensity * 0.12}), 
            rgba(${50 + progress * 30}, ${90 + progress * 50}, ${160 + progress * 40}, ${0.08 + auroraIntensity * 0.08}) 40%, 
            rgba(${30 + progress * 20}, ${70 + progress * 40}, ${140 + progress * 40}, ${0.04 + auroraIntensity * 0.04}) 70%, 
            transparent 100%)`,
          filter: `blur(${35 + auroraIntensity * 10}px)`, // Increased blur for softness
          opacity: 0.15 + (auroraIntensity * 0.3), // Reduced opacity
          transform: `translateX(${-8 + auroraIntensity * 8}%) scaleX(${0.9 + auroraIntensity * 0.15})`, // Less movement
          animation: 'auroraWave1 15s infinite alternate ease-in-out', // Slower animation (15s vs 10s)
        }}
      />
      
      {/* Aurora wave 2 - center with more subtle glow */}
      <div 
        className="absolute left-1/3 bottom-0 w-1/3 h-screen"
        style={{
          background: `linear-gradient(to top, 
            rgba(${110 + progress * 30}, ${70 + progress * 50}, ${180 + progress * 45}, ${0.12 + auroraIntensity * 0.12}), 
            rgba(${130 + progress * 30}, ${90 + progress * 50}, ${200 + progress * 25}, ${0.08 + auroraIntensity * 0.08}) 40%, 
            rgba(${150 + progress * 30}, ${110 + progress * 50}, ${220 + progress * 10}, ${0.04 + auroraIntensity * 0.04}) 70%, 
            transparent 100%)`,
          filter: `blur(${40 + auroraIntensity * 8}px)`, // Increased blur
          opacity: 0.15 + (auroraIntensity * 0.35), // Reduced opacity
          transform: `scaleY(${0.96 + auroraIntensity * 0.1})`, // Less scaling
          animation: 'auroraWave2 18s infinite alternate-reverse ease-in-out', // Slower (18s vs 15s)
        }}
      />
      
      {/* Aurora wave 3 - right side with more subtle glow */}
      <div 
        className="absolute right-0 bottom-0 w-1/3 h-screen"
        style={{
          background: `linear-gradient(to top, 
            rgba(${50 + progress * 50}, ${140 + progress * 50}, ${180 + progress * 45}, ${0.12 + auroraIntensity * 0.12}), 
            rgba(${70 + progress * 40}, ${120 + progress * 50}, ${160 + progress * 50}, ${0.08 + auroraIntensity * 0.08}) 40%, 
            rgba(${90 + progress * 30}, ${100 + progress * 50}, ${140 + progress * 70}, ${0.04 + auroraIntensity * 0.04}) 70%, 
            transparent 100%)`,
          filter: `blur(${40 + auroraIntensity * 10}px)`, // Increased blur
          opacity: 0.15 + (auroraIntensity * 0.3), // Reduced opacity
          transform: `translateX(${8 - auroraIntensity * 8}%) scaleX(${0.9 + auroraIntensity * 0.15})`, // Less movement
          animation: 'auroraWave3 16s infinite alternate ease-in-out', // Slower (16s vs 12s)
        }}
      />
      
      {/* Atmospheric glow - more subtle */}
      <div 
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(${110 + progress * 30}, ${130 + progress * 60}, ${210 + progress * 20}, ${0.1 * progress}), 
            rgba(${90 + progress * 30}, ${110 + progress * 60}, ${190 + progress * 20}, ${0.07 * progress}) 40%, 
            rgba(${70 + progress * 30}, ${90 + progress * 60}, ${170 + progress * 20}, ${0.03 * progress}) 70%, 
            transparent 100%)`,
          filter: `blur(${30 * progress}px)`, // Increased blur
          opacity: Math.min(1, progress * 1.5), // Gentler appearance (1.5 vs 2)
          animation: 'atmosphereBreak 15s infinite alternate ease-in-out', // Slower (15s vs 10s)
          display: progress > 0.15 ? 'block' : 'none', // Show a bit later (15% vs 10%)
        }}
      />
      
      {/* Add keyframes for animations - gentler, slower animations */}
      <style jsx>{`
        @keyframes breatheBackground {
          0% { filter: hue-rotate(0deg) brightness(1); }
          50% { filter: hue-rotate(${10 + progress * 10}deg) brightness(${1 + progress * 0.15}); } /* Reduced rotation and brightness */
          100% { filter: hue-rotate(0deg) brightness(1); }
        }
        
        @keyframes auroraWave1 {
          0% { transform: translateX(-6%) scaleY(0.92) scaleX(${0.9 + auroraIntensity * 0.15}); opacity: ${0.15 + (auroraIntensity * 0.25)}; } /* Less movement */
          50% { transform: translateX(-3%) scaleY(1.08) scaleX(${0.95 + auroraIntensity * 0.15}); opacity: ${0.2 + (auroraIntensity * 0.3)}; }
          100% { transform: translateX(-7%) scaleY(0.98) scaleX(${0.92 + auroraIntensity * 0.15}); opacity: ${0.18 + (auroraIntensity * 0.28)}; }
        }
        
        @keyframes auroraWave2 {
          0% { transform: translateY(1.5%) scaleY(0.96); opacity: ${0.15 + (auroraIntensity * 0.25)}; } /* Less movement */
          50% { transform: translateY(-1.5%) scaleY(1.03); opacity: ${0.2 + (auroraIntensity * 0.35)}; }
          100% { transform: translateY(0.5%) scaleY(0.99); opacity: ${0.18 + (auroraIntensity * 0.3)}; }
        }
        
        @keyframes auroraWave3 {
          0% { transform: translateX(6%) scaleY(1.08) scaleX(${0.9 + auroraIntensity * 0.15}); opacity: ${0.15 + (auroraIntensity * 0.25)}; } /* Less movement */
          50% { transform: translateX(3%) scaleY(0.92) scaleX(${0.95 + auroraIntensity * 0.15}); opacity: ${0.2 + (auroraIntensity * 0.3)}; }
          100% { transform: translateX(7%) scaleY(0.98) scaleX(${0.92 + auroraIntensity * 0.15}); opacity: ${0.18 + (auroraIntensity * 0.28)}; }
        }
        
        @keyframes atmosphereBreak {
          0% { opacity: ${Math.min(1, progress * 1.4)}; transform: translateY(0px); } /* Reduced opacity change */
          50% { opacity: ${Math.min(1, progress * 1.5)}; transform: translateY(-3px); } /* Less movement (-3px vs -5px) */
          100% { opacity: ${Math.min(1, progress * 1.45)}; transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
} 