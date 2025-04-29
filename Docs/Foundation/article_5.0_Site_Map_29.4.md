# CuriousLabs Website Site Map (v29.4)

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

## Common Components

### NavBar Component
**File:** `src/components/NavBar.jsx`

```
                           DESKTOP NAVBAR
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
└──────────────────────────────────────────────────────────────────────┘

                        PRODUCTS DROPDOWN MENU
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
│                     ┌────────────┐                                   │
│                     │ Aegis      │                                   │
│                     │ OpsPipe    │                                   │
│                     │ MoonSignal │                                   │
│                     │ Curious    │                                   │
│                     │ Guardian   │                                   │
│                     └────────────┘                                   │
└──────────────────────────────────────────────────────────────────────┘

                            MOBILE NAVBAR
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs                                                    ☰    │
└──────────────────────────────────────────────────────────────────────┘

                         MOBILE NAVBAR EXPANDED
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs                                                    ☰    │
├──────────────────────────────────────────────────────────────────────┤
│ Home                                                                 │
│ Products ▼                                                           │
│   ├── Aegis                                                          │
│   ├── OpsPipe                                                        │
│   ├── MoonSignal                                                     │
│   ├── Curious                                                        │
│   └── Guardian                                                       │
│ CodeLab                                                              │
│ Blog                                                                 │
│ Docs                                                                 │
│ About                                                                │
│ Contact                                                              │
└──────────────────────────────────────────────────────────────────────┘
```

### Footer Component
**File:** `src/components/Footer.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│ CuriousLabs                                                          │
│                                                                      │
│ Products        Resources       Company         Connect              │
│ ├── Aegis       ├── CodeLab     ├── About       ├── Twitter          │
│ ├── OpsPipe     ├── Blog        ├── Contact     ├── GitHub           │
│ ├── MoonSignal  ├── Docs        ├── Careers     ├── LinkedIn         │
│ ├── Curious     └── Support     └── Press       └── Discord          │
│ └── Guardian                                                         │
│                                                                      │
│ © 2023 CuriousLabs. All rights reserved.                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## Home Page

**File:** `src/pages/index.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                       ✨ Fix your broken code. ✨                    │
│                       Fast. Documented. Traceable.                   │
│                                                                      │
│              [Send First Mission]  [View Case Studies]               │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                    Trusted by innovative teams                       │
│         □□□□□     □□□□□     □□□□□     □□□□□     □□□□□              │
├──────────────────────────────────────────────────────────────────────┤
│                        Elite AI Code Operations                      │
│                                                                      │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│    │              │  │              │  │              │             │
│    │  🛠️ Code     │  │  🔒 Security │  │ ⚙️ Automation│             │
│    │    Rescue    │  │     Fix      │  │    Boost     │             │
│    │              │  │              │  │              │             │
│    └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                      │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│    │              │  │              │  │              │             │
│    │ 📝 Document  │  │ 🔄 Recovery  │  │ ✓ LEGIT      │             │
│    │   Engine     │  │   Systems    │  │  Compliance  │             │
│    │              │  │              │  │              │             │
│    └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                      │
│                   Transformation Complete                            │
├──────────────────────────────────────────────────────────────────────┤
│                        Mission Metrics                               │
│                                                                      │
│    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│    │     22+      │  │    100%      │  │    100%      │             │
│    │              │  │              │  │              │             │
│    │  AI Tiles    │  │ Test Pass    │  │ CLI Logs     │             │
│    │  Shipped     │  │    Rate      │  │ Delivered    │             │
│    └──────────────┘  └──────────────┘  └──────────────┘             │
│                                                                      │
│    ┌──────────────┐                                                  │
│    │    Every     │                                                  │
│    │              │                                                  │
│    │ Documented   │                                                  │
│    │    Fixes     │                                                  │
│    └──────────────┘                                                  │
├──────────────────────────────────────────────────────────────────────┤
│                           Mission Logs                               │
│ Real-world code operations performed by our elite AI tactical teams  │
│                                                                      │
│ ┌──────────────────────────────┐  ┌──────────────────────────────┐  │
│ │       CLI Parser Repair      │  │    Security Config Recovery   │  │
│ │                              │  │                               │  │
│ │ Problem: Broken OCR pipelines│  │ Problem: Leaking token        │  │
│ │ Solution: Dynamic agent      │  │ Solution: Token rotation      │  │
│ │          fallback            │  │                               │  │
│ │                              │  │                               │  │
│ │        [View Full Case]      │  │        [View Full Case]       │  │
│ └──────────────────────────────┘  └──────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────┤
│                         Mission Feedback                             │
│                                                                      │
│ ┌──────────────────────────────┐  ┌──────────────────────────────┐  │
│ │ "CuriousLabs saved us weeks  │  │ "The trace logs alone are    │  │
│ │  of debugging — a real       │  │  worth it. Complete          │  │
│ │  tactical advantage."        │  │  operational clarity."       │  │
│ │                              │  │                              │  │
│ │  Alex R.                     │  │  Maya T.                     │  │
│ │  Indie SaaS Founder          │  │  Startup CTO                 │  │
│ └──────────────────────────────┘  └──────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

## Product Pages

### Products Portal
**File:** `src/pages/products/index.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                   Our AI-Powered Solutions                           │
│                                                                      │
│  Discover our suite of intelligent tools designed to solve real      │
│  problems and enhance your development workflow.                     │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────┐  ┌────────────────────────────┐      │
│ │           Aegis            │  │          OpsPipe           │      │
│ │                            │  │                            │      │
│ │ AI-powered code            │  │ Streamline your DevOps     │      │
│ │ vulnerability detection    │  │ workflows with intelligent │      │
│ │ and remediation            │  │ automation                 │      │
│ │                            │  │                            │      │
│ │      [Learn More]          │  │      [Learn More]          │      │
│ └────────────────────────────┘  └────────────────────────────┘      │
│                                                                      │
│ ┌────────────────────────────┐  ┌────────────────────────────┐      │
│ │         MoonSignal         │  │          Curious           │      │
│ │                            │  │                            │      │
│ │ Predictive analytics for   │  │ AI-assisted code           │      │
│ │ development teams          │  │ exploration and learning   │      │
│ │                            │  │                            │      │
│ │      [Learn More]          │  │      [Learn More]          │      │
│ └────────────────────────────┘  └────────────────────────────┘      │
│                                                                      │
│ ┌────────────────────────────┐                                       │
│ │         Guardian           │                                       │
│ │                            │                                       │
│ │ Continuous monitoring and  │                                       │
│ │ protection for your code   │                                       │
│ │                            │                                       │
│ │      [Learn More]          │                                       │
│ └────────────────────────────┘                                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

### Aegis Product Page
**File:** `src/pages/products/aegis.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│ │                                │  │                            │  │
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
│                           Key Features                               │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│ │    1       │  │     2      │  │     3      │  │     4      │      │
│ │            │  │            │  │            │  │            │      │
│ │ Automated  │  │ Real-time  │  │ Contextual │  │ Seamless   │      │
│ │ Scanning   │  │ Protection │  │ Analysis   │  │ Integration│      │
│ └────────────┘  └────────────┘  └────────────┘  └────────────┘      │
│                                                                      │
│ ┌────────────┐  ┌────────────┐                                       │
│ │     5      │  │     6      │                                       │
│ │            │  │            │                                       │
│ │ Detailed   │  │ Compliance │                                       │
│ │ Reporting  │  │ Ready      │                                       │
│ └────────────┘  └────────────┘                                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         Ready to experience Aegis?                                   │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
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
│ │                                │  │                            │  │
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
│                           Key Features                               │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│ │    1       │  │     2      │  │     3      │  │     4      │      │
│ │            │  │            │  │            │  │            │      │
│ │ CI/CD      │  │ Monitoring │  │ Deployment │  │ Issue      │      │
│ │ Integration│  │ Dashboard  │  │ Automation │  │ Resolution │      │
│ └────────────┘  └────────────┘  └────────────┘  └────────────┘      │
│                                                                      │
│ ┌────────────┐  ┌────────────┐                                       │
│ │     5      │  │     6      │                                       │
│ │            │  │            │                                       │
│ │ Resource   │  │ Smart      │                                       │
│ │ Optimization│ │ Scaling    │                                       │
│ └────────────┘  └────────────┘                                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         Ready to experience OpsPipe?                                 │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

### MoonSignal Product Page
**File:** `src/pages/products/moonsignal.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│ │                                │  │                            │  │
│ │ MoonSignal                     │  │       Product Image        │  │
│ │                                │  │                            │  │
│ │ Predictive analytics that      │  │                            │  │
│ │ help development teams         │  │                            │  │
│ │ anticipate issues before they  │  │                            │  │
│ │ arise.                         │  │                            │  │
│ │                                │  │                            │  │
│ │ [Visit CodeLab] [Documentation]│  │                            │  │
│ │                                │  │                            │  │
│ └────────────────────────────────┘  └────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Key Features                               │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│ │    1       │  │     2      │  │     3      │  │     4      │      │
│ │            │  │            │  │            │  │            │      │
│ │ Trend      │  │ Anomaly    │  │ Performance│  │ Risk       │      │
│ │ Analysis   │  │ Detection  │  │ Forecasting│  │ Assessment │      │
│ └────────────┘  └────────────┘  └────────────┘  └────────────┘      │
│                                                                      │
│ ┌────────────┐  ┌────────────┐                                       │
│ │     5      │  │     6      │                                       │
│ │            │  │            │                                       │
│ │ Custom     │  │ Actionable │                                       │
│ │ Alerts     │  │ Insights   │                                       │
│ └────────────┘  └────────────┘                                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         Ready to experience MoonSignal?                              │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
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
│ │                                │  │                            │  │
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
│                           Key Features                               │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│ │    1       │  │     2      │  │     3      │  │     4      │      │
│ │            │  │            │  │            │  │            │      │
│ │ Code       │  │ Intelligent│  │ Visual     │  │ Interactive│      │
│ │ Navigation │  │ Search     │  │ Mapping    │  │ Learning   │      │
│ └────────────┘  └────────────┘  └────────────┘  └────────────┘      │
│                                                                      │
│ ┌────────────┐  ┌────────────┐                                       │
│ │     5      │  │     6      │                                       │
│ │            │  │            │                                       │
│ │ Contextual │  │ Knowledge  │                                       │
│ │ Documentation│ │ Sharing   │                                       │
│ └────────────┘  └────────────┘                                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         Ready to experience Curious?                                 │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

### Guardian Product Page
**File:** `src/pages/products/guardian.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│ │                                │  │                            │  │
│ │ Guardian                       │  │       Product Image        │  │
│ │                                │  │                            │  │
│ │ Continuous monitoring and      │  │                            │  │
│ │ protection for your code and   │  │                            │  │
│ │ applications.                  │  │                            │  │
│ │                                │  │                            │  │
│ │ [Visit CodeLab] [Documentation]│  │                            │  │
│ │                                │  │                            │  │
│ └────────────────────────────────┘  └────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Key Features                               │
│                                                                      │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐      │
│ │    1       │  │     2      │  │     3      │  │     4      │      │
│ │            │  │            │  │            │  │            │      │
│ │ Real-time  │  │ Automated  │  │ Threat     │  │ Intelligent│      │
│ │ Monitoring │  │ Responses  │  │ Detection  │  │ Alerting   │      │
│ └────────────┘  └────────────┘  └────────────┘  └────────────┘      │
│                                                                      │
│ ┌────────────┐  ┌────────────┐                                       │
│ │     5      │  │     6      │                                       │
│ │            │  │            │                                       │
│ │ Security   │  │ Compliance │                                       │
│ │ Analytics  │  │ Management │                                       │
│ └────────────┘  └────────────┘                                       │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│         Ready to experience Guardian?                                │
│                                                                      │
│  Join the growing community of developers leveraging our tools       │
│  for their projects.                                                 │
│                                                                      │
│                   [Get Started Today]                                │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

## CodeLab Page
**File:** `src/pages/codelab.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                         Welcome to CodeLab                           │
│                                                                      │
│  The interactive playground for all CuriousLabs tools and products.  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                                                                │  │
│  │                  Interactive Code Editor                       │  │
│  │                                                                │  │
│  │  // Start experimenting with our tools                        │  │
│  │  function example() {                                         │  │
│  │    console.log("Welcome to CodeLab!");                        │  │
│  │    return "Start coding with AI assistance";                  │  │
│  │  }                                                            │  │
│  │                                                                │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                         Available Tools                              │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐      │
│  │                 │  │                 │  │                 │      │
│  │  Code Analyzer  │  │  Test Generator │  │  Documenter    │      │
│  │                 │  │                 │  │                 │      │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘      │
│                                                                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐      │
│  │                 │  │                 │  │                 │      │
│  │  Optimizer      │  │  Security Scan  │  │  Explainer     │      │
│  │                 │  │                 │  │                 │      │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘      │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

## Blog Page
**File:** `src/pages/blog.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                              Blog                                    │
│                                                                      │
│          Insights, tutorials, and updates from CuriousLabs          │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │                                                               │   │
│  │                     Coming Soon                               │   │
│  │                                                               │   │
│  │  We're working on exciting content for our blog.              │   │
│  │  Check back soon for articles, tutorials, and case studies.   │   │
│  │                                                               │   │
│  │                                                               │   │
│  │  🚧                                                           │   │
│  │                                                               │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

## About Page
**File:** `src/pages/about.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                About CuriousLabs                                     │
│                                                                      │
│          Building intelligent solutions for tomorrow's challenges    │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ## Our Mission                                                      │
│                                                                      │
│  At CuriousLabs Cambodia, we're passionate about leveraging AI and   │
│  machine learning to create innovative solutions that solve real-    │
│  world problems. Our team of experts is dedicated to pushing the     │
│  boundaries of what's possible.                                      │
│                                                                      │
│  ## Our Story                                                        │
│                                                                      │
│  Founded in 2023, CuriousLabs began with a simple vision: to harness │
│  the power of artificial intelligence to create positive change.     │
│  Today, we're proud to offer a suite of products that help           │
│  businesses and individuals achieve their goals.                     │
│                                                                      │
│  ## Our Values                                                       │
│                                                                      │
│  ┌─────────────────────┐  ┌─────────────────────┐                    │
│  │                     │  │                     │                    │
│  │     Innovation      │  │     Excellence      │                    │
│  │                     │  │                     │                    │
│  │ We embrace creativity│  │ We strive for the  │                    │
│  │ and continuous      │  │ highest quality in  │                    │
│  │ improvement.        │  │ our products.       │                    │
│  └─────────────────────┘  └─────────────────────┘                    │
│                                                                      │
│  ┌─────────────────────┐  ┌─────────────────────┐                    │
│  │                     │  │                     │                    │
│  │    Collaboration    │  │      Integrity      │                    │
│  │                     │  │                     │                    │
│  │ We believe the best │  │ We maintain honesty │                    │
│  │ solutions come from │  │ and transparency in │                    │
│  │ diverse teams.      │  │ all our operations. │                    │
│  └─────────────────────┘  └─────────────────────┘                    │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

## Contact Page
**File:** `src/pages/contact.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                     Get in Touch                                     │
│                                                                      │
│      We'd love to hear from you. Reach out to discuss how we         │
│      can work together.                                              │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐  │
│ │                                │  │                            │  │
│ │    Contact Information         │  │     Send a Message         │  │
│ │                                │  │                            │  │
│ │  📧 Email                      │  │ We're currently building   │  │
│ │  contact@curiouslabs.kh        │  │ our contact form. For now, │  │
│ │                                │  │ please reach out to us via │  │
│ │  📍 Location                   │  │ email.                     │  │
│ │  Phnom Penh, Cambodia          │  │                            │  │
│ │                                │  │                            │  │
│ │  ⏰ Working Hours              │  │ Contact form coming soon!  │  │
│ │  Monday - Friday: 9AM - 6PM    │  │                            │  │
│ │                                │  │                            │  │
│ └────────────────────────────────┘  └────────────────────────────┘  │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
└──────────────────────────────────────────────────────────────────────┘
```

## Documentation Page
**File:** `src/pages/docs.jsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ CuriousLabs    Home Products CodeLab Blog Docs About Contact         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                     Documentation                                    │
│                                                                      │
│      Get started with our comprehensive guides and API documentation │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ ┌────────────────────┐  ┌────────────────────┐  ┌───────────────────┐│
│ │                    │  │                    │  │                   ││
│ │     Quick Start    │  │    API Reference   │  │        FAQ        ││
│ │                    │  │                    │  │                   ││
│ │ Get up and running │  │ Comprehensive API  │  │ Find answers to   ││
│ │ with our products  │  │ documentation for  │  │ commonly asked    ││
│ │ in minutes.        │  │ integration.       │  │ questions.        ││
│ │                    │  │                    │  │                   ││
│ │    [Read more]     │  │    [Read more]     │  │    [Read more]    ││
│ └────────────────────┘  └────────────────────┘  └───────────────────┘│
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                   Documentation Under Construction                   │
│                                                                      │
│  We're currently building our comprehensive documentation portal.    │
│  Check back soon for detailed guides, tutorials, and API references. │
│                                                                      │
│                        [Loading indicator]                           │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                           Footer (as above)                          │
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

┌────────────────────────────────────────────────────────────────────────┐
│ TEXT COLORS                                                             │
├────────────────┬────────────────┬────────────────┬────────────────┬────┘
│ White          │ Gray 300       │ Gray 400       │ Gray 500       │
│ #FFFFFF       │ #D1D5DB       │ #9CA3AF       │ #6B7280       │
└────────────────┴────────────────┴────────────────┴────────────────┘
```

### Component Styles

```
┌────────────────────────────────────────────────────────────────────────┐
│ BUTTONS                                                                 │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Primary Button                                                          │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ bg-gradient-to-r from-purple-600 to-blue-600                       │ │
│ │ hover:from-purple-500 hover:to-blue-500                            │ │
│ │ text-white font-medium py-3 px-6 rounded-md transition-all         │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Secondary Button                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ bg-transparent border border-purple-500 text-white                 │ │
│ │ hover:bg-purple-500/10 font-medium py-3 px-6 rounded-md            │ │
│ │ transition-all duration-300                                         │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ CARDS                                                                   │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Standard Card                                                           │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50                │ │
│ │ border border-purple-500/10 hover:border-purple-500/30             │ │
│ │ rounded-xl p-6 transition-all duration-300                          │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Feature Card                                                            │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ bg-gradient-to-br from-[#2A2A45]/50 to-[#1A1A30]/50                │ │
│ │ border border-purple-500/10                                         │ │
│ │ p-6 rounded-xl                                                      │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ HEADINGS                                                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Main Heading                                                            │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ text-4xl md:text-5xl font-bold text-white mb-6                     │ │
│ │ <span class="text-transparent bg-clip-text                          │ │
│ │ bg-gradient-to-r from-purple-400 to-blue-400">TEXT</span>          │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Section Heading                                                         │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ text-3xl font-bold text-white mb-6 text-center                     │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ Card Heading                                                            │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ text-xl font-semibold text-white mb-2                              │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```
