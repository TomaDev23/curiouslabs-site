# CuriousLabs Website - Agent Handover Documentation

## Project Overview
CuriousLabs website is a React-based corporate site built with Vite, React Router, and TailwindCSS. The site showcases the company's products and services with a focus on AI and CodeOps solutions.

## Key Documents & Guidelines
1. **DO_NOT_DEVIATE.md** (`Docs/Foundation/article_0.0_DO_NOT_DEVIATE.md`)
   - Contains absolute rules for project structure
   - Defines forbidden modifications
   - Lists sacred file/folder structures that cannot be changed
   - Mandatory asset management rules

2. **Site Map** (`Docs/Foundation/article_5.0_Site_Map_29.4.md`)
   - Defines overall site structure and navigation
   - Contains color palette requirements

3. **TILE Implementation Plans** 
   - TILE 3.0 (Solar Structure Lockdown) - Complete
   - TILE 4.0 (Homepage Rebuild) - Just completed
   - Each TILE represents a focused implementation sprint

## Sacred Project Structure
```
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── pages/            # Page components
│   ├── products/     # Product pages
│   ├── index.jsx     # Home page (just rebuilt)
│   ├── codelab.jsx
│   ├── blog.jsx
│   ├── about.jsx
│   ├── contact.jsx
│   └── docs.jsx
├── utils/            # Utility functions
│   └── assets.js     # Centralized asset paths (CRITICAL)
├── App.jsx           # Main app with all routes
├── index.css         # Global CSS 
└── main.jsx          # Entry point with BrowserRouter
```

## Critical Rules
1. **Asset Management**
   - All assets MUST be referenced from `src/utils/assets.js`
   - Never hardcode paths to images
   - All assets must be tracked in Git

2. **Tech Stack Constraints**
   - React for components
   - React Router for navigation
   - TailwindCSS ONLY for styling (no CSS modules, Styled Components, etc.)
   - No external component libraries allowed

3. **Component Organization**
   - Components must be exportable standalone modules
   - All styling must use Tailwind classes only
   - Must be responsive across all breakpoints

## Recent Implementation Details

### TILE 4.0 Components
1. **HeroMain**:
   - Uses asymmetric layout with branded text on left, visual on right
   - Contains gradient text effects and animated background elements
   - Uses the Tailwind animate-spin-slow/slower classes we added

2. **SolutionsPreview**:
   - Showcases 5 products with color-coded cards
   - Desktop uses 3+2 grid layout, mobile stacks vertically
   - Product data includes id, title, description, icon, color, and link

3. **FeedbackBlock**:
   - Uses IntersectionObserver for scroll animation effects
   - Testimonials have staggered animation timing
   - Contains hand-crafted testimonial data

4. **FooterMain**:
   - Contains social links, site navigation and product links
   - Has contact information for CuriousLabs
   - Dynamic current year in copyright

### Cross-Component Patterns
- Consistent gradient usage (from-purple-400 to-blue-400, etc.)
- Text size responsiveness (e.g., text-lg md:text-xl)
- Common spacing patterns (px-6 md:px-12 lg:px-24)
- Repeated shadowand glow patterns

## Development Environment
- Dev server: `npm run dev` (runs on http://localhost:5173/)
- To expose to network: `npm run dev -- --host`
- Project root: `/c%3A/website_build` (Windows)

## Important Tailwind Configuration
- Custom colors defined for curious-blue, curious-purple, curious-dark
- Custom animations for spin-slow, spin-slower, float, glow-text, etc.
- Background image paths for SVG patterns

## Recently Completed Work
1. Fixed SVG background paths in codelab.jsx to use IMAGES.SVG constants
2. Added a 404 page with proper routing in App.jsx
3. Created modular SolarSystem component
4. Improved mobile responsiveness across components
5. Completely rebuilt the homepage per TILE 4.0 plan

## Potential Future Work
Based on documentation patterns, future work may include:
1. Additional product pages enhancements
2. Animation improvements for interactive elements
3. Performance optimizations
4. Additional responsive behavior refinements

## Common Troubleshooting Notes
1. If SVG backgrounds don't appear, check that paths in assets.js are correct
2. For any new animations, ensure they're defined in tailwind.config.js
3. All routes must be registered in App.jsx to work properly
4. Mobile responsiveness should always be tested with dev tools

## Version/Environment
- React project with Vite v4.5.13
- Running on Windows 10

This document should provide sufficient context for another agent to continue working on the CuriousLabs website project while maintaining compliance with all established guidelines and restrictions.
