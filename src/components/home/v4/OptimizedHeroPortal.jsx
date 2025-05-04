import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { sectionVariants, itemVariants } from '../../../utils/animation';
import MagneticButton from '../../ui/MagneticButton';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ResponsiveContainer from '../../ui/ResponsiveContainer';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import ResponsiveButton from '../../ui/ResponsiveButton';
import ErrorBoundary from '../../ui/ErrorBoundary';
import { startComponentRender, endComponentRender } from '../../../utils/performanceMonitor';
import useAccessibilityCheck from '../../../hooks/useAccessibilityCheck';
import LazyLoadWrapper from '../../ui/LazyLoadWrapper';
import { useParallaxMotion } from '../../../hooks/useParallaxMotion';
import SkeletonLoader from '../../ui/SkeletonLoader';

/**
 * OptimizedHeroPortal - Space-themed hero section with performance optimizations
 * Features improved parallax effects, progressive loading, and enhanced animations
 * Implements new hooks for better performance and user experience
 */
const OptimizedHeroPortal = () => {
  // Performance monitoring
  const renderStartTime = startComponentRender('OptimizedHeroPortal');
  
  // Accessibility checks
  const { ref: accessibilityRef } = useAccessibilityCheck('OptimizedHeroPortal');
  
  // Breakpoints for responsive design
  const isMobile = !useBreakpoint('md');
  const isTablet = !useBreakpoint('lg');
  
  // State management
  const [hasScrolled, setHasScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Explore the frontiers of code with our AI-powered development missions";
  
  // Parallax effects using the optimized hook
  const starFieldParallax = useParallaxMotion({
    speed: 0.05,
    maxMovement: 15,
    enableOnMobile: false
  });
  
  const backgroundEffectsParallax = useParallaxMotion({
    speed: 0.02,
    xSpeed: 0.01,
    maxMovement: 10,
    enableOnMobile: false
  });
  
  const titleParallax = useParallaxMotion({
    speed: 0.03,
    maxMovement: 5,
    enableOnMobile: false
  });
  
  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 30);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);
  
  // Track scroll position to hide scroll indicator once user has scrolled
  const handleScroll = useCallback(() => {
    if (window.scrollY > 100 && !hasScrolled) {
      setHasScrolled(true);
    }
  }, [hasScrolled]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Light beam animation variants - memoized to prevent re-creation
  const beamVariants = useMemo(() => ({
    animate: {
      opacity: [0.2, 0.4, 0.2],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }), []);
  
  // Generate stars for the parallax star field - memoized
  const parallaxStars = useMemo(() => {
    return [...Array(isMobile ? 60 : 150)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.3,
      size: Math.random() * 2 + 1,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2
    }));
  }, [isMobile]);
  
  // Generate floating particles - memoized
  const floatingParticles = useMemo(() => {
    return [...Array(isMobile ? 8 : 15)].map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2
    }));
  }, [isMobile]);
  
  // Log render duration when component renders
  useEffect(() => {
    endComponentRender('OptimizedHeroPortal', renderStartTime);
    
    // Cleanup function
    return () => {
      // Any cleanup needed
    };
  }, [renderStartTime]);

  return (
    <ErrorBoundary
      componentName="OptimizedHeroPortal"
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <h1 className="text-white text-2xl">Curious Labs</h1>
        </div>
      }
    >
      <motion.section 
        ref={accessibilityRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {/* Enhanced cosmic radial background for stronger purple glow */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/30 via-gray-900/20 to-black opacity-60"></div>
        
        {/* Enhanced Interactive Parallax Star Field - with optimized parallax */}
        <LazyLoadWrapper
          height="100%"
          width="100%"
          animate={false}
          className="absolute inset-0"
          options={{ rootMargin: '200px' }}
        >
          <div 
            ref={starFieldParallax.ref}
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            style={starFieldParallax.style}
          >
            {/* Dynamic star particles with different sizes and animations - optimized with useMemo */}
            {parallaxStars.map(star => (
              <motion.div
                key={`star-${star.id}`}
                className="absolute rounded-full bg-white"
                style={{
                  top: star.top,
                  left: star.left,
                  opacity: star.opacity,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: star.delay,
                }}
              />
            ))}
          </div>
        </LazyLoadWrapper>
        
        {/* Visual effects container - with optimized parallax */}
        <LazyLoadWrapper
          height="100%"
          width="100%"
          animate={false}
          className="absolute inset-0 pointer-events-none"
          options={{ rootMargin: '100px' }}
        >
          <div ref={backgroundEffectsParallax.ref} style={backgroundEffectsParallax.style}>
            {/* Enhanced Light beams with more intensity and animation */}
            <motion.div 
              className="absolute w-1 h-[600px] bg-purple-500/15 blur-xl rotate-[15deg] left-1/4 top-1/3"
              variants={beamVariants}
              animate="animate"
            ></motion.div>
            
            <motion.div 
              className="absolute w-1 h-[500px] bg-blue-500/15 blur-xl -rotate-[20deg] right-1/4 top-2/3"
              variants={beamVariants}
              animate="animate"
              style={{ animationDelay: '2s' }}
            ></motion.div>
            
            {/* New additional light beam */}
            <motion.div 
              className="absolute w-1 h-[400px] bg-purple-400/10 blur-xl rotate-[45deg] right-1/3 top-1/4"
              variants={beamVariants}
              animate="animate"
              style={{ animationDelay: '4s' }}
            ></motion.div>
            
            {/* Enhanced Background bloom effects with more intensity */}
            <motion.div 
              className="absolute z-10 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-bl from-purple-500/20 to-blue-500/20 blur-3xl top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            
            {/* New nebula effects */}
            <motion.div 
              className="absolute h-[400px] w-[400px] rounded-full opacity-10 blur-3xl"
              style={{ 
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(16, 185, 129, 0) 70%)',
                top: '20%',
                left: '20%',
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.1, 0.05] 
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="absolute h-[300px] w-[300px] rounded-full opacity-10 blur-3xl"
              style={{ 
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(16, 185, 129, 0) 70%)',
                bottom: '20%',
                right: '20%',
              }}
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.05, 0.15, 0.05] 
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Subtle floating particles - enhanced with more particles and optimized with useMemo */}
            {floatingParticles.map(particle => (
              <motion.div
                key={`particle-${particle.id}`}
                className="absolute w-1 h-1 rounded-full bg-white/40"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.2, 0.7, 0.2]
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay
                }}
              />
            ))}
          </div>
        </LazyLoadWrapper>
        
        {/* Subtle noise texture */}
        <CosmicNoiseOverlay opacity={0.02} />
        
        {/* Content with responsive container and parallax effect */}
        <ResponsiveContainer 
          className="relative z-30 text-white text-center"
          paddingY={true}
          paddingX={true}
          type="section"
        >
          <motion.div
            variants={itemVariants}
            className="space-y-4 md:space-y-6 max-w-4xl mx-auto"
            ref={titleParallax.ref}
            style={titleParallax.style}
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
              <motion.span 
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 cosmic-text-glow will-change-transform"
                animate={{
                  backgroundPosition: ['0% center', '100% center', '0% center']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: '200% auto',
                  textShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)' // Enhanced text glow
                }}
              >
                Curious
              </motion.span>
              <span className="inline-block ml-4 text-white will-change-transform">Labs</span>
            </motion.h1>
            
            <div
              className={`${isMobile ? 'text-lg sm:text-xl' : 'text-xl md:text-2xl'} text-gray-300 mb-6 md:mb-8 z-20 relative max-w-2xl mx-auto min-h-[60px] flex items-center justify-center`}
            >
              <span className="inline-block">{typedText}</span>
              <motion.span 
                className="inline-block w-1 h-6 ml-1 bg-purple-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ display: typedText.length < fullText.length ? 'inline-block' : 'none' }}
              />
            </div>
            
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
                    aria-label="Start Your Mission"
                  >
                    Start Your Mission
                  </ResponsiveButton>
                  
                  <ResponsiveButton
                    size={isMobile ? "lg" : "xl"}
                    fullWidth={isMobile}
                    aria-label="Explore Projects"
                  >
                    Explore Projects
                  </ResponsiveButton>
                </>
              ) : (
                <>
                  <MagneticButton
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold shadow-lg shadow-purple-600/30"
                    strength={0.3}
                    aria-label="Start Your Mission"
                  >
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Your Mission
                    </motion.span>
                  </MagneticButton>
                  
                  <MagneticButton
                    className="px-8 py-3 border border-purple-500/40 rounded-full text-white font-medium hover:bg-purple-500/10"
                    strength={0.2}
                    aria-label="Explore Projects"
                  >
                    <motion.span 
                      className="inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Projects
                    </motion.span>
                  </MagneticButton>
                </>
              )}
            </motion.div>
          </motion.div>
        </ResponsiveContainer>
        
        {/* Enhanced scroll indicator - hidden once user has scrolled */}
        {!hasScrolled && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            aria-label="Scroll down"
            role="button"
            tabIndex={0}
          >
            <motion.div
              className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <span className="sr-only">Scroll down</span>
          </motion.div>
        )}
      </motion.section>
    </ErrorBoundary>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(OptimizedHeroPortal); 