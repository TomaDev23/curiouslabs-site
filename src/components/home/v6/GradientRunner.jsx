// src/components/GradientRunner.jsx
import React from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

const GradientRunner = ({ currentPage = 0 }) => {
  // Motion value for current page (0-2) 
  const pageMotionValue = useMotionValue(currentPage);

  // Transform gradient position based on currentPage (3 pages now)
  const gradientX = useTransform(pageMotionValue, [0, 1, 2], ['0%', '50%', '100%']);

  // Update pageMotionValue when currentPage changes
  React.useEffect(() => {
    pageMotionValue.set(currentPage);
  }, [currentPage, pageMotionValue]);

  // Pre-calculated particle positions (stable, no Math.random())
  const particles = [
    { x: 20, y: 30, size: 2, delay: 0 },
    { x: 80, y: 70, size: 1, delay: 2 },
    { x: 50, y: 20, size: 3, delay: 4 },
    { x: 15, y: 80, size: 1.5, delay: 1 },
    { x: 90, y: 40, size: 2.5, delay: 3 },
    { x: 60, y: 90, size: 1, delay: 5 },
  ];

  // Page-specific particle colors
  const getParticleColor = () => {
    switch (currentPage) {
      case 0: return '#84cc16'; // AEGIS - Green
      case 1: return '#22d3ee'; // Products - Cyan
      case 2: return '#d946ef'; // Services - Magenta
      default: return '#84cc16';
    }
  };

  // Nebula glow variants (restored from original)
  const nebulaVariants = {
    animate: {
      scale: [1, 1.02, 1],
      opacity: [0.15, 0.2, 0.15],
      x: [0, 20, 0],
      y: [0, -15, 0],
      transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="absolute inset-0 z-[-1]"
      style={{
        background: `
          linear-gradient(
            to right,
            #0f172a 0%,
            #1e293b 25%,
            #22d3ee50 50%,
            #d946ef80 75%,
            #2d1b4f 100%
          )
        `,
        backgroundSize: '300% 100%', // Adjusted for 3 pages
        backgroundPosition: gradientX,
        willChange: 'background-position',
      }}
      animate={{ backgroundPositionX: gradientX }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Nebula Glow Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 40%, rgba(132, 204, 22, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse at 75% 60%, rgba(34, 211, 238, 0.1) 0%, transparent 60%)
          `,
          filter: 'blur(80px)',
        }}
        variants={nebulaVariants}
        animate={currentPage === 0 ? 'animate' : { opacity: 0 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(34, 211, 238, 0.2) 0%, transparent 70%),
            radial-gradient(ellipse at 80% 50%, rgba(217, 70, 239, 0.15) 0%, transparent 60%)
          `,
          filter: 'blur(80px)',
        }}
        variants={nebulaVariants}
        animate={currentPage === 1 ? 'animate' : { opacity: 0 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 25% 40%, rgba(217, 70, 239, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse at 75% 60%, rgba(255, 107, 53, 0.15) 0%, transparent 60%)
          `,
          filter: 'blur(80px)',
        }}
        variants={nebulaVariants}
        animate={currentPage === 2 ? 'animate' : { opacity: 0 }}
      />

      {/* Floating Particles Layer */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: getParticleColor(),
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            boxShadow: `0 0 ${particle.size * 3}px ${getParticleColor()}`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cosmicNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cosmicNoise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </motion.div>
  );
};

export default GradientRunner;