# Component Architecture Contract
**Version:** 6.1.0 - "AEGIS-Integrated Component Ecosystem"  
**Component:** `HorizontalProductScrollV6`  
**Status:** ✅ LEGIT  
**Last Updated:** December 2024  

---

## **Main Component Architecture**

### **HorizontalProductScrollV6** (Root Container)
**File:** `src/components/atomic/OurProducts_newV6.jsx`  
**Purpose:** Three-page horizontal scroll experience with AEGIS integration

```javascript
const HorizontalProductScrollV6 = ({ className = '' }) => {
  // Core state management
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  
  // Component structure
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <motion.div className="flex w-[300vw] h-full">
        <AegisPage />
        <ProductsPage />
        <ServicesPage />
      </motion.div>
      <PaginationDots />
      <DebugOverlay />
    </section>
  );
};
```

---

## **Page Components**

### **1. AegisPage** (Index 0)
**Purpose:** AEGIS runtime introduction with animated core visualization

**Sub-Components:**
- **CosmicEnvironment:** Enhanced background with perspective grid
- **AegisCore:** Central visualization with orbital animation system
- **FeatureCards:** 4 architecture highlight cards
- **ContentLayout:** Two-column structure (content + visualization)

```javascript
// AegisCore Visualization
const AegisCore = () => {
  const [particles, setParticles] = useState([]);
  const [rotations, setRotations] = useState([0, 0, 0]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pulseWaves, setPulseWaves] = useState([]);
  
  // Dynamic orbital particle system
  // Pulse wave generation from core
  // Product node hover interactions
};
```

### **2. ProductsPage** (Index 1)
**Purpose:** Interactive product showcase with AEGIS MasterCard

**Layout Structure:**
```
┌─────────────────┬─────────────────────────┐
│ ProductInfoPanel│   ProductGrid           │
│ (AEGIS Card)    │   ┌─────────────────────┤
│                 │   │ EnhancedProductCard │
│                 │   │ (Featured)          │
│                 ├───┼─────────────────────┤
│                 │ M │ SupportingCards (3) │
│                 │ e │ ┌─────┬─────┬─────┐ │
│                 │ t │ │Card1│Card2│Card3│ │
│                 │ r │ └─────┴─────┴─────┘ │
│                 │ i │                     │
│                 │ c │                     │
│                 │ s │                     │
└─────────────────┴───┴─────────────────────┘
```

**Sub-Components:**

#### **ProductInfoPanel (AEGIS MasterCard)**
```javascript
const ProductInfoPanel = ({ activeProduct }) => {
  // AEGIS runtime overview
  // SDK integration information
  // Core principles and architecture
  // System status indicator
};
```

#### **ProductGrid**
```javascript
const ProductGrid = ({ currentPage, setCurrentPage, hoveredCard, setHoveredCard }) => {
  // Asymmetric 6x4 grid layout
  // Featured card (4x3 span)
  // Supporting cards (2x4 span, 3 cards)
  // Metrics panel (4x1 span)
};
```

#### **EnhancedProductCard**
```javascript
const EnhancedProductCard = ({ item, isActive, isFeatured, isHovered, onHover, onLeave }) => {
  // Memoized dynamic styles
  // ThoughtTrails integration via data attributes
  // Full product information display (featured)
  // Accent color theming
  // Hover animations and interactions
};
```

#### **SupportingCards (Arrow Style)**
```javascript
// Clean arrow design pointing left to featured card
// Condensed product information
// Hover animations with leftward slide
// Circular arrow buttons with accent color
// "View" label for interaction clarity
```

#### **ProductMetrics**
```javascript
const ProductMetrics = ({ activeProduct }) => {
  // Memoized metrics data for all products
  // Live performance indicators
  // Accent color coordination
  // Smooth transitions between products
};
```

### **3. ServicesPage** (Index 2)
**Purpose:** Philosophy statement with stellar message integration

**Sub-Components:**

#### **CosmicEnvironment**
```javascript
const CosmicEnvironment = () => {
  // Enhanced orange-themed background
  // Perspective cosmic grid with animation
  // Multi-layer nebula effects
  // Floating cosmic orbs (8 elements)
  // Dynamic noise texture overlay
};
```

#### **IntegratedTypography**
```javascript
const IntegratedTypography = () => {
  // Ghost text background for depth
  // Floating context words animation
  // Position management for visual flow
};
```

#### **CosmicUI**
```javascript
const CosmicUI = () => {
  // Phase indicator (stellar status)
  // Progress visualization (arc animation)
  // Skip hints (keyboard prompts)
  // Stellar activation hints
  // Mission statement enhancements
};
```

---

## **Data Structures**

### **Product Data Schema**
```javascript
const OPS_BENTO_ITEMS = [
  {
    id: number,                    // Unique identifier
    title: string,                 // Product name
    summary: string,               // Brief description
    features: string[],            // Key feature list
    tagline: string,              // Marketing message
    backContent: string,          // Card back content
    fullDescription: {
      whatItIs: string,           // Product explanation
      howItWorks: string[],       // Technical details
      whyItMatters: string        // Value proposition
    },
    illustrationSrc: string,      // Image path
    accentColor: string,          // Hex theme color
    theme: string,                // Color theme name
    bgGradient: string           // CSS gradient class
  }
];
```

### **Animation Variants**
```javascript
// Page transitions
const pageVariants = {
  initial: { x: '100vw', opacity: 0, scale: 0.9 },
  animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8 } },
  exit: { x: '-100vw', opacity: 0, scale: 0.9, transition: { duration: 0.8 } }
};

// Text reveal animations
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.3 }
  })
};

// Card animations
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: { scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }
};
```

---

## **Interaction Patterns**

### **Event System**
```javascript
// Page navigation events
window.dispatchEvent(new CustomEvent('horizontalPageChange', {
  detail: { pageIndex, pageName, timestamp }
}));

// Product color updates
window.dispatchEvent(new CustomEvent('updateAccentColor', {
  detail: { color, cardBounds }
}));

// Stellar message events
window.addEventListener('stellarPhaseUpdate', handleStellarPhase);
window.addEventListener('stellarSequenceComplete', handleStellarComplete);
```

### **State Management**
```javascript
// Services Page States
const [text, setText] = useState('');
const [isStellarActive, setIsStellarActive] = useState(false);
const [stellarPhase, setStellarPhase] = useState('materialization');
const [stellarProgress, setStellarProgress] = useState(0);
const [canSkip, setCanSkip] = useState(false);
const [typewriterComplete, setTypewriterComplete] = useState(false);
const [showStellarHint, setShowStellarHint] = useState(false);
```

### **Keyboard Controls**
```javascript
// Typewriter skip: SPACE, ENTER, ArrowRight (after 25% completion)
// Stellar activation: ENTER (after typewriter completion)
// Debug mode: Ctrl+D (development toggle)
```

---

## **External Integrations**

### **ThoughtTrails System**
```javascript
// Canvas-based cosmic trail animation
// Activation: Products page only (pageIndex === 1)
// Layer: [data-thought-trails-layer="true"] at z-index 5
// Color sync: Responds to updateAccentColor events
// Performance: 60fps with requestAnimationFrame optimization
```

### **StellarMessage Component**
```javascript
import { StellarMessageComponent } from '../StellarMessageGrok';

// Integration: Services page (z-index 50)
// Activation: After typewriter completion + Enter key
// Event handling: Phase updates and completion
// Scroll release: Unlocks vertical scroll after completion
```

---

## **Utility Components & Hooks**

### **useReducedMotion Hook**
```javascript
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  // Detects user preference and adapts animations
};
```

### **useDebugMode Hook**
```javascript
const useDebugMode = () => {
  const [isDebug, setIsDebug] = useState(false);
  // Ctrl+D toggle for development visualization
};
```

### **Memoization Patterns**
```javascript
// Expensive calculations cached with useMemo
const cardStyles = useMemo(() => ({
  background: isFeatured ? complexGradient : simpleGradient,
  borderColor: isActive ? accentColor : defaultColor
}), [item.accentColor, isActive, isFeatured, isHovered]);
```

---

## **Performance Optimizations**

### **Animation Efficiency**
- **Layout Prevention:** `layout={false}` on motion components
- **Transform-Based:** Scale/translate instead of size changes
- **Conditional Rendering:** AnimatePresence for proper cleanup
- **Frame Throttling:** 60fps maintenance with proper intervals

### **Memory Management**
- **Event Cleanup:** removeEventListener on unmount
- **Interval Clearing:** clearInterval for all timers
- **State Reset:** Proper state cleanup on page transitions
- **Particle Limits:** Capped arrays to prevent memory leaks

### **Rendering Optimization**
- **Key Stability:** Consistent keys for React reconciliation
- **Conditional Effects:** useEffect dependencies properly managed
- **Callback Memoization:** useCallback for event handlers
- **Component Splitting:** Logical separation for better tree shaking

---

## **Error Handling & Fallbacks**

### **Image Loading**
```javascript
onError={(e) => (e.target.src = '/assets/images/placeholder.png')}
```

### **Component Fallbacks**
- **StellarMessage:** Graceful degradation if import fails
- **ThoughtTrails:** Continue without Canvas if unavailable
- **Animations:** Reduced motion fallbacks

### **State Recovery**
- **Scroll Lock:** Timeout-based auto-release
- **Page Bounds:** Prevent navigation outside 0-2 range
- **Event Listeners:** Defensive programming for missing elements

---

## **Testing Architecture**

### **Component Testing**
- **Unit Tests:** Individual component functionality
- **Integration Tests:** Inter-component communication
- **Visual Tests:** Snapshot testing for UI consistency
- **Performance Tests:** Animation frame rate monitoring

### **Event Testing**
- **Navigation Events:** Page transition triggering
- **Color Events:** Accent color propagation
- **Stellar Events:** Message activation and completion
- **Keyboard Events:** Skip and activation controls

---

## **Maintenance Guidelines**

### **Safe Modifications**
- **Product Data:** OPS_BENTO_ITEMS array updates
- **Styling:** Color schemes, spacing, typography
- **Animation Timing:** Duration and easing adjustments
- **Content:** Text and messaging updates

### **Critical Sections**
- **Event System:** Dispatch and listener logic
- **State Coordination:** Cross-component state management
- **External Integrations:** ThoughtTrails and StellarMessage
- **Performance Loops:** Animation and particle systems

---

**Contract Approved:** ✅  
**Implementation Status:** COMPLETE  
**Next Review:** Upon component architecture changes or performance issues