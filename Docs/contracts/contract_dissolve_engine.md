# 🎬 Dissolve Engine Contract - CuriousLabs (v1.0)

📍 Path: `src/utils/dissolveEngine.js`  
🔒 Status: **ACTIVE**

## 📚 Purpose
Dissolve Engine provides utilities for calculating smooth, cinematic transitions between scenes in the CosmicJourneyController. It enables multiple scenes to be visible simultaneously during transitions, creating film-like dissolve effects.

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
- Calculates linear fade based on position within fade zone

#### Example Usage
```js
// At 4.5% scroll position, with DormantScene (0-5%) and fadeZone of 0.03
const dormantOpacity = getDissolveOpacity(0.045, 0.0, 0.05, 0.03); // Returns 1.0
const awakeningOpacity = getDissolveOpacity(0.045, 0.05, 0.15, 0.05); // Returns partial opacity
```

### 2. `getFadeBlendClass`

#### Function Signature
```js
function getFadeBlendClass()
```

#### Return Value
Returns a CSS class string with styles for creating fade blend effects in browsers that don't support mix-blend-mode.

#### Example Usage
```js
// Inject styles into document
const styleEl = document.createElement('style');
styleEl.textContent = getFadeBlendClass();
document.head.appendChild(styleEl);

// Apply class to element
<div className="fade-blend">...</div>
```

## 🖥️ Typical Scene Configuration

### Fade Zone Values
| Scene | Range | Fade Zone | Effective Range |
|-------|-------|-----------|----------------|
| DormantScene | 0.0 - 0.05 | 0.03 | -0.03 to 0.08 |
| AwakeningScene | 0.05 - 0.15 | 0.05 | 0.0 to 0.20 |
| CosmicRevealScene | 0.15 - 0.3 | 0.05 | 0.10 to 0.35 |
| CosmicFlightScene | 0.3 - 0.8 | 0.05 | 0.25 to 0.85 |
| SunApproachScene | 0.8 - 0.9 | 0.05 | 0.75 to 0.95 |
| SunLandingScene | 0.9 - 1.0 | 0.03 | 0.87 to 1.03 |

## 🧮 Visualization
```
Scene Range:   |------|
Fade Zone:  |--|    |--|
Opacity:    /‾‾‾‾‾‾‾‾\
```

## 🔄 Example Transition
At scroll position 0.13:
- CosmicRevealScene: 0 (not yet visible)
- AwakeningScene: 1.0 (fully visible)
- DormantScene: 0 (no longer visible)

At scroll position 0.145:
- CosmicRevealScene: 0.9 (fading in, almost fully visible)
- AwakeningScene: 0.9 (fading out, still mostly visible)
- DormantScene: 0 (no longer visible)

## 🧠 Integration Notes
- This utility is designed to work with the CosmicJourneyController
- It enables multiple scenes to be visible simultaneously during transitions
- Should be used with `mix-blend-mode: screen` for optimal visual effect
- Provides fallback CSS for browsers with limited support for advanced blend modes 