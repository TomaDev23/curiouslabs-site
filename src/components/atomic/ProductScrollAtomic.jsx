/**
 * @component ProductScrollAtomic
 * @description Self-contained horizontal product carousel with snap scrolling
 * @version 1.0.0
 * @type atomic
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Component metadata for LEGIT compliance
export const metadata = {
  id: 'product_scroll_atomic',
  scs: 'SCS-ATOMIC-VISUAL',
  type: 'atomic',
  doc: 'contract_product_scroll_atomic.md'
};

// Self-contained product data
const PRODUCTS = [
  {
    id: 'aegis',
    name: 'AEGIS Runtime',
    description: 'The powerful core that powers our entire ecosystem. Endless scenarios, Endless vectors.',
    color: '#84cc16', // lime
    features: [
      'Multi-agent architecture',
      'State of the art FSM',
      'Error handling with recovery',
      'Full audit trail and telemetry',
    ],
    href: '/products/aegis',
  },
  {
    id: 'opspipe',
    name: 'OpsPipe',
    description: 'AI-powered operations system with dynamic agent selection and capability-based scoring.',
    color: '#2563eb', // blue
    features: [
      'Office in your pocket',
      'Parse documents in a click',
      'Zero integration overhead',
      'Enterprise ready',
    ],
    href: '/products/opspipe',
  },
  {
    id: 'moonsignal',
    name: 'MoonSignal',
    description: 'Algotrading and signal machine with AI playbooks and advanced analysis capabilities.',
    color: '#7e22ce', // purple
    features: [
      'ML-powered trading signals',
      'AI trading psychology coach',
      'Real-time market analysis',
      'Portfolio optimization',
    ],
    href: '/products/moonsignal',
  },
  {
    id: 'guardian',
    name: 'Guardian',
    description: 'AI companion for businesses, powering staff solutions with intelligent responses and automation.',
    color: '#0d9488', // teal
    features: [
      'Enterprise-grade companion',
      'Custom knowledge integration',
      'Process automation',
      'Seamless team collaboration',
    ],
    href: '/products/guardian',
  },
];

// Helper function to adjust color brightness
const adjustColor = (color, amount) => {
  // Convert hex to RGB
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  
  // Adjust values
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));
  
  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// Feature bullet component
const FeatureBullet = ({ children, color, delay = 0 }) => {
  return (
    <motion.li
      className="flex items-start mb-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div 
        className="mt-1.5 mr-3 w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-gray-300">{children}</span>
    </motion.li>
  );
};

// Nebula effect component
const NebulaEffect = ({ color }) => {
  return (
    <div 
      className="absolute"
      style={{
        position: 'absolute',
        width: '150%',
        height: '150%',
        filter: 'blur(20px)',
        mixBlendMode: 'screen',
        transform: 'translate(-25%, -25%)',
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(ellipse at center, ${color}19 0%, ${color}0D 30%, rgba(0, 0, 0, 0) 70%)`
      }}
    ></div>
  );
};

const ProductScrollAtomic = () => {
  // Self-contained responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Refs
  const containerRef = useRef(null);
  
  // Handle responsive behavior and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkMotionPreference = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Listen for changes
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      }
    };
    
    // Initial checks
    checkMobile();
    checkMotionPreference();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const width = container.clientWidth;
      
      // Update current index based on scroll position
      const newIndex = Math.round(scrollPosition / width);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < PRODUCTS.length) {
        setCurrentIndex(newIndex);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);
  
  // Scroll to product programmatically
  const scrollToProduct = (index) => {
    const container = containerRef.current;
    if (!container) return;
    
    const targetPosition = container.clientWidth * index;
    
    if (prefersReducedMotion) {
      // Instant scroll for reduced motion preference
      container.scrollLeft = targetPosition;
    } else {
      // Smooth scroll animation
      container.scrollTo({
        left: targetPosition,
        behavior: 'smooth'
      });
    }
    
    setCurrentIndex(index);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.1 : 0.5,
        when: "beforeChildren",
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.5
      }
    }
  };
  
  return (
    <motion.section 
      id="products" 
      className="relative min-h-screen w-full overflow-hidden bg-curious-dark-900"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      variants={containerVariants}
      aria-label="Products showcase"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-curious-dark-900 via-curious-dark-950 to-black opacity-80"></div>
      
      {/* Section title */}
      <div className="relative z-10 pt-16 pb-8 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          variants={itemVariants}
        >
          Our Products
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto px-4"
          variants={itemVariants}
        >
          Powerful AI solutions designed for real-world challenges
        </motion.p>
      </div>
      
      {/* Horizontal scroll container with snap points */}
      <div 
        ref={containerRef}
        className="relative z-10 h-[70vh] flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none' }} // Hide scrollbar in Firefox
      >
        <style jsx>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Product sections */}
        {PRODUCTS.map((product, index) => (
          <div 
            key={product.id}
            className="flex-shrink-0 w-full h-full snap-center"
            id={`product-${product.id}`}
            style={{ 
              background: `linear-gradient(135deg, #0a0a0a 0%, rgba(20, 20, 30, 0.8) 100%)`
            }}
          >
            <div className="relative h-full w-full flex items-center justify-between p-8 md:p-16 lg:p-24">
              {/* Background nebula effect */}
              <NebulaEffect color={product.color} />
              
              {/* Content side */}
              <motion.div
                className={`relative z-10 ${isMobile ? 'w-full' : 'w-1/2'} flex flex-col ${isMobile ? 'items-center text-center' : 'items-start text-left'}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Product name */}
                <motion.h3 
                  className="text-3xl md:text-5xl font-bold mb-4"
                  style={{ 
                    color: product.color,
                    textShadow: `0 0 10px ${product.color}40`
                  }}
                >
                  {product.name}
                </motion.h3>
                
                {/* Product description */}
                <motion.p 
                  className="text-lg text-gray-300 mb-6 max-w-lg"
                >
                  {product.description}
                </motion.p>
                
                {/* Features list */}
                <ul className="mb-8">
                  {product.features.map((feature, i) => (
                    <FeatureBullet 
                      key={i} 
                      color={product.color}
                      delay={i * 0.1}
                    >
                      {feature}
                    </FeatureBullet>
                  ))}
                </ul>
                
                {/* CTA button */}
                <motion.a
                  href={product.href}
                  className="px-8 py-3 rounded-full font-medium text-white transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${product.color} 0%, ${adjustColor(product.color, -20)} 100%)`,
                    boxShadow: `0 4px 20px ${product.color}30`
                  }}
                  whileHover={{ 
                    boxShadow: `0 6px 25px ${product.color}50`,
                    transform: 'translateY(-2px)'
                  }}
                  whileTap={{ transform: 'translateY(0)' }}
                >
                  Learn More
                </motion.a>
              </motion.div>
              
              {/* Visual side - simplified cosmic representation */}
              {!isMobile && (
                <motion.div
                  className="relative z-10 w-1/3 flex justify-end items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <div 
                    className="relative w-[250px] h-[250px] rounded-full"
                    style={{ 
                      background: `radial-gradient(circle at center, ${product.color}40 0%, ${product.color}10 60%, transparent 90%)`,
                      boxShadow: `0 0 80px ${product.color}30`
                    }}
                  >
                    {/* Inner glow */}
                    <div 
                      className="absolute inset-0 rounded-full" 
                      style={{ 
                        background: `radial-gradient(circle at 30% 30%, ${product.color}30 0%, transparent 70%)` 
                      }}
                    ></div>
                    
                    {/* Product icon or symbol could be added here */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-5xl font-bold">
                      {product.name.charAt(0)}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-10">
        {PRODUCTS.map((product, index) => (
          <button
            key={`nav-${product.id}`}
            onClick={() => scrollToProduct(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'scale-100' 
                : 'bg-gray-600 scale-75 hover:bg-gray-400'
            }`}
            style={{
              backgroundColor: index === currentIndex ? product.color : undefined
            }}
            aria-label={`Go to ${product.name}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
      
      {/* Product index indicator */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-2 z-10">
        <span className="text-sm text-gray-400">
          {currentIndex + 1}/{PRODUCTS.length}:
        </span>
        <motion.span 
          key={PRODUCTS[currentIndex].id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-white font-medium"
        >
          {PRODUCTS[currentIndex].name}
        </motion.span>
      </div>
    </motion.section>
  );
};

export default ProductScrollAtomic; 