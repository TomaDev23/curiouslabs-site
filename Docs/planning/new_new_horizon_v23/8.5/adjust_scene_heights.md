# Home Page Length Map

**Total Page Height**: Approximately 600vh

## Cosmic Scene Layers

- **Dormant Scene**
  - Absolute Range: 0vh - 100vh
  - Normalized Progress Range: 0.0 - 0.1
  - Components: StarfieldCanvas, RobotCharacter (dormant state)

- **Awakening Scene**
  - Absolute Range: 100vh - 200vh
  - Normalized Progress Range: 0.1 - 0.3
  - Components: StarfieldCanvas, RobotCharacter (awakening state)

- **Cosmic Reveal Scene**
  - Absolute Range: 200vh - 300vh
  - Normalized Progress Range: 0.3 - 0.5
  - Components: StarfieldCanvas, ConstellationGlow (Ursa Minor)

- **Cosmic Flight Scene**
  - Absolute Range: 300vh - 400vh
  - Normalized Progress Range: 0.5 - 0.7
  - Components: StarfieldCanvas, ConstellationGlow (Orion)

- **Sun Approach Scene**
  - Absolute Range: 400vh - 500vh
  - Normalized Progress Range: 0.7 - 0.85
  - Components: StarfieldCanvas, SunGlow effect

- **Sun Landing Scene**
  - Absolute Range: 500vh - 600vh
  - Normalized Progress Range: 0.85 - 1.0
  - Components: StarfieldCanvas, SunGlow effect, LandingEffect

## Content Components

- **NavBarCosmic**
  - Position: Fixed at top
  - Z-index: High (above all scenes)

- **HeroPortal**
  - Absolute Range: 0vh - 100vh
  - Aligns with: Dormant Scene

- **LogoStrip**
  - Absolute Range: ~80vh - 120vh
  - Aligns with: End of Dormant Scene / Start of Awakening Scene

- **AboutMission (Our Mission)**
  - Absolute Range: ~120vh - 200vh
  - Aligns with: Awakening Scene

- **WhyAIDevCards (Agent-Powered Development)**
  - Absolute Range: ~180vh - 260vh
  - Aligns with: End of Awakening Scene / Start of Cosmic Reveal Scene

- **ServicesOrbital (CodeOps as a Service)**
  - Absolute Range: ~240vh - 320vh
  - Aligns with: Cosmic Reveal Scene

- **FeaturedProjects (Projects from the Lab)**
  - Absolute Range: ~300vh - 380vh
  - Aligns with: End of Cosmic Reveal Scene / Start of Cosmic Flight Scene

- **ProjectsLogbook (Logbook: Behind the Scenes)**
  - Absolute Range: ~360vh - 440vh
  - Aligns with: Cosmic Flight Scene

- **CommunityHub (Join Our World)**
  - Absolute Range: ~420vh - 500vh
  - Aligns with: End of Cosmic Flight Scene / Start of Sun Approach Scene

- **HearFromAI (Hear From Our AI)**
  - Absolute Range: ~480vh - 560vh
  - Aligns with: Sun Approach Scene / Start of Sun Landing Scene

- **ContactTerminal (Reach Out)**
  - Absolute Range: ~540vh - 600vh
  - Aligns with: Sun Landing Scene

- **FooterExperience**
  - Position: At the end of the page
  - Absolute Range: ~580vh - 600vh
  - Aligns with: End of Sun Landing Scene

## Persistent Components

- **NavBarCosmic**: Fixed at the top across all sections
- **ParticleField**: Background effect with varying intensity based on scene
- **CosmicHUD**: Debug overlay showing scroll progress and vh markers

## HUD Overlays (Development Only)

- **Progress HUD**: Displays the current scroll progress as a percentage
- **VH HUD**: Shows the current viewport height in vh units along with markers indicating where each scene begins and ends
- **FPS Meter**: Shows current frame rate for performance monitoring

## Constellation Appearance Points

- **First Constellation (Ursa Minor)**
  - Appears at: 25% scroll (250vh, end of Awakening scene)
  - Exits by: 45% scroll (270vh)

- **Second Constellation (Orion)**
  - Appears at: 55% scroll (330vh, start of Cosmic Flight)
  - Exits by: 70% scroll (420vh)


============================================================================================================================

┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  [NAV-01] NavBarCosmic                                                      │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ CuriousLabs    Mission    Services    Projects    Community    Contact  ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│         



|                                robot here                                   | Dormant scene



                                                                             
                                                                        
|                                                                             | awakening s                                                                                            

                                                                    │
│  [HERO-02] HeroPortal                                                       │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                            ✦       ✧                                    ││
│  │           ✧        ★                        ★        ✦                  ││
│  │                                                                         ││
│  │     ★           Curious Labs            ✧                    ★         ││
│  │              ✦                                                          ││
│  │    ✧    Explore the frontiers of code with our AI-powered     ★       ││
│  │  ★                  development missions                    ✦          ││
│  │                                                                         ││ end of awakening
│  │           [Start Your Mission]    [Explore Projects]                    ││
│  │                                                                         ││
│  │                            ↓                                            ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [LOGO-03] LogoStrip                                                        │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                TRUSTED BY INNOVATIVE TEAMS                              ││
│  │   [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] [Logo] >>           ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [MISS-04] MissionStatement Component (Formerly AboutMission)                 │ Cosmic reveal
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                             Our Mission                                     │
│  │                                                                             │
│  │   Enhancing developer productivity with AI-powered tools and               │
│  │   fostering a collaborative community of creators.                          │
│  │                                                                             │
│  │   [Mission Stats] [Core Values] [Our Approach]                             │
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [AIDEV-05] WhyAIDevCards Component (New)                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                    Why AI-Powered Development?                              ││
│  │                                                                             │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐                        ││
│  │  │ Faster  │  │ Smarter │  │ Better  │  │ Focused │                        ││
│  │  │ Coding  │  │ Testing │  │ Quality │  │ Workflow│                        ││
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘                        ││
│  │                                                                             ││
│  │           [Experience The Difference]                                       ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │ Cosmic flight from here until-
│  [SERV-06] ServicesOrbital                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                           Our Services                                  ││
│  │                                                                         ││
│  │    ┌─────────────────────┐             ┌───────────────────────────┐   ││
│  │    │                     │             │                           │   ││
│  │    │       ╭────╮        │             │ Bug Resolution            │   ││
│  │    │   🐛──┤    ├──🧪    │             │                           │   ││
│  │    │       │ 🧠 │        │             │ Submit your bugs and      │   ││
│  │    │   🔄──┤    ├──⚡    │             │ we'll debug, trace, and   │   ││
│  │    │       ╰────╯        │             │ fix them with detailed    │   ││
│  │    │    🏗️     │          │             │ documentation of the      │   ││
│  │    │                     │             │ solution process.         │   ││
│  │    └─────────────────────┘             │                           │   ││
│  │                                        └───────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [FEAT-07] FeaturedProjects (New Component)                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        Our Track Record                                 ││
│  │                                                                         ││
│  │    ┌────────────┐      ┌────────────┐      ┌────────────┐             ││
│  │    │    97%     │      │    120+    │      │  1,200+    │             ││
│  │    │ Resolution │      │  Projects  │      │   Commits  │             ││
│  │    │    Rate    │      │ Completed  │      │  Per Week  │             ││
│  │    └────────────┘      └────────────┘      └────────────┘             ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [PROJ-08] ProjectsLogbook                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                           Project Gallery                               ││
│  │                                                                         ││
│  │    ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     ││
│  │    │ [Project1] │  │ [Project2] │  │ [Project3] │  │ [Project4] │     ││
│  │    │            │  │            │  │            │  │            │     ││
│  │    │  Nebula    │  │ Quantum    │  │ Orbital    │  │ Eclipse    │     ││
│  │    │  Dashboard │  │ Compiler   │  │ Analytics  │  │ Framework  │     ││
│  │    └────────────┘  └────────────┘  └────────────┘  └────────────┘     ││
│  │                                                                         ││
│  │             [View All Projects]     [Submit Your Problem]               ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [COMM-09] CommunityHub                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                          Community Hub                                  ││
│  │                                                                         ││
│  │   [Blogs] [Tutorials] [Discussions] [Events]                           ││
│  │   ┌───────────────────────────────────────────────────────────────────┐││
│  │   │ Latest from our Blog                                              │││
│  │   │                                                                   │││
│  │   │ [Post]  [Post]  [Post]  [Post]                                   │││
│  │   │                                                                   │││
│  │   └───────────────────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [HEAR-10] HearFromAI (Formerly AITestimonials)                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                         Hear From Our AI                                ││
│  │                                                                         ││
│  │  "Working with the CuriousLabs team has been an enlightening           ││
│  │   experience. Together we've solved problems I couldn't tackle alone."  ││ Cosmic flight wraps here
│  │                                                                         ││ we dissolve gently into sun approach
│  │                          - Claude, AI Assistant                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [CONT-11] ContactTerminal                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                          Contact Terminal                               ││
│  │  ┌────────────────────────┐   ┌────────────────────────────────────┐   ││
│  │  │ $ curious_contact.sh   │   │                                    │   ││
│  │  │ > _                    │   │  Email: info@curiouslabs.dev       │   ││
│  │  │                        │   │                                    │   ││
│  │  │                        │   │  Discord: CuriousLabs             │   ││
│  │  │                        │   │                                    │   ││
│  │  │                        │   │  GitHub: /curious-labs            │   ││
│  │  └────────────────────────┘   └────────────────────────────────────┘   ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [BOT-12] BotFunZone (Formerly CuriousBotEnhanced)                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  ┌────────────────┐                                                     ││
│  │  │      🤖       │ Got questions? I'm your AI assistant!               ││
│  │  └────────────────┘                                                     ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
│  [FOOT-13] FooterExperience                                                 │ Here we enter sun landing 
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ CuriousLabs                                                             ││
│  │                                                                         ││
│  │ [Nav Links]        [Social Links]        [Newsletter]                  ││
│  │                                                                         ││ 
│  │ © 2023 CuriousLabs. Exploring code frontiers.                          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘