import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const orbitData = [
  { icon: "/assets/images/general/Page_Logos/OpsPipe_logo.webp", title: "OpsPipe", path: "/products/opspipe", angle: 0, adjustX: 100, adjustY: 20 },
  { icon: "/assets/images/general/Page_Logos/MoonSignal_logo.webp", title: "MoonSignal", path: "/products/moonsignal", angle: 90, adjustX: 20, adjustY: 100 },
  { icon: "/assets/images/general/Page_Logos/Guardian_logo.webp", title: "Guardian", path: "/products/guardian", angle: 180, adjustX: -20, adjustY: 0 },
  { icon: "/assets/images/general/Page_Logos/Curious_logo.webp", title: "Curious", path: "/products/curious", angle: 270, adjustX: 0, adjustY: 30 },
];

// Comet paths for more variety
const cometPaths = [
  // Default diagonal path
  { x: [-500, 500], y: [-500, 500] },
  // Left to right
  { x: [-500, 500], y: [-100, 100] },
  // Right to left 
  { x: [500, -500], y: [100, -100] },
  // Top to bottom
  { x: [0, 0], y: [-500, 500] },
  // Bottom to top with arc
  { x: [0, 200, 0], y: [500, 250, -500] },
  // Arc from left to right
  { x: [-500, 0, 500], y: [0, -300, 0] },
  // Curved path bottom right to top left
  { x: [500, 0, -500], y: [500, 0, -500] }
];

// Comet component for dynamic visual elements
const Comet = ({ delay, angle, duration, size = "md", pathIndex }) => {
  const [prefersReducedMotion] = useState(
    typeof window !== "undefined" 
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
      : false
  );
  
  // Skip animation if reduced motion is preferred
  if (prefersReducedMotion) return null;
  
  const sizeClasses = {
    sm: "w-12 h-1",
    md: "w-24 h-1.5",
    lg: "w-36 h-2"
  };
  
  const path = cometPaths[pathIndex];
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        transformOrigin: "center center",
        transform: `rotate(${angle}deg)`,
        left: '52%',
        top: '48%',
        zIndex: 5
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0.2, 1.5, 0.2],
        x: path.x,
        y: path.y
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 10, // Doubled from 5 to 10 to reduce frequency
        ease: "easeInOut"
      }}
    >
      <div className={`${sizeClasses[size]} bg-gradient-to-r from-white/0 via-white/50 to-white/90 rounded-full blur-sm`} />
    </motion.div>
  );
};

// Product card color mapping for unique identity
const productColors = {
  "OpsPipe": "from-blue-500/20 to-blue-600/5 hover:border-blue-400/40 hover:shadow-blue-500/10",
  "MoonSignal": "from-purple-500/20 to-purple-600/5 hover:border-purple-400/40 hover:shadow-purple-500/10",
  "Guardian": "from-red-500/20 to-red-600/5 hover:border-red-400/40 hover:shadow-red-500/10",
  "Curious": "from-green-500/20 to-green-600/5 hover:border-green-400/40 hover:shadow-green-500/10"
};

export default function SolarSystemLayout() {
  const radius = 220; // adjust as needed
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Add listener for changes
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Generate random comet configurations that will remain stable between renders
  const comets = useMemo(() => [
    { delay: 2, angle: 45, duration: 4, size: "md", pathIndex: 0 },
    { delay: 20, angle: 135, duration: 5, size: "lg", pathIndex: 5 },
    { delay: 45, angle: 225, duration: 3.5, size: "sm", pathIndex: 3 },
    { delay: 70, angle: 315, duration: 6, size: "md", pathIndex: 6 }
  ], []);

  return (
    <div className="relative w-full h-[700px] sm:h-[700px] overflow-visible">
      {/* Full viewport nebula background - extends beyond component boundaries */}
      <div className="absolute inset-0 w-full h-[350%]" style={{ zIndex: 0 }}>
        {/* Moon-like nebula effect */}
        <div className="absolute inset-0 w-full h-full bg-gradient-radial from-purple-900/10 via-purple-800/5 to-transparent opacity-40" />
        
        {/* Upper nebula cloud with purple hue */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-[150%] opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(147, 51, 234, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
          }}
          animate={{ 
            scale: prefersReducedMotion ? 1 : [1, 1.05, 1],
            opacity: prefersReducedMotion ? 0.3 : [0.25, 0.35, 0.25],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        />
        
        {/* Lower nebula cloud that extends to the bottom - ensures no cut off */}
        <motion.div 
          className="absolute top-[30%] left-0 w-full h-[200%] opacity-20" 
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(192, 132, 252, 0.15) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 75%)',
          }}
          animate={{ 
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
            opacity: prefersReducedMotion ? 0.2 : [0.15, 0.25, 0.15],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut",
            delay: 5 
          }}
        />

        {/* Additional moon-like glow at the bottom */}
        <motion.div 
          className="absolute top-[60%] left-0 w-full h-[200%] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(216, 180, 254, 0.15) 0%, rgba(192, 132, 252, 0.05) 40%, transparent 70%)',
          }}
          animate={{ 
            scale: prefersReducedMotion ? 1 : [1, 1.08, 1],
            opacity: prefersReducedMotion ? 0.3 : [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut",
            delay: 2 
          }}
        />
        
        {/* Direct connection to CTA purple line - solid gradient that seamlessly transitions */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[30%]"
          style={{
            background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.01) 0%, rgba(139, 92, 246, 0.07) 85%, rgba(139, 92, 246, 0.15) 100%)',
            zIndex: 2
          }}
        />
      </div>
      
      {/* Z-index hierarchy:
        - Background nebula: z-0
        - Background stars/parallax: z-1
        - Comets/trails: z-5
        - Orbital rings: z-10
        - Aegis glow ring: z-20
        - Product nodes: z-30
        - Aegis core: z-40
      */}
      
      {/* Desktop layout with orbital positions */}
      <div className="hidden lg:block relative h-full">
        {/* Deepest background star layer - slowest movement */}
        <motion.div 
          className="absolute inset-0 h-[160%] z-1 opacity-40"
          style={{
            backgroundImage: "url(/images/placeholders/stars-layer-1.svg)",
            backgroundSize: "cover"
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.4,
            backgroundPosition: prefersReducedMotion ? "0% 0%" : ["0% 0%", "1% 1%"]
          }}
          transition={{ 
            opacity: { duration: 2 },
            backgroundPosition: { 
              duration: 180, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "linear" 
            }
          }}
        />
        
        {/* Middle star layer - medium movement */}
        <motion.div 
          className="absolute inset-0 h-[160%] z-1 opacity-50"
          style={{
            backgroundImage: "url(/images/placeholders/stars-layer-2.svg)",
            backgroundSize: "cover"
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.5,
            backgroundPosition: prefersReducedMotion ? "0% 0%" : ["0% 0%", "2% 2%"]
          }}
          transition={{ 
            opacity: { duration: 2 },
            backgroundPosition: { 
              duration: 120, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "linear" 
            }
          }}
        />
        
        {/* Foreground star layer - faster movement */}
        <motion.div 
          className="absolute inset-0 h-[160%] z-1 opacity-30"
          style={{
            backgroundImage: "url(/images/placeholders/stars-layer-3.svg)",
            backgroundSize: "cover"
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.3,
            backgroundPosition: prefersReducedMotion ? "0% 0%" : ["0% 0%", "3% 3%"]
          }}
          transition={{ 
            opacity: { duration: 2 },
            backgroundPosition: { 
              duration: 90, 
              repeat: Infinity, 
              repeatType: "reverse", 
              ease: "linear" 
            }
          }}
        />
        
        {/* Comet trails - dynamic elements with randomization */}
        {!prefersReducedMotion && (
          <>
            {comets.map((comet, index) => (
              <Comet 
                key={index}
                delay={comet.delay} 
                angle={comet.angle} 
                duration={comet.duration} 
                size={comet.size} 
                pathIndex={comet.pathIndex}
              />
            ))}
          </>
        )}
        
        {/* Animated orbit rings with rotation - adjusted to match asymmetric layout */}
        <motion.div 
          className="absolute left-[52%] top-[48%] w-[30rem] h-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-purple-700/30 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            rotate: prefersReducedMotion ? 0 : 360
          }}
          transition={{ 
            opacity: { duration: 1 }, 
            rotate: { 
              duration: 45, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 0 
            } 
          }}
        />
        
        {/* Additional inner ring for effect - adjusted to match asymmetric layout */}
        <motion.div 
          className="absolute left-[52%] top-[48%] w-[28rem] h-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-purple-700/20 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            rotate: prefersReducedMotion ? 0 : -360 
          }}
          transition={{ 
            opacity: { duration: 1 }, 
            rotate: { 
              duration: 60, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 0 
            } 
          }}
        />

        {/* Aegis Glow Ring - adds deeper visual atmosphere */}
        <motion.div
          className="absolute left-[52%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-orange-500/10 blur-xl z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.4 : [0.3, 0.6, 0.3],
            scale: prefersReducedMotion ? 1 : [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        {/* Aegis Core with enhanced pulsing animation */}
        <motion.div
          className="absolute left-[52%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full shadow-xl flex flex-col items-center justify-center z-40"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            boxShadow: prefersReducedMotion ? 
              "0 0 40px 15px rgba(252, 211, 77, 0.1)" :
              ["0 0 0 0 rgba(252, 211, 77, 0.2)", "0 0 40px 25px rgba(252, 211, 77, 0.1)", "0 0 0 0 rgba(252, 211, 77, 0.2)"]
          }}
          transition={{ 
            duration: 2,
            boxShadow: { 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse" 
            }
          }}
        >
          <motion.div 
            className="w-12 h-12 flex items-center justify-center"
            animate={{ 
              opacity: prefersReducedMotion ? 1 : [1, 0.8, 1] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity 
            }}
          >
            <img 
              src="/assets/images/general/Page_Logos/Aegis_logo.webp" 
              alt="Aegis Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          <h3 className="font-bold text-xl text-white tracking-wider uppercase">Aegis</h3>
          <p className="text-sm text-white/70">Core Runtime</p>
          <Link to="/products/aegis" className="mt-2 text-xs text-white/90 bg-black/30 px-3 py-1 rounded-full hover:bg-black/50 transition-all">
            Explore
          </Link>
        </motion.div>

        {/* Orbiting Satellites with enhanced styling and staggered entry */}
        <div className="absolute inset-0">
          {orbitData.map(({ icon, title, path, angle, adjustX, adjustY }, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = radius * Math.cos(rad) + adjustX;
            const y = radius * Math.sin(rad) + adjustY;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  delay: 0.5 + (i * 0.2), // Staggered entry
                  duration: 1.5
                }}
                style={{
                  position: 'absolute',
                  left: '52%',
                  top: '48%',
                  width: '170px', // Slightly larger
                  height: '170px', // Slightly larger
                  marginLeft: '-85px',
                  marginTop: '-85px',
                  zIndex: 30,
                  transform: `translate(${x}px, ${y}px)`
                }}
              >
                <Link
                  to={path}
                  className={`w-full h-full p-3 rounded-xl bg-gradient-to-br ${productColors[title]} border border-purple-400/20 backdrop-blur-md flex flex-col items-start justify-between transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <motion.div 
                    className="text-xl mb-1.5"
                    animate={{ 
                      y: prefersReducedMotion ? 0 : [0, -5, 0] 
                    }}
                    transition={{ 
                      duration: 3 + i, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <img src={icon} alt={title} className="w-16 h-16" />
                  </motion.div>
                  <h3 className="text-base font-semibold text-white tracking-wider uppercase">{title}</h3>
                  <p className="text-xs text-gray-400 mt-auto">Explore →</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile fallback view with enhanced styling */}
      <motion.div 
        className="lg:hidden space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="mx-auto max-w-sm px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Enhanced Aegis card with improved glow effect */}
          <motion.div 
            className="bg-gradient-to-br from-yellow-600/30 to-orange-700/30 p-6 rounded-xl border border-yellow-500/30 flex flex-col items-center justify-center mb-8"
            animate={{ 
              boxShadow: prefersReducedMotion ?
                "0 0 20px 10px rgba(252, 211, 77, 0.1)" :
                ["0 0 0 0 rgba(252, 211, 77, 0.2)", "0 0 40px 25px rgba(252, 211, 77, 0.1)", "0 0 0 0 rgba(252, 211, 77, 0.2)"]
            }}
            transition={{ 
              boxShadow: { 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" 
              }
            }}
          >
            <motion.div 
              className="w-12 h-12 mx-auto mb-2 flex items-center justify-center" 
              animate={{ 
                opacity: prefersReducedMotion ? 1 : [1, 0.8, 1] 
              }} 
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              <img 
                src="/assets/images/general/Page_Logos/Aegis_logo.webp" 
                alt="Aegis Logo" 
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h3 className="text-lg font-bold text-white tracking-wider uppercase">Aegis</h3>
            <p className="text-sm text-white/70 text-center mt-1 mb-3">Core Runtime Engine</p>
            <Link to="/products/aegis" className="mt-2 text-sm bg-yellow-600/50 text-white px-4 py-1 rounded-full hover:bg-yellow-600/70 transition-all">
              Explore Aegis
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Enhanced product cards with color theming and improved animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {orbitData.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link 
                to={product.path} 
                className={`bg-gradient-to-br ${productColors[product.title]} p-5 rounded-xl border border-purple-500/20 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg`}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  animate={{ 
                    y: prefersReducedMotion ? 0 : [0, -3, 0] 
                  }}
                  transition={{ 
                    duration: 2 + index, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <img src={product.icon} alt={product.title} className="w-16 h-16" />
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2 tracking-wider uppercase">{product.title}</h3>
                <p className="text-xs text-purple-400 mt-auto">
                  Explore →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-8 px-4">
          <p>View on larger screens to see our orbital universe!</p>
        </div>
      </motion.div>
      
      {/* Space divider that ensures connection to CTA section */}
      <div className="h-24"></div>
    </div>
  );
} 