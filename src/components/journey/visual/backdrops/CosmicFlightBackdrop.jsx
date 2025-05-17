import { useRef, useEffect, useState } from 'react';

export default function CosmicFlightBackdrop({ progress = 0 }) {
  const canvasRef = useRef(null);
  const nebulaCanvasRef = useRef(null);
  const [warpTrails, setWarpTrails] = useState([]);
  
  // Nebula cloud effect with even gentler swirling animation
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
    
    // Draw swirling nebula - even slower for more elegance
    const drawNebula = (time) => {
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Center of the swirl
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      
      // Draw the swirling nebula clouds - further slowed down rotation
      for (let i = 0; i < 5; i++) { // Reduced from 6 to 5 clouds for less density
        // Reduce the speed by 4x for extremely gentle rotation
        const angle = (time * 0.000025 * (i % 2 === 0 ? 1 : -1)) + (i * Math.PI / 3);
        // Even gentler breathing effect with longer period
        const distance = width * 0.3 * (1 + 0.12 * Math.sin(time * 0.00008));
        
        const x = centerX + Math.cos(angle) * distance * 0.45; // Reduced from 0.5
        const y = centerY + Math.sin(angle) * distance * 0.25; // Reduced from 0.3
        
        const size = Math.max(width, height) * 0.4; // Reduced from 0.45
        // More refined color palette - deeper blues and purples
        const hue = (265 + i * 12) % 360; // More focused purple-blue range
        
        // Reduced opacity for subtlety
        const opacity = 0.05 + 0.015 * Math.sin(time * 0.00008 + i);
        
        drawNebulaCloud(
          ctx, 
          x, 
          y, 
          size, 
          `hsla(${hue}, 65%, ${35 + i * 4}%, ${opacity})`, // Deeper, more subtle colors
          angle
        );
      }
    };
    
    const drawNebulaCloud = (ctx, x, y, radius, color, angle) => {
      ctx.save();
      ctx.translate(x, y);
      // Further reduce rotation amount for even gentler effect
      ctx.rotate(angle * 0.2); // Reduced from 0.3
      
      // Create swirling cloud effect with subtler blending
      ctx.globalCompositeOperation = 'screen';
      
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      grd.addColorStop(0, color);
      grd.addColorStop(0.65, color.replace(/[\d\.]+\)$/, '0.02)')); // More gradual fade
      grd.addColorStop(1, 'rgba(20, 0, 40, 0)');
      
      ctx.fillStyle = grd;
      
      // Draw smoother curved shape with reduced complexity
      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      // Even smoother, more elegant shape
      for (let a = 0; a < Math.PI * 2; a += 0.08) { // Increased step for smoother shape
        const spiralRadius = a * radius * 0.07; // Reduced from 0.08
        // Subtler variation
        const variation = 1 + 0.08 * Math.sin(a * 3.5 + angle); // Reduced from 0.1 and 4
        const x = Math.cos(a * 1.4) * spiralRadius * variation; // Reduced from 1.5
        const y = Math.sin(a * 1.4) * spiralRadius * variation; // Reduced from 1.5
        ctx.lineTo(x, y);
      }
      
      ctx.fill();
      ctx.restore();
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    // Animate nebula - even slower for more elegance
    let lastTime = 0;
    let time = 0;
    
    const animate = (timestamp) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = lastTime ? timestamp - lastTime : 16;
      lastTime = timestamp;
      
      // Even slower time advancement for more refined animation
      time += deltaTime * 0.4; // Reduced from 0.5
      drawNebula(time);
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Star field animation with even gentler twinkling
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
      // Reduced density for more refined look
      const starCount = Math.floor((canvas.width * canvas.height) / 2200); // Further reduced density
      stars = [];
      
      for (let i = 0; i < starCount; i++) {
        const isBright = Math.random() < 0.06; // 6% chance (reduced from 8%)
        
        // More refined colors - deeper purples and blues
        const hue = Math.random() * 50 + 245; // 245-295 range (deeper purple-blue)
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: isBright ? 
            Math.random() * 1.1 + 0.6 : // Reduced from 0.8-2.3 to 0.6-1.7
            Math.random() * 0.6 + 0.2,  // Reduced from 0.2-1.0 to 0.2-0.8
          opacity: isBright ? 
            Math.random() * 0.2 + 0.6 : // Reduced from 0.7-1.0 to 0.6-0.8
            Math.random() * 0.3 + 0.25,  // Reduced from 0.3-0.8 to 0.25-0.55
          // Even slower twinkle speed for extremely gentle effect
          twinkleSpeed: Math.random() * 0.008 + 0.001, // Further reduced
          twinklePhase: Math.random() * Math.PI * 2,
          // Minimal drift for more stationary appearance
          driftX: (Math.random() - 0.5) * 0.03, // Reduced from 0.05
          driftY: (Math.random() - 0.5) * 0.03, // Reduced from 0.05
          color: isBright ? 
            `hsl(${hue}, 75%, 75%)` : // Slightly deeper
            `hsl(${hue}, 45%, 85%)` // Lighter
        });
      }
    };
    
    // Animation loop
    let animationId;
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each star
      stars.forEach(star => {
        // Update twinkle - even gentler pulsing
        star.twinklePhase += star.twinkleSpeed;
        // Extremely subtle twinkle range (0.85 to 1.0)
        const twinkleFactor = 0.85 + 0.15 * Math.sin(star.twinklePhase);
        
        // Update position (minimal drift)
        star.x += star.driftX;
        star.y += star.driftY;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Draw star with subtle glow
        const radius = star.radius * twinkleFactor;
        const opacity = star.opacity * twinkleFactor;
        
        // Draw glow for larger stars
        if (radius > 0.7) {
          ctx.shadowColor = star.color;
          ctx.shadowBlur = radius * 2.5; // Reduced from 3
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color.replace('hsl', 'hsla').replace(')', `, ${opacity})`);
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur
      });
      
      const animFrame = requestAnimationFrame(animate);
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
  }, []);
  
  // Generate warp trails with even gentler movement
  useEffect(() => {
    // Create warp trails at different positions
    const trails = [];
    const trailCount = 10; // Reduced from 12 for less density
    
    for (let i = 0; i < trailCount; i++) {
      const verticalPosition = Math.random() * 100; // Random vertical position (0-100%)
      const width = 2 + Math.random() * 10; // Width (2-12px) - thinner
      // Even slower speeds for more graceful movement
      const speed = 10 + Math.random() * 18; // 10-28s (slower than previous 8-23s)
      const delay = Math.random() * 15; // Longer delay (0-15s)
      const opacity = 0.25 + Math.random() * 0.3; // Reduced opacity (0.25-0.55)
      const hue = Math.random() * 35 + 150; // Slightly deeper range (150-185)
      
      trails.push({
        verticalPosition,
        width,
        speed,
        delay,
        opacity,
        hue
      });
    }
    
    setWarpTrails(trails);
  }, []);
  
  // Calculate warp intensity based on progress - more gradual transition
  const warpIntensity = Math.min(1, progress * 1.1); // Even gentler increase
  
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Deep space gradient background - more elegant deep purples */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: 'radial-gradient(ellipse at center, #3b2a6e 0%, #251845 30%, #150e25 60%, #0d0718 100%)',
        }}
      />
      
      {/* Nebula canvas layer with subtle swirling effects */}
      <canvas 
        ref={nebulaCanvasRef}
        className="absolute inset-0 w-full h-full opacity-65" // Reduced from 80%
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Star field canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Elegant mint-colored warp trails */}
      {warpTrails.map((trail, index) => (
        <div 
          key={index}
          className="absolute h-[2px] left-0"
          style={{
            top: `${trail.verticalPosition}%`,
            width: `${35 + (warpIntensity * 55)}%`,
            height: `${trail.width}px`,
            background: `linear-gradient(to right, hsla(${trail.hue}, 75%, 60%, 0), hsla(${trail.hue}, 90%, 70%, 0.8) 50%, hsla(${trail.hue}, 75%, 60%, 0))`,
            filter: 'blur(5px)',
            opacity: trail.opacity * warpIntensity,
            transform: 'translateX(-100%)',
            animation: `warpTrail ${trail.speed}s ${trail.delay}s infinite linear`,
            zIndex: 40
          }}
        />
      ))}
      
      {/* Left side aurora arm - more subtle purple glow */}
      <div 
        className="absolute left-0 top-0 w-1/4 h-screen"
        style={{
          background: 'linear-gradient(to right, rgba(140, 32, 220, 0.15), rgba(100, 40, 160, 0.08) 50%, rgba(70, 20, 110, 0.04) 75%, transparent)',
          filter: 'blur(45px)', // Increased blur
          opacity: 0.15 * warpIntensity, // Reduced from 0.2
          animation: 'leftAuroraArm 25s infinite alternate ease-in-out', // Increased from 20s
          transformOrigin: 'left center',
        }}
      />
      
      {/* Right side aurora arm - more subtle blue glow */}
      <div 
        className="absolute right-0 top-0 w-1/4 h-screen"
        style={{
          background: 'linear-gradient(to left, rgba(100, 32, 220, 0.15), rgba(70, 40, 160, 0.08) 50%, rgba(50, 20, 110, 0.04) 75%, transparent)',
          filter: 'blur(45px)', // Increased blur
          opacity: 0.15 * warpIntensity, // Reduced from 0.2
          animation: 'rightAuroraArm 30s infinite alternate-reverse ease-in-out', // Increased from 25s
          transformOrigin: 'right center',
        }}
      />
      
      {/* Central energy core glow with gentler pulse */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: `${18 + warpIntensity * 8}vw`, // Reduced from 20+10
          height: `${18 + warpIntensity * 8}vw`, // Reduced from 20+10
          background: 'radial-gradient(circle, rgba(150, 220, 200, 0.15) 0%, rgba(110, 160, 220, 0.08) 40%, rgba(70, 90, 160, 0.04) 70%, transparent 100%)', // Reduced opacity
          filter: 'blur(35px)', // Increased blur
          opacity: 0.15 + (warpIntensity * 0.2), // Reduced opacity (0.15+0.2 vs 0.2+0.25)
          animation: 'pulseCore 20s infinite alternate ease-in-out', // Increased from 15s
        }}
      />
      
      {/* Cosmic dust particles */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundSize: 'cover',
          mixBlendMode: 'soft-light',
          opacity: '0.08', // Reduced from 0.1
          filter: 'blur(1.5px)', // Increased blur
          animation: 'dustBreathing 25s infinite alternate ease-in-out', // Increased from 20s
        }}
      />
      
      {/* Add keyframes for animations - even gentler and slower */}
      <style jsx>{`
        @keyframes warpTrail {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        @keyframes leftAuroraArm {
          0% { transform: translateX(-2%) scaleX(0.96) skewY(-2deg); opacity: 0.12; } // Reduced movement and opacity
          100% { transform: translateX(2%) scaleX(1.04) skewY(2deg); opacity: 0.16; }
        }
        
        @keyframes rightAuroraArm {
          0% { transform: translateX(2%) scaleX(0.96) skewY(2deg); opacity: 0.12; } // Reduced movement and opacity
          100% { transform: translateX(-2%) scaleX(1.04) skewY(-2deg); opacity: 0.16; }
        }
        
        @keyframes pulseCore {
          0% { transform: translate(-50%, -50%) scale(0.96); opacity: 0.13; } // Reduced scale change and opacity
          50% { transform: translate(-50%, -50%) scale(1.04); opacity: 0.17; }
          100% { transform: translate(-50%, -50%) scale(0.98); opacity: 0.15; }
        }
        
        @keyframes dustBreathing {
          0% { opacity: 0.06; } // Reduced opacity range
          100% { opacity: 0.09; }
        }
      `}</style>
    </div>
  );
} 