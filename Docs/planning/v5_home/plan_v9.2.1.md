🧠 **Outstanding diagnostic work, Commander.**
You’ve created a **real technical recon report**, not just a debug note. Let’s now **turn this audit into a field-tested strategy** that will:

1. **Isolate** the rendering failure
2. **Prove or disprove** environmental causes
3. **Restore visual confidence** in your dev route stack

---

# 🧭 Rendering Recovery Strategy: Operation `VISIBLE.MARS`

## 🎯 PRIMARY GOAL

**Render a single visible element (Mars or fallback div) with accurate position, z-index, and visual context inside `/dev/combined-parallax-test`**

---

## ⚙️ STRATEGY LAYERS (in order of precision impact)

---

### 🧱 LAYER 1: DOM & Route Verification (Fast + Low Risk)

**Checkpoint A — Route Sanity**

* ✅ Confirm current browser URL matches expected route: `/dev/combined-parallax-test`
* ✅ Check route-lock.md: ensure route exists and is mounted
* ✅ Manually add a `<h1>HELLO TEST</h1>` at top of page — confirm it's visible

> **If `<h1>` does not appear → Route isn't rendering.**
> If `<h1>` appears → Rendering pipeline is functional. Proceed deeper.

---

### 🧰 LAYER 2: DOM Render + Style Presence

**Checkpoint B — Raw Element Presence**

1. Inject this into the top-level return of the page:

   ```jsx
   <div style={{
     position: 'absolute',
     top: '100px',
     left: '100px',
     width: '100px',
     height: '100px',
     backgroundColor: 'limegreen',
     zIndex: 9999
   }}>
     TEST BOX
   </div>
   ```

2. Open browser devtools:

   * **Does the div exist in the Elements tab?**
   * If YES → it's **in DOM**
   * If NO → route-level or build pipeline error

3. If it's there but not visible:

   * Check computed styles: `display: none`? `visibility: hidden`?
   * Check for parent `opacity: 0`, `overflow: hidden`, `transform` with no `will-change`

✅ **If it appears visually** → Mars should appear too. Continue.

---

### 💣 LAYER 3: Rebuild & Hard Reset

**Checkpoint C — Clear System Interference**

* `rm -rf .next/ dist/` or equivalent
* Clear cache
* Restart server (`npm run dev`)
* Test again — same route, same test box

✅ Helps eliminate stale render artifacts, broken maps, or partial hot reloads

---

### 🔬 LAYER 4: Isolated Render Route

**Checkpoint D — Create `/dev/mars-test.jsx`**

```jsx
import { Mars } from '@/components/journey/celestial/bodies/Mars'
import { CelestialController } from '@/components/journey/celestial/CelestialController'

export default function MarsTest() {
  return (
    <div className="relative w-screen h-screen bg-black">
      <CelestialController
        celestialBodies={[
          {
            id: 'mars',
            component: Mars,
            props: {
              position: { x: 50, y: 50 },
              size: 150,
              parallaxFactor: 0
            }
          }
        ]}
        currentScene="cosmicReveal"
        useParallaxStyle="3d"
      />
    </div>
  )
}
```

✅ This lets you test without scene transitions, route clutter, or HUD layers

---

### 🕵️ LAYER 5: Anti-Styling Protocol

**Checkpoint E — Style Interference Guard**

* Inside `CelestialBody`, override styles:

```jsx
<div style={{
  position: 'fixed',
  top: '20px',
  left: '20px',
  backgroundColor: 'red',
  width: '100px',
  height: '100px',
  zIndex: 9999,
  transform: 'none',
  visibility: 'visible',
  display: 'block',
}}>
  DEBUG MARS
</div>
```

✅ If this shows and your normal Mars doesn’t → your styles are breaking visibility

---

### 🛑 LAYER 6: Logging Lock

**Checkpoint F — Force React Print Trail**

Inside:

* `combined-parallax-test.jsx`
* `CelestialController.jsx`
* `Mars.jsx`
* `CelestialBody.jsx`

Add:

```js
console.log(`[DEBUG] Reached: <Mars />`);
```

Check devtools → see if the log fires.

✅ If `CelestialController` logs but `Mars` doesn’t → render is being blocked or aborted.

---

## 🧩 Strategy Tracker

| Layer | Target                   | Status                    |
| ----- | ------------------------ | ------------------------- |
| ✅ L1  | Route URL, static `<h1>` | In progress               |
| 🔄 L2 | DOM box presence         | Pending                   |
| 🔄 L3 | Clean build              | Pending                   |
| 🔄 L4 | Isolated render route    | Recommended               |
| 🔄 L5 | Override styling         | Critical for test         |
| 🔄 L6 | Print debug trail        | High confidence log trace |

---

## 🛡️ If All Else Fails

Run one render layer *outside* of `CelestialController`.
Use `<Mars />` manually and flatten out all parallax/styling to pure HTML div:

```jsx
<Mars position={{x: 40, y: 40}} size={100} parallaxFactor={0} parallaxStyle="none" />
```

If even that fails → it's not component logic. It’s **build-level or parent layout sabotage.**

---

## 📌 Want a Cursor mission to inject this entire “Mars Isolation Test” route?

Or a HUD overlay to inspect parent container z-indexes + box outlines?

**You're close, Commander. Just a visibility breakthrough away.**
