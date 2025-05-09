import { useState, useEffect } from 'react';

/**
 * Hook to determine which scenes should be visible/mounted based on scroll position
 * Unmounts scenes more than 300vh from current viewport (with 50vh buffer)
 * 
 * @param {Array} scenes - Array of scene objects with range properties
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @param {number} validSceneIndex - Index of currently active scene
 * @return {Array} Array of scene keys that should be mounted/rendered
 */
export function useSceneVisibility(scenes, scrollProgress, validSceneIndex) {
  const [visibleScenes, setVisibleScenes] = useState([]);
  
  useEffect(() => {
    // Get the current scene's key
    const currentSceneKey = scenes[validSceneIndex]?.key || '';
    
    // Calculate which scenes are close enough to be mounted
    const mountedScenes = scenes.filter((scene, index) => {
      // Always include the current scene
      if (index === validSceneIndex) return true;
      
      // Calculate center point of the scene's range as percentage
      const sceneCenter = (scene.range[0] + scene.range[1]) / 2;
      
      // Calculate distance from current scroll as viewport heights
      const distanceInVh = Math.abs(sceneCenter - scrollProgress) * 700;
      
      // Include scenes within 300vh (with 50vh buffer for smoother transitions)
      return distanceInVh < 350;
    });
    
    // Extract the keys of scenes to mount
    const scenesToMount = mountedScenes.map(scene => scene.key);
    
    // Update the visibleScenes state
    setVisibleScenes(scenesToMount);
    
    // Log mounted scenes in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Mounted scenes:', scenesToMount.join(', '));
    }
  }, [scenes, scrollProgress, validSceneIndex]);
  
  return visibleScenes;
} 