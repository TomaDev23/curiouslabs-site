# 📜 LEGIT Contract: Scroll Settings

**Contract ID:** `contract_scroll_settings.md`  
**Version:** 1.0.0  
**Schema Type:** LEGIT Component Configuration Contract  
**Status:** 🟢 LEGIT Compliant  
**Last Updated:** [Current Date]

## 🔍 Contract Purpose

Define the standard configuration for the premium "Boat in Water" scroll effect used across the cosmic journey experience to ensure consistent, smooth, and visually pleasing scrolling behavior that feels natural and luxurious.

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

## 🖥️ Component Usage Requirements

Any component that requires the "Boat in Water" scroll effect MUST:

1. Consume `smoothScrollProgress` instead of direct scroll values
2. Use `requestAnimationFrame` for any scroll-based animations
3. Avoid CSS transitions on scroll-positioned elements
4. Set `willChange: 'transform'` on scroll-animated elements

## 🚫 Prohibited Modifications

The following modifications are PROHIBITED as they break the LEGIT contract:

1. Changing the interpolation factor outside the allowed range
2. Removing the wheel event handler or setting `passive: true`
3. Using direct `window.scrollY` values for visual rendering
4. Adding scroll throttling or large-increment scroll jumps
5. Switching to CSS transitions for scroll-based animations

## 🔄 Permitted Extensions

The following extensions are PERMITTED within the LEGIT contract:

1. Adding device-specific interpolation factor adjustments
2. Implementing alternative curves (cubic, exponential) while maintaining the feeling
3. Adding debugging overlays in development mode
4. Performance optimizations that maintain visual parity

## 📊 Testing & Validation

To validate LEGIT compliance, the scroll implementation must pass:

1. **Smoothness Test**: No visible jumps or "clicky" behavior during scrolling
2. **Responsiveness Test**: No perceptible lag between user input and visual response
3. **Deceleration Test**: Natural "boat in water" stop after scroll release
4. **Small Movement Test**: Smooth handling of precise trackpad movements

## 💫 Visual Reference

The scroll behavior should create a premium feeling where content:
- Starts moving smoothly from rest
- Continues with stable momentum during active scrolling
- Gracefully decelerates like a boat gliding to a stop on water
- Never feels "jumpy", "sticky", or abruptly snaps

## 🧠 Implementation Notes

1. Optimized for both scroll wheel and trackpad input devices
2. Considers high DPI trackpads with precise movement detection
3. Maintains responsive feeling without sacrificing smoothness
4. Performance-optimized to maintain target framerates

---

**LEGIT Implementation Status:** ✅ VERIFIED  
**Integration Path:** `src/components/journey/CosmicJourneyController.jsx`  
**Authoritative Governance:** This contract is canonical for all scroll behavior across the app
