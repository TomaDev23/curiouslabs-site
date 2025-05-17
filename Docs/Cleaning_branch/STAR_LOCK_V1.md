
## 🧱 `STAR_LOCK_V1` — Preserved Star Systems List

These systems are **protected** during all cleanup, refactor, or re-layering missions. Do not remove, rename, or alter unless explicitly ordered by the Commander.

| 🔒 Route                      | 🧩 Component                            | 📁 File Path                                                 | 💠 Type         | ✅ Status                     |
| ----------------------------- | --------------------------------------- | ------------------------------------------------------------ | --------------- | ---------------------------- |
| `/`                           | `SpaceCanvas` (via `BackgroundManager`) | `src/components/visual/SpaceCanvas.jsx`                      | Canvas 2D       | ✅ Production                 |
| `/products`                   | CSS star background                     | `src/pages/products/index.jsx`                               | Static Image    | ✅ Production                 |
| `/home-v5`                    | `StarfieldBackground`                   | `src/components/home/StarfieldBackground.jsx`                | Canvas 2D       | ✅ Legacy Placeholder         |
| `/cosmic-rev`                 | `CosmicRevealBackdrop_ThreeJS`          | `src/legacy/cosmic-journey/CosmicRevealBackdrop_ThreeJS.jsx` | THREE.js Shader | ✅ Visual Centerpiece         |
| `/legacy`                     | `EnhancedSolarSystem`                   | `src/components/home/EnhancedSolarSystem.jsx`                | THREE.js        | ✅ Solar Model                |
| `/dev/parallax-test`          | `ParallaxStars`                         | `src/pages/dev/parallax-test.jsx`                            | CSS / DOM       | ✅ Parallax Test              |
| `/dev/combined-parallax-test` | `ParallaxStars`                         | `src/pages/dev/combined-parallax-test.jsx`                   | CSS / DOM       | ✅ Combined Scroll+Mouse Test |

---

## 🛡️ Tactical Enforcement Plan

1. **Label all 7 components in code with:**

   ```js
   // 🛡️ STAR_LOCKED: Do not remove or alter – see STAR_LOCK_V1.md
   ```

2. **Log in contract file:**
   Create `Docs/visual/STAR_LOCK_V1.md` to store this whitelist for AI and team reference

3. **Reference in `StructureOrchestratorHUD.jsx`**
   Future HUD should mark these as `locked` or `read-only` in the orchestration view

---

