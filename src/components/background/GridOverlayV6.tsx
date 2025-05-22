import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScene } from '../scene/SceneControllerV6';

interface GridOverlayProps {
  color?: string;
  opacity?: number;
}

const GridOverlayV6: React.FC<GridOverlayProps> = ({
  color = 'rgba(102, 90, 240, 0.2)',
  opacity = 0.3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { deviceCapabilities, phase, isTransitioning } = useScene();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio consideration
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

    // Grid density based on performance tier
    const gridSpacing = (() => {
      switch (deviceCapabilities.performanceTier) {
        case 'high': return 40;
        case 'medium': return 60;
        case 'low': return 100;
        default: return 80;
      }
    })();

    // Perspective grid parameters
    const vanishingPointX = window.innerWidth / 2;
    const vanishingPointY = window.innerHeight / 2;
    const perspectiveStrength = 0.15;

    // Draw perspective grid
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = opacity;

      // Calculate grid lines count based on screen size and performance tier
      const horizontalLines = Math.ceil(window.innerHeight / gridSpacing);
      const verticalLines = Math.ceil(window.innerWidth / gridSpacing);

      // Draw horizontal lines with perspective
      for (let i = 0; i <= horizontalLines; i++) {
        const y = i * gridSpacing;
        const perspectiveOffset = (y - vanishingPointY) * perspectiveStrength;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(window.innerWidth, y + perspectiveOffset);
        ctx.stroke();
      }

      // Draw vertical lines with perspective
      for (let i = 0; i <= verticalLines; i++) {
        const x = i * gridSpacing;
        const perspectiveOffset = (x - vanishingPointX) * perspectiveStrength;

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + perspectiveOffset, window.innerHeight);
        ctx.stroke();
      }
    };

    // Animation frame handling
    let animationFrameId: number;
    let lastDrawTime = 0;
    const targetFPS = deviceCapabilities.performanceTier === 'low' ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      if (timestamp - lastDrawTime >= frameInterval) {
        drawGrid();
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
  }, [deviceCapabilities, color, opacity]);

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

export default GridOverlayV6; 