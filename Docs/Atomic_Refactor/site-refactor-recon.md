# 🧠 V6 Site Architecture Reconnaissance Summary

## 📄 Page Entry and Structure
- Main page file: `src/pages/v6_home.jsx`
- Uses multiple wrapper components:
  - `SceneControllerV6` - Manages animation phases and device capabilities
  - `LayoutWrapper` - Provides basic layout structure and includes `MissionProvider`
  - `CosmicBackgroundSystemV6` - Manages background elements (starfield, grid, nebula)

## 🧩 Component Structure
The codebase follows a highly fragmented, multi-layered architecture:

### Main Page Sections (imported in v6_home.jsx):
1. `HeroSequenceV6`
2. `MissionStatementV6`
3. `HorizontalProductScrollV6`
4. `ServicesOrbital`
5. `ProcessCards`
6. `ContactTerminal`

### Key Control Components:
1. `SceneControllerV6` - Context provider for scene phases, device capabilities, and scroll position
2. `MissionTracker` - Tracks mission completion status (likely for development)
3. `V6HUDSystem` - Development-only HUD for section navigation

### Visual Components:
1. `CosmicBackgroundSystemV6` - Background layers management
2. `StarfieldCanvasV6` - Animated starfield
3. `GridOverlayV6` - Grid overlay effect
4. `PlanetVisualizationV6` - Planet visualization component

## 🔄 Data Flow and State Management
- Scene state managed by `SceneControllerV6` using React Context
- Product data hardcoded in `HorizontalProductScrollV6.jsx`
- `ProductSectionV6` renders individual product sections
- OpsPipe section uses `OpsBentoCluster` for display

## 🎨 Styling and Animation
- Tailwind CSS for styling with custom extended configurations
- Framer Motion for animations
- Custom animation keyframes defined in `tailwind.config.js`
- Complex z-index layering across multiple components

## ❌ Identified Issues
1. **Over-Fragmentation**: Components split across too many files
2. **Entangled Logic**: Layout, styling, and logic spread across different files
3. **Complex Nesting**: Deep component nesting makes tracing difficult
4. **Layered Wrappers**: Multiple wrapper components with overlapping responsibilities
5. **Scattered Animation Logic**: Animation logic spread across different files

## 🔍 Z-Index Layering
- Background elements: z-0 or not specified
- Main content: z-10
- UI elements and overlays: z-20+
- HUD system: highest z-index (50+)

## 🎯 Refactoring Strategy Recommendations
1. **Atomic Components**: Consolidate each major section into a single, self-contained file
2. **Simplified Wrappers**: Reduce wrapper hierarchy to a single Layout component
3. **Consolidated State**: Simplify state management and reduce context dependencies
4. **Co-located Styles**: Keep styles with their components
5. **Flattened Hierarchy**: Reduce component nesting depth

The current architecture has grown organically with a focus on separating concerns, but this has led to a highly entangled system where changes in one component can have unpredictable effects on others. A more atomic approach will make the system more maintainable and comprehensible. 