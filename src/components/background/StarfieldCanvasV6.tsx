import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScene } from '../scene/SceneControllerV6';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  brightness: number;
}

interface StarfieldProps {
  baseColor?: string;
  maxStars?: number;
}

const StarfieldCanvasV6: React.FC<StarfieldProps> = ({
  baseColor = '#ffffff',
  maxStars = 1000
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { deviceCapabilities, phase, isTransitioning } = useScene();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const updateCanvasSize = () => {
      const dpr = deviceCapabilities.devicePixelRatio;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Calculate star count based on performance tier
    const getStarCount = () => {
      const baseDensity = Math.min(window.innerWidth, window.innerHeight) / 5;
      switch (deviceCapabilities.performanceTier) {
        case 'high': return Math.min(maxStars, baseDensity * 2);
        case 'medium': return Math.min(maxStars, baseDensity);
        case 'low': return Math.min(maxStars, baseDensity * 0.5);
        default: return Math.min(maxStars, baseDensity * 0.75);
      }
    };

    // Initialize stars
    const stars: Star[] = Array.from({ length: getStarCount() }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.1,
      brightness: Math.random() * 0.5 + 0.5
    }));

    // Update star positions
    const updateStars = () => {
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > window.innerHeight) {
          star.y = 0;
          star.x = Math.random() * window.innerWidth;
        }
      });
    };

    // Draw stars with optimization
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Batch similar-sized stars together
      const starBatches = new Map<number, Star[]>();
      stars.forEach(star => {
        const size = Math.round(star.size * 10) / 10;
        if (!starBatches.has(size)) {
          starBatches.set(size, []);
        }
        starBatches.get(size)?.push(star);
      });

      // Draw each batch
      starBatches.forEach((batchStars, size) => {
        ctx.beginPath();
        batchStars.forEach(star => {
          const alpha = star.brightness;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.moveTo(star.x, star.y);
          ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        });
        ctx.fill();
      });
    };

    // Animation frame handling
    let animationFrameId: number;
    let lastDrawTime = 0;
    const targetFPS = deviceCapabilities.performanceTier === 'low' ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      if (timestamp - lastDrawTime >= frameInterval) {
        updateStars();
        drawStars();
        lastDrawTime = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [deviceCapabilities, baseColor, maxStars]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isTransitioning ? 0.5 : 1,
        scale: isTransitioning ? 1.05 : 1
      }}
      transition={{ duration: 0.5 }}
    />
  );
};

export default StarfieldCanvasV6; 