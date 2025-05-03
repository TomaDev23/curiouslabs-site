import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SpaceCanvas from './SpaceCanvas';
import { sectionVariants, itemVariants } from '../../../utils/animation';
import MagneticButton from '../../ui/MagneticButton';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ResponsiveContainer from '../../ui/ResponsiveContainer';
import useBreakpoint from '../../../hooks/useBreakpoint';
import ResponsiveButton from '../../ui/ResponsiveButton';

/**
 * HeroPortal - Space-themed hero section
 * Features animated portal effect and particle systems with responsive excellence
 */
const HeroPortal = () => {
  // Refs for animation elements
  const starFieldRef = useRef(null);
  const { isMobile, isTablet } = useBreakpoint();
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Set up parallax effect on mouse move (desktop only)
  useEffect(() => {
    if (isMobile || isTablet) return; // Skip parallax on mobile/tablet for performance
    
    const handleMouseMove = (e) => {
      if (!starFieldRef.current) return;
      
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 15;
      const moveY = (clientY / window.innerHeight - 0.5) * 15;
      
      starFieldRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isTablet]);
  
  // Track scroll position to hide scroll indicator once user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);
  
  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {/* Removing SpaceCanvas integration since it's now handled at the page level */}
      
      {/* Subtle cosmic radial background - more transparent to let stars show through */}
      <div className="absolute inset-0 cosmic-bg-radial opacity-60"></div>
      
      {/* Interactive Star Field - removed from here since the main SpaceCanvas handles this */}
      
      {/* Background bloom effect - reduced size for better layout */}
      <div className="absolute z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-bl from-purple-500/20 to-blue-500/20 blur-3xl animate-pulse top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Extremely subtle noise texture */}
      <CosmicNoiseOverlay opacity={0.015} />
      
      {/* Content with responsive container */}
      <ResponsiveContainer 
        className="relative z-30 text-white text-center"
        paddingY={true}
        paddingX={true}
        type="section"
      >
        <motion.div
          variants={itemVariants}
          className="space-y-4 md:space-y-6 max-w-4xl mx-auto"
        >
          <motion.h1 
            className={`${isMobile ? 'text-4xl sm:text-5xl' : 'text-5xl md:text-7xl'} font-bold mb-4 md:mb-6 drop-shadow-lg`}
            animate={{ y: [0, -8, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 4,
              ease: "easeInOut"
            }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 cosmic-text-glow will-change-transform">
              Curious
            </span>
            <span className="inline-block ml-4 text-white will-change-transform">Labs</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className={`${isMobile ? 'text-lg sm:text-xl' : 'text-xl md:text-2xl'} text-gray-300 mb-6 md:mb-8 z-20 relative max-w-2xl mx-auto`}
          >
            Explore the frontiers of code with our AI-powered development missions
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 z-40 relative"
          >
            {isMobile ? (
              <>
                <ResponsiveButton
                  primary={true}
                  size={isMobile ? "lg" : "xl"}
                  fullWidth={isMobile}
                >
                  Start Your Mission
                </ResponsiveButton>
                
                <ResponsiveButton
                  size={isMobile ? "lg" : "xl"}
                  fullWidth={isMobile}
                >
                  Explore Projects
                </ResponsiveButton>
              </>
            ) : (
              <>
                <MagneticButton
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold shadow-lg shadow-purple-600/20"
                >
                  Start Your Mission
                </MagneticButton>
                
                <MagneticButton
                  className="px-8 py-3 border border-purple-500/30 rounded-full text-white font-medium hover:bg-purple-500/10"
                >
                  Explore Projects
                </MagneticButton>
              </>
            )}
          </motion.div>
        </motion.div>
      </ResponsiveContainer>
      
      {/* Scroll indicator - hidden once user has scrolled */}
      {!hasScrolled && (
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <p className="text-gray-400 mb-2 text-sm">Scroll to explore</p>
          <svg 
            className="w-6 h-6 text-gray-400" 
            fill="none" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      )}
    </motion.section>
  );
};

export default HeroPortal; 