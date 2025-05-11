
# Revised HUD Hub Implementation Plan

## 1. LEGIT Compliance Foundation
Before writing any code, I'll ensure full alignment with LEGIT standards:

- **Metadata Structure**: Each component will include proper metadata:
  ```js
  export const metadata = {
    id: 'hud_hub',  // Unique identifier
    scs: 'SCS-DEBUG',  // System category
    type: 'utility',  // Component classification
    doc: 'contract_hud_hub.md'  // Associated contract document
  }
  ```

- **Component Placement**: All components will be placed in `src/components/ui/` directory

- **Documentation**: Each component will have proper JSDoc comments

## 2. Step-by-Step Implementation (No Deviations)

### Step 1: Create DraggableHOC (Higher-Order Component)
```jsx
// src/components/ui/DraggableHOC.jsx
// Will wrap any component to make it draggable
// Will store position in localStorage with component-specific key
// Will handle boundary constraints to keep components visible
```

**Key Features:**
- Position persistence in localStorage
- Edge detection to prevent dragging off-screen
- Visual indication during dragging
- LEGIT metadata compliance

### Step 2: Create HUD Context Provider
```jsx
// src/components/ui/HUDHub.jsx (provider section)
// Will manage visibility state for all HUDs
// Will provide context for any HUD to check if it should be visible
```

**Implementation Details:**
- Create React context for HUD visibility state
- Provide toggleHUD function for toggling individual HUDs
- Provide toggleAll function for global toggles
- Store visibility state in localStorage

### Step 3: Create The Cube UI Component
```jsx
// src/components/ui/HUDHub.jsx (cube component)
// 3×3 grid of colored buttons exactly as specified
```

**Cube UI Specifications:**
- Collapsed state: Shows only the 3×3 grid of buttons
- Each button color-coded to match the associated HUD
- Button opacity indicates visibility status (100% visible, 30% hidden)
- Expanded state: Shows additional controls and labels
- Precise Tailwind styling to match existing aesthetic

### Step 4: HUD Integration (Existing HUDs)
For each of the 5 existing HUDs:

1. **ScrollDebugOverlay (HUD 1, Red)**
   ```jsx
   // Modify to check HUD context for visibility
   // Connect to draggable HOC
   // Keep all existing functionality intact
   ```

2. **SceneDebug (HUD 2, Green)**
   ```jsx
   // Similar modifications for visibility and draggable functionality
   ```

3. **FPSMeter (HUD 3, Purple)**
   ```jsx
   // Modify with minimal changes to preserve functionality
   ```

4. **VHMarkers (HUD 4, Orange)**
   ```jsx
   // Create wrapper if needed to integrate with HUD system
   ```

5. **DevControls (HUD 5, Red/Blue)**
   ```jsx
   // Ensure admin toggles continue to function
   ```

### Step 5: Integration Testing (No Assumptions)
After each component modification:
- Verify the HUD still functions exactly as before
- Confirm the HUD visibility toggle works properly
- Validate draggable functionality
- Ensure position is saved correctly

## 3. Technical Specifications (Precise Requirements)

### HUD Hub Cube Component
- **Size**: Small, unobtrusive but clearly visible (exact dimensions defined in Tailwind)
- **Position**: Initially positioned at the top left corner
- **Appearance**: Clean, minimal design with 3×3 grid of buttons
- **Button Colors**: Match the associated HUD colors for clear visual association
- **Interactivity**: Click to expand/collapse, buttons toggle HUD visibility

### Context Provider Design
- **Storage**: localStorage for persistence
- **State Management**: React context to avoid prop drilling
- **Interface**: Simple API with toggleHUD, toggleAll, resetPositions functions

### DraggableHOC Requirements
- **Boundary Detection**: Prevent dragging HUDs off-screen
- **Visual Feedback**: Subtle shadow or border change during drag
- **Header**: Each draggable component will have a consistent "handle" area
- **Position Persistence**: Store x/y coordinates in localStorage

## 4. Implementation Workflow (Step-by-Step, No Skipping)

1. Create and test DraggableHOC in isolation
2. Create HUD context provider and test with a mock component
3. Build HUD Hub cube UI with toggle functionality
4. Update existing HUDs one at a time with visibility checks and draggable capability
5. Integrate HUD Hub into application
6. Verify all HUDs function correctly with the hub controls

I'll proceed only after confirming each step is working correctly, with no assumptions or skipping ahead. Each component will be fully LEGIT-compliant and will keep all existing functionality intact.
