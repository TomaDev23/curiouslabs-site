import { useRef, useEffect } from 'react';

export default function DormantBackdrop() {
  const canvasRef = useRef(null);
  const cloudCanvasRef = useRef(null);
  const nebulaCanvasRef = useRef(null);
  const globesCanvasRef = useRef(null);
  const sparksCanvasRef = useRef(null);
  
  // Cloud layers effect
  useEffect(() => {
    const canvas = cloudCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Draw cloud layers
    const clouds = [];
    const generateClouds = () => {
      const cloudCount = 6; // Reduced from 8 for subtlety
      for (let i = 0; i < cloudCount; i++) {
        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.7), // Keep clouds higher
          width: 300 + Math.random() * 500,
          height: 100 + Math.random() * 200,
          speed: 0.08 + Math.random() * 0.15, // Slower movement
          opacity: 0.015 + Math.random() * 0.025, // Subtler clouds
        });
      }
    };
    
    const drawClouds = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      clouds.forEach(cloud => {
        // Move clouds slowly
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width) {
          cloud.x = -cloud.width;
          cloud.y = Math.random() * (canvas.height * 0.7);
        }
        
        // Draw cloud as soft gradient ellipse
        const grd = ctx.createRadialGradient(
          cloud.x + cloud.width / 2, 
          cloud.y + cloud.height / 2, 
          0,
          cloud.x + cloud.width / 2, 
          cloud.y + cloud.height / 2, 
          cloud.width / 2
        );
        
        grd.addColorStop(0, `rgba(255, 255, 255, ${cloud.opacity})`);
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.ellipse(
          cloud.x + cloud.width / 2,
          cloud.y + cloud.height / 2,
          cloud.width / 2,
          cloud.height / 2,
          0, 0, Math.PI * 2
        );
        ctx.fill();
      });
      
      requestAnimationFrame(drawClouds);
    };
    
    // Initialize
    resize();
    generateClouds();
    window.addEventListener('resize', resize);
    const animationId = requestAnimationFrame(drawClouds);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Nebula fog effect - subtle background texture
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
    
    // Draw nebula - very subtle background texture
    const drawNebula = () => {
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient for the background - very subtle
      const grd = ctx.createRadialGradient(
        width * 0.2, height * 0.2, 0, // Moved to match moon position
        width * 0.2, height * 0.2, width * 0.7
      );
      
      // Dark, subtle colors
      grd.addColorStop(0, 'rgba(40, 40, 60, 0.03)');
      grd.addColorStop(0.4, 'rgba(20, 20, 40, 0.02)');
      grd.addColorStop(0.7, 'rgba(10, 10, 30, 0.01)');
      grd.addColorStop(1, 'rgba(5, 5, 15, 0)');
      
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    };
    
    // Initialize
    resize();
    window.addEventListener('resize', resize);
    
    // Animate subtle movement
    let angle = 0;
    const animate = () => {
      angle += 0.0004; // Very slow movement
      const offsetX = Math.sin(angle) * 2;
      const offsetY = Math.cos(angle) * 1;
      
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
  }, []);
  
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
      const starCount = Math.floor((canvas.width * canvas.height) / 2500); // Slightly reduced density
      stars = [];
      
      // Create different star layers with varying properties
      for (let i = 0; i < starCount; i++) {
        // Determine star type - rare bright stars, common dim stars
        const starType = Math.random();
        let starProps;
        
        if (starType > 0.97) { // Very bright stars - 3%
          starProps = {
            radius: Math.random() * 1.2 + 0.8, // 0.8-2.0
            opacity: Math.random() * 0.2 + 0.8, // 0.8-1.0
            twinkleSpeed: Math.random() * 0.015 + 0.005,
            twinkleAmount: Math.random() * 0.3 + 0.1, // How much it twinkles
            color: `hsl(${220 + Math.random() * 30}, ${80 + Math.random() * 20}%, ${85 + Math.random() * 15}%)`
          };
        } else if (starType > 0.85) { // Medium stars - 12%
          starProps = {
            radius: Math.random() * 0.7 + 0.5, // 0.5-1.2
            opacity: Math.random() * 0.3 + 0.5, // 0.5-0.8
            twinkleSpeed: Math.random() * 0.02 + 0.003,
            twinkleAmount: Math.random() * 0.4 + 0.2,
            color: `hsl(${220 + Math.random() * 40}, ${60 + Math.random() * 20}%, ${80 + Math.random() * 15}%)`
          };
        } else { // Background stars - 85%
          starProps = {
            radius: Math.random() * 0.5 + 0.2, // 0.2-0.7
            opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
            twinkleSpeed: Math.random() * 0.01 + 0.002,
            twinkleAmount: Math.random() * 0.3 + 0.1,
            color: `hsl(${220 + Math.random() * 60}, ${40 + Math.random() * 30}%, ${85 + Math.random() * 15}%)`
          };
        }
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          ...starProps,
          twinklePhase: Math.random() * Math.PI * 2,
          driftX: (Math.random() - 0.5) * 0.05, // Very slow drift
          driftY: (Math.random() - 0.5) * 0.05,
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
  }, []);

  // Distant globes effect
  useEffect(() => {
    const canvas = globesCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Globes properties
    let globes = [];
    const generateGlobes = () => {
      const globeCount = 4; // Just a few distant globes
      
      for (let i = 0; i < globeCount; i++) {
        // Ensure globes are well distributed
        const section = i / globeCount;
        const xPos = 0.2 + (section * 0.6) + (Math.random() * 0.1);
        const yPos = 0.5 + (Math.random() * 0.4);
        
        globes.push({
          x: canvas.width * xPos,
          y: canvas.height * yPos,
          radius: 15 + Math.random() * 25,
          pulseSpeed: 0.001 + Math.random() * 0.002,
          pulseAmount: 0.1 + Math.random() * 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
          hue: 180 + Math.random() * 60, // Blue to teal range
          opacity: 0.05 + Math.random() * 0.05,
        });
      }
    };
    
    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each globe
      globes.forEach(globe => {
        // Pulsing effect
        globe.pulsePhase += globe.pulseSpeed;
        const pulseFactor = 1 - globe.pulseAmount + globe.pulseAmount * Math.sin(globe.pulsePhase);
        
        // Draw globe with glow
        const radius = globe.radius * pulseFactor;
        const opacity = globe.opacity * pulseFactor;
        
        // Outer glow
        const gradientGlow = ctx.createRadialGradient(
          globe.x, globe.y, radius * 0.5,
          globe.x, globe.y, radius * 3
        );
        
        gradientGlow.addColorStop(0, `hsla(${globe.hue}, 70%, 50%, ${opacity * 0.5})`);
        gradientGlow.addColorStop(1, `hsla(${globe.hue}, 70%, 50%, 0)`);
        
        ctx.fillStyle = gradientGlow;
        ctx.beginPath();
        ctx.arc(globe.x, globe.y, radius * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        const gradient = ctx.createRadialGradient(
          globe.x, globe.y, 0,
          globe.x, globe.y, radius
        );
        
        gradient.addColorStop(0, `hsla(${globe.hue}, 60%, 60%, ${opacity * 1.5})`);
        gradient.addColorStop(0.7, `hsla(${globe.hue}, 70%, 40%, ${opacity})`);
        gradient.addColorStop(1, `hsla(${globe.hue}, 80%, 20%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(globe.x, globe.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resize();
    generateGlobes();
    window.addEventListener('resize', () => {
      resize();
      globes = [];
      generateGlobes();
    });
    
    animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Green sparks effect (like a broken lamp)
  useEffect(() => {
    const canvas = sparksCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Sparks properties
    let sparks = [];
    const generateSparks = () => {
      // Create several spark emitters at different positions
      const emitters = [
        { x: canvas.width * 0.3, y: canvas.height * 0.5 }, // Left of robot
        { x: canvas.width * 0.8, y: canvas.height * 0.3 }, // Right upper area
      ];
      
      emitters.forEach(emitter => {
        // Add initial sparks for each emitter
        for (let i = 0; i < 2; i++) {
          addSpark(emitter.x, emitter.y);
        }
      });
      
      // Set interval to periodically add new sparks
      return setInterval(() => {
        const randomEmitter = emitters[Math.floor(Math.random() * emitters.length)];
        if (Math.random() < 0.3 && sparks.length < 15) { // 30% chance to add a spark
          addSpark(randomEmitter.x, randomEmitter.y);
        }
      }, 500);
    };
    
    const addSpark = (x, y) => {
      // Add small x, y variation
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      
      sparks.push({
        x: x + offsetX,
        y: y + offsetY,
        radius: 0.4 + Math.random() * 0.8, // Small sparks
        speed: 0.2 + Math.random() * 0.5,
        angle: Math.random() * Math.PI * 2,
        life: 100, // How long the spark lives
        maxLife: 100,
        opacity: 0.7 + Math.random() * 0.3,
        // Green to yellow-green color range
        hue: 80 + Math.random() * 40,
      });
    };
    
    // Animation loop
    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw sparks
      sparks = sparks.filter(spark => {
        // Decrease life
        spark.life -= 1;
        if (spark.life <= 0) return false;
        
        // Move spark
        spark.x += Math.cos(spark.angle) * spark.speed;
        spark.y += Math.sin(spark.angle) * spark.speed;
        
        // Fade out based on remaining life
        const fadeOpacity = (spark.life / spark.maxLife) * spark.opacity;
        
        // Draw spark with glow
        ctx.shadowColor = `hsla(${spark.hue}, 100%, 70%, ${fadeOpacity})`;
        ctx.shadowBlur = 5;
        
        ctx.fillStyle = `hsla(${spark.hue}, 100%, 60%, ${fadeOpacity})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        
        return true;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resize();
    const intervalId = generateSparks();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Dark glowy black background - similar to CuriousLabs homepage */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          background: 'radial-gradient(ellipse at center, #0a0a14 0%, #070711 40%, #050509 70%, #020203 100%)',
        }}
      />
      
      {/* Subtle nebula texture */}
      <canvas 
        ref={nebulaCanvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        style={{ mixBlendMode: 'soft-light' }}
      />
      
      {/* Star field canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Distant glowing globes */}
      <canvas 
        ref={globesCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Green sparks like a broken lamp */}
      <canvas 
        ref={sparksCanvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Drifting cloud layers */}
      <canvas 
        ref={cloudCanvasRef}
        className="absolute inset-0 w-full h-full opacity-90"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Moon in the upper left corner */}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: '9vw',
          height: '9vw',
          top: '10%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(220,225,255,0.12) 0%, rgba(200,215,255,0.1) 60%, rgba(180,195,255,0.07) 80%, rgba(160,180,255,0.04) 100%)',
          boxShadow: 'inset -3px -3px 5px rgba(0,0,0,0.2), 0 0 40px rgba(220,225,255,0.25)',
          animation: 'moonGlow 15s infinite alternate ease-in-out',
        }}
      >
        {/* Moon texture overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 20%, rgba(255,255,255,0.1) 30%, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 70%)`,
          }}
        ></div>
      </div>
      
      {/* Moon light cast on floor/robot - positioned to illuminate from top left */}
      <div 
        className="absolute"
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 15% 10%, rgba(210,215,255,0.03) 0%, rgba(210,215,255,0.01) 40%, transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
      ></div>
      
      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes moonGlow {
          0% { opacity: 0.9; filter: blur(1px); }
          50% { opacity: 1; filter: blur(0.5px); }
          100% { opacity: 0.95; filter: blur(0.8px); }
        }
      `}</style>
    </div>
  );
} 