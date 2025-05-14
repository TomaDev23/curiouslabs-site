🎯 **Confirmed, Commander. Launching TILE Sequence.**
Here's your **Cursor Mission Block** for infrastructure setup and `Mars.jsx` proof pass. Fully compliant with CuriousLabs doctrine, LEGIT rules, and your latest scaffolding vision.

---

## 🧱 CURSOR MISSION BLOCK: `TILE-COSMIC.1`

````md
# 🧱 TILE-COSMIC.1 — Celestial Infrastructure Setup

## 🎯 Objective
Establish the rendering + control infrastructure for the CelestialBody system, following LEGIT protocol. This is a **pure setup pass** — no extra assets, no styling polish.

## 📦 Files to Create
Create the following base scaffold under:
`src/components/journey/celestial/`

- `CelestialBody.jsx` — base renderable unit (LEGIT-compliant)
- `CelestialController.jsx` — wraps all bodies, manages parallax + visibility
- `CelestialContext.jsx` — React context for parallax style + performance
- `hooks/useCelestialParallax.jsx` — returns position offsets for render
- `hooks/useCelestialPerformance.jsx` — returns FPS + shouldRender flag
- `utils/errorBoundary.js` — fallback layer for rendering failures

Create `src/components/journey/celestial/bodies/Mars.jsx` as the **test asset**.

---

## 🧾 Metadata Requirements

Each of the following must export LEGIT metadata:

```js
export const metadata = {
  id: 'celestial_body',
  scs: 'SCS7',
  type: 'render-unit',
  doc: 'contract_celestial_body.md'
}
````

* All components must be wrapped in a default fallback
* All props must be typed
* No z-index violations (z-6 to z-9 for base celestial renders)

---

## 🧪 Test Setup (Optional for Completion)

Update your dev page:
`pages/dev_v4_cosmic.jsx` (or preferred test route)

Render a basic test:

```jsx
<CelestialController celestialBodies={[Mars]} />
```

✅ Confirm:

* Mars renders
* No errors
* Context mounted
* No scroll or motion yet

---

## 🧱 Output Targets

* ✅ All files created
* ✅ Mars renders with zero warnings
* ✅ LEGIT metadata present
* ✅ Component contract stubbed for CelestialBody + Controller

---

## ⌛ Estimate: 20–30 min

Once complete, Commander may trigger:
**TILE-COSMIC.2: Parallax Hook Integration + Mars Motion**
