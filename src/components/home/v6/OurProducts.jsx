/**
 * @metadata
 * @component OurProducts
 * @description Horizontal-scrolling "Our Products" section with styled cards
 * @legit true
 * @version 1.0.0
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_our_products.md
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define product card data
const PRODUCT_CARDS = [
  {
    title: 'OPSPipe',
    summary: 'AI-powered operations stack',
    features: [
      'Document parsing & classification',
      'Human-in-the-loop approval',
      'Telemetry + audit trace',
    ],
    tagline: 'Office-in-your-pocket with full control',
    theme: 'blue',
    accentColor: '#3b82f6', // Blue-500
    bgGradient: 'from-blue-800 to-blue-400',
  },
  {
    title: 'Guardian',
    summary: 'Emotional AI for children',
    features: [
      'Creative presence instead of screen addiction',
      'Gentle nudging through games, stories, and art',
      'Grows with the child',
    ],
    tagline: 'The screen friend that protects, not distracts',
    theme: 'pink',
    accentColor: '#ec4899', // Pink-500
    bgGradient: 'from-pink-800 to-purple-600',
  },
  {
    title: 'MoonSignal',
    summary: 'Quant bot logic redefined',
    features: [
      'Strategy modular blocks',
      'Chart-driven automation',
      'Risk scoring + fallback logic',
    ],
    tagline: 'Smarter signals for faster action',
    theme: 'teal',
    accentColor: '#14b8a6', // Teal-500
    bgGradient: 'from-teal-800 to-teal-400',
  },
  {
    title: 'Curious',
    summary: 'A relational AI presence',
    features: [
      'Synthesized memory',
      'Personality layers',
      'Feels like it "knows you"',
    ],
    tagline: 'Emotional AI for real connection',
    theme: 'orange',
    accentColor: '#f59e0b', // Orange-500
    bgGradient: 'from-orange-800 to-yellow-600',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// Reduced motion hook
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { prefersReducedMotion };
};

// ProductCard component
const ProductCard = ({ product, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <motion.div
      className={`relative w-80 sm:w-96 h-[28rem] sm:h-[32rem] rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 bg-gradient-to-br ${product.bgGradient} ${className}`}
      variants={cardVariants}
      whileHover={
        !prefersReducedMotion
          ? {
              rotateX: 5,
              rotateY: 5,
              scale: 1.02,
              boxShadow: `0 10px 30px rgba(0,0,0,0.3), 0 0 20px ${product.accentColor}40`,
            }
          : {}
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={product.title}
    >
      {/* Inner Glow Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none">
        <motion.div
          className="absolute inset-0 border border-transparent rounded-2xl"
          animate={{
            borderColor: isHovered ? `${product.accentColor}80` : 'transparent',
            boxShadow: isHovered
              ? `inset 0 0 15px ${product.accentColor}40`
              : 'inset 0 0 0px transparent',
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-between">
        {/* Header */}
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold uppercase tracking-wide"
            style={{ color: product.accentColor }}
          >
            {product.title}
          </h3>
          <p className="mt-2 text-sm sm:text-base font-light tracking-wide text-white/70 capitalize">
            {product.summary}
          </p>
        </div>

        {/* Features */}
        <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span
                className="inline-block w-4 h-4 mr-2 mt-1 rounded-full"
                style={{ backgroundColor: `${product.accentColor}40` }}
              />
              <span className="text-xs sm:text-sm text-white/90">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Tagline */}
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm italic text-white/60">
          {product.tagline}
        </p>
      </div>

      {/* Glow Pulse on Hover */}
      <motion.div
        className="absolute -inset-1 rounded-3xl opacity-0 blur-xl"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(circle, ${product.accentColor}40, transparent)` }}
      />
    </motion.div>
  );
};

// Main component
const OurProducts = ({ className = '' }) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (process.env.NODE_ENV === 'development') {
      console.log('[LEGIT:RENDER] OurProducts SCS5');
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-[200px] w-full flex justify-center items-center">
        <p className="text-white/70">Loading products...</p>
      </div>
    );
  }

  return (
    <section className={`w-full py-12 sm:py-16 ${className}`}>
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Our Products
        </h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto">
          Each card holds a window into a full system. Scroll to explore what we're building.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <motion.div
        className="w-full overflow-x-auto scrollbar-hide"
        variants={!prefersReducedMotion ? containerVariants : {}}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="flex space-x-4 sm:space-x-6 px-4 sm:px-6 min-w-max">
          {PRODUCT_CARDS.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              className="flex-shrink-0"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

OurProducts.displayName = 'OurProducts';
export const metadata = {
  id: 'our_products',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_our_products.md',
};

export default OurProducts; 