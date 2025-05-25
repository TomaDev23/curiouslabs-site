import { metrics } from "../../../../data/metrics";
import { motion, useReducedMotion } from "framer-motion";
import { useBreakpoint } from "../../../hooks/useBreakpoint.js";

export default function LegacyFeaturedProjects() {
  const prefersReducedMotion = useReducedMotion();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  return (
    <section id="featured-projects" className="relative py-24 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900 overflow-hidden border-8 border-purple-600">
      {/* Standardized nebula positioning - one top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-curious-purple-600/20 via-curious-blue-400/10 to-transparent rounded-full filter blur-sm md:blur-[80px] opacity-20 md:opacity-30"></div>
      
      {/* Standardized nebula positioning - one bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-curious-blue-600/20 via-curious-purple-400/10 to-transparent rounded-full filter blur-sm md:blur-[80px] opacity-20 md:opacity-30"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Featured Projects
        </h2>
        
        <p className="text-lg md:text-xl text-purple-300 font-medium text-center max-w-3xl mx-auto mb-10">
          Discover our latest innovations and client success stories.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: "easeOut", 
                delay: prefersReducedMotion ? 0 : (isMobile ? index * 0.05 : index * 0.1) 
              }}
              whileHover={{ y: -10 }}
              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            >
              <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-xl overflow-hidden relative h-full">
                {/* Glow layer */}
                <div className="absolute inset-0 -z-10 bg-curious-blue-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="p-6">
                  <div className="text-4xl font-bold tracking-tight mb-3 relative">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-300 to-curious-blue-300">
                      {metric.value}
                    </span>
                  </div>
                  
                  <div className="text-gray-300 text-sm font-medium uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Subtle bottom accent line */}
        <div className="max-w-xs mx-auto mt-16 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-700/30 to-transparent"></div>
      </div>
    </section>
  );
} 