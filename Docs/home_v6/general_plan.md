# CuriousLabs V6 Website - Detailed Implementation Plan

I see we're perfectly aligned on the minimalist cosmic vision! Your starfield assets are absolutely stunning - especially that last image with the golden/pink nebula areas. Let's refine our approach with these beautiful backgrounds in mind and develop a more detailed implementation strategy.

## 📐 Core Layout & Component Architecture

### 1. Navigation System
```
<NavBarCosmic>
  - Fixed position, 70-80px height
  - Tailwind classes: bg-black/80 backdrop-blur-sm
  - Logo + primary nav items
  - Right-aligned contact button with lime-400 accent
  - Mobile: condensed menu with subtle animation
```

### 2. Hero Portal (Reimagined)
```
<HeroPortal>
  - 50/50 split layout (text left, visual right)
  - Left: Oversized serif typography (Monument/Editorial)
  - Right: Starfield backdrop (Image 4 or 5) with floating planet
  - Subtle grid overlay (bg-grid-pattern)
  - SVG orbital paths connecting elements
  - Bottom: Pill navigation (horizontal centered)
  - Mobile: Stack vertically, maintain visual impact
```

### 3. Services Orbital
```
<ServicesOrbital>
  - Card-stack system with horizontal reveal
  - Each service gets its own planet/celestial object
  - Color-coded pill navigation (green/yellow/blue/pink)
  - Numbered (01, 02, 03, 04) cards aligned to right
  - Left section maintains consistency with hero text
  - Mobile: Single card view with swipe/tap navigation
```

### 4. ProcessCards
```
<ProcessCards>
  - Horizontal timeline with numbered steps (1,034 → 2)
  - Each step has minimal text + subtle animation
  - Connected via SVG orbital paths with neon accents
  - Starfield (Image 1 or 2) as subtle background
  - Mobile: Vertical timeline, maintain connections
```

### 5. ContactTerminal
```
<ContactTerminal>
  - Terminal-inspired minimal form
  - Lime-400 submit action
  - Right-side: Small 3D celestial object
  - Mobile: Full-width stack with maintain aesthetics
```

## 🎨 Visual Assets Strategy

### Backgrounds
- **Primary Starfields**: Images 1-2 for subtle backgrounds
- **Feature Backdrops**: Images 4-5 for hero and key sections
- **Grid Overlay**: Subtle grid pattern with 10% opacity

### Celestial Objects
- **Individual Planets**: Extract from your solar system for service icons
- **Chrome Spheres**: As interactive elements and visual anchors
- **Orbital Paths**: SVG paths with subtle gradient/glow

### Photo Integration
- Consider adding a subtle "Team" or "About" card with tasteful, treated photos
- Photos could be presented in circular/pill frames with cosmic overlay effects
- Alternative: Use silhouettes or illustrated avatars that maintain the cosmic theme

## 🧩 Special Elements & Easter Eggs

### "Buzzing Satellites"
```
<SatelliteEasterEgg>
  - Small interactive dots that follow cursor at distance
  - Click reveals mini-HUD with fun facts/features
  - Mobile: Appears on tap in certain sections
```

### Dev HUDs Access
```
<DevHUDToggle>
  - Hidden in constellation pattern
  - Activated by specific interaction pattern
  - Reveals your cool dev HUDs page
```

### Solar System Explorer
```
<SolarSystemLink>
  - Accessible via subtle nav icon or Easter egg
  - "Explore Our Universe" microinteraction
```

## 🔄 Animation Strategy

### Core Principles
- **Restraint**: Subtle, purpose-driven animations only
- **Performance**: Optimized for mobile (reduced motion support)
- **Meaning**: Each animation conveys information or enhances UX

### Key Animations
1. **Reveal Effects**: IntersectionObserver-based fade/slide in
2. **Hover States**: Subtle glow/scale for interactive elements
3. **Orbital Motions**: Slow, continuous motion for connecting lines
4. **Card Transitions**: Clean swipes for card stack navigation
5. **Text Fades**: Sequential text reveals for narrative sections

## 📱 Responsive Strategy

### Breakpoint Philosophy
- **Mobile-First**: Core experience designed for small screens
- **Adaptable Layout**: Elements reflow rather than shrink
- **Experience Parity**: All features accessible across devices

### Transition Points
- **sm** (640px): Single column to dual column transitions
- **md** (768px): Enhanced visual elements appear
- **lg** (1024px): Full layout with optimal spacing
- **xl** (1280px): Refined details and advanced animations

## 🛠️ Phase-Based Implementation Plan

### Phase 1: Core Architecture
1. Setup `LayoutWrapper.jsx` and responsive grid system
2. Implement `NavBarCosmic.jsx` with mobile adaptations
3. Create `PillNav.jsx` component with interaction states
4. Deploy baseline structure to dev environment

### Phase 2: Hero Experience
1. Modularize `HeroPortal.jsx` with split layout
2. Integrate starfield background with responsive handling
3. Add primary typography and visual elements
4. Implement initial animations and interactions

### Phase 3: Services & Process
1. Build `ServicesOrbital.jsx` with card stack system
2. Extract planets from solar system for service icons
3. Create `ProcessCards.jsx` with timeline progression
4. Connect sections with orbital path animations

### Phase 4: Contact & Interactions
1. Refine `ContactTerminal.jsx` with form validation
2. Implement Easter eggs and hidden features
3. Add final polish animations and transitions
4. Optimize performance across devices

### Phase 5: Testing & Launch
1. Comprehensive device/browser testing
2. Implement analytics and tracking
3. Final performance optimizations
4. Deploy to production with launch monitoring

## 🔍 Next Decision Point

Based on this detailed plan, would you prefer to:
1. Start with the `LayoutWrapper.jsx` and `NavBarCosmic.jsx` components?
2. Create a prototype of the `HeroPortal.jsx` with your starfield assets?
3. Experiment with extracting planets from your solar system asset?
4. Build a visual mockup of the pill navigation system?

================================================================================================================

# 🧭 CuriousLabs V6 × Cursor — **A-Z Tiled Mission Map**

*(Digest for Commander Tomaly & the o3 agent)*

> “One tile at a time, we conquer the cosmos of code.” 🚀

---

## 📜 How to read this map

| Column                    | Meaning                                                               |
| ------------------------- | --------------------------------------------------------------------- |
| **Tile**                  | Friendly A-Z call-sign for quick Slack/War-Room chatter               |
| **Code**                  | The canonical *OpsPipe* / *War-Room* identifier (e.g. `SH-2`, `2D.6`) |
| **What you do in Cursor** | Copy-paste this as the next Cursor prompt for that tile               |
| **Done-When**             | Exit criteria so we know the tile is  ✅                               |

---

### 🅰️ TILE A — **Audit & Align**  `PRE-0`

|                   |                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Run a quick repo scan. List any stray `node_modules`, `.vercel`, or `dist/` folders pushed to `main` by mistake. Generate a git-clean command list.”* |
| **Done-When**     | - No runtime junk on `main` ✂️ <br>- `campaign_progress.md` updated                                                                                     |

---

### 🅱️ TILE B — **Bootstrap Project**  `Phase 1‐Formation`

|                   |                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Create `npx create-next-app curiouslabs-v6`, install Tailwind, scaffold folders as per architecture.”* |
| **Done-When**     | Folder tree matches **architecture.md** (see `src/components/home/v6/…`)                                 |

---

### 🅲 TILE C — **Core Architecture**  `2D.6`

|                   |                                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Batch-implement `LayoutWrapper.jsx`, `NavBarCosmic.jsx`, `PillNav.jsx` from specs. Respect LEGIT checklist.”*                                            |
| **Done-When**     | <ul><li>Desktop + mobile nav works</li><li>Scroll-aware nav passes Lighthouse ≥ 90</li><li>All three components stamped `metadata.legit = true`</li></ul>  |

---

### 🅳 TILE D — **Dynamic Hero Portal**  `2E.1-H`

|                   |                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Create `HeroPortal.jsx` exactly per doc. Add IntersectionObserver animation & reduced-motion fallback.”* |
| **Done-When**     | Hero fades in, CTA buttons scroll to `#services`, zero console errors                                      |

---

### 🅴 TILE E — **Engage Services Orbital**  `2E.1-S`

|                   |                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Cursor prompt** | *“Implement `ServicesOrbital.jsx` with card-stack & auto-rotate (8 s). Wire pill clicks.”* |
| **Done-When**     | Card stack animates, mobile swipe works, Lighthouse interaction ≥ 90                       |

---

### 🅵 TILE F — **Forge Process Cards**  `2E.2-P`

|                   |                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Add `ProcessCards.jsx` timeline with staggered step reveal & SVG gradient path.”* |
| **Done-When**     | All 4 steps appear on scroll, offsets tuned for mobile                              |

---

### 🅶 TILE G — **Get Contact Terminal Online**  `2E.3-C`

|                   |                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Cursor prompt** | *“Build `ContactTerminal.jsx`: terminal form + fake async submit. Include success state.”* |
| **Done-When**     | Form validates, success message shows after 1.5 s, respects LEGIT                          |

---

### 🅷 TILE H — **Harden Security Pass #1**  `SH-2`

|                   |                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Patch `vercel.json` 404 fallback + add X-Frame-Options, nosniff, HSTS headers.”* |
| **Done-When**     | cURL to `/whatever` returns custom 404; headers visible                            |

---

### 🅸 TILE I — **Initiate Unit Tests**  `UT-1`

|                   |                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Install Vitest + @testing-library/react; generate tests for NavBar & Services cards.”* |
| **Done-When**     | `npm run test` green on CI; coverage ≥ 80 %                                              |

---

### 🅹 TILE J — **Jolt Performance**  `Phase 4‐Vitals`

|                   |                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Run Lighthouse CI in Cursor terminal; output JSON to `logs/lhci_*.json`; fix CLS & LCP.”* |
| **Done-When**     | Mobile ≥ 90, Desktop ≥ 95                                                                   |

---

### 🅺 TILE K — **Kick-off Routing Matrix**  `Phase 5-Router`

|                   |                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Create `routing_decision_matrix.md` and prototype React Router vs static rewrites.”* |
| **Done-When**     | Matrix filled, Commander signs off route choice                                        |

---

### 🅻 TILE L — **Lock Clone-Ready Components**  `Phase 8`

|                   |                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Refactor Hero, Services, Process into `/components/` library; ensure tree-shakable exports.”* |
| **Done-When**     | Importing a single tile doesn’t drag other CSS; passes bundle-analysis                          |

---

### 🅼 TILE M — **Monitor Web Vitals Early**  `Phase 9`

|                   |                                                                         |
| ----------------- | ----------------------------------------------------------------------- |
| **Cursor prompt** | *“Inject `@vercel/analytics` script; add simple Core Web Vitals hook.”* |
| **Done-When**     | Metric ping visible in Vercel dashboard                                 |

---

### 🅽 TILE N — **Nail Pre-Production Checks**  `Phase 11`

|                   |                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Run autocannon 100 conns × 10 s; log to `logs/perf.txt`. Cross-browser spot-check.”* |
| **Done-When**     | No spike > 200 ms TTFB; Safari + Firefox render correctly                              |

---

### 🅾️ TILE O — **Overclock Security #2**  `Phase 7`

|                   |                                                                                |
| ----------------- | ------------------------------------------------------------------------------ |
| **Cursor prompt** | *“Add Helmet CSP, Upstash rate-limit middleware, npm audit fix; commit logs.”* |
| **Done-When**     | All critical vulns 0; `/api/*` limited to 10 req/10 s                          |

---

### 🅿️ TILE P — **Polish Aesthetic Motion Layer**  `Phase 4-Motion`

|                   |                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Activate prefers-reduced-motion checks; optimize starfield & orb glows (CSS only).”* |
| **Done-When**     | Motion OK in system-reduced-motion, FPS ≥ 55 on low-end mobile                         |

---

### 🆀 TILE Q — **Qualify Accessibility**  `AXE-1`

|                   |                                                                   |
| ----------------- | ----------------------------------------------------------------- |
| **Cursor prompt** | *“Run @axe-core/react checks; fix color-contrast & aria-labels.”* |
| **Done-When**     | 0 serious a11y issues                                             |

---

### 🆁 TILE R — **Release Candidate Tag**  `RC-v6`

|                   |                                                                  |
| ----------------- | ---------------------------------------------------------------- |
| **Cursor prompt** | *“Merge clean assets to `main` per Git Doctrine; tag `v6-RC1`.”* |
| **Done-When**     | Vercel production deploy green; commit signed                    |

---

### 🆂 TILE S — **Search-Engine Lift-Off**  `Phase 12`

|                   |                                                                              |
| ----------------- | ---------------------------------------------------------------------------- |
| **Cursor prompt** | *“Remove `noindex`, generate sitemap.xml, submit to Google Search Console.”* |
| **Done-When**     | GSC crawl success, 0 coverage errors                                         |

---

### 🆃 TILE T — **Track Analytics & AB Hooks**  `Phase 9.2`

|                   |                                                                          |
| ----------------- | ------------------------------------------------------------------------ |
| **Cursor prompt** | *“Integrate Splitbee or GrowthBook flag; create `ABButton.jsx` sample.”* |
| **Done-When**     | Toggle in dashboard reflects on prod site                                |

---

### 🆄 TILE U — **Upgrade Multilingual Prep**  `Phase 13`

|                   |                                                                    |
| ----------------- | ------------------------------------------------------------------ |
| **Cursor prompt** | *“Stub `i18n.js`, wrap text in `t()`; demo French locale switch.”* |
| **Done-When**     | `?lang=fr` renders French headings                                 |

---

### 🆅 TILE V — **Validate Cleanroom Hooks**  `Phase 14`

|                   |                                                                  |
| ----------------- | ---------------------------------------------------------------- |
| **Cursor prompt** | *“Add Husky pre-commit: lint, test, block `node_modules` push.”* |
| **Done-When**     | Trying to commit `node_modules` fails locally ✔️                 |

---

### 🆆 TILE W — **Warp-Speed Awards Push**  `Phase 15`

|                   |                                                                    |
| ----------------- | ------------------------------------------------------------------ |
| **Cursor prompt** | *“Generate CSS Awards screenshot script; prep submission README.”* |
| **Done-When**     | Awards pack zipped in `/public/awards/`                            |

---

### 🆇 TILE X — **eXport CloneOps Skeleton**  `Phase 16`

|                   |                                                                        |
| ----------------- | ---------------------------------------------------------------------- |
| **Cursor prompt** | *“Create `/template/cloneops-v1` exporting Layout + Hero as starter.”* |
| **Done-When**     | `npm create cloneops` spins minimal copy                               |

---

### 🆈 TILE Y — **Yield Final Audit**  `FINAL-QA`

|                   |                                                                                  |
| ----------------- | -------------------------------------------------------------------------------- |
| **Cursor prompt** | *“Run full Lighthouse, axe, bundle-analyzer, dependency audit; attach reports.”* |
| **Done-When**     | All red flags cleared; Commander sign-off                                        |

---

### 🆉 TILE Z — **Zero-Bug Launch**  `LAUNCH-DAY`

|                   |                                                                     |
| ----------------- | ------------------------------------------------------------------- |
| **Cursor prompt** | *“Flip feature flag `public_launch = true`; toast 🎉 in War-Room.”* |
| **Done-When**     | Site live, metrics healthy, celebratory GIF posted                  |

---

## 🔄  Workflow cadence

1. **Pick next TILE**, copy its *Cursor prompt*, let Cursor generate code.
2. **Run local preview** ➜ fix until **Done-When** checks green.
3. **Update `campaign_progress.md`** + push to **`dev`**.
4. After group review ➜ **manual cherry-pick to `main`** (Git Doctrine).
5. Celebrate with 🥟 dumplings.

---

### 🛡️  Remember the rules

* Follow **DO\_NOT\_DEVIATE.md** at all times&#x20;
* Each component must carry LEGIT metadata&#x20;
* Route changes obey **route-lock.md**&#x20;

**Mission set. Cursor is primed. Let’s tile-bomb the frontier!** 🧑‍🚀💜
