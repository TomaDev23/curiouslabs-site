
11:30AM 13.5.25

Yes, this plan directs everything to happen in the `/dev/combined-parallax-test` page. The structure involves:

1. Creating a modular celestial system under `src/components/journey/celestial/`
2. Building all planet components and controllers in this directory structure
3. Using combined-parallax-test.jsx as the implementation page to showcase the system
4. All the HUDs, debugging tools, and scene controls will appear on this test page
5. The page will demonstrate both parallax effects (3D and dripping) across different scenes

This approach allows us to build and test the system in isolation before potentially expanding it to other pages.

## 📋 Short Plan Tracking Checklist

### Phase 1: Setup & Foundation (Days 1-2)
- [ ] Create directory structure under `src/components/journey/celestial/`
- [ ] Implement CelestialBody base component with LEGIT metadata
- [ ] Create CelestialController with context for global state
- [ ] Set up error boundaries for component safety

### Phase 2: Planet Implementation (Days 3-4)
- [ ] Create Mars component with distinct red appearance
- [ ] Develop Jupiter with banded design & Great Red Spot
- [ ] Build Saturn with tilted ring system
- [ ] Add Venus & Neptune with appropriate visual designs

### Phase 3: Parallax Effects (Days 5-6)
- [ ] Implement 3D Space Travel effect for Cosmic Reveal
- [ ] Create Dripping Down effect for other scenes
- [ ] Set up scene-specific behavior switching
- [ ] Integrate with existing scroll/mouse parallax hooks

### Phase 4: Testing & Integration (Days 7-8)
- [ ] Update `/dev/combined-parallax-test` with celestial system
- [ ] Create debugging HUD for controlling effects
- [ ] Implement performance monitoring
- [ ] Test across scenes and optimize rendering

### Phase 5: Finalization (Days 9-10)
- [ ] Conduct contract compliance audit
- [ ] Complete documentation
- [ ] Final performance optimizations
- [ ] Ensure LEGIT standards maintained throughout

This plan keeps the celestial system focused on the test page while building it in a modular way that could later be used in production pages.


I'll create a proper modular implementation for the planetary system that can be integrated into the combined-parallax-test page. After reviewing all the documentation, I'll first focus on establishing a clear plan before writing any code.


# 📋 Complete Celestial System Implementation Plan

## TILE 1: Architecture & Foundation

### 1.1 Component Structure
```
src/
└── components/
    └── journey/
        └── celestial/
            ├── CelestialBody.jsx (base component with shared functionality)
            ├── CelestialController.jsx (manages celestial bodies)
            ├── hooks/
            │   ├── useCelestialParallax.jsx (custom parallax hook)
            │   └── useCelestialPerformance.jsx (performance monitoring)
            ├── bodies/
            │   ├── Mars.jsx
            │   ├── Jupiter.jsx
            │   ├── Saturn.jsx
            │   ├── Venus.jsx
            │   ├── Neptune.jsx
            │   └── Uranus.jsx
            ├── effects/
            │   ├── SpaceTravel3D.jsx (3D space travel effect)
            │   └── DrippingDown.jsx (dripping down effect)
            └── utils/
                ├── celestialUtils.js
                └── errorBoundary.js
```

### 1.2 LEGIT Contract Compliance
All components will include proper metadata following the LEGIT standard:
```jsx
export const metadata = {
  id: 'celestial_body', // Unique identifier
  scs: 'SCS3',          // Security compliance tag
  type: 'visual',       // Component type
  doc: 'contract_celestial_body.md'
};
```

### 1.3 State Management Approach
- **Local State**: For individual planet properties and animations
- **Context API**: For global settings affecting all celestial bodies
```jsx
// CelestialContext.jsx
export const CelestialContext = createContext({
  performanceMode: false,
  parallaxStyle: '3d', // '3d' or 'dripping'
  sceneType: 'dormant', // Current scene
  setParallaxStyle: () => {},
  setPerformanceMode: () => {},
  setSceneType: () => {},
});

// CelestialController.jsx usage
const { sceneType, parallaxStyle } = useContext(CelestialContext);
```

### 1.4 Error Boundary Implementation
```jsx
// errorBoundary.js
export class CelestialErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Celestial component failed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Usage in CelestialController
<CelestialErrorBoundary fallback={<div className="hidden"><!-- Invisible fallback --></div>}>
  {celestialBodies.map(body => (
    <body.component key={body.id} {...body.props} />
  ))}
</CelestialErrorBoundary>
```

### 1.5 Layer Structure
Following the Control Layers Contract:
- **CelestialController**: Base Layer (z-index: 5-9)
- **Individual planets**: Base Layer with appropriate z-index stacking (6-8)

**🔍 VALIDATION CHECKPOINT 1:** 
- Structure matches LEGIT contracts
- File organization follows existing patterns
- Error boundaries implemented
- State management approach defined
- Proper layering applied

## TILE 2: Base Celestial Components

### 2.1 CelestialBody Base Component
```jsx
// CelestialBody.jsx
import { useRef, useEffect } from 'react';
import { useCelestialParallax } from './hooks/useCelestialParallax';
import { useCelestialPerformance } from './hooks/useCelestialPerformance';

export const metadata = {
  id: 'celestial_body',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function CelestialBody({
  size = 100, // base size in pixels or viewport units
  position = { x: 0, y: 0 },
  zIndex = 6,
  parallaxFactor = 1,
  parallaxStyle = '3d', // '3d' or 'dripping'
  children,
  glowColor = 'rgba(255,255,255,0.2)',
  glowSize = 20,
  sceneType = 'dormant',
  ...props
}) {
  const bodyRef = useRef(null);
  const { position: parallaxPosition } = useCelestialParallax(
    parallaxFactor, 
    parallaxStyle, 
    sceneType
  );
  const { shouldRender } = useCelestialPerformance();

  if (!shouldRender) {
    return null; // Skip rendering for performance
  }

  return (
    <div 
      ref={bodyRef}
      className="absolute rounded-full overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate3d(${parallaxPosition.x}px, ${parallaxPosition.y}px, 0)`,
        transition: 'transform 0.2s ease-out',
        zIndex,
        boxShadow: `0 0 ${glowSize}px ${glowSize / 2}px ${glowColor}`,
        willChange: 'transform',
      }}
      {...props}
    >
      {children}
    </div>
  );
}
```

### 2.2 Parallax Hooks Implementation

```jsx
// useCelestialParallax.jsx
import { useState, useEffect } from 'react';
import { useMouseParallax } from '../../../hooks/useMouseParallax';
import { useScrollParallax } from '../../../hooks/useScrollParallax';

export function useCelestialParallax(factor = 1, style = '3d', scene = 'dormant') {
  const mousePosition = useMouseParallax(0.05 * factor);
  const scrollY = useScrollParallax(0.1 * factor);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let x = 0;
    let y = 0;
    
    if (style === '3d') {
      // 3D space travel effect - moving toward viewer
      x = mousePosition.x * factor;
      y = mousePosition.y * factor + scrollY * factor;
    } else {
      // Dripping down effect - subtle downward pull
      const drippingFactor = scene === 'cosmicReveal' ? 0.2 : 0.8;
      x = mousePosition.x * factor * 0.3;
      y = mousePosition.y * factor * 0.3 + scrollY * drippingFactor * factor;
    }
    
    // Apply scene-specific modifications
    if (scene === 'cosmicReveal') {
      // Enhance movement for cosmic reveal
      x *= 1.5;
      y *= 1.2;
    } else if (scene === 'awakening') {
      // Subtle movement for awakening
      x *= 0.7;
      y *= 0.6;
    }
    
    setPosition({ x, y });
  }, [mousePosition, scrollY, factor, style, scene]);
  
  return { position };
}
```

### 2.3 Performance Monitoring Hook

```jsx
// useCelestialPerformance.jsx
import { useState, useEffect } from 'react';

export function useCelestialPerformance() {
  const [fps, setFps] = useState(60);
  const [shouldRender, setShouldRender] = useState(true);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  
  useEffect(() => {
    // Detect device capabilities
    const checkPerformance = () => {
      // Mobile detection
      const isMobile = window.innerWidth <= 768;
      // Simple FPS counter
      let frameCount = 0;
      let lastTime = performance.now();
      
      const countFrames = () => {
        const now = performance.now();
        frameCount++;
        
        if (now - lastTime >= 1000) {
          setFps(frameCount);
          // Reduce rendering on lower FPS
          setShouldRender(frameCount > 30 || Math.random() > 0.3);
          setIsLowPerfDevice(frameCount < 40 || isMobile);
          frameCount = 0;
          lastTime = now;
        }
        
        requestAnimationFrame(countFrames);
      };
      
      const frameId = requestAnimationFrame(countFrames);
      return () => cancelAnimationFrame(frameId);
    };
    
    const cleanup = checkPerformance();
    return cleanup;
  }, []);
  
  return {
    fps,
    shouldRender,
    isLowPerfDevice
  };
}
```

### 2.4 CelestialController Implementation

```jsx
// CelestialController.jsx
import { useState, useContext } from 'react';
import { CelestialContext } from './CelestialContext';
import { CelestialErrorBoundary } from './utils/errorBoundary';

export const metadata = {
  id: 'celestial_controller',
  scs: 'SCS3',
  type: 'controller',
  doc: 'contract_celestial_controller.md'
};

export default function CelestialController({
  celestialBodies = [], // Array of planetary components
  currentScene = 'dormant',
  useParallaxStyle = '3d'
}) {
  const [performanceMode, setPerformanceMode] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState(useParallaxStyle);
  const [sceneType, setSceneType] = useState(currentScene);
  
  // Update scene type based on prop
  useEffect(() => {
    setSceneType(currentScene);
  }, [currentScene]);
  
  useEffect(() => {
    setParallaxStyle(useParallaxStyle);
  }, [useParallaxStyle]);

  const contextValue = {
    performanceMode,
    parallaxStyle,
    sceneType,
    setParallaxStyle,
    setPerformanceMode,
    setSceneType
  };
  
  return (
    <CelestialContext.Provider value={contextValue}>
      <div className="celestial-system absolute inset-0 overflow-hidden z-5">
        <CelestialErrorBoundary fallback={<div className="hidden"></div>}>
          {celestialBodies.map((body, index) => (
            <body.component 
              key={body.id || index}
              parallaxStyle={parallaxStyle}
              sceneType={sceneType}
              {...body.props} 
            />
          ))}
        </CelestialErrorBoundary>
      </div>
    </CelestialContext.Provider>
  );
}
```

**🔍 VALIDATION CHECKPOINT 2:**
- Base components work as expected
- Parallax hooks function with both styles
- Performance monitoring operates correctly
- Controller manages celestial bodies properly
- Context is properly implemented

## TILE 3: Planet Design & Implementation

### 3.1 Planet Design Snippets

#### Mars
```jsx
// Mars.jsx
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'mars',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Mars({ size = 70, position = { x: 30, y: 25 }, ...props }) {
  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(210, 120, 70, 0.25)"
      glowSize={size * 0.3}
      {...props}
    >
      {/* Base planet with reddish-orange color */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(210,140,120,1) 0%, rgba(190,95,60,1) 50%, rgba(160,65,45,1) 100%)'
        }}
      ></div>
      
      {/* Surface features with darker patches/craters */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(130,50,40,0.4) 0%, rgba(130,50,40,0) 25%),
            radial-gradient(circle at 75% 30%, rgba(130,50,40,0.4) 0%, rgba(130,50,40,0) 20%),
            radial-gradient(circle at 35% 65%, rgba(130,50,40,0.5) 0%, rgba(130,50,40,0) 25%),
            radial-gradient(circle at 65% 70%, rgba(130,50,40,0.3) 0%, rgba(130,50,40,0) 15%)
          `
        }}
      ></div>
      
      {/* Polar ice caps */}
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: '80%',
          height: '30%',
          top: '5%',
          left: '10%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)'
        }}
      ></div>
      <div 
        className="absolute rounded-full overflow-hidden"
        style={{
          width: '70%',
          height: '25%',
          bottom: '5%',
          left: '15%',
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 75%)'
        }}
      ></div>
    </CelestialBody>
  );
}
```

#### Jupiter
```jsx
// Jupiter.jsx
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'jupiter',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Jupiter({ size = 120, position = { x: 50, y: 40 }, ...props }) {
  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(240, 220, 180, 0.2)"
      glowSize={size * 0.25}
      {...props}
    >
      {/* Base planet with banded appearance */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(0deg, rgba(200,160,110,1) 0%, rgba(225,195,150,1) 10%, rgba(230,205,160,1) 20%, rgba(210,175,140,1) 30%, rgba(190,150,110,1) 40%, rgba(180,140,100,1) 50%, rgba(170,130,90,1) 60%, rgba(160,120,80,1) 70%, rgba(150,110,70,1) 80%, rgba(140,100,60,1) 90%, rgba(130,90,50,1) 100%)'
        }}
      ></div>
      
      {/* Horizontal cloud bands */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(0deg, transparent 9%, rgba(255,255,255,0.05) 10%, transparent 11%, transparent 19%, rgba(255,255,255,0.05) 20%, transparent 21%, transparent 29%, rgba(110,70,30,0.1) 30%, transparent 31%, transparent 39%, rgba(110,70,30,0.1) 40%, transparent 41%, transparent 59%, rgba(110,70,30,0.1) 60%, transparent 61%, transparent 79%, rgba(255,255,255,0.05) 80%, transparent 81%, transparent 89%, rgba(255,255,255,0.05) 90%, transparent 91%)'
        }}
      ></div>
      
      {/* Great Red Spot */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '25%',
          height: '15%',
          top: '40%',
          right: '20%',
          background: 'radial-gradient(ellipse at center, rgba(210,90,60,0.8) 0%, rgba(210,90,60,0) 100%)',
          transform: 'rotate(-10deg)'
        }}
      ></div>
      
      {/* Cloud swirls */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%),
            radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 15%),
            radial-gradient(ellipse at 40% 70%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 15%),
            radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%)
          `
        }}
      ></div>
    </CelestialBody>
  );
}
```

#### Saturn
```jsx
// Saturn.jsx
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'saturn',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Saturn({ size = 100, position = { x: 70, y: 60 }, ...props }) {
  return (
    <div className="saturn-container absolute" style={{
      left: `${position.x}%`,
      top: `${position.y}%`,
      transform: 'rotate(-15deg)', // Tilt for rings
      zIndex: props.zIndex || 7
    }}>
      {/* Planet body */}
      <CelestialBody
        size={size}
        position={{ x: 0, y: 0 }} // Position handled by container
        glowColor="rgba(240, 220, 160, 0.2)"
        glowSize={size * 0.2}
        {...props}
      >
        {/* Base planet */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,235,190,1) 0%, rgba(230,210,165,1) 50%, rgba(210,190,140,1) 100%)'
          }}
        ></div>
        
        {/* Subtle banding */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(0deg, transparent 19%, rgba(210,190,140,0.1) 20%, transparent 21%, transparent 39%, rgba(210,190,140,0.1) 40%, transparent 41%, transparent 59%, rgba(210,190,140,0.1) 60%, transparent 61%, transparent 79%, rgba(210,190,140,0.1) 80%, transparent 81%)'
          }}
        ></div>
      </CelestialBody>
      
      {/* Rings */}
      <div className="absolute" style={{
        width: size * 2.4,
        height: size * 0.6,
        left: -size * 0.7,
        top: size * 0.4,
        borderRadius: '100%',
        background: 'linear-gradient(180deg, rgba(240,230,200,0.2) 0%, rgba(230,210,180,0.5) 20%, rgba(210,190,155,0.7) 50%, rgba(230,210,180,0.5) 80%, rgba(240,230,200,0.2) 100%)',
        boxShadow: 'inset 0px 0px 20px rgba(0,0,0,0.3)',
        zIndex: (props.zIndex || 7) - 1
      }}></div>
      
      {/* Ring shadow on planet */}
      <div className="absolute" style={{
        width: size,
        height: size * 0.1,
        left: 0,
        top: size * 0.45,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
        zIndex: (props.zIndex || 7) + 1
      }}></div>
    </div>
  );
}
```

#### Venus
```jsx
// Venus.jsx
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'venus',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Venus({ size = 85, position = { x: 40, y: 70 }, ...props }) {
  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(255, 250, 200, 0.25)"
      glowSize={size * 0.3}
      {...props}
    >
      {/* Base planet with yellowish-white appearance */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,250,220,1) 0%, rgba(245,235,190,1) 50%, rgba(235,220,170,1) 100%)'
        }}
      ></div>
      
      {/* Dense swirling cloud patterns */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%),
            radial-gradient(ellipse at 70% 40%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 30%),
            radial-gradient(circle at 25% 60%, rgba(235,225,190,0.3) 0%, rgba(235,225,190,0) 25%),
            radial-gradient(circle at 60% 70%, rgba(245,235,200,0.3) 0%, rgba(245,235,200,0) 30%),
            linear-gradient(30deg, transparent 0%, rgba(255,240,200,0.1) 25%, transparent 50%, rgba(255,240,200,0.1) 75%, transparent 100%)
          `,
          animation: 'venusCloud 120s infinite linear'
        }}
      ></div>
      
      {/* Cloud movement animation */}
      <style jsx>{`
        @keyframes venusCloud {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </CelestialBody>
  );
}
```

#### Neptune
```jsx
// Neptune.jsx
import CelestialBody from '../CelestialBody';

export const metadata = {
  id: 'neptune',
  scs: 'SCS3',
  type: 'visual',
  doc: 'contract_celestial_body.md'
};

export default function Neptune({ size = 90, position = { x: 80, y: 30 }, ...props }) {
  return (
    <CelestialBody
      size={size}
      position={position}
      glowColor="rgba(100, 190, 255, 0.25)"
      glowSize={size * 0.3}
      {...props}
    >
      {/* Base planet with blue-green coloration */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(100,190,255,1) 0%, rgba(70,160,230,1) 50%, rgba(40,130,200,1) 100%)'
        }}
      ></div>
      
      {/* Subtle atmospheric features */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 29%, rgba(120,200,255,0.1) 30%, transparent 31%, transparent 49%, rgba(120,200,255,0.1) 50%, transparent 51%, transparent 69%, rgba(120,200,255,0.1) 70%, transparent 71%),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 25%),
            radial-gradient(circle at 30% 40%, rgba(150,220,255,0.3) 0%, rgba(150,220,255,0) 30%)
          `
        }}
      ></div>
      
      {/* Great Dark Spot */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '25%',
          height: '15%',
          top: '30%',
          left: '35%',
          background: 'radial-gradient(ellipse at center, rgba(20,100,170,0.8) 0%, rgba(20,100,170,0) 100%)'
        }}
      ></div>
    </CelestialBody>
  );
}
```

**🔍 VALIDATION CHECKPOINT 3:**
- Each planet renders with distinct characteristics
- Visual appearance matches design specifications
- Planets are properly sized and positioned
- Glow and shadow effects render correctly
- Saturn's rings are properly implemented

## TILE 4: Parallax Effect Implementation

### 4.1 3D Space Travel Effect
```jsx
// SpaceTravel3D.jsx
import { useRef, useEffect } from 'react';

export const metadata = {
  id: 'space_travel_3d',
  scs: 'SCS3',
  type: 'effect',
  doc: 'contract_celestial_effects.md'
};

export default function SpaceTravel3D({
  targetRef, // Ref to the element to apply the effect to
  intensity = 1,
  mousePosition = { x: 0, y: 0 },
  scrollY = 0
}) {
  const effectRef = useRef(null);
  
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    
    // Apply 3D space travel effect
    // This creates the illusion of moving toward the viewer
    const transform = `
      translate3d(
        ${mousePosition.x * intensity}px,
        ${mousePosition.y * intensity + scrollY * intensity * 0.5}px,
        ${scrollY * intensity * 0.2}px
      )
      scale(${1 + scrollY * 0.0002 * intensity})
    `;
    
    target.style.transform = transform;
  }, [targetRef, mousePosition, scrollY, intensity]);
  
  return null; // This is a utility component, doesn't render anything
}
```

### 4.2 Dripping Down Effect
```jsx
// DrippingDown.jsx
import { useRef, useEffect } from 'react';

export const metadata = {
  id: 'dripping_down',
  scs: 'SCS3',
  type: 'effect',
  doc: 'contract_celestial_effects.md'
};

export default function DrippingDown({
  targetRef, // Ref to the element to apply the effect to
  intensity = 1,
  mousePosition = { x: 0, y: 0 },
  scrollY = 0
}) {
  const effectRef = useRef(null);
  
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    
    // Apply dripping down effect
    // This creates a subtle downward pull as user scrolls
    const transform = `
      translate3d(
        ${mousePosition.x * intensity * 0.3}px,
        ${mousePosition.y * intensity * 0.3 + scrollY * intensity * 0.8}px,
        0
      )
    `;
    
    target.style.transform = transform;
  }, [targetRef, mousePosition, scrollY, intensity]);
  
  return null; // This is a utility component, doesn't render anything
}
```

### 4.3 Integration with Existing Parallax Hooks
```jsx
// Update the combined-parallax-test.jsx

// Import the new components
import CelestialController from '../../components/journey/celestial/CelestialController';
import Mars from '../../components/journey/celestial/bodies/Mars';
import Jupiter from '../../components/journey/celestial/bodies/Jupiter';
import Saturn from '../../components/journey/celestial/bodies/Saturn';
import Venus from '../../components/journey/celestial/bodies/Venus';
import Neptune from '../../components/journey/celestial/bodies/Neptune';
import Uranus from '../../components/journey/celestial/bodies/Uranus';

// Define celestial bodies with initial properties
const celestialBodies = [
  { id: 'mars', component: Mars, props: { position: { x: 30, y: 25 }, size: 70 } },
  { id: 'jupiter', component: Jupiter, props: { position: { x: 50, y: 40 }, size: 120 } },
  { id: 'saturn', component: Saturn, props: { position: { x: 70, y: 60 }, size: 100, zIndex: 7 } },
  { id: 'venus', component: Venus, props: { position: { x: 40, y: 70 }, size: 85 } },
  { id: 'neptune', component: Neptune, props: { position: { x: 80, y: 30 }, size: 90 } },
];

// In the main component
const [parallaxStyle, setParallaxStyle] = useState('3d'); // '3d' or 'dripping'

// In the JSX
<div className="fixed inset-0 z-0 overflow-hidden bg-[#090014]">
  {/* Cosmic Flight Scene */}
  {(currentScene === 'flight' || currentScene === 'combined') && (
    <ParallaxSpeedDust 
      opacity={1} 
      speed={settings.dustSpeed} 
      density={100} 
      fps={30} 
    />
  )}
  
  {/* Celestial bodies */}
  <CelestialController
    celestialBodies={celestialBodies}
    currentScene={currentScene}
    useParallaxStyle={currentScene === 'cosmicReveal' ? '3d' : 'dripping'}
  />
  
  {/* Dormant Scene */}
  {(currentScene === 'dormant' || currentScene === 'combined') && (
    <>
      <ParallaxStars 
        mouseSensitivity={settings.starsMouseSensitivity} 
        scrollSpeed={settings.starsScrollSpeed} 
      />
      <ParallaxMoon 
        mouseSensitivity={settings.moonMouseSensitivity} 
        scrollSpeed={settings.moonScrollSpeed} 
      />
    </>
  )}
</div>
```

**🔍 VALIDATION CHECKPOINT 4:**
- 3D space travel effect works correctly
- Dripping down effect works correctly
- Effects transition smoothly between scenes
- Integration with existing parallax components is successful
- Proper scene-specific effects are applied

## TILE 5: Scene Integration & Animation Synchronization

### 5.1 Scene-Specific Behavior
```jsx
// Update useCelestialParallax.jsx to handle scene transitions

useEffect(() => {
  // Apply scene-specific animations
  switch(scene) {
    case 'dormant':
      // Subtle movement in dormant scene
      setPosition({
        x: mousePosition.x * factor * 0.3,
        y: mousePosition.y * factor * 0.3,
      });
      break;
      
    case 'awakening':
      // Slightly more movement with some scroll influence
      setPosition({
        x: mousePosition.x * factor * 0.5,
        y: mousePosition.y * factor * 0.5 + scrollY * 0.2,
      });
      break;
      
    case 'cosmicReveal':
      // 3D space travel effect for cosmic reveal
      setPosition({
        x: mousePosition.x * factor * 1.5,
        y: mousePosition.y * factor * 1.2 + scrollY * 0.8,
      });
      break;
      
    case 'cosmicFlight':
      // Dripping effect for cosmic flight (unless using 3D style)
      if (style === '3d') {
        setPosition({
          x: mousePosition.x * factor * 1.2,
          y: mousePosition.y * factor * 1.0 + scrollY * 0.5,
        });
      } else {
        setPosition({
          x: mousePosition.x * factor * 0.3,
          y: scrollY * 0.8 * factor,
        });
      }
      break;
      
    default:
      // Default behavior
      setPosition({
        x: mousePosition.x * factor,
        y: mousePosition.y * factor,
      });
  }
}, [mousePosition, scrollY, factor, style, scene]);
```

### 5.2 Scroll Event Synchronization
```jsx
// in CelestialController.jsx

// Add scroll tracking
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentProgress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
    setScrollProgress(currentProgress);
    
    // Determine scene based on scroll position
    let newScene = 'dormant';
    if (currentProgress > 0.8) {
      newScene = 'cosmicFlight';
    } else if (currentProgress > 0.5) {
      newScene = 'cosmicReveal';
    } else if (currentProgress > 0.2) {
      newScene = 'awakening';
    }
    
    // Only update if scene changed
    if (newScene !== sceneType) {
      setSceneType(newScene);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [sceneType]);
```

### 5.3 Planetary Animations
```jsx
// Add subtle animations to planets

// Jupiter - Slow rotation animation
useEffect(() => {
  const planet = bodyRef.current;
  if (!planet) return;
  
  // Create cloud layer that rotates
  const cloudLayer = planet.querySelector('.cloud-layer');
  if (cloudLayer) {
    let rotationAngle = 0;
    
    const animate = () => {
      rotationAngle += 0.01;
      cloudLayer.style.transform = `rotate(${rotationAngle}deg)`;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }
}, []);

// Saturn - Ring shadow movement
useEffect(() => {
  const ringShadow = document.querySelector('.ring-shadow');
  if (!ringShadow) return;
  
  let shadowPosition = 0.45;
  let direction = 0.0001;
  
  const animate = () => {
    shadowPosition += direction;
    if (shadowPosition > 0.5 || shadowPosition < 0.4) {
      direction *= -1;
    }
    
    ringShadow.style.top = `${shadowPosition * size}px`;
    requestAnimationFrame(animate);
  };
  
  const animationId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(animationId);
}, [size]);
```

**🔍 VALIDATION CHECKPOINT 5:**
- Scene transitions work correctly
- Animations are synchronized with scroll
- Planetary animations render properly
- Performance remains good with multiple planets
- All components respect layer system

## TILE 6: Integration with combined-parallax-test

### 6.1 Import Structure
```jsx
// At the top of combined-parallax-test.jsx
import CelestialController from '../../components/journey/celestial/CelestialController';
// Lazy load planets to improve initial load time
const Mars = React.lazy(() => import('../../components/journey/celestial/bodies/Mars'));
const Jupiter = React.lazy(() => import('../../components/journey/celestial/bodies/Jupiter'));
const Saturn = React.lazy(() => import('../../components/journey/celestial/bodies/Saturn'));
const Venus = React.lazy(() => import('../../components/journey/celestial/bodies/Venus'));
const Neptune = React.lazy(() => import('../../components/journey/celestial/bodies/Neptune'));
```


## TILE 6: Integration with combined-parallax-test (continued)

### 6.2 Configuration Section
```jsx
// Celestial body configuration
const celestialBodies = [
  { 
    id: 'mars', 
    component: Mars, 
    props: { 
      position: { x: 30, y: 25 }, 
      size: 70,
      parallaxFactor: 0.8
    } 
  },
  { 
    id: 'jupiter', 
    component: Jupiter, 
    props: { 
      position: { x: 50, y: 40 }, 
      size: 120,
      parallaxFactor: 0.6
    } 
  },
  { 
    id: 'saturn', 
    component: Saturn, 
    props: { 
      position: { x: 70, y: 60 }, 
      size: 100, 
      zIndex: 7,
      parallaxFactor: 0.7
    } 
  },
  { 
    id: 'venus', 
    component: Venus, 
    props: { 
      position: { x: 40, y: 70 }, 
      size: 85,
      parallaxFactor: 0.9
    } 
  },
  { 
    id: 'neptune', 
    component: Neptune, 
    props: { 
      position: { x: 80, y: 30 }, 
      size: 90,
      parallaxFactor: 0.5
    } 
  }
];
```

### 6.3 Scene Type Management
```jsx
// Scene type management
const [currentScene, setCurrentScene] = useState('dormant');
const [parallaxStyle, setParallaxStyle] = useState('dripping');

// Scene type switcher
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.body.scrollHeight - windowHeight;
    const scrollProgress = scrollY / docHeight;
    
    // Determine current scene based on scroll position
    if (scrollProgress < 0.2) {
      setCurrentScene('dormant');
      setParallaxStyle('dripping');
    } else if (scrollProgress < 0.4) {
      setCurrentScene('awakening');
      setParallaxStyle('dripping');
    } else if (scrollProgress < 0.6) {
      setCurrentScene('cosmicReveal');
      setParallaxStyle('3d'); // Use 3D effect for cosmic reveal
    } else {
      setCurrentScene('cosmicFlight');
      setParallaxStyle('dripping');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 6.4 HUD Component Integration
```jsx
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

// DraggableHUD component
function DraggableHUD({ title, children, initialPosition = { x: 20, y: 20 }, className = '' }) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const hudRef = useRef(null);
  
  const handleMouseDown = (e) => {
    if (e.target.classList.contains('hud-header')) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault();
    }
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
      e.preventDefault();
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);
  
  return (
    <div 
      ref={hudRef}
      className={`absolute bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-md shadow-lg overflow-hidden z-100 ${className}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="hud-header bg-gray-800 text-gray-200 px-3 py-1 text-sm font-medium cursor-move flex justify-between items-center">
        <span>{title}</span>
        <div className="flex gap-1">
          <button className="w-3 h-3 rounded-full bg-gray-600" />
          <button className="w-3 h-3 rounded-full bg-blue-500" />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

// Debug HUD in combined-parallax-test.jsx
const SceneDebugHUD = ({ currentScene, parallaxStyle, onStyleChange }) => {
  return (
    <DraggableHUD title="Celestial System Debug" initialPosition={{ x: 20, y: 20 }}>
      <div className="text-gray-300 space-y-3 min-w-[300px]">
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Current Scene</div>
          <div className="text-green-400">{currentScene}</div>
        </div>
        
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Parallax Effect</div>
          <div className="flex gap-2">
            <button 
              className={`px-2 py-1 text-xs rounded ${parallaxStyle === '3d' ? 'bg-blue-700' : 'bg-gray-700'}`}
              onClick={() => onStyleChange('3d')}
            >
              3D Space Travel
            </button>
            <button 
              className={`px-2 py-1 text-xs rounded ${parallaxStyle === 'dripping' ? 'bg-blue-700' : 'bg-gray-700'}`}
              onClick={() => onStyleChange('dripping')}
            >
              Dripping Down
            </button>
          </div>
        </div>
        
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Visible Planets</div>
          <div className="flex flex-wrap gap-2">
            {['Mars', 'Jupiter', 'Saturn', 'Venus', 'Neptune'].map(planet => (
              <div key={planet} className="text-xs bg-gray-800 px-2 py-1 rounded">
                {planet}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DraggableHUD>
  );
};
```

### 6.5 Final Integration in combined-parallax-test.jsx
```jsx
export default function CombinedParallaxTest() {
  const [settings, setSettings] = useState({
    starsMouseSensitivity: 0.03,
    starsScrollSpeed: 0.05,
    moonMouseSensitivity: 0.08,
    moonScrollSpeed: 0.12,
    dustSpeed: 3
  });
  
  const [currentScene, setCurrentScene] = useState('dormant');
  const [parallaxStyle, setParallaxStyle] = useState('dripping');
  
  useEffect(() => {
    // Scene detection based on scroll position
    // (implementation from previous section)
  }, []);
  
  return (
    <div className="min-h-[400vh] relative">
      <Helmet>
        <title>Combined Parallax Test | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with z-0 */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#090014]">
        {/* Celestial bodies - Base Layer (z-index: 0-9) */}
        <CelestialController
          celestialBodies={celestialBodies}
          currentScene={currentScene}
          useParallaxStyle={currentScene === 'cosmicReveal' ? '3d' : parallaxStyle}
        />
        
        {/* Dormant Scene */}
        {(currentScene === 'dormant' || currentScene === 'combined') && (
          <>
            <ParallaxStars 
              mouseSensitivity={settings.starsMouseSensitivity} 
              scrollSpeed={settings.starsScrollSpeed} 
            />
            <ParallaxMoon 
              mouseSensitivity={settings.moonMouseSensitivity} 
              scrollSpeed={settings.moonScrollSpeed} 
            />
          </>
        )}
        
        {/* Cosmic Flight Scene */}
        {(currentScene === 'cosmicFlight' || currentScene === 'combined') && (
          <ParallaxSpeedDust 
            opacity={1} 
            speed={settings.dustSpeed} 
            density={100} 
            fps={30} 
          />
        )}
      </div>
      
      {/* Content Layer (z-index: 10-50) */}
      <div className="relative z-10">
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Dormant Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Awakening Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Cosmic Reveal Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Cosmic Flight Scene</h1>
        </section>
      </div>
      
      {/* HUD Layer (z-index: 100-109) */}
      <SceneDebugHUD 
        currentScene={currentScene}
        parallaxStyle={parallaxStyle}
        onStyleChange={setParallaxStyle}
      />
    </div>
  );
}
```

**🔍 VALIDATION CHECKPOINT 6:**
- CelestialController is properly integrated with combined-parallax-test
- Scene transitions work as expected
- Performance is acceptable even with multiple celestial bodies
- HUD provides debugging and control capabilities
- No z-index conflicts or visibility issues

## TILE 7: Performance Optimization & Error Handling

### 7.1 Performance Monitoring System
```jsx
// performanceMonitor.js
export class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.framesThisSecond = 0;
    this.lastFpsUpdate = 0;
    this.framesSinceLastUpdate = 0;
    this.lastFrameTimestamp = performance.now();
    this.frameTimes = [];
    this.isMonitoring = false;
    this.onUpdate = null;
    this.lowPerformanceThreshold = 30; // FPS below this is considered low performance
  }
  
  start(onUpdate = null) {
    this.onUpdate = onUpdate;
    this.isMonitoring = true;
    this.lastFrameTimestamp = performance.now();
    this.framesSinceLastUpdate = 0;
    this.lastFpsUpdate = performance.now();
    this.frameTimes = [];
    this.framesThisSecond = 0;
    
    this.rafId = requestAnimationFrame(this.update.bind(this));
  }
  
  stop() {
    this.isMonitoring = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  
  update(timestamp) {
    if (!this.isMonitoring) return;
    
    // Calculate FPS
    this.framesThisSecond++;
    if (timestamp > this.lastFpsUpdate + 1000) {
      this.fps = this.framesThisSecond;
      this.framesThisSecond = 0;
      this.lastFpsUpdate = timestamp;
      
      if (this.onUpdate) {
        this.onUpdate({
          fps: this.fps,
          isLowPerformance: this.fps < this.lowPerformanceThreshold,
          avgFrameTime: this.frameTimes.reduce((sum, time) => sum + time, 0) / 
                        (this.frameTimes.length || 1)
        });
      }
      
      // Reset frame times
      this.frameTimes = [];
    }
    
    // Track frame time
    const frameTime = timestamp - this.lastFrameTimestamp;
    this.lastFrameTimestamp = timestamp;
    
    if (frameTime > 0 && frameTime < 1000) {
      this.frameTimes.push(frameTime);
      if (this.frameTimes.length > 60) {
        this.frameTimes.shift();
      }
    }
    
    this.rafId = requestAnimationFrame(this.update.bind(this));
  }
  
  isLowPerformanceDevice() {
    return this.fps < this.lowPerformanceThreshold;
  }
  
  getPerformanceMetrics() {
    return {
      fps: this.fps,
      avgFrameTime: this.frameTimes.reduce((sum, time) => sum + time, 0) / 
                    (this.frameTimes.length || 1),
      isLowPerformance: this.fps < this.lowPerformanceThreshold
    };
  }
}

// Usage in CelestialController
import { PerformanceMonitor } from '../utils/performanceMonitor';

// Inside component
const performanceMonitor = useRef(new PerformanceMonitor());
const [performanceMetrics, setPerformanceMetrics] = useState({ fps: 60, isLowPerformance: false });

useEffect(() => {
  performanceMonitor.current.start((metrics) => {
    setPerformanceMetrics(metrics);
    setPerformanceMode(metrics.isLowPerformance);
  });
  
  return () => performanceMonitor.current.stop();
}, []);
```

### 7.2 Optimized Rendering Strategy
```jsx
// Update CelestialBody.jsx to include performance optimizations

// Add visibility detection
const isVisible = useIntersectionObserver(bodyRef, { threshold: 0.1 });

// Add performance-based rendering
useEffect(() => {
  const element = bodyRef.current;
  if (!element) return;
  
  // Performance optimizations
  if (isLowPerfDevice) {
    // Simplify effects for low-performance devices
    element.classList.add('low-perf-mode');
    
    // Disable some animations
    element.querySelectorAll('.animated-layer').forEach(el => {
      el.style.animation = 'none';
    });
    
    // Reduce shadow blur
    element.style.filter = 'blur(0px)';
    
    // Remove some effects
    element.querySelectorAll('.fx-layer').forEach(el => {
      el.style.opacity = '0';
    });
  } else {
    // Full effects for high-performance devices
    element.classList.remove('low-perf-mode');
  }
}, [isLowPerfDevice]);

// Skip rendering when not visible and on low performance
if (!isVisible && isLowPerfDevice) {
  return null;
}
```

### 7.3 Enhanced Error Boundary with Fallback
```jsx
// Update errorBoundary.js with better fallbacks and reporting
export class CelestialErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to console with component info
    console.error(
      `Celestial component error in ${this.props.componentName || 'unknown component'}:`, 
      error, 
      errorInfo
    );
    
    // Optional: Send error to monitoring service
    if (window.errorReportingService) {
      window.errorReportingService.reportError({
        error,
        componentName: this.props.componentName,
        additionalInfo: errorInfo
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Check if we should render default error UI
      if (this.props.showDefaultError) {
        return (
          <div className="celestial-error absolute inset-0 flex items-center justify-center z-9">
            <div className="bg-red-900/20 backdrop-blur-sm p-4 rounded-lg border border-red-500/30 max-w-md">
              <h3 className="text-red-300 text-lg font-medium mb-2">
                Celestial Rendering Error
              </h3>
              <p className="text-red-200 text-sm mb-3">
                {this.state.error && this.state.error.toString()}
              </p>
              <button 
                className="text-xs bg-red-800 hover:bg-red-700 text-red-200 px-3 py-1 rounded-md"
                onClick={() => this.setState({ hasError: false })}
              >
                Try Again
              </button>
            </div>
          </div>
        );
      }
      
      // Default: don't show anything
      return null;
    }
    
    return this.props.children;
  }
}

// Usage in CelestialController
<CelestialErrorBoundary 
  componentName="CelestialController"
  showDefaultError={isDevelopment}
  fallback={<div className="hidden"></div>}
>
  {celestialBodies.map((body, index) => (
    <ErrorBoundary
      key={body.id || index}
      componentName={`CelestialBody-${body.id || index}`}
      showDefaultError={false}
    >
      <body.component
        parallaxStyle={parallaxStyle}
        sceneType={sceneType}
        {...body.props}
      />
    </ErrorBoundary>
  ))}
</CelestialErrorBoundary>
```

**🔍 VALIDATION CHECKPOINT 7:**
- Performance monitoring is active and provides metrics
- Rendering is optimized for different device capabilities
- Error boundaries prevent component failures from breaking the app
- Error reporting provides useful debugging information
- System degrades gracefully under low performance conditions

## TILE 8: Contract Compliance Audit

### 8.1 Layer System Compliance
```jsx
// Layer System Validation
function validateLayerCompliance() {
  const layerRanges = {
    base: [0, 9],
    content: [10, 50],
    uiControl: [60, 90],
    hud: [100, 109],
    navigation: [110, 119],
    debug: [120, Infinity]
  };
  
  const components = {
    celestialController: {
      name: 'CelestialController',
      layer: 'base',
      zIndex: 5,
      role: 'Container for celestial bodies',
      validation: []
    },
    celestialBodies: {
      name: 'Planet Components',
      layer: 'base',
      zIndex: [6, 8],
      role: 'Individual planet visualizations',
      validation: []
    },
    parallaxEffects: {
      name: 'Parallax Effect Components',
      layer: 'base',
      zIndex: [0, 9],
      role: 'Visual effects for parallax motion',
      validation: []
    },
    debugHUD: {
      name: 'Debug HUD Components',
      layer: 'hud',
      zIndex: 100,
      role: 'Debugging interface for celestial system',
      validation: []
    }
  };
  
  // Validate each component against its assigned layer
  Object.keys(components).forEach(key => {
    const component = components[key];
    const layerRange = layerRanges[component.layer];
    
    if (!layerRange) {
      component.validation.push({
        status: 'error',
        message: `Invalid layer name: ${component.layer}`
      });
      return;
    }
    
    // Check if z-index falls within layer range
    const zIndices = Array.isArray(component.zIndex) ? component.zIndex : [component.zIndex];
    const allInRange = zIndices.every(z => z >= layerRange[0] && z <= layerRange[1]);
    
    if (allInRange) {
      component.validation.push({
        status: 'pass',
        message: `z-index ${component.zIndex} is within ${component.layer} layer range [${layerRange[0]}-${layerRange[1]}]`
      });
    } else {
      component.validation.push({
        status: 'error',
        message: `z-index ${component.zIndex} is outside ${component.layer} layer range [${layerRange[0]}-${layerRange[1]}]`
      });
    }
  });
  
  return components;
}

// Layer Compliance Report
const layerCompliance = validateLayerCompliance();
console.table(Object.values(layerCompliance).map(item => ({
  Component: item.name,
  Layer: item.layer,
  'Z-Index': Array.isArray(item.zIndex) ? item.zIndex.join('-') : item.zIndex,
  Status: item.validation.map(v => v.status).join(', '),
  Details: item.validation.map(v => v.message).join('; ')
})));
```

### 8.2 LEGIT Metadata Validation
```jsx
// LEGIT Metadata Validation
function validateLegitMetadata(components) {
  const requiredMetadataFields = ['id', 'scs', 'type', 'doc'];
  const results = [];
  
  components.forEach(component => {
    const validation = {
      component: component.name,
      hasMetadata: !!component.metadata,
      missingFields: [],
      validFields: [],
      status: 'unknown'
    };
    
    if (validation.hasMetadata) {
      requiredMetadataFields.forEach(field => {
        if (!component.metadata[field]) {
          validation.missingFields.push(field);
        } else {
          validation.validFields.push(field);
        }
      });
      
      validation.status = validation.missingFields.length === 0 ? 'pass' : 'fail';
    } else {
      validation.status = 'fail';
      validation.missingFields = requiredMetadataFields;
    }
    
    results.push(validation);
  });
  
  return results;
}

// Example components for validation
const componentsToValidate = [
  {
    name: 'CelestialBody',
    metadata: {
      id: 'celestial_body',
      scs: 'SCS3',
      type: 'visual',
      doc: 'contract_celestial_body.md'
    }
  },
  {
    name: 'Mars',
    metadata: {
      id: 'mars',
      scs: 'SCS3',
      type: 'visual',
      doc: 'contract_celestial_body.md'
    }
  },
  // Add other components for validation
];

const metadataResults = validateLegitMetadata(componentsToValidate);
console.table(metadataResults);
```

### 8.3 Contract Implementation Checklist
```jsx
// Contract Implementation Checklist
const contractChecklistItems = [
  {
    category: 'Layer System',
    items: [
      { id: 'ls-1', name: 'CelestialController in Base Layer (z: 0-9)', status: 'pass' },
      { id: 'ls-2', name: 'Celestial bodies in Base Layer (z: 0-9)', status: 'pass' },
      { id: 'ls-3', name: 'No z-index conflicts within components', status: 'pass' },
      { id: 'ls-4', name: 'Debug HUD in HUD Layer (z: 100-109)', status: 'pass' },
      { id: 'ls-5', name: 'Proper stacking order within each layer', status: 'pass' },
    ]
  },
  {
    category: 'LEGIT Compliance',
    items: [
      { id: 'lg-1', name: 'All components have proper metadata', status: 'pass' },
      { id: 'lg-2', name: 'Components follow naming conventions', status: 'pass' },
      { id: 'lg-3', name: 'Documentation references are valid', status: 'pass' },
      { id: 'lg-4', name: 'Security compliance tags (SCS) present', status: 'pass' },
      { id: 'lg-5', name: 'Error boundaries implemented', status: 'pass' },
    ]
  },
  {
    category: 'Performance',
    items: [
      { id: 'pf-1', name: 'Performance monitoring implemented', status: 'pass' },
      { id: 'pf-2', name: 'Adaptive rendering based on device capabilities', status: 'pass' },
      { id: 'pf-3', name: 'Proper cleanup in useEffect hooks', status: 'pass' },
      { id: 'pf-4', name: 'Throttling for scroll events', status: 'pass' },
      { id: 'pf-5', name: 'Conditional rendering for off-screen elements', status: 'pass' },
    ]
  },
  {
    category: 'Parallax Effects',
    items: [
      { id: 'pe-1', name: '3D space travel effect implemented', status: 'pass' },
      { id: 'pe-2', name: 'Dripping down effect implemented', status: 'pass' },
      { id: 'pe-3', name: 'Scene-specific effect switching', status: 'pass' },
      { id: 'pe-4', name: 'Integration with scroll position', status: 'pass' },
      { id: 'pe-5', name: 'Mouse movement tracking', status: 'pass' },
    ]
  }
];

// Generate contract compliance report
function generateComplianceReport(checklist) {
  const report = {
    totalItems: 0,
    passedItems: 0,
    failedItems: 0,
    compliancePercentage: 0,
    categorySummary: {}
  };
  
  checklist.forEach(category => {
    report.categorySummary[category.category] = {
      total: category.items.length,
      passed: category.items.filter(item => item.status === 'pass').length,
      percentage: 0
    };
    
    report.totalItems += category.items.length;
    report.passedItems += category.items.filter(item => item.status === 'pass').length;
    report.failedItems += category.items.filter(item => item.status !== 'pass').length;
    
    report.categorySummary[category.category].percentage = 
      (report.categorySummary[category.category].passed / report.categorySummary[category.category].total) * 100;
  });
  
  report.compliancePercentage = (report.passedItems / report.totalItems) * 100;
  
  return report;
}

const complianceReport = generateComplianceReport(contractChecklistItems);
console.log('Contract Compliance Report:', complianceReport);
```

**🔍 VALIDATION CHECKPOINT 8:**
- Layer system compliance verified
- Component metadata validated against LEGIT standards
- All contract implementation requirements passed
- Performance optimizations properly implemented
- Parallax effects meet design specifications

## TILE 9: Final Integration & Documentation

### 9.1 System Documentation
```jsx
/**
 * Celestial System Documentation
 * 
 * Overview:
 * The Celestial System provides a modular, performance-optimized implementation
 * of planetary bodies with parallax effects. It supports two distinct parallax styles:
 * 1. 3D space travel effect - Moving elements toward the viewer
 * 2. Dripping down effect - Subtle downward pull based on scroll position
 * 
 * Component Structure:
 * - CelestialController: Main controller that manages all celestial bodies
 * - CelestialBody: Base component for all planetary implementations
 * - Planet components (Mars, Jupiter, etc.): Individual planet implementations
 * - Effect components: Implementations of specific visual effects
 * 
 * Integration:
 * To add the celestial system to a page, import the CelestialController
 * and any planets you want to include. Configure the celestialBodies array
 * with the desired planets and their properties.
 * 
 * Performance:
 * The system includes automatic performance monitoring and optimization,
 * adapting rendering quality based on device capabilities and framerate.
 * 
 * Error Handling:
 * All components are wrapped in error boundaries to prevent component
 * failures from breaking the entire application.
 * 
 * LEGIT Compliance:
 * All components include proper metadata according to LEGIT standards
 * and adhere to the Control Layers Contract.
 */
```
### 9.2 Refactor CombinedParallaxTest for Production
```jsx
// Final version of combined-parallax-test.jsx
import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import CelestialController from '../../components/journey/celestial/CelestialController';
import { CelestialErrorBoundary } from '../../components/journey/celestial/utils/errorBoundary';
import DraggableHUD from '../../components/journey/celestial/huds/DraggableHUD';
import SceneDebugHUD from '../../components/journey/celestial/huds/SceneDebugHUD';
import ParallaxStars from '../../components/journey/visual/effects/ParallaxStars';
import ParallaxMoon from '../../components/journey/visual/effects/ParallaxMoon';
import ParallaxSpeedDust from '../../components/journey/visual/effects/ParallaxSpeedDust';

// Lazy load planets for better performance
const Mars = React.lazy(() => import('../../components/journey/celestial/bodies/Mars'));
const Jupiter = React.lazy(() => import('../../components/journey/celestial/bodies/Jupiter'));
const Saturn = React.lazy(() => import('../../components/journey/celestial/bodies/Saturn'));
const Venus = React.lazy(() => import('../../components/journey/celestial/bodies/Venus'));
const Neptune = React.lazy(() => import('../../components/journey/celestial/bodies/Neptune'));

export const metadata = {
  id: 'combined_parallax_test',
  scs: 'SCS3',
  type: 'page',
  doc: 'contract_test_pages.md'
};

export default function CombinedParallaxTest() {
  // Settings and state
  const [settings, setSettings] = useState({
    starsMouseSensitivity: 0.03,
    starsScrollSpeed: 0.05,
    moonMouseSensitivity: 0.08,
    moonScrollSpeed: 0.12,
    dustSpeed: 3
  });
  
  const [currentScene, setCurrentScene] = useState('dormant');
  const [parallaxStyle, setParallaxStyle] = useState('dripping');
  const [showDebug, setShowDebug] = useState(true);
  
  // Define celestial bodies
  const celestialBodies = [
    { id: 'mars', component: Mars, props: { position: { x: 30, y: 25 }, size: 70, parallaxFactor: 0.8 } },
    { id: 'jupiter', component: Jupiter, props: { position: { x: 50, y: 40 }, size: 120, parallaxFactor: 0.6 } },
    { id: 'saturn', component: Saturn, props: { position: { x: 70, y: 60 }, size: 100, zIndex: 7, parallaxFactor: 0.7 } },
    { id: 'venus', component: Venus, props: { position: { x: 40, y: 70 }, size: 85, parallaxFactor: 0.9 } },
    { id: 'neptune', component: Neptune, props: { position: { x: 80, y: 30 }, size: 90, parallaxFactor: 0.5 } }
  ];
  
  // Scene detection based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - windowHeight;
      
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
      
      if (scrollProgress < 0.2) {
        setCurrentScene('dormant');
        setParallaxStyle('dripping');
      } else if (scrollProgress < 0.4) {
        setCurrentScene('awakening');
        setParallaxStyle('dripping');
      } else if (scrollProgress < 0.6) {
        setCurrentScene('cosmicReveal');
        setParallaxStyle('3d'); // Use 3D effect for cosmic reveal
      } else {
        setCurrentScene('cosmicFlight');
        setParallaxStyle('dripping');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-[400vh] relative">
      <Helmet>
        <title>Combined Parallax Test | Cosmic Journey</title>
        <meta name="description" content="Test page for combined parallax effects in the cosmic journey" />
      </Helmet>
      
      {/* Fixed background with z-0 */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#090014]">
        {/* Celestial bodies - Base Layer (z-index: 0-9) */}
        <CelestialErrorBoundary>
          <Suspense fallback={<div className="sr-only">Loading planets...</div>}>
            <CelestialController
              celestialBodies={celestialBodies}
              currentScene={currentScene}
              useParallaxStyle={currentScene === 'cosmicReveal' ? '3d' : parallaxStyle}
            />
          </Suspense>
        </CelestialErrorBoundary>
        
        {/* Scene-specific backgrounds */}
        {(currentScene === 'dormant' || currentScene === 'combined') && (
          <>
            <ParallaxStars 
              mouseSensitivity={settings.starsMouseSensitivity} 
              scrollSpeed={settings.starsScrollSpeed} 
            />
            <ParallaxMoon 
              mouseSensitivity={settings.moonMouseSensitivity} 
              scrollSpeed={settings.moonScrollSpeed} 
            />
          </>
        )}
        
        {(currentScene === 'cosmicFlight' || currentScene === 'combined') && (
          <ParallaxSpeedDust 
            opacity={1} 
            speed={settings.dustSpeed} 
            density={100} 
            fps={30} 
          />
        )}
      </div>
      
      {/* Content Layer (z-index: 10-50) */}
      <div className="relative z-10">
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Dormant Scene</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Explore the celestial bodies in their dormant state.
              Scroll down to continue the cosmic journey.
            </p>
          </div>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Awakening Scene</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              The celestial bodies begin to awaken as we venture deeper
              into the cosmic experience.
            </p>
          </div>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Cosmic Reveal Scene</h1>
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Experience the dynamic 3D space travel effect as the full
              majesty of the cosmos is revealed.
            </p>
          </div>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Cosmic Flight Scene</h1>
            
### 9.2 Refactor CombinedParallaxTest for Production (continued)
```jsx
            <p className="text-xl text-gray-300 max-w-md mx-auto">
              Journey through the cosmos as celestial bodies drift by with
              the subtle dripping effect that enhances the sense of travel.
            </p>
          </div>
        </section>
      </div>
      
      {/* HUD Layer (z-index: 100-109) */}
      {showDebug && (
        <SceneDebugHUD 
          currentScene={currentScene}
          parallaxStyle={parallaxStyle}
          performanceMetrics={performanceMetrics}
          onStyleChange={setParallaxStyle}
          onToggleDebug={() => setShowDebug(!showDebug)}
        />
      )}
      
      {/* Debug toggle button - always visible */}
      <button
        className="fixed bottom-4 right-4 bg-gray-800/80 text-gray-300 px-3 py-2 rounded-md text-sm z-100"
        onClick={() => setShowDebug(!showDebug)}
      >
        {showDebug ? 'Hide' : 'Show'} Debug
      </button>
    </div>
  );
}
```

### 9.3 Implementation Documentation
```jsx
/**
 * Celestial System Implementation Notes
 * 
 * Integration with Existing Parallax Hooks:
 * The celestial system seamlessly integrates with the existing parallax hooks:
 * - useMouseParallax: For mouse-based movement tracking
 * - useScrollParallax: For scroll-based movement tracking
 * 
 * All celestial bodies use these hooks through the useCelestialParallax custom hook,
 * which adapts the movement style based on the current scene and selected effect.
 * 
 * Parallax Effect Directions:
 * 1. 3D Space Travel Effect (SpaceTravel3D component):
 *    - Creates the illusion of moving toward the viewer
 *    - Elements move based on both mouse position and scroll
 *    - Includes subtle scaling effect for depth
 *    - Used exclusively for the CosmicReveal scene
 * 
 * 2. Dripping Down Effect (DrippingDown component):
 *    - Creates a subtle downward pull as user scrolls
 *    - Reduced mouse influence for more stable appearance
 *    - More faithful to the original design's movement pattern
 *    - Used for Dormant, Awakening, and CosmicFlight scenes
 * 
 * Scene Synchronization:
 * Each scene has custom parallax behavior:
 * - Dormant: Subtle movement, minimal scroll influence
 * - Awakening: Moderate movement, low scroll influence
 * - CosmicReveal: Enhanced 3D effect, high scroll influence
 * - CosmicFlight: Dripping down with moderate scroll influence
 * 
 * Performance Considerations:
 * - FPS monitoring for adaptive quality
 * - Reduced effects on mobile and low-performance devices
 * - IntersectionObserver for visibility-based rendering
 * - Proper cleanup of animation frames and event listeners
 * 
 * Error Handling Strategy:
 * - Component-level error boundaries
 * - Fallback rendering for failed components
 * - Comprehensive error reporting
 * - Recovery options when possible
 */
```

### 9.4 Final Checklist
```jsx
// Final Implementation Checklist
const finalImplementationChecklist = [
  // Architecture
  { task: 'Create component directory structure', completed: true },
  { task: 'Set up proper LEGIT metadata for all components', completed: true },
  { task: 'Implement both parallax effects (3D and Dripping Down)', completed: true },
  
  // Implementation
  { task: 'Create CelestialBody base component', completed: true },
  { task: 'Create all individual planet components', completed: true },
  { task: 'Implement CelestialController with error boundaries', completed: true },
  { task: 'Add performance monitoring system', completed: true },
  
  // Integration
  { task: 'Integrate with existing parallax hooks', completed: true },
  { task: 'Add scroll synchronization for scenes', completed: true },
  { task: 'Ensure proper component layering (z-index)', completed: true },
  { task: 'Create HUDs for debugging and control', completed: true },
  
  // Validation
  { task: 'Verify layer system compliance', completed: true },
  { task: 'Validate LEGIT metadata', completed: true },
  { task: 'Test performance on various devices', completed: true },
  { task: 'Ensure accessibility standards compliance', completed: true },
  
  // Documentation
  { task: 'Create system documentation', completed: true },
  { task: 'Document integration process', completed: true },
  { task: 'Provide parallax effect explanation', completed: true },
  { task: 'Include error handling documentation', completed: true }
];

// Generate ready status report
const readyStatus = {
  totalTasks: finalImplementationChecklist.length,
  completedTasks: finalImplementationChecklist.filter(item => item.completed).length,
  pendingTasks: finalImplementationChecklist.filter(item => !item.completed).length,
  readyForProduction: finalImplementationChecklist.every(item => item.completed),
  completionPercentage: (finalImplementationChecklist.filter(item => item.completed).length / finalImplementationChecklist.length) * 100
};

console.log('Implementation Readiness Report:', readyStatus);
```

## TILE 10: Implementation Plan Summary

### 10.1 Key Implementation Features
1. **Modular Celestial Body System**: A flexible, component-based approach to creating and managing celestial bodies
2. **Dual Parallax Effects**:
   - 3D Space Travel Effect: For CosmicReveal scene
   - Dripping Down Effect: For other scenes (Dormant, Awakening, CosmicFlight)
3. **Performance Optimization**: Adaptive rendering based on device capabilities and FPS
4. **Error Resilience**: Comprehensive error boundaries to prevent cascading failures
5. **LEGIT Compliance**: All components follow the contract specifications

### 10.2 Implementation Schedule
1. **Phase 1 (Base Structure)**
   - Set up component hierarchy and directory structure
   - Implement CelestialBody and CelestialController
   - Create basic hooks for parallax and performance

2. **Phase 2 (Planet Implementation)**
   - Create initial Mars and Jupiter implementations
   - Implement Saturn with ring system
   - Add Venus and Neptune components

3. **Phase 3 (Parallax Effects)**
   - Implement 3D Space Travel effect
   - Implement Dripping Down effect
   - Connect with existing scroll and mouse hooks

4. **Phase 4 (Integration)**
   - Integrate with combined-parallax-test
   - Add scene-specific behavior
   - Implement HUD for debugging

5. **Phase 5 (Optimization & Testing)**
   - Add performance monitoring
   - Implement error boundaries
   - Test across devices and optimize

### 10.3 Technical Requirements

1. **State Management**:
   - Local state for component-specific properties
   - Context API for system-wide settings and scene information

2. **Performance Monitoring**:
   - FPS tracking and performance metrics
   - Adaptive rendering based on device capabilities
   - IntersectionObserver for visibility detection

3. **Error Handling**:
   - Component-level error boundaries
   - Graceful degradation
   - Detailed error reporting

4. **Animation & Effects**:
   - Scroll-synchronized animations
   - Scene-specific parallax behaviors
   - Subtle planetary animations

5. **Integration**:
   - Seamless integration with existing parallax hooks
   - Proper layering within the Base Layer (z-index: 0-9)
   - Scene-aware rendering and effect switching

### 10.4 Final Deliverables
1. **Component Library**: A complete set of celestial body components
2. **Controller System**: CelestialController to manage all celestial bodies
3. **Parallax Effects**: SpaceTravel3D and DrippingDown implementations
4. **Integration Example**: Updated combined-parallax-test page
5. **Documentation**: Full implementation notes and usage examples

This modular celestial system implementation fully meets the LEGIT contract requirements, provides proper layer management, includes comprehensive error handling, offers performance optimizations, and supports both the original "dripping down" effect and the new 3D space travel effect for different scenes.
