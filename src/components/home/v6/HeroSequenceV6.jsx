/**
 * @metadata
 * @component HeroSequenceV6
 * @description Hero section orchestrator for CuriousLabs V6
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from './SceneControllerV6';
import AegisPlanetV6 from './AegisPlanetV6';

const HeroSequenceV6 = () => {
  const { scenePhase, deviceCapabilities } = useScene();
  
  // Animation variants for text elements
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };
  
  // Animation variants for the CTA button
  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* Logo */}
      <AnimatePresence>
        {scenePhase !== 'void' && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={textVariants}
            custom={0.4}
            className="mb-8"
          >
            <img
              src="/images/curious-labs-logo.svg"
              alt="CuriousLabs"
              className="h-12 md:h-16"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Planet Visualization */}
      <div className="relative w-full max-w-screen-lg mx-auto mb-12">
        <AegisPlanetV6
          size={deviceCapabilities.isMobile ? 240 : 400}
          className="mx-auto"
        />
      </div>
      
      {/* Headline */}
      <AnimatePresence>
        {scenePhase === 'activation' && (
          <motion.h1
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={textVariants}
            custom={0.8}
            className="text-4xl md:text-6xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-blue-500 to-purple-600"
          >
            Explore the Future of Web
          </motion.h1>
        )}
      </AnimatePresence>
      
      {/* Subheadline */}
      <AnimatePresence>
        {scenePhase === 'activation' && (
          <motion.p
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={textVariants}
            custom={1.0}
            className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-12"
          >
            Building next-generation digital experiences with cutting-edge technology
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* CTA Button */}
      <AnimatePresence>
        {scenePhase === 'activation' && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={ctaVariants}
          >
            <button
              className="px-8 py-4 bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              Begin the Journey
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scroll Indicator */}
      <AnimatePresence>
        {scenePhase === 'activation' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center text-gray-400">
              <span className="text-sm mb-2">Scroll to Explore</span>
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-5 h-5 border-b-2 border-r-2 border-gray-400 transform rotate-45"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSequenceV6;