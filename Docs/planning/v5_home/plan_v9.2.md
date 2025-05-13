# Implementation Plan for TILE-COSMIC.2

Based on the TILE-COSMIC.2 mission block and our current state, here's my implementation plan:

## 1. Refactor useCelestialParallax Hook

**Current Issue:** The hook uses custom event listeners instead of CuriousLabs-native hooks.

**Action Plan:**
- Update `src/components/journey/celestial/hooks/useCelestialParallax.jsx` to use:
  - `useParallax(ref, speed)` for motion tied to scroll
  - `useScroll()` for access to scrollY and scrollProgress
  - Remove custom event listeners
- Ensure the hook returns proper position offset object: `{ x, y }`

```jsx
// Updated useCelestialParallax.jsx
import { useState, useEffect, useRef } from 'react';
import { useParallax } from '../../../hooks/useParallax'; // Verify path
import { useScroll } from '../../../hooks/useScroll'; // Verify path

export function useCelestialParallax(factor = 1, style = '3d', scene = 'dormant') {
  const ref = useRef(null);
  const { scrollY, scrollProgress } = useScroll();
  const parallaxEffect = useParallax(ref, factor);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Calculate position based on style and scene
    // (Implementation from existing code, but using parallaxEffect instead of custom listeners)
    
    // Different calculation based on style ('3d' vs 'dripping')
    // Different calculation based on scene
    
    setPosition({
      x: parallaxEffect.x,
      y: style === '3d' ? parallaxEffect.y + scrollY * factor : scrollY * factor * 0.8
    });
  }, [parallaxEffect, scrollY, factor, style, scene]);
  
  return { position, ref };
}
```

## 2. Mount Mars in the Test Route

**Action Plan:**
- Use the existing `/dev/combined-parallax-test` route
- Update the page to import and render Mars via CelestialController

```jsx
// Update combined-parallax-test.jsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CelestialController from '../../components/journey/celestial/CelestialController';
import Mars from '../../components/journey/celestial/bodies/Mars';

export default function CombinedParallaxTest() {
  const [currentScene, setCurrentScene] = useState('dormant');
  const [parallaxStyle, setParallaxStyle] = useState('dripping');
  
  // Define just Mars for initial testing
  const celestialBodies = [
    { id: 'mars', component: Mars, props: { position: { x: 30, y: 25 }, size: 70, parallaxFactor: 0.8 } }
  ];
  
  // Scene detection based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - windowHeight;
      
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;
      
      if (scrollProgress < 0.2) {
        setCurrentScene('dormant');
        setParallaxStyle('dripping');
      } else if (scrollProgress < 0.4) {
        setCurrentScene('awakening');
        setParallaxStyle('dripping');
      } else if (scrollProgress < 0.6) {
        setCurrentScene('cosmicReveal');
        setParallaxStyle('3d'); // Use 3D effect for cosmic reveal
      } else {
        setCurrentScene('cosmicFlight');
        setParallaxStyle('dripping');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-[400vh] relative">
      <Helmet>
        <title>Combined Parallax Test | Cosmic Journey</title>
      </Helmet>
      
      {/* Fixed background with z-0 */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-[#090014]">
        {/* Just Mars for now */}
        <CelestialController
          celestialBodies={celestialBodies}
          currentScene={currentScene}
          useParallaxStyle={currentScene === 'cosmicReveal' ? '3d' : parallaxStyle}
        />
      </div>
      
      {/* Content sections for scrolling */}
      <div className="relative z-10">
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Dormant Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Awakening Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Cosmic Reveal Scene</h1>
        </section>
        
        <section className="h-[100vh] flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Cosmic Flight Scene</h1>
        </section>
      </div>
      
      {/* Simple debug display */}
      <div className="fixed top-4 left-4 bg-black/50 text-white p-2 z-100 text-sm">
        <div>Scene: {currentScene}</div>
        <div>Effect: {parallaxStyle}</div>
        <button 
          onClick={() => setParallaxStyle(parallaxStyle === '3d' ? 'dripping' : '3d')}
          className="mt-2 px-2 py-1 bg-blue-500 text-xs rounded"
        >
          Toggle Effect
        </button>
      </div>
    </div>
  );
}
```

## 3. Validation Steps

After implementing the changes above, I'll perform the following validation:

1. **Console + Render Validation**:
   - Check for any errors in browser devtools
   - Verify Mars appears in the DOM
   - Confirm scroll/parallax movement is visible
   - Ensure LEGIT metadata renders safely

2. **Z-index Validation**:
   - Confirm Mars respects z-index rules (z-6 to z-9)
   - Verify no z-index conflicts with other elements

3. **Performance Check**:
   - Monitor for any scroll jank or performance issues
   - Verify smooth parallax effect

## 4. Completion Criteria

- [ ] Parallax hook updated to use core CuriousLabs scroll system
- [ ] Mars renders in `/dev/combined-parallax-test`
- [ ] No scroll/jank errors
- [ ] LEGIT metadata safe
- [ ] All z-index rules respected

This plan focuses solely on getting Mars working with the proper parallax effects before adding any additional planets, following the TILE-COSMIC.2 mission block.
