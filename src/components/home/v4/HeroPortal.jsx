import React, { useEffect, useRef, useState, useMemo, useCallback, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpaceCanvas from './SpaceCanvas';
import { sectionVariants, itemVariants } from '../../../utils/animation';
import MagneticButton from '../../ui/MagneticButton';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ResponsiveContainer from '../../ui/ResponsiveContainer';
import { useBreakpoint } from '../../../hooks/useBreakpoint.js';
import ResponsiveButton from '../../ui/ResponsiveButton';
import ErrorBoundary from '../../ui/ErrorBoundary';
import { startComponentRender, endComponentRender } from '../../../utils/performanceMonitor';
import useAccessibilityCheck from '../../../hooks/useAccessibilityCheck';
import { useLazyLoad } from '../../../hooks/useLazyLoad';
import LazyImage from '../../ui/LazyImage';
import LogoStrip from '../../../components/LogoStrip';

/**
 * HeroPortal - Space-themed hero section
 * Features animated portal effect and particle systems with responsive excellence
 * Now includes typing animation and enhanced visual effects
 * Optimized with React.memo, useMemo, useCallback and lazy loading
 * Animation durations reduced by ~50% for improved performance
 */
const HeroPortal = () => {
  // Performance monitoring
  const renderStartTime = startComponentRender('HeroPortal');
  
  // Accessibility checks
  const { ref: accessibilityRef } = useAccessibilityCheck('HeroPortal');
  
  // Refs for animation elements
  const starFieldRef = useRef(null);
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const [hasScrolled, setHasScrolled] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Explore the frontiers of code with our AI-powered development missions";
  
  // Lazy load elements as they come into view
  const [effectsRef, shouldRenderEffects] = useLazyLoad({ rootMargin: '100px' });
  const [particlesRef, shouldRenderParticles] = useLazyLoad({ rootMargin: '100px' });
  
  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 30);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);
  
  // Set up parallax effect on mouse move (desktop only) - optimized with useCallback
  const handleMouseMove = useCallback((e) => {
    if (!starFieldRef.current) return;
    
    const { clientX, clientY } = e;
    const moveX = (clientX / window.innerWidth - 0.5) * 15;
    const moveY = (clientY / window.innerHeight - 0.5) * 15;
    
    starFieldRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
  }, []);
  
  useEffect(() => {
    if (isMobile || isTablet) return; // Skip parallax on mobile/tablet for performance
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, isTablet, handleMouseMove]);
  
  // Track scroll position to hide scroll indicator once user has scrolled - optimized with useCallback
  const handleScroll = useCallback(() => {
    if (window.scrollY > 100 && !hasScrolled) {
      setHasScrolled(true);
    }
  }, [hasScrolled]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  // Light beam animation variants with reduced duration
  const beamVariants = useMemo(() => ({
    animate: {
      opacity: [0.2, 0.4, 0.2],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2, // Reduced from 8s
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
      duration: 1.5 + Math.random() * 2.5, // Reduced from 3-8s to 1.5-4s
      delay: Math.random() * 1 // Reduced delay
    }));
  }, [isMobile]);
  
  // Generate floating particles - memoized
  const floatingParticles = useMemo(() => {
    return [...Array(isMobile ? 5 : 15)].map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      duration: isMobile ? 1.2 + Math.random() * 1.8 : 1.5 + Math.random() * 2.5, // Faster on mobile
      delay: isMobile ? Math.random() * 0.5 : Math.random() * 1 // Less delay on mobile
    }));
  }, [isMobile]);
  
  // Add scroll position for logo strip fade effect
  const { scrollY } = useScroll();
  const logoStripOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  
  // Log render duration when component renders
  useEffect(() => {
    endComponentRender('HeroPortal', renderStartTime);
  }, [renderStartTime]);

  return (
    <ErrorBoundary
      componentName="HeroPortal"
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
        {/* Removing SpaceCanvas integration since it's now handled at the page level */}
        
        {/* Enhanced Interactive Parallax Star Field - lazy loaded */}
        <div 
          ref={(node) => {
            starFieldRef.current = node;
            if (particlesRef && typeof particlesRef === 'function') {
              particlesRef(node);
            }
          }}
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ willChange: 'transform' }}
        >
          {/* Dynamic star particles with different sizes and animations - optimized with useMemo */}
          {shouldRenderParticles && parallaxStars.map(star => (
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
        
        {/* Visual effects container - lazy loaded */}
        <div ref={effectsRef} className="absolute inset-0 pointer-events-none">
          {shouldRenderEffects && (
            <>
              {/* Enhanced Light beams with more intensity and animation - durations reduced */}
              <motion.div 
                className="absolute w-1 h-[600px] bg-purple-500/15 blur-xl rotate-[15deg] left-1/4 top-1/3"
                variants={beamVariants}
                animate="animate"
              ></motion.div>
              
              <motion.div 
                className="absolute w-1 h-[500px] bg-blue-500/15 blur-xl -rotate-[20deg] right-1/4 top-2/3"
                variants={beamVariants}
                animate="animate"
                style={{ animationDelay: '1s' }}
              ></motion.div>
              
              {/* New additional light beam */}
              <motion.div 
                className="absolute w-1 h-[400px] bg-purple-400/10 blur-xl rotate-[45deg] right-1/3 top-1/4"
                variants={beamVariants}
                animate="animate"
                style={{ animationDelay: '2s' }}
              ></motion.div>
              
              {/* Enhanced Background bloom effects with more intensity */}
              <motion.div 
                className="absolute z-10 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-bl from-purple-500/20 to-blue-500/20 blur-3xl top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4, // Reduced from 8s
                  repeat: Infinity,
                  ease: [0.33, 1, 0.68, 1] // Standardized cubic-bezier
                }}
              ></motion.div>
              
              {/* New nebula effects with reduced durations */}
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
                transition={{ 
                  duration: 8, // Reduced from 15s
                  repeat: Infinity, 
                  ease: [0.33, 1, 0.68, 1] // Standardized cubic-bezier
                }}
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
                transition={{ 
                  duration: 10, // Reduced from 20s
                  repeat: Infinity, 
                  ease: [0.33, 1, 0.68, 1] // Standardized cubic-bezier
                }}
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
                    ease: [0.33, 1, 0.68, 1], // Standardized cubic-bezier
                    delay: particle.delay
                  }}
                />
              ))}
            </>
          )}
        </div>
        
        {/* Extremely subtle noise texture */}
        <CosmicNoiseOverlay opacity={0.02} />
        
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
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-[60]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ 
              duration: 0.5, // Reduced from 1s
              delay: 1, // Reduced from 2s
              ease: [0.33, 1, 0.68, 1] // Standardized cubic-bezier
            }}
            aria-label="Scroll down"
            role="button"
            tabIndex={0}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 1, // Reduced from 2s
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <svg className="w-8 h-8 text-white opacity-80" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </motion.div>
        )}
        
        {/* Logo Strip integrated at the bottom of the hero with fade effect */}
        <motion.div 
          className="absolute bottom-[50px] left-0 right-0 w-full"
          style={{ opacity: logoStripOpacity }}
        >
          <LogoStrip />
        </motion.div>
      </motion.section>
    </ErrorBoundary>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(HeroPortal); 