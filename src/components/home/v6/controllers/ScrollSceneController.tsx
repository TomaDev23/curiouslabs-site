/**
 * @component ScrollSceneController
 * @description Controls hero sequence with FSM phases: idle -> playing -> complete
 * First scroll triggers animation sequence, locks until complete
 * 
 * @metadata
 * @version 1.0.0
 * @legit true
 * @author CuriousLabs
 */

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useRef,
} from 'react';

// Types
type ScenePhase = 'idle' | 'playing' | 'complete';

interface ScrollSceneContextType {
  scenePhase: ScenePhase;
  hasTriggeredReveal: boolean;
}

// Create context with default values
const ScrollSceneContext = createContext<ScrollSceneContextType>({
  scenePhase: 'idle',
  hasTriggeredReveal: false
});

// Hook for using scroll scene context
export const useScrollScene = () => useContext(ScrollSceneContext);

interface Props {
  children: ReactNode;
}

export const ScrollSceneController: React.FC<Props> = ({
  children,
}) => {
  const [hasTriggeredReveal, setHasTriggeredReveal] = useState(false);
  const [scenePhase, setScenePhase] = useState<ScenePhase>('idle');
  const animationTimer = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<'up' | 'down'>('down');

  useEffect(() => {
    // Lock scroll initially
    document.body.style.overflow = 'hidden';

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();

      // Determine scroll direction
      scrollDirection.current = e.deltaY < 0 ? 'up' : 'down';

      if (scrollDirection.current === 'down' && scenePhase === 'idle' && !hasTriggeredReveal) {
        // First scroll down - trigger animation
        setHasTriggeredReveal(true);
        setScenePhase('playing');
        window.scrollTo(0, 0);

        // Clear any existing timer
        if (animationTimer.current !== null) {
          window.clearTimeout(animationTimer.current);
        }

        // After animations complete, update state
        animationTimer.current = window.setTimeout(() => {
          setScenePhase('complete');
          document.body.style.overflow = 'auto';
        }, 2400); // Total duration: planet (1.5s) + text (0.8s) + 0.1s buffer
      }
      
      // Handle scroll back
      else if (scrollDirection.current === 'up') {
        if (scenePhase === 'complete') {
          // If we're scrolled down, handle normal scroll behavior
          if (window.scrollY > 50) {
            return;
          }
          
          // Reset to playing state first
          setScenePhase('playing');
          document.body.style.overflow = 'hidden';
          
          // Clear any existing timer
          if (animationTimer.current !== null) {
            window.clearTimeout(animationTimer.current);
          }
          
          // After a short delay, reset to idle
          animationTimer.current = window.setTimeout(() => {
            setScenePhase('idle');
            setHasTriggeredReveal(false);
          }, 800);
        }
        else if (scenePhase === 'playing' && hasTriggeredReveal) {
          // Reset directly to idle state
          setScenePhase('idle');
          setHasTriggeredReveal(false);
          
          // Clear any existing timer
          if (animationTimer.current !== null) {
            window.clearTimeout(animationTimer.current);
          }
        }
      }
    };

    // Track scroll position
    const trackScrollPosition = () => {
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('scroll', trackScrollPosition);
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('scroll', trackScrollPosition);
      document.body.style.overflow = 'auto';
      
      // Clear any timers on unmount
      if (animationTimer.current !== null) {
        window.clearTimeout(animationTimer.current);
      }
    };
  }, [scenePhase, hasTriggeredReveal]);

  return (
    <ScrollSceneContext.Provider value={{ scenePhase, hasTriggeredReveal }}>
      <div className="relative">
        {children}
      </div>
    </ScrollSceneContext.Provider>
  );
};

export default ScrollSceneController; 