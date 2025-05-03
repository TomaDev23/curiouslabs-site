import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * HeroPortal - Space-themed hero section
 * Features animated portal effect and particle systems
 */
const HeroPortal = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Parallax effect based on mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Portal ring */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, rgba(124, 58, 237, 0.2) 40%, rgba(124, 58, 237, 0) 70%)",
            filter: "blur(2px)",
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Inner portal energy */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(0, 0, 0, 0) 70%)",
            filter: "blur(8px)",
            x: mousePosition.x * -15,
            y: mousePosition.y * -15,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Portal core */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(167, 139, 250, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            boxShadow: "0 0 40px 10px rgba(167, 139, 250, 0.5)",
            x: mousePosition.x * -5,
            y: mousePosition.y * -5,
          }}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Orbit particles */}
        <OrbitParticles count={8} radius={200} duration={10} />
        <OrbitParticles count={12} radius={300} duration={20} clockwise={false} />
        <OrbitParticles count={6} radius={150} duration={5} />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              Curious
            </span>
            <span className="inline-block ml-4 text-white">Labs</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Explore the frontiers of code with our AI-powered development missions
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-bold shadow-lg shadow-purple-600/20"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Start Your Mission
            </motion.button>
            
            <motion.button
              className="px-8 py-3 border border-purple-500/30 rounded-full text-white font-medium hover:bg-purple-500/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Projects
            </motion.button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
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
    </motion.section>
  );
};

// Helper component for creating orbit particles
const OrbitParticles = ({ count, radius, duration, clockwise = true }) => {
  return [...Array(count)].map((_, i) => {
    const angle = (i / count) * 2 * Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return (
      <motion.div
        key={`orbit-${radius}-${i}`}
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-purple-500/80"
        initial={{
          x, 
          y,
          scale: Math.random() * 0.5 + 0.5
        }}
        animate={{
          rotate: clockwise ? 360 : -360
        }}
        transition={{
          duration: duration + Math.random() * 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          transformOrigin: `${-x}px ${-y}px`
        }}
      />
    );
  });
};

export default HeroPortal; 