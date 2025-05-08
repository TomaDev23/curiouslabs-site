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

    // Adjust density for mobile (50% reduction)
    const adjustedDensity = isMobile.current ? Math.floor(density * 0.5) : density;

    // Create particles with varying speeds for parallax effect
    const particles = Array.from({ length: adjustedDensity }, () => ({
      x: Math.random() * (canvas.width / dpr),
      y: Math.random() * (canvas.height / dpr),
      length: Math.random() * 10 + 5,
      speed: (Math.random() * 0.5 + 0.5) * speed
    }));

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

      // Update and draw particles
      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > canvas.height / dpr) p.y = -p.length;

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        // Using glowy white as requested
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    animationFrameRef.current = requestAnimationFrame(draw);

    // Cleanup on unmount
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [opacity, speed, density, fps]);

  // Use z-20 to ensure proper layering with existing elements
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }} // Ensures no extra space
      />
    </div>
  );
} 