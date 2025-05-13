import React, { useState, useEffect } from 'react';
import { CelestialContext } from './CelestialContext';
import useSceneTypeFromScroll from './hooks/useSceneTypeFromScroll';

export const metadata = {
  id: 'celestial_controller',
  scs: 'SCS-SCENE-CONTROL-001',
  type: 'controller',
  doc: 'LEGIT_contract_sceneTypeController.md'
};

export default function CelestialController({
  celestialBodies = [], // Array of planetary components
  currentScene = 'auto', // 'auto' for scroll-based or specific scene name
  useParallaxStyle = '3d'
}) {
  const [performanceMode, setPerformanceMode] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState(useParallaxStyle);
  const [sceneType, setSceneType] = useState(currentScene === 'auto' ? 'dormant' : currentScene);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  console.log('[DEBUG] CelestialController - celestialBodies:', celestialBodies);
  console.log('[DEBUG] CelestialController - currentScene:', currentScene);
  console.log('[DEBUG] CelestialController - parallaxStyle:', useParallaxStyle);
  
  // Update scene type based on prop if not auto
  useEffect(() => {
    if (currentScene !== 'auto') {
      setSceneType(currentScene);
    }
  }, [currentScene]);
  
  useEffect(() => {
    setParallaxStyle(useParallaxStyle);
  }, [useParallaxStyle]);

  // Add scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      setScrollProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Use the hook to determine scene type from scroll progress
  const autoSceneType = useSceneTypeFromScroll(scrollProgress);
  
  // Update scene type if using auto mode
  useEffect(() => {
    if (currentScene === 'auto' && autoSceneType !== sceneType) {
      setSceneType(autoSceneType);
      console.log(`[DEBUG] Scene changed to: ${autoSceneType} at scroll progress: ${scrollProgress}`);
    }
  }, [autoSceneType, currentScene, sceneType, scrollProgress]);

  // Make sure to preserve 'combined' style for components that need it
  const getEffectiveParallaxStyle = (componentStyle) => {
    // If the component has a specific style of 'combined', keep it
    if (componentStyle === 'combined') {
      return 'combined';
    }
    // Otherwise use the controller's style
    return parallaxStyle;
  };

  const contextValue = {
    performanceMode,
    parallaxStyle,
    sceneType,
    scrollProgress,
    setParallaxStyle,
    setPerformanceMode,
    setSceneType
  };
  
  return (
    <CelestialContext.Provider value={contextValue}>
      <div className="celestial-system absolute inset-0 overflow-hidden z-10 pointer-events-none">
        {celestialBodies.map((body, index) => {
          console.log(`[DEBUG] Rendering celestial body: ${body.id || index}`);
          return (
            <body.component 
              key={body.id || index}
              parallaxStyle={getEffectiveParallaxStyle(body.props?.parallaxStyle)}
              sceneType={sceneType}
              {...body.props} 
            />
          );
        })}
      </div>
    </CelestialContext.Provider>
  );
} 