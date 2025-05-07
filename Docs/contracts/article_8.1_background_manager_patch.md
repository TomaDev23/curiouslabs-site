

## ✅ CURIOUSLABS CONTRACT SEALING

### 🎞️ `TILE T2.6 – Cosmic Backdrop Integration`

**LEGIT SPEC TITLE:**
📄 `article_8.1_background_manager_patch.md`
📍 Save to: `C:\website_build\Docs\contracts\article_8.1_background_manager_patch.md`

---

### 🔒 PURPOSE

This contract introduces the **BackgroundManager** component and formalizes the new **multi-zone background protocol** for the `/v4` homepage. It standardizes how background assets are layered, loaded, and triggered across scroll sections.

---

## 🧩 COMPONENT: `BackgroundManager.jsx`

### 🧠 ROLE

> Provides a persistent canvas-based background layer for `/v4`, independently rendering dynamic assets such as nebula, gradients, noise, and radial fields, while syncing to scroll position and zone triggers.

---

## 🛠️ SCHEMA

### 🔁 Zones

Each background section is declared in this schema:

```js
const ZONE_BACKGROUND_MAP = {
  hero: ['stars', 'radial_top_left', 'nebula_ambient', 'light_beams', 'spark_particles', 'noise_fade'],
  mission: ['radial_bottom_right', 'nebula_ambient', 'noise_fade'],
  services: ['nebula_center_glow', 'spark_particles'],
  projects: ['light_grid', 'color_fade_scroll', 'grid_animator'],
  testimonials: ['radial_violet_sheen', 'typing_bots'],
  footer: ['quiet_space_blur'],
}
```

---

### 📦 Module Location

| File           | Path                                                          |
| -------------- | ------------------------------------------------------------- |
| Component      | `src/components/system/BackgroundManager.jsx`                 |
| Hook           | `useBackgroundZone()` – syncs scroll with current active zone |
| Asset Registry | `src/constants/background_assets.js`                          |

---

## 🎛️ BEHAVIOR CONTRACT

| Feature          | Description                                     |
| ---------------- | ----------------------------------------------- |
| Mounting         | Renders once, above `<App/>` content            |
| Sync             | Listens to scroll and triggers zone transitions |
| Canvas Control   | Enables `useRef` canvas + gradient draw cycles  |
| Lazy Load        | Only activates current + adjacent zones         |
| Opacity Shift    | Uses motion.div fade per zone enter             |
| Performance Mode | SSR safe, fallback: `fallback_static.svg`       |
| Reduced Motion   | Respects user's motion preferences              |
| Debug Mode       | Toggle with Ctrl+Shift+B for development        |

---

## 🎨 ASSET TYPES

| Layer   | Type                | Example                           |
| ------- | ------------------- | --------------------------------- |
| Layer 1 | Starfield Canvas    | `SpaceCanvas`                     |
| Layer 2 | Radial Gradient     | `radial_top_left`, `bottom_right` |
| Layer 3 | Noise/Overlay       | `CosmicNoiseOverlay`              |
| Layer 4 | Light Beams/Effects | `light_beams`, `spark_particles`  |
| Layer 4 | Grid Animation      | `grid_animator`                   |
| Layer 4 | Typing Indicators   | `typing_bots`                     |

---

## 🧪 TEST PLAN

| Scenario          | Expected                                        |
| ----------------- | ----------------------------------------------- |
| Desktop scroll    | Triggers fades and parallax                     |
| SSR fallback      | Static noise/svg fallback                       |
| Hydration         | No mismatch                                     |
| Performance       | Does not remount per scroll                     |
| Reduced Motion    | Simplified animations, fewer assets             |
| Debug Mode        | Shows zone boundaries and performance metrics   |
| Adjacent Loading  | Preloads zones before user scrolls to them      |

---

## 🔁 DEV INTEGRATION

1. `import BackgroundManager from '@/components/system/BackgroundManager'`
2. Mount in `App.jsx` **above router** and below theme providers.
3. Add `useBackgroundZone()` to `/v4` sections to trigger transitions
4. Pass `reducedMotion` prop for accessibility support

---

## 🧭 ROUTE LOCK

Only mounted on:

* `/` → `DevV4CosmicPage`
* `/safe` → `SafeV4CosmicPage`

Excluded from:

* `/legacy`
* `/docs`
* `/products`

---

## 📍 STATUS

* [x] Component Stub Created
* [x] Mounted in App.jsx
* [x] Hook Initialized
* [x] Zones Declared
* [x] Visuals QA'd
* [x] SSR Compatible
* [x] Reduced Motion Compatible
* [x] Performance Monitoring Added

---

## 🧠 IMPLEMENTATION NOTES

* This is now **the only background system for /v4**
* SpaceCanvas has been migrated from HeroPortal to BackgroundManager
* All background-specific visual effects (beams, particles, etc.) are now rendered by the BackgroundManager
* Light beam effects from HeroPortal migrated to BackgroundManager as the 'light_beams' asset
* Component sections now use `useBackgroundZone` to register with the BackgroundManager
* HeroPortal maintains its own interactive parallax effects while core background is handled by BackgroundManager
* Both `/` and `/safe` routes use the same BackgroundManager, ensuring visual consistency
* Noise overlays must be static images with fallback if WebGL fails
* Performance data is collected and can be monitored in development
* Adjacent zone preloading ensures smooth transitions between sections
* Debug mode provides visual indicators for zone boundaries and asset counts

---

## 🔧 ACCESSIBILITY FEATURES

* Honors user's `prefers-reduced-motion` media query
* Reduces animation complexity and frequency for users with motion sensitivity
* Simplified visual effects in reduced motion mode
* Faster transitions with less visual complexity
* Maintains essential visual theming while removing potentially triggering animations
