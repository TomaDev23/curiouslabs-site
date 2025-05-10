
# GlobalParticleSystem Implementation Plan

## 1. Star Field Implementation
- **Core mechanics**: Create persistent stars that span entire journey (0-550vh)
- **Integration points**:
  - Use existing star shader from CosmicRevealBackdrop_ThreeJS
  - Implement varying density based on scene (sparse in dormant, dense in cosmic sections)
  - Use galaxy coordinates for stars that allows coherent motion across scroll positions
- **Technical approach**:
  - Implement 3D star field with 2000-3000 particles
  - Control opacity/size with scroll position
  - Use time-based twinkle effect from existing shader
  - Implement star clustering in cosmic regions (0.3-0.8 scroll range)

## 2. Galaxy Spiral Effect
- **Core mechanics**: Create spiral galaxy visual during cosmic reveal and flight
- **Integration points**:
  - Port spiral galaxy from CosmicRevealBackdrop_ThreeJS
  - Make galaxy form gradually during cosmicReveal scene
  - Maintain full visibility during cosmicFlight scene
  - Add rotation/motion that responds to scroll progress
- **Technical approach**:
  - Use existing spiral arm logic with 15000 particles
  - Create center galaxy core with glow texture
  - Implement gradual formation by scaling size/opacity based on scene progress
  - Use motion equations tied to global scroll position

## 3. Scene-Specific Effects
- **Core mechanics**: Add unique particle effects for each scene
- **Integration points**:
  - Create scene-specific particle systems that activate at appropriate scroll ranges
  - Ensure smooth transitions between scenes
- **Technical approach**:
  - **Dormant**: Minimal ambient particles with slow motion
  - **Awakening**: Energy wisps forming with increasing intensity
  - **CosmicReveal**: Galaxy formation particles with convergent motion
  - **CosmicFlight**: Speed lines and motion blur particles
  - **SunApproach**: Heat distortion and approaching sun corona particles
  - **SunLanding**: Bright flares and landing effects

## 4. Performance Optimization
- **Core mechanics**: Ensure smooth performance even with high particle counts
- **Integration points**:
  - Implement efficient rendering techniques
  - Add visibility controls based on scene
- **Technical approach**:
  - Use instanced rendering for stars (THREE.InstancedBufferGeometry)
  - Implement frustum culling to only render visible particles
  - Add dynamic LOD (Level of Detail) based on scroll speed
  - Implement throttling for mobile devices
  - Use shader-based animation instead of JavaScript when possible

Ready to start implementing the star field (step 1) when you give the word.
