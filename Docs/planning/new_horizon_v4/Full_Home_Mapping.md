
Read file: src/components/home/v4/FooterExperience.jsx
# TILE 5.9.X – FULL COSMIC MODULE MAP

## 🌌 Component: NavBarCosmic.jsx

### 1. Structure
- Root: `motion.nav` with `fixed top-0 left-0 w-full z-50 transition-all duration-300`
- Classes: Conditional `bg-gray-900/90 backdrop-blur-md shadow-lg shadow-purple-500/5 py-3` when scrolled, `bg-transparent py-6` otherwise
- Contains nested container with logo and navigation links

### 2. Cards / Sub-elements
- Logo: Text-based with gradient styling
- Navigation Links: Array of `navItems` mapped to `NavItem` components
- "Launch Mission" button with hover animations
- Mobile menu button that toggles dropdown
- Mobile menu dropdown with responsive navigation

### 3. Animation
- Framer Motion used extensively
- Entry animation: `initial={{ y: -100 }} animate={{ y: 0 }}`
- Hover effects: Logo scales, nav items show underlines, button scales
- Mobile menu: `AnimatePresence` with height animation

### 4. Imports / Connections
- Imports: `motion`, `AnimatePresence` from framer-motion
- Uses `useScroll` context for scroll position and active section
- Uses `scrollToSection` utility for smooth scrolling
- Contains `NavItem` as internal component

### 5. Functionality
- Detects scroll position to change navbar styling
- Highlights active section based on scroll position
- Toggles mobile menu with animated transitions
- Handles navigation clicks with section scrolling

## 🌌 Component: HeroPortal.jsx

### 1. Structure
- Root: `motion.section` with `relative min-h-screen flex items-center justify-center overflow-hidden pt-16`
- Background elements: Multiple overlapping divs with gradients
- Uses `ErrorBoundary` for fallback UI

### 2. Cards / Sub-elements
- Parallax Star Field: Dynamic stars with animations
- Light beams: Angled colored beams with blur effects
- Background blooms: Gradient radial effects
- Typed text animation with character-by-character display
- CTA buttons with hover effects

### 3. Animation
- Framer Motion with extensive animations
- Parallax mouse movement effect on star field
- Typing animation for text
- Light beams: `animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}`
- Nebula effects with slow pulse animations

### 4. Imports / Connections
- Imports: `motion` from framer-motion, custom components, utility hooks
- Performance monitoring with `startComponentRender`/`endComponentRender`
- Accessibility checking with `useAccessibilityCheck`
- Lazy loading with `useLazyLoad`

### 5. Functionality
- Responds to mouse movement for parallax effects
- Tracks scroll position to hide scroll indicator
- Optimizations: useMemo, useCallback for performance
- Responsive design with breakpoint detection

## 🌌 Component: LogoStrip.jsx

### 1. Structure
- Root: `section` with `relative py-8 overflow-hidden bg-transparent`
- Uses layered divs for background effects and gradients
- Inner container with centered content

### 2. Cards / Sub-elements
- Title text: "Trusted by innovative teams"
- Logo images displayed in a horizontal strip
- Duplicate set of logos for seamless infinite scrolling
- Gradient fades on left and right edges

### 3. Animation
- CSS animation with `animate-scroll` for horizontal scrolling
- Hover effects on logos: `grayscale hover:grayscale-0`
- Opacity transitions on logos: `opacity-60 hover:opacity-100`

### 4. Imports / Connections
- No explicit imports shown in snippet
- References logo images from public directory: `/images/logos/`
- Self-contained with no external component dependencies

### 5. Functionality
- Infinite scrolling animation with CSS
- Logo hover interactions with grayscale removal
- Edge fading for smooth visual transition
- Fully responsive with mobile adaptations

## 🌌 Component: ServicesOrbital.jsx

### 1. Structure
- Root: `motion.section` with `relative py-12 md:py-16 overflow-hidden`
- Complex layered background with gradients and particles
- Grid layout with two columns on larger screens

### 2. Cards / Sub-elements
- Central orbital core with pulsing effects
- Service nodes distributed around orbital paths
- Circular orbital paths with glowing effects
- Service detail panel with description
- Ambient particles floating in background

### 3. Animation
- Framer Motion with complex animations
- Auto-rotating service selection on timer
- Core pulse: `animate={{ boxShadow: ['0 0 20px..', '0 0 40px..', '0 0 20px..'] }}`
- Orbital rings rotation: `animate={{ rotate: 360 }}`
- Connection lines with animated light trails

### 4. Imports / Connections
- Imports: `motion`, `AnimatePresence`, animation utilities, UI components
- Uses `useScrollReveal`, `useBreakpoint`, performance monitoring
- Lazy loading with `useLazyLoad`
- Scroll context with `useScroll`

### 5. Functionality
- Auto-rotate services with setInterval
- Interactive service selection
- Calculation of orbital positions based on angles
- Responsive layout with different sizes based on screen width
- Performance optimizations with memoization

## 🌌 Component: Metrics.jsx

### 1. Structure
- Root: `section` with `relative py-24 bg-gradient-to-b from-curious-dark-900 via-curious-dark-800 to-curious-dark-900 overflow-hidden`
- Layered background with circuit patterns and gradient accents
- Container with centered heading and grid layout

### 2. Cards / Sub-elements
- Heading with gradient text
- Grid of metric cards (2-column mobile, 4-column desktop)
- Each card has value and label with hover effects
- Subtle gradient accents and glow effects
- Bottom accent line as separator

### 3. Animation
- CSS transitions for hover effects
- Card hover: `transition-transform duration-700 group-hover:scale-[1.02]`
- Border color transitions: `transition-colors duration-300`
- Glow opacity transitions: `transition-opacity duration-500`

### 4. Imports / Connections
- Imports metrics data from `../data/metrics`
- No external component dependencies
- Self-contained styling with Tailwind classes

### 5. Functionality
- Maps metric data to visual cards
- Responsive grid layout changes based on screen size
- Group hover effects with parent-child interactions
- Visual enhancements on interaction

## 🌌 Component: ProjectsLogbook.jsx

### 1. Structure
- Root: `motion.section` with `relative pt-32 pb-32 overflow-hidden`
- Background gradient overlay
- Container with grid layout for project cards

### 2. Cards / Sub-elements
- Project cards mapped from projects array
- Each card has terminal-style header with colored buttons
- Projects have title, description, tags, and icon
- "View All Projects" button at bottom
- Terminal-style tag list with color coding

### 3. Animation
- Framer Motion animations throughout
- Container: staggered children animation
- Cards: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}`
- Hover: `whileHover={{ y: -10, zIndex: 10 }}`
- Button: `whileHover={{ y: -5 }}`

### 4. Imports / Connections
- Imports: `motion` from framer-motion
- Custom `ProjectCard` component defined within the file
- Self-contained with project data defined internally

### 5. Functionality
- Renders projects from array
- Staggered animations for card reveal
- Interactive hover effects with elevation and glow
- Terminal-inspired UI with colored accents
- Responsive grid layout for different screen sizes

## 🌌 Component: CommunityHub.jsx

### 1. Structure
- Root: `motion.section` with `relative py-8 md:py-12 overflow-hidden`
- Background effects with gradients and floating particles
- Container with centered content and tabs

### 2. Cards / Sub-elements
- Tab navigation with different categories
- Post cards rendered from array of posts
- Each post has author, avatar, title, content, and interaction buttons
- "Join The Community" button at bottom
- Truncated posts list on mobile

### 3. Animation
- Framer Motion for scroll and interaction animations
- Section reveal: `variants={sectionVariants}`
- Post animations: Staggered entry with y-offset
- Particles: Random floating motion `animate={{ y: [0, Math.random() * 30 - 15] }}`
- Hover animations on cards and buttons

### 4. Imports / Connections
- Imports: `motion` from framer-motion, animation utilities, UI components
- Uses `useScrollReveal` for scroll-triggered animations
- Uses `useBreakpoint` for responsive behavior
- Uses `MagneticButton` for enhanced button interaction

### 5. Functionality
- Tab switching between content categories
- Different post count based on screen size
- Responsive design for mobile/desktop
- Hover interactions on cards and buttons
- "View More" functionality for mobile truncated content

## 🌌 Component: ContactTerminal.jsx

### 1. Structure
- Root: `motion.section` with `relative py-24 pb-40`
- Background gradient overlay
- Terminal-styled container with header and content

### 2. Cards / Sub-elements
- Terminal header with colored buttons and command prompt
- Form with input fields styled as terminal commands
- Contact info cards with icons and information
- Terminal footer with blinking cursor
- Submit button with gradient styling

### 3. Animation
- Framer Motion for scroll and interaction animations
- Section reveal: `initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}`
- Terminal block animate: `initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}`
- Button hover: `whileHover={{ scale: 1.02, boxShadow: "..." }}`
- Contact cards hover: `whileHover={{ y: -5, borderColor: 'rgba(147, 51, 234, 0.3)' }}`

### 4. Imports / Connections
- Imports: `motion` from framer-motion
- Self-contained with no external component dependencies
- Simulated terminal interface

### 5. Functionality
- Responsive form layout (1-column mobile, 2-column desktop)
- Hover and focus states for form fields
- Interactive elements with animations
- Terminal-style visual effects
- Blinking cursor animation in footer

## 🌌 Component: CuriousBotEnhanced.jsx

### 1. Structure
- Root: `motion.div` with `fixed bottom-4 right-4 z-30 flex flex-col items-end`
- Message bubble that appears when bot is open
- Avatar button that toggles open/close
- Animated bot face with expressions

### 2. Cards / Sub-elements
- Message bubble with typing animation
- Quick action buttons inside message bubble
- Animated bot avatar with eyes and mouth
- Notification indicator on closed state
- Radial pulse effects around bot

### 3. Animation
- Framer Motion with extensive animations
- Initial appearance: `initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}`
- Message typing animation with transitions between messages
- Bot face expressions: Eyes blink, mouth changes shape
- Hover animations: Wiggle effect, pulse radiations

### 4. Imports / Connections
- Imports: `motion`, `AnimatePresence` from framer-motion
- Self-contained component with internal state management
- Auto-rotating messages with setTimeout

### 5. Functionality
- Toggles open/closed state
- Cycles through different messages automatically
- Enhanced hover interactions
- Floating animation on avatar
- Responsive on all screen sizes
- Accessibility with keyboard navigation

## 🌌 Component: FooterExperience.jsx

### 1. Structure
- Root: `footer` with `relative pt-12 bg-gradient-to-t from-black via-gray-900/90 to-transparent overflow-hidden pb-12`
- Uses `CosmicNoiseOverlay` and `ParticleField` for background effects
- CTA Bridge section at top
- Grid layout for footer content
- Copyright section at bottom

### 2. Cards / Sub-elements
- CTA section with heading and button
- Four-column grid with company info, products, resources, and company links
- Social media links with icons
- Link lists for each column
- Copyright information at bottom

### 3. Animation
- Framer Motion with staggered animations
- Container animation: `variants={containerVariants}`
- Item animations: `variants={itemVariants}`
- Social icons: `whileHover={{ y: -3 }}`
- List indicators: `whileHover={{ scale: 2 }}`
- CTA button with multiple hover effects

### 4. Imports / Connections
- Imports: `motion` from framer-motion, `Link` from react-router-dom
- Uses `MagneticButton` for enhanced button interaction
- Uses `CosmicNoiseOverlay` and `ParticleField` for background effects
- Link arrays for navigation

### 5. Functionality
- Responsive grid layout (1-column mobile, 4-column desktop)
- Interactive links with hover effects
- Focus states for accessibility
- Current year in copyright text
- Social media links with icons and accessible labels
- Section navigation links
