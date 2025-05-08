
# Plan Audit for Background System Implementation (T2.6.2)

## Current Status Analysis
I've carefully reviewed the `fix_v5.0_NewBackGround.md` documentation which outlines the atomic sandbox approach. The key insight is that we need to build an isolated testing environment first before making any changes to the production system.

## Phase Analysis

### ✅ Phase 1: Lock Legacy and Prepare for Fork
- Status: Complete
- Files backed up: `background_assets.js` → `background_assets_legacy.js` and `BackgroundManager.jsx` → `BackgroundManager_v1.jsx`
- Snapshot stored in `Docs/contracts/background_legacy_snapshot.md`

### 🔄 Phase 2: Atomic Sandbox Buildout (Current Phase)
This is our current task, broken into these steps:

1. **Create Sandbox Route**
   - Path: `/background-sandbox`
   - File: `src/pages/background_sandbox.jsx`
   - Contains dummy scroll zones to test with
   
2. **Create New Manager**
   - File: `src/components/system/BackgroundManager_v2.jsx`
   - Should only be mounted in the sandbox route
   - Imports from: `background_assets_v2.js`
   
3. **Enable Debug Tools**
   - Debug overlay toggle with Ctrl+Shift+B
   - SSR fallback warning

## Implementation Plan

### Step 1: Create `background_assets_v2.js`
This file should contain the zone configuration from the documentation. I will use the exact format provided in the documentation with:
- Zone configuration
- Transition configuration

### Step 2: Create `BackgroundManager_v2.jsx`
This component should:
- Import the zone configuration
- Implement scroll detection
- Render appropriate backgrounds based on scroll position
- Support debug mode
- Include SSR detection and fallback

### Step 3: Create `background_sandbox.jsx`
This page should:
- Import the new BackgroundManager
- Include dummy content for scrolling
- Have visible sections representing each zone

## Implementation Approach
I'll follow a strict step-by-step approach:
1. First create each file with minimal implementation
2. No external dependencies beyond what's already in the project
3. Build the structural foundation first, then add functionality
4. Test/validate each component before moving forward

## File Creation Order
1. `src/constants/background_assets_v2.js` (proper encoding, clean file)
2. `src/components/system/BackgroundManager_v2.jsx` (with built-in throttle function)
3. `src/pages/background_sandbox.jsx` (with basic test zones)

I'll now proceed with implementing this plan exactly as specified, focusing only on Phase 2 (Atomic Sandbox Buildout) and making sure each file is correctly created before moving to the next.


====================================================================================================================

# 🧪 Revised Implementation Plan: BackgroundManager Sandbox v2 (T2.6.2 Atomic Rewrite Path)

## 🧭 Phase 1: Lock Legacy and Prepare for Fork (T2.6.2.A)

✅ *Status: Complete (you already executed Phase 1)*

**Objective**: Secure all current assets for rollback and historical trace.

1. `background_assets.js` → `background_assets_legacy.js`
2. `BackgroundManager.jsx` → `BackgroundManager_v1.jsx`
3. Snapshot stored at:
   📁 `Docs/contracts/background_legacy_snapshot.md`

---

## 🧱 Phase 2: Atomic Sandbox Buildout (T2.6.2.B)

🧠 **New Principle: Build in Isolation → Then Replace Cleanly**

### 🔹 Step 2.1 – Create Sandbox Route

* Route: `/background-sandbox`
* File: `src/pages/background_sandbox.jsx`
* Dummy scroll zones:

  * `<HeroDummy />`
  * `<ServicesDummy />`
  * `<CommunityDummy />`
  * `<FooterDummy />`

### 🔹 Step 2.2 – Create New Manager

* `BackgroundManager_v2.jsx` (mount this *only* in sandbox route)
* Imports from: `background_assets_v2.js`

### 🔹 Step 2.3 – Enable Debug Tools

* Debug overlay: `Ctrl+Shift+B`
* SSR fallback warning visibly rendered if active

---

## 🌌 Phase 3: New Visual Layers and Zones (T2.6.2.C)

**Build layer-by-layer, not all at once**
→ Tune, test, and review each visually.

### 🔹 3.1 — Define 3-Zone Map:

```js
const ZONE_BACKGROUND_MAP = {
  hero: ['stars_deep', 'beam_faint', 'radial_violet'],
  services: ['cosmic_haze', 'nebula_scroll', 'spark_drizzle'],
  community: ['sunrise_arc', 'gradient_burst', 'soft_grid'],
  footer: ['light_fade_glow', 'final_noise_blend'],
}
```

### 🔹 3.2 — New Visual Effects:

Renderers for:

| Zone         | Visual Layers                                   |
| ------------ | ----------------------------------------------- |
| Starry Night | `stars_deep`, `beam_faint`, `radial_violet`     |
| Cosmic Dawn  | `cosmic_haze`, `nebula_scroll`, `spark_drizzle` |
| Sunrise Arc  | `sunrise_arc`, `gradient_burst`, `soft_grid`    |
| Footer Glow  | `light_fade_glow`, `final_noise_blend`          |

🔁 Use `animation_schema_v1.5.md` for transition timing
📁 Assets go in `/public/images/bg/`

---

## 🧬 Phase 4: Validate System (T2.6.2.D)

1. Check fade-in/fade-out timing zone by zone
2. Verify SSR fallback activates cleanly
3. Inspect memory and FPS on mobile
4. Reduced motion: disable animated assets
5. Confirm scroll zone detection is accurate
6. Test with debug mode enabled

---

## 🚀 Phase 5: Merge to Live (T2.6.2.E)

🎯 *Only after full QA*

1. Replace mount in `App.jsx`:

   * `BackgroundManager_v1` → `BackgroundManager_v2`
2. Update `/` and `/safe` routes
3. Remove legacy asset references
4. Final QA snapshot saved:
   📁 `Docs/contracts/background_manager_v2_snapshot.md`

---

## 📋 Addendum: Constants + Contracts

| Contract Path                   | Status          |
| ------------------------------- | --------------- |
| `animation_schema_v1.5.md`      | ✅ Enforced      |
| `background_legacy_snapshot.md` | ✅ Sealed        |
| `background_assets_v2.js`       | 🛠️ In progress |
| `BackgroundManager_v2.jsx`      | 🛠️ Build now   |
| `background_sandbox.jsx`        | 🛠️ Create next |

---


=================================================================================================================

 🚀 **TILE T2.6.B-R Implementation Plan: 3-Zone Cosmic Background**

## 🎯 **Overview**
This plan outlines the step-by-step process to implement our 3-Zone Background system, organizing work into logical stages for Cursor to execute efficiently.

## 📋 **Implementation Checklist**

### 🔄 **Phase 1: Setup Background Manager**

1. **Create the BackgroundManager component**
   ```bash
   # File path
   src/components/ui/BackgroundManager.jsx
   ```

2. **Define zone configuration**
   ```jsx
   // Inside BackgroundManager.jsx
   const ZONE_BACKGROUND_MAP = {
     zone1: {
       name: 'Starry Night',
       scrollRange: { start: 0, end: 100 },
       // ... other properties
     },
     // ... zone2, zone3 definitions
   };
   ```

3. **Add required imports**
   ```jsx
   import { useEffect, useState, useRef, useMemo } from 'react';
   import { throttle } from 'lodash';
   import SpaceCanvas from '../home/v4/SpaceCanvas';
   // Import any other components needed
   ```

### 🖼️ **Phase 2: Prepare Visual Assets**

1. **Create/collect background assets**
   ```bash
   # Create directory if it doesn't exist
   mkdir -p public/images/backgrounds
   ```

2. **Required assets**
   ```
   public/images/backgrounds/
   ├── noise_fade.png
   ├── cosmic_gradient.png
   ├── sun_beams_overlay.png
   └── warm_noise.png
   ```

3. **Update asset paths in BackgroundManager**
   ```jsx
   // Example for one effect
   {
     type: 'image',
     id: 'cosmic-gradient',
     className: 'absolute inset-0 z-3 opacity-20',
     style: {
       backgroundImage: 'url(/images/backgrounds/cosmic_gradient.png)',
       // ...
     },
   }
   ```

### 🔌 **Phase 3: Integrate With Main Layout**

1. **Modify the main page component**
   ```bash
   # File path
   src/pages/dev_v4_cosmic.jsx
   ```

2. **Replace existing background logic**
   ```jsx
   // OLD - Remove these background divs
   <div className="min-h-screen relative bg-black text-white overflow-hidden">
     <SpaceCanvas />
     <div className="absolute inset-0 pointer-events-none z-[1]">
       {/* Various gradient overlays */}
     </div>
     {/* ... */}
   </div>
   
   // NEW - Replace with BackgroundManager
   import BackgroundManager from '../components/ui/BackgroundManager';
   
   export default function DevV4CosmicPage() {
     return (
       <BackgroundManager>
         <div className="min-h-screen text-white">
           <main className="pt-28 pb-20 space-y-32 relative z-10">
             {/* All your section content */}
           </main>
         </div>
       </BackgroundManager>
     );
   }
   ```

3. **Remove redundant background divs from each section**
   ```jsx
   // REMOVE these from all sections 
   <div className="bg-transparent relative">
     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 z-0"></div>
     {/* ... */}
   </div>
   
   // KEEP just the section content
   <SectionAnchor id="about" className="relative pt-16 md:pt-20" scrollMargin={80}>
     <MissionStatement />
   </SectionAnchor>
   ```

### ⚙️ **Phase 4: Performance Optimization**

1. **Add mobile detection**
   ```jsx
   // Add inside BackgroundManager.jsx
   const [isMobile, setIsMobile] = useState(false);
   
   useEffect(() => {
     if (typeof window !== 'undefined') {
       const checkMobile = () => {
         setIsMobile(window.innerWidth < 768);
       };
       
       checkMobile();
       window.addEventListener('resize', throttle(checkMobile, 200));
       return () => window.removeEventListener('resize', checkMobile);
     }
   }, []);
   ```

2. **Optimize for mobile devices**
   ```jsx
   // Inside the renderedBackgrounds useMemo
   // For particle effects
   {effect.type === 'particles' && (
     <div className={effect.className}>
       {/* Reduce particle count on mobile */}
       <ParticleField 
         density={isMobile ? effect.density / 2 : effect.density}
         opacity={isMobile ? effect.opacity * 0.7 : effect.opacity}
       />
     </div>
   )}
   ```

3. **Add visibility detection to pause when tab inactive**
   ```jsx
   useEffect(() => {
     const handleVisibility = () => {
       if (document.hidden) {
         // Pause any animations
         if (animationFrame.current) {
           cancelAnimationFrame(animationFrame.current);
           animationFrame.current = null;
         }
       } else {
         // Resume animations
         handleScroll();
       }
     };
     
     document.addEventListener('visibilitychange', handleVisibility);
     return () => document.removeEventListener('visibilitychange', handleVisibility);
   }, []);
   ```

### 🧪 **Phase 5: Testing & Integration**

1. **Progressive test each zone individually**
   ```jsx
   // Temporary test mode
   const [testZone, setTestZone] = useState(null);
   
   // Add a debugging UI when in development
   {process.env.NODE_ENV === 'development' && (
     <div className="fixed bottom-4 right-4 z-50 bg-black/70 p-2 rounded">
       <button onClick={() => setTestZone('zone1')}>Zone 1</button>
       <button onClick={() => setTestZone('zone2')}>Zone 2</button>
       <button onClick={() => setTestZone('zone3')}>Zone 3</button>
       <button onClick={() => setTestZone(null)}>All Zones</button>
     </div>
   )}
   ```

2. **Add scroll position indicator in dev mode**
   ```jsx
   {process.env.NODE_ENV === 'development' && (
     <div className="fixed top-4 right-4 z-50 bg-black/70 p-2 rounded text-xs">
       Scroll: {Math.round((scrollY / viewportHeight) * 100)}vh
     </div>
   )}
   ```

3. **Test for SSR compatibility**
   - Verify all window/document references have typeof checks
   - Ensure initial render works without viewport measurements
   - Test production build with `npm run build && npm run preview`

## 🔄 **Execution Order**

1. Start by implementing the BackgroundManager component with basic zone structure
2. Prepare or placeholder all required visual assets
3. Integrate into main layout with basic zone detection
4. Test scrolling behavior and zone transitions
5. Add performance optimizations and mobile adaptations
6. Remove all redundant background elements from individual sections
7. Fine-tune zone boundaries based on actual content
8. Test across devices and verify SSR compatibility

## 🏆 **Success Criteria**

- Smooth transitions between zones with no visible "stitching"
- Background elements scale and adapt to different screen sizes
- No JS errors or layout shifts during scrolling
- Performance metrics remain stable (FPS, memory usage)
- Visual integrity of cosmic theme maintained throughout scroll journey

This implementation plan provides a structured approach to refactoring your background system while maintaining visual richness and ensuring performance.

======================================================================================================================

# 🌌 BackgroundManager.jsx


Here's the complete implementation of your 3-Zone Background system:

```jsx
import React, { useEffect, useState, useRef, useMemo } from 'react';
import SpaceCanvas from './SpaceCanvas';
import { throttle } from 'lodash';

// Background assets (these would be imported from your assets)
// const starfieldEffect = '/path/to/starfield.png';
// const radialNight = '/path/to/radial_night.png';
// const noiseFade = '/path/to/noise_fade.png';
// etc.

const ZONE_BACKGROUND_MAP = {
  zone1: {
    name: 'Starry Night',
    scrollRange: { start: 0, end: 100 }, // vh units
    baseLayer: {
      bg: 'bg-black',
      className: 'absolute inset-0 z-0',
    },
    effects: [
      {
        type: 'canvas',
        id: 'starfield',
        className: 'absolute inset-0 z-1',
        opacity: 1,
      },
      {
        type: 'radial-gradient',
        id: 'radial-night',
        className: 'absolute top-0 left-0 w-[50vw] h-[50vh] z-2',
        style: {
          background: 'radial-gradient(circle, rgba(91, 33, 182, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        },
      },
      {
        type: 'overlay',
        id: 'noise-fade',
        className: 'absolute inset-0 z-3 opacity-10',
        style: {
          backgroundImage: 'url(/images/noise_fade.png)',
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
        },
      },
    ],
  },
  
  zone2: {
    name: 'Cosmic Dawn',
    scrollRange: { start: 90, end: 200 }, // vh units, overlaps with zone1
    baseLayer: {
      bg: 'bg-[#0d0d12]',
      className: 'absolute inset-0 z-0',
    },
    effects: [
      {
        type: 'gradient',
        id: 'nebula-dawn',
        className: 'absolute inset-0 z-1',
        style: {
          background: 'linear-gradient(135deg, rgba(76, 29, 149, 0.3) 0%, rgba(16, 185, 129, 0.1) 70%, rgba(30, 58, 138, 0.2) 100%)',
        },
      },
      {
        type: 'particles',
        id: 'subtle-particles',
        className: 'absolute inset-0 z-2',
        density: 'low',
        speed: 0.3,
        opacity: 0.4,
        particleColor: 'rgba(255, 255, 255, 0.6)',
        // This would be handled by your ParticleField component
      },
      {
        type: 'image',
        id: 'cosmic-gradient',
        className: 'absolute inset-0 z-3 opacity-20',
        style: {
          backgroundImage: 'url(/images/cosmic_gradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'screen',
        },
      },
    ],
  },
  
  zone3: {
    name: 'Sunrise Embrace',
    scrollRange: { start: 190, end: 300 }, // vh units, overlaps with zone2
    baseLayer: {
      bg: 'bg-gray-900',
      className: 'absolute inset-0 z-0',
    },
    effects: [
      {
        type: 'gradient',
        id: 'sunrise-bloom',
        className: 'absolute inset-0 z-1',
        style: {
          background: 'linear-gradient(to top, rgba(251, 113, 133, 0.1) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(0, 0, 0, 0) 100%)',
        },
      },
      {
        type: 'image',
        id: 'sun-beams',
        className: 'absolute bottom-0 left-0 w-full h-[70vh] z-2 opacity-20',
        style: {
          backgroundImage: 'url(/images/sun_beams_overlay.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          mixBlendMode: 'screen',
        },
      },
      {
        type: 'overlay',
        id: 'warm-noise',
        className: 'absolute inset-0 z-3 opacity-15',
        style: {
          backgroundImage: 'url(/images/warm_noise.png)',
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
        },
      },
    ],
  }
};

// Configuration for transitions
const ZONE_TRANSITION_CONFIG = {
  transitionDuration: 0.8, // seconds
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const BackgroundManager = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [activeZones, setActiveZones] = useState({});
  const [viewportHeight, setViewportHeight] = useState(0);
  const animationFrame = useRef(null);
  
  // Calculate viewport height once component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportHeight(window.innerHeight);
      
      const handleResize = throttle(() => {
        setViewportHeight(window.innerHeight);
      }, 200);
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Handle scroll position updates
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      animationFrame.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);
  
  // Calculate which zones are active and their opacity based on scroll position
  useEffect(() => {
    if (!viewportHeight) return;

    const newActiveZones = {};
    
    // Convert scroll position to vh units
    const scrollInVh = (scrollY / viewportHeight) * 100;
    
    Object.entries(ZONE_BACKGROUND_MAP).forEach(([zoneId, zone]) => {
      const { start, end } = zone.scrollRange;
      let opacity = 0;
      
      // Before start - zone not visible yet
      if (scrollInVh < start) {
        opacity = 0;
      }
      // After end - zone no longer visible
      else if (scrollInVh > end) {
        opacity = 0;
      }
      // Middle of zone - fully visible
      else if (scrollInVh > start + 10 && scrollInVh < end - 10) {
        opacity = 1;
      }
      // Fade in
      else if (scrollInVh >= start && scrollInVh <= start + 10) {
        opacity = (scrollInVh - start) / 10; // 0 to 1 over 10vh
      }
      // Fade out
      else if (scrollInVh >= end - 10 && scrollInVh <= end) {
        opacity = (end - scrollInVh) / 10; // 1 to 0 over 10vh
      }
      
      newActiveZones[zoneId] = opacity;
    });
    
    setActiveZones(newActiveZones);
  }, [scrollY, viewportHeight]);
  
  // Optimization: Memoize the rendered backgrounds
  const renderedBackgrounds = useMemo(() => {
    return Object.entries(ZONE_BACKGROUND_MAP).map(([zoneId, zone]) => {
      const zoneOpacity = activeZones[zoneId] || 0;
      if (zoneOpacity === 0) return null;
      
      return (
        <div
          key={zoneId}
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{
            opacity: zoneOpacity,
            transition: `opacity ${ZONE_TRANSITION_CONFIG.transitionDuration}s ${ZONE_TRANSITION_CONFIG.easing}`,
            zIndex: 0,
          }}
        >
          {/* Base Layer */}
          <div className={`${zone.baseLayer.bg} ${zone.baseLayer.className}`} />
          
          {/* Effect Layers */}
          {zone.effects.map((effect, index) => {
            switch (effect.type) {
              case 'canvas':
                if (effect.id === 'starfield') {
                  return <SpaceCanvas key={effect.id} className={effect.className} />;
                }
                return null;
              
              case 'particles':
                // Render your ParticleField component here
                return (
                  <div
                    key={effect.id}
                    className={effect.className}
                    style={{ opacity: effect.opacity }}
                  >
                    {/* Replace with your ParticleField component */}
                    <div className="w-full h-full bg-transparent">
                      {/* Particle simulation would render here */}
                    </div>
                  </div>
                );
              
              default:
                // Static backgrounds (images, gradients, overlays)
                return (
                  <div
                    key={effect.id}
                    className={effect.className}
                    style={effect.style}
                  />
                );
            }
          })}
        </div>
      );
    }).filter(Boolean); // Remove null elements
  }, [activeZones]);
  
  return (
    <>
      {/* Background Container */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        {renderedBackgrounds}
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
};

export default BackgroundManager;
```

## 🔧 Integration in App Component

```jsx
// In your main app component or layout
import BackgroundManager from './components/BackgroundManager';

const CosmicLayout = () => {
  return (
    <BackgroundManager>
      <main className="min-h-screen">
        {/* Your sections */}
        <section id="hero">
          <HeroPortal />
        </section>
        
        {/* Other sections */}
        {/* ... */}
        
        <footer>
          <FooterExperience />
        </footer>
      </main>
    </BackgroundManager>
  );
};
```

## 🧩 Performance Optimizations

1. **Throttled Scroll Events** - Prevents excessive calculations
2. **RequestAnimationFrame** - Smooth updates in sync with browser rendering
3. **Memoized Rendering** - Backgrounds only re-render when opacity changes
4. **Conditional Rendering** - Inactive zones don't render at all (opacity 0)
5. **CSS Transitions** - Hardware-accelerated opacity transitions
6. **Viewport Calculation** - Adjusts zones based on actual viewport size

## 🛠️ Implementation Notes

1. **Asset Paths** - Replace `/images/...` with your actual asset paths
2. **Component Integration** - Replace placeholder comments with your actual component imports (ParticleField, etc.)
3. **Scroll Ranges** - Adjust the `scrollRange` values based on your actual content length

## 📱 Mobile/SSR Considerations

1. The component uses `typeof window !== 'undefined'` checks for SSR safety
2. For mobile performance, you could add:

```jsx
// Add to useEffect for viewport detection
const isMobile = window.innerWidth < 768;
if (isMobile) {
  // Reduce particle count, simplify effects
  setMobileMode(true);
}
```