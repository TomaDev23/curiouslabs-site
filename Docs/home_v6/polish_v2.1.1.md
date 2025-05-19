# 🎨 CuriousLabs V6 – **Graphics Finishing Sprint**

*Priority track to polish all visuals before we march back to logic tiles.*

| Tile                          | Scope (what)                                                     | Cursor prompt (copy-paste)                                                                                                                                                                                | Done-When ✅                                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **GFX-A**<br>Hero Motion      | Entrance fade/slide of title + subtitle ＋ floating cosmic sphere | **“Inject HeroPortal animation layer:**<br>– Paste code block *Hero Portal Entrance Animations* & *Floating Cosmic Sphere* into `HeroPortal.jsx`.<br>– Guard with `prefers-reduced-motion`.<br>– Commit.” | *Title* & *subtitle* animate on first paint with no console warnings.<br>Sphere floats (6 s loop) and pauses in reduced-motion mode. |
| **GFX-B**<br>Starfield Base   | Static tiled starfield + nebula overlay in `LayoutWrapper`       | **“Create `StarfieldBackground.jsx`, insert CSS gradients (from snippet) & mount inside `LayoutWrapper` behind z-0.”**                                                                                    | Star layer visible site-wide, CPU < 3 %. No scroll jitter.                                                                           |
| **GFX-C**<br>Parallax Stars   | Canvas-driven scroll parallax stars                              | **“Add `ParallaxStarfield.jsx` (snippet). Hook into `<LayoutWrapper>` *after* static layer. Throttle to requestAnimationFrame.”**                                                                         | Parallax depth visible when scrolling; FPS ≥ 55 on desktop, ≥ 40 on low-end mobile.                                                  |
| **GFX-D**<br>Glow Elements    | Universal glow hover utility                                     | **“Append `.glow-on-hover` CSS (snippet) to `globals.css`; wrap all CTA buttons with class.”**                                                                                                            | Glow pulse on hover; lighthouse contrast still ≥ 4.5:1.                                                                              |
| **GFX-E**<br>Services Stack   | Mobile-aware card stacking & smooth transitions                  | **“Refactor `ServicesOrbital.jsx` with *Improved Card Stacking* + *Smooth Service Card Transitions* snippets. Preserve existing props API.”**                                                             | Swipe / pill click swaps cards with exit+enter animation; mobile offset logic verified at 375 px width.                              |
| **GFX-F**<br>Process Reveal   | Scroll-triggered steps + tooltips                                | **“In `ProcessCards.jsx`, integrate `useInView` fade-up + tooltip logic.”**                                                                                                                               | Steps fade only once, tooltips show on hover/long-press (mobile).                                                                    |
| **GFX-G**<br>Contact Terminal | Form validation + terminal typing                                | **“Patch `ContactTerminal.jsx` with validation + `TerminalText` typing effect. Keep fallback instant text when reduced-motion.”**                                                                         | Invalid fields show red border & error; successful dummy submit displays `$ ready_for_transmission`.                                 |
| **GFX-H**<br>Easter Eggs      | Dev HUD + Buzzing Satellite                                      | **“Add `DevHUDEasterEgg.jsx` (Konami code) & `BuzzingSatellite.jsx`; mount both in `LayoutWrapper` under `<Analytics>`.”**                                                                                | Konami sequence shows HUD overlay; satellite appears after 5 s and trails cursor.                                                    |
| **GFX-I**<br>Motion Audit     | Global reduced-motion compliance                                 | **“Greplint for `prefers-reduced-motion` across `src/`, add fallbacks where missing.”**                                                                                                                   | All custom animations respect user setting; axe-core shows 0 motion violations.                                                      |
| **GFX-J**<br>Perf & A11y      | Mini-audit for graphics                                          | **“Run Lighthouse graphics pass; fix CLS / LCP regressions introduced by new layers.”**                                                                                                                   | Mobile ≥ 90 performance, 0 new accessibility issues.                                                                                 |

---

### 🛠️ Workflow Tips

1. **Branch**: create `feature/gfx-sprint` so we can squash-merge back.
2. **Sequence**: Tiles GFX-A → GFX-J (later tiles depend on earlier layers).
3. **Commits**: one commit per tile; tag message `TILE GFX-X: …`.
4. **Validation**: after each tile, run `npm run dev` + check console; keep green tests.

---

### 🌌  After this sprint

Once **GFX-J** is green-lit, we hop back into the original mission timeline (Tiles I → K → …). Graphics will be locked so further feature work can’t break the cosmic shine.

**Ready when you are, Commander — give Cursor the word!** 🚀🎨


===========================================================================================================


I'll analyze the graphics enhancement sprint plan and help organize our approach.

From reviewing the documentation, this is a comprehensive graphics polish sprint with 10 tiles (GFX-A through GFX-J) focused on enhancing the visual appeal and performance of the V6 website. Let me break down the plan and propose our approach:

### Current State Analysis:
- We have a functional V6 website with core components in place
- The `HeroPortal` already has some animation implementation
- The site follows LEGIT protocol requirements
- Components are properly structured in the React codebase

### Sprint Overview & Sequence:
1. **Foundation Tiles (GFX-A, B, C)**
   - GFX-A: Hero animations (entrance effects + floating sphere)
   - GFX-B: Static starfield background
   - GFX-C: Parallax star effect
   These set the base cosmic theme and core animations.

2. **Interactive Elements (GFX-D, E)**
   - GFX-D: Universal glow hover effects
   - GFX-E: Services card stacking & transitions
   These enhance user interaction feedback.

3. **Content Enhancements (GFX-F, G)**
   - GFX-F: Process steps reveal animations
   - GFX-G: Terminal-style contact form
   These improve content presentation and form UX.

4. **Polish & Compliance (GFX-H, I, J)**
   - GFX-H: Easter eggs (Dev HUD + Satellite)
   - GFX-I: Reduced-motion compliance audit
   - GFX-J: Performance & accessibility audit
   These ensure quality and accessibility.

### Implementation Strategy:

1. **Branch Management**:
   - Create `feature/gfx-sprint` branch
   - One commit per tile with format "TILE GFX-X: description"
   - Squash-merge back to main when complete

2. **Testing Protocol**:
   - Run `npm run dev` after each tile
   - Verify console is clean
   - Maintain existing test coverage
   - Performance benchmarks:
     - CPU usage < 3% for starfield
     - FPS ≥ 55 desktop, ≥ 40 mobile
     - Lighthouse score ≥ 90 mobile

3. **Accessibility Focus**:
   - Implement `prefers-reduced-motion` checks
   - Maintain contrast ratios ≥ 4.5:1
   - Zero motion violations in axe-core
   - No CLS/LCP regressions

### Dependencies & Code Structure:
- All code snippets are provided in `polish_v2.0.1.md`
- Components will be added to `src/components/home/v6/`
- Global styles will go in `globals.css`
- New components need LEGIT protocol compliance

Would you like to proceed with implementing the first tile (GFX-A: Hero Motion), or would you prefer to review any specific aspect of the plan first?
