import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * EnhancedComet component with dynamic motion paths and better visual effects
 * Creates an animated comet with a directional tail and interactive behaviors
 */
const EnhancedComet = ({ 
  pathType = "straight", // straight, curved, arc
  startPosition = { x: -100, y: 100 },
  endPosition = { x: window.innerWidth + 100, y: 300 },
  size = 4,
  speed = 15,
  trailLength = 30,
  color = "#ffffff",
  glowColor = "rgba(123, 213, 245, 0.8)",
  onComplete = () => {},
  delay = 0,
  mouseRef = { current: { x: 0, y: 0 } }
}) => {
  // Generate random control points for curved paths
  const [controlPoints, setControlPoints] = useState({
    x1: Math.random() * window.innerWidth,
    y1: Math.random() * window.innerHeight * 0.3,
    x2: Math.random() * window.innerWidth,
    y2: Math.random() * window.innerHeight * 0.7
  });
  
  // Generate particle trail
  const particles = Array.from({ length: trailLength }, (_, i) => ({
    id: i,
    size: Math.max(1, size * (1 - i / trailLength)),
    opacity: 1 - i / trailLength
  }));
  
  // Generate a SVG path based on pathType
  const getPath = () => {
    switch (pathType) {
      case "curved":
        return `M ${startPosition.x} ${startPosition.y} C ${controlPoints.x1} ${controlPoints.y1}, ${controlPoints.x2} ${controlPoints.y2}, ${endPosition.x} ${endPosition.y}`;
      case "arc":
        const midX = (startPosition.x + endPosition.x) / 2;
        const midY = Math.min(startPosition.y, endPosition.y) - 200; // Arc height
        return `M ${startPosition.x} ${startPosition.y} Q ${midX} ${midY}, ${endPosition.x} ${endPosition.y}`;
      case "straight":
      default:
        return `M ${startPosition.x} ${startPosition.y} L ${endPosition.x} ${endPosition.y}`;
    }
  };

  // Define the motion path
  const pathMotion = {
    initial: 0,
    animate: 1,
    transition: {
      duration: speed,
      ease: pathType === "straight" ? "linear" : "easeInOut",
      delay
    }
  };
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full">
        <defs>
          <radialGradient id={`comet-glow-${size}`}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          
          <path id={`comet-path-${size}`} d={getPath()} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        </defs>

        {/* Glow effect */}
        <motion.circle
          cx="0"
          cy="0"
          r={size * 4}
          fill={`url(#comet-glow-${size})`}
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: 1 }}
          transition={{
            duration: speed,
            ease: pathType === "straight" ? "linear" : "easeInOut",
            delay
          }}
          onAnimationComplete={onComplete}
          pathOffset={pathMotion.initial}
        >
          <animateMotion
            dur={`${speed}s`}
            begin={`${delay}s`}
            fill="freeze"
            path={getPath()}
            rotate="auto"
          />
        </motion.circle>

        {/* Main comet body */}
        <motion.circle
          cx="0"
          cy="0"
          r={size}
          fill={color}
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: 1 }}
          transition={{
            duration: speed,
            ease: pathType === "straight" ? "linear" : "easeInOut",
            delay
          }}
        >
          <animateMotion
            dur={`${speed}s`}
            begin={`${delay}s`}
            fill="freeze"
            path={getPath()}
            rotate="auto"
          />
        </motion.circle>

        {/* Particle trail */}
        {particles.map((particle) => (
          <motion.circle
            key={particle.id}
            cx="0"
            cy="0"
            r={particle.size}
            fill={color}
            opacity={particle.opacity}
            initial={{ pathOffset: -particle.id * 0.02 }}
            animate={{ pathOffset: 1 - particle.id * 0.02 }}
            transition={{
              duration: speed,
              ease: pathType === "straight" ? "linear" : "easeInOut",
              delay
            }}
          >
            <animateMotion
              dur={`${speed}s`}
              begin={`${delay}s`}
              fill="freeze"
              path={getPath()}
              rotate="auto"
            />
          </motion.circle>
        ))}
      </svg>
    </div>
  );
};

export default EnhancedComet; 