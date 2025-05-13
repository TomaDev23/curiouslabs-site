


# Celestial System Implementation Audit & Work Plan

## Audit Findings

After analyzing plan_v9.1 and plan_v9.3, I've identified the following key components and requirements:

### Current Status
1. **Moon Component**: Successfully implemented
2. **Mars Component**: Successfully implemented
3. **CelestialBody Base Component**: Implemented and functioning
4. **useCelestialParallax Hook**: Enhanced to support combined parallax style
5. **combined-parallax-test.jsx**: Updated to use the Moon component

### Next Tile (TILE-COSMIC.3)
The next tile focuses on **Scene Lifecycle Synchronization** with these key objectives:
- Centralize `sceneType` control
- Create a `useSceneTypeFromScroll` hook
- Modify `CelestialController` to use this hook
- Enable planet lifecycle logic based on scene type
- Update debug HUD to display scene information

### Code Resources from plan_v9.1
From the plan_v9.1, I've identified these relevant code snippets:

1. **CelestialController Scene Management**:
```javascript
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

2. **Scene-Specific Behavior**:
```javascript
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

3. **CelestialController Implementation**:
```javascript
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

## Work Plan

Based on the audit, here's the implementation plan for TILE-COSMIC.3:

### 1. Create `useSceneTypeFromScroll` Hook
**File**: `src/components/journey/celestial/hooks/useSceneTypeFromScroll.jsx`
```javascript
import { useMemo } from 'react';

export const metadata = {
  id: 'use_scene_type_from_scroll',
  scs: 'SCS-SCENE-CONTROL-001',
  type: 'hook',
  doc: 'LEGIT_contract_sceneTypeController.md'
};

export default function useSceneTypeFromScroll(scrollProgress) {
  return useMemo(() => {
    if (scrollProgress < 0.2) return 'dormant';
    if (scrollProgress < 0.4) return 'awakening';
    if (scrollProgress < 0.6) return 'cosmicReveal';
    return 'cosmicFlight';
  }, [scrollProgress]);
}
```

### 2. Update CelestialController
**File**: `src/components/journey/celestial/CelestialController.jsx`
```javascript
import { useState, useEffect, useContext } from 'react';
import { CelestialContext } from './CelestialContext';
import { CelestialErrorBoundary } from './utils/errorBoundary';
import useSceneTypeFromScroll from './hooks/useSceneTypeFromScroll';

export const metadata = {
  id: 'celestial_controller',
  scs: 'SCS-SCENE-CONTROL-001',
  type: 'controller',
  doc: 'LEGIT_contract_sceneTypeController.md'
};

export default function CelestialController({
  celestialBodies = [], // Array of planetary components
  currentScene = 'auto', // 'auto' for scroll-based or specific scene name
  useParallaxStyle = '3d'
}) {
  const [performanceMode, setPerformanceMode] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState(useParallaxStyle);
  const [sceneType, setSceneType] = useState(currentScene === 'auto' ? 'dormant' : currentScene);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Auto-detect scene based on scroll if currentScene is 'auto'
  useEffect(() => {
    if (currentScene !== 'auto') {
      setSceneType(currentScene);
      return;
    }
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentScene]);
  
  // Use the hook to determine scene type from scroll progress
  const autoSceneType = useSceneTypeFromScroll(scrollProgress);
  
  // Update scene type if using auto mode
  useEffect(() => {
    if (currentScene === 'auto' && autoSceneType !== sceneType) {
      setSceneType(autoSceneType);
    }
  }, [autoSceneType, currentScene, sceneType]);
  
  useEffect(() => {
    setParallaxStyle(useParallaxStyle);
  }, [useParallaxStyle]);

  const contextValue = {
    performanceMode,
    parallaxStyle,
    sceneType,
    scrollProgress,
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

### 3. Update Debug HUD
**File**: `src/pages/dev/combined-parallax-test.jsx` (partial update)
```javascript
// SceneDebugHUD component
const SceneDebugHUD = ({ currentScene, parallaxStyle, scrollProgress, onStyleChange }) => {
  return (
    <DraggableHUD title="Celestial System Debug" initialPosition={{ x: 20, y: 20 }}>
      <div className="text-gray-300 space-y-3 min-w-[300px]">
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Current Scene</div>
          <div className="text-green-400">{currentScene}</div>
        </div>
        
        <div>
          <div className="text-xs uppercase tracking-wider mb-1 text-gray-400">Scroll Progress</div>
          <div className="text-blue-400">{(scrollProgress * 100).toFixed(0)}%</div>
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
      </div>
    </DraggableHUD>
  );
};
```

### 4. Modify combined-parallax-test.jsx to use the updated controller
```javascript
// In combined-parallax-test.jsx
// Remove manual scene detection logic and use the controller's auto mode

export default function CombinedParallaxTest() {
  // ... existing code ...
  
  return (
    <div className="min-h-[400vh] relative">
      <Helmet>
        <title>Combined Parallax Test | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with z-0 */}
      <div className="fixed inset-0 z-0 bg-[#090014]">
        {/* Celestial bodies */}
        <CelestialController
          celestialBodies={celestialBodies}
          currentScene="auto" // Use auto mode for scroll-based scene detection
          useParallaxStyle={parallaxStyle}
        />
        
        {/* ... rest of the code ... */}
      </div>
      
      {/* ... rest of the code ... */}
      
      {/* Debug HUD */}
      <SceneDebugHUD 
        currentScene={currentScene}
        parallaxStyle={parallaxStyle}
        scrollProgress={scrollProgress}
        onStyleChange={setParallaxStyle}
      />
    </div>
  );
}
```

## Implementation Steps

1. **Create useSceneTypeFromScroll Hook**
   - Create the file with proper LEGIT metadata
   - Implement the scroll-to-scene mapping logic
   - Add memoization for performance

2. **Update CelestialController**
   - Add support for 'auto' scene detection
   - Integrate the new hook
   - Update context to include scrollProgress
   - Ensure proper cleanup of event listeners

3. **Update Debug HUD**
   - Add scrollProgress display
   - Ensure scene type is properly displayed
   - Add visual indicators for current scene

4. **Test the Implementation**
   - Verify scene transitions occur at correct scroll positions
   - Confirm celestial bodies respond to scene changes
   - Validate performance with multiple planets

## Completion Criteria

- [ ] `useSceneTypeFromScroll` hook implemented with proper LEGIT metadata
- [ ] CelestialController updated to support auto scene detection
- [ ] Debug HUD displays current scene and scroll progress
- [ ] Scene transitions work correctly at specified scroll thresholds
- [ ] Celestial bodies (Moon, Mars) respond to scene changes with appropriate styling
- [ ] No performance issues during scene transitions

This implementation will centralize the scene type control, making it more maintainable and consistent across the application.




====================================================================================================================

# 🧱 CURSOR MISSION BLOCK: `TILE-COSMIC.3`

**Mission Name**: `scene-lifecycle-sync`
**Objective**: Centralize `sceneType` control to govern visibility, animation, and activation of all celestial bodies.

---

## 🔧 FILES TO MODIFY

* `src/components/journey/celestial/CelestialController.jsx`
* `src/components/journey/celestial/hooks/useSceneTypeFromScroll.jsx` (🔧 New)
* `src/pages/dev/combined-parallax-test.jsx` (for test pass)

---

## 🎯 TASKS

---

### ✅ 1. **Create Hook: `useSceneTypeFromScroll`**

```js
export default function useSceneTypeFromScroll(scrollProgress) {
  if (scrollProgress < 0.2) return 'dormant';
  if (scrollProgress < 0.4) return 'awakening';
  if (scrollProgress < 0.6) return 'cosmicReveal';
  return 'cosmicFlight';
}
```

📁 Place in:
`src/components/journey/celestial/hooks/useSceneTypeFromScroll.jsx`

✅ Hook must return the string scene key.

---

### ✅ 2. **Modify CelestialController**

In `CelestialController.jsx`:

1. Import and use `useSceneTypeFromScroll`
2. Compute `sceneType` from scroll value
3. Store it in `CelestialContext` so all children access it

```js
import useSceneTypeFromScroll from './hooks/useSceneTypeFromScroll';

const scrollY = useScrollY(); // from your scroll hook
const scrollProgress = computeScrollProgress(scrollY); // if abstracted
const sceneType = useSceneTypeFromScroll(scrollProgress);

<CelestialContext.Provider value={{ sceneType, ... }}>
  {visiblePlanets.map(...)}
</CelestialContext.Provider>
```

---

### ✅ 3. **Enable Planet Lifecycle Logic**

In `CelestialBody.jsx` or individual planet components (like `Moon.jsx`, `Mars.jsx`):

Add:

```js
const { sceneType } = useContext(CelestialContext);

// Simple gate
if (!['cosmicReveal', 'cosmicFlight'].includes(sceneType)) return null;

// Advanced: style adaptation
useEffect(() => {
  if (sceneType === 'awakening') setGlowIntensity(0.3)
  if (sceneType === 'cosmicFlight') animate scale/pulse
}, [sceneType]);
```

✅ This enables render blocking + per-scene effects

---

### ✅ 4. **Update Debug HUD**

(If HUD exists)

Display:

* `sceneType`
* `scrollProgress`
* `visiblePlanets.length`

Optional:

```jsx
<DebugHUD>
  Scene: {sceneType}
  Progress: {(scrollProgress * 100).toFixed(0)}%
  Active Bodies: {visiblePlanets.length}
</DebugHUD>
```

---

## ✅ COMPLETION CRITERIA

| Goal                                     | Status |
| ---------------------------------------- | ------ |
| SceneType derived from scroll            | ⏳      |
| Controller syncs context                 | ⏳      |
| Planets adapt render/style to scene      | ⏳      |
| HUD confirms values                      | ⏳      |
| Mars and Moon show per-scene differences | ⏳      |

---

## 🔁 POST-TILE TRANSITION

Once TILE-COSMIC.3 is complete:

> 🚀 Proceed to TILE-COSMIC.4 – `SCENE_PLANET_MAP`
> Where planets only appear in the scenes they belong to

💾 **Confirmed, Commander. Here is the official LEGIT contract spec for the scene type controller system** — formalized as `LEGIT_contract_sceneTypeController.md`.

---

````markdown
# LEGIT_contract_sceneTypeController.md

## 📄 Component Contract: Scene Type Controller

### 🆔 Identifier
- `id`: `scene_type_controller`
- `scs`: `SCS-SCENE-CONTROL-001`
- `type`: `controller`
- `doc`: `LEGIT_contract_sceneTypeController.md`

---

## 🧩 Purpose

This component is responsible for **determining and propagating the current scene state** (e.g., `dormant`, `awakening`, `cosmicReveal`, `cosmicFlight`) based on **scroll position**, and providing that state to all celestial components via context.

The `sceneType` governs:
- Visibility of planets
- Animation triggers
- Styling transitions
- Parallax mode selection
- Debug display

---

## ⚙️ Interfaces

### Hook: `useSceneTypeFromScroll(scrollProgress: number): string`

- Accepts a `scrollProgress` value between 0.0 and 1.0
- Returns one of the following scene types:
  - `'dormant'`
  - `'awakening'`
  - `'cosmicReveal'`
  - `'cosmicFlight'`

---

## 📦 Data Model

### `sceneType` (string)
- Controlled by scroll position
- Shared via `CelestialContext`
- Updated reactively on scroll change

---

## 🧠 Logic Requirements

- Scroll mapping must be **modular** and **centralized**
- SceneType must be consistent and accessible throughout render chain
- Hooks consuming `sceneType` must re-render on transition
- SceneType transitions must avoid flicker or debounce stutter

---

## 🔍 Visual Requirements

| Scene | Trigger Scroll % | Expected Transitions |
|-------|------------------|----------------------|
| dormant | 0–19% | Planets hidden or faded |
| awakening | 20–39% | Moon/Mars active, low glow |
| cosmicReveal | 40–59% | All major planets begin reveal |
| cosmicFlight | 60–100% | Full motion, glow, transitions active |

---

## 🛠️ Integration Points

- `CelestialController.jsx`  
- `useCelestialParallax.jsx`  
- `CelestialContext.jsx`  
- `SceneDebugHUD.jsx` (if present)  
- All `<CelestialBody />` components (Moon, Mars, etc.)

---

## ✅ Completion Criteria

- [ ] `useSceneTypeFromScroll` hook implemented and tested
- [ ] `sceneType` set and stored in `CelestialContext`
- [ ] Consumed by at least two active planets (e.g., Moon, Mars)
- [ ] Verified visual difference across all 4 scenes
- [ ] Logged or displayed via HUD
- [ ] Fully covered in test route (`/dev/combined-parallax-test`)
- [ ] LEGIT metadata present in controller + hook files

---

## 🧾 Metadata Example (CelestialController.jsx)

```js
export const metadata = {
  id: 'scene_type_controller',
  scs: 'SCS-SCENE-CONTROL-001',
  type: 'controller',
  doc: 'LEGIT_contract_sceneTypeController.md'
};
````

---

## 📘 Related Contracts

* `contract_celestial_controller.md`
* `contract_hooks_celestial.md`
* `contract_hooks_combined_parallax.md`
* `contract_routes_dev.md`

---

## 🔐 Author

Commander Tom / CuriousLabs HQ
Generated by Mission Control (ChatGPT)
