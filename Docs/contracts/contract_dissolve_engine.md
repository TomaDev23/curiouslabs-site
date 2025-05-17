# 🎬 Dissolve Engine Contract - CuriousLabs (v1.1)

📍 Path: `src/utils/dissolveEngine.js`  
🔒 Status: **ACTIVE**

## 📚 Purpose
Dissolve Engine provides utilities for calculating smooth, cinematic transitions between scenes in the CosmicJourneyController. It enables multiple scenes to be visible simultaneously during transitions, creating film-like dissolve effects with special handling for the initial Dormant scene.

## 🧩 API Reference

### 1. `getDissolveOpacity`

#### Function Signature
```js
function getDissolveOpacity(scrollProgress, sceneStart, sceneEnd, fadeZone)
```

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| scrollProgress | Number (0-1) | Current scroll progress as a decimal percentage |
| sceneStart | Number (0-1) | Scene's starting point as a decimal percentage |
| sceneEnd | Number (0-1) | Scene's ending point as a decimal percentage |
| fadeZone | Number (0-1) | Size of transition zone for fading in/out |

#### Return Value
Returns a number between 0 and 1 representing the opacity that should be applied to the scene.

#### Behavior
- Returns 0 if scene is completely outside view (including fade zone)
- Returns 1 if scroll position is within main scene boundaries
- Returns a value between 0-1 if in fade-in or fade-out zone
- Special handling for Dormant scene to ensure smooth entry and extended fade-out
- Uses cubic-bezier easing for smooth transitions

#### Example Usage
```js
// At start, with DormantScene (0-8%) and fadeZone of 0.08
const dormantOpacity = getDissolveOpacity(0.0, 0.0, 0.08, 0.08); // Returns 1.0
const awakeningOpacity = getDissolveOpacity(0.045, 0.05, 0.15, 0.08); // Returns partial opacity
```

### 2. `getDissolveZIndex`

#### Function Signature
```js
function getDissolveZIndex(opacity, baseZIndex)
```

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| opacity | Number (0-1) | Current opacity of the scene |
| baseZIndex | Number | Base z-index for the scene |

#### Return Value
Returns a calculated z-index value that ensures proper scene layering during transitions.

### 3. `getFadeBlendClass`

#### Function Signature
```js
function getFadeBlendClass()
```

#### Return Value
Returns CSS classes for optimized scene rendering with proper GPU acceleration and transitions.

#### Example Usage
```js
// Inject styles into document
const styleEl = document.createElement('style');
styleEl.textContent = getFadeBlendClass();
document.head.appendChild(styleEl);

// Apply class to scene layer
<div className="scene-layer">...</div>
```

## 🖥️ Scene Configuration

### Current Scene Values
| Scene | Range | Fade Zone | Transition Duration | Notes |
|-------|-------|-----------|---------------------|-------|
| DormantScene | 0.0 - 0.08 | 0.08 | 3.5s | Extended fade for smooth entry |
| AwakeningScene | 0.05 - 0.15 | 0.08 | 3.5s | Overlaps with Dormant |
| CosmicRevealScene | 0.15 - 0.3 | 0.08 | 3.5s | Standard transition |
| CosmicFlightScene | 0.3 - 0.8 | 0.015 | 2.0s | Includes persistent ParallaxSpeedDust (0.25-0.85) |
| SunApproachScene | 0.8 - 0.9 | 0.015 | 2.0s | Faster transition |
| SunLandingScene | 0.9 - 1.0 | 0.01 | 2.0s | Quick final transition |

## 🧮 Transition Visualization
```
Scene Range:      |---------|
Fade Zone:    |--|         |--|
Mount Zone: |--|             |--|
Opacity:      /‾‾‾‾‾‾‾‾‾\
```

## 🔄 Example Transitions

### Initial Load (0% scroll)
- DormantScene: 1.0 (fully visible)
- AwakeningScene: 0 (not yet visible)

### Dormant to Awakening (5% scroll)
- DormantScene: ~0.9 (fading out)
- AwakeningScene: ~0.1 (fading in)

### Mid-Transition (6.5% scroll)
- DormantScene: ~0.5 (mid-fade)
- AwakeningScene: ~0.5 (mid-fade)

### Complete Transition (8% scroll)
- DormantScene: 0 (fully faded)
- AwakeningScene: 1.0 (fully visible)

## 🧠 Integration Notes
- Scenes mount 2% before their fade-in point (`start - 0.02`)
- Scenes hold at 0 opacity for 0.5% scroll before starting fade (`start + 0.005`)
- Dormant scene has special handling to ensure smooth entry and extended fade
- Uses cubic-bezier timing function for natural easing
- Implements visibility toggling for performance optimization
- Proper GPU acceleration through will-change and transform properties
- Integrates with centralized ScrollPipeline for optimized updates
- Uses master animation loop for coordinated transitions
- Implements frame timing diagnostics for performance monitoring

## 🔧 Performance Optimizations

### Frame Timing
- Target frame time: 16.67ms (60fps)
- Warning threshold: 25.0ms (40fps)
- Critical threshold: 33.33ms (30fps)

### Scroll Handling
- Uses ScrollPipeline for efficient scroll updates
- Batches opacity calculations in RAF loop
- Optimizes scroll event handling with passive listeners

### Memory Management
- Proper cleanup of transition effects
- Efficient resource allocation and deallocation
- Optimized canvas management through CanvasContainer

### Mobile Optimization
- Reduced transition complexity on mobile devices
- Touch-optimized scroll handling
- Dynamic quality adjustments based on device capabilities

### Monitoring
- Real-time performance tracking
- Frame timing analysis
- Transition smoothness verification
- Resource usage monitoring

## 🎮 Scene Configuration

### Current Scene Values
| Scene | Range | Fade Zone | Transition Duration | Notes |
|-------|-------|-----------|---------------------|-------|
| DormantScene | 0.0 - 0.08 | 0.08 | 3.5s | Extended fade for smooth entry |
| AwakeningScene | 0.05 - 0.15 | 0.08 | 3.5s | Overlaps with Dormant |
| CosmicRevealScene | 0.15 - 0.3 | 0.08 | 3.5s | Standard transition |
| CosmicFlightScene | 0.3 - 0.8 | 0.015 | 2.0s | Includes persistent ParallaxSpeedDust (0.25-0.85) |
| SunApproachScene | 0.8 - 0.9 | 0.015 | 2.0s | Faster transition |
| SunLandingScene | 0.9 - 1.0 | 0.01 | 2.0s | Quick final transition |

## 🧮 Transition Visualization
```
Scene Range:      |---------|
Fade Zone:    |--|         |--|
Mount Zone: |--|             |--|
Opacity:      /‾‾‾‾‾‾‾‾‾\
```

## 🔄 Example Transitions

### Initial Load (0% scroll)
- DormantScene: 1.0 (fully visible)
- AwakeningScene: 0 (not yet visible)

### Dormant to Awakening (5% scroll)
- DormantScene: ~0.9 (fading out)
- AwakeningScene: ~0.1 (fading in)

### Mid-Transition (6.5% scroll)
- DormantScene: ~0.5 (mid-fade)
- AwakeningScene: ~0.5 (mid-fade)

### Complete Transition (8% scroll)
- DormantScene: 0 (fully faded)
- AwakeningScene: 1.0 (fully visible)

## 🧠 Integration Notes
- Scenes mount 2% before their fade-in point (`start - 0.02`)
- Scenes hold at 0 opacity for 0.5% scroll before starting fade (`start + 0.005`)
- Dormant scene has special handling to ensure smooth entry and extended fade
- Uses cubic-bezier timing function for natural easing
- Implements visibility toggling for performance optimization
- Proper GPU acceleration through will-change and transform properties 