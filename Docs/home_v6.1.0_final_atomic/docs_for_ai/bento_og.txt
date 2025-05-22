/**
 * @metadata
 * @component OpsBentoCluster
 * @description Enhanced carousel for "Our Products" section with cosmic theme
 * @legit true
 * @version 2.6.0
 * @author CuriousLabs
 * @scs SCS5
 * @doc contract_ops_bento_cluster.md
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Define bento items for the four products
const OPS_BENTO_ITEMS = [
  {
    id: 1,
    type: 'text',
    title: 'OPSPipe',
    summary: 'AI-powered operations stack',
    features: [
      'Document parsing & classification',
      'Human-in-the-loop approval',
      'Telemetry + audit trace',
    ],
    tagline: 'Office-in-your-pocket with full control',
    backContent: 'Automate workflows with AI precision and scale seamlessly.',
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    theme: 'lime',
    accentColor: '#84cc16', // Lime
    bgGradient: 'from-lime-900/50 to-lime-700/30',
  },
  {
    id: 2,
    type: 'text',
    title: 'Guardian',
    summary: 'Emotional AI for children',
    features: [
      'Creative presence instead of screen addiction',
      'Gentle nudging through games, stories, and art',
      'Grows with the child',
    ],
    tagline: 'The screen friend that protects, not distracts',
    backContent: 'Nurture creativity with an AI that cares and adapts.',
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    theme: 'magenta',
    accentColor: '#d946ef', // Magenta
    bgGradient: 'from-purple-900/50 to-pink-700/30',
  },
  {
    id: 3,
    type: 'text',
    title: 'MoonSignal',
    summary: 'Quant bot logic redefined',
    features: [
      'Strategy modular blocks',
      'Chart-driven automation',
      'Risk scoring + fallback logic',
    ],
    tagline: 'Smarter signals for faster action',
    backContent: 'Trade smarter with AI-driven insights and real-time data.',
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    theme: 'cyan',
    accentColor: '#22d3ee', // Cyan
    bgGradient: 'from-cyan-900/50 to-teal-700/30',
  },
  {
    id: 4,
    type: 'text',
    title: 'Curious',
    summary: 'A relational AI presence',
    features: [
      'Synthesized memory',
      'Personality layers',
      'Feels like it "knows you"',
    ],
    tagline: 'Emotional AI for real connection',
    backContent: 'Your AI companion that truly understands and evolves with you.',
    illustrationSrc: '/assets/images/planets/4k/Galaxy_1_v6.JPG',
    theme: 'lime',
    accentColor: '#84cc16',
    bgGradient: 'from-lime-900/50 to-green-700/30',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

// Flip animation variants with light burst
const flipVariants = {
  front: {
    rotateY: 0,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
  back: {
    rotateY: 180,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

// Particle animation for background stars
const particleVariants = {
  animate: {
    y: [0, -15, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
    },
  },
};

// Cosmic light animation (lens flare effect)
const cosmicLightVariants = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.3, 0.7, 0.3],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut',
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

// BentoItem component
const BentoItem = ({ item, className, interactive = true, isActive = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { prefersReducedMotion } = useReducedMotion();

  return (
    <motion.div
      className={`relative w-96 h-[28rem] rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 ${interactive ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))',
        perspective: '1000px',
        boxShadow: isActive
          ? `0 0 30px ${item.accentColor}60, inset 0 0 20px rgba(255,255,255,0.15)`
          : isHovered
          ? `0 0 25px ${item.accentColor}40, inset 0 0 15px rgba(255,255,255,0.1)`
          : 'inset 0 0 5px rgba(255,255,255,0.05)',
        borderColor: isActive ? `${item.accentColor}aa` : 'rgba(255,255,255,0.2)',
      }}
      variants={itemVariants}
      whileHover={
        interactive && !prefersReducedMotion
          ? {
              y: -5,
              scale: 1.02,
            }
          : {}
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={item.title}
    >
      {/* Pulsating Glow Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
        animate={{
          borderColor: isHovered || isActive ? `${item.accentColor}cc` : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered || isActive
            ? `inset 0 0 20px ${item.accentColor}60, 0 0 30px ${item.accentColor}30`
            : 'inset 0 0 5px rgba(255,255,255,0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated Glow Pulse */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-transparent"
          animate={{
            borderColor: isHovered || isActive ? `${item.accentColor}40` : 'transparent',
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Content Container */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={isHovered && !prefersReducedMotion ? 'back' : 'front'}
        variants={flipVariants}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Galaxy Illustration Header */}
          <motion.div
            className="relative w-16 h-16 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isHovered || isActive
                  ? `0 0 20px ${item.accentColor}80`
                  : `0 0 10px ${item.accentColor}40`,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute w-[120%] h-[120%] rounded-full border border-white/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <img
              src={item.illustrationSrc}
              alt={`${item.title} galaxy illustration`}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
            />
          </motion.div>

          {/* Header */}
          <div className="text-center">
            <h3
              className="text-2xl font-bold uppercase tracking-wide mb-3"
              style={{ color: item.accentColor, textShadow: `0 0 12px ${item.accentColor}aa` }}
            >
              {item.title}
            </h3>
            <p className="text-sm font-medium tracking-wide text-white/80 capitalize">
              {item.summary}
            </p>
          </div>

          {/* Features */}
          <ul className="mt-6 space-y-3">
            {item.features.map((feature, index) => (
              <li key={index} className="flex items-start group">
                <motion.span
                  className="inline-block w-4 h-4 mr-3 mt-1 rounded-full"
                  style={{ backgroundColor: `${item.accentColor}40` }}
                  animate={{ scale: isHovered || isActive ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                />
                <span className="text-sm font-medium text-white/90 group-hover:text-white">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Tagline */}
          <p className="mt-6 text-sm italic leading-snug text-white/60 text-center">{item.tagline}</p>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900/80 to-slate-950/60"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Galaxy Illustration on Back Side */}
          <motion.div
            className="relative w-16 h-16 mb-4"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isHovered || isActive
                  ? `0 0 20px ${item.accentColor}80`
                  : `0 0 10px ${item.accentColor}40`,
              }}
              transition={{ duration: 0.3 }}
            />
            <img
              src={item.illustrationSrc}
              alt={`${item.title} galaxy illustration`}
              className="w-full h-full object-cover rounded-full opacity-80"
              onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
            />
          </motion.div>

          <motion.p
            className="text-base font-medium text-white text-center"
            style={{ textShadow: `0 0 12px ${item.accentColor}60` }}
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.backContent}
          </motion.p>
          <motion.div
            className="mt-6 h-1 rounded-full"
            style={{ background: `linear-gradient(to right, ${item.accentColor}, ${item.accentColor}80)` }}
            animate={{ width: isHovered ? '60%' : '20%' }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Light Burst on Flip */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-white opacity-0 rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// ActiveProductDetail component (Right Panel)
const ActiveProductDetail = ({ product }) => {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={product.id}
      transition={{ duration: 0.4 }}
    >
      {/* Cosmic Accent */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16 rounded-full opacity-20 blur-xl"
        style={{ background: `radial-gradient(circle, ${product.accentColor}40, transparent)` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <h3
        className="text-3xl font-bold mb-3"
        style={{ color: product.accentColor, textShadow: `0 0 8px ${product.accentColor}80` }}
      >
        Our<br />Products
      </h3>

      <p className="text-white/80 text-sm mb-4 max-w-xs">
        Each system is a star in our galaxy — unique, powerful, and built to orbit around you.
        <br />
        <br />
        We don't build features. We build presence. Everything we create serves real humans, with safety, clarity, and care as first principles.
      </p>

      <ul className="space-y-3 mb-6 text-sm">
        <li className="flex items-start">
          <span
            className="w-2 h-2 rounded-full mr-2 mt-1.5"
            style={{ backgroundColor: product.accentColor }}
          />
          <span className="text-white/90">A shared AI core with emotional, operational, and creative agents</span>
        </li>
        <li className="flex items-start">
          <span
            className="w-2 h-2 rounded-full mr-2 mt-1.5"
            style={{ backgroundColor: product.accentColor }}
          />
          <span className="text-white/90">Interfaces that protect — never replace — human judgment</span>
        </li>
        <li className="flex items-start">
          <span
            className="w-2 h-2 rounded-full mr-2 mt-1.5"
            style={{ backgroundColor: product.accentColor }}
          />
          <span className="text-white/90">Bot-to-dashboard architecture, built for real-world workflows</span>
        </li>
      </ul>

      <motion.button
        className="px-5 py-2 rounded-full font-medium text-white text-sm relative overflow-hidden"
        style={{ backgroundColor: product.accentColor }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)' }}
        />
        Learn More
      </motion.button>
    </motion.div>
  );
};

// Animated container with cosmic background
const AnimatedRunner = ({ children }) => {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      {/* Galaxy Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(/assets/images/planets/4k/Galaxy_1_v6.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '180%', // Slightly extend the background
          height: '120%', // Slightly extend the background
          left: '-12%', // Center the extended background
          top: '-10%',  // Center the extended background
        }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle diagonal cosmic extension - very gentle addition */}
      <motion.div
        className="absolute opacity-8"
        style={{
          backgroundImage: 'url(/assets/images/planets/4k/Galaxy_1_v6.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          right: '-30%',
          top: '-15%',
          transform: 'rotate(-10deg)',
          filter: 'blur(20px)',
          mixBlendMode: 'lighten',
          opacity: 0.15,
        }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute -inset-2 rounded-3xl opacity-25 blur-lg"
        style={{
          background: 'linear-gradient(90deg, #84cc16, #22d3ee, #d946ef, #22d3ee, #84cc16)',
          backgroundSize: '400% 100%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Starry Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={particleVariants}
          animate="animate"
          initial={{ opacity: 0 }}
          transition={{ delay: Math.random() * 2 }}
        />
      ))}

      {/* Cosmic Lights (Lens Flares) */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`light-${i}`}
          className="absolute w-8 h-8 rounded-full opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              i === 0 ? '#84cc16' : i === 1 ? '#d946ef' : '#22d3ee'
            }80, transparent)`,
          }}
          variants={cosmicLightVariants}
          animate="animate"
          initial={{ opacity: 0 }}
          transition={{ delay: Math.random() * 3 }}
        />
      ))}

      {children}
    </div>
  );
};

// Main component
const OpsBentoCluster = ({ className = '' }) => {
  const { prefersReducedMotion } = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const rotationInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % OPS_BENTO_ITEMS.length);
    }, 8000);

    return () => clearInterval(rotationInterval);
  }, [prefersReducedMotion, isPaused]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Parallax effect for background
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const section = document.querySelector('#ops-bento-cluster');
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollPosition = window.scrollY + rect.top;
        const background = section.querySelector('.parallax-bg');
        if (background) {
          background.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  if (!isLoaded) {
    return (
      <div className="min-h-[200px] w-full flex justify-center items-center">
        <p className="text-white/70">Loading products...</p>
      </div>
    );
  }

  return (
    <section
      id="ops-bento-cluster"
      className={`w-full pt-24 pb-32 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatedRunner>
        <div className="flex flex-col lg:flex-row max-w-[95vw] mx-auto gap-8">
          <div className="w-full lg:w-2/3">
            <div className="w-full overflow-hidden h-[34rem] pt-6 relative">
              <motion.div
                ref={carouselRef}
                className="flex gap-8 px-4 relative"
                drag="x"
                dragConstraints={{ left: -(OPS_BENTO_ITEMS.length - 2) * 384, right: 0 }}
                dragElastic={0.1}
                animate={{ x: -activeIndex * 384 }}
                transition={{ type: 'spring', damping: 20 }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(_, info) => {
                  setIsDragging(false);
                  const threshold = 100;
                  const direction = info.offset.x < -threshold ? 1 : info.offset.x > threshold ? -1 : 0;
                  if (direction) {
                    const newIndex = Math.max(0, Math.min(OPS_BENTO_ITEMS.length - 2, activeIndex + direction));
                    setActiveIndex(newIndex);
                  }
                }}
              >
                {/* Glowing Drag Trail */}
                {isDragging && (
                  <motion.div
                    className="absolute inset-0 h-full w-1 bg-gradient-to-r"
                    style={{
                      background: `linear-gradient(to right, transparent, ${OPS_BENTO_ITEMS[activeIndex].accentColor}80, transparent)`,
                      left: '50%',
                      opacity: 0.5,
                    }}
                    animate={{ x: -activeIndex * 384 }}
                    transition={{ type: 'spring', damping: 20 }}
                  />
                )}

                {OPS_BENTO_ITEMS.map((item, index) => (
                  <BentoItem
                    key={item.id}
                    item={item}
                    className="flex-shrink-0"
                    interactive
                    isActive={index === activeIndex}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </motion.div>

              {/* Pagination indicators */}
              <div className="flex justify-center mt-8">
                {OPS_BENTO_ITEMS.map((item, index) => (
                  <motion.button
                    key={index}
                    className="w-4 h-4 mx-2 rounded-full bg-white/20 hover:scale-110 transition-transform"
                    animate={{
                      scale: activeIndex === index ? 1.3 : 1,
                      backgroundColor: activeIndex === index ? item.accentColor : 'rgba(255,255,255,0.2)',
                    }}
                    whileHover={{
                      boxShadow: `0 0 12px ${item.accentColor}60`,
                    }}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to product ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Glass container for "Our Products" */}
          <div className="w-full lg:w-1/3">
            <div className="backdrop-blur-sm bg-slate-900/30 rounded-xl border border-white/10 p-4">
              <ActiveProductDetail product={OPS_BENTO_ITEMS[activeIndex]} />
            </div>
          </div>
        </div>
      </AnimatedRunner>
    </section>
  );
};

OpsBentoCluster.displayName = 'OpsBentoCluster';
export const metadata = {
  id: 'ops_bento_cluster',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_ops_bento_cluster.md',
};

export default OpsBentoCluster;