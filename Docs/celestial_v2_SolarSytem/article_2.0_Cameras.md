# Camera Controls & Behavior Analysis in Planet Sandbox

## Single Planet View Camera System

### Camera Setup
- Initial position: `[0, 0, 3]` with field of view (FOV): `50`
- Camera positioned to view a single centered planet with proper framing
- No explicit camera target, defaults to scene origin (0,0,0) where the planet is positioned

### Control Modes
The single planet view offers two distinct camera control modes:

#### 1. Orbit Controls Mode (When `orbitEnabled === true`)
- Implemented using `OrbitControls` from `@react-three/drei`
- **User Interaction:**
  - Drag to rotate camera around the planet
  - Scroll to zoom in/out
  - Automatic rotation when `autoRotate === true`
- **Configuration:**
  - `enablePan={false}` - Prevents camera panning (keeps planet centered)
  - `autoRotateSpeed={0.5}` - Slow, gentle rotation speed when auto-rotate is enabled
- **Behavior:**
  - Camera always maintains the planet at its center point
  - Rotation occurs around the planet rather than moving the camera independently
  - Distance to planet can be adjusted with scroll/pinch gestures

#### 2. Fixed Rotation Mode (When `orbitEnabled === false`)
- Implemented via custom `RotatingCamera` component
- **Mechanism:**
  - Uses `useFrame` hook to apply continuous rotation
  - Rotation applied to a camera reference group
- **Code Pattern:**
  ```jsx
  function RotatingCamera({ isRotating }) {
    const cameraRef = useRef();
    
    useFrame(() => {
      if (isRotating && cameraRef.current) {
        cameraRef.current.rotation.y += 0.001;
      }
    });
    
    return <group ref={cameraRef} />;
  }
  ```
- **Behavior:**
  - Constant camera rotation around the Y-axis at a rate of 0.001 radians per frame
  - No user control - purely automatic animation
  - Fixed distance from planet with no zoom capability

### Transition Between Control Modes
- Toggled via checkbox UI control
- No transition animation between modes - switches instantly
- Control state preserved separately for each mode

## Solar System View Camera System

### Camera Setup
- Uses the same Canvas camera as single planet view
- More complex automation through custom movement logic

### Dynamic Camera Positioning System
- Fully automated positioning based on `zoomTarget` state
- Implemented using refs and the `useFrame` hook
- No direct user camera control (unlike single planet view)

### Position Calculation
- **Target Calculation:** (in `useEffect`)
  - When `zoomTarget === 'none'`:
    - Overview position at `[0, 10, 30]`
    - Looking at scene center `[0, 0, 0]`
  - When targeting a specific planet:
    - Camera positioned at an angle to the planet: `[planetX-2, planetY+2, planetZ+5]`
    - Looking directly at planet position: `[planetX, planetY, planetZ]`

### Smooth Camera Movement
- Uses Vector3 lerp (linear interpolation) for smooth transitions
- **Implementation Pattern:**
  ```jsx
  useFrame(() => {
    // Smoothly move camera to target position
    currentPositionRef.current.lerp(targetRef.current, 0.05);
    camera.position.copy(currentPositionRef.current);
    
    // Smoothly transition look-at point
    currentLookAtRef.current.lerp(lookAtRef.current, 0.05);
    camera.lookAt(currentLookAtRef.current);
  });
  ```
- **Behavior:**
  - Camera moves at 5% of the distance to target per frame (0.05 lerp factor)
  - Both position and look-at point smoothly transition together
  - Results in a fluid, cinematic movement between planets

### Interaction Model
- Camera movement triggered by:
  1. Clicking directly on planets
  2. Clicking planet selection buttons in the UI
- No orbit controls, panning, or direct manipulation
- Return to overview via the "Overview" button

## Technical Implementation Details

### Reference Management
- Uses multiple THREE.Vector3 refs:
  - `targetRef` - Destination camera position
  - `currentPositionRef` - Current interpolated position
  - `lookAtRef` - Target look-at point
  - `currentLookAtRef` - Current interpolated look-at point

### Coordinate System
- All positions in Three.js world coordinates
- Planets positioned in a spread-out arrangement using the `planetPositions` object
- Earth at origin `[0, 0, 0]` with other planets at relative coordinates

### Performance Considerations
- Camera movement is frame-rate dependent due to `useFrame` hook
- Smooth on most devices but may vary with performance
- Lerp factor (0.05) balances smoothness with responsiveness

This dual camera system provides appropriate controls for each view mode - interactive manipulation for detailed planet inspection, and cinematic automated movement for exploring the solar system arrangement.
