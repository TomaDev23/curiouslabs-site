/**
 * @component MissionAtomic
 * @description Eclipse-style mission statement with numbered points
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'mission_atomic',
  scs: 'SCS-ATOMIC-VISUAL',
  type: 'atomic',
  doc: 'contract_mission_atomic.md'
};

const MissionAtomic = () => {
  // Self-contained responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [milkywayLoaded, setMilkywayLoaded] = useState(false);
  
  // Handle responsive behavior and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkMotionPreference = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Listen for changes
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };
    
    // Smooth fade-in for Milky Way background
    const preloadMilkyway = () => {
      const img = new Image();
      img.src = "/assets/images/planets/4k/milkyway_Light.webp";
      img.onload = () => {
        setMilkywayLoaded(true);
      };
      img.onerror = () => {
        console.warn("Milky Way image failed to load, using fallback");
        setMilkywayLoaded(true); // Show component anyway
      };
    };
    
    // Initial checks
    checkMobile();
    checkMotionPreference();
    preloadMilkyway();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Self-contained mission points data
  const MISSION_POINTS = [
    {
      id: "01",
      title: "Research & Analyze",
      description: "Understanding your vision and requirements is our first step. We dive deep to analyze the market, audience, and technical needs."
    },
    {
      id: "02",
      title: "Concept & Sketch",
      description: "Translating ideas into visual concepts and architectural plans. We create the blueprint for your digital solution."
    },
    {
      id: "03",
      title: "Design & Build",
      description: "From concept to code, we craft every aspect with precision. Our development process ensures quality and performance."
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
      className="relative w-full bg-curious-dark-900 py-24 overflow-hidden"
      style={{ 
        minHeight: '110vh', // Extended from 100vh to 110vh
        marginTop: '-10vh', // Overlap into hero section
        mask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%)',
        WebkitMask: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 8%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.6) 25%, rgba(0,0,0,0.8) 35%, black 45%)'
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={sectionVariants}
    >
      {/* Background Image with 10vh dissolve mask - coordinated with nebula */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/images/planets/4k/milkyway_Light.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: milkywayLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out'
        }}
      />
      
      {/* Light glassmorphism overlay - much lighter to let image show through */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(0.5px)',
          WebkitBackdropFilter: 'blur(0.5px)',
          zIndex: 2
        }}
      />

      {/* Main content wrapper with conditional rendering based on image load - v6 style */}
      <div className="relative w-full h-full opacity-100" style={{ zIndex: 10 }}>
        {/* Right Section with Numbered Mission Points */}
        <div className={`${isMobile ? 'px-6' : 'md:ml-[45%] md:mr-[5%] pr-4 md:pr-8'} flex flex-col space-y-16 md:space-y-32 mt-[25vh]`}>
          {MISSION_POINTS.map((point, index) => (
            <motion.div 
              key={point.id}
              className="grid grid-cols-12 items-center gap-4"
              custom={index}
              variants={missionPointVariants}
            >
              {/* For odd indices (or all on mobile) */}
              {(index % 2 === 0 && !isMobile) ? (
                <>
                  <div className="col-span-7 col-start-1 pr-4">
                    <div className="text-right">
                      <h3 className="text-white text-xl md:text-2xl mb-2">{point.title}</h3>
                      <p className="text-white/70 text-xs md:text-sm">{point.description}</p>
                    </div>
                  </div>
                  <div className="col-span-5 col-start-8 pl-4">
                    <div className="text-white text-[80px] md:text-[120px] font-light opacity-90">{point.id}</div>
                  </div>
                </>
              ) : (
                <>
                  {!isMobile && (
                    <div className="col-span-5 col-start-1 pr-4">
                      <div className="text-white text-[80px] md:text-[120px] font-light opacity-90 text-right">{point.id}</div>
                    </div>
                  )}
                  <div className={`${isMobile ? 'col-span-12' : 'col-span-7 col-start-6'} pl-4`}>
                    {isMobile && (
                      <div className="text-white text-[60px] font-light opacity-90 mb-2">{point.id}</div>
                    )}
                    <div>
                      <h3 className="text-white text-xl md:text-2xl mb-2">{point.title}</h3>
                      <p className="text-white/70 text-xs md:text-sm">{point.description}</p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Eclipse/Circle with Mission Statement - Bottom Left */}
      <motion.div 
        className={`absolute ${isMobile ? 'bottom-8 left-1/2 -translate-x-1/2' : 'bottom-16 left-8 md:left-24'}`}
        variants={eclipseVariants}
        style={{ zIndex: 15 }}
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

        {/* Outer glow layers - multiple layers for realistic effect */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl bg-white"
          style={{ 
            width: '180%', 
            height: '180%', 
            filter: 'blur(80px)'
          }}
        ></div>
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-2xl bg-white"
          style={{ 
            width: '170%', 
            height: '170%', 
            filter: 'blur(60px)'
          }}
        ></div>
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-xl bg-white"
          style={{ 
            width: '160%', 
            height: '160%', 
            filter: 'blur(40px)'
          }}
        ></div>

        {/* Main black circle */}
        <div 
          className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px] rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(20,20,20,1) 40%, rgba(20,20,20,0.5) 70%, rgba(0,0,0,0) 100%)'
          }}
        >
          {/* Fuzzy Crescent Shadow Layer for depth */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 80% 20%, rgba(0,0,0,0.35) 0%, transparent 50%)',
              filter: 'blur(20px)',
              pointerEvents: 'none'
            }}
          ></div>
          {/* Text content container */}
          <div className="relative z-20 text-center max-w-[320px]">
            <p className="uppercase tracking-widest text-sm text-white/50">
              <span className="inline-block mr-1">↗</span> our mission
            </p>
            <h2 className="text-3xl font-light mt-2 mb-4">Human-first AI</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              We are building responsible, ethical systems for a future where technology aligns with human well-being.
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative elements */}
      {/* Metadata text - right side of the circle */}
      {!isMobile && (
        <div className="absolute bottom-[45%] left-[34rem] text-white/50 text-xs font-mono" style={{ zIndex: 12 }}>
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
        </div>
      )}
      
      {/* New era badge */}
      <motion.div 
        className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-white/90 flex items-center px-3 py-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        viewport={{ once: true }}
        style={{ zIndex: 12 }}
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
      <div className="absolute top-8 left-8 z-20" style={{ zIndex: 12 }}>
        <span className="text-white/70 text-xl">♡</span>
      </div>
      
      {/* Decorative slashes */}
      <div className="absolute top-8 right-[30%] z-20 text-white/50 font-light" style={{ zIndex: 12 }}>
        //<br/>//<br/>//
      </div>
    </motion.div>
  );
};

export default MissionAtomic; 