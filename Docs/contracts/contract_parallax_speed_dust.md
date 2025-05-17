# ✅ ParallaxSpeedDust LEGIT Contract — v1.0

📍 Location: src/components/visual/ParallaxSpeedDust.jsx  
🧱 Purpose: Define specifications for the depth-aware particle system in cosmic flight scenes
🔒 Status: **CURRENT**

---

## 🎯 Component Identity

| Property | Value |
|----------|-------|
| Name | `ParallaxSpeedDust` |
| Type | Visual Component |
| LEGIT Status | 🟢 LEGIT |
| SCS Tag | SCS5 |
| Layer | Content Layer |
| Z-Index | z-20 |

---

## 📊 Technical Specifications

### Scene Integration
- **Scene Range**: 0.25 - 0.85 scroll progress
- **Viewport**: Full screen width/height
- **Canvas**: 2D context with hardware acceleration
- **Persistence**: Maintains animation across scene transitions

### Depth Bands
| Band | Speed Factor | Opacity Factor | Purpose |
|------|--------------|----------------|----------|
| NEAR | 1.0 | 1.0 | Foreground particles |
| MID | 0.85 | 0.85 | Middle-distance particles |
| FAR | 0.65 | 0.65 | Background particles |

### Particle Properties
- **Minimum Count**: 75 particles
- **Base Speed**: 0.8 minimum
- **Length**: 8-23px
- **Distribution**: 150% canvas height
- **Phase**: Random (0-2π)
- **Pulse Speed**: 0.5-1.5
- **Pulse Strength**: 0.15-0.35

---

## 🎮 Props Interface

```typescript
interface ParallaxSpeedDustProps {
  opacity?: number;       // Overall visibility (0-1)
  speed?: number;        // Base movement speed (min 0.8)
  density?: number;      // Minimum particle count (min 75)
  fps?: number;         // Animation frame rate
  scrollProgress: number; // Current scroll position (0-1)
}
```

### Default Values
```typescript
const defaultProps = {
  opacity: 1,
  speed: 1,
  density: 75,
  fps: 60
}
```

---

## 🎨 Animation Contract

### Base Movement
- Constant directional flow
- Speed scaled by depth band
- Smooth interpolation between states

### Scroll Coupling
- Parallax effect tied to scroll position
- Depth-aware movement scaling
- Maintains visibility during transitions

### Breathing Effect
- Subtle size/opacity pulsing
- Randomized phase per particle
- Configurable strength and speed

---

## 🛠️ Performance Requirements

### Initialization
- Guaranteed minimum particle count
- Automatic recovery from missing particles
- Proper canvas context setup

### Runtime
- Efficient particle updates
- Proper animation state tracking
- Cleanup on unmount
- Hardware acceleration when available

### Mobile Optimization
- Reduced particle count on mobile
- Optimized render cycles
- Touch event handling

---

## 🔍 Quality Assurance

### Visual Tests
- [ ] Particle distribution verification
- [ ] Depth band visibility check
- [ ] Scroll transition smoothness
- [ ] Mobile rendering quality

### Performance Tests
- [ ] FPS monitoring (target: 60fps)
- [ ] Memory usage tracking
- [ ] GPU utilization check
- [ ] Mobile device battery impact

### Integration Tests
- [ ] Scene transition verification
- [ ] Scroll position accuracy
- [ ] Component cleanup check
- [ ] Error boundary testing

---

## 🔐 Export & Integration Rules

### Usage Requirements
```jsx
import ParallaxSpeedDust from 'src/components/visual/ParallaxSpeedDust';

<ParallaxSpeedDust
  scrollProgress={currentProgress}
  opacity={0.8}
  speed={1.2}
  density={100}
/>
```

### Integration Constraints
- Must be wrapped in a relative/absolute positioned container
- Container must have defined dimensions
- Canvas context must be available
- Hardware acceleration recommended

### SSR Considerations
- Safely renders placeholder in SSR
- Hydrates properly on client
- No SSR/CSR mismatch

---

## 📝 Metadata Declaration

```javascript
export const metadata = {
  id: 'parallax_speed_dust',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_parallax_speed_dust.md'
}
```

---

## 🔄 Change Management

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Current | Initial LEGIT contract |

---

🔒 This contract is binding under LEGIT.PROTOCOL.v1 