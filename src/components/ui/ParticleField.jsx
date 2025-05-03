import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import useBreakpoint from '../../hooks/useBreakpoint';

/**
 * ParticleField - Creates ambient floating particles with random movement patterns
 * 
 * @param {Object} props
 * @param {string} props.density - Particle density: 'low', 'medium', 'high'
 * @param {number} props.zIndex - z-index value for positioning
 * @param {string} props.yDirection - Direction of movement: 'up', 'down', 'mixed'
 */
const ParticleField = ({ 
  density = 'medium', 
  zIndex = 0,
  yDirection = 'up'
}) => {
  const { isMobile } = useBreakpoint();
  
  // Determine number of particles based on density and device
  const getParticleCount = () => {
    const counts = {
      low: isMobile ? 15 : 25,
      medium: isMobile ? 25 : 40,
      high: isMobile ? 35 : 60
    };
    return counts[density] || counts.medium;
  };
  
  // Calculate y-direction animation based on direction prop
  const getYAnimation = (randomFactor) => {
    if (yDirection === 'up') return [0, -30 * randomFactor];
    if (yDirection === 'down') return [0, 30 * randomFactor];
    // For mixed, randomly choose up or down
    return Math.random() > 0.5 ? [0, -30 * randomFactor] : [0, 30 * randomFactor];
  };
  
  // Memoize particles to prevent unnecessary re-renders
  const particles = useMemo(() => {
    return Array.from({ length: getParticleCount() }).map((_, i) => {
      const randomFactor = Math.random() * 0.6 + 0.7; // 0.7 to 1.3
      const size = (Math.random() * 1.5 + 1) * (isMobile ? 0.8 : 1); // Slightly smaller on mobile
      
      return {
        id: i,
        x: Math.random() * 100, // % position
        y: Math.random() * 100, // % position
        size,
        yAnimation: getYAnimation(randomFactor),
        duration: 10 + Math.random() * 15, // 10-25 seconds
        delay: Math.random() * 5,
        opacity: Math.random() * 0.4 + 0.1 // 0.1-0.5
      };
    });
  }, [density, isMobile, yDirection]);
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex }}
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-purple-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          animate={{
            y: particle.yAnimation,
            x: [0, (Math.random() - 0.5) * 20], // Slight horizontal drift
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
      
      {/* Add a few brighter particles for visual interest */}
      {Array.from({ length: Math.floor(getParticleCount() / 6) }).map((_, i) => (
        <motion.div
          key={`bright-${i}`}
          className="absolute rounded-full bg-blue-300/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 1.5}px`,
            height: `${Math.random() * 2 + 1.5}px`,
            opacity: 0.6
          }}
          animate={{
            y: getYAnimation(Math.random() * 0.5 + 0.8),
            opacity: [0.6, 0.3, 0.6],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField; 