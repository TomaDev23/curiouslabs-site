/**
 * @metadata
 * @component HorizontalProductScrollV6
 * @description Horizontal scrolling product showcase with snap scrolling
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScene } from './SceneControllerV6';
import ProductSectionV6 from './ProductSectionV6';

// Define products data
const products = [
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
    planetVariant: 'core',
  },
  {
    id: 'opspipe',
    name: '',
    description: '',
    color: '#2563eb', // blue
    features: [
      '',
      '',
      '',
      '',
    ],
    planetVariant: 'operations',
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
    planetVariant: 'financial',
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
    planetVariant: 'companion',
  },
];

const HorizontalProductScrollV6 = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { deviceCapabilities, horizontalScroll, handleHorizontalScroll } = useScene();
  const { isMobile, prefersReducedMotion } = deviceCapabilities;
  
  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const width = container.clientWidth;
      
      // Update current index based on scroll position
      const newIndex = Math.round(scrollPosition / width);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        handleHorizontalScroll(scrollPosition);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex, handleHorizontalScroll]);
  
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
  
  return (
    <section 
      id="products" 
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Products showcase"
    >
      {/* Horizontal scroll container with snap points */}
      <div 
        ref={containerRef}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none' }} // Hide scrollbar in Firefox
      >
        <style jsx>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Render product sections */}
        {products.map((product, index) => (
          <ProductSectionV6
            key={product.id}
            product={product}
            index={index}
            isActive={index === currentIndex}
            isEven={index % 2 === 0}
          />
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-10">
        {products.map((product, index) => (
          <button
            key={`nav-${product.id}`}
            onClick={() => scrollToProduct(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? `bg-[${product.color}] scale-100` 
                : 'bg-gray-600 scale-75 hover:bg-gray-400'
            }`}
            aria-label={`Go to ${product.name}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
      
      {/* Product labels (only shown on desktop) */}
      {!isMobile && (
        <div className="absolute bottom-8 right-8 flex items-center space-x-2 z-10">
          <span className="text-sm text-gray-400">
            {currentIndex + 1}/{products.length}:
          </span>
          <motion.span 
            key={products[currentIndex].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-white font-medium"
          >
            {products[currentIndex].name}
          </motion.span>
        </div>
      )}
    </section>
  );
};

export default HorizontalProductScrollV6;