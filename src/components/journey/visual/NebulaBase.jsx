import { useRef, useEffect } from 'react';

export default function NebulaBase({
  className = '',
  hue = 220,           // Default hue: deep violet/blue
  opacity = 0.5,
  radiusMultiplier = 1.2,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const grd = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width * radiusMultiplier
      );
      grd.addColorStop(0, `hsla(${hue}, 100%, 60%, ${opacity})`);
      grd.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
      
      // Debug info
      console.log("🌌 NebulaBase rendered:", { width, height, hue, opacity });
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [hue, opacity, radiusMultiplier]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full ${className}`}
        style={{ 
          border: 'none'
        }}
      />
    </div>
  );
} 