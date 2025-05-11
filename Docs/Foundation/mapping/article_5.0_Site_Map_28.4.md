                               CURIOUSLABS SITE MAP
                               ====================

┌────────────────────────────────────────────────────────────────────────────┐
│ CuriousLabs        Home Services Case Studies Metrics About Contact        │ <- NavBar.jsx (fixed)
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│              new text-->   CodeOps{Redefined}                              │ <- Hero.jsx
│ Elite AI CodeOps missions, backburners and dev teams — powered by CuriousLabs.

│         [Send First Mission]      [View Case Studies]                      │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                   Trusted by innovative teams                              │ <- LogoStrip.jsx
│       □ □ □ □ □ □ □ □ □ □                                                  │    (appears at page load, 
│                                                                            │     pinned to bottom)
└────────────────────────────────────────────────────────────────────────────┘

                        [SCROLL DOWN STARTS HERE]

┌────────────────────────────────────────────────────────────────────────────┐

│         new text-->    We Fix Broken Code
                     Fast. Documented. Traceable  
                                                                              │
│   🛠️ Rescue Systems         🔒 Security Hardening                          │
│                                                                            │
│             ⚙️ Automation Boost                                            │ <- DynamicExpansion.jsx
│                                                                            │    (Cards in 2-1-2-1 grid)
│   📝 Documentation Engine    🔄 Recovery Systems                            │    (Fades in on scroll)
│                                                                            │
│                  ✅ LEGIT Compliance      

           new text>   From Chaos to Clarity.
        Seamless AI-powered workflows, fully traceable, LEGIT certified.
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                         Code Operations                                    │ <- Services.jsx
│                                                                            │    (Services cards with
│   [Card 1: Code Rescue]    [Card 2: Security Fix]                          │     details about each
│                                                                            │     service)
└────────────────────────────────────────────────────────────────────────────┘

                       [LogoStrip fades out here]

┌────────────────────────────────────────────────────────────────────────────┐
│                           Mission Metrics                                  │
│                                                                            │ <- Metrics.jsx
│   [22+ AI Tiles]  [100% Test Pass]  [100% CLI Logs]  [Every Mission]       │    (Key performance
│    [Shipped]        [Rate]           [Delivered]       [Documented]        │     indicators)
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                             Mission Logs                                   │
│                                                                            │ <- CaseStudies.jsx
│   [Case Study 1: CLI Parser Repair]    [Case Study 2: Security Config]     │    (Real-world examples)
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                           Mission Feedback                                 │
│                                                                            │ <- Testimonials.jsx
│   [Testimonial 1: Alex R.]             [Testimonial 2: Maya T.]            │    (Client testimonials)
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────┐
│                       © 2024 CuriousLabs                                   │ <- Footer
└────────────────────────────────────────────────────────────────────────────┘

                           BACKGROUND ELEMENTS
                           ==================
┌────────────────────────────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────────────────────────┐   │
│ │                        Deep Purple Gradient                          │   │
│ │                                                                      │   │
│ │    ┌────────┐           ┌───────────┐         ┌────────────┐        │   │
│ │    │Gradient│           │ Chaotic   │         │ Transition │        │   │ <- SVG Patterns:
│ │    │ Blob   │           │ Code SVG  │         │ Code SVG   │        │   │    - chaotic-code.svg
│ │    └────────┘           └───────────┘         └────────────┘        │   │    - legit-code.svg
│ │                                                                      │   │    - transition-code-pattern.svg
│ │                                       ┌────────────┐                 │   │
│ │                                       │   LEGIT    │                 │   │
│ │                                       │ Code SVG   │                 │   │
│ └──────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘

KEY SCROLL BEHAVIORS:
---------------------
1. LogoStrip is fixed at bottom of viewport from page load
2. LogoStrip fades out when user scrolls to Metrics section
3. DynamicExpansion cards fade in as user scrolls down from Hero
4. Remaining sections (Metrics, Case Studies, Testimonials) fade in sequentially

COMPONENT STRUCTURE:
-------------------
- NavBar.jsx: Navigation bar fixed at top
- Hero.jsx: Main hero section with CTAs
- LogoStrip.jsx: Scrolling logo banner fixed at bottom
- DynamicExpansion.jsx: Card grid with 2-1-2-1 layout
- Services.jsx: Detailed service descriptions
- Metrics.jsx: Key performance metrics
- CaseStudies.jsx: Real-world case examples
- Testimonials.jsx: Client testimonials
- ScrollReveal.jsx: Animation wrapper for sections

Z-INDEX HIERARCHY:
-----------------
- Background: z-0
- Main content: z-10, z-20
- LogoStrip: z-30
- Later sections: z-40
- NavBar: z-50



===================================================================================================================

Here’s the **functional and text-based** ASCII map of the site, showing how the **functions**, **content sections**, and **texts** are distributed across the page, from top to bottom:

---

```
────────────────────────────────────────────────────────────────────────
🚀 CURIOUSLABS SITE FUNCTIONAL & TEXT MAP 🚀
────────────────────────────────────────────────────────────────────────

1. **NAVBAR** (Sticky)
------------------------------------------------------------
| CuriousLabs | Home | Services | Case Studies | Metrics | About | Contact |
------------------------------------------------------------
- **Function**: Navigation links with hover effects
- **Text**: Logo and links for primary site sections
- **Behavior**: Fixed at the top, stays visible during scroll
- **Animation**: Subtle transitions for active states and hover

2. **HERO SECTION**
------------------------------------------------------------
| ✨ Fix your broken code. ✨                              |
| Fast. Documented. Traceable.                           |
| [Send First Mission] [View Case Studies]               |
------------------------------------------------------------
- **Function**: Hero title with call-to-action buttons
- **Text**: 
  - Main heading: "Fix your broken code"
  - Subheading: "Fast. Documented. Traceable."
  - Button 1: "Send First Mission"
  - Button 2: "View Case Studies"
- **Behavior**: Visible at the top, draws user attention with a call to action
- **Animation**: Subtle background gradient, text highlight transition (Broken Code)

3. **DYNAMICEXPANSION SECTION** (Code Operations)
------------------------------------------------------------
| Code Operations                                        |
| [Rescue Systems] [Security Hardening] [Automation Boost] |
| [Documentation Engine] [Recovery Systems] [LEGIT Compliance] |
------------------------------------------------------------
- **Function**: Series of dynamically revealed content boxes
- **Text**: 
  - "Rescue Systems"
  - "Security Hardening"
  - "Automation Boost"
  - "Documentation Engine"
  - "Recovery Systems"
  - "LEGIT Compliance"
- **Behavior**: Revealed on scroll based on thresholds
- **Animation**: Boxes transition in with smooth fade and movement

4. **SERVICES SECTION**
------------------------------------------------------------
| [Service 1] [Service 2] [Service 3]                     |
------------------------------------------------------------
- **Function**: Service offerings in a section with brief descriptions
- **Text**: 
  - "Service 1" (Brief description)
  - "Service 2" (Brief description)
  - "Service 3" (Brief description)
- **Behavior**: Revealed on scroll with smooth fade-in effect

5. **METRICS SECTION**
------------------------------------------------------------
| 22+ AI Tiles | 100% Test Pass Rate | 100% CLI Logs Delivered |
------------------------------------------------------------
- **Function**: Display of metrics and stats
- **Text**:
  - "22+ AI Tiles"
  - "100% Test Pass Rate"
  - "100% CLI Logs Delivered"
- **Behavior**: Fades in as the user scrolls to this section
- **Animation**: Simple fade-in for text-based stats

6. **CASE STUDIES SECTION**
------------------------------------------------------------
| [Case Study 1] [Case Study 2] [Case Study 3]           |
------------------------------------------------------------
- **Function**: Showcase of case studies
- **Text**:
  - "Case Study 1" (Brief description)
  - "Case Study 2" (Brief description)
  - "Case Study 3" (Brief description)
- **Behavior**: Revealed smoothly on scroll
- **Animation**: Fade-in with slight delay per case study

7. **TESTIMONIALS SECTION**
------------------------------------------------------------
| "CuriousLabs saved us weeks of debugging"              |
| "The trace logs alone are worth it"                    |
------------------------------------------------------------
- **Function**: Display of customer feedback and testimonials
- **Text**:
  - "CuriousLabs saved us weeks of debugging"
  - "The trace logs alone are worth it"
- **Behavior**: Fade-in from bottom, one testimonial at a time
- **Animation**: Each testimonial appears with a slight delay

8. **FOOTER**
------------------------------------------------------------
| © {Year} CuriousLabs. All rights reserved.              |
------------------------------------------------------------
- **Function**: Footer with copyright information
- **Text**: 
  - "© {Year} CuriousLabs. All rights reserved."
- **Behavior**: Simple, static footer that stays at the bottom of the page
- **Animation**: None (Static)

────────────────────────────────────────────────────────────────────────
🧠 **Key Insights**
- **Main Structure**: Navbar at the top, Hero section followed by DynamicExpansion, then Services, Metrics, Case Studies, Testimonials, and Footer.
- **Content Display**: Text and services are presented in sequence, each revealed based on scroll progress.
- **Text Styling**: Refined headings, buttons, and descriptions for clarity and professional appeal.

🎯 **Next Steps:**
- Test across different devices to ensure scroll and animations work smoothly
- Review content visibility thresholds and refine if needed

```

---

This map provides an overview of all the **functions** and **texts** currently visible on the site as it progresses, step-by-step. It outlines the layout, user interactions, animations, and text, ensuring everything is in line with your expectations.

Would you like to move forward with adjustments based on this map, or do you need further refinements in specific areas?