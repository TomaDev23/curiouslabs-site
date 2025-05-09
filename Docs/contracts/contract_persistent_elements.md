# 🔄 PersistentElements Contract - CuriousLabs (v1.0)

📍 Path: `src/components/journey/PersistentElements.jsx`  
🔒 Status: **ACTIVE**

## 📚 Purpose
PersistentElements provides visual continuity across scene transitions in the cosmic journey. It renders elements that persist across multiple scenes to ensure smooth, cinematic visual transitions that span scene boundaries.

## 🧩 Component Structure

### Props
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| scrollProgress | Number (0-1) | Yes | 0 | Current scroll progress as a decimal percentage |

### Z-Index Positioning
Positioned at z-20, it sits between:
- Scenes (z-0/z-1)
- Constellations (z-30)

### Rendered Elements

#### 1. Nebula Trail
- **Purpose**: Provides visual continuity across CosmicReveal and CosmicFlightScene
- **Visibility Range**: 13% - 82% scroll (91vh - 574vh)
- **Opacity Management**:
  - Fades in: 13% - 18% (91vh - 126vh)
  - Full opacity: 18% - 75% (126vh - 525vh)
  - Fades out: 75% - 82% (525vh - 574vh)
- **Visual Effect**: Subtle purple nebula glow using radial gradient
- **Blend Mode**: mix-blend-screen for ethereal glow effect

#### 2. Motion Lines
- **Purpose**: Enhances the sense of movement during CosmicFlightScene
- **Visibility Range**: 28% - 82% scroll (196vh - 574vh)
- **Opacity Management**:
  - Fades in: 28% - 35% (196vh - 245vh)
  - Full opacity: 35% - 75% (245vh - 525vh)
  - Fades out: 75% - 82% (525vh - 574vh)
- **Visual Effect**: Vertical lines that create the illusion of motion
- **Animation**: Linear movement for continuous visual feedback

#### 3. Color Overlay
- **Purpose**: Provides global color transitions that span scene boundaries
- **Visibility Range**: 0% - 100% (always visible)
- **Color Transitions**:
  - 0% - 30%: Deep blue (DormantScene, AwakeningScene, early CosmicRevealScene)
  - 30% - 60%: Gradual shift to cosmic purple (CosmicFlightScene)
  - 60% - 85%: Transition to warm orange/yellow (late CosmicFlightScene, SunApproachScene)
  - 85% - 100%: Bright yellow/white (SunLandingScene)
- **Blend Mode**: mix-blend-overlay for subtle color integration with scene elements

## 🧮 Visual Element Timeline

```
Scroll %:  |------|------|------|------|------|------|------|------|------|------|
           0%     10%    20%    30%    40%    50%    60%    70%    80%    90%    100%
Scenes:    |Dormant|--Awakening--|---CosmicReveal---|-------CosmicFlight-------|SunAp|Land|
          
NebulaTrail:       |fadeIn-|----------------------------|fadeOut|
MotionLines:              |fadeIn-|-------------------|fadeOut|
Color:     |--Deep Blue---|--Cosmic Purple--|--Warm Orange--|Yellow/White|
```

## 🧠 Implementation Notes

### Performance Considerations
- Uses `useMemo` to prevent unnecessary recalculations
- Conditionally renders elements based on visibility range
- Minimal DOM elements to reduce overhead

### Visual Integration
- Uses mix-blend-mode to integrate with existing scene elements
- Subtle opacity values to enhance without overwhelming
- Smooth transitions with easing functions

### Browser Compatibility
- Works with modern browsers supporting CSS blend modes
- No external dependencies or images required

## 🔄 Integration with CosmicJourneyController
This component should be mounted inside CosmicJourneyController but outside the scene unmounting logic, ensuring these elements remain rendered regardless of which scenes are currently mounted. 