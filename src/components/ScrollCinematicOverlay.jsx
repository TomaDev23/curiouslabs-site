import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import EnhancedComet from "./EnhancedComet";

const StarfieldCanvas = ({ depth = 1, count = 100, opacity = 0.6, scale = 1, x = 0, y = 0 }) => {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate random stars
    const newStars = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + (depth === 1 ? 1 : 0.5),
      opacity: Math.random() * 0.8 + 0.2
    }));
    setStars(newStars);
  }, [count, depth]);
  
  return (
    <div 
      className="absolute inset-0" 
      style={{ 
        transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
        opacity
      }}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
};

const ScrollCinematicOverlay = () => {
  // Track scroll position
  const { scrollY } = useScroll();
  const [active, setActive] = useState(false);
  
  // Track mouse position for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Setup scroll monitor
  useEffect(() => {
    const unsub = scrollY.onChange((y) => {
      if (y > 30 && !active) setActive(true);
    });
    return () => unsub();
  }, [scrollY, active]);
  
  // Setup mouse position tracking for parallax
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) / 20);  // Reduced sensitivity for subtlety
      mouseY.set((e.clientY - centerY) / 20);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Only apply the effect in the hero area - fade out as we scroll further
  const opacityByScroll = useTransform(
    scrollY, 
    [30, 200, 600, 700], 
    [0, 1, 0.5, 0]
  );
  
  // For smaller screens, simplify the animations
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  
  // Setup comets with varied paths and timing
  const cometConfigs = [
    {
      pathType: "arc",
      startPosition: { x: -50, y: window.innerHeight * 0.3 },
      endPosition: { x: window.innerWidth + 50, y: window.innerHeight * 0.7 },
      size: 3,
      speed: 20,
      color: "#ffffff",
      glowColor: "rgba(123, 213, 245, 0.6)",
      delay: 2
    },
    {
      pathType: "curved",
      startPosition: { x: window.innerWidth + 50, y: window.innerHeight * 0.2 },
      endPosition: { x: -50, y: window.innerHeight * 0.4 },
      size: 4,
      speed: 25,
      color: "#F8F8FF",
      glowColor: "rgba(255, 255, 255, 0.4)",
      delay: 8
    },
    {
      pathType: "straight",
      startPosition: { x: window.innerWidth * 0.2, y: -50 },
      endPosition: { x: window.innerWidth * 0.8, y: window.innerHeight + 50 },
      size: 2,
      speed: 15,
      color: "#E6F7FF",
      glowColor: "rgba(230, 247, 255, 0.7)",
      delay: 15
    }
  ];
  
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ 
        opacity: opacityByScroll,
        zIndex: -1, 
        height: "100vh"
      }}
    >
      {/* Dark background overlay */}
      <motion.div
        className="absolute inset-0 bg-black/90"
      />
      
      {/* Starfield 1 - Foreground stars */}
      <motion.div className="absolute inset-0">
        <StarfieldCanvas 
          depth={1} 
          count={120} 
          opacity={0.8} 
          x={mouseX.get()}
          y={mouseY.get()}
        />
      </motion.div>
      
      {/* Starfield 2 - Background stars */}
      <motion.div className="absolute inset-0">
        <StarfieldCanvas 
          depth={2} 
          count={200} 
          opacity={0.4} 
          scale={1.5} 
          x={mouseX.get() * 0.5}
          y={mouseY.get() * 0.5}
        />
      </motion.div>
      
      {/* Add comets when active */}
      {active && !prefersReducedMotion && cometConfigs.map((config, index) => (
        <EnhancedComet key={index} {...config} />
      ))}
      
      {/* Aegis glow ring - central radial glow effect */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-orange-400/10 blur-3xl"
        style={{ 
          top: '45%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          x: useTransform(mouseX, value => value * -0.2),
          y: useTransform(mouseY, value => value * -0.2)
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      
      {/* Secondary blue glow for depth */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-blue-600/5 blur-3xl"
        style={{ 
          top: '45%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          x: useTransform(mouseX, value => value * 0.3),
          y: useTransform(mouseY, value => value * 0.3)
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
      />
      
      {/* Orbit nodes (icons only, no labels) - don't show on mobile */}
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[24rem] h-[24rem]">
            {[
              { icon: "🛰️", angle: 0, delay: 0.2 },
              { icon: "🔐", angle: 90, delay: 0.3 },
              { icon: "🌙", angle: 180, delay: 0.4 },
              { icon: "🧠", angle: 270, delay: 0.5 }
            ].map(({ icon, angle, delay }, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = 140 * Math.cos(rad);
              const y = 140 * Math.sin(rad);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 text-2xl text-white flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={active ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: delay, duration: 1 }}
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                    x: useTransform(mouseX, value => value * -0.2 * Math.cos(rad)),
                    y: useTransform(mouseY, value => value * -0.2 * Math.sin(rad))
                  }}
                >
                  {icon}
                </motion.div>
              );
            })}
            
            {/* Central Aegis logo node */}
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white"
              style={{
                left: 'calc(50% - 32px)',
                top: 'calc(50% - 32px)',
                x: useTransform(mouseX, value => value * -0.1),
                y: useTransform(mouseY, value => value * -0.1)
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={active ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1, duration: 1 }}
            >
              <span className="text-3xl">🔆</span>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ScrollCinematicOverlay; 