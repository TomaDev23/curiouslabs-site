import { useState, useEffect } from 'react';

/**
 * Custom hook to detect device capabilities
 * Provides information about mobile/tablet status, performance capabilities,
 * WebGL support, and reduced motion preference
 */
const useDeviceProfile = () => {
  const [profile, setProfile] = useState({
    isMobile: false,
    isTablet: false,
    isLowPerf: false,
    hasWebGL: true,
    prefersReducedMotion: false
  });

  useEffect(() => {
    const checkCapabilities = () => {
      // Check if mobile or tablet based on screen width
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      // Check for low performance indicators
      const isLowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      // Check for WebGL support
      let hasWebGL = true;
      try {
        const canvas = document.createElement('canvas');
        hasWebGL = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch (e) {
        hasWebGL = false;
      }

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setProfile({
        isMobile,
        isTablet,
        isLowPerf: isMobile || isTablet || isLowCPU || isMobileDevice,
        hasWebGL,
        prefersReducedMotion
      });
    };
    
    // Initial check
    checkCapabilities();
    
    // Set up event listeners for resize
    window.addEventListener('resize', checkCapabilities);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkCapabilities);
    };
  }, []);

  return profile;
};

export default useDeviceProfile; 