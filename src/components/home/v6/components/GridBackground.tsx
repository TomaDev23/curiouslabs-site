/**
 * @component GridBackground
 * @description Renders a dark grid pattern with animated stars
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const GridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw grid and stars
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Grid settings
    const gridSize = 40;
    const gridColor = 'rgba(255, 255, 255, 0.08)';

    // Draw grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= rect.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= rect.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // Draw stars
    const numStars = Math.floor((rect.width * rect.height) / 10000);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

    for (let i = 0; i < numStars; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const size = Math.random() * 2;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 bg-[#0A0A0F]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      />
      <div className="absolute inset-0 bg-radial-vignette opacity-40" />
    </motion.div>
  );
};

export default GridBackground;