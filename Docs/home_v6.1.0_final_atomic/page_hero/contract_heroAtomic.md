🧾 **Contract Initialized: `HeroAtomic` Component**
Here’s the full LEGIT-compliant implementation contract for `HeroAtomic.jsx`, based on your clarified structure — **no unnecessary layers, 3D preserved, background isolated**, headline **inline**.

---

````markdown
# HeroAtomic Component Contract

## 🧩 Component Summary

**File Path**: `src/components/atomic/HeroAtomic.jsx`  
**Component Name**: `HeroAtomic`  
**Type**: Atomic  
**Version**: 1.0.0  
**Purpose**: Serves as the atomic hero section for the CuriousLabs homepage.  
It handles local phase animation logic, orchestrates the planetary visual, background layer, and inline heading with animation staging.

---

## 📦 Component Architecture

```jsx
<HeroAtomic>
  <BackgroundLayerAtomic />       // Visual background system (stars, nebula, grid)
  <HeroVisualPlanet phase={...}/> // Self-contained planet renderer (3D or 2D fallback)
  <motion.h1>...</motion.h1>      // Animated headline rendered inline
</HeroAtomic>
````

---

## 🔁 Internal State

```js
const [phase, setPhase] = useState('void');

useEffect(() => {
  setTimeout(() => setPhase('emergence'), 1000);
  setTimeout(() => setPhase('activation'), 2500);
}, []);
```

* `phase` drives animation staging for both visual and text elements
* No global context or scroll-based triggers
* Respects `prefers-reduced-motion` if implemented in subcomponents

---

## 🎨 Visual Layout Strategy

| Layer                   | Detail                                                            |
| ----------------------- | ----------------------------------------------------------------- |
| `BackgroundLayerAtomic` | Starfield, grid, nebula effects (fixed z-0)                       |
| `HeroVisualPlanet`      | 3D globe (Three.js) or 2D fallback depending on device capability |
| `motion.h1` Headline    | Appears only after `activation` phase, using fade-in animation    |
| `ExploreIndicator`      | (Optional) can be reintroduced if needed later                    |

---

## 🧠 Animation Behavior

| Phase          | Trigger      | Visual Result        |
| -------------- | ------------ | -------------------- |
| `'void'`       | Initial load | Background grid only |
| `'emergence'`  | After 1s     | Planet appears       |
| `'activation'` | After 2.5s   | Headline fades in    |

* Animations managed with `framer-motion` (not context-bound)
* Transitions use opacity and slight motion
* `HeroVisualPlanet` handles its own entrance

---

## 🧱 Performance Behavior

* No runtime performance check in `HeroAtomic`
* Planet component (`HeroVisualPlanet`) handles device tier detection internally
* Background complexity is safe to render on low-performance devices

---

## 📱 Responsive Behavior

| Breakpoint  | Layout Adjustment                                    |
| ----------- | ---------------------------------------------------- |
| `<768px`    | Planet may shrink, text resizes                      |
| `≥768px`    | Full-width hero, fixed height section (min-h-screen) |
| `motion.h1` | Always centered and scaled appropriately             |

---

## ♿ Accessibility Notes

* Heading uses `role="heading"` and `aria-level={1}` if needed
* Planet is decorative: marked `aria-hidden`
* Background visual has `aria-hidden`
* Motion respects `prefers-reduced-motion` at planet/component level

---

## 🔐 LEGIT Compliance

| Principle             | Status | Notes                                          |
| --------------------- | ------ | ---------------------------------------------- |
| ✅ Self-contained      | ✅      | No sceneController, no shared hooks            |
| ✅ Modular visuals     | ✅      | Each visual is injected cleanly                |
| ✅ Responsive          | ✅      | Mobile-safe                                    |
| ✅ Accessible          | ✅      | Keyboard/reader safe                           |
| ✅ Documented          | ✅      | This contract = confirmation                   |
| ✅ No over-abstraction | ✅      | Headline logic lives inside HeroAtomic         |
| ✅ Future-safe         | ✅      | Phase system is local, override-able if needed |

---

## 🔄 Future Enhancements

* Optional prop `startPhase?: 'void' | 'emergence' | 'activation'`
* Hook in `HeroVisualPlanet` to accept dynamic orbit speeds or shader overrides
* Scroll tie-in: allow scroll trigger to set phase instead of timeout
* Motion reduction override system (e.g. visualOnlyMode for performance)

---

## 📎 Related Contracts

* `HeroVisualPlanet.jsx` → \[`contract_hero_visual_planet.md`] (upcoming)
* `BackgroundLayerAtomic.jsx` → \[`contract_background_atomic.md`] (upcoming)

---

## ✅ Contract Approval

This component has been **approved as atomic and LEGIT-ready**.
It fully replaces `HeroSequenceV6` without introducing global dependencies, maintains animation fidelity, and preserves original intent with cleaner separation.

> ✍️ Logged by: Commander & OpenAI Recon Agent
> 📆 Date: 2025-05-22

```
