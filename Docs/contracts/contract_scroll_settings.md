# 📜 LEGIT Contract: Scroll Settings

**Contract ID:** `contract_scroll_settings.md`  
**Version:** 1.1.0  
**Schema Type:** LEGIT Component Configuration Contract  
**Status:** 🟢 LEGIT Compliant  
**Last Updated:** [Current Date]

## 🔍 Contract Purpose

Define the standard configuration for the premium "Boat in Water" scroll effect used across the cosmic journey experience to ensure consistent, smooth, and visually pleasing scrolling behavior that feels natural and luxurious. This contract also defines how scroll behavior interacts with the layer system and HUD components.

## 🛠️ Technical Implementation

The scroll behavior is implemented in `CosmicJourneyController.jsx` and adheres to the following parameters:

```js
// Scroll Interpolation Settings
const interpolationFactor = 0.09; // Lower value = more echo and longer deceleration
const animationStopThreshold = 0.00001; // More sensitive threshold for longer animation
```

### Core Scrolling Algorithm

1. **Target & Smooth Progress Tracking**:
   - `targetScrollProgressRef` - Captures raw browser scroll position
   - `smoothScrollProgressRef` - Interpolated position used for all rendering 

2. **Scroll Event Handling**:
   - Browser `scroll` events update the target position
   - `requestAnimationFrame` loop smoothly interpolates between positions
   - Wheel events are managed for consistent, non-clicky behavior

3. **Scroll Math**:
   ```js
   // On each frame:
   const diff = targetScrollProgressRef.current - smoothScrollProgressRef.current;
   smoothScrollProgressRef.current += diff * interpolationFactor;
   ```

4. **Event Listener Configuration**:
   ```js
   window.addEventListener('scroll', handleScroll, { passive: true });
   window.addEventListener('wheel', handleWheel, { passive: false });
   ```

### 🌊 "Boat in Water" Effect

The signature "Boat in Water" effect is achieved through:

1. Low interpolation factor (0.09) creating gradual deceleration
2. Ultra-sensitive animation threshold (0.00001) extending animation time
3. Small movement accumulation preventing "clicky" behavior
4. Natural motion physics with smooth start/stop transitions

## ⚙️ Configuration Parameters

| Parameter | Value | Purpose | LEGIT Constraints |
|-----------|-------|---------|------------------|
| `interpolationFactor` | 0.09 | Controls deceleration speed | Range: 0.05-0.2 |
| `animationStopThreshold` | 0.00001 | Controls animation length | Range: 0.000001-0.0001 |
| `smallMovementThreshold` | 10 | Pixel threshold for movement accumulation | Range: 5-15 |
| `accumulationThreshold` | 5 | When to apply accumulated movement | Range: 3-8 |

## 🔢 Layer System Integration

The scroll behavior interacts with the layer system in the following ways:

| Layer | z-index Range | Scroll Interaction |
|-------|---------------|-------------------|
| Base Layer | 0-9 | Primary animation target for parallax and 3D effects |
| Content Layer | 10-50 | Section positions driven by scroll values |
| UI Control Layer | 60-90 | Position fixed, no direct scroll effects |
| HUD Layer | 100-109 | Independent of scroll, maintains fixed positions |
| Navigation Layer | 110-119 | Fixed position, may change style on scroll |
| Debug Overlay Layer | 120+ | Displays scroll metrics and debugging info |

### ScrollDebugOverlay

The ScrollDebugOverlay (z-120) provides real-time monitoring of:
- Current scroll position in pixels
- Scroll progress percentage
- Viewport height (vh) position
- Scroll velocity

## 🔄 HUD Interaction

HUDs must respect the following scroll interaction rules:

1. **Independent Positioning**:
   - HUDs must maintain fixed positions regardless of scroll
   - HUD positions must be saved independently of scroll state
   - HUDs should never move in response to scrolling

2. **Layer Transparency**:
   - HUDs must allow scroll-driven content to be visible
   - HUDs should use semi-transparent backgrounds
   - Critical HUD information should remain legible over any content

3. **Scroll Monitoring**:
   - ScrollPositionHUD monitors and visualizes scroll state
   - HUDs can react to scroll data but must not affect scrolling
   - Performance monitoring HUDs should track scroll performance

4. **Scrollable Content**:
   - HUDs with scrollable internal content must prevent event bubbling
   - Scrollable HUD content must use stopPropagation() on wheel events
   - Nested scrolling must not interfere with main page scrolling

## 🖥️ Component Usage Requirements

Any component that requires the "Boat in Water" scroll effect MUST:

1. Consume `smoothScrollProgress` instead of direct scroll values
2. Use `requestAnimationFrame` for any scroll-based animations
3. Avoid CSS transitions on scroll-positioned elements
4. Set `willChange: 'transform'` on scroll-animated elements
5. Ensure HUDs maintain proper z-index layering
6. Prevent wheel event capture by HUDs unless explicitly needed

## 🚫 Prohibited Modifications

The following modifications are PROHIBITED as they break the LEGIT contract:

1. Changing the interpolation factor outside the allowed range
2. Removing the wheel event handler or setting `passive: true`
3. Using direct `window.scrollY` values for visual rendering
4. Adding scroll throttling or large-increment scroll jumps
5. Switching to CSS transitions for scroll-based animations
6. Allowing HUDs to interfere with scroll behavior
7. Positioning scroll-dependent elements outside proper layers

## 🔄 Permitted Extensions

The following extensions are PERMITTED within the LEGIT contract:

1. Adding device-specific interpolation factor adjustments
2. Implementing alternative curves (cubic, exponential) while maintaining the feeling
3. Adding debugging overlays in development mode
4. Performance optimizations that maintain visual parity
5. HUD-specific scroll visualizations that don't affect scroll behavior
6. Enhanced scroll debugging tools in the Debug Overlay Layer

## 📊 Testing & Validation

To validate LEGIT compliance, the scroll implementation must pass:

1. **Smoothness Test**: No visible jumps or "clicky" behavior during scrolling
2. **Responsiveness Test**: No perceptible lag between user input and visual response
3. **Deceleration Test**: Natural "boat in water" stop after scroll release
4. **Small Movement Test**: Smooth handling of precise trackpad movements
5. **Layer Integrity Test**: No z-index violations during scrolling
6. **HUD Independence Test**: HUDs remain functional during scrolling
7. **Performance Test**: Maintains target framerate during scroll

## 💫 Visual Reference

The scroll behavior should create a premium feeling where content:
- Starts moving smoothly from rest
- Continues with stable momentum during active scrolling
- Gracefully decelerates like a boat gliding to a stop on water
- Never feels "jumpy", "sticky", or abruptly snaps
- Maintains proper layering of UI elements throughout

## 🧠 Implementation Notes

1. Optimized for both scroll wheel and trackpad input devices
2. Considers high DPI trackpads with precise movement detection
3. Maintains responsive feeling without sacrificing smoothness
4. Performance-optimized to maintain target framerates
5. Properly integrates with the layer system
6. Respects HUD positioning and visibility
7. Provides debugging through ScrollDebugOverlay

---

**LEGIT Implementation Status:** ✅ VERIFIED  
**Integration Path:** `src/components/journey/CosmicJourneyController.jsx`  
**Authoritative Governance:** This contract is canonical for all scroll behavior across the app
