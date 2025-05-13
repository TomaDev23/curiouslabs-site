
# Parallax Effect Fix Plan

After analyzing the documentation, I can see we have an existing `useParallaxMotion` hook that needs fixing rather than completely rewriting. The issue stems from DOM structure and z-index layering problems that affect scroll event processing.

## Phase 1: Fix the useParallaxMotion Hook

1. **Enhance Error Handling**:
   ```jsx
   // Add try/catch for getBoundingClientRect()
   try {
     rect = elementRef.current.getBoundingClientRect();
   } catch (err) {
     console.warn('Error getting element rect', err);
     rect = lastSuccessfulRect.current || { top: 0, height: 0 };
   }
   ```

2. **Add Scroll Event Throttling**:
   ```jsx
   // Current implementation likely causes jank
   // Replace with RAF-based throttling
   let ticking = false;
   const handleScroll = () => {
     if (ticking) return;
     ticking = true;
     requestAnimationFrame(() => {
       // calculate parallax
       ticking = false;
     });
   };
   ```

3. **Add Position Caching**:
   ```jsx
   // Cache last successful measurement
   const lastSuccessfulRect = useRef(null);
   // Update when successful
   lastSuccessfulRect.current = { ...rect };
   ```

## Phase 2: Fix AtomicPageFrame DOM Structure

1. **Remove Unnecessary Wrapper Divs**:
   ```jsx
   // Instead of:
   <div className="relative w-full text-white" ref={ref}>
     <div className="fixed inset-0 z-0">
       <CosmicJourneyController />
     </div>
     {/* other elements */}
   </div>
   
   // Use:
   <div className="w-full text-white" ref={ref} data-legit-root="atomic-page-frame">
     <CosmicJourneyController />
     {/* other elements with proper z-index */}
   </div>
   ```

2. **Ensure Proper Z-index Values**:
   ```jsx
   // Based on contract_control_layers.md
   <CosmicJourneyController /> {/* z-0 to z-9 */}
   <div className="z-[10]" data-legit-layer="content">
     <ContentLayer /> {/* z-10 to z-50 */}
   </div>
   <div className="z-[60]" data-legit-layer="ui-control">
     {showAdminPanel && <AdminPanel />} {/* z-60 to z-90 */}
   </div>
   <div className="z-[110]" data-legit-layer="navigation">
     <NavBar /> {/* z-110 to z-119 */}
   </div>
   ```

## Phase 3: Add Performance Optimizations

1. **Add will-change and backface-visibility**:
   ```jsx
   setStyle({
     transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
     transition: `transform 0.2s ${easing}`,
     willChange: 'transform',
     backfaceVisibility: 'hidden'
   });
   ```

2. **Use passive event listeners**:
   ```jsx
   window.addEventListener('scroll', handleScroll, { passive: true });
   ```

## Phase 4: Add Debug Mode

1. **Add debug visualization**:
   ```jsx
   // Add to useParallaxMotion
   const [debugInfo, setDebugInfo] = useState(null);
   
   // Set debug info in calculation
   if (debug) {
     setDebugInfo({
       rect,
       distanceFromCenter,
       normalizedDistance,
       translateX,
       translateY
     });
   }
   
   // Return with debug info
   return {
     style,
     ref: elementRef,
     debug: debugInfo
   };
   ```

2. **Add visual debug component**:
   ```jsx
   // In component using parallax
   {parallax.debug && (
     <div className="fixed top-0 left-0 bg-black bg-opacity-70 text-white p-2 z-[1000]">
       <pre>{JSON.stringify(parallax.debug, null, 2)}</pre>
     </div>
   )}
   ```

## Implementation Steps

1. Update `useParallaxMotion` hook first
2. Fix `AtomicPageFrame` DOM structure and z-index
3. Add debug mode to one component (OptimizedHeroPortal)
4. Test scroll performance and parallax effect
5. Apply fixes to all components using parallax

This approach preserves the existing implementation while adding critical optimizations and fixes that address the root causes of the frozen parallax effect.
