import { useRef, useEffect } from 'react';

export default function CosmicParticles({
  count = 20,
  opacity = 0.15,
  scale = 1,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    
    const ctx = c.getContext('2d');
    if (!ctx) return;
    
    let width = c.offsetWidth;
    let height = c.offsetHeight;

    c.width = width;
    c.height = height;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 2,
      d: 0.2 + Math.random() * 0.5,
    }));

    let id;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.d;
        if (p.y < 0) p.y = height;
      }
      id = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      width = c.offsetWidth;
      height = c.offsetHeight;
      c.width = width;
      c.height = height;
    };
    window.addEventListener('resize', resize);
    
    // Debug log
    console.log("✨ CosmicParticles mounted:", { count, opacity, scale });

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
      console.log("✨ CosmicParticles unmounted");
    };
  }, [count, opacity]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
} 