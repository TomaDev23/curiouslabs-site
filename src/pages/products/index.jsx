import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer_legacy';
import ScrollToTop from '../../components/ScrollToTop';
import SolarSystemLayout from '../../components/SolarSystemLayout';

export default function ProductsPortal() {
  // Reference to track mounting
  const mountedRef = useRef(false);
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
  
  // Ensure page always starts at the top when mounted
  useEffect(() => {
    if (!mountedRef.current) {
      // First render - ensure we're at the top
      window.scrollTo(0, 0);
      mountedRef.current = true;
    }
    
    return () => {
      // Clean up when unmounting
      mountedRef.current = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#141432] to-[#1A1A30] overflow-hidden">
      <NavBar />
      
      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6">
        {/* Solar System Section */}
        <section id="solar-system" className="relative py-20 sm:py-28 px-4 sm:px-8">
          {/* Star background layers with parallax */}
          <motion.div 
            className="absolute inset-0 bg-star-field opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
          />
          
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/images/stars.svg)",
              backgroundSize: "cover",
              filter: "blur(1px)"
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.4,
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
          
          <div className="text-center mb-16 relative z-10">
            <motion.h2 
              className="text-4xl sm:text-5xl font-extrabold text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Our Product Solar System
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Every CuriousLabs product orbits around Aegis — our runtime core.
            </motion.p>
          </div>
          
          <SolarSystemLayout />
        </section>
        
        {/* Optional CTA section */}
        <motion.section 
          className="max-w-xl mx-auto text-center mt-16 sm:mt-24 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-3">Ready to launch your project?</h3>
            <p className="text-gray-400 mb-6">Our interconnected products can be used individually or as a complete suite.</p>
            <Link to="/contact" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
              Contact Us
            </Link>
          </div>
        </motion.section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 