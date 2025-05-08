
Read file: Docs/planning/new_horizon_v4/Full_Home_Mapping.md
Here's the precise animation inventory from the v4 Home components, following the visual top-down order as they appear on the page:

# 🎯 Animation Flow Map - CuriousLabs Home v4

## 1. 🌌 Component: NavBarCosmic.jsx
   * Animation trigger: Page load
   * Entry animation: `initial={{ y: -100 }} animate={{ y: 0 }}`
   * Transition: `duration: 0.5, ease: "easeOut"`
   * Hover effects: Logo and button scale transforms
   * Background transition: Based on scroll position
   * Mobile menu: `AnimatePresence` with height animation

   **Dev call - DO NOT TOUCH**

## 2. 🌌 Component: HeroPortal.jsx
   * Animation trigger: Page load + mouse movement
   * Section animation: Uses `sectionVariants` with stagger children
   * Parallax star field: Responds to mouse position
   * Star particles: Repeating opacity and scale animations
   * Light beams: `animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}`
   * Nebula effects: Slow pulse animations with infinite repeats
   * Text heading: Subtle floating animation
   * Text gradient: Animated background position
   * Typing animation: Character-by-character reveal
   * Scroll indicator: Fade-in and bouncing animation

      **Dev call - DO NOT TOUCH**


## 3. 🌌 Component: LogoStrip.jsx
   * Animation trigger: Continuous
   * Logo scroll: CSS animation with `animate-scroll` for infinite scrolling
   * Logo hover: Opacity and grayscale transitions
   * Transition: `transition-opacity`, `duration-300`
   * Edge fading: Static gradient masks for smooth scroll edges

      **Dev call - THIS SEGMENT IS MISSING, WE NEED TO ADD IT-CURRENTLY WONT SHOW OR RENDER!!!**


## 4. 🌌 Component: ServicesOrbital.jsx
   * Animation trigger: Scroll into view + timed rotation
   * Section animation: `variants={sectionVariants}`
   * Auto-rotation: 5s timer for service switching
   * Core pulse: `animate={{ boxShadow: ['0 0 20px..', '0 0 40px..', '0 0 20px..'] }}`
   * Orbital ring: `animate={{ rotate: 360 }}, duration: 10, repeat: Infinity`
   * Service nodes: Scale and glow on active state
   * Connection lines: Animated gradients and traveling light points
   * Service panel: `AnimatePresence` with entry/exit animations
   * Ambient particles: Floating animation on background

## 5. 🌌 Component: Metrics.jsx
   * Animation trigger: Scroll into view + hover
   * Card entry: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
   * Staggered reveal: Delay based on index
   * Card hover: `whileHover={{ y: -10 }}`
   * Glow effect: `transition-opacity duration-300`
   * Non-Framer CSS transitions: transform, border-color changes

## 6. 🌌 Component: ProjectsLogbook.jsx
   * Animation trigger: Scroll into view
   * Section: `initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}`
   * Container: Staggered children with `staggerChildren: 0.1/0.2`
   * Project cards: Reveal animation with delay based on index
   * Card hover: `whileHover={{ y: -10, zIndex: 10 }}`
   * Button: `whileHover={{ y: -5 }}`
   * Link arrows: `whileHover{{ x: 5 }}`
   * Glow effects: CSS transitions on hover

## 7. 🌌 Component: CommunityHub.jsx
   * Animation trigger: Scroll into view
   * Section: Uses `variants={sectionVariants}`
   * Posts: Staggered entry with y-offset
   * Tab switching: `AnimatePresence` for content swap
   * Particles: `animate={{ y: [0, Math.random() * 30 - 15] }}`
   * Card hover: Scale and elevation animations
   * Button hover: Scale and glow effects

## 8. 🌌 Component: ContactTerminal.jsx
   * Animation trigger: Scroll into view
   * Section reveal: `initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}`
   * Terminal block: `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}`
   * Input focus: Border color transitions
   * Button hover: `whileHover={{ scale: 1.02, boxShadow: "..." }}`
   * Cards hover: `whileHover={{ y: -5, borderColor: 'rgba(147, 51, 234, 0.3)' }}`
   * Cursor animation: Blinking terminal cursor effect

## 9. 🌌 Component: CuriousBotEnhanced.jsx
   * Animation trigger: Initial load + user interaction
   * Initial appearance: `initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}`
   * Message bubble: `AnimatePresence` with slide and fade
   * Text typing: Character-by-character animation
   * Bot expressions: Eyes blink, mouth shape changes
   * Hover: Wiggle effect `animate={{ rotate: [0, -5, 5, -5, 5, 0] }}`
   * Pulse effects: Radiating animations around avatar

## 10. 🌌 Component: FooterExperience.jsx
   * Animation trigger: Scroll into view
   * Container: `variants={containerVariants}` with staggered children
   * Items: `variants={itemVariants}` for individual elements
   * Social icons: `whileHover={{ y: -3 }}`
   * List bullets: `whileHover={{ scale: 2 }}`
   * CTA button: Multiple hover effects including scale and shadow
   * Background particles: Subtle floating animations

I'm now awaiting your specific animation instructions for the new approach.
