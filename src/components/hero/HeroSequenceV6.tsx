import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from '../scene/SceneControllerV6';
import { useMission } from '../mission/MissionTracker';
import AegisPlanetV6 from './AegisPlanetV6';

interface HeroSequenceProps {
  className?: string;
}

const TextReveal: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.19, 1, 0.22, 1]
    }}
  >
    {children}
  </motion.div>
);

const HeroSequenceV6: React.FC<HeroSequenceProps> = ({ className = "" }) => {
  const { phase, deviceCapabilities } = useScene();
  const { updateSubtaskStatus } = useMission();

  // Mark logo transitions as complete when animations are ready
  useEffect(() => {
    if (phase === 'hero-intro') {
      updateSubtaskStatus('tile-c', 'c1', true);
    }
  }, [phase, updateSubtaskStatus]);

  // Mark text reveal system as complete when component mounts
  useEffect(() => {
    updateSubtaskStatus('tile-c', 'c3', true);
  }, [updateSubtaskStatus]);

  return (
    <div className={`relative min-h-screen ${className}`}>
      <AnimatePresence mode="wait">
        {/* Logo Section */}
        <motion.div
          key="logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: phase === 'initial' ? 0 : 1,
            scale: 1,
            y: phase === 'hero-intro' ? 0 : -20
          }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-10"
        >
          <img 
            src="/images/logo.svg" 
            alt="CuriousLabs Logo" 
            className="h-12 w-auto"
          />
        </motion.div>

        {/* Planet Visualization */}
        <motion.div
          key="planet"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: phase === 'planet-reveal' ? 1.1 : 1
          }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        >
          <AegisPlanetV6 
            interactive={phase === 'interactive'} 
            scale={deviceCapabilities.performanceTier === 'high' ? 1.2 : 1}
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          key="content"
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'text-reveal' ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <TextReveal delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to CuriousLabs
            </h1>
          </TextReveal>

          <TextReveal delay={0.4}>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Exploring the frontiers of technology and innovation
            </p>
          </TextReveal>

          <TextReveal delay={0.6}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-medium"
            >
              Start Exploring
            </motion.button>
          </TextReveal>
        </motion.div>

        {/* Background Gradient */}
        <motion.div
          key="gradient"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== 'initial' ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Performance Mode Indicator */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 text-xs text-gray-500">
          Mode: {deviceCapabilities.performanceTier}
        </div>
      )}
    </div>
  );
};

export default HeroSequenceV6; 