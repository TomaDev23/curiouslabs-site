/**
 * @component MissionAtomic
 * @description Eclipse-style mission statement with numbered points
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useAnimation } from 'framer-motion';
import MoonSphereProxy from './proxies/MoonSphereProxy';

// Lazy load MoonSphere to prevent Three.js contamination
// const MoonSphere = lazy(() => import('./Planetary/MoonSphere'));

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'mission_atomic',
  scs: 'SCS-ATOMIC-VISUAL',
  type: 'atomic',
  doc: 'contract_mission_atomic.md'
};

// Advanced Neon Arc Animation Component
const NeonArcAnimation = ({ children, sceneStep }) => {
  const controls = useAnimation();
  
  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Trigger neon glow animation
  useEffect(() => {
    // Always show base neon effect with higher opacity
    controls.set({ 
      opacity: 1.0, // Increased from 0.8 to 1.0
      textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.3)' 
    });

    // Skip advanced effects only if reduced motion is preferred
    if (prefersReducedMotion) {
      return;
    }
    
    const glowInterval = setInterval(() => {
      // Gentle neon flicker and glow with brighter range
      controls.start({
        opacity: [1.0, 1.3, 0.9, 1.4, 1.0], // Increased from [0.8, 1.1, 0.7, 1.2, 0.8]
        textShadow: [
          '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.3)',
          '0 0 18px rgba(0, 255, 255, 1), 0 0 32px rgba(255, 105, 180, 0.6), 0 0 48px rgba(255, 255, 255, 0.3)',
          '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.4)',
          '0 0 22px rgba(0, 255, 255, 1.1), 0 0 38px rgba(255, 105, 180, 0.8), 0 0 56px rgba(255, 255, 255, 0.4)',
          '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.3)',
        ],
        transition: { duration: 0.4, times: [0, 0.15, 0.35, 0.65, 1], ease: 'easeInOut' },
      });
    }, 1500 + Math.random() * 1000); // Random interval 1.5-2.5s

    return () => {
      clearInterval(glowInterval);
    };
  }, [controls, prefersReducedMotion]);

  return (
    <div className="relative">
      <motion.div
        className="text-white/80 text-xs font-mono" // Increased from text-white/50 to text-white/80
        style={{ 
          zIndex: 155,
          willChange: 'opacity, text-shadow',
          filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.3))',
          position: 'relative'
        }}
        animate={controls}
      >
        {children}
      </motion.div>
    </div>
  );
};

const MissionAtomic = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [useSimpleEclipse, setUseSimpleEclipse] = useState(false);
  const controls = useAnimation();
  const moonControls = useAnimation();
  
  // Check if mobile device
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };
  
  // Check if user prefers reduced motion
  const checkMotionPreference = () => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  };
  
  // Check device performance capabilities
  const checkDeviceCapabilities = () => {
    // Simple heuristic: mobile + reduced motion preference
    // A more sophisticated implementation could check for GPU capabilities
    setUseSimpleEclipse(isMobile && prefersReducedMotion);
    
    // Check for URL param for testing both versions
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('forceEclipse') === 'true') {
        setUseSimpleEclipse(true);
      }
    }
  };
  
  useEffect(() => {
    checkMobile();
    const cleanupMotion = checkMotionPreference();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (cleanupMotion) cleanupMotion();
    };
  }, []);
  
  useEffect(() => {
    checkDeviceCapabilities();
  }, [isMobile, prefersReducedMotion]);

  // Self-contained mission points data
  const MISSION_POINTS = [
    {
      id: "01",
      title: "Intelligence with memory",
      description: "Our systems don't just execute—they learn, evolve, and genuinely understand you."
    },
    {
      id: "02", 
      title: "Judgment with humanity",
      description: "Every interface we craft keeps the human in command—enhancing, not replacing, your intuition."
    },
    {
      id: "03",
      title: "Innovation with conscience", 
      description: "We fuse ethical clarity into code and design—because responsible AI isn't optional, it's foundational."
    }
  ];

  // Animation variants (respecting reduced motion preference)
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const missionPointVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.2,
        duration: prefersReducedMotion ? 0.1 : 0.4,
        ease: "easeOut"
      }
    })
  };
  
  const eclipseVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.div 
      className="relative w-full bg-curious-dark-900 overflow-hidden"
      style={{ 
        minHeight: '140vh', // Extended from 110vh to 140vh (+30vh)
        marginTop: '-30vh', // Extended from -10vh to -30vh (+20vh into hero)
        paddingTop: '6rem', // py-24 equivalent
        paddingBottom: 'calc(6rem + 80vh)', // Extended from 50vh to 80vh (+30vh spacer)
        mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%, black calc(100% - 50vh), rgba(0,0,0,0.7) calc(100% - 30vh), rgba(0,0,0,0.3) calc(100% - 15vh), transparent 100%)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%, black calc(100% - 50vh), rgba(0,0,0,0.7) calc(100% - 30vh), rgba(0,0,0,0.3) calc(100% - 15vh), transparent 100%)'
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={sectionVariants}
    >
      {/* Critical LCP Image - Responsive with srcSet */}
      <div className="absolute inset-0">
        <img
          src="/assets/images/planets/milkyway_Light_mobile.webp"
          srcSet="
            /assets/images/planets/milkyway_Light_mobile.webp 1000w,
            /assets/images/planets/milkyway_Light_tablet.webp 1400w,
            /assets/images/planets/4k/milkyway_Light.webp 2560w
          "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          alt="Milky Way Background"
          className="w-full h-full"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            transform: 'scale(1.2)',
            zIndex: 0
          }}
        />
      </div>
      
      {/* Light glassmorphism overlay - much lighter to let image show through */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(0.5px)',
          WebkitBackdropFilter: 'blur(0.5px)',
          zIndex: 1
        }}
      />

      {/* Main content wrapper - Clean z-index */}
      <div className="relative w-full h-full opacity-100" style={{ zIndex: 50 }}>
        {/* Right Section with Numbered Mission Points */}
        <div className={`${isMobile ? 'px-6' : 'md:ml-[45%] md:mr-[5%] pr-4 md:pr-8'} flex flex-col space-y-16 md:space-y-32 mt-[35vh]`}>
          {MISSION_POINTS.map((point, index) => (
            <motion.div 
              key={point.id}
              className="grid grid-cols-12 items-center gap-4 group cursor-pointer relative"
              style={{ zIndex: 60 }}
              custom={index}
              variants={missionPointVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 via-emerald-500/5 to-cyan-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10" />
              <div className="absolute inset-0 border border-lime-400/10 rounded-xl opacity-0 group-hover:opacity-100 group-hover:border-lime-400/30 transition-all duration-500 -z-10" />
              
              {/* For odd indices (or all on mobile) */}
              {(index % 2 === 0 && !isMobile) ? (
                <>
                  <div className="col-span-7 col-start-1 pr-4 relative z-10">
                    <div className="text-right transform group-hover:translate-x-[-8px] transition-transform duration-300">
                      <h3 className="text-white text-xl md:text-2xl mb-2 group-hover:text-lime-400 transition-colors duration-300 relative">
                        {point.title}
                        <div className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-lime-400 to-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-5 col-start-8 pl-4 relative z-10">
                    <div className="text-white text-[80px] md:text-[120px] font-light opacity-90 group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]">
                      {point.id}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {!isMobile && (
                    <div className="col-span-5 col-start-1 pr-4 relative z-10">
                      <div className="text-white text-[80px] md:text-[120px] font-light opacity-90 text-right group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]">
                        {point.id}
                      </div>
                    </div>
                  )}
                  <div className={`${isMobile ? 'col-span-12' : 'col-span-7 col-start-6'} pl-4 relative z-10`}>
                    {isMobile && (
                      <div className="text-white text-[60px] font-light opacity-90 mb-2 group-hover:opacity-100 group-hover:text-lime-400 transition-all duration-300 transform group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]">
                        {point.id}
                      </div>
                    )}
                    <div className="transform group-hover:translate-x-2 transition-transform duration-300">
                      <h3 className="text-white text-xl md:text-2xl mb-2 group-hover:text-lime-400 transition-colors duration-300 relative">
                        {point.title}
                        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lime-400 to-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
                      </h3>
                      <p className="text-white/70 text-xs md:text-sm group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
              
              {/* Hover particles effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 left-8 w-1 h-1 bg-lime-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                <div className="absolute top-12 right-12 w-1 h-1 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                <div className="absolute bottom-8 left-16 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Eclipse/Circle with Mission Statement - Bottom Left */}
      <motion.div 
        className={`absolute ${isMobile ? 'bottom-[calc(2rem+60vh)] left-1/2 -translate-x-1/2' : 'bottom-[calc(4rem+75vh)] left-4 md:left-16'}`}
        variants={eclipseVariants}
        style={{ zIndex: 3 }}
      >
        {/* Cosmic background effects - Bottom left corner nebula */}
        <div 
          className="absolute w-[600px] h-[400px] md:w-[700px] md:h-[460px]"
          style={{
            background: 'radial-gradient(circle at 0% 100%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-30%, 30%)'
          }}
        ></div>

        {/* Cosmic Shimmering Gradient Layer */}
        <div 
          className="absolute animate-pulse"
          style={{
            width: '80vw',
            height: '60vh',
            background: 'radial-gradient(ellipse at 50% 60%, rgba(100, 0, 150, 0.15) 0%, rgba(50, 0, 100, 0.1) 30%, rgba(255, 100, 0, 0.05) 60%, transparent 80%)',
            filter: 'blur(60px)',
            transform: 'translate(-50%, -40%)',
            zIndex: 0
          }}
        ></div>

        {/* Combined and Reshaped Engulfing Nebula */}
        <div 
          className="absolute"
          style={{
            width: '150vw', 
            height: '150vh',
            bottom: '-25vh',
            left: '-25vw',
            background: `
              radial-gradient(ellipse at 15% 85%, rgba(220,220,240,0.25) 0%, rgba(200,200,220,0.1) 30%, transparent 65%),
              radial-gradient(ellipse at center, rgba(160, 32, 240, 0.06) 0%, transparent 70%)
            `,
            filter: 'blur(90px)',
          }}
        ></div>

        {/* Translucent Padding Nebula */}
        <div 
          className="absolute"
          style={{
            width: '70vw',
            height: '90vh',
            background: 'radial-gradient(ellipse at 30% 70%, rgba(200,200,220,0.1) 0%, rgba(200,200,220,0.05) 40%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate(-40%, -60%) rotate(-25deg)',
            zIndex: 0
          }}
        ></div>

        {/* Additional nebula effects */}
        <div 
          className="absolute w-[400px] h-[1000px] md:w-[460px] md:h-[1200px]"
          style={{
            background: 'radial-gradient(circle at 0% 70%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-30%, -70%) rotate(-15deg)'
          }}
        ></div>

        <div 
          className="absolute w-[400px] h-[400px] md:w-[460px] md:h-[460px]"
          style={{
            background: 'radial-gradient(circle at 20% 70%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 15%, rgba(255,255,255,0.05) 40%, transparent 70%)',
            filter: 'blur(30px)',
            transform: 'translate(-20%, 10%)'
          }}
        ></div>

        {/* Main black circle - REPLACED WITH CINEMATIC MOON */}
        <div className="relative flex items-center justify-center transform -translate-x-4 -translate-y-4">
          <div className="w-[700px] h-[700px] md:w-[780px] md:h-[780px]">
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center">
                  <div className="text-white/60 text-sm">Loading Moon...</div>
                </div>
              </div>
            }>
              <MoonSphereProxy className="w-[400px] h-[400px]" />
            </Suspense>
          </div>
          
          {/* Text content container - MOVED TO BOTTOM LEFT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-[2%] left-[8%] z-20 text-left max-w-[460px] p-6 rounded-lg backdrop-blur-sm bg-black/10"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="uppercase tracking-widest text-sm text-white/60 mb-1 font-medium"
            >
              <span className="inline-block mr-1 transform rotate-45">↑</span> our mission
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-4xl font-light mb-3 tracking-wide"
            >
              Human-first AI
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="text-sm text-white/90 leading-relaxed max-w-[400px]"
            >
              We are building responsible, ethical systems for a future where technology aligns with human well-being.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Metadata text - right side of the circle */}
      {!isMobile && (
        <div 
          className="absolute bottom-[calc(45%+48vh)] left-[44rem]"
          style={{ zIndex: 4 }}
        >
          <NeonArcAnimation sceneStep={6}>
            limbo<br />
            {'}'}
            <div className="mt-6">
              this is not<br />
              a hobby<br />
              it is a mission;
            </div>
            <div className="mt-6">
              {'})'}
              <br />
              humanly digital
              <br />
              ------------
            </div>
          </NeonArcAnimation>
        </div>
      )}
      
      {/* New era badge */}
      <motion.div 
        className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-white/90 flex items-center px-3 py-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        viewport={{ once: true }}
        style={{ zIndex: 4 }}
      >
        <div className="mr-3 flex space-x-1">
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊕</span>
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊕</span>
          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-xs">⊖</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-light">new era</span>
          <span className="text-xs ml-8">01</span>
        </div>
      </motion.div>
      
      {/* Heart icon */}
      <div className="absolute top-8 left-8 z-20" style={{ zIndex: 4 }}>
        <span className="text-white/70 text-xl">♡</span>
      </div>
      
      {/* Decorative slashes */}
      <div className="absolute top-8 right-[30%] z-20 text-white/50 font-light" style={{ zIndex: 4 }}>
        //<br/>//<br/>//
      </div>

      {/* Transition art between Mission and Products */}
      <div
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none"
        style={{
          backgroundImage: 'url(/assets/images/general/transition_item1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 70%',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6,
          zIndex: 5,
          mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8vh, rgba(0,0,0,0.6) 15vh, rgba(0,0,0,0.9) 25vh, black 35vh, black 50vh, rgba(0,0,0,0.8) 60vh, rgba(0,0,0,0.4) 70vh, transparent 80vh)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 8vh, rgba(0,0,0,0.6) 15vh, rgba(0,0,0,0.9) 25vh, black 35vh, black 50vh, rgba(0,0,0,0.8) 60vh, rgba(0,0,0,0.4) 70vh, transparent 80vh)'
        }}
      />

      {/* Mission Noise Texture Layer - overlays the transition asset */}
      <div 
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='missionNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23missionNoise)' opacity='0.8'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          zIndex: 6,
          mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 5vh, rgba(0,0,0,0.4) 12vh, rgba(0,0,0,0.8) 22vh, black 32vh)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 5vh, rgba(0,0,0,0.4) 12vh, rgba(0,0,0,0.8) 22vh, black 32vh)'
        }}
      />

      {/* Additional Dissolve Layer for smoother transition */}
      <div 
        className="absolute bottom-0 w-full h-[60vh] pointer-events-none opacity-15 mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 40%, transparent 70%)',
          zIndex: 7,
          mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10vh, rgba(0,0,0,0.7) 20vh, black 30vh)',
          WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10vh, rgba(0,0,0,0.7) 20vh, black 30vh)'
        }}
      />

      {/* Smolder transition gradient for AEGIS handoff */}
      <div
        className="absolute bottom-0 w-full h-[50vh] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.3) 20%, rgba(15, 23, 42, 0.7) 60%, #0f172a 100%)',
          zIndex: 8
        }}
      />
    </motion.div>
  );
};

export default MissionAtomic; 