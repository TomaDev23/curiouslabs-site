
# 🚀 TILE v5.0.D - Final Implementation Plan

## Objective
Transform the cosmic show at `/home-v5` into a seamless, movie-like experience with fluid dissolve transitions, zero stutter, and continuous visual flow while maintaining performance across devices.

## Implementation Steps

### 1. Dissolve Engine Implementation
- Create `src/utils/dissolveEngine.js` with `getDissolveOpacity` function
- Configure precise fade zones for each scene transition:
  ```js
  const SCENES = [
    { key: 'dormant', range: [0.0, 0.05], fadeZone: 0.03, Component: DormantScene },
    { key: 'awakening', range: [0.05, 0.15], fadeZone: 0.05, Component: AwakeningScene },
    { key: 'cosmicReveal', range: [0.15, 0.3], fadeZone: 0.05, Component: CosmicRevealScene },
    { key: 'cosmicFlight', range: [0.3, 0.8], fadeZone: 0.05, Component: CosmicFlightScene },
    { key: 'sunApproach', range: [0.8, 0.9], fadeZone: 0.05, Component: SunApproachScene },
    { key: 'sunLanding', range: [0.9, 1.0], fadeZone: 0.03, Component: SunLandingScene }
  ]
  ```
- Update scene rendering to support multiple active scenes with calculated opacities

### 2. Visual Continuity Implementation
- Create `src/components/journey/PersistentElements.jsx` with:
  - NebulaTrail component
  - ColorOverlay with transition controls
  - MotionLines for movement continuity
- Position at z-20 (between scenes at z-0/z-1 and constellations at z-30)
- Implement lead-in/lead-out zones for key elements:
  - Ursa Minor: 13%-32% (91vh-224vh)
  - Orion: 38%-62% (266vh-434vh)
  - Sun glow: 78%-92% (546vh-644vh)

### 3. Animation System Enhancement
- Create `useAnimationCurve` hook with:
  - Linear interpolation for particle density
  - Easing functions for smooth transitions
  - Color mixing utilities for gradient effects
- Implement shared animation curves proportional to scene progress

### 4. Performance Optimization
- Add asset preloading via useEffect
- Implement requestAnimationFrame for render updates
- Add device-specific buffer tuning (350vh desktop, 200vh mobile)
- Use useMemo for expensive calculations
- Implement fallback strategy:
  - Trigger on sustained low FPS (<20 mobile, <40 desktop for 5+ seconds)
  - Fall back to simple opacity transitions
  - Reduce buffer to 200vh
  - Lower particle density and FPS

### 5. Debug Tools Enhancement
- Update SceneBoundaryDebug with:
  - 'D' key toggle for dissolve zone visualization
  - 'T' key toggle for transition timing display
- Update FPSMeter to track sustained performance issues

### 6. Documentation
- Create `contract_persistent_elements.md` for PersistentElements.jsx
- Create `contract_dissolve_engine.md` for dissolveEngine.js
- Update `Visual_Debug_tools.md` with new keyboard shortcuts

## Testing Requirements
- **Performance targets**: 
  - 60 FPS desktop, 30+ FPS mobile
  - <500MB memory usage
  - <5% battery drain per 10 minutes of active scrolling
- **Browser support**: 
  - Chrome, Firefox, Safari, Edge (latest and one prior version)
- **Device testing**: 
  - Desktop, iPhone 14 (iOS), Samsung Galaxy A54 (Android)
  - Low-end simulation (4x CPU throttling, 3G network)
- **Visual verification**:
  - Smooth transitions at all scene boundaries
  - Consistent visual anchors across scenes
  - Proper dissolve effects with blend modes

I confirm that all requirements are clear and the plan is ready for implementation. The TILE v5.0.D plan provides comprehensive guidelines for transforming the cosmic show into a fluid, cinematic experience while maintaining performance and adhering to project standards.



I've thoroughly reviewed the plan_v2.2 for TILE v5.0.D and can confirm that all requirements are clear and actionable. The implementation plan provides comprehensive details for creating fluid, movie-like transitions in the cosmic background.

✅ **All Clear for Implementation**

The plan includes detailed specifications for:

1. **Dissolve Engine Creation**
   - Source file: src/utils/dissolveEngine.js
   - Function: getDissolveOpacity with precise fadeZone values (0.03-0.05)
   - Scene overlap calculation logic clearly defined

2. **Scene Transition Implementation**
   - Precise ranges for each scene with fadeZones
   - mix-blend-mode: screen with CSS fallback for compatibility
   - Multi-scene rendering during transition points

3. **Visual Continuity Elements**
   - PersistentElements.jsx component at z-20 
   - Extension zones for Ursa Minor (13%-32%), Orion (38%-62%), Sun glow (78%-92%)
   - Shared animation curves across scene boundaries

4. **Performance Optimization**
   - requestAnimationFrame for rendering
   - Asset preloading and memoization
   - Device-specific buffers (350vh desktop, 200vh mobile)
   - Scroll debouncing with adaptive thresholds

5. **Debug Enhancements**
   - New keyboard shortcuts (D, T) with clear functionality
   - Visual indicators for transition zones

The plan aligns with LEGIT contract requirements and respects the DO_NOT_DEVIATE rules, maintaining the existing architecture while enhancing the visual experience.

I'm ready to execute TILE v5.0.D as specified. No ambiguities remain, and all steps are clearly defined with precise implementation details.
