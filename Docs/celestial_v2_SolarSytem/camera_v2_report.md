I'll perform a thorough reconnaissance of the solar system camera control system.

## 🛰️ TILE-CAMERA.RECON Results

### 🧠 Camera Mode Registry

| Mode      | Status                | Implementation Location        | Notes                                                    |
|-----------|----------------------|--------------------------------|----------------------------------------------------------|
| Overview  | ✅ Working           | CameraController.jsx           | Default mode, positions camera at a fixed overview position |
| Orbit     | ⚠️ Partially Working | CameraController.jsx           | Positions camera relative to target but doesn't continuously orbit |
| Cinematic | 🚫 Broken            | CameraInfoHUD.jsx (presets)    | Only exists as a preset in HUD but not a full camera mode |
| Presets   | ⚠️ Partially Working | CameraInfoHUD.jsx             | Includes default, top, side, and cinematic views |

### 🧭 Layer Architecture Diagram

```
[USER INPUT]
    │
    ▼
┌───────────────┐    ┌────────────────────┐    ┌─────────────────┐
│ Planet-Sandbox│    │   CameraInfoHUD    │    │ CameraController│
│   .jsx        │◄───┤      .jsx          │    │    .jsx         │
│               │    │                    │    │                 │
│ - viewMode    │    │ - cameraMode       │    │ - useFrame()    │
│ - zoomTarget  │───►│ - targetObject     │    │ - calculates    │
│ - cameraMode  │    │ - cameraSettings   │    │   positions     │
│ - targetObject│◄───┤ - UI controls      │    │ - handles       │
│ - cameraSettings    │ - position controls│    │   transitions   │
└───────┬───────┘    └────────────────────┘    └────────┬────────┘
        │                                                │
        │           ┌────────────────────┐               │
        └──────────►│   Three.js Scene   │◄──────────────┘
                    │                    │
                    │ - camera object    │
                    │ - rendering        │
                    └────────────────────┘
```

### ⚠️ Issue List for TILE-CAMERA.3

1. **Missing True Orbit Functionality**:
   - CameraController calculates static positions, not continuous orbital movement
   - Orbital angle is fixed (only using tilt parameter)

2. **Unused Camera Position and Target State**:
   - `cameraPosition` and `cameraTarget` are maintained but never used
   - Old props (`isActive`, `onCameraPositionChange`, etc.) are passed to CameraInfoHUD but not used

3. **HUD/Controller Sync Issues**:
   - FOV is set independently in both components
   - Zoom targets and target objects are disconnected systems

4. **Missing Component Organization**:
   - No CameraModeSwitcher.jsx exists, functionality is embedded in planet-sandbox.jsx
   - Overlapping responsibilities between components

5. **Conflicting Controls**:
   - OrbitControls are present in single planet view but removed from solar system view
   - CameraController adds its own OrbitControls instance inside solar system view

6. **PowerShell Syntax Issue**:
   - Commands with `&` ampersand don't work (needs `;` instead)

### 📎 Annotated Code Map

#### planet-sandbox.jsx
- **Lines 21-22**: CameraController import 
- **Lines 75-85**: planetPositions defined globally
- **Lines 448-474**: Camera state variables defined:
  - `cameraPosition`, `cameraTarget`, `cameraFOV` (legacy, unused)
  - `cameraMode`, `targetObject`, `cameraSettings` (active)
- **Lines 585-615**: handlePlanetClick - sets orbit mode and target
- **Lines 635-654**: toggleCameraHUD - syncs camera state
- **Lines 640-652**: handleCameraModeChange - sets mode and default target
- **Lines 653-661**: handleTargetObjectChange - updates target and mode
- **Lines 663-671**: handleCameraSettingsChange - updates settings and FOV
- **Lines 692-703**: CameraController inclusion in Canvas
- **Lines 748-760**: CameraInfoHUD props passing

#### CameraController.jsx
- **Lines 7-12**: Component props definition
- **Lines 21-45**: useFrame hook for camera positioning
- **Lines 48-51**: FOV update effect
- **Lines 53-60**: OrbitControls implementation

#### CameraInfoHUD.jsx
- **Lines 14-38**: Component props with unused legacy props
- **Lines 51-70**: Mode and target change handlers with auto-mode switching
- **Lines 107-117**: Preset application function
- **Lines 177-454**: UI tabs for position, target, advanced, and presets

## Key Findings

1. The camera system is in a transitional state - legacy position/target state exists alongside the new mode-based system.

2. The "orbit" mode doesn't truly orbit - it places the camera at a fixed position relative to the target.

3. The FOV is updated independently in both components, which could lead to synchronization issues.

4. Several presets exist in the HUD but don't have corresponding modes in the controller.

5. No continuous orbital movement is implemented - only static positioning.

6. The code structure shows a transition from an older camera system to a newer one, with overlap between them.
