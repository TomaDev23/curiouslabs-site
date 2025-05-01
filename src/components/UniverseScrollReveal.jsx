import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroDissolveController from './HeroDissolveController';
import MiniSystemLayout from './MiniSystemLayout';
import SolarSystemLayout from './SolarSystemLayout';
import UniverseScrollController from './UniverseScrollController';

// This component manages the scroll-based transition between hero and content
export default function UniverseScrollReveal({ prefersReducedMotion = false }) {
  // Check for user's motion preference
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  
  useEffect(() => {
    // Check for the prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches || prefersReducedMotion);
    
    // Add listener to update state if preference changes
    const handleMediaChange = () => {
      setReducedMotion(mediaQuery.matches || prefersReducedMotion);
    };
    
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [prefersReducedMotion]);
  
  // Track scroll position
  const { scrollYProgress } = useScroll();
  
  // Content section scroll-based animations
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.15, 0.25], [50, 0]);
  const contentScale = useTransform(scrollYProgress, [0.15, 0.25], [0.95, 1]);
  
  // Mini system animations
  const miniSystemOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const miniSystemScale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);
  
  return (
    <UniverseScrollController>
      {({ hasScrolledOnce }) => (
        <div className="relative w-full">
          {/* Full-screen hero section with dissolve effect */}
          <div className="relative w-full h-screen">
            <HeroDissolveController 
              prefersReducedMotion={reducedMotion} 
              hasScrolledOnce={hasScrolledOnce}
            />
          </div>
          
          {/* Solar system - appears after scroll trigger */}
          <motion.div
            className="fixed inset-0 z-20"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: hasScrolledOnce ? 1 : 0,
              pointerEvents: hasScrolledOnce ? 'auto' : 'none'
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SolarSystemLayout />
          </motion.div>
          
          {/* Spacer to allow for scrolling */}
          <div className="h-[100vh]"></div>
          
          {/* Content that appears as you scroll */}
          <motion.div
            className="relative w-full py-16 px-6 md:px-12 bg-gray-900 z-10"
            style={{
              opacity: contentOpacity,
              y: contentY,
              scale: contentScale
            }}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Discover the Universe</h2>
              <p className="text-lg text-gray-300 mb-8">
                Our platform gives you access to a vast array of cosmic data and interactive visualizations,
                allowing you to explore the wonders of space from the comfort of your device.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">Stellar Data</h3>
                  <p className="text-gray-300">
                    Access information about thousands of stars, planets, and galaxies with our comprehensive database.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-3">Interactive Maps</h3>
                  <p className="text-gray-300">
                    Navigate through 3D maps of our solar system and beyond with intuitive controls.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Mini solar system visualization */}
          <motion.div
            className="relative w-full py-16 bg-black flex justify-center items-center"
            style={{
              opacity: miniSystemOpacity,
              scale: miniSystemScale
            }}
          >
            <MiniSystemLayout prefersReducedMotion={reducedMotion} />
          </motion.div>
        </div>
      )}
    </UniverseScrollController>
  );
} 