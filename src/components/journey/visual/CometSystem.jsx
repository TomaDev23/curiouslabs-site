import { useEffect, useRef } from 'react';

export default function CometSystem({ active = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const comets = [];

    const resize = () => {
      // Get the actual dimensions of the parent container
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      console.log("🌠 Canvas resized to:", canvas.width, "x", canvas.height);
    };

    const spawn = () => {
      if (!active || comets.length > 40) return;
      comets.push({
        x: -80,
        y: Math.random() * canvas.height,
        vx: 4 + Math.random() * 6,
        vy: -1 + Math.random() * 2,
        life: 0,
      });
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      comets.forEach((c, i) => {
        c.x += c.vx;
        c.y += c.vy;
        c.life += 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * 4, c.y - c.vy * 4);
        ctx.stroke();
        if (c.x > canvas.width + 100) comets.splice(i, 1);
      });
      if (Math.random() < 0.02) spawn();
      requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    
    // Debug log
    console.log("🌠 CometSystem mounted and active:", active);
    
    return () => {
      window.removeEventListener('resize', resize);
      console.log("🌠 CometSystem unmounted");
    };
  }, [active]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas 
        ref={ref} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          zIndex: 10,
          border: '1px solid rgba(255,255,255,0.1)' // Subtle debug border
        }} 
      />
    </div>
  );
} 