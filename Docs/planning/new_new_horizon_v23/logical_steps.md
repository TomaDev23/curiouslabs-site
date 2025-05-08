**Crafting the plan**

I’m working on building the layers in the correct order to avoid any clashes. The focus is on what’s already working: basic scaffolds, ColorOverlay, and the dissolve scroll. Next steps should be progression, with minimal visual anchors to start, and adding complexity step by step. I need to make sure each layer is validated before moving on. I’ll skip NebulaShader until later, focusing on CometSystem for now. I’ll outline this clearly!


Thought for 21 seconds


# 🧭 **Layer‑Locked Build Map — “One Brick Deeper”**

You’re standing on a **stable Core**: route ✅ + scroll dissolve ✅ + ColorOverlay ✅.
From here we add *one* visual tier at a time, always verifying **z‑stack, FPS, and scroll math** before the next.
Follow this order and clashes can’t sneak in.

---

## 🏗️ 0.  Current Stack Diagram (works)

```
Z‑index
┌───────────┐
│ Site UI (header/footer)    z‑20+
├───────────┤
│ Scene content / Robot      z‑10
├───────────┤
│ (empty)                    z‑5   ←  we’ll fill these tiers next
├───────────┤
│ Scene canvases (none yet)  z‑1
├───────────┤
│ ColorOverlay (blend)       z‑0   (fixed)
└───────────┘
```

---

## 🛣️ **Forward Route — Tile Sequence v2**

| Order | Tile ID                           | Layer slot                     | Component(s)                                                           | Purpose & Pass / Fail test                                                             |
| ----- | --------------------------------- | ------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **1** | **T3.2 – CometSystem**            | `z‑1` *(front canvas)*         | `CometSystem.jsx`<br>Mount in **CosmicRevealScene**                    | *Visible moving particles* prove canvas renders, z‑order above ColorOverlay, FPS ≥ 55. |
| **2** | **T3.1a – NebulaBase**            | `z‑2` *(back canvas)*          | **Replace** failed `NebulaShader` with *single* radial‑gradient canvas | Confirm soft glow appears **behind comets**; no flicker.                               |
| **3** | **T3.1b – NebulaDual & HueShift** | keep `z‑2`                     | Add second noise layer + slow rotation                                 | Validate dual blend doesn’t tank perf (< 4 ms/frame).                                  |
| **4** | **T3.3 – WarpStreaks**            | `z‑1` in **CosmicFlightScene** | `WarpStreaks.jsx`                                                      | Star tunnel visible; parallax push‑in works; comets unaffected.                        |
| **5** | **T3.4 – SunGlow**                | `z‑1` in both Sun scenes       | `SunGlow.jsx`                                                          | Sun appears, pulses; ColorOverlay still visible through blend.                         |
| **6** | **T3.5 – MicroInteractions**      | overlays `z‑10` *(UI)*         | hover pulse + scroll‑pause boost                                       | Verify heart‑beat dot enlarges on hover, comets surge when user stops.                 |
| **7** | **T4.0 – Perf & Contrast Audit**  | N/A                            | Lighthouse / Chrome DevTools                                           | ≥ 55 FPS mid‑tier; WCAG AA for text; no unexpected promoted layers.                    |
| **8** | **T5.0 – Merge & Cleanup**        | N/A                            | Route swap `/` → `journey‑v2`; delete v1                               | One‑commit cutover, tag `journey‑2.0.0`.                                               |

---

## 🔧  *Why This Order Avoids Clash*

1. **CometSystem first** — obvious motion; if you don’t see streaks you *immediately* know canvas or z‑index is wrong.
2. **Nebula behind comets** — verifies back‑layer blending **without** extra animation complexity.
3. **Upgrade Nebula** only after base layer is solid — isolates shader/perf bugs.
4. **Flight Warp** is confined to *another scene*; by now stack philosophy is proven.
5. **SunGlow** lives in its own scenes; you’re confident about canvas + blend stacking.
6. **Micro‑interactions** are pure React/Tailwind tweaks — minimal clash risk.
7. **Perf audit last** to tune once all visuals are in.

---

## 📊 ASCII Progress Bar

```
CosmicJourney 2.0
[██████░░░░░░] 6 / 14 tiles

Legend:
■  Done        ░ Pending

■ T2.6.7‑S1‑S6  (scene scaffolds)
■ T3.0  ColorOverlay
□ T3.2  CometSystem
□ T3.1a NebulaBase
□ T3.1b NebulaDual
□ T3.3  WarpStreaks
□ T3.4  SunGlow
□ T3.5  MicroInteractions
□ T4.0  Perf Audit
□ T5.0  Merge & Cleanup
```

*(order is exactly as the rows above — note that 3 splits into 3.1a & 3.1b to keep commits tiny.)*

---

## 🗂️  **Step‑by‑Step for the Very Next Tile**

### TILE T3.2 — CometSystem

1. **Add** `src/components/journey/visual/CometSystem.jsx` *(code already supplied)*
2. **Import & mount** inside `CosmicRevealScene` **above** Nebula placeholder:

   ```jsx
   <CometSystem active />   // temp always‑on until Nebula passes
   ```
3. **Set z‑index** (Tailwind) if needed: `className="absolute inset-0 z-10 pointer-events-none"`
4. **Run** `/journey-v2`

   * You *must* see streaks over the ColorOverlay.
   * Scroll speed shouldn’t affect them yet.

---

### 📝 War‑Room Template Update

```md
### 2025‑05‑07 – CosmicJourney 2.0  |  TILE T3.2
- ✅ CometSystem visible, z‑layer above ColorOverlay
- ✅ FPS ≥ 60 desktop / 57 Android Xiaomi 11
- 🔜 Next: T3.1a NebulaBase (single radial canvas behind comets)
```

---

## 🚀  Green‑light to proceed?

Give the word and we’ll drop the **exact code** for *NebulaBase* (T3.1a).
Once that passes, we rinse‑and‑repeat down the list, brick by brick, clash‑free.

*(No more blind jumps — just a steady climb up the stack.)*
