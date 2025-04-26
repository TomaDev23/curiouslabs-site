# CuriousLabs Website Site Map

This document provides a comprehensive map of all website components, text fields, and interactive elements to facilitate precise editing and enhancement.





## Human-Friendly Visual Map

```
                                  📱 MOBILE VIEW 📱
                   ┌────────────────────────────────────┐
                   │            CuriousLabs            🍔│  <- Hamburger Menu
                   └────────────────────────────────────┘
                   ┌────────────────────────────────────┐
                   │                                    │
                   │ ✨ Fix your broken code. ✨        │  <- Hero Section
                   │ Fast. Documented. Traceable.       │     (Hero.jsx)
                   │                                    │
                   │ [Send First Mission] [View Cases]  │
                   │                                    │
                   └────────────────────────────────────┘
                   ┌────────────────────────────────────┐
                   │    Elite AI Code Operations        │
                   │ ┌──────────────┐ ┌──────────────┐  │  <- Services Section
                   │ │ Code Rescue  │ │ Security Fix │  │     (Services.jsx)
                   │ │  • bullets   │ │  • bullets   │  │
                   │ │ [Learn More] │ │ [Learn More] │  │
                   │ └──────────────┘ └──────────────┘  │
                   └────────────────────────────────────┘
                   ┌────────────────────────────────────┐
                   │        Mission Metrics             │
                   │ ┌────┐ ┌────┐ ┌────┐ ┌────────┐   │  <- Metrics Section
                   │ │22+ │ │100%│ │100%│ │  Every  │   │     (Metrics.jsx)
                   │ │Tiles│ │Test│ │Logs│ │ Mission │   │
                   │ │ Shipped  │ │Pass │ │Delivered │   │
                   │ └────┘ └────┘ └────┘ └────────┘   │
                   └────────────────────────────────────┘
                   ┌────────────────────────────────────┐
                   │          Mission Logs              │
                   │                                    │
                   │ ┌──────────────┐ ┌──────────────┐  │  <- Case Studies Section
                   │ │CLI Parser    │ │Security      │  │     (CaseStudies.jsx)
                   │ │Repair        │ │Config        │  │
                   │ │              │ │Recovery      │  │
                   │ │[View Full]   │ │[View Full]   │  │
                   │ └──────────────┘ └──────────────┘  │
                   └────────────────────────────────────┘
                   ┌────────────────────────────────────┐
                   │        Mission Feedback            │
                   │ ┌──────────────┐ ┌──────────────┐  │  <- Testimonials Section
                   │ │"CuriousLabs  │ │"The trace    │  │     (Testimonials.jsx)
                   │ │saved us..."  │ │logs alone..."│  │
                   │ │              │ │              │  │
                   │ │Alex R.       │ │Maya T.       │  │
                   │ └──────────────┘ └──────────────┘  │
                   └────────────────────────────────────┘
                   ┌────────────────────────────────────┐
                   │      Trusted by companies          │
                   │ □□□□□   □□□□□   □□□□□   □□□□□      │  <- Company logos
                   └────────────────────────────────────┘


                                  🖥️ DESKTOP VIEW 🖥️
    ┌────────────────────────────────────────────────────────────────────────┐
    │ CuriousLabs      Home  Services  Case Studies  Metrics  About  Contact │  <- NavBar.jsx
    ├────────────────────────────────────────────────────────────────────────┤
    │                                                                        │
    │                 ✨ Fix your broken code. ✨                           │
    │                 Fast. Documented. Traceable.                          │
    │                                                                        │  <- Hero.jsx
    │               [Send First Mission]  [View Case Studies]                │
    │                                                                        │
    ├────────────────────────────────────────────────────────────────────────┤
    │                       Elite AI Code Operations                         │
    │     ┌─────────────────────────┐       ┌─────────────────────────┐      │
    │     │                         │       │                         │      │
    │     │       Code Rescue       │       │       Security Fix      │      │  <- Services.jsx
    │     │     • Fix failing tests │       │     • Secure configs    │      │
    │     │     • Bug patches       │       │     • Token validation  │      │
    │     │     • Traceable logs    │       │     • Auth patching     │      │
    │     │     • Documented fixes  │       │     • LEGIT compliance  │      │
    │     │                         │       │                         │      │
    │     │      [Learn More]       │       │      [Learn More]       │      │
    │     └─────────────────────────┘       └─────────────────────────┘      │
    ├────────────────────────────────────────────────────────────────────────┤
    │                            Mission Metrics                             │
    │  ┌──────────┐        ┌──────────┐       ┌──────────┐      ┌──────────┐ │
    │  │   22+    │        │   100%   │       │   100%   │      │  Every   │ │
    │  │          │        │          │       │          │      │          │ │  <- Metrics.jsx
    │  │ AI Tiles │        │Test Pass │       │ CLI Logs │      │Documented│ │
    │  │ Shipped  │        │   Rate   │       │Delivered │      │  Fixes   │ │
    │  └──────────┘        └──────────┘       └──────────┘      └──────────┘ │
    ├────────────────────────────────────────────────────────────────────────┤
    │                             Mission Logs                               │
    │  Real-world code operations performed by our elite AI tactical teams   │
    │                                                                        │
    │  ┌─────────────────────────────────┐ ┌─────────────────────────────┐   │
    │  │           CLI Parser Repair     │ │     Security Config Recovery │   │  <- CaseStudies.jsx
    │  │ Problem: Broken OCR pipelines   │ │ Problem: Leaking token      │   │
    │  │ Solution: Dynamic agent fallback│ │ Solution: Token rotation    │   │
    │  │          [View Full Case]       │ │          [View Full Case]   │   │
    │  └─────────────────────────────────┘ └─────────────────────────────┘   │
    ├────────────────────────────────────────────────────────────────────────┤
    │                           Mission Feedback                             │
    │                                                                        │
    │  ┌─────────────────────────────────┐ ┌─────────────────────────────┐   │
    │  │ "CuriousLabs saved us weeks of  │ │ "The trace logs alone are   │   │  <- Testimonials.jsx
    │  │  debugging — a real tactical    │ │  worth it. Complete         │   │
    │  │  advantage."                    │ │  operational clarity."      │   │
    │  │                                 │ │                             │   │
    │  │  Alex R.                        │ │  Maya T.                    │   │
    │  │  Indie SaaS Founder             │ │  Startup CTO                │   │
    │  └─────────────────────────────────┘ └─────────────────────────────┘   │
    │                                                                        │
    │                      Trusted by innovative teams                       │
    │         □□□□□     □□□□□     □□□□□     □□□□□     □□□□□                │
    └────────────────────────────────────────────────────────────────────────┘

  BACKGROUND SYSTEM (In all views):
  ┌────────────────────────────────────────────────────────────────────────┐
  │ ╭──────────────────────────────────────────────────────────────────╮   │
  │ │                           Deep Black Base                         │   │
  │ │                                                                   │   │
  │ │    ╭─────╮                                        ╭────────╮      │   │
  │ │    │Blob1│                                        │Circuit │      │   │  <- index.jsx background
  │ │    ╰─────╯                                        │Pattern │      │   │     (z-index: 0)
  │ │                          ╭─────╮                  ╰────────╯      │   │
  │ │                          │Blob2│          ╭────────────╮          │   │
  │ │                          ╰─────╯          │   Noise    │          │   │
  │ │                                           │  Texture   │          │   │
  │ │              ╭─────╮                      ╰────────────╯          │   │
  │ │              │Blob3│                                              │   │
  │ ╰──────────────────────────────────────────────────────────────────╯   │
  └────────────────────────────────────────────────────────────────────────┘
```

## Visual Elements Reference Chart

```
 COMPONENT TYPE    | PURPLE THEME             | BLUE THEME                 
------------------|--------------------------|----------------------------
 Headings         | from-curious-purple-400  | to-curious-blue-400        
                  | to-curious-purple-300    | from-curious-blue-300      
------------------|--------------------------|----------------------------
 Buttons          | from-curious-purple-600  | from-curious-blue-600      
                  | to-curious-purple-500    | to-curious-blue-700        
------------------|--------------------------|----------------------------
 Card Borders     | border-curious-purple-   | border-curious-blue-       
                  | 900/30 → 700/40 (hover)  | 900/40 → 700/40 (hover)    
------------------|--------------------------|----------------------------
 Card Accents     | via-curious-purple-      | via-curious-blue-          
                  | 500/50                   | 500/50                     
------------------|--------------------------|----------------------------
 Gradient Blobs   | via-curious-purple-      | via-curious-blue-          
                  | 600/30, opacity-70       | 600/15, opacity-60         
```

## Interactive Elements Reference

```
 ELEMENT TYPE     | DEFAULT STATE            | HOVER STATE               | ACTIVE STATE
------------------|--------------------------|---------------------------|------------------
 Primary Button   | bg-gradient-to-r        | + opacity-10 white overlay| opacity-20 white
                  | from-purple-600         | + -translate-y-1          | + scale-95
                  | to-purple-500           | + bottom glow             |
------------------|--------------------------|---------------------------|------------------
 Secondary Button | border-2                | + bg-purple-900/30        | + bg-purple-900/50
                  | border-purple-500       | + -translate-y-1          | + scale-95
                  |                         | + bottom glow             |
------------------|--------------------------|---------------------------|------------------
 Cards            | border-purple-900/30    | + scale-[1.02]            | 
                  | bg-gradient-to-br       | + border-purple-700/40    |
                  | from-dark-700           | + top edge glow           |
                  | to-dark-900             |                           |
```





## Site Structure Overview

```
CuriousLabs Website
│
├── Navigation (NavBar.jsx)
│   ├── Logo
│   ├── Nav Links: Home, Services, Case Studies, Metrics, About, Contact
│   └── Mobile Navigation Toggle
│
├── Home Page (index.jsx)
│   ├── Hero Section (Hero.jsx)
│   ├── Services Section (Services.jsx)
│   ├── Metrics Section (Metrics.jsx)
│   ├── Case Studies Section (CaseStudies.jsx)
│   ├── Testimonials Section (Testimonials.jsx)
│   └── Footer
│
└── Background System (index.jsx)
    ├── Base Layer (bg-deep-black)
    ├── Gradient Blobs (positioned absolutely)
    ├── Circuit Pattern Overlay
    └── Noise Texture Overlay


## Detailed Component Breakdown

### 1. Navigation Component
**File:** `src/components/NavBar.jsx`

```
NavBar
├── Logo: "CuriousLabs" (text/image)
└── Navigation Links
    ├── Home (#)
    ├── Services (#services)
    ├── Case Studies (#case-studies)
    ├── Metrics (#metrics)
    ├── About (#about)
    └── Contact (#contact)
```

### 2. Hero Component
**File:** `src/components/Hero.jsx`

```
Hero Section
├── Background Elements
│   ├── Gradient Background: from-curious-dark-900/90 via-curious-dark-800/80 to-curious-dark-900/90
│   ├── Circuit Pattern Overlay: bg-circuit-pattern opacity-[0.05]
│   └── Glowing Centerpiece Orb (3 layered elements)
│       ├── Large Blob: w-[600px] h-[300px] opacity-65
│       ├── Medium Blob: w-[500px] h-[120px] opacity-55
│       └── Thin Line: w-[400px] h-[8px] opacity-75
│
├── Text Elements
│   ├── Main Heading: "Fix your broken code." (gradient text)
│   ├── Subheading: "Fast. Documented. Traceable." (white text)
│   └── Description: "Elite AI CodeOps missions for founders and dev teams — powered by CuriousLabs."
│
└── CTA Buttons
    ├── Primary: "Send First Mission" (gradient button with hover effects)
    └── Secondary: "View Case Studies" (outlined button with hover effects)
```

### 3. Services Component
**File:** `src/components/Services.jsx`

```
Services Section
├── Section Heading: "Elite AI Code Operations"
│
└── Service Cards (Grid)
    ├── Card 1: Code Rescue
    │   ├── Title: "Code Rescue"
    │   └── Bullets:
    │       ├── "Fix failing tests"
    │       ├── "Bug patches"
    │       ├── "Traceable logs"
    │       └── "Documented fixes"
    │
    └── Card 2: Security Fix
        ├── Title: "Security Fix"
        └── Bullets:
            ├── "Secure configs"
            ├── "Token validation"
            ├── "Auth patching"
            └── "LEGIT compliance"
```

### 4. Metrics Component
**File:** `src/components/Metrics.jsx`

```
Metrics Section
├── Section Heading: "Mission Metrics"
│
└── Metrics Cards (Grid)
    ├── Metric 1
    │   ├── Value: "22+"
    │   └── Label: "AI Tiles Shipped"
    ├── Metric 2
    │   ├── Value: "100%"
    │   └── Label: "Test Pass Rate"
    ├── Metric 3
    │   ├── Value: "100%"
    │   └── Label: "CLI Logs Delivered"
    └── Metric 4
        ├── Value: "Every Mission"
        └── Label: "Documented Fixes"
```

### 5. Case Studies Component
**File:** `src/components/CaseStudies.jsx`

```
Case Studies Section
├── Section Heading: "Mission Logs"
├── Section Description: "Real-world code operations performed by our elite AI tactical teams."
│
└── Case Study Cards (Grid)
    ├── Case Study 1
    │   ├── Title: "CLI Parser Repair"
    │   ├── Problem: "Broken OCR pipelines with async edge cases."
    │   └── Solution: "Dynamic agent fallback tree rebuilt with 100% test pass."
    │
    └── Case Study 2
        ├── Title: "Security Config Recovery"
        ├── Problem: "Leaking token through public headers."
        └── Solution: "Token rotation and HMAC guards implemented."
```

### 6. Testimonials Component
**File:** `src/components/Testimonials.jsx`

```
Testimonials Section
├── Section Heading: "Mission Feedback"
│
└── Testimonial Cards
    ├── Testimonial 1
    │   ├── Quote: "CuriousLabs saved us weeks of debugging — a real tactical advantage."
    │   ├── Author Name: "Alex R."
    │   └── Author Company: "Indie SaaS Founder"
    │
    └── Testimonial 2
        ├── Quote: "The trace logs alone are worth it. Complete operational clarity."
        ├── Author Name: "Maya T."
        └── Author Company: "Startup CTO"
```

### 7. Background System
**File:** `src/pages/index.jsx`

```
Background System
├── Base Background: bg-deep-black
│
├── Gradient Blobs
│   ├── Blob 1: positioned at top-1/4 left-1/4, purple gradient
│   ├── Blob 2: positioned at bottom-1/3 right-1/4, blue gradient
│   └── Additional blobs for visual depth
│
├── Circuit Pattern: bg-circuit-pattern with opacity-[0.05]
│
└── Noise Texture: subtle grain overlay with opacity-[0.03]
```

## Text Content Inventory

### Hero Section
- Main Heading: "Fix your broken code."
- Subheading: "Fast. Documented. Traceable."
- Description: "Elite AI CodeOps missions for founders and dev teams — powered by CuriousLabs."
- CTA Primary: "Send First Mission"
- CTA Secondary: "View Case Studies"

### Services Section
- Section Title: "Elite AI Code Operations"
- Service 1 Title: "Code Rescue"
- Service 1 Bullets:
  - "Fix failing tests"
  - "Bug patches"
  - "Traceable logs"
  - "Documented fixes"
- Service 2 Title: "Security Fix"
- Service 2 Bullets:
  - "Secure configs"
  - "Token validation"
  - "Auth patching"
  - "LEGIT compliance"

### Metrics Section
- Section Title: "Mission Metrics"
- Metric 1 Value: "22+"
- Metric 1 Label: "AI Tiles Shipped"
- Metric 2 Value: "100%"
- Metric 2 Label: "Test Pass Rate"
- Metric 3 Value: "100%"
- Metric 3 Label: "CLI Logs Delivered"
- Metric 4 Value: "Every Mission"
- Metric 4 Label: "Documented Fixes"

### Case Studies Section
- Section Title: "Mission Logs"
- Section Description: "Real-world code operations performed by our elite AI tactical teams."
- Case Study 1 Title: "CLI Parser Repair"
- Case Study 1 Problem: "Broken OCR pipelines with async edge cases."
- Case Study 1 Solution: "Dynamic agent fallback tree rebuilt with 100% test pass."
- Case Study 2 Title: "Security Config Recovery"
- Case Study 2 Problem: "Leaking token through public headers."
- Case Study 2 Solution: "Token rotation and HMAC guards implemented."

### Testimonials Section
- Section Title: "Mission Feedback"
- Testimonial 1 Quote: "CuriousLabs saved us weeks of debugging — a real tactical advantage."
- Testimonial 1 Author: "Alex R."
- Testimonial 1 Position: "Indie SaaS Founder"
- Testimonial 2 Quote: "The trace logs alone are worth it. Complete operational clarity."
- Testimonial 2 Author: "Maya T."
- Testimonial 2 Position: "Startup CTO"

## Visual Elements & Animation Inventory

### Animations
- `animate-float-slow`: Slow floating animation for background blobs
- `animate-float`: Standard floating animation
- `animate-pulse-subtle`: Subtle pulsing animation for glow effects
- `animate-glow-text`: Text glow animation (when applied)
- `group-hover:-translate-y-1`: Button hover animation

### Gradients
- Text Gradients: 
  - `bg-gradient-to-r from-curious-purple-200 via-white to-curious-blue-200` (Hero)
  - `bg-gradient-to-r from-curious-purple-400 to-curious-blue-400` (Section titles)
- Button Gradients: 
  - `bg-gradient-to-r from-curious-purple-600 to-curious-purple-500` (Primary)
  - `bg-gradient-to-r from-curious-blue-600 to-curious-blue-700` (Case studies)
  - `bg-gradient-to-r from-curious-purple-600 to-curious-blue-600` (Services)
- Background Gradients: 
  - `bg-gradient-to-b from-curious-dark-900/90 via-curious-dark-800/80 to-curious-dark-900/90` (Hero)
  - `bg-gradient-to-br from-curious-dark-700 to-curious-dark-900` (Cards)
  - `bg-gradient-to-br from-curious-dark-900 via-curious-purple-900/50 to-curious-dark-900` (Testimonials)

### Background Elements
- Circuit Pattern: Technical pattern overlay at low opacity
- Noise Texture: Subtle grain texture for depth
- Gradient Blobs: Multiple floating color elements
- Card Borders: `border border-curious-purple-900/30`, `border border-curious-blue-900/30`

## Z-Index Structure
- Background Elements: `z-0`
- Main Content Container: `z-10`
- NavBar (when floating): `z-50`

## CSS Classes for Component Enhancement

### Card Enhancement Classes
- Base Card: `bg-gradient-to-br from-curious-dark-700 to-curious-dark-800 rounded-lg shadow-lg border border-curious-purple-900/30`
- Hover Effect: `hover:-translate-y-1 transition-all duration-300 hover:shadow-curious-purple-700/20`
- Card Header Accent: `h-8 w-1 bg-gradient-to-b from-curious-purple-400 to-curious-blue-400 rounded-full`

### Button Enhancement Classes
- Primary Button: `bg-gradient-to-r from-curious-purple-600 to-curious-purple-500 text-white px-8 py-4 rounded-lg font-medium`
- Secondary Button: `border-2 border-curious-purple-500 text-white px-8 py-4 rounded-lg font-medium`
- Button Hover: `hover:shadow-lg hover:shadow-curious-purple-700/30 transform transition-all hover:-translate-y-1`

This comprehensive map provides a clear reference for editing specific components, text fields, and visual elements across the website structure.
