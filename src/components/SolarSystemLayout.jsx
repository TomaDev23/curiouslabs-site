import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const orbitData = [
  { icon: "🛠️", title: "OpsPipe", path: "/products/opspipe", angle: 0, adjustX: 100, adjustY: 20 },
  { icon: "🚀", title: "MoonSignal", path: "/products/moonsignal", angle: 90, adjustX: 20, adjustY: 100 },
  { icon: "🛡️", title: "Guardian", path: "/products/guardian", angle: 180, adjustX: -20, adjustY: 0 },
  { icon: "🧠", title: "Curious", path: "/products/curious", angle: 270, adjustX: 0, adjustY: 30 },
];

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

  return (
    <div className="relative w-full h-[600px] sm:h-[700px]">
      {/* Z-index hierarchy:
        - Background stars/parallax: z-0
        - Orbital rings: z-10
        - Product nodes: z-20
        - Aegis core: z-30
      */}
      
      {/* Desktop layout with orbital positions */}
      <div className="hidden lg:block relative h-full">
        {/* Parallax star background with subtle motion */}
        <motion.div 
          className="absolute inset-0 bg-star-field opacity-30 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ 
            duration: prefersReducedMotion ? 0 : 1.5 
          }}
        />

        {/* Additional stars SVG background with parallax effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(/images/stars.svg)",
            backgroundSize: "cover",
            filter: "blur(1px)"
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.6,
            backgroundPosition: prefersReducedMotion ? "0% 0%" : ["0% 0%", "3% 3%"]
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

        {/* Aegis Core with pulsing animation - kept in current position (off-center) */}
        <motion.div
          className="absolute left-[52%] top-[48%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full shadow-xl flex flex-col items-center justify-center z-30"
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
            className="text-4xl"
            animate={{ 
              opacity: prefersReducedMotion ? 1 : [1, 0.8, 1] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity 
            }}
          >
            ⚛️
          </motion.div>
          <h3 className="font-bold text-xl text-white">Aegis</h3>
          <p className="text-sm text-white/70">Core Runtime</p>
          <Link to="/products/aegis" className="mt-2 text-xs text-white/90 bg-black/30 px-3 py-1 rounded-full hover:bg-black/50 transition-all">
            Explore
          </Link>
        </motion.div>

        {/* Orbiting Satellites with staggered entry animation - adjusted to work with asymmetric Aegis position */}
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
                  width: '160px',
                  height: '160px',
                  marginLeft: '-80px',
                  marginTop: '-80px',
                  zIndex: 20,
                  transform: `translate(${x}px, ${y}px)`
                }}
              >
                <Link
                  to={path}
                  className="w-full h-full p-4 rounded-xl bg-[#1A1A30]/70 border border-purple-400/20 hover:border-purple-400 backdrop-blur-md flex flex-col items-start justify-between hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                >
                  <motion.div 
                    className="text-2xl mb-2"
                    animate={{ 
                      y: prefersReducedMotion ? 0 : [0, -5, 0] 
                    }}
                    transition={{ 
                      duration: 3 + i, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="text-xs text-gray-400 mt-auto">Explore →</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile fallback view with scroll animations */}
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
          {/* Aegis card with glow effect */}
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
              className="text-4xl mb-2" 
              animate={{ 
                opacity: prefersReducedMotion ? 1 : [1, 0.8, 1] 
              }} 
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              ⚛️
            </motion.div>
            <h3 className="text-xl font-bold text-white">Aegis</h3>
            <p className="text-sm text-white/70 text-center mt-1 mb-3">Core Runtime Engine</p>
            <Link to="/products/aegis" className="mt-2 text-sm bg-yellow-600/50 text-white px-4 py-1 rounded-full hover:bg-yellow-600/70 transition-all">
              Explore Aegis
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Product cards with staggered entry and scroll animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {orbitData.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link to={product.path} className="bg-[#1A1A30]/70 p-5 rounded-xl border border-purple-500/20 flex flex-col hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
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
                  {product.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-white mb-2">{product.title}</h3>
                <p className="text-xs text-purple-400 mt-auto">
                  Explore →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center text-sm text-gray-400 mt-8 px-4">
          <p>View on larger screens to see our orbital layout!</p>
        </div>
      </motion.div>
    </div>
  );
} 