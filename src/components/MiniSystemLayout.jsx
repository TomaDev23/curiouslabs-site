import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

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

// Enhanced comet component with colored trails
const MiniComet = ({ delay, angle, duration, pathIndex }) => {
  const sizeClass = "w-16 h-0.5";
  const path = cometPaths[pathIndex % cometPaths.length];
  
  // Enhanced colors for comets
  const colors = [
    "bg-gradient-to-r from-white/0 via-white/40 to-white/80",
    "bg-gradient-to-r from-blue-400/0 via-blue-400/40 to-blue-400/80",
    "bg-gradient-to-r from-purple-400/0 via-purple-400/40 to-purple-400/80"
  ];
  
  const colorClass = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        transformOrigin: "center center",
        transform: `rotate(${angle}deg)`,
        left: '52%',
        top: '45%',
        zIndex: 5
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.8, 0],
        scale: [0.2, 1, 0.2],
        x: path.x,
        y: path.y
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 15,
        ease: "easeInOut"
      }}
    >
      <div className={`${sizeClass} ${colorClass} rounded-full blur-sm`} />
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
  const radius = 140; // Smaller radius for compact display
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { scrollY } = useScroll();
  
  // Improved transform values for smoother scroll-based animation
  // Start invisible, then fade-in gradually while expanding from 80% to 100% size
  const opacity = useTransform(scrollY, [50, 200, 300], [0, 0.7, 1]);
  const scale = useTransform(scrollY, [50, 200, 300], [0.9, 0.95, 1]);
  
  // Add subtle drift effect based on scroll
  const yOffset = useTransform(scrollY, [0, 500], [30, -30]);
  const xOffset = useTransform(scrollY, [0, 500], [-15, 15]);
  
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

  // Generate mini comets with staggered timing
  const comets = useMemo(() => [
    { delay: 5, angle: 30, duration: 3, pathIndex: 0 },
    { delay: 25, angle: 150, duration: 4, pathIndex: 1 },
    { delay: 45, angle: 270, duration: 3.5, pathIndex: 2 },
  ], []);

  return (
    <motion.div 
      className="relative w-full h-[600px] sm:h-[500px] md:h-[600px] overflow-visible"
      style={{ 
        opacity, 
        scale,
        y: yOffset,
        x: xOffset
      }}
    >
      {/* Full viewport cosmic background - extends beyond boundaries */}
      <div className="absolute inset-0 w-[150%] h-[150%] left-[-25%] top-[-25%] overflow-visible">
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

      {/* Enhanced background nebula effects */}
      <div className="absolute inset-0 w-[150%] h-[150%] left-[-25%] top-[-25%]" style={{ zIndex: 0 }}>
        {/* Base nebula glow - more colorful and vibrant */}
        <div className="absolute inset-0 w-full h-full opacity-50" 
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.15), transparent 70%), radial-gradient(circle at 70% 60%, rgba(244, 114, 182, 0.12), transparent 70%), radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1), transparent 70%)'
          }}
        />
        
        {/* Pulsating central nebula cloud */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(147, 51, 234, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)',
          }}
          animate={{ 
            scale: prefersReducedMotion ? 1 : [1, 1.05, 1],
            opacity: prefersReducedMotion ? 0.3 : [0.2, 0.35, 0.2],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        />
        
        {/* Additional cosmic dust layers with parallax effects */}
        <motion.div
          className="absolute inset-0 w-full h-full opacity-25"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(186, 230, 253, 0.15) 0%, transparent 70%), radial-gradient(ellipse at 70% 60%, rgba(216, 180, 254, 0.15) 0%, transparent 70%)'
          }}
          animate={{
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Orange-pink nebula for warm accents */}
        <motion.div
          className="absolute inset-0 w-full h-full opacity-15"
          style={{
            background: 'radial-gradient(ellipse at 20% 30%, rgba(254, 215, 170, 0.15) 0%, transparent 70%), radial-gradient(ellipse at 80% 70%, rgba(251, 113, 133, 0.15) 0%, transparent 70%)'
          }}
          animate={{
            scale: prefersReducedMotion ? 1 : [1.05, 1, 1.05]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 5
          }}
        />
        
        {/* Bottom gradient transition to blend with solutions section */}
        <div 
          className="absolute bottom-[-5%] left-0 w-full h-[30%]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(22, 33, 62, 0.3) 70%, rgba(22, 33, 62, 0.5) 100%)',
            zIndex: 2
          }}
        />
      </div>
      
      {/* Mini comets */}
      {!prefersReducedMotion && comets.map((comet, i) => (
        <MiniComet
          key={`comet-${i}`}
          delay={comet.delay}
          angle={comet.angle}
          duration={comet.duration}
          pathIndex={comet.pathIndex}
        />
      ))}
      
      {/* Background cosmic image */}
      <motion.div 
        className="absolute w-[100%] h-[110%] left-0 top-[-5%] overflow-hidden z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/earthscape-bg.jpg')",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.95) contrast(1.05)",
          isolation: "isolate"
        }}
      />
      
      {/* Top transition line with dynamic hue */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px] z-20 overflow-hidden pointer-events-none"
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
      
      {/* Bottom transition line with dynamic hue */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[2px] z-20 overflow-hidden pointer-events-none"
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
          ease: "linear",
          delay: 2
        }}
      />
      
      {/* Z-index hierarchy matching SolarSystemLayout */}
      
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
  );
} 