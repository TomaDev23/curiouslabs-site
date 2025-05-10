
I'll plan a more precise redesign for each component to optimize the layout:

## Performance Metrics HUD
The current issues:
- Covering main menu buttons and too tall/narrow
- Inefficient use of horizontal space

**Redesign Approach:**
- **Width/Height**: Increase width to ~400px, reduce height by ~30%
- **Layout**: Convert to a 2-column grid layout instead of vertical stacking
- **Chart**: Make the FPS history chart wider and less tall
- **Stats Arrangement**: 
  - Left column: FPS, Memory, System stats
  - Right column: GPU stats, Render stats
  - Use horizontal bars for usage meters instead of vertical

## Camera Info HUD
The current issues:
- Too simplified and missing valuable information
- Not using available screen real estate effectively

**Redesign Approach:**
- **Width/Height**: Increase to ~300px width
- **Features to restore/add**:
  - Bring back the 3D axis visualization (more compact)
  - Add camera movement controls with mini-joystick interface
  - Include both compact numeric representation and visual feedback
  - Add camera presets (top view, side view, etc.)
  - Show FOV visualization
  - Add screenshot capability

## Main Menu
The current issues:
- Too much vertical space
- Design could be more intuitive and efficient

**Redesign Approach:**
- **Height reduction**: Reduce by ~30%
- **Layout changes**:
  - Use tabbed interface with icons+text
  - Consolidate related controls
  - Add collapsible sections
  - Consider a horizontal flow for most-used actions
  - Add toggle buttons rather than menu selection for frequently used options
- **Visual design**:
  - More subtle background with gradient
  - Better use of space with grid layout
  - Clearer visual hierarchy

## Implementation Strategy
1. First, redesign the Performance Metrics HUD to be wider and shorter
2. Then enhance the Camera Info HUD with more functionality
3. Finally, optimize the main menu design

Would you like me to start implementing these changes, beginning with the Performance Metrics HUD layout?
