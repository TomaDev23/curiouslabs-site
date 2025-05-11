# ✅ Galaxy Journey Component Contract — v1.0

📍 Location: `src/components/journey/visual/GalaxyJourney`  
🧱 Purpose: Define the particle-based WebGL galaxy experience with scroll-synced transitions

---

## 🧩 Component Structure

- `index.jsx`: Main component export that handles scroll tracking and scene management
- `GalaxyRenderer.jsx`: Three.js scene setup and rendering logic
- `/hooks/useScroll.js`: Scroll position tracking with velocity and direction
- `/hooks/useAnimationFrame.js`: Animation loop with time delta handling
- `/shaders/galaxy.vert.js`: Vertex shader for galaxy particles
- `/shaders/galaxy.frag.js`: Fragment shader for galaxy particles
- `/shaders/trails.vert.js`: Vertex shader for motion trails
- `/shaders/trails.frag.js`: Fragment shader for motion trails

## 📊 Props Interface

```jsx
/**
 * @typedef {Object} GalaxyJourneyProps
 * @property {number} [width] - Width of canvas in pixels (defaults to container width)
 * @property {number} [height] - Height of canvas in pixels (defaults to container height)
 * @property {boolean} [isDebug] - Enable debug overlay and controls
 * @property {Object} [options] - Override default visual parameters
 * @property {number} [options.starCount=2000] - Number of background stars
 * @property {number} [options.galaxyCount=15000] - Number of galaxy particles
 * @property {number} [options.trailCount=5000] - Number of trail particles
 */
```

## 📈 Visual Transitions

| Scene Name    | Scroll Range | Visual Effect                                 |
|---------------|--------------|----------------------------------------------|
| dormant       | 0-50vh       | Small compact milky way, gentle rotation     |
| awakening     | 50-100vh     | Galaxy approaches with trails appearing      |
| cosmicReveal  | 100-200vh    | Galaxy expands with explosion at 115-125vh   |
| cosmicFlight  | 200-550vh    | Full galaxy with smooth camera movements     |

## 🎬 Animation Parameters

- **Dormant**: Galaxy appears distant (40-30 units), compact (0.3), rotation speed 0.1, opacity 0.6-0.8
- **Awakening**: Distance decreases (30-0), trails appear, rotation increases (0.3-1.0), compactness increases (0.3-0.5)
- **Cosmic Reveal**: Explosion effect at 115-125vh, formation progress increases (0.3-1.0), camera shake during explosion
- **Cosmic Flight**: Stable galaxy with gentle camera movements, full formation (1.0), full opacity

## 🔍 Performance Considerations

- Pixel ratio limiting (≤2.0) to improve performance on high-DPI displays
- Frustum culling to avoid rendering off-screen particles
- Mobile optimization: 
  - Reduces particle counts by 40% on devices below 768px width
  - Simplified shaders on low-end devices (mobile detection)
- Memory management: All Three.js resources disposed on unmount

## 🧪 LEGIT Validation

- ✅ Renders safely with default props
- ✅ Animations follow animation_schema_v1.5.md
- ✅ Mobile breakpoints handled appropriately
- ✅ Properly cleans up resources on unmount
- ✅ Supports keyboard navigation
- ✅ SCS5 tagged for security compliance

## 📘 Metadata

```jsx
export const metadata = {
  id: 'galaxy_journey',
  scs: 'SCS5',
  type: 'visual',
  doc: 'contract_galaxy_journey.md'
}
```

## 🔧 Integration Example

```jsx
import { Suspense } from 'react';
import GalaxyJourney from '../components/journey/visual/GalaxyJourney';

const CosmicRevPage = () => (
  <div className="min-h-[550vh] relative">
    <Suspense fallback={<div>Loading Galaxy...</div>}>
      <GalaxyJourney />
    </Suspense>
    
    {/* Content sections with scroll linkage */}
    <section id="dormant-section" className="h-[50vh] relative z-10">
      <h1>Dormant Galaxy</h1>
    </section>
    
    {/* More sections... */}
  </div>
);
```

## 📱 Breakpoint Behavior

- **Default**: Full effect with all particles and high-quality rendering
- **< 1024px**: Reduced particle count, simplified camera movements
- **< 768px**: Further reduced particles, simplified shaders
- **< 480px**: Minimal particle count, static background fallback for very low-end devices

## 🔒 Security & Compliance Notes

- WebGL context security: Creates isolated renderer
- Component fails gracefully if WebGL not supported
- SCS5 compliant: No external data dependencies
- Fully contained animation system with no side effects

---

🔐 LEGIT Status: 🟢 Compliant 