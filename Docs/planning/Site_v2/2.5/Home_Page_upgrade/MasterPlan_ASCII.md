                              🕷 CuriousLabs Solar Upgrade Spider 🕷
                             ─────────────────────────────────────

                                      [🌌 Home Page Overhaul]
                                               │
          ┌────────────────────────────────────┴────────────────────────────────────┐
          │                                                                         │
   [🧱 Phase 1: Scaffolding]                                               [🌍 Phase 2: Solar System]
   Dir setup, layout stubs                                                  Enhanced 3D experience
          │                                                                         │
          ├── /src/layouts/HomeFloatflowLayout.jsx                        ├── /components/home/EnhancedSolarSystem.jsx
          ├── /components/home/FloatingHeroContent.jsx                    ├── /assets/shaders/solar/GlowShader.glsl
          ├── /components/home/... (About, Services, etc.)                ├── Orbit logic, glow, stars, shaders
          └── /utils/useDeviceProfile.js                                  └── Mobile fallback logic

          │                                                                         │
          ▼                                                                         ▼

   [🛰 Phase 3: Floating UI Layers]                                     [🌀 Phase 4: Content Sections]
   Scroll + parallax integration                                        Services, About, Contact zones
          │                                                                         │
          ├── FloatingHeroContent.jsx (typed text, CTA)                 ├── AboutSection.jsx
          ├── StarfieldBackground.jsx (visual parallax)                ├── ServicesSection.jsx
          ├── MissionStatus.jsx (status orbit)                         ├── ProjectsSection.jsx
          └── CuriousBot.jsx (replaces emoji bot)                      └── ContactSection.jsx

          │                                                                         │
          ▼                                                                         ▼

                         [⚙️ Phase 5: Integration & Optimization]
                          ├── HomeFloatflowLayout stitches all sections
                          ├── Scroll sync + transform flow
                          ├── `useCleanupAnimation()` + RAFTiming
                          ├── Low-perf rendering + memory cleanup
                          └── Shader isolation for performance

────────────────────────────────────────────────────────────────────────────────────────

📁 Docs Reference Structure:
  ├── v3.0.md   → Phase overview, base structure
  ├── v3.1.md   → Floating content + animation breakdown
  ├── v3.2.md   → Shader, performance, and orbiting specs
  └── v3.3.md   → Scroll sync, layout flow, asset control
  🧾 HomePageMasterPlan.md → Ties everything together, runtime notes

🧩 Shared Assets:
  /public/images/universe.jpg         ← Background canvas
  /assets/shaders/solar/              ← Sun, stars, particle effects
  /components/home/                   ← All modular homepage sections

📌 Goals:
  - Solar system serves navigation and narrative
  - CuriousBot replaces emoji icon
  - Page scroll = cosmic motion sync
  - Desktop/Mobile parity w/ fallbacks

────────────────────────────────────────────────────────────────────────────────────────

                         ⚡ Cursor running Phase 1 now: Base Layout + Folders
                              ETA: ~1 hour | Status: ⚙️ Bootstrapping

