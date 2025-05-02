import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useAnimationControls } from "framer-motion";

// Mini orbit configuration (compact)
const orbitData = [
  // Core products - inner orbit
  { icon: "🛠️", title: "OpsPipe", path: "/products/opspipe", angle: 0, adjustX: 60, adjustY: 10, size: "sm" },
  { icon: "🚀", title: "MoonSignal", path: "/products/moonsignal", angle: 90, adjustX: 10, adjustY: 60, size: "sm" },
  { icon: "🛡️", title: "Guardian", path: "/products/guardian", angle: 180, adjustX: -20, adjustY: 0, size: "sm" },
  { icon: "🧠", title: "Curious", path: "/products/curious", angle: 270, adjustX: 0, adjustY: 20, size: "sm" },
  
  // New orbitals - outer orbit
  { icon: "☁️", title: "SaaS", path: "/products", angle: 45, adjustX: 85, adjustY: 70, size: "xs" },
  { icon: "🏷️", title: "WhiteLabel", path: "/products", angle: 135, adjustX: 60, adjustY: 90, size: "xs" },
  { icon: "🤖", title: "AI Edge", path: "/products", angle: 225, adjustX: -60, adjustY: 30, size: "xs" },
  { icon: "🔬", title: "Labs", path: "/products", angle: 315, adjustX: 20, adjustY: -50, size: "xs" },
];

// Enhanced comet paths for more variety
const cometPaths = [
  // Diagonal paths
  { x: [-300, 300], y: [-300, 300] },
  { x: [300, -300], y: [-300, 300] },
  // Arcs
  { x: [-300, 0, 300], y: [0, -150, 0] },
  { x: [300, 0, -300], y: [0, 150, 0] },
];

// MiniComet with improved curved paths
const MiniComet = ({ delay, angle, duration, pathIndex }) => {
  const paths = [
    { // Curved path option 1
      start: { x: -10, y: -10 },
      end: { x: window.innerWidth + 10, y: window.innerHeight + 10 },
      control: { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 }
    },
    { // Curved path option 2
      start: { x: window.innerWidth + 10, y: -10 },
      end: { x: -10, y: window.innerHeight + 10 },
      control: { x: window.innerWidth * 0.3, y: window.innerHeight * 0.3 }
    },
    { // Shallow arc path
      start: { x: -10, y: window.innerHeight * 0.4 },
      end: { x: window.innerWidth + 10, y: window.innerHeight * 0.6 },
      control: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 }
    }
  ];

  const path = paths[pathIndex % paths.length];
  const rad = (angle * Math.PI) / 180;
  
  // Calculate position based on curved path
  const x = useTransform(
    useMotionValue(0),
    [0, 1],
    [path.start.x, path.end.x]
  );
  
  const y = useTransform(
    useMotionValue(0),
    [0, 1],
    [path.start.y, path.end.y]
  );

  const controls = useAnimationControls();
  
  useEffect(() => {
    const startAnimation = async () => {
      await new Promise(resolve => setTimeout(resolve, delay * 1000));
      
      controls.start({
        x: [path.start.x, path.control.x, path.end.x],
        y: [path.start.y, path.control.y, path.end.y],
        transition: {
          duration: duration,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      });
    };
    
    startAnimation();
    
    const interval = setInterval(startAnimation, (duration + delay) * 1000);
    return () => clearInterval(interval);
  }, [controls, delay, duration, path]);
  
  return (
    <motion.div
      className="absolute top-0 left-0 w-2 h-2 z-20"
      style={{ x, y }}
      animate={controls}
    >
      <motion.div 
        className="w-2 h-2 rounded-full bg-white/90"
        animate={{
          boxShadow: [
            "0 0 2px 1px rgba(255, 255, 255, 0.5), 0 0 4px 2px rgba(200, 200, 255, 0.3)",
            "0 0 3px 2px rgba(255, 255, 255, 0.6), 0 0 6px 3px rgba(200, 200, 255, 0.4)",
            "0 0 2px 1px rgba(255, 255, 255, 0.5), 0 0 4px 2px rgba(200, 200, 255, 0.3)"
          ]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Comet tail */}
      <motion.div
        className="absolute top-1/2 right-1/2 w-12 h-[1.5px] origin-right"
        style={{
          background: "linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent)",
          transform: `rotate(${angle + 180}deg)`,
          transformOrigin: "right center"
        }}
      />
    </motion.div>
  );
};

// Enhanced color palette with deeper, more vibrant colors
const productColors = {
  "OpsPipe": "from-blue-500/40 to-blue-700/20",
  "MoonSignal": "from-purple-500/40 to-purple-700/20",
  "Guardian": "from-red-500/40 to-red-700/20",
  "Curious": "from-green-500/40 to-green-600/20",
  "SaaS": "from-cyan-400/40 to-cyan-600/20",
  "WhiteLabel": "from-pink-400/40 to-pink-600/20",
  "AI Edge": "from-amber-400/40 to-amber-600/20",
  "Labs": "from-teal-400/40 to-teal-600/20",
};

export default function MiniSystemLayout() {
  const radius = 200; // Increased from 140 for better spacing
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollY } = useScroll();
  
  // Improved transform values for smoother scroll-based animation
  // Start invisible, then fade-in gradually while expanding from 80% to 100% size
  const opacity = useTransform(scrollY, [50, 200, 300], [0, 0.7, 1]);
  const scale = useTransform(scrollY, [50, 200, 300], [0.9, 0.95, 1]);
  
  // Add subtle drift effect based on scroll
  const yOffset = useTransform(scrollY, [0, 500], [30, -30]);
  const xOffset = useTransform(scrollY, [0, 500], [-15, 15]);
  
  // Earth reveal on scroll
  const earthOpacity = useTransform(scrollY, [100, 250], [0, 1]);
  const earthYOffset = useTransform(scrollY, [100, 300], [50, 0]);
  
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

  // Generate mini comets with staggered timing and constrained angles - reduced by 50%
  const comets = useMemo(() => [
    { delay: 5, angle: 30, duration: 3, pathIndex: 0 },
    { delay: 45, angle: 155, duration: 4.2, pathIndex: 1 },
  ], []);

  return (
    <div className="relative">
      {/* Top transition line with dynamic hue - positioned at section top border */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] z-50 overflow-hidden pointer-events-none"
        style={{
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)"
        }}
        animate={{
          background: [
            "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)",
            "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.8) 50%, transparent 100%)",
            "linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.8) 50%, transparent 100%)",
            "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)"
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="relative w-full h-[800px] sm:h-[700px] md:h-[800px] overflow-visible"
        style={{ 
          opacity: 1,
          scale: 1
        }}
      >
        {/* Cleaned up cosmic background - contained within proper bounds */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full opacity-60"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 1px, transparent 1px), radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "120px 120px, 90px 90px"
            }}
            animate={{
              backgroundPosition: prefersReducedMotion ? "0% 0%" : ["0% 0%", "5% 5%"]
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Cleaned up nebula effects - contained properly */}
        <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
          {/* Base nebula glow - more colorful and vibrant */}
          <div className="absolute inset-0 w-full h-full opacity-50" 
            style={{
              background: 'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.15), transparent 70%), radial-gradient(circle at 70% 60%, rgba(244, 114, 182, 0.12), transparent 70%), radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1), transparent 70%)'
            }}
          />
          
          {/* Removed other nebula effects to clean up appearance */}
        </div>
        
        {/* Earth image - FULL SIZE, perfectly centered */}
        <motion.img 
          src="/images/earthscape-bg.jpg"
          className="absolute object-cover z-30 pointer-events-none select-none"
          style={{
            filter: 'brightness(1.05) saturate(1.2)',
            width: '150%',
            height: '150%', 
            left: '50%',
            top: '75%',
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
        
        {/* Mini comets with updated angle constraints */}
        {!prefersReducedMotion && comets.map((comet, i) => (
          <MiniComet
            key={`comet-${i}`}
            delay={comet.delay}
            angle={comet.angle}
            duration={comet.duration}
            pathIndex={comet.pathIndex}
          />
        ))}
        
        {/* Orbit visualization - only visible on larger screens */}
        <div className="hidden lg:block relative h-full">
          {/* Animated star backdrop - enhanced with CSS-based stars */}
          <motion.div 
            className="absolute inset-0 z-1 opacity-60"
            style={{
              background: 'radial-gradient(1px circle at 20% 40%, white, transparent), radial-gradient(1px circle at 40% 20%, white, transparent), radial-gradient(2px circle at 60% 30%, white, transparent), radial-gradient(1px circle at 70% 60%, white, transparent), radial-gradient(1px circle at 30% 80%, white, transparent), radial-gradient(1px circle at 80% 90%, white, transparent)',
              backgroundSize: '200px 200px'
            }}
            animate={{ 
              backgroundPosition: prefersReducedMotion ? "0% 0%" : ["0% 0%", "5% 5%"]
            }}
            transition={{ 
              duration: 120, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "linear" 
            }}
          />
          
          {/* Enhanced orbital rings with better colors */}
          <svg 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
            viewBox="0 0 500 500" 
            style={{ zIndex: 10 }}
          >
            {/* Inner orbit ring - enhanced purple color */}
            <motion.circle
              cx="250"
              cy="250" 
              r={radius + 20}
              fill="none"
              stroke="rgba(139, 92, 246, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="1,3"
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: prefersReducedMotion ? 0 : 360 
              }}
              transition={{ 
                duration: 180, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            {/* Outer orbit ring - enhanced cyan color */}
            <motion.circle
              cx="250"
              cy="250" 
              r={radius + 70}
              fill="none"
              stroke="rgba(56, 189, 248, 0.2)"
              strokeWidth="1"
              strokeDasharray="1,5"
              initial={{ rotate: 0 }}
              animate={{ 
                rotate: prefersReducedMotion ? 0 : -360 
              }}
              transition={{ 
                duration: 240, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          </svg>
          
          {/* Aegis glow effect - enhanced warm glow */}
          <motion.div
            className="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-full w-32 h-32 rounded-full bg-gradient-radial from-orange-500/20 to-amber-500/5 blur-xl z-20"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.4, 0.7, 0.4],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          
          {/* Aegis core - enhanced with better gradients */}
          <Link
            to="/products/aegis"
            className="absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-full z-40"
          >
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-yellow-500/40 to-orange-600/30 flex items-center justify-center rounded-full border border-yellow-500/30 shadow-lg shadow-orange-500/30 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              animate={{ 
                boxShadow: prefersReducedMotion ? 
                  "0 0 15px rgba(234, 179, 8, 0.4)" : 
                  ["0 0 10px rgba(234, 179, 8, 0.3)", "0 0 25px rgba(234, 179, 8, 0.5)", "0 0 10px rgba(234, 179, 8, 0.3)"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <span className="text-3xl">⚛️</span>
            </motion.div>
          </Link>
          
          {/* Orbital products - original layout with enhanced colors */}
          {orbitData.map((item, i) => {
            // Calculate orbital position
            const angle = item.angle * (Math.PI / 180);
            const orbitRadius = item.size === "xs" ? radius + 70 : radius + 20; // Outer radius for new orbitals
            
            // Base position on the orbit
            const x = Math.cos(angle) * orbitRadius;
            const y = Math.sin(angle) * orbitRadius;
            
            // Apply adjustments for visual balance (left-heavy bias)
            const adjustedX = x + (item.adjustX || 0);
            const adjustedY = y + (item.adjustY || 0);
            
            // Size classes based on importance
            const sizeClasses = {
              xs: "w-10 h-10 text-sm",
              sm: "w-12 h-12 text-base",
            };
            
            return (
              <Link 
                key={`orbit-${i}`}
                to={item.path}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                style={{
                  transform: `translate(calc(-50% + ${adjustedX}px), calc(-50% + ${adjustedY}px))`
                }}
              >
                <motion.div 
                  className={`${sizeClasses[item.size || "sm"]} bg-gradient-to-br ${productColors[item.title]} border border-purple-400/20 backdrop-blur-md flex items-center justify-center rounded-full shadow-md transition-all duration-300 hover:scale-110`}
                  animate={{ 
                    y: prefersReducedMotion ? 0 : [0, -5, 0] 
                  }}
                  transition={{ 
                    duration: 2 + i, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{
                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)"
                  }}
                >
                  <span>{item.icon}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
        
        {/* Mobile fallback - nebula background with centered Aegis */}
        <div className="lg:hidden block h-full relative">
          <div className="h-full flex items-center justify-center">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-br from-yellow-500/40 to-orange-600/30 flex items-center justify-center rounded-full shadow-lg shadow-orange-500/20"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: ["0 0 10px rgba(234, 179, 8, 0.3)", "0 0 20px rgba(234, 179, 8, 0.5)", "0 0 10px rgba(234, 179, 8, 0.3)"]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              <span className="text-2xl">⚛️</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Bottom transition line with dynamic hue */}
      <div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 999 }}>
        <motion.div 
          className="w-full h-[2px] overflow-hidden pointer-events-none"
          style={{
            boxShadow: "0 0 10px rgba(234, 179, 8, 0.3)"
          }}
          animate={{
            background: [
              "linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.8) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.8) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.8) 50%, transparent 100%)",
              "linear-gradient(90deg, transparent 0%, rgba(234, 179, 8, 0.8) 50%, transparent 100%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
} 