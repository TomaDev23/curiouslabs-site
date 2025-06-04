
**ChatGPT/3o**


## 🚀 **CuriousLabs 3D Re-Architecture Master Plan (v2.0)**

*From spaghetti 👉 to surgical, zero-regression greatness*

---

### 🌌 1. Executive TL;DR

| 🎯 Goal                  | 🛠️ Action                                                                               | ✅ Outcome                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Kill double-engine chaos | **Unify on React-Three-Fiber** (R3F) with an opt-in Raw Three sandbox for exotic shaders | Single WebGL context, lighter bundle, no render-loop race conditions |
| Stop bundle bloat        | **Hard-isolate all 3D code** under `/src/3d/` + dynamic imports                          | Vite splits `three-core` ≈ 90 kB, home page First Paint < 1 s        |
| Protect momentum         | **Freeze legacy scenes** in `/legacy-3d-museum/` (auto-strip from prod)                  | No deleted work, quick rollback path                                 |
| Ship safely              | **Stage-gate migration** (branch discipline + LEGIT tests)                               | ZERO broken pages, ops velocity intact                               |

---

### 🧭 2. Decision Matrix — Which Engine Rules?

| Criterion        | R3F 🟢                                  | Raw Three 🔴               | Hybrid 🚫          |
| ---------------- | --------------------------------------- | -------------------------- | ------------------ |
| React state sync | Native                                  | Manual wiring              | Nightmare          |
| Bundle size      | 1× Three + hooks                        | 1× Three                   | 2× Three (!)       |
| DX & docs        | Huge ecosystem (`drei`, `rapier`, etc.) | Low-level power            | Nobody wins        |
| Migration effort | Convert \~4 legacy files                | Convert 10+ planets anyway | Double maintenance |

**Recommendation** → **🟢 Full R3F stack** (keep a */sandbox* folder for one-off Raw experiments).

---

### 🗺️ 3. Phase Map (Cursor Mission Blocks Will Be Derived)

| Phase  | Code-Name           | Key Outputs                                                                                 | Risk Guard           |
| ------ | ------------------- | ------------------------------------------------------------------------------------------- | -------------------- |
| **P0** | *Safety Net*        | `git branch 3d-legacy-snapshot` + ZIP export                                                | Instant rollback     |
| **P1** | *Deep Recon*        | `3d_import_map.json` (Cursor auto-scan)                                                     | No hidden imports    |
| **P2** | *Engine Excision*   | Delete Raw `<WebGLRenderer>` mounts; stub with static PNG placeholders                      | Site never blanks    |
| **P3** | *Core Engine Build* | `/src/3d/engine/ThreeCanvasProvider.jsx`<br>`<ScenePortal scene="solarSystem" />`           | One canvas, one loop |
| **P4** | *Scene Migration*   | **SolarSystem → R3F**, **CosmicReveal** → R3F                                               | Feature parity list  |
| **P5** | *Smart Loading*     | `dynamic(() => import('/3d/scenes/…'), { ssr:false })`<br>Suspense fallback = low-poly SVG  | SSR safe             |
| **P6** | *Chunk Surgery*     | `vite.config.js → build.rollupOptions.manualChunks` → `three-core`, `r3f-vendor`, `scene-*` | Bundle ≤ 200 kB      |
| **P7** | *QA & Guardrails*   | - Lighthouse ≥ 90<br>- FPS overlay ≥ 50 on mid-tier laptop<br>- LEGIT-3D checklist pass     | Regress block        |
| **P8** | *Docs & Merge*      | Update `route-lock.md`, `contract_component_names.md`, new `contract_3d_engine.md`          | Full traceability    |

---

### 🏗️ 4. Folder Blueprint

```
src/
├─3d/
│  ├─engine/          ← R3F canvas + lights + controls
│  ├─scenes/
│  │   ├─SolarSystem/
│  │   ├─CosmicJourney/
│  │   └─...
│  ├─systems/         ← particles, post-fx
│  └─utils/           ← loaders, hooks (useSceneReady)
├─legacy-3d-museum/   ← frozen Raw Three components
└─components/
```

*No other part of the app may import `three` or `@react-three/*` directly — only files under `/3d/`.*

---

### ⚡ 5. Vite Chunking Snippet

```js
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      manualChunks: {
        'three-core': ['three'],
        'r3f-vendor': ['@react-three/fiber', '@react-three/drei'],
      },
    },
  },
});
```

> Cursor will verify final sizes with `rollup-plugin-visualizer`. Target: `three-core` ≈ 90 kB Gzip, every route’s main chunk ≤ 150 kB.

---

### 🔒 6. LEGIT-3D Compliance Checklist

1. **Single Canvas rule** — `<ThreeCanvasProvider>` at root.
2. **SSR gate** — every scene loaded via `dynamic` with `ssr:false`.
3. **Dispose hygiene** — `useEffect(() => () => dispose())` on materials/geometries.
4. **Prefers-reduced-motion** — bypass heavy animation loop.
5. **Memory watchdog** — log texture + geometry counts on unmount (< 1 MB leak).
6. **Bundle audit** — `npm run analyze` must show zero duplicate Three classes.

---

### 🛡️ 7. Risk & Rollback

| Threat                          | Mitigation                                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| White-screen due to import typo | `<ScenePortal>` wraps Suspense fallback (static SVG)                                                               |
| Low-end device lag              | `useBreakpoint` × `useEffect(() => setLowPerf())` → disables shadows / post-fx                                     |
| Shader porting pain             | Keep Raw Three sandbox; wrap with `<primitive object={…} />` until refactor                                        |
| Git merge chaos                 | Follow **GitOps Doctrine** — all 3D work lives on `dev-3d-refactor`; cherry-pick to `main` only after Phase 7 pass |

---

### 🎬 8. Immediate Orders for Cursor (next mission block)

1. **Scan & Map**

   ```bash
   grep -R "from 'three'" src | tee 3d_scan.txt
   grep -R "from '@react-three" src >> 3d_scan.txt
   ```

   ➜ produce `3d_import_map.json`.

2. **Create `/src/3d/engine/ThreeCanvasProvider.jsx` skeleton** (empty scene, no lights, proves single canvas).

3. **Move `EnhancedSolarSystem` into `/3d/scenes/SolarSystem/` and wrap with R3F `<Canvas>` from provider.**

*No destructive deletes yet — just move & stub.*

---

### 🧠 9. Commander Action Points

* ✅ Confirm **full R3F route** (or veto and choose Raw).
* 🔥 Green-light Cursor to execute Phase P1–P2 (import map + provider skeleton).
* 📝 Decide performance baseline (target FPS / bundle size thresholds).

Once you shout **“Launch Recon!”**, we’ll drop the Cursor mission block and move the pieces without breaking a single pixel.

---

**High spirits, zero panic, maximum precision.**
Standing by, Senior Dev out. 🫡✨
