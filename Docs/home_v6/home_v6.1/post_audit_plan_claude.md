# CuriousLabs V6: The AEGIS Universe — Final Execution Plan

## 🌌 Core Narrative

The redesigned site tells the story of a single powerful runtime (AEGIS) that powers an entire universe of products and services. This narrative unfolds through a carefully orchestrated sequence that begins with minimalist emptiness and evolves into a rich cosmic ecosystem.

## 📊 Experience Flow

### Phase 1: Hero Sequence (Initial View)
- **Start with void**: Minimal dark environment with subtle grid
- **Emergence**: AEGIS core planet appears with animated reveal
- **Activation**: Orbital pathways illuminate showing the ecosystem
- **Transition**: Horizontal scroll indicator appears, inviting exploration

### Phase 2: Horizontal Product Universe (Scroll Right)
- Seamless transition from hero to horizontal scrolling product showcase
- Products appear as orbital celestial bodies connected to the AEGIS core
- Each product section maintains the 50/50 split with alternating text/visual layout
- Z-pattern flow creates visual dynamism as user scrolls horizontally

## 🎨 Visual Design Framework

### Layered Cosmic System
1. **Background Layer**:
   - Dark cosmic void with subtle starfield
   - Strategic bursts of high-res nebula imagery during key transitions
   - Gradient shifts that respond to scrolling/section changes

2. **Structural Layer**:
   - Subtle grid overlay providing technical feel and depth
   - Clean 50/50 layout splits for content/visual balance
   - Z-pattern flow between sections (text-right → text-left → text-right)

3. **Interactive Layer**:
   - Orbital pathways connecting AEGIS to products
   - Floating UI elements with subtle hover effects
   - Minimalist navigation with accent highlights

### Color System

```javascript
// Core design system colors
const colors = {
  // Dark backgrounds
  void: '#080808',        // Pure black void
  deepSpace: '#0F0F12',   // Slightly lighter for contrast
  cosmic: '#0D1527',      // Deep blue-black with hint of color
  
  // Brand accents
  lime: {
    primary: '#84cc16',   // Primary brand color
    light: '#a3e635',     // For highlights
    glow: '#bef264',      // For glow effects
  },
  
  // Cosmic palette
  nebula: {
    blue: '#2563eb',
    purple: '#7e22ce', 
    teal: '#0d9488',
    amber: '#d97706',
  },
  
  // UI elements
  ui: {
    surface: 'rgba(18, 18, 24, 0.8)',  // Glass surface
    divider: 'rgba(255, 255, 255, 0.08)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  }
};

// Gradient presets
const gradients = {
  heroVoid: 'radial-gradient(circle at 50% 50%, #0F0F12 0%, #080808 100%)',
  cosmicBlue: 'linear-gradient(135deg, #0D1527 0%, #1E293B 100%)',
  nebulaPurple: 'linear-gradient(135deg, #4C1D95 0%, #1E1B4B 100%)',
  nebulaBlend: 'linear-gradient(135deg, #1E1B4B 0%, #0D1527 50%, #042f2e 100%)',
  limeBrand: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
};
```

## 📐 Storyboard: Section-by-Section Flow

### 1. Hero Void (Initial Load)

```
+-------------------------------------------------+
|                                                 |
|                                                 |
|                                                 |
|                 [Empty space                    |
|                  with subtle                    |
|                  starfield]                     |
|                                                 |
|                                                 |
|                                                 |
|                                                 |
| CuriousLabs                                    >|
+-------------------------------------------------+
```

- **Background**: Pure black with extremely subtle starfield
- **Elements**: Only the CuriousLabs logo (bottom left) and subtle scroll indicator (bottom right)
- **Interaction**: Automatic progression after brief pause (or scroll to advance)

### 2. AEGIS Emergence

```
+-------------------------------------------------+
|                                                 |
|                                                 |
|                                                 |
|                    [AEGIS                       |
|                   planet                        |
|                  appears]                       |
|                                                 |
|                                                 |
|                                                 |
|                                                 |
| CuriousLabs                                    >|
+-------------------------------------------------+
```

- **Background**: Starfield becomes more visible, hint of nebula color emerges
- **Elements**: AEGIS core planet materializes with subtle animation
- **Animation**: Planet grows from small point with subtle physics, nebula colors start to emerge behind it
- **Typography**: "AEGIS" label appears near planet with minimal identification

### 3. Universe Activation

```
+-------------------------------------------------+
|                                                 |
|                 Universe of                     |
|                 Solutions                       |
|                                                 |
|                    [AEGIS                       |
|                    planet                       |
|                  with orbits]                   |
|                                                 |
|                                                 |
|                                                 |
| CuriousLabs                        Explore  >>> |
+-------------------------------------------------+
```

- **Background**: Full nebula burst moment (using high-res imagery) that settles into gradient
- **Elements**: Orbital paths illuminate around planet, planet details become clearer
- **Typography**: "Universe of Solutions" headline appears with staggered animation
- **Interaction**: "Explore >>>" button appears with subtle animation

### 4. Horizontal Scroll Transition (First Movement)

```
+----------------------------------+---------------+
|                                  |               |
|                                  |               |
|  One core runtime                |               |
|  powers our entire               |     [AEGIS    |
|  ecosystem                       |     planet    |
|                                  |    rotating]  |
|  AEGIS is the foundation of      |               |
|  everything we build.            |               |
|                                  |               |
|                                  |               |
+----------------------------------+---------------+
```

- **Background**: Clean cosmic gradient with subtle grid overlay
- **Layout**: 50/50 split with text left, visual right
- **Visual**: AEGIS planet with detailed features and subtle rotation
- **Typography**: Editorial serif for headlines, clean sans-serif for body
- **Animation**: Smooth horizontal slide transition as user begins scrolling

### 5. First Product: OpsPipe (Horizontal Scroll)

```
+---------------+----------------------------------+
|               |                                  |
|               |                                  |
|               |  OpsPipe                         |
|     [OpsPipe  |                                  |
|      planet   |  AI-powered operations with      |
|     visual]   |  multi-agent architecture        |
|               |                                  |
|               |  [Feature highlights with        |
|               |   orbital bullets]               |
|               |                                  |
+---------------+----------------------------------+
```

- **Background**: Shift in cosmic gradient with nebula burst effect during transition
- **Layout**: 50/50 split with visual left, text right (Z-pattern transition)
- **Visual**: OpsPipe planet visualization with connection back to AEGIS
- **Typography**: Product name in large display type, feature points with orbital bullet styling
- **Animation**: Smooth orbital movement showing connection to AEGIS core

### 6. Second Product: MoonSignal (Horizontal Scroll)

```
+----------------------------------+---------------+
|                                  |               |
|                                  |               |
|  MoonSignal                      |               |
|                                  |               |
|  Algotrading and signal          |  [MoonSignal  |
|  machine with AI playbooks       |    planet     |
|                                  |    visual]    |
|  [Feature highlights with        |               |
|   orbital bullets]               |               |
|                                  |               |
+----------------------------------+---------------+
```

- **Background**: Another gradient shift with nebula accent
- **Layout**: 50/50 split with text left, visual right (continuing Z-pattern)
- **Visual**: MoonSignal planet with trading-themed cosmic elements
- **Typography**: Consistent with previous product but unique accent color
- **Animation**: Unique orbital animation style reflecting financial nature

## 🎬 Animation & Transition Framework

### Key Moments for High-Impact Animation
1. **AEGIS Planet Materialization**: Cinematic reveal from void to substance
2. **Nebula Color Bursts**: Strategic moments where high-res imagery appears then subtly fades to gradients
3. **Horizontal Scroll Transitions**: Smooth planet transitions with orbital physics
4. **Product Feature Highlights**: Subtle animations that draw attention to key points

### Animation Philosophy
- **Purposeful Motion**: Animations serve the narrative rather than being decorative
- **Physics-Based**: Movements follow natural physics (momentum, elasticity, gravity)
- **Performance-Optimized**: All animations adaptively scale based on device capabilities
- **Subtle > Dramatic**: Prefer subtle, refined animations over dramatic effects

### Transition Logic
```javascript
// Core transition progression logic
const transitionSystem = {
  // Transition types
  types: {
    FADE: 'fade',           // Simple opacity transition
    SLIDE: 'slide',         // Directional movement
    SCALE: 'scale',         // Size change
    ORBITAL: 'orbital',     // Moves along curved path
    NEBULA: 'nebula',       // Includes nebula burst effect
  },
  
  // Predefined timing functions for consistent feel
  easing: {
    standard: [0.4, 0.0, 0.2, 1],    // Material standard
    decelerate: [0.0, 0.0, 0.2, 1],  // Starts fast, ends slow
    accelerate: [0.4, 0.0, 1.0, 1],  // Starts slow, ends fast
    sharp: [0.4, 0.0, 0.6, 1],       // Quick precise movements
    elastic: [0.4, 0.0, 0.2, 1.4],   // Slight overshoot
  },
  
  // Duration presets (in ms)
  duration: {
    instant: 150,
    quick: 300,
    standard: 500,
    complex: 800,
    dramatic: 1200,
  },
};
```

## 💻 Component Architecture

### 1. Core Orchestration Components

#### SceneController
```jsx
// Manages overall scene state and transitions
const SceneController = () => {
  // Scene state
  const [scenePhase, setScenePhase] = useState('void');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [horizontalScroll, setHorizontalScroll] = useState(0);
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    performance: 'high',
    prefersReducedMotion: false,
    isMobile: false,
  });
  
  // Phase sequence logic
  useEffect(() => {
    // Device capabilities detection
    const detectCapabilities = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const memory = (navigator.deviceMemory || 8);
      
      // Set performance tier
      let performance = 'high';
      if (prefersReducedMotion) performance = 'minimal';
      else if (isMobile && memory <= 4) performance = 'low';
      else if (memory <= 6) performance = 'medium';
      
      setDeviceCapabilities({
        performance,
        prefersReducedMotion,
        isMobile,
      });
    };
    
    detectCapabilities();
    window.addEventListener('resize', detectCapabilities);
    
    // Automatic phase progression
    if (scenePhase === 'void') {
      const timer = setTimeout(() => setScenePhase('emergence'), 1200);
      return () => clearTimeout(timer);
    }
    
    if (scenePhase === 'emergence') {
      const timer = setTimeout(() => setScenePhase('activation'), 1800);
      return () => clearTimeout(timer);
    }
  }, [scenePhase]);
  
  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Update phase based on scroll if not already advanced
      if (scrollPosition > 100 && scenePhase === 'void') {
        setScenePhase('emergence');
      }
      
      if (scrollPosition > 300 && scenePhase === 'emergence') {
        setScenePhase('activation');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition, scenePhase]);
  
  // Horizontal scroll handler for product sections
  const handleHorizontalScroll = () => {
    // Logic for horizontal scroll behavior
    // This would integrate with a horizontal scroll library or custom implementation
  };
  
  return (
    <SceneContext.Provider value={{ 
      scenePhase, 
      deviceCapabilities,
      scrollPosition,
      horizontalScroll,
      handleHorizontalScroll
    }}>
      <CosmicBackgroundSystem />
      <HeroSequence />
      <HorizontalProductScroll />
    </SceneContext.Provider>
  );
};
```

#### CosmicBackgroundSystem
```jsx
// Manages all background layers (starfield, nebula, grid)
const CosmicBackgroundSystem = () => {
  const { scenePhase, deviceCapabilities } = useContext(SceneContext);
  
  // Background state
  const [activeNebula, setActiveNebula] = useState(null);
  const [gridOpacity, setGridOpacity] = useState(0.02);
  const [backgroundGradient, setBackgroundGradient] = useState(gradients.heroVoid);
  
  // Update background based on scene phase
  useEffect(() => {
    switch(scenePhase) {
      case 'void':
        setGridOpacity(0.02);
        setBackgroundGradient(gradients.heroVoid);
        setActiveNebula(null);
        break;
      case 'emergence':
        setGridOpacity(0.05);
        setBackgroundGradient(gradients.cosmicBlue);
        setActiveNebula('subtle');
        break;
      case 'activation':
        setGridOpacity(0.08);
        setBackgroundGradient(gradients.nebulaBlend);
        setActiveNebula('active');
        break;
      default:
        break;
    }
  }, [scenePhase]);
  
  return (
    <div className="fixed inset-0 z-0">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: backgroundGradient }}
      />
      
      {/* Starfield layer */}
      <StarfieldCanvas
        density={deviceCapabilities.performance === 'high' ? 1 : 0.5}
      />
      
      {/* Nebula imagery - conditionally rendered */}
      {activeNebula && (
        <NebulaLayer 
          intensity={activeNebula === 'active' ? 0.6 : 0.3}
          variant={scenePhase === 'activation' ? 'purple' : 'blue'}
        />
      )}
      
      {/* Grid overlay */}
      <GridOverlay opacity={gridOpacity} />
    </div>
  );
};
```

### 2. Hero Components

#### HeroSequence
```jsx
// Orchestrates the initial loading sequence
const HeroSequence = () => {
  const { scenePhase, deviceCapabilities } = useContext(SceneContext);
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Positioned header */}
      <div className="absolute bottom-8 left-8 z-10">
        <LogoType />
      </div>
      
      {/* Central planet container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AegisPlanet phase={scenePhase} />
      </div>
      
      {/* Hero text - only visible in activation phase */}
      {scenePhase === 'activation' && (
        <div className="absolute top-1/3 left-0 w-full text-center">
          <AnimatedHeadline>Universe of Solutions</AnimatedHeadline>
        </div>
      )}
      
      {/* Explore indicator - only in activation phase */}
      {scenePhase === 'activation' && (
        <div className="absolute bottom-8 right-8 z-10">
          <ExploreIndicator />
        </div>
      )}
    </section>
  );
};
```

#### AegisPlanet
```jsx
// The central AEGIS visualization
const AegisPlanet = ({ phase }) => {
  const { deviceCapabilities } = useContext(SceneContext);
  const { performance } = deviceCapabilities;
  
  // Different implementation based on performance profile
  if (performance === 'high' || performance === 'medium') {
    return <AegisPlanet3D phase={phase} />;
  } else {
    return <AegisPlanet2D phase={phase} />;
  }
};

// High-performance 3D implementation
const AegisPlanet3D = ({ phase }) => {
  // Scale values for different phases
  const scaleByPhase = {
    void: 0.1,
    emergence: 0.7,
    activation: 1,
  };
  
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<PlanetLoader />}>
        <animated.group scale={scale}>
          <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            <MeshDistortMaterial
              color="#1e40af"
              envMapIntensity={1.2}
              clearcoat={1}
              clearcoatRoughness={0.4}
              metalness={0.8}
              roughness={0.2}
              distort={0.3}
            />
          </mesh>
          
          {/* Atmosphere glow */}
          <mesh scale={1.1}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshBasicMaterial
              color="#84cc16"
              transparent
              opacity={0.15}
            />
          </mesh>
          
          {/* Orbital rings - only in activation phase */}
          {phase === 'activation' && <OrbitalRings />}
          
          <Environment preset="city" />
        </animated.group>
      </Suspense>
    </Canvas>
  );
};
```

### 3. Horizontal Product Scroll Components

#### HorizontalProductScroll
```jsx
// Manages the horizontal scrolling product showcase
const HorizontalProductScroll = () => {
  const containerRef = useRef(null);
  const { handleHorizontalScroll } = useContext(SceneContext);
  
  // Products data
  const products = [
    {
      id: 'aegis',
      name: 'AEGIS Runtime',
      description: 'The core that powers our universe of products',
      color: colors.lime.primary,
      planetVariant: 'core',
    },
    {
      id: 'opspipe',
      name: 'OpsPipe',
      description: 'Multi-agent architecture for AI-powered operations',
      color: colors.nebula.blue,
      planetVariant: 'operations',
    },
    {
      id: 'moonsignal',
      name: 'MoonSignal',
      description: 'Algotrading and signal machine with AI playbooks',
      color: colors.nebula.purple,
      planetVariant: 'financial',
    },
    {
      id: 'guardian',
      name: 'Guardian',
      description: 'AI companion for businesses, powering staff solutions',
      color: colors.nebula.teal,
      planetVariant: 'companion',
    },
  ];
  
  // Horizontal scroll logic using framer-motion
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const snapToProduct = (index) => {
    setCurrentIndex(index);
    // Smooth scroll to the product
    containerRef.current.scrollTo({
      left: containerRef.current.offsetWidth * index,
      behavior: 'smooth'
    });
  };
  
  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const index = Math.round(scrollPosition / itemWidth);
      
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentIndex]);
  
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Horizontal scroll container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto"
      >
        {products.map((product, index) => (
          <ProductSection 
            key={product.id}
            product={product}
            index={index}
            isEven={index % 2 === 0}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {products.map((product, index) => (
          <button
            key={`nav-${product.id}`}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white scale-100' 
                : 'bg-gray-600 scale-75'
            }`}
            onClick={() => snapToProduct(index)}
            aria-label={`Go to ${product.name}`}
          />
        ))}
      </div>
    </div>
  );
};
```

#### ProductSection
```jsx
// Individual product section with alternating layout
const ProductSection = ({ product, index, isEven, isActive }) => {
  // Apply Z-pattern layout (text-right → text-left → text-right)
  const textOnLeft = isEven;
  
  return (
    <div className="flex-shrink-0 w-full h-full snap-center">
      <div className="relative h-full w-full flex flex-col md:flex-row">
        {/* Text Column */}
        <div 
          className={`w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 ${
            textOnLeft ? 'md:order-1' : 'md:order-2'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-mono text-gray-400 uppercase">{index === 0 ? 'Core Runtime' : 'Powered by AEGIS'}</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-2 mb-4" style={{ color: product.color }}>{product.name}</h2>
            <p className="text-xl text-gray-300 mb-8">{product.description}</p>
            
            {/* Feature bullets with orbital styling */}
            <FeatureBullets productId={product.id} color={product.color} />
            
            {/* CTA button */}
            <button 
              className="px-6 py-3 rounded-full font-medium text-black mt-8 transition-all"
              style={{ 
                background: `linear-gradient(135deg, ${product.color} 0%, ${adjustColor(product.color, -20)} 100%)`,
                boxShadow: `0 4px 20px ${product.color}30`
              }}
            >
              Learn More
            </button>
          </motion.div>
        </div>
        
        {/* Visual Column */}
        <div 
          className={`w-full md:w-1/2 flex items-center justify-center ${
            textOnLeft ? 'md:order-2' : 'md:order-1'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
            transition={{ duration: 0.7 }}
          >
            <PlanetVisualization 
              variant={product.planetVariant}
              color={product.color}
              isCore={index === 0}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
```

## 🚀 Mobile-Friendly Animation Strategy

### Performance Tiering
```javascript
// Adaptive performance based on device capabilities
const getPerformanceTier = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return 'minimal';
  
  // Check if it's a mobile device
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  // Try to get device memory (not supported in all browsers)
  const memory = navigator.deviceMemory || 4;
  
  // GPU capability detection (simplified)
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
  const gpu = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
  const isLowEndGPU = gpu.includes('Intel') || !gpu;
  
  // Determine performance tier
  if (isMobile && (memory <= 2 || isLowEndGPU)) return 'minimal';
  if (isMobile || memory <= 4 || isLowEndGPU) return 'low';
  if (memory <= 8) return 'medium';
  return 'high';
};

// Animation presets based on performance tier
const animationPresets = {
  // Highest quality animations
  high: {
    enablePostProcessing: true,
    particleDensity: 1.0,
    enableDistortion: true,
    planetDetail: 64,
    enableParallax: true,
    textAnimation: 'characters',
    enableBloom: true,
  },
  
  // Slightly reduced quality
  medium: {
    enablePostProcessing: false,
    particleDensity: 0.7,
    enableDistortion: true,
    planetDetail: 32,
    enableParallax: true,
    textAnimation: 'words',
    enableBloom: false,
  },
  
  // Significantly optimized for lower-end devices
  low: {
    enablePostProcessing: false,
    particleDensity: 0.4,
    enableDistortion: false,
    planetDetail: 16,
    enableParallax: false,
    textAnimation: 'element',
    enableBloom: false,
  },
  
  // Bare minimum for very low-end devices
  minimal: {
    enablePostProcessing: false,
    particleDensity: 0.2,
    enableDistortion: false,
    planetDetail: 8,
    enableParallax: false,
    textAnimation: 'none',
    enableBloom: false,
    // Use CSS fallbacks instead of WebGL
    useWebGL: false,
  },
};
```

### Adaptive Component Examples

#### Starfield (Mobile Optimized)
```jsx
// Adaptive starfield with performance optimizations
const StarfieldCanvas = ({ density = 1.0 }) => {
  const canvasRef = useRef(null);
  const { deviceCapabilities } = useContext(SceneContext);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const performanceProfile = deviceCapabilities.performance;
    
    // Set canvas dimensions (accounting for device pixel ratio)
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // Calculate appropriate star count based on performance profile
    const baseCount = Math.floor((window.innerWidth * window.innerHeight) / 5000);
    const adjustedCount = Math.round(baseCount * density * {
      high: 1,
      medium: 0.7,
      low: 0.4,
      minimal: 0.2
    }[performanceProfile]);
    
    // Create stars with appropriate density
    const stars = Array.from({ length: adjustedCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 * {
        high: 1,
        medium: 0.8,
        low: 0.6,
        minimal: 0.5
      }[performanceProfile],
      opacity: Math.random() * 0.5 + 0.1,
    }));
    
    // Animation setup
    let animationFrameId;
    
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, deviceCapabilities]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
```

## 📱 Implementation Roadmap

### Phase 1: Foundation (Days 1-2)
1. Set up project structure and dependencies
2. Implement SceneController and performance detection
3. Create basic CosmicBackgroundSystem with starfield
4. Build simple placeholder for AegisPlanet

### Phase 2: Hero Sequence (Days 3-5)
1. Implement full AegisPlanet with 3D and 2D versions
2. Create animation transitions between void → emergence → activation
3. Add typography animations and positioning
4. Implement ScrollIndicator component

### Phase 3: Horizontal Scroll Framework (Days 6-7)
1. Build HorizontalProductScroll container with snap points
2. Implement navigation controls and scrolling logic
3. Create PlanetVisualization component variants for products
4. Test smooth transitions between hero and horizontal scroll

### Phase 4: Product Sections (Days 8-10)
1. Implement individual ProductSection components
2. Create alternating layout system (Z-pattern)
3. Build FeatureBullets component with orbital styling
4. Add animations for product transitions

### Phase 5: Polish & Optimization (Days 11-12)
1. Performance optimization for all animations
2. Add fallbacks for low-performance devices
3. Implement accessibility features
4. Test and fine-tune on various devices

## 🎨 Visual Design Implementation Notes

1. **Nebula Imagery Integration**
   - High-res nebula images reveal at key moments (phase transitions, product changes)
   - Use CSS blend modes to seamlessly integrate with gradients
   - Optimize image loading (progressive, lazy loading)

2. **Typography System**
   - Use Editorial New/Monument Extended for headlines (or similar serif)
   - Implement consistent typographic scale and spacing
   - Add subtle animations for text reveal (character by character on high-end)

3. **UI Elements**
   - Create consistent design system for buttons, indicators
   - Use subtle glass morphism for UI surfaces
   - Maintain high contrast for readability

4. **Color Strategy**
   - Darker color scheme for main UI
   - Strategic use of bright accents for focus points
   - Consistent color coding for products

This plan creates a balanced implementation that is both visually impressive and technically sound. It emphasizes smooth transitions between sections, incorporates your nebula imagery effectively, and maintains the minimalist cosmic aesthetic while providing moments of visual richness.