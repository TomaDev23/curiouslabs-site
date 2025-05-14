

# Implementation Plan for Mars Sphere 3D Component

## 1. Project Context
Based on the `plan_v10.0.md` document, we need to create a standalone `MarsSphere.jsx` component that renders a 3D Mars planet using Three.js with texture and bump maps. This will be integrated into the `/dev/mars-test` route.

## 2. LEGIT Compliance Requirements
Per the LEGIT contract documentation, the component must include:
- Proper metadata block with id, scs tag, type, and doc reference
- Full type definitions for props
- Proper error handling
- Mobile responsiveness
- Documentation reference

## 3. Implementation Steps

### Step 1: Create MarsSphere Component
1. Create a new file: `src/components/journey/celestial/bodies/MarsSphere.jsx`
2. Implement using `@react-three/fiber` and `TextureLoader`
3. Add proper LEGIT metadata block
4. Use the texture maps from:
   - `/public/assets/images/planets/mars_surface.jpg`
   - `/public/assets/images/planets/mars_bump.jpg`

### Step 2: Update Mars Test Page
1. Modify `/dev/mars-test.jsx` to:
   - Keep the existing background structure
   - Replace the current Mars with MarsSphere
   - Set up proper Three.js canvas with lighting
   - Maintain scene transitions

### Step 3: Testing and Validation
1. Verify textures load correctly
2. Confirm bump mapping works
3. Test scene transitions
4. Validate mobile responsiveness

## 4. Component Structure

```jsx
// MarsSphere.jsx
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export const metadata = {
  id: 'mars_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md'
};

export default function MarsSphere({ position = [0, 0, 0], radius = 1 }) {
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/mars_surface.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/mars_bump.jpg');

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={surfaceMap}
        bumpMap={bumpMap}
        bumpScale={0.03}
      />
    </mesh>
  );
}
```

## 5. Mars Test Page Updates

The existing `/dev/mars-test` page will be updated to:
1. Import the Canvas component from @react-three/fiber
2. Set up proper lighting (ambient and point lights)
3. Add the MarsSphere component to the Canvas
4. Keep the existing scene transition logic
5. Add orbit controls for interactive viewing

## 6. Completion Criteria
- MarsSphere.jsx created and working
- Uses both texture maps correctly
- Renders cleanly inside Canvas
- LEGIT metadata block added
- Visual inspection confirms proper appearance
- Ready for contract doc creation

Would you like me to proceed with this implementation plan?


---

## 🧱 CURSOR MISSION BLOCK: `TILE-COSMIC.MARS-SPHERE`

**Codename:** `mars-texture-demo`
**Goal:** Render a 3D Mars sphere using `three.js` with both surface + bump texture maps from public assets.

---

````md
# 🧱 TILE-COSMIC.MARS-SPHERE — Mars Texture Demo

## 🎯 Objective
Create a standalone `MarsSphere.jsx` component that renders a 3D Mars planet using `three.js`, mapped with both color and bump textures.

---

## 📁 Files

- `src/components/journey/celestial/bodies/MarsSphere.jsx` (🆕)
- Textures (already in place):
  - `/public/assets/images/planets/mars_surface.jpg`
  - `/public/assets/images/planets/mars_bump.jpg`

---

## 🧩 Task 1: Build `MarsSphere.jsx`

Create a component using `@react-three/fiber` and `TextureLoader`:

```jsx
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function MarsSphere({ position = [0, 0, 0], radius = 1 }) {
  const surfaceMap = useLoader(TextureLoader, '/assets/images/planets/mars_surface.jpg');
  const bumpMap = useLoader(TextureLoader, '/assets/images/planets/mars_bump.jpg');

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={surfaceMap}
        bumpMap={bumpMap}
        bumpScale={0.03}
      />
    </mesh>
  );
}
````

✅ Add `metadata` block for LEGIT compliance:

```js
export const metadata = {
  id: 'mars_sphere_3d',
  scs: 'SCS-BODY-SPHERE',
  type: 'three-mesh',
  doc: 'LEGIT_contract_planetTextureMap.md' // to be created
};
```

---

## 🧩 Task 2: Create Test Route (Optional)

If you don’t already have a canvas test route, create `/dev/mars-sphere-test.jsx`:

```jsx
<Canvas>
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
  <MarsSphere position={[0, 0, 0]} radius={1.8} />
</Canvas>
```

Add any necessary Three.js setup (camera, orbit controls if needed).

✅ Confirm that Mars renders, texture loads, bump map applies

---

## ✅ Completion Criteria

* [ ] `MarsSphere.jsx` created
* [ ] Uses both `mars_surface.jpg` and `mars_bump.jpg`
* [ ] Renders cleanly inside a `<Canvas>`
* [ ] LEGIT `metadata` block added
* [ ] Visual inspection confirms texture + lighting
* [ ] Ready for contract doc creation once visually validated

```

---

⚠️ **Do not begin the LEGIT contract file until you confirm the visual is stable and rendering correctly.**

Say the word once Cursor completes this — and we’ll lock in the next TILE: integration into the full celestial map or HUD overlay system.

Your Mars is about to go orbital 🌕✨
```
