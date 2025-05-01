import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer_legacy';
import ScrollToTop from '../../components/ScrollToTop';
import SolarSystemLayout from '../../components/SolarSystemLayout';

// Product data for mobile view
const productData = [
  { icon: "⚛️", title: "Aegis", path: "/products/aegis", description: "Core Runtime Engine" },
  { icon: "🛠️", title: "OpsPipe", path: "/products/opspipe", description: "Operational Automation" },
  { icon: "🚀", title: "MoonSignal", path: "/products/moonsignal", description: "Analytics & Insights" },
  { icon: "🛡️", title: "Guardian", path: "/products/guardian", description: "Security & Monitoring" },
  { icon: "🧠", title: "Curious", path: "/products/curious", description: "Intelligent Exploration" }
];

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
        {/* Solar System Section - Only visible on large screens */}
        <section id="solar-system" className="relative py-20 sm:py-28 px-4 sm:px-8 hidden lg:block">
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
        
        {/* Mobile Fallback - Only visible on small/medium screens */}
        <section className="lg:hidden block py-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Our Products</h2>
            <p className="text-base text-gray-400 mt-4 max-w-md mx-auto">
              Discover our suite of integrated products powered by the Aegis runtime core.
            </p>
          </div>
          
          {/* Aegis Feature Card */}
          <motion.div
            className="mx-auto max-w-sm mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-gradient-to-br from-yellow-600/30 to-orange-700/30 p-6 rounded-xl border border-yellow-500/30 flex flex-col items-center justify-center">
              <div className="text-4xl mb-2">⚛️</div>
              <h3 className="text-xl font-bold text-white">Aegis</h3>
              <p className="text-sm text-white/70 text-center mt-1 mb-3">Core Runtime Engine</p>
              <Link to="/products/aegis" className="mt-2 text-sm bg-yellow-600/50 text-white px-4 py-1 rounded-full hover:bg-yellow-600/70 transition-all">
                Explore Aegis
              </Link>
            </div>
          </motion.div>
          
          {/* Other Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {productData.slice(1).map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link to={product.path} className="bg-[#1A1A30]/70 p-5 rounded-xl border border-purple-500/20 flex flex-col hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
                  <div className="text-2xl mb-2">{product.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{product.title}</h3>
                  <p className="text-xs text-gray-400 mb-3">{product.description}</p>
                  <p className="text-xs text-purple-400 mt-auto">Explore →</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Space divider with nebula effect before CTA */}
        <div className="relative mt-24 mb-16">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
          <motion.div 
            className="absolute inset-x-0 h-8 -mt-4"
            style={{ 
              background: "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(30, 27, 75, 0.01) 70%)" 
            }}
            animate={{ 
              opacity: [0.5, 0.8, 0.5] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          />
        </div>
        
        {/* Enhanced CTA Section with Box */}
        <div className="pt-8 pb-20 sm:pb-32">
          <motion.div 
            className="max-w-2xl mx-auto bg-[#1E1A42] border border-purple-600/30 rounded-xl p-6 shadow-lg shadow-purple-900/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-white tracking-wider uppercase text-center"
              style={{ letterSpacing: '0.05em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Want to build like this?
            </motion.h2>
            <motion.p 
              className="max-w-xl mx-auto text-base sm:text-lg text-gray-300 mt-3 mb-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Our platform makes engineering excellence accessible to everyone
            </motion.p>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link to="/contact" className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full inline-flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
                Contact our team
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
} 