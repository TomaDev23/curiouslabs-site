# CuriousLabs Website Site Map (v30.4)

This document provides a comprehensive map of all website pages, components, text fields, and interactive elements to facilitate precise editing and enhancement.

## Table of Contents

1. [Overall Site Structure](#overall-site-structure)
2. [Common Components](#common-components)
3. [Home Page](#home-page)
4. [Product Pages](#product-pages)
   - [Products Portal](#products-portal)
   - [Aegis](#aegis-product-page)
   - [OpsPipe](#opspipe-product-page)
   - [MoonSignal](#moonsignal-product-page)
   - [Curious](#curious-product-page)
   - [Guardian](#guardian-product-page)
5. [CodeLab Page](#codelab-page)
6. [Blog Page](#blog-page)
7. [About Page](#about-page)
8. [Contact Page](#contact-page)
9. [Documentation Page](#documentation-page)
10. [Visual Elements Reference](#visual-elements-reference)
11. [Anchor System](#anchor-system)
12. [Feature Grid System](#feature-grid-system)

## Overall Site Structure

```
CuriousLabs Website
│
├── Common Components
│   ├── NavBar
│   └── Footer
│
├── Main Pages
│   ├── Home (/)
│   ├── Products Portal (/products)
│   ├── CodeLab (/codelab)
│   ├── Blog (/blog)
│   ├── About (/about)
│   ├── Contact (/contact)
│   └── Documentation (/docs)
│
└── Product Pages
    ├── Aegis (/products/aegis)
    ├── OpsPipe (/products/opspipe)
    ├── MoonSignal (/products/moonsignal)
    ├── Curious (/products/curious)
    └── Guardian (/products/guardian)
```

## Anchor System

All product pages implement a standardized anchor system for improved navigation and future dynamic scroll functionality.

### Standard Anchor Tags
Each product page includes the following anchor IDs:

| Section | HTML ID | Description |
|---------|---------|-------------|
| Hero / Overview | `#overview` | Title, subtitle, CTA at the top of the page |
| Feature Grid | `#features` | Section showing the 6 primary feature tiles |
| Call-to-Action | `#cta` | Bottom banner with buttons for user action |

### Usage
These anchors enable:
- Direct URL navigation (e.g., `/products/aegis#features`)
- Smooth scrolling within pages
- Internal page linking (e.g., "Explore Features" button)

## Feature Grid System

Each product page implements a standardized 6-item feature grid with real, grounded feature descriptions.

### Grid Structure
- Desktop: 3x2 grid layout (3 columns, 2 rows)
- Tablet: 2x3 grid layout (2 columns, 3 rows)
- Mobile: 1x6 grid layout (single column)

### Feature Components
Each feature includes:
- Icon (emoji or SVG)
- Title (concise feature name)
- Description (one-line explanation)

### Product-Specific Features

#### Aegis
- 🧠 Decision Graph: Uses state graphs to model runtime decisions and fallback chains.
- ⚙️ Agent Orchestration: Powers AI modules like GPT, Claude, Gemini, Grok in unified logic.
- 📡 Signal Integration: Accepts inbound data from tools like MoonSignal and OpsPipe.
- 🔒 Contract Enforcement: Validates transitions and actions with declarative schemas.
- 🔄 Memory & Telemetry: Tracks every state, transition, and variable at runtime.
- 🔌 Modular Output Hooks: Powers downstream rendering, sync, or routing to other tools.

#### OpsPipe
- 🚨 Real-Time Monitoring: Watch task states, inputs, and output flows as they execute.
- 🔁 Intelligent Automation: Define workflows that adapt based on signal or feedback.
- 🧪 CLI + Telegram Interface: Ingest documents or triggers via terminal or bot UI.
- 🛠️ Custom Error Handling: Route failures into fallback states powered by Aegis.
- 📦 Output & Export Pipeline: Push to webhooks, dashboards, accounting tools, or folders.
- 🔐 Hardened Trace System: Every action traceable, testable, and auditable.

#### Curious
- 💭 Conversational Memory: Remembers your thought patterns and references past ideas to build meaningful connections.
- ✨ Creative Co-Pilot: Explores ideas with you, challenging assumptions and suggesting novel perspectives.
- ❤️ Emotionally Aware: Recognizes emotional tones and adapts responses to your current thinking state.
- 🛡️ Boundary Respecting: Maintains a healthy balance between suggestion and intrusion with customizable presence.
- 🔄 Multi-Modal Thinking: Moves fluently between visual, logical, and emotional thought frameworks.
- 📚 Knowledge Integration: Seamlessly connects your ideas with relevant knowledge domains and references.

#### MoonSignal
- 📈 Signal Clustering: Group input patterns into meaningful signal "families."
- 📊 Realtime Visualization: Render signal maps as live dashboards or charts.
- 🧩 Integrates with Aegis: Sends parsed signal data into the decision engine.
- 🤖 Discord / X / Wallet Ready: Built to pull from modern platforms with Web3 compatibility.
- ⚙️ Signal Classification: Tag each cluster with confidence, volatility, risk.
- 🔂 Adaptive Thresholds: Learns which signal types matter to your stack.

#### Guardian
- 🛡️ Safe AI Presence: Designed for constant digital presence for children.
- 🎨 Creative Encouragement: Suggests games, drawing, singing instead of screen time.
- 🧠 Age-Aware Tone: Learns to adapt answers based on user maturity.
- 📺 Screen Redirection: Gently redirects from YouTube or TikTok into healthy input.
- 🎤 Always-On Listener: Optional input modes for voice feedback and presence.
- ⚙️ Parent Control Panel: Future feature for parent trace, session view, and training filters.

## Product Pages Detail

### Aegis Product Page
**File:** `src/pages/products/aegis.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│ │ (#overview)                    │  │                            │  │
│ │ Aegis                          │  │       Product Image        │  │
│ │                                │  │                            │  │
│ │ AI-powered code vulnerability  │  │                            │  │
│ │ detection and remediation that │  │                            │  │
│ │ safeguards your applications.  │  │                            │  │
│ │                                │  │                            │  │
│ │ [Visit CodeLab] [Documentation]│  │                            │  │
│ │                                │  │                            │  │
│ └────────────────────────────────┘  └────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                      Key Features (#features)                        │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐                       │
│ │   🧠       │  │    ⚙️      │  │    📡      │                       │
│ │            │  │            │  │            │                       │
│ │ Decision   │  │ Agent      │  │ Signal     │                       │
│ │ Graph      │  │ Orchestr...│  │ Integration│                       │
│ └────────────┘  └────────────┘  └────────────┘                       │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐                       │
│ │   🔒       │  │    🔄      │  │    🔌      │                       │
│ │            │  │            │  │            │                       │
│ │ Contract   │  │ Memory &   │  │ Modular    │                       │
│ │ Enforcement│  │ Telemetry  │  │ Output Hooks│                      │
│ └────────────┘  └────────────┘  └────────────┘                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                        (#cta)                                        │
│         Ready to experience Aegis?                                   │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer                                     │
└──────────────────────────────────────────────────────────────────────┘
```

### OpsPipe Product Page
**File:** `src/pages/products/opspipe.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│ │ (#overview)                    │  │                            │  │
│ │ OpsPipe                        │  │       Product Image        │  │
│ │                                │  │                            │  │
│ │ Streamline your DevOps         │  │                            │  │
│ │ workflows with intelligent     │  │                            │  │
│ │ automation and monitoring.     │  │                            │  │
│ │                                │  │                            │  │
│ │ [Visit CodeLab] [Documentation]│  │                            │  │
│ │                                │  │                            │  │
│ └────────────────────────────────┘  └────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                      Key Features (#features)                        │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐                       │
│ │   🚨       │  │    🔁      │  │    🧪      │                       │
│ │            │  │            │  │            │                       │
│ │ Real-Time  │  │ Intelligent│  │ CLI +      │                       │
│ │ Monitoring │  │ Automation │  │ Telegram   │                       │
│ └────────────┘  └────────────┘  └────────────┘                       │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐                       │
│ │   🛠️       │  │    📦      │  │    🔐      │                       │
│ │            │  │            │  │            │                       │
│ │ Custom Error│  │ Output &  │  │ Hardened   │                       │
│ │ Handling   │  │ Export     │  │ Trace System│                      │
│ └────────────┘  └────────────┘  └────────────┘                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                        (#cta)                                        │
│         Ready to experience OpsPipe?                                 │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer                                     │
└──────────────────────────────────────────────────────────────────────┘
```

### Curious Product Page
**File:** `src/pages/products/curious.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│ │ (#overview)                    │  │                            │  │
│ │ Curious                        │  │       Product Image        │  │
│ │                                │  │                            │  │
│ │ AI-assisted code exploration   │  │                            │  │
│ │ and learning platform that     │  │                            │  │
│ │ helps developers understand    │  │                            │  │
│ │ complex codebases.             │  │                            │  │
│ │                                │  │                            │  │
│ │ [Visit CodeLab] [Documentation]│  │                            │  │
│ │                                │  │                            │  │
│ └────────────────────────────────┘  └────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                      Key Features (#features)                        │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐                       │
│ │   💭       │  │    ✨      │  │    ❤️      │                       │
│ │            │  │            │  │            │                       │
│ │ Conversational│ │ Creative  │  │ Emotionally│                      │
│ │ Memory     │  │ Co-Pilot   │  │ Aware      │                       │
│ └────────────┘  └────────────┘  └────────────┘                       │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐                       │
│ │   🛡️       │  │    🔄      │  │    📚      │                       │
│ │            │  │            │  │            │                       │
│ │ Boundary   │  │ Multi-Modal│  │ Knowledge  │                       │
│ │ Respecting │  │ Thinking   │  │ Integration│                       │
│ └────────────┘  └────────────┘  └────────────┘                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                        (#cta)                                        │
│         Ready to experience Curious?                                 │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer                                     │
└──────────────────────────────────────────────────────────────────────┘
```

## Visual Elements Reference

### Colors Palette

```
┌────────────────────────────────────────────────────────────────────────┐
│ PRIMARY COLORS                                                          │
├────────────────┬────────────────┬────────────────┬────────────────┬────┘
│ Purple 400     │ Purple 500     │ Purple 600     │ Purple 700     │
│ #A78BFA       │ #8B5CF6       │ #7C3AED       │ #6D28D9       │
└────────────────┴────────────────┴────────────────┴────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ ACCENT COLORS                                                           │
├────────────────┬────────────────┬────────────────┬────────────────┬────┘
│ Blue 400       │ Blue 500       │ Blue 600       │ Blue 700       │
│ #60A5FA       │ #3B82F6       │ #2563EB       │ #1D4ED8       │
└────────────────┴────────────────┴────────────────┴────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ BACKGROUND COLORS                                                       │
├────────────────┬────────────────┬────────────────┬────────────────┬────┘
│ Dark 900       │ Dark 800       │ Dark 700       │ Deep Black     │
│ #1A1A2E       │ #272750       │ #2A2A45       │ #0F0F1A       │
└────────────────┴────────────────┴────────────────┴────────────────┘
```

### Feature Card Styling

```css
/* Standard Feature Card */
.feature-card {
  @apply bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50
         border border-purple-500/10 hover:border-purple-500/30
         rounded-xl p-6 transition-all duration-300;
}

/* Feature Icon Container */
.feature-icon {
  @apply w-14 h-14 rounded-full bg-gradient-to-r 
         flex items-center justify-center mb-4;
}

/* Feature Title */
.feature-title {
  @apply text-xl font-semibold mb-2 text-white;
}

/* Feature Description */
.feature-description {
  @apply text-sm text-gray-400;
}
```

### TILE 4.4 Implementation Notes

This site map reflects the TILE 4.4 enhancements that have been applied to the product pages, including:

1. Anchor system implementation with `#overview`, `#features`, and `#cta` IDs
2. Feature grid standardization with emoji icons and real-world descriptions
3. SEO metadata improvements via Helmet component
4. Consistent styling and responsive design across all product pages

All product pages now follow this structure for improved navigation, consistency, and future extensibility.
