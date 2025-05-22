I'll examine the v6_atomic.jsx page to map out its structure and components for contracts.

Read file: src/pages/v6_atomic.jsx

Ran tool

Read file: Docs/home_v6/atomic/ProductScrollAtomic_contract.md

Read file: Docs/home_v6/atomic/ServicesOrbitalAtomic_contract.md

Read file: Docs/home_v6/atomic/MissionAtomic_contract.md

Read file: Docs/home_v6/atomic/ProcessLegacyAtomic_contract.md

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
