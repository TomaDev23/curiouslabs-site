# V6 ATOMIC HUD System Guide

## Overview

The V6 ATOMIC HUD System is a developer tool designed to assist with the layout, visualization, and debugging of the V6 home page. It provides a non-invasive overlay that allows developers to:

1. View and control section visibility
2. Track scroll progress and scene phases
3. Visualize section boundaries
4. Toggle different debugging views
5. Save and reset section positions
6. Track implementation progress via the Mission Tracker

The system is only available in development mode and has no impact on production builds.

## Components

The V6 ATOMIC HUD System consists of the following components:

### Core Components

- **V6HUDSystem** (`V6HUDSystem.jsx`): Main container that manages all HUD components
- **V6HUDHub** (`V6HUDHub.jsx`): Central control panel for toggling different HUDs
- **DraggableHOC** (`DraggableHOC.jsx`): Higher-order component that makes elements draggable

### HUD Components

- **SectionControlPanel** (Placeholder): Displays and controls section visibility and positions
- **ScrollDebugV6** (Placeholder): Shows scroll progress and related information
- **SectionBoundaryDebug** (Placeholder): Visualizes section boundaries
- **MissionTrackerHUD** (`MissionTrackerHUD.jsx`): Displays implementation progress of V6 components

## Usage

### Accessing the HUD

1. The HUD is only available in development mode.
2. Press `Ctrl+Alt+H` to toggle the HUD Hub.
3. Use the numbered buttons in the HUD Hub to toggle specific HUDs.

### HUD Hub Controls

- **Toggle All**: Shows/hides all HUD components
- **Reset Positions**: Resets all HUD components to their default positions

### Section Control

The Section Control panel allows you to:
- View all sections defined in the V6 home page
- Toggle section visibility
- View section positions (measured in vh)

### Technical Implementation

The V6 ATOMIC HUD System is designed to be non-invasive and isolated from the main application:

1. All HUD components are wrapped in error boundaries to prevent affecting the main application.
2. HUD state is stored in localStorage with unique v6 prefixes to avoid collisions.
3. The system only renders in development mode using `process.env.NODE_ENV` checks.
4. HUD components use a high z-index to ensure they appear above all other elements.

## Storage Keys

The system uses the following localStorage keys:

- `v6_hud_visibility`: Tracks which HUDs are visible
- `v6_section_visibility`: Tracks which sections are hidden
- `v6_{component}_position`: Stores position information for draggable components
- `v6_mission_progress`: Stores mission completion status
- `v6_task_progress`: Stores task completion status

## Integration with v6_home.jsx

The V6 home page integrates the HUD system through:

1. Defining section data with IDs, names, and positions
2. Tracking scroll progress with a requestAnimationFrame-based handler
3. Conditionally rendering sections based on HUD visibility settings
4. Including the V6HUDSystem component at the end of the layout

```jsx
// Example: Section definitions
const V6_SECTIONS = [
  { id: 'hero', name: 'Hero Section', component: HeroSequenceV6, position: 0 },
  // ...more sections
];

// Example: Section visibility check
const isSectionVisible = (sectionId) => {
  if (process.env.NODE_ENV !== 'development') return true;
  return !hiddenSections.includes(sectionId);
};

// Example: Conditional rendering
{isSectionVisible('hero') && <HeroSequenceV6 />}

// Example: HUD System integration
<V6HUDSystem 
  sections={V6_SECTIONS}
  scrollProgress={scrollProgress}
/>
```

## Future Enhancements

Planned enhancements for the V6 ATOMIC HUD System include:

1. **Full Section Control Panel**: Allow drag-and-drop positioning of sections
2. **Enhanced Scroll Debug**: Detailed scroll metrics with visual indicators
3. **Section Boundary Visualization**: Visual overlays for section boundaries
4. **Performance Monitoring**: FPS counter and performance metrics
5. **Console Integration**: API for controlling HUDs via browser console

## Development Guidelines

When extending the V6 ATOMIC HUD System:

1. Maintain isolation from production builds
2. Keep all HUD components draggable and toggleable
3. Use error boundaries for all new components
4. Follow the naming convention with `V6` prefix
5. Store state in localStorage with the `v6_` prefix
6. Optimize for performance to avoid affecting main application

## Keyboard Shortcuts

- `Ctrl+Alt+H`: Toggle HUD Hub
- More shortcuts to be added for specific HUDs

## Troubleshooting

If you encounter issues with the HUD system:

1. **Reset Positions**: Use the "Reset Positions" button in the HUD Hub
2. **Clear localStorage**: Run `localStorage.clear()` in the browser console
3. **Refresh the page**: Hard refresh with `Ctrl+F5`
4. **Check console**: Look for error messages in the browser console 