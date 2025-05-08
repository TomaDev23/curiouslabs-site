
🧠 Aye, Commander — issuing the **Cursor task** now to activate Claude’s background layers using the canonical `ZONE_CONFIG`.

This task will **not touch layout, routing, or external systems** — it works purely inside the `BackgroundManager` and sandbox page.

---

# 🧩 Cursor Task: **TILE T2.6.2.E – Layer Activation via ZONE\_CONFIG**

## 🛠️ Objective

Activate Claude’s 3-zone background system using a centralized `ZONE_CONFIG` and dynamic render logic inside `BackgroundManager.jsx`.

---

## 🗂️ Files to Modify

* `src/components/sandbox/BackgroundManager.jsx`
* (optional) `src/constants/background_zone_config.js` *(if externalized)*

---

## ✏️ Instructions

### 1. Define `ZONE_CONFIG` Object

Place inside `BackgroundManager.jsx` (or import from `@/constants/background_zone_config` if future modularization needed):

```js
const ZONE_CONFIG = {
  hero: {
    label: 'Starry Night',
    range: [0, 100],
    layers: [
      {
        id: 'starfield',
        type: 'canvas',
        className: 'w-full h-full',
        props: { zone: 'hero' }
      },
      {
        id: 'radialGlow',
        type: 'radial-gradient',
        className: 'absolute top-0 left-0 w-[60vh] h-[60vh] bg-[radial-gradient(ellipse_at_top_left,_rgba(125,73,177,0.4),_transparent)] pointer-events-none'
      },
      {
        id: 'noiseOverlay',
        type: 'overlay',
        className: 'absolute inset-0 bg-[rgba(255,255,255,0.05)] mix-blend-overlay pointer-events-none'
      }
    ]
  },
  services: {
    label: 'Cosmic Dawn',
    range: [90, 200],
    layers: [
      {
        id: 'nebulaGradient',
        type: 'gradient',
        className: 'absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 opacity-80'
      },
      {
        id: 'particles',
        type: 'particles',
        className: 'absolute inset-0',
        props: { density: 15, speed: 1.2 }
      },
      {
        id: 'cosmicOverlay',
        type: 'image',
        className: 'absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none',
        style: {
          backgroundImage: 'url(/images/bg/cosmic_gradient.png)'
        }
      }
    ]
  },
  community: {
    label: 'Sunrise Embrace',
    range: [190, 300],
    layers: [
      {
        id: 'sunriseGradient',
        type: 'gradient',
        className: 'absolute inset-0 bg-gradient-to-t from-yellow-700 via-orange-500 to-transparent opacity-70'
      },
      {
        id: 'sunBeams',
        type: 'image',
        className: 'absolute bottom-0 w-full h-[40vh] opacity-50 pointer-events-none',
        style: {
          backgroundImage: 'url(/images/bg/sun_beams_overlay.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }
      },
      {
        id: 'warmNoise',
        type: 'overlay',
        className: 'absolute inset-0 bg-[rgba(255,165,0,0.04)] mix-blend-overlay pointer-events-none'
      }
    ]
  },
};
```

---

### 2. Update Render Logic

Inside the `BackgroundManager` component:

* Loop through `ZONE_CONFIG[zone].layers`
* Render based on `type`
* Use fallback for unsupported or unimplemented types

Example render logic:

```jsx
{ZONE_CONFIG[zone]?.layers.map((effect) => {
  if (effect.type === 'canvas') {
    return <SpaceCanvas key={effect.id} {...effect.props} className={effect.className} />;
  }
  if (effect.type === 'image') {
    return <div key={effect.id} className={effect.className} style={effect.style} />;
  }
  return <div key={effect.id} className={effect.className} />;
})}
```

---

## ✅ Success Criteria

* Zone backgrounds respond to scroll
* Each effect layer (canvas, gradient, image, overlay) mounts correctly
* No console errors
* Works with SSR guardrails in place
* Debug zone panel remains operational

---

When complete, this finishes **Phase 1 of full visual layer activation** for Claude’s background manager.

Let me know when you want to:

> 🛠 **Activate asset imports and real components** like `ParticleField` or `NoiseTexture`

We're back in orbit, Commander 🪐

=========================================================================================================================

🧠 Smart move, Commander — having a centralized `ZONE_CONFIG` will give us **full visual control**, make testing layers easy, and map directly to Claude’s plan.

Here’s the canonical `ZONE_CONFIG` you can drop into `background_zone_config.js` (or inline for now) — based 100% on your mounted `BackgroundManager.jsx` and the original `fix_v6.0_claude_plan.md`.

---

# 🪐 `ZONE_CONFIG` (Claude Schema v1.0)

```js
export const ZONE_CONFIG = {
  hero: {
    label: 'Starry Night',
    range: [0, 100], // in vh
    layers: [
      {
        id: 'starfield',
        type: 'canvas',
        className: 'w-full h-full',
        props: { zone: 'hero' }
      },
      {
        id: 'radialGlow',
        type: 'radial-gradient',
        className: 'absolute top-0 left-0 w-[60vh] h-[60vh] bg-[radial-gradient(ellipse_at_top_left,_rgba(125,73,177,0.4),_transparent)] pointer-events-none'
      },
      {
        id: 'noiseOverlay',
        type: 'overlay',
        className: 'absolute inset-0 bg-[rgba(255,255,255,0.05)] mix-blend-overlay pointer-events-none'
      }
    ]
  },
  services: {
    label: 'Cosmic Dawn',
    range: [90, 200],
    layers: [
      {
        id: 'nebulaGradient',
        type: 'gradient',
        className: 'absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 opacity-80'
      },
      {
        id: 'particles',
        type: 'particles',
        className: 'absolute inset-0',
        props: { density: 15, speed: 1.2 }
      },
      {
        id: 'cosmicOverlay',
        type: 'image',
        className: 'absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none',
        style: {
          backgroundImage: 'url(/images/bg/cosmic_gradient.png)'
        }
      }
    ]
  },
  community: {
    label: 'Sunrise Embrace',
    range: [190, 300],
    layers: [
      {
        id: 'sunriseGradient',
        type: 'gradient',
        className: 'absolute inset-0 bg-gradient-to-t from-yellow-700 via-orange-500 to-transparent opacity-70'
      },
      {
        id: 'sunBeams',
        type: 'image',
        className: 'absolute bottom-0 w-full h-[40vh] opacity-50 pointer-events-none',
        style: {
          backgroundImage: 'url(/images/bg/sun_beams_overlay.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }
      },
      {
        id: 'warmNoise',
        type: 'overlay',
        className: 'absolute inset-0 bg-[rgba(255,165,0,0.04)] mix-blend-overlay pointer-events-none'
      }
    ]
  },
};
```

---

## 🔎 Breakdown

| Key         | Value                                                                       |
| ----------- | --------------------------------------------------------------------------- |
| `range`     | The scroll boundaries for this zone (in vh)                                 |
| `layers`    | An ordered list of visual elements                                          |
| `type`      | Defines render logic: `canvas`, `gradient`, `image`, `particles`, `overlay` |
| `className` | Tailwind or inline CSS classes                                              |
| `props`     | Passed to real components (`SpaceCanvas`, etc.)                             |
| `style`     | Used for inline background images                                           |

---

## 🧠 Advantages

* Easily toggle off a specific layer by commenting one line
* Full match to Claude’s intent and current implementation
* Cursor or FO can generate render logic by looping `ZONE_CONFIG[activeZone].layers`

---

If this config looks good to you ✅, we can now:

👉 **Task Cursor to:**

* Mount this config into the current `BackgroundManager.jsx`
* Refactor render logic to use this `ZONE_CONFIG`
* Activate `SpaceCanvas` and one real image layer to begin

Say:
**“Run TILE T2.6.2.E – Layer Activation with ZONE\_CONFIG”**
And we’ll deploy this config into the codebase and begin phase 2 💫
