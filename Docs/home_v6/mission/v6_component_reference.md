# V6 Component Reference List

## Primary Content Sections (In Order of Appearance)

1. **Hero Section**: `HeroSequenceV6`
   - **Purpose**: Main landing view with animated planet and text reveal
   - **Components**: `PlanetRevealTrack`, `TextRevealBlock`
   - **Interactions**: Scroll-based animation sequence
   - **File Path**: `src/components/home/v6/HeroSequenceV6.jsx`

2. **Mission Statement**: `MissionStatementV6`
   - **Purpose**: Eclipse-style mission statement with numbered process points
   - **Components**: 
     - Eclipse Container with glow effects
     - Numbered mission points (01-03)
     - Decorative metadata and badges
   - **Visual Elements**:
     - Black eclipse sphere with a soft, atmospheric radial gradient edge, surrounded by diffuse white glow layers.
     - Layered nebula effects:
       - A large "Engulfing Nebula" extending from the bottom-left, with a whitish hue and subtle purple undertones.
       - A "Cosmic Shimmering Gradient Layer" providing subtle background colors (purples, blues, orange) with a gentle shimmer.
       - Additional translucent "Padding Nebulas" to enhance the cloud-like feel.
       - Localized smaller nebula effects for texture.
     - Monospace metadata text
     - New era badge with geometric icons
   - **Layout**:
     - Eclipse positioned bottom-left, appearing nestled within the extended nebula cloud.
     - Mission points in right column (45% margin)
     - Z-pattern content flow
   - **Interactions**: Animation sequences on scroll
   - **File Path**: `src/components/home/v6/MissionStatementV6.jsx`

3. **Product Showcase**: `HorizontalProductScrollV6`
   - **Purpose**: Horizontally scrolling product showcase with snap scrolling
   - **Components**: `ProductSectionV6`, `PlanetVisualizationV6`
   - **Interactions**: Horizontal scroll, product selection
   - **File Path**: `src/components/home/v6/HorizontalProductScrollV6.jsx`

4. **Services Section**: `ServicesOrbital`
   - **Purpose**: Services display with orbital visualization
   - **Components**: Service cards, orbital visualization
   - **Interactions**: Service selection
   - **File Path**: `src/components/home/v6/ServicesOrbital.jsx`

5. **Process Section**: `ProcessCards`
   - **Purpose**: Process/Approach section with numbered steps
   - **Components**: Process step cards, orbital connections
   - **Interactions**: Orbital path viewing
   - **File Path**: `src/components/home/v6/ProcessCards.jsx`

6. **Contact Section**: `ContactTerminal`
   - **Purpose**: Terminal-style contact form
   - **Components**: Form, cosmic sphere visualization
   - **Interactions**: Form submission
   - **File Path**: `src/components/home/v6/ContactTerminal.jsx`

## Supporting Components

7. **Navigation**: `NavBarCosmic`
   - **Purpose**: Main navigation bar
   - **File Path**: `src/components/home/v6/NavBarCosmic.jsx`

8. **Background System**: `CosmicBackgroundSystemV6`
   - **Purpose**: Combined background elements
   - **Components**: `StarfieldCanvasV6`, `GridOverlayV6`
   - **File Path**: `src/components/home/v6/CosmicBackgroundSystemV6.jsx`

9. **Layout Container**: `LayoutWrapper`
   - **Purpose**: Overall layout wrapper
   - **File Path**: `src/components/home/v6/LayoutWrapper.jsx`

10. **Scene Controller**: `SceneControllerV6`
    - **Purpose**: Manages animations and scene state
    - **File Path**: `src/components/home/v6/SceneControllerV6.jsx`

11. **Navigation Pills**: `PillNav`
    - **Purpose**: Pill-shaped section navigation
    - **File Path**: `src/components/home/v6/PillNav.jsx`

## Technical/Utility Components

12. **Mission Tracker**: `MissionTracker`
    - **Purpose**: Tracks implementation progress (dev mode)
    - **File Path**: `src/components/home/v6/MissionTracker.jsx`

13. **Planet Components**: `AegisPlanet3DV6`/`AegisPlanetV6`
    - **Purpose**: Planet visualization components
    - **File Paths**: 
      - `src/components/home/v6/AegisPlanet3DV6.jsx`
      - `src/components/home/v6/AegisPlanetV6.jsx`

## Component Relationships

- `v6_home.jsx` serves as the main container page, importing all components
- `SceneControllerV6` provides context for animations and scene phases
- `LayoutWrapper` handles overall page structure
- Each content section is self-contained but may access scene context

## Z-Pattern Layout

The components maintain a Z-pattern layout within their structures:

1. **Hero Section**: Header (top-left) → Planet (right) → Text (bottom-left)
2. **Product Showcase**: Text (left) → Visualization (right)
3. **Services Section**: Service cards (left) → Orbital visual (right)
4. **Process Section**: Steps in Z-formation across the screen
5. **Contact Section**: Form (left) → Terminal visualization (right)

*Note: All components are designed to be responsive, with mobile layouts typically stacking elements vertically.* 