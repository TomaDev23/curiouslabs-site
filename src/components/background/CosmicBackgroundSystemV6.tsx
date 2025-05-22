import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useScene } from '../scene/SceneControllerV6';
import { useMission } from '../mission/MissionTracker';
import StarfieldCanvasV6 from './StarfieldCanvasV6';
import GridOverlayV6 from './GridOverlayV6';

interface CosmicBackgroundProps {
  children: React.ReactNode;
}

const CosmicBackgroundSystemV6: React.FC<CosmicBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { phase, isTransitioning, deviceCapabilities } = useScene();
  const { updateSubtaskStatus } = useMission();
  const controls = useAnimation();

  // Gradient canvas effect
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

    // Create gradient based on performance tier
    const createGradient = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.7
      );

      // Adjust gradient complexity based on performance
      if (deviceCapabilities.performanceTier === 'high') {
        gradient.addColorStop(0, 'rgba(16, 16, 32, 1)');
        gradient.addColorStop(0.4, 'rgba(24, 24, 48, 0.8)');
        gradient.addColorStop(0.6, 'rgba(32, 32, 64, 0.6)');
        gradient.addColorStop(0.8, 'rgba(48, 48, 96, 0.4)');
        gradient.addColorStop(1, 'rgba(64, 64, 128, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(16, 16, 32, 1)');
        gradient.addColorStop(0.5, 'rgba(32, 32, 64, 0.6)');
        gradient.addColorStop(1, 'rgba(64, 64, 128, 0)');
      }

      return gradient;
    };

    // Draw gradient
    const drawGradient = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = createGradient();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Animation frame handling
    let animationFrameId: number;
    let lastDrawTime = 0;
    const targetFPS = deviceCapabilities.performanceTier === 'low' ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      if (timestamp - lastDrawTime >= frameInterval) {
        drawGradient();
        lastDrawTime = timestamp;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameId = requestAnimationFrame(animate);

    // Mark background task as completed
    updateSubtaskStatus('tile-b', 'b1', true);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [deviceCapabilities, updateSubtaskStatus]);

  // Background transition effects
  useEffect(() => {
    if (isTransitioning) {
      controls.start({
        opacity: [1, 0.5, 1],
        scale: [1, 1.05, 1],
        transition: { duration: 1.5 },
      });
    }
  }, [isTransitioning, controls]);

  // Determine which effects to show based on performance tier
  const showStarfield = deviceCapabilities.performanceTier !== 'low';
  const showGrid = deviceCapabilities.performanceTier !== 'low';
  const gridOpacity = deviceCapabilities.performanceTier === 'high' ? 0.3 : 0.2;

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base gradient layer */}
      <motion.canvas
        ref={canvasRef}
        animate={controls}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'normal' }}
      />

      {/* Starfield layer */}
      {showStarfield && (
        <StarfieldCanvasV6
          maxStars={deviceCapabilities.performanceTier === 'high' ? 1000 : 500}
        />
      )}

      {/* Grid overlay */}
      {showGrid && (
        <GridOverlayV6
          opacity={gridOpacity}
          color={deviceCapabilities.performanceTier === 'high' 
            ? 'rgba(102, 90, 240, 0.2)' 
            : 'rgba(102, 90, 240, 0.15)'}
        />
      )}

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default CosmicBackgroundSystemV6; 