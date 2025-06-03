# 📜 LEGIT Contract: Smooth Scroll System V6

**Contract ID:** `contract_smooth_scroll_v6.md`  
**Version:** 1.0.0  
**Schema Type:** LEGIT Component Configuration Contract  
**Status:** 🟢 LEGIT Compliant  
**Last Updated:** December 2024  
**Implementation:** `src/pages/v6_home.jsx`

## 🔍 Contract Purpose

Define the authoritative smooth scroll system for the V6 home page that eliminates jittery 100px scroll jumps and provides a premium "Boat in Water" scrolling experience with ultra-smooth small increments, natural deceleration, and flowing visual feedback.

## 🛠️ Technical Implementation

The smooth scroll system is implemented in `src/pages/v6_home.jsx` and completely overrides browser default scrolling behavior to provide precise control over scroll increments and animation.

### Core Architecture

```js
// State Management
const [scrollProgress, setScrollProgress] = useState(0);
const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);

// Refs for smooth scroll implementation
const targetScrollProgressRef = useRef(0);
const smoothScrollProgressRef = useRef(0);
const animationRef = useRef(null);
const smallMovementAccumulator = useRef(0);
```

### Critical Parameters

| Parameter | Value | Purpose | Impact |
|-----------|-------|---------|---------|
| `interpolationFactor` | 0.04 | Controls deceleration smoothness | Lower = smoother, longer deceleration |
| `animationStopThreshold` | 0.0000001 | Animation sensitivity | Lower = longer animation duration |
| `wheelSensitivity` | 0.3 | Scroll input sensitivity | Lower = smaller increments |
| `maxScrollDelta` | 15 | Maximum pixels per scroll event | Prevents large jumps |

## 🎯 Key Features

### **1. Wheel Event Interception**
```js
const handleWheel = (e) => {
  e.preventDefault(); // CRITICAL: Prevents default browser scrolling
  
  // Calculate smooth scroll delta with reduced sensitivity
  let deltaY = e.deltaY * wheelSensitivity;
  
  // Clamp the delta to prevent large jumps
  deltaY = Math.max(-maxScrollDelta, Math.min(maxScrollDelta, deltaY));
  
  // Manual scroll control
  window.scrollTo({
    top: newScrollY,
    behavior: 'auto' // CRITICAL: Use 'auto' not 'smooth'
  });
};
```

### **2. Ultra-Smooth Animation Loop**
```js
const animateScroll = () => {
  const diff = targetScrollProgressRef.current - smoothScrollProgressRef.current;
  
  if (Math.abs(diff) > animationStopThreshold) {
    smoothScrollProgressRef.current += diff * interpolationFactor;
    setSmoothScrollProgress(smoothScrollProgressRef.current);
    setScrollProgress(smoothScrollProgressRef.current);
    
    animationRef.current = requestAnimationFrame(animateScroll);
  } else {
    // Snap to target and stop
    smoothScrollProgressRef.current = targetScrollProgressRef.current;
    setSmoothScrollProgress(smoothScrollProgressRef.current);
    setScrollProgress(smoothScrollProgressRef.current);
    animationRef.current = null;
  }
};
```

### **3. Event Listener Configuration**
```js
// CRITICAL: Non-passive wheel listener to enable preventDefault
window.addEventListener('wheel', handleWheel, { passive: false });
window.addEventListener('scroll', handleScroll, { passive: true });
```

## 🚫 Critical Requirements

### **MUST DO:**
1. **Always use `e.preventDefault()`** in wheel handler
2. **Set wheel listener to `{ passive: false }`** to enable preventDefault
3. **Use `behavior: 'auto'`** in window.scrollTo() calls
4. **Clamp deltaY** to prevent large scroll jumps
5. **Use ultra-low interpolation factor** (0.04 or lower)
6. **Provide both `scrollProgress` and `smoothScrollProgress`** states

### **NEVER DO:**
1. **Remove `e.preventDefault()`** - Will cause 100px jumps to return
2. **Set wheel listener to passive** - preventDefault won't work
3. **Use `behavior: 'smooth'`** - Conflicts with our custom smoothing
4. **Allow unclamped deltaY values** - Causes large scroll jumps
5. **Use high interpolation factors** - Makes scrolling feel choppy
6. **Remove the animation loop** - Eliminates smooth visual feedback

## 🔧 Parameter Tuning Guide

### **For Smoother Scrolling:**
- **Decrease `interpolationFactor`** (0.04 → 0.03)
- **Decrease `animationStopThreshold`** (0.0000001 → 0.00000001)
- **Decrease `wheelSensitivity`** (0.3 → 0.2)

### **For More Responsive Scrolling:**
- **Increase `interpolationFactor`** (0.04 → 0.06)
- **Increase `wheelSensitivity`** (0.3 → 0.4)
- **Keep `maxScrollDelta` low** (15px maximum)

### **For Different Devices:**
```js
// Mobile optimization
const isMobile = window.innerWidth <= 768;
const wheelSensitivity = isMobile ? 0.2 : 0.3;
const interpolationFactor = isMobile ? 0.03 : 0.04;
```

## 🐛 Troubleshooting Guide

### **Problem: Scroll feels jittery/jumpy**
**Solution:** Check these in order:
1. Verify `e.preventDefault()` is present in wheel handler
2. Confirm wheel listener is `{ passive: false }`
3. Ensure `maxScrollDelta` is 15 or lower
4. Lower `interpolationFactor` to 0.03 or below

### **Problem: Scroll is too slow/unresponsive**
**Solution:**
1. Increase `wheelSensitivity` (0.3 → 0.4)
2. Increase `interpolationFactor` (0.04 → 0.06)
3. Check if `deltaY` is being clamped too aggressively

### **Problem: Animation doesn't stop smoothly**
**Solution:**
1. Lower `animationStopThreshold` (0.0000001 → 0.00000001)
2. Verify animation cleanup in useEffect return function

### **Problem: Scroll conflicts with other components**
**Solution:**
1. Ensure other components use `smoothScrollProgress` not raw scroll
2. Check for competing scroll event listeners
3. Verify z-index layering doesn't interfere

## 📊 Performance Considerations

### **Optimization Techniques:**
1. **RequestAnimationFrame batching** - All updates in single frame
2. **Pending update flags** - Prevents multiple simultaneous updates
3. **Animation cleanup** - Proper cleanup prevents memory leaks
4. **Threshold-based stopping** - Prevents infinite micro-animations

### **Performance Monitoring:**
```js
// Add to development builds
const frameStart = performance.now();
// ... scroll logic ...
const frameTime = performance.now() - frameStart;
if (frameTime > 16.67) console.warn('Scroll frame budget exceeded:', frameTime);
```

## 🎨 Visual Integration

### **Component Usage:**
```js
// Use smoothScrollProgress for visual elements
<V6HUDSystem 
  sections={V6_SECTIONS}
  scrollProgress={smoothScrollProgress} // Use smooth version
/>

// For parallax effects
const parallaxOffset = smoothScrollProgress * 100;
```

### **CSS Considerations:**
```css
/* Ensure smooth transforms */
.scroll-animated {
  will-change: transform;
  transform: translateZ(0); /* Force GPU acceleration */
}

/* Disable browser smooth scrolling */
html {
  scroll-behavior: auto !important;
}
```

## 🔄 Migration Guide

### **From Basic Scroll to Smooth Scroll:**

1. **Add state variables:**
```js
const [smoothScrollProgress, setSmoothScrollProgress] = useState(0);
const targetScrollProgressRef = useRef(0);
const smoothScrollProgressRef = useRef(0);
const animationRef = useRef(null);
```

2. **Replace scroll handler:**
```js
// OLD: Basic scroll tracking
const handleScroll = () => {
  const progress = window.scrollY / scrollHeight;
  setScrollProgress(progress);
};

// NEW: Smooth scroll system
// (Use the full implementation from this contract)
```

3. **Update component props:**
```js
// Change from scrollProgress to smoothScrollProgress
<Component scrollProgress={smoothScrollProgress} />
```

## 🧪 Testing Checklist

- [ ] **Smooth small movements** - Trackpad micro-scrolls feel fluid
- [ ] **No 100px jumps** - Large scroll wheel movements are clamped
- [ ] **Natural deceleration** - Scroll continues smoothly after input stops
- [ ] **Responsive feedback** - Visual elements follow scroll immediately
- [ ] **Performance** - Maintains 60fps during scrolling
- [ ] **Cross-device** - Works on trackpad, mouse wheel, and touch
- [ ] **No conflicts** - Other scroll-dependent components work correctly

## 💫 Expected User Experience

The scroll should feel like:
- **Luxury car suspension** - Smooth absorption of input variations
- **Boat gliding on water** - Natural momentum and deceleration
- **Premium software** - Responsive but never jarring
- **Fluid animation** - Visual elements flow seamlessly with scroll

## 🔗 Related Contracts

- `contract_scroll_settings.md` - Legacy scroll system (deprecated)
- `contract_parallax_effects.md` - Scroll-driven visual effects
- `contract_performance_monitoring.md` - Performance optimization guidelines

---

**LEGIT Implementation Status:** ✅ VERIFIED  
**Integration Path:** `src/pages/v6_home.jsx` (lines 67-180)  
**Authoritative Governance:** This contract is canonical for V6 home page scrolling behavior

**⚠️ CRITICAL:** Any modifications to scroll behavior MUST follow this contract to maintain the premium user experience and prevent regression to jittery scrolling. 