/**
 * @hook useMoonLighting
 * @description Real-time moon phase lighting calculation for 3D moon component
 * @version 2.2.0 - Enhanced with visual anomalies support
 * @author CuriousLabs
 * @legit true - LEGIT protocol compliant
 */

import { useState, useEffect, useRef } from 'react';
import lune from 'lune';

// Enhanced lighting configurations for realistic moon phases
const MOON_PHASE_CONFIGS = {
  // 🌑 New Moon (0.0 - 0.07) - Nearly invisible but not completely dark
  newMoon: {
    sunPosition: [0, 0, -15],  // Sun directly behind moon
    intensity: 0.15,           // Increased from 0.05 - still dim but visible
    ambientIntensity: 0.05,    // Increased ambient for visibility
    sunGlowIntensity: 0.08,    // NEW: Very subtle sun glow behind for contrast
    description: 'New Moon'
  },
  
  // 🌒 Waxing Crescent (0.07 - 0.25) - Right side lit, enhanced brightness
  waxingCrescent: {
    sunPosition: [12, 2, -8],  // Sun from upper right
    intensity: 1.38,           // Increased by 15% (was 1.2)
    ambientIntensity: 0.08,    // Increased ambient
    warmYellow: true,          // NEW: More warm yellow tone
    description: 'Waxing Crescent'
  },
  
  // 🌓 First Quarter (0.25 - 0.32) - Half moon, right side
  firstQuarter: {
    sunPosition: [15, 0, 0],   // Sun directly from the right
    intensity: 1.32,           // Increased by 10% (was 1.2)
    ambientIntensity: 0.08,
    description: 'First Quarter'
  },
  
  // 🌔 Waxing Gibbous (0.32 - 0.48) - Mostly lit, small left shadow
  waxingGibbous: {
    sunPosition: [8, 3, 8],    // Sun from front-right
    intensity: 1.8,            // Keep current intensity
    ambientIntensity: 0.12,
    subtleYellow: true,        // NEW: Subtle yellow hue for balance
    description: 'Waxing Gibbous'
  },
  
  // 🌕 Full Moon (0.48 - 0.52) - Fully illuminated
  fullMoon: {
    sunPosition: [0, 2, 15],   // Sun directly in front
    intensity: 2.5,            // Maximum intensity
    ambientIntensity: 0.15,
    stabilizeFlicker: true,    // NEW: Fix flickering light
    description: 'Full Moon'
  },
  
  // 🌖 Waning Gibbous (0.52 - 0.68) - Mostly lit, small right shadow  
  waningGibbous: {
    sunPosition: [-8, 3, 8],   // Sun from front-left
    intensity: 1.8,            // High intensity - keep as is
    ambientIntensity: 0.12,
    description: 'Waning Gibbous'
  },
  
  // 🌗 Last Quarter (0.68 - 0.75) - Half moon, left side
  lastQuarter: {
    sunPosition: [-15, 0, 0],  // Sun directly from the left
    intensity: 1.32,           // Increased by 10% (was 1.2)
    ambientIntensity: 0.08,
    yellowWarmth: true,        // NEW: Start adding yellow warmth
    description: 'Last Quarter'
  },
  
  // 🌘 Waning Crescent (0.75 - 0.93) - Left side lit
  waningCrescent: {
    sunPosition: [-12, 2, -8], // Sun from upper left
    intensity: 1.32,           // Increased by 10% (was 1.2)
    ambientIntensity: 0.08,
    candleYellow: true,        // NEW: Candle-like yellow tone
    description: 'Waning Crescent'
  }
};

// 🎨 ENHANCEMENT: Atmospheric Color Temperature Mapping
// This is a separate layer that adds colors without modifying original lighting
const ATMOSPHERIC_COLORS = {
  newMoon: '#1a1a2f',         // Cold blue-purple - distant, void
  waxingCrescent: '#ffcc80',  // UPDATED: Warm yellow (was '#2f2a44')
  firstQuarter: '#4f4f80',    // Blue-gray - balanced
  waxingGibbous: '#ccaa66',   // UPDATED: Subtle yellow balance (was '#8888cc')
  fullMoon: '#fffbe6',        // Warm white-gold - alive, radiant
  waningGibbous: '#dddde2',   // Cool pale gray - settling
  lastQuarter: '#d4b366',     // UPDATED: Yellow warmth (was '#a0a0c0')
  waningCrescent: '#ffb347'   // UPDATED: Candle yellow (was '#3a324f')
};

// 🎬 ENHANCEMENT: Smooth Transition System
const TRANSITION_CONFIG = {
  duration: 1500,             // 1.5 seconds for smooth transitions
  easing: 'easeOutCubic',     // Natural easing curve
  colorBlendSteps: 60         // Smooth color interpolation steps
};

// 🌟 NEW: Visual Anomaly Configuration
const ANOMALY_CONFIGS = {
  // Supermoon - Larger, brighter appearance
  supermoon: {
    scale: 1.3,                  // More dramatic scale increase (was 1.15)
    glowIntensity: 2.5,          // Enhanced glow intensity (was 1.8)
    atmosphericBoost: 2.2,       // Brighter atmosphere (was 1.6)
    color: '#ffd280',            // Deep yellow-reddish glow
    zoomFactor: 1.4,             // Cinematic zoom effect
    zoomDuration: 1.8,           // Zoom animation duration in seconds
    zoomEasing: 'easeOutCubic'   // Smooth easing for zoom animation
  },
  
  // Eclipse - UPGRADED: Orange nebula background with moon silhouette
  eclipse: {
    shadowPosition: [0, 0, 15],  // Shadow cast from front
    shadowIntensity: 0.8,        // Higher intensity for nebula visibility
    rimGlow: 1.5,                // Strong rim highlight
    coronaGlow: 1.0,             // Good corona effect for atmospheric glow
    exitingPhase: true,          // Show nebula effect
    color: '#ff4500',            // Orange eclipse color
    // Enhanced eclipse properties for nebula effect
    mainIntensity: 0.2,          // Low main lighting for silhouette
    ambientIntensity: 0.05,      // Slightly more ambient for nebula
    coronaColor: '#ff8800',      // Orange corona color
    coronaOpacity: 0.8,          // Strong corona visibility
    atmosphericBoost: 2.5,       // Strong atmospheric effect
    mysticalGlow: true           // Enable mystical ambient effects
  },
  
  // Sci-Fi Mode - Stylized effect
  scifi: {
    pulseRate: 1.5,              // Grid pulse speed
    gridIntensity: 0.7,          // Grid visibility
    colorCycle: true,            // Rainbow gradient effect
    baseColor: '#80ffff'         // Base color for effect
  }
};

// Easing function for smooth animations
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

// Linear interpolation helper
const lerp = (start, end, factor) => start + (end - start) * factor;

// Color interpolation helper (hex to rgb and back)
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
};

const interpolateColor = (color1, color2, factor) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1;
  
  const r = lerp(rgb1.r, rgb2.r, factor);
  const g = lerp(rgb1.g, rgb2.g, factor);
  const b = lerp(rgb1.b, rgb2.b, factor);
  
  return rgbToHex(r, g, b);
};

// Fallback lighting configuration for error cases
const FALLBACK_LIGHTING = {
  ...MOON_PHASE_CONFIGS.fullMoon,
  phase: 0.5,
  phaseConfig: 'fullMoon'
};

export const useMoonLighting = (debugPhase = null, anomalyMode = null) => {
  const [lightingData, setLightingData] = useState(FALLBACK_LIGHTING);
  const [targetLightingData, setTargetLightingData] = useState(FALLBACK_LIGHTING);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeAnomalyMode, setActiveAnomalyMode] = useState(null);
  const [error, setError] = useState(null);
  const animationFrameRef = useRef(null);
  const transitionStartRef = useRef(null);
  const prevAnomalyMode = useRef(null);

  // Set active anomaly mode when prop changes
  useEffect(() => {
    setActiveAnomalyMode(anomalyMode);
    
    if (anomalyMode) {
      console.log(`🔮 ANOMALY MODE ACTIVATED: ${anomalyMode}`);
    }
  }, [anomalyMode]);

  const getPhaseConfig = (phase) => {
    if (phase <= 0.07) return 'newMoon';
    if (phase <= 0.25) return 'waxingCrescent';
    if (phase <= 0.32) return 'firstQuarter';
    if (phase <= 0.48) return 'waxingGibbous';
    if (phase <= 0.52) return 'fullMoon';
    if (phase <= 0.68) return 'waningGibbous';
    if (phase <= 0.75) return 'lastQuarter';
    if (phase <= 0.93) return 'waningCrescent';
    return 'newMoon'; // 0.93 - 1.0
  };

  // 🎬 Smooth transition animation function
  const animateTransition = (startData, endData, startTime) => {
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / TRANSITION_CONFIG.duration, 1);
      const easedProgress = easeOutCubic(progress);

      // Interpolate all lighting properties
      const interpolatedData = {
        sunPosition: [
          lerp(startData.sunPosition[0], endData.sunPosition[0], easedProgress),
          lerp(startData.sunPosition[1], endData.sunPosition[1], easedProgress),
          lerp(startData.sunPosition[2], endData.sunPosition[2], easedProgress)
        ],
        intensity: lerp(startData.intensity, endData.intensity, easedProgress),
        ambientIntensity: lerp(startData.ambientIntensity, endData.ambientIntensity, easedProgress),
        phase: lerp(startData.phase, endData.phase, easedProgress),
        phaseConfig: progress < 0.5 ? startData.phaseConfig : endData.phaseConfig,
        description: progress < 0.5 ? startData.description : endData.description,
        transitionFactor: easedProgress,
        // Include anomaly data if present
        anomalyMode: endData.anomalyMode || null,
        anomalyConfig: endData.anomalyConfig || null
      };

      setLightingData(interpolatedData);

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
      } else {
        setLightingData(endData);
        setIsTransitioning(false);
        // Log transition completion but only in development mode
        if (process.env.NODE_ENV === 'development') {
          console.log('🎬 Transition completed');
        }
      }
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    const calculateMoonLighting = () => {
      try {
        // Use debug phase if provided, otherwise get real moon phase
        let phase;
        if (debugPhase !== null) {
          phase = debugPhase;
        } else {
          const moonData = lune.phase(new Date());
          phase = moonData.phase;
        }
        
        // Get the appropriate phase configuration
        const phaseConfigKey = getPhaseConfig(phase);
        const phaseConfig = MOON_PHASE_CONFIGS[phaseConfigKey];
        
        // Start with the base lighting data
        let newLightingData = {
          ...phaseConfig,
          phase,
          phaseConfig: phaseConfigKey,
          transitionFactor: Math.sin(phase * Math.PI * 2) * 0.1
        };
        
        // Apply anomaly modifications if active
        if (activeAnomalyMode && ANOMALY_CONFIGS[activeAnomalyMode]) {
          const anomalyConfig = ANOMALY_CONFIGS[activeAnomalyMode];
          
          // Store anomaly info in lighting data
          newLightingData.anomalyMode = activeAnomalyMode;
          newLightingData.anomalyConfig = anomalyConfig;
          
          // Modify base lighting based on anomaly type
          if (activeAnomalyMode === 'supermoon') {
            newLightingData.intensity *= anomalyConfig.glowIntensity;
            newLightingData.ambientIntensity *= anomalyConfig.atmosphericBoost;
          } 
          else if (activeAnomalyMode === 'eclipse') {
            // Eclipse requires special handling in the rendering component
          }
          else if (activeAnomalyMode === 'scifi') {
            // Sci-fi mode is primarily handled in the rendering component
          }
        } else {
          // Ensure anomaly properties are cleared when no anomaly is active
          newLightingData.anomalyMode = null;
          newLightingData.anomalyConfig = null;
        }

        // Check if this is a significant change that needs smooth transition
        const currentPhaseConfig = lightingData.phaseConfig;
        const currentAnomalyMode = lightingData.anomalyMode;
        
        // Add threshold to prevent tiny changes from triggering transitions
        const phaseDifference = Math.abs(lightingData.phase - phase);
        const hasSignificantPhaseChange = 
          currentPhaseConfig !== phaseConfigKey && 
          phaseDifference > 0.05; // Only transition if phase changed by more than 5%
          
        const hasAnomalyChange = currentAnomalyMode !== activeAnomalyMode;
        
        const hasSignificantChange = hasSignificantPhaseChange || hasAnomalyChange;
          
        if (hasSignificantChange && !isTransitioning) {
          // Log only significant transitions and only in development mode
          if (process.env.NODE_ENV === 'development') {
            if (hasSignificantPhaseChange) {
              console.log(`🎬 Starting transition: ${currentPhaseConfig} → ${phaseConfigKey}`);
            }
            
            if (hasAnomalyChange && activeAnomalyMode) {
              console.log(`🔮 With anomaly: ${activeAnomalyMode}`);
            }
          }
          
          setIsTransitioning(true);
          setTargetLightingData(newLightingData);
          transitionStartRef.current = performance.now();
          animateTransition(lightingData, newLightingData, transitionStartRef.current);
        } else if (!isTransitioning) {
          // Only update if values changed significantly to avoid rerenders
          const hasChanged = 
            phaseDifference > 0.01 || 
            currentPhaseConfig !== phaseConfigKey || 
            currentAnomalyMode !== activeAnomalyMode;
            
          if (hasChanged) {
            setLightingData(newLightingData);
          }
        }
        
        setError(null);
        
      } catch (err) {
        console.warn('Moon phase calculation failed, using fallback lighting:', err);
        setLightingData(FALLBACK_LIGHTING);
        setError(err);
      }
    };

    // Calculate immediately
    calculateMoonLighting();
    
    // Update every hour (moon phase changes slowly) - skip if in debug mode
    if (debugPhase === null) {
      const interval = setInterval(calculateMoonLighting, 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [debugPhase, activeAnomalyMode]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Get atmospheric color based on phase and anomaly
  const getAtmosphericColor = () => {
    // Base color from phase
    const baseColor = ATMOSPHERIC_COLORS[lightingData.phaseConfig] || '#ffffff';
    
    // Only modify color if anomaly is CURRENTLY active
    if (lightingData.anomalyMode && lightingData.anomalyConfig && activeAnomalyMode) {
      const anomalyColor = lightingData.anomalyConfig.color;
      
      if (lightingData.anomalyMode === 'eclipse') {
        return anomalyColor; // Complete override for eclipse
      } 
      else if (lightingData.anomalyMode === 'supermoon') {
        // Blend with supermoon color (60% original, 40% anomaly)
        return interpolateColor(baseColor, anomalyColor, 0.4);
      }
      else if (lightingData.anomalyMode === 'scifi') {
        // For sci-fi, we'll use a time-based color cycle if enabled
        if (lightingData.anomalyConfig.colorCycle) {
          const now = Date.now() / 1000;
          const r = Math.sin(now * 0.3) * 127 + 128;
          const g = Math.sin(now * 0.3 + 2) * 127 + 128;
          const b = Math.sin(now * 0.3 + 4) * 127 + 128;
          return rgbToHex(r, g, b);
        }
        return anomalyColor;
      }
    }
    
    // Always return base color when no anomaly is active
    return baseColor;
  };

  // Get phase description that includes anomaly info if present
  const getMoonPhaseDescription = () => {
    let description = lightingData.description || 'Unknown';
    
    // Add anomaly suffix only if CURRENTLY active
    if (lightingData.anomalyMode && activeAnomalyMode) {
      const anomalySuffix = lightingData.anomalyMode.charAt(0).toUpperCase() + 
                          lightingData.anomalyMode.slice(1);
      description = `${description} (${anomalySuffix})`;
    }
    
    return description;
  };

  // Get all defined lunar phases for UI/controls
  const getAllPhases = () => {
    return Object.keys(MOON_PHASE_CONFIGS).map(key => ({
      key,
      ...MOON_PHASE_CONFIGS[key]
    }));
  };

  // Get all anomaly modes for UI/controls
  const getAllAnomalyModes = () => {
    return Object.keys(ANOMALY_CONFIGS).map(key => ({
      key,
      ...ANOMALY_CONFIGS[key]
    }));
  };

  // Only log anomaly mode changes in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && prevAnomalyMode.current !== activeAnomalyMode) {
      if (activeAnomalyMode) {
        console.log(`🔮 ANOMALY MODE ACTIVATED: ${activeAnomalyMode}`);
      } else if (prevAnomalyMode.current) {
        console.log(`🔮 ANOMALY MODE DEACTIVATED`);
      }
      prevAnomalyMode.current = activeAnomalyMode;
    }
  }, [activeAnomalyMode]);

  return {
    ...lightingData,
    atmosphericColor: getAtmosphericColor(),
    isTransitioning,
    getMoonPhaseDescription,
    getAllPhases,
    getAllAnomalyModes,
    activeAnomalyMode,
    hasAnomaly: !!lightingData.anomalyMode
  };
};

export default useMoonLighting; 