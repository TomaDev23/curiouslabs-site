


Hello! I'll examine the v6_atomic page and list all the components imported to it.

Ran tool

Read file: src/pages/v6_atomic.jsx
Based on my examination of the `v6_atomic.jsx` page, here are all the components imported and used:

## Core Wrapper Components
1. **SceneControllerV6** - Main page controller from `../components/home/v6/SceneControllerV6`
2. **LayoutWrapper** - Layout structure handler from `../components/home/v6/LayoutWrapper`
3. **CosmicBackgroundSystemV6** - Background effects from `../components/home/v6/CosmicBackgroundSystemV6`
4. **NavBarCosmic** - Navigation bar from `../components/home/v6/NavBarCosmic`

## Atomic Components (Active)
5. **HeroAtomic** - Hero section from `../components/atomic/HeroAtomic`
6. **MissionAtomic** - Mission statement section from `../components/atomic/MissionAtomic`
7. **OurProducts_newV6** - Products section from `../components/atomic/OurProducts_newV6`
8. **ServicesOrbitalAtomic** - Services section from `../components/atomic/ServicesOrbitalAtomic`
9. **ProcessLegacyAtomic** - Process steps section from `../components/atomic/ProcessLegacyAtomic`
10. **ContactTerminalAtomic** - Contact section from `../components/atomic/ContactTerminalAtomic`

## Component Structure in the Page
The components are arranged in this order within the page:
1. `SceneControllerV6` (wrapper)
   - `LayoutWrapper` (wrapper)
     - `CosmicBackgroundSystemV6`
     - `NavBarCosmic`
     - `HeroAtomic`
     - `MissionAtomic`
     - `OurProducts_newV6`
     - `ServicesOrbitalAtomic`
     - `ProcessLegacyAtomic`
     - `ContactTerminalAtomic`

## Notes
- The page shows commented-out imports of the original V6 components that were replaced by atomic versions
- `ProductScrollAtomic` is commented out and replaced with `OurProducts_newV6`
- This is described as an "atomic rebuild" where each component is self-contained and independent

The page follows a clean atomic architecture where each main content component is responsible for its own rendering and state management.





Read file: Docs/home_v6/atomic/ContactTerminalAtomic_contract.md
Based on my analysis of v6_atomic.jsx and the component contracts, here's a comprehensive mapping of the page and its components:

# v6_atomic.jsx Page Structure & Component Mapping

## Page Overview
The v6_atomic.jsx page is an atomic rebuild of the CuriousLabs V6 homepage that uses self-contained atomic components instead of the original nested controllers and scene-based components. Each component is independently responsible for its own rendering, state management, and responsive behavior.

## Page Structure

### Core Wrapper Components
1. **SceneControllerV6** - Parent wrapper that manages overall page state
2. **LayoutWrapper** - Handles layout structure and spacing
3. **CosmicBackgroundSystemV6** - Provides the cosmic background effects
4. **NavBarCosmic** - Navigation bar component

### Main Content Components (Atomic)
The page contains six atomic components arranged in sequence:
1. **HeroAtomic** - Hero section (documentation not found)
2. **MissionAtomic** - Mission statement section
3. **ProductScrollAtomic** - Product showcase with horizontal scrolling
4. **ServicesOrbitalAtomic** - Services section with orbital design
5. **ProcessLegacyAtomic** - Process steps with orbital connections
6. **ContactTerminalAtomic** - Contact section with terminal interface

## Component Contract Details

### MissionAtomic
- **Purpose**: Displays the company's mission statement in an Eclipse-style layout
- **Visual**: Black circular element with mission statement and numbered mission points
- **Interaction**: Animated reveal on scroll with staggered animation
- **Self-Contained**: Includes all mission data internally, no props needed

### ProductScrollAtomic
- **Purpose**: Horizontal product carousel with snap scrolling
- **Visual**: Product cards with name, description, features, and CTA
- **Interaction**: Horizontal scroll with snap points, navigation dots
- **Self-Contained**: Internal product data array with 4 products (AEGIS Runtime, OpsPipe, MoonSignal, Guardian)

### ServicesOrbitalAtomic
- **Purpose**: Displays services in a cosmic orbital layout
- **Visual**: Central cosmic core, rotating orbital rings, service cards
- **Interaction**: Auto-rotating services, manual navigation, animated transitions
- **Self-Contained**: Internal services array with 4 services (AI Development, Product Launches, SaaS Platforms, Consulting)

### ProcessLegacyAtomic
- **Purpose**: Shows company process steps in a visually engaging manner
- **Visual**: Horizontal orbital layout on desktop, vertical stack on mobile
- **Interaction**: Hover effects on process cards
- **Self-Contained**: Internal process steps data with 4 steps (Discover, Create, Build, Launch)

### ContactTerminalAtomic
- **Purpose**: Combines contact info and form in a terminal-inspired interface
- **Visual**: Terminal window with typing animation, tabbed interface
- **Interaction**: Toggle between contact info and contact form modes
- **Self-Contained**: Internal form state management, typing animations

## LEGIT Compliance Across Components
All atomic components follow the LEGIT architectural principles:
1. **Self-Contained Design**: Each component manages its own data and state
2. **Responsive Behavior**: All components adapt to different screen sizes
3. **Animation Control**: All respect user's reduced motion preferences
4. **Accessibility**: All include proper ARIA attributes and keyboard navigation
5. **Documentation**: Each has a detailed contract markdown file

## Interrelationships & Flow
The components are arranged in a logical sequence that guides the user through:
1. **Introduction** (HeroAtomic)
2. **Purpose** (MissionAtomic)
3. **Products** (ProductScrollAtomic)
4. **Services** (ServicesOrbitalAtomic)
5. **Process** (ProcessLegacyAtomic)
6. **Contact** (ContactTerminalAtomic)

While each component is independent, they maintain visual consistency through similar cosmic theming, color schemes, and animation styles. The core wrapper components (SceneControllerV6, LayoutWrapper, CosmicBackgroundSystemV6) provide a unified context for these atomic components to exist within.
