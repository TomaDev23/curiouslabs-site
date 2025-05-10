
# 🛠 CuriousLabs Visual Debug Tools

## Overview
This document catalogs the debug tools implemented for the TILE v5.0.C cosmic show. These tools assist in development, testing, and optimization of scroll-based interfaces.

## 1. Scene Boundary Debug
**Purpose**: Visualizes scene boundaries and scroll position with percentage and vh measurements.

**Features**:
- Interactive scene boundary visualization
- Toggle between percent and vh value display (V key)
- Collapsible interface to reduce visual clutter
- Active scene highlighting
- Visual scroll progress tracker

**Integration**:
```jsx
import SceneBoundaryDebug from '../components/journey/debug/SceneBoundaryDebug';

// Usage
{isDev && <SceneBoundaryDebug 
  scenes={SCENES} 
  scrollProgress={scrollProgress} 
/>}
```

**Keyboard Shortcuts**:
- `V`: Toggle VH value display

## 2. FPS Monitor
**Purpose**: Measures and displays frames per second with visual performance indicators.

**Features**:
- Real-time FPS tracking with color-coded indicators
- VH marker toggle button
- Performance threshold visual indicators
- Collapsible interface
- Performance visualization gauge

**Integration**:
```jsx
import FPSMeter from '../components/journey/debug/FPSMeter';

// Usage
{isDev && showFpsMeter && <FPSMeter />}
```

**Keyboard Shortcuts**:
- `F`: Toggle FPS meter visibility
- `M`: Toggle VH markers in viewport

## 3. VH Markers
**Purpose**: Displays visual markers at 100vh intervals to aid content placement.

**Features**:
- Markers at 100vh, 200vh, 300vh, 400vh, 500vh, and 600vh
- Toggleable visibility
- Visual labels with vh measurements
- Dashed border styling for visual clarity

**Integration**:
```jsx
{isDev && (
  <div className="fixed inset-0 pointer-events-none z-40">
    {[100, 200, 300, 400, 500, 600].map((vh) => (
      <div 
        key={vh}
        data-vh-marker
        className="absolute left-0 w-full border-t border-dashed border-blue-500/30"
        style={{ top: `${vh}vh` }}
      >
        <span className="bg-black/70 text-blue-400 px-2 py-1 text-xs rounded">
          {vh}vh
        </span>
      </div>
    ))}
  </div>
)}
```

## 4. Debug Overlay
**Purpose**: Displays detailed technical information about the current state.

**Features**:
- Current scroll position (percentage and vh)
- Active scene name
- Scene progress percentage
- Particle configuration details
- Available keyboard shortcuts

**Integration**:
```jsx
const DebugOverlay = () => (
  <div className="fixed top-4 left-4 z-50 bg-black/70 p-3 rounded text-xs text-white font-mono">
    <div className="mb-1">Scroll: {Math.round(scrollProgress * 100)}% ({Math.round(scrollProgress * 700)}vh)</div>
    <div className="mb-1">Scene: <span className="text-green-400">{SCENES[validSceneIndex].key}</span></div>
    <div className="mb-1">Progress: {Math.round(sceneProgress * 100)}%</div>
    <div className="mb-1">Particles: {globalParticleConfig.density} @ {globalParticleConfig.fps}fps</div>
    <div className="text-xs text-gray-400">Press F to toggle FPS meter</div>
    <div className="text-xs text-gray-400">Press V to toggle VH values</div>
    <div className="text-xs text-gray-400">Press M to toggle VH markers</div>
  </div>
);
```

## 5. Scene Visibility Debug
**Purpose**: Monitors which scenes are mounted/unmounted for performance optimization.

**Features**:
- Console logging of mounted scenes
- Automatic unmounting of scenes >300vh from viewport
- Maintains 50vh buffer for smooth transitions

**Integration**:
```jsx
import { useSceneVisibility } from './hooks/useSceneVisibility';

// Usage
const visibleScenes = useSceneVisibility(SCENES, scrollProgress, validSceneIndex);

// In component rendering
<div style={{ display: visibleScenes.includes(key) ? 'block' : 'none' }}>
  {visibleScenes.includes(key) && <Component />}
</div>
```

## 6. Performance Config Debug
**Purpose**: Optimizes particle configuration based on device capabilities and current scene.

**Features**:
- Device detection (mobile vs desktop)
- Scene-specific optimizations
- Automatic adjustment of:
  - Particle density
  - Animation speed
  - FPS limits
  - Glow intensity

**Integration**:
```jsx
import { useParticlePerformanceConfig } from './hooks/useParticlePerformanceConfig';

// Usage
const globalParticleConfig = useParticlePerformanceConfig(currentSceneKey);
```

## 7. Data Attributes
**Purpose**: HTML data attributes for debugging and tracing.

**Available Attributes**:
- `data-scroll-zone`: Marks scroll zone sections (0-6)
- `data-constellation-id`: Identifies constellation elements ("ursa", "orion")
- `data-vh-marker`: Identifies toggleable VH markers

**Integration**:
```jsx
<section data-scroll-zone={i} className="h-screen w-full" />
<div data-constellation-id="ursa" className="fixed left-0 w-1/2 h-full" />
<div data-vh-marker className="absolute left-0 w-full" />
```

## Usage Guidelines
1. All debug tools are only visible in development mode
2. Use keyboard shortcuts to toggle visibility
3. Combine tools for comprehensive debugging (e.g., FPSMeter + SceneBoundaryDebug)
4. Monitor console for additional debugging information
5. Use data attributes for DOM inspection and event tracking

## Keyboard Shortcuts Summary
- `F`: Toggle FPS meter
- `V`: Toggle VH values in SceneBoundaryDebug
- `M`: Toggle VH markers in viewport
