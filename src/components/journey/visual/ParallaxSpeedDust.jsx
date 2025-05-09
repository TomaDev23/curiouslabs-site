import { useEffect, useRef } from 'react';

const metadata = {
  id: 'parallax_speed_dust',
  scs: 'SCS-SPEED-DUST',
  type: 'visual',
  doc: 'contract_cosmic_visuals.md'
};

export default function ParallaxSpeedDust({ opacity, speed, density, fps }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const containerRef = useRef(null);
  const particlesRef = useRef(null); // Store particles in a ref to prevent reset on rerenders
  const sceneTransitionRef = useRef({
    active: false,
    lastOpacity: opacity
  });
  
  // Force particles to be visible as soon as opacity > 0
  // This ensures they appear at 190vh when the scene starts
  const effectiveOpacity = opacity > 0 ? Math.max(opacity, 0.1) : 0;
  
  // Mobile detection
  const isMobile = useRef(
    typeof window !== 'undefined' && 
    (window.innerWidth < 768 || 
     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  );

  // Handle canvas resize
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas size to match container
      canvas.width = container.offsetWidth * dpr;
      canvas.height = container.offsetHeight * dpr;
      
      // Apply CSS size to match container exactly
      canvas.style.width = `${container.offsetWidth}px`;
      canvas.style.height = `${container.offsetHeight}px`;
    };
    
    // Initial size
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    ctx.scale(dpr, dpr);

    // Initialize particles only once
    if (!particlesRef.current) {
      // Use a fixed, reasonable particle count based on density
      // This is more predictable than dynamic calculations
      const baseCount = isMobile.current ? 
        Math.floor(density * 0.4) : // 40% of density on mobile
        density;                    // Full density on desktop
        
      // Create particles with varying speeds for parallax effect
      particlesRef.current = Array.from({ length: baseCount }, () => ({
        x: Math.random() * (canvas.width / dpr),
        y: Math.random() * (canvas.height / dpr),
        length: Math.random() * 10 + 5,
        speed: (Math.random() * 0.5 + 0.5) * speed,
        // Add breathing/pulsing properties
        phase: Math.random() * Math.PI * 2, // Random starting phase
        pulseSpeed: 0.5 + Math.random() * 1, // Random pulse speed
        pulseStrength: 0.15 + Math.random() * 0.2 // Random pulse strength (15-35%)
      }));
    }

    // Detect scene transitions - more sensitive (0.05 instead of 0.2)
    // This ensures we catch the transition at exactly 190vh
    if (Math.abs(opacity - sceneTransitionRef.current.lastOpacity) > 0.05) {
      sceneTransitionRef.current.active = true;
      
      // If we're entering the scene (opacity changing from 0)
      if (opacity > 0 && sceneTransitionRef.current.lastOpacity === 0) {
        console.log('ParallaxSpeedDust: Entering scene at opacity', opacity);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;
        
        // Distribute particles from top of screen
        particlesRef.current.forEach((p, i) => {
          // Stagger particle positions vertically starting at top of viewport
          const segment = height / particlesRef.current.length;
          p.y = (i * segment) % height;
          p.x = Math.random() * width;
        });
      }
    } else {
      sceneTransitionRef.current.active = false;
    }
    
    // Update the last opacity for transition detection
    sceneTransitionRef.current.lastOpacity = opacity;

    // Animation loop with FPS throttling
    const draw = (time) => {
      if (time - lastFrameTimeRef.current < 1000 / fps) {
        animationFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = time;

      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(25, 43, 58, 0.2)';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Draw particles
      ctx.lineWidth = 1;
      
      // Update and draw each particle
      const particles = particlesRef.current;
      const timeSeconds = time / 1000;
      
      particles.forEach(p => {
        // Move particle
        p.y += p.speed;
        if (p.y > canvas.height / dpr) p.y = -p.length;

        // Calculate breathing/pulsing effect
        const breathFactor = 1 + (Math.sin(timeSeconds * p.pulseSpeed + p.phase) * p.pulseStrength);
        
        // Apply breathing to both length and opacity
        const pulsingLength = p.length * breathFactor;
        const pulsingOpacity = effectiveOpacity * (0.8 + (breathFactor * 0.2));
        
        // Draw particle with breathing effect
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + pulsingLength);
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulsingOpacity})`;
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [opacity, speed, fps]); // Keep same dependency array to prevent resets

  // Debug style to highlight z-index issues
  const debugStyle = process.env.NODE_ENV === 'development' 
    ? { outline: opacity > 0 ? '1px solid rgba(255,0,0,0.5)' : 'none' } 
    : {};

  // Use z-20 to ensure proper layering with existing elements
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-50" // Increased z-index
      style={{
        ...debugStyle,
        pointerEvents: 'none'  // Allow clicks to pass through
      }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ 
          display: 'block',
          visibility: opacity > 0 ? 'visible' : 'hidden' // Force visibility based on opacity
        }} 
      />
    </div>
  );
} 