I’m glad the OpsBentoCluster is looking good and meeting your expectations! Now, let’s pivot to your new plan: compressing all product storytelling into a single horizontal-scrolling "Our Products" section with larger, visually engaging cards. This will replace the current bento grid layout with a new structure that aligns with your strategic vision—focusing on four products (OpsPipe, Guardian, MoonSignal, Curious) with a modern, high-fidelity design inspired by the GlassFlow aesthetic. The cards will be larger, feature hover effects (rotation, glow), and include the specified fields (title, summary, features, tagline) with dynamic theming.
Current State Recap
The current OpsBentoCluster is a grid-based layout with six items (one image, five text), using Tailwind CSS for styling and Framer Motion for animations. It’s responsive (grid-cols-2 sm:grid-cols-4 md:grid-cols-8) with consistent row heights (gridAutoRows: 'minmax(120px, auto)') and a max width of max-w-5xl. Each item has a glassmorphism background, neon accents, and hover effects (scale, lift, glow). You’ve removed the react-parallax-tilt dependency, and the layout is contained with proper padding.
New Requirements
Single Horizontal Scroll: Replace the grid with a horizontal-scrolling section titled "Our Products".
Four Product Cards: Represent OpsPipe, Guardian, MoonSignal, and Curious, consolidating all product storytelling.
Larger Cards: Width of 20–24rem (~320–384px), responsive for mobile (stack vertically if needed).
Card Content:
Title (bold, uppercase, color-accented).
Summary (small-caps or light font, muted tone).
Features (bullet list with iconography).
Tagline (italic, footer-positioned).
Visual Effects:
Hover: Slight 3D rotation (RotateX/RotateY) using Framer Motion.
Hover: Soft shadow glow pulse.
Background: Gradient with soft noise texture.
Border: 1px inner glow or soft neon edge.
Theming:
OpsPipe: Blue.
Guardian: Pink/purple.
MoonSignal: Green/teal.
Curious: Yellow/orange.
Updated Code: OurProducts.jsx
I’ll transform the OpsBentoCluster into a new OurProducts component, implementing the horizontal scroll and styling each card according to the mission objectives. I’ll reuse some of the existing logic (e.g., useReducedMotion, Framer Motion animations) but overhaul the layout and design to match your new vision.
tsx
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
      'Feels like it “knows you”',
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
          Each card holds a window into a full system. Scroll to explore what we’re building.
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
Key Changes & Implementation Details
Component Renaming:
Renamed OpsBentoCluster to OurProducts to reflect the new scope.
Updated metadata (id, doc) accordingly.
Horizontal Scroll Layout:
Replaced the grid with a horizontal flex layout: flex space-x-4 sm:space-x-6.
Used overflow-x-auto for horizontal scrolling on desktop.
Added min-w-max to ensure the container doesn’t shrink, preserving card widths.
Added scrollbar-hide (requires CSS support, see below) for a clean look.
Card Design:
Size: Set cards to w-80 sm:w-96 (320px → 384px) and h-[28rem] sm:h-[32rem] for larger, uniform dimensions.
Content:
Title: text-2xl sm:text-3xl font-bold uppercase with accentColor.
Summary: font-light capitalize text-white/70 for a muted tone.
Features: Bullet list with a colored dot (backgroundColor: accentColor + 40 opacity) instead of icons for simplicity.
Tagline: italic text-white/60 at the bottom.
Background: Used bg-gradient-to-br ${bgGradient} for dynamic gradients per product.
Noise Texture: Kept the subtle noise overlay for depth.
Border: Added a 1px inner glow with border-white/20 and a hover glow effect using accentColor.
Visual Effects:
Hover Rotation: Used Framer Motion’s rotateX: 5, rotateY: 5 for a 3D effect (Tilt replacement).
Hover Glow: Added a shadow pulse with boxShadow and a radial gradient overlay.
Scale: Slight scale: 1.02 on hover for a lift effect.
Transitions: Smooth transitions with type: 'spring' for animations.
Theming:
Defined accentColor and bgGradient for each product:
OpsPipe: Blue (#3b82f6, from-blue-800 to-blue-400).
Guardian: Pink/Purple (#ec4899, from-pink-800 to-purple-600).
MoonSignal: Teal (#14b8a6, from-teal-800 to-teal-400).
Curious: Orange (#f59e0b, from-orange-800 to-yellow-600).
Responsive Design:
Cards stack vertically on mobile using flex (no additional media queries needed for stacking).
Adjusted padding (px-4 sm:px-6) and spacing (space-x-4 sm:space-x-6) for breathing room.
Scaled text and card sizes for smaller screens (text-sm → text-base, w-80 → w-96).
Section Header:
Added a centered title (Our Products) and subtitle as specified.
Styled with text-3xl sm:text-4xl md:text-5xl for the title and text-white/70 for the subtitle.
CSS for Scrollbar Hiding
To hide the scrollbar (for a cleaner look), add this to src/styles/globals.css:
css
/* Hide scrollbar for modern browsers */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Chrome, Safari, and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
If globals.css doesn’t exist, create it with the above and ensure it’s imported in your app (e.g., in main.jsx or index.jsx):
jsx
import './styles/globals.css';
How to Use
Save the Component:
Save the updated code as src/components/home/v6/OurProducts.jsx.
Integrate into Parent:
Replace the usage of OpsBentoCluster with OurProducts in your parent component (e.g., src/layouts/HomeFloatflowLayout.jsx or src/pages/v6_home.jsx).
Example:
jsx
import OurProducts from '@/components/home/v6/OurProducts';

const Home = () => (
  <div className="bg-black min-h-screen">
    {/* Aegis Runtime Section (Scroll Panel 1) */}
    <section>{/* ... */}</section>

    {/* Our Products Section (Scroll Panel 2) */}
    <OurProducts className="my-8" />
  </div>
);
Run the Dev Server:
bash
npm run dev
Check the horizontal scroll on desktop.
Test on mobile (cards should stack vertically due to flex).
Verify hover effects (rotation, glow) on desktop.
Build for Production:
bash
npm run build


Troubleshooting
Horizontal Scroll Not Working:
Ensure the parent container doesn’t have overflow: hidden.
Check if min-w-max is applied to the inner div.
Cards Not Stacking on Mobile:
Add a media query to force vertical stacking if needed:
css
@media (max-width: 640px) {
  .flex {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
Hover Effects Missing:
Ensure framer-motion is installed (npm install framer-motion).
Test with reduced motion disabled in your browser settings.
Styling Issues:
If Tailwind classes (e.g., from-blue-800) don’t work, ensure tailwind.config.js includes these colors or extend them:
js
theme: {
  extend: {
    colors: {
      blue: { 400: '#60a5fa', 800: '#1e3a8a' },
      pink: { 800: '#9d174d' },
      purple: { 600: '#7c3aed' },
      teal: { 400: '#2dd4bf', 800: '#0f766e' },
      orange: { 800: '#c2410c' },
      yellow: { 600: '#ca8a04' },
    },
  },
}
Additional Suggestions
Icons: Add SVG icons for each product (e.g., reuse FeatureIcon from the old code) by mapping theme to an icon name.
Smooth Scrolling: Enhance the scroll behavior:
css
.overflow-x-auto {
  scroll-behavior: smooth;
}
Drag to Scroll: Add drag functionality using Framer Motion:
jsx
<motion.div drag="x" dragConstraints={{ left: -1000, right: 0 }} ...>
Mobile Touch: Ensure touch scrolling works smoothly by testing on a real device.
If Issues Persist
Share a screenshot of the rendered section to identify layout or styling issues.
Provide the parent component (HomeFloatflowLayout.jsx) to check for conflicts.
Describe any specific design tweaks (e.g., “cards are too tall” or “glow is too bright”).
This new OurProducts section should now elegantly showcase all four products in a single, scrollable panel with a modern, high-fidelity design. Let me know how it looks or if you need further adjustments! 🔥