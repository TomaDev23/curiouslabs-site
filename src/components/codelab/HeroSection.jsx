import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  // Container staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.5,
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Floating animation variants
  const floatVariants = {
    idle: {
      y: shouldReduceMotion ? 0 : [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Orbit animation variants for badges
  const orbitVariants = {
    idle: (index) => ({
      rotate: shouldReduceMotion ? 0 : [0, 360],
      transition: {
        duration: 20 + index * 5,
        repeat: Infinity,
        ease: "linear"
      }
    })
  };

  // Badge variants with offset position
  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (index) => ({
      scale: 1,
      opacity: 0.9,
      transition: {
        duration: 0.4,
        delay: 0.7 + (index * 0.2),
        ease: "backOut"
      }
    })
  };

  return (
    <motion.section
      className="relative pt-12 pb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl z-0"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl z-0"></div>

      {/* Asymmetric layout container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-10 lg:gap-16 items-center">
        {/* Left column - Hero text */}
        <div className="flex flex-col justify-center">
          <motion.div variants={textVariants} className="mb-4">
            <motion.span 
              className="inline-block text-sm font-semibold uppercase tracking-widest text-purple-400 mb-4"
              variants={textVariants}
            >
              CuriousLabs
            </motion.span>
            
            {/* Split headline text for separate floating animations */}
            <div className="overflow-hidden">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2"
                variants={textVariants}
              >
                <motion.span 
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300"
                  animate="idle"
                  variants={floatVariants}
                >
                  Elite AI CodeOps
                </motion.span>
              </motion.h1>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                variants={textVariants}
              >
                <motion.span 
                  className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300"
                  animate="idle"
                  variants={{
                    idle: {
                      y: shouldReduceMotion ? 0 : [0, -8, 0],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 1
                      }
                    }
                  }}
                >
                  <motion.span 
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300 inline-block"
                    animate={shouldReduceMotion ? {} : {
                      y: shouldReduceMotion ? 0 : [0, -8, 0],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 1
                      }
                    }}
                    style={{
                      lineHeight: "1.2",
                      paddingBottom: "8px",
                      marginBottom: "16px",
                      overflow: "visible"
                    }}
                  >
                    Run by Agents
                  </motion.span>
                </motion.span>
              </motion.h1>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-xl mb-8"
            variants={textVariants}
          >
            Submit your bugs, and we return clean, test-passing,
            CLI-traced code with professional implementation.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 items-center"
            variants={textVariants}
          >
            <motion.button 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg text-white font-medium shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore CodeLab
            </motion.button>
            
            <motion.span 
              className="text-sm text-purple-300 flex items-center"
              variants={textVariants}
            >
              <span className="w-5 h-px bg-purple-500 mr-2"></span>
              LEGIT Traced · Agent-Tested · Production-Proven
            </motion.span>
          </motion.div>
        </div>
        
        {/* Right column - Orbiting elements */}
        <motion.div 
          className="relative h-[350px] md:h-[400px] w-full"
          variants={textVariants}
        >
          {/* Central element */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/20 rounded-full backdrop-blur-md z-20 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-5xl">🚀</div>
          </motion.div>
          
          {/* Orbital path indicators */}
          <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-purple-500/10 rounded-full" />
          <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-indigo-500/10 rounded-full" />
          
          {/* Orbiting badges */}
          {[
            { id: 1, emoji: "⚡", label: "Fast", angle: 30, radius: 130 },
            { id: 2, emoji: "📝", label: "Documented", angle: 150, radius: 130 },
            { id: 3, emoji: "🔍", label: "Traceable", angle: 270, radius: 130 },
            { id: 4, emoji: "🔒", label: "Secure", angle: 60, radius: 170 },
            { id: 5, emoji: "🧪", label: "Tested", angle: 180, radius: 170 },
            { id: 6, emoji: "🤖", label: "Automated", angle: 300, radius: 170 },
          ].map((badge, index) => {
            // Calculate position based on angle and radius
            const x = Math.cos(badge.angle * (Math.PI / 180)) * badge.radius;
            const y = Math.sin(badge.angle * (Math.PI / 180)) * badge.radius;
            
            return (
              <motion.div
                key={badge.id}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ marginTop: y, marginLeft: x }}
                initial="hidden"
                animate={["visible", "idle"]}
                variants={{
                  ...badgeVariants,
                  idle: orbitVariants.idle(index)
                }}
                custom={index}
              >
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md px-3 py-2 rounded-lg border border-purple-500/20 shadow-lg flex items-center gap-2">
                  <span>{badge.emoji}</span>
                  <span className="text-xs font-medium text-gray-300">{badge.label}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection; 