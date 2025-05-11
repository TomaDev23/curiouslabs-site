# ✅ CuriousLabs HUDs Rules Contract — v1.0

📍 Location: src/Docs/contracts/contract_huds_rules.md  
🧱 Purpose: Define requirements and standards for HUD components across the CuriousLabs platform
🔒 Status: **LEGIT CERTIFIED**

---

## 🧩 1. HUD System Overview

The CuriousLabs platform implements a comprehensive Heads-Up Display (HUD) system for development, debugging, and visualization purposes. All HUDs must adhere to strict standards for implementation, management, and integration to ensure consistency, reliability, and proper layering within the application.

### 1.1 HUD Component Categories

| Category | Purpose | Example Components |
|----------|---------|-------------------|
| Standard Debug HUDs | Core debugging capabilities | PerformanceMetricsHUD, CameraInfoHUD, WebGLPipelineHUD, SceneGraphHUD, ShaderInspectorHUD |
| Mini HUDs | Compact, focused utilities | FPSMiniHUD, GPUTempHUD, MemoryUsageHUD, AudioSpectrumHUD |
| Visualization HUDs | Data visualization tools | HistogramHUD, SystemStatusHUD |
| Advanced DEV HUDs | Complex development tools | ShaderLabHUD, ConsoleLoggerHUD, ParticleDesignerHUD, ComponentInspectorHUD, RenderingProfilerHUD, ParticleVisualizerHUD, MaterialInspectorHUD, ScrollPositionHUD, RouteNavigatorHUD, TimelineAnimationHUD, NetworkMonitorHUD |

### 1.2 LEGIT HUD Requirements

A component qualifies as a LEGIT HUD only if it meets all of the following requirements:

- ✅ Uses the DraggableHUD base component for consistent behavior
- ✅ Provides proper LEGIT metadata (id, scs, type, doc)
- ✅ Is registered with the HUDManager for centralized control
- ✅ Respects z-index layering as defined in the Control Layers Contract
- ✅ Handles its own state management and persistence
- ✅ Implements proper resize and viewport adaptation
- ✅ Provides clear visual distinction from content elements
- ✅ Includes toggle, minimize, and close functionality
- ✅ Does not interfere with critical application functionality
- ✅ Uses consistent UI styling with other HUDs

---

## 🏗️ 2. HUD Implementation Standards

### 2.1 Base Structure and Inheritance

All HUDs must extend from the DraggableHUD base component:

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import DraggableHUD from '../ui/DraggableHUD';

// LEGIT metadata block - Required!
export const metadata = {
  id: 'example_hud',
  scs: 'SCS-DEBUG-HUD',
  type: 'development',
  doc: 'contract_example_hud.md'
};

// Standard HUD component structure
function ExampleHUD({ initialPosition, onPositionChange, onClose }) {
  // HUD-specific state and logic
  
  return (
    <DraggableHUD
      title="Example HUD"
      initialPosition={initialPosition}
      onPositionChange={onPositionChange}
      onClose={onClose}
    >
      {/* HUD-specific content */}
    </DraggableHUD>
  );
}

// Required prop types for all HUDs
ExampleHUD.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  onPositionChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ExampleHUD;
```

### 2.2 HUD Component File Structure

Every HUD must follow this organization pattern:

1. **Imports**
   - React, PropTypes, and DraggableHUD are required
   - Additional imports for specific functionality

2. **LEGIT Metadata Block**
   - Must include id, scs, type, and doc properties
   - Must be exported as `metadata`

3. **Internal Subcomponents**
   - Organization-specific components should be defined before the main component

4. **Main HUD Component**
   - Must accept and handle standard props (initialPosition, onPositionChange, onClose)
   - Must implement appropriate state management
   - Must return content wrapped in DraggableHUD

5. **PropTypes and Export**
   - Must define PropTypes for all props
   - Must export the component as default

### 2.3 HUD Design Standards

1. **Visual Design**
   - Dark theme with accented elements
   - Consistent use of monospace fonts for data display
   - Clear visual hierarchy with headers and sections
   - Semi-transparent backgrounds (rgba colors)
   - Minimal, clean interface with purposeful spacing

2. **Interaction Design**
   - Draggable header for repositioning
   - Close button in header
   - Optional minimize button
   - Clear interactive elements with hover states
   - Tabbed interfaces for complex content

3. **Responsive Design**
   - Respect viewport boundaries
   - Adjustable sizing where appropriate
   - Maintain usability at various viewport sizes
   - Fallback display for critical information

---

## 🎮 3. HUD Management System

### 3.1 HUD Registration and Integration

To integrate a new HUD into the system:

1. **Create the HUD Component**
   - Follow the implementation standards above
   - Place in `src/components/cosmic-explorer/huds/`

2. **Register with HUDManager**
   - Add import to HUDManager.jsx
   - Define default position in DEFAULT_POSITIONS object
   - Add entry to appropriate HUDs array (DEBUG_MODE_HUDS or DEV_MODE_HUDS)
   - Add rendering logic to the main component return

3. **Register with HUDSelector**
   - Add entry to DEFAULT_DEBUG_HUDS or DEFAULT_DEV_HUDS array
   - Include icon, name, description, and availability status

### 3.2 HUD Manager Component Structure

The HUDManager component serves as the central controller for all HUDs and is responsible for:

1. **State Management**
   - Tracking which HUDs are active
   - Maintaining position data for all HUDs
   - Persisting HUD positions to localStorage

2. **Input Handling**
   - Keyboard shortcuts for toggling HUDs
   - Position update events from individual HUDs

3. **Rendering**
   - Conditionally rendering active HUDs
   - Passing appropriate props to each HUD

### 3.3 HUD Selector Component Structure

The HUDSelector component provides the user interface for HUD management:

1. **HUD Listing**
   - Categorized display of available HUDs
   - Search and filter capabilities
   - Visual indication of active HUDs

2. **User Controls**
   - Toggle controls for individual HUDs
   - Show/hide all buttons
   - Mode-specific settings

---

## 📋 4. HUD Inventory and Specifications

### 4.1 Standard Debug HUDs

#### PerformanceMetricsHUD
- **Purpose**: Monitor application performance metrics
- **Key Features**: FPS counter, memory usage, render stats
- **Default Position**: Top right
- **Tab Structure**: Overview, Memory, Rendering, System

#### CameraInfoHUD
- **Purpose**: Display and modify camera parameters
- **Key Features**: Position, rotation, FOV controls
- **Default Position**: Top left
- **Tab Structure**: Transform, Projection, Animation

#### WebGLPipelineHUD
- **Purpose**: Visualize WebGL rendering pipeline
- **Key Features**: Pipeline stages, buffer info, state inspection
- **Default Position**: Bottom right
- **Tab Structure**: Pipeline, Buffers, State, Extensions

#### SceneGraphHUD
- **Purpose**: Navigate and inspect scene hierarchy
- **Key Features**: Tree view, object selection, transform editing
- **Default Position**: Right center
- **Tab Structure**: Hierarchy, Properties, Statistics

#### ShaderInspectorHUD
- **Purpose**: Inspect and debug shaders
- **Key Features**: Shader listing, code view, compilation info
- **Default Position**: Bottom center
- **Tab Structure**: Programs, Vertex, Fragment, Uniforms

### 4.2 Mini HUDs

#### FPSMiniHUD
- **Purpose**: Compact FPS display
- **Key Features**: Current FPS, warning states
- **Default Position**: Top right corner
- **Variant**: Expanded view with history graph

#### GPUTempHUD
- **Purpose**: Monitor GPU temperature and usage
- **Key Features**: Temperature reading, utilization percentage
- **Default Position**: Top right below FPS
- **Variant**: Expanded view with historical data

#### MemoryUsageHUD
- **Purpose**: Track memory consumption
- **Key Features**: RAM usage, VRAM usage when available
- **Default Position**: Top right below GPU
- **Variant**: Expanded view with allocation breakdown

#### AudioSpectrumHUD
- **Purpose**: Visualize audio output
- **Key Features**: Frequency spectrum, volume level
- **Default Position**: Bottom right corner
- **Variant**: Expanded view with channel separation

### 4.3 Visualization HUDs

#### HistogramHUD
- **Purpose**: Visualize data distributions
- **Key Features**: Multiple visualization modes, data source selection
- **Default Position**: Center right
- **Tab Structure**: Histogram, Line, Heat Map, Settings

#### SystemStatusHUD
- **Purpose**: Monitor system component health
- **Key Features**: Hierarchical view, status indicators, metrics
- **Default Position**: Center left
- **Tab Structure**: Overview, Components, Metrics, Logs

### 4.4 Advanced DEV HUDs

#### MaterialInspectorHUD
- **Purpose**: View and edit material properties
- **Key Features**: Material selection, property editing, texture preview
- **Default Position**: Right center
- **Tab Structure**: Properties, Textures, Preview

#### TimelineAnimationHUD
- **Purpose**: Edit and control animations
- **Key Features**: Timeline editor, keyframe manipulation, playback controls
- **Default Position**: Bottom center
- **Tab Structure**: Timeline, Tracks, Properties, Preview

#### NetworkMonitorHUD
- **Purpose**: Monitor API calls and network performance
- **Key Features**: Request listing, timing information, response inspection
- **Default Position**: Bottom left
- **Tab Structure**: Requests, WebSockets, Analysis

#### RenderingProfilerHUD
- **Purpose**: Advanced rendering performance analysis
- **Key Features**: Frame timing, GPU profiling, bottleneck identification
- **Default Position**: Center right
- **Tab Structure**: Overview, Timeline, Statistics, Recommendations

---

## 🔧 5. HUD Integration with Application

### 5.1 Mode-Based Activation

HUDs are activated based on application mode:

1. **DEBUG Mode**
   - Available in development and testing environments
   - Focused on performance monitoring and basic debugging
   - Accessible through the HUDSelector

2. **DEV Mode**
   - Available only in development environment
   - Full suite of development and debugging tools
   - Advanced features for detailed system inspection

### 5.2 Performance Considerations

1. **Rendering Efficiency**
   - HUDs should use efficient rendering techniques
   - High-frequency updates should be throttled
   - Complex visualizations should use canvas or WebGL
   - Components should implement shouldComponentUpdate or React.memo

2. **Memory Management**
   - Clear all listeners on component unmount
   - Properly manage subscriptions to data sources
   - Avoid memory leaks in long-running operations
   - Implement proper cleanup for WebGL and canvas contexts

3. **Data Flow**
   - Use mock data for development and testing
   - Implement data providers for production use
   - Separate data collection from visualization
   - Buffer high-frequency updates

---

## ✅ 6. HUD Compliance Verification

### 6.1 Compliance Checklist

Each HUD must be verified against these requirements:

| Requirement | Verification Method |
|-------------|---------------------|
| LEGIT Metadata | File inspection |
| DraggableHUD Base | Component inspection |
| Position Persistence | Drag and refresh test |
| Z-index Compliance | Layer visual inspection |
| Responsive Design | Multi-viewport testing |
| Proper Close Handling | Runtime testing |
| State Management | Component inspection |
| Performance Impact | Profiling during use |

### 6.2 HUD Verification Status

| HUD Category | Status | Verification Date |
|--------------|--------|------------------|
| Standard Debug HUDs | 🟢 VERIFIED | [Date] |
| Mini HUDs | 🟢 VERIFIED | [Date] |
| Visualization HUDs | 🟢 VERIFIED | [Date] |
| Advanced DEV HUDs | 🟢 VERIFIED | [Date] |

### 6.3 Known Issues and Resolutions

| Issue ID | Description | Status | Resolution |
|----------|------------|--------|------------|
| HUD-001 | Position persistence fails on some HUDs | 🟢 RESOLVED | Updated localStorage key format |
| HUD-002 | Z-index conflicts with navigation | 🟢 RESOLVED | Updated layer boundaries per Control Layers Contract |
| HUD-003 | Performance impact of multiple active HUDs | 🟡 IN PROGRESS | Implementing throttling and optimized rendering |

---

## 🔄 7. HUD System Extensions

### 7.1 Adding New HUD Categories

To extend the HUD system with new categories:

1. **Define Category Standards**
   - Purpose and scope
   - Design specifications
   - Integration requirements

2. **Update HUDSelector**
   - Add new category section
   - Update filtering logic

3. **Update HUDManager**
   - Create new HUD array for the category
   - Update rendering logic

4. **Document in this Contract**
   - Add category to Section 1.1
   - Add specifications to Section 4
   - Update compliance verification

### 7.2 Custom HUD Development

Third-party developers can create custom HUDs by:

1. **Following Implementation Standards**
   - Use LEGIT component structure
   - Extend DraggableHUD
   - Follow design guidelines

2. **Registering with System**
   - Add to appropriate arrays in HUDManager and HUDSelector
   - Define default position
   - Provide icon and description

3. **Documentation**
   - Create documentation in the contracts folder
   - Reference in component metadata

---

## 🔐 Certification

This contract is now LEGIT certified and considered the canonical reference for HUD development and management across the CuriousLabs platform.

Last updated: [Current Date]
Verified by: CuriousLabs System Architecture Team 