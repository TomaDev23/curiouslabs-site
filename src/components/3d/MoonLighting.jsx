/**
 * @component MoonLighting
 * @description Dynamic lighting system for 3D moon based on real lunar phases
 * @version 2.5.0 - Enhanced with Visual Anomaly Effects
 * @author CuriousLabs
 * @legit true - LEGIT protocol compliant
 */

import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useMoonLighting } from '../../utils/useMoonLighting';
import * as THREE from 'three';

// Eclipse shadow mask material - UPGRADED with dramatic corona effect
const EclipseShadowMask = ({ position, intensity, coronaGlow, exitingPhase }) => {
  const CORONA_SCALE = 1.03; // Slightly larger than moon radius
  
  return (
    <group>
      {/* Main eclipse shadow - less dark */}
      <mesh position={position}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial 
          transparent={true}
          opacity={intensity}
          color="#000000"
          side={THREE.DoubleSide}
          blending={THREE.MultiplyBlending}
        />
      </mesh>
      
      {/* NEW: Dramatic Corona Glow Shell - Primary Effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4.18 * CORONA_SCALE, 64, 64]} />
        <meshBasicMaterial 
          color="#ffaa44"
          transparent={true}
          opacity={coronaGlow * 0.35}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* NEW: Inner Corona Brightness Ring */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4.15 * CORONA_SCALE, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff"
          transparent={true}
          opacity={coronaGlow * 0.25}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* NEW: Outer Atmospheric Glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4.25 * CORONA_SCALE, 32, 32]} />
        <meshBasicMaterial 
          color="#ffcc88"
          transparent={true}
          opacity={coronaGlow * 0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Corona effect for exiting eclipse */}
      {exitingPhase && (
        <>
          {/* Corona glow ring - Enhanced */}
          <mesh position={[position[0], position[1], position[2] + 1]}>
            <ringGeometry args={[4.2, 6.5, 32]} />
            <meshBasicMaterial 
              transparent={true}
              opacity={coronaGlow * 0.8}
              color="#ffffff"
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* Inner corona brightness - Enhanced */}
          <mesh position={[position[0], position[1], position[2] + 0.5]}>
            <ringGeometry args={[4.0, 4.8, 32]} />
            <meshBasicMaterial 
              transparent={true}
              opacity={coronaGlow * 0.9}
              color="#ffffcc"
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          
          {/* NEW: Radial Flare Bursts */}
          <pointLight
            position={[position[0] + 3, position[1], position[2] + 2]}
            intensity={coronaGlow * 0.6}
            color="#ffaa44"
            distance={30}
            decay={1.2}
          />
          
          <pointLight
            position={[position[0] - 2, position[1] + 3, position[2] + 1]}
            intensity={coronaGlow * 0.5}
            color="#ffcc88"
            distance={25}
            decay={1.5}
          />
          
          {/* NEW: Solar Flare Effect */}
          <pointLight
            position={[position[0], position[1] + 2, position[2] - 10]}
            intensity={coronaGlow * 0.8}
            color="#ffffff"
            distance={40}
            decay={1.0}
          />
        </>
      )}
    </group>
  );
};

// Sci-fi grid overlay - used for sci-fi anomaly
const SciFiGridOverlay = ({ pulseRate, gridIntensity, colorCycle }) => {
  const gridRef = useRef();
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      const t = clock.getElapsedTime();
      
      // Pulse the grid intensity
      const pulse = (Math.sin(t * pulseRate) + 1) / 2;
      gridRef.current.material.opacity = pulse * gridIntensity;
      
      // Rotate the grid slowly
      gridRef.current.rotation.z = t * 0.1;
      
      // Color cycle if enabled
      if (colorCycle) {
        const r = Math.sin(t * 0.3) * 0.5 + 0.5;
        const g = Math.sin(t * 0.3 + 2) * 0.5 + 0.5;
        const b = Math.sin(t * 0.3 + 4) * 0.5 + 0.5;
        gridRef.current.material.color.setRGB(r, g, b);
      }
    }
  });
  
  return (
    <group>
      {/* Main grid sphere */}
      <mesh ref={gridRef} position={[0, 0, 0]}>
        <sphereGeometry args={[4.18, 32, 32]} />
        <meshBasicMaterial
          wireframe={true}
          transparent={true}
          opacity={gridIntensity}
          color={colorCycle ? "#ffffff" : "#80ffff"}
        />
      </mesh>
      
      {/* Inner pulse sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[4.17, 16, 16]} />
        <meshBasicMaterial
          transparent={true}
          opacity={0.1 * gridIntensity}
          color={colorCycle ? "#ffffff" : "#80ffff"}
        />
      </mesh>
    </group>
  );
};

const MoonLighting = ({ debugPhase = null, anomalyMode = null }) => {
  const { 
    sunPosition, 
    intensity, 
    phase,
    phaseConfig,
    atmosphericColor,
    isTransitioning,
    getMoonPhaseDescription,
    getAllPhases,
    activeAnomalyMode,
    anomalyConfig,
    hasAnomaly
  } = useMoonLighting(debugPhase, anomalyMode);
  
  // Reference to parent moon object for scaling (supermoon effect)
  const moonParentRef = useRef();
  
  // Create refs for tracking previous values at component level (not inside useEffect)
  const isFirstRender = useRef(true);
  const prevPhase = useRef(phase);
  const prevAnomalyMode = useRef(activeAnomalyMode);
  const prevTransitioning = useRef(isTransitioning);
  const hasLoggedDebugMode = useRef(false);

  // Enhanced debug logging with anomaly status - but with reduced output
  useEffect(() => {
    // Only log in development environment
    if (process.env.NODE_ENV !== 'development') return;
    
    // Only log when significant events occur, not on every render
    const isSignificantPhaseChange = Math.abs(prevPhase.current - phase) > 0.1;
    const isAnomalyChange = prevAnomalyMode.current !== activeAnomalyMode;
    const isTransitionChange = prevTransitioning.current !== isTransitioning;
    
    if (isFirstRender.current || isSignificantPhaseChange || isAnomalyChange || 
        (isTransitionChange && isTransitioning)) {
      
      // Log debug mode only once
      if (debugPhase !== null && !hasLoggedDebugMode.current) {
        console.log(`🐛 DEBUG MODE: Manual phase override ${debugPhase.toFixed(2)}`);
        hasLoggedDebugMode.current = true;
      } 
      // Log first render phase only once
      else if (isFirstRender.current && debugPhase === null) {
        console.log(`🌙 Moon Phase: ${getMoonPhaseDescription()} (${(phase * 100).toFixed(1)}%)`);
      }
      // Log significant phase changes
      else if (isSignificantPhaseChange && debugPhase === null) {
        console.log(`🌙 Phase updated: ${getMoonPhaseDescription()} (${(phase * 100).toFixed(1)}%)`);
      }
      
      // Only log anomaly changes when they first occur
      if (isAnomalyChange) {
        if (activeAnomalyMode) {
          console.log(`🔮 ANOMALY ACTIVATED: ${activeAnomalyMode}`);
        } else if (prevAnomalyMode.current) {
          console.log(`🔮 ANOMALY DEACTIVATED`);
        }
      }
      
      // Only log transition state changes once
      if (isTransitionChange && isTransitioning && !prevTransitioning.current) {
        console.log(`🎬 Transition in progress...`);
      }
      
      // Update refs
      prevPhase.current = phase;
      prevAnomalyMode.current = activeAnomalyMode;
      prevTransitioning.current = isTransitioning;
      isFirstRender.current = false;
    }
  }, [phase, sunPosition, intensity, phaseConfig, atmosphericColor, isTransitioning, 
      getMoonPhaseDescription, debugPhase, hasAnomaly, activeAnomalyMode]);

  // Apply supermoon scale effect
  useEffect(() => {
    if (moonParentRef.current) {
      // Don't scale the moon for supermoon anymore - we'll use lighting and camera effects only
      moonParentRef.current.scale.set(1, 1, 1);
    }
  }, [activeAnomalyMode, anomalyConfig]);

  // Check if this is full moon for special glow effect
  const isFullMoon = phaseConfig === 'fullMoon';
  
  // 🌙 CONSISTENT: Base lighting intensity for each phase
  const getBaseIntensity = () => {
    // Increase base intensity for supermoon
    const supermoonBoost = (activeAnomalyMode === 'supermoon' && anomalyConfig) 
      ? anomalyConfig.glowIntensity 
      : 1.0;
      
    switch(phaseConfig) {
      case 'newMoon': return 0.5 * supermoonBoost;
      case 'waxingCrescent': return 0.46 * supermoonBoost; // Increased by 15%
      case 'firstQuarter': return 0.385 * supermoonBoost; // Increased by 10%
      case 'waxingGibbous': return 0.3 * supermoonBoost;
      case 'fullMoon': return 0.25 * supermoonBoost; // Less base needed due to strong primary
      case 'waningGibbous': return 0.3 * supermoonBoost;
      case 'lastQuarter': return 0.385 * supermoonBoost; // Increased by 10%
      case 'waningCrescent': return 0.495 * supermoonBoost; // Increased by 10%
      default: return 0.35 * supermoonBoost;
    }
  };

  // 🌟 VOLUMETRIC: Dynamic glow intensity based on phase illumination
  const getGlowIntensity = () => {
    // Increase glow intensity for supermoon
    const supermoonBoost = (activeAnomalyMode === 'supermoon' && anomalyConfig) 
      ? anomalyConfig.glowIntensity 
      : 1.0;
      
    switch(phaseConfig) {
      case 'newMoon': return 0.15 * supermoonBoost;
      case 'waxingCrescent': return 0.2875 * supermoonBoost; // Increased by 15%
      case 'firstQuarter': return 0.44 * supermoonBoost; // Increased by 10%
      case 'waxingGibbous': return 0.65 * supermoonBoost;
      case 'fullMoon': return 1.0 * supermoonBoost; // Maximum glow
      case 'waningGibbous': return 0.65 * supermoonBoost;
      case 'lastQuarter': return 0.44 * supermoonBoost; // Increased by 10%
      case 'waningCrescent': return 0.275 * supermoonBoost; // Increased by 10%
      default: return 0.4 * supermoonBoost;
    }
  };

  // NEW: Get warm color tint based on phase
  const getWarmColorTint = () => {
    switch(phaseConfig) {
      case 'waxingCrescent': return "#ffcc80"; // Warm yellow
      case 'waxingGibbous': return "#fff4cc"; // Subtle yellow
      case 'lastQuarter': return "#ffd699"; // Yellow warmth
      case 'waningCrescent': return "#ffb347"; // Candle yellow
      default: return "#ffffff";
    }
  };

  // 🌟 ENHANCEMENT: Calculate soft lighting positions for natural falloff
  const softLightOffset1 = [sunPosition[0] * 0.7, sunPosition[1] * 0.8, sunPosition[2] * 0.9];
  const softLightOffset2 = [sunPosition[0] * 1.2, sunPosition[1] * 0.6, sunPosition[2] * 1.1];
  const softLightOffset3 = [sunPosition[0] * 0.5, sunPosition[1] * 1.3, sunPosition[2] * 0.7];

  return (
    <group ref={moonParentRef}>
      {/* 🌫️ ENHANCED: Softer ambient foundation with minimum visibility */}
      <ambientLight intensity={0.18} color="#556699" />
      
      {/* Core lighting system */}
      <group>
        {/* 🌙 NEW: Very subtle sun glow behind new moon for contrast */}
        {phaseConfig === 'newMoon' && (
          <pointLight
            position={[0, 0, -20]}
            intensity={0.08}
            color="#ffffcc"
            distance={100}
            decay={2.5}
          />
        )}
        
        {/* 🌙 UNIVERSAL: Base Moon Self-Illumination - Always visible for ALL phases */}
        <pointLight
          position={[0, 0, 0]}
          intensity={0.4}
          color="#e6e6ff"
          distance={40}
          decay={0.3}
        />
        
        {/* 🌙 CONSISTENT: Enhanced base illumination for ALL PHASES with warm tints */}
        <pointLight
          position={[0, 0, 8]}
          intensity={getBaseIntensity()}
          color={getWarmColorTint()}
          distance={50}
          decay={0.8}
        />
        
        {/* 🌙 CONSISTENT: Rear base illumination for ALL PHASES */}
        <pointLight
          position={[0, 0, -8]}
          intensity={getBaseIntensity() * 0.6}
          color="#aabbdd"
          distance={45}
          decay={0.6}
        />
        
        {/* 🌙 CONSISTENT: Side illumination for ALL PHASES with warm tints */}
        <pointLight
          position={[6, 0, 0]}
          intensity={getBaseIntensity() * 0.7}
          color={getWarmColorTint()}
          distance={35}
          decay={0.5}
        />
        
        {/* 🌙 CONSISTENT: Opposite side illumination for ALL PHASES */}
        <pointLight
          position={[-6, 0, 0]}
          intensity={getBaseIntensity() * 0.7}
          color={getWarmColorTint()}
          distance={35}
          decay={0.5}
        />
        
        {/* 🌙 CONSISTENT: Top/bottom base lighting for ALL PHASES */}
        <pointLight
          position={[0, 8, 0]}
          intensity={getBaseIntensity() * 0.5}
          color="#f0f0ff"
          distance={30}
          decay={0.4}
        />
        
        <pointLight
          position={[0, -8, 0]}
          intensity={getBaseIntensity() * 0.5}
          color="#f0f0ff"
          distance={30}
          decay={0.4}
        />
        
        {/* 🌙 CONSISTENT: Additional ambient for ALL PHASES */}
        <ambientLight intensity={0.08} color="#444466" />
        
        {/* PRIMARY SUN LIGHT - RESTORED HIGHER INTENSITY */}
        <directionalLight
          position={sunPosition}
          intensity={intensity * 0.85}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* 🎨 ENHANCEMENT: Atmospheric Color Temperature Layer - SMOOTH TRANSITIONS */}
        <directionalLight
          position={sunPosition}
          intensity={intensity * 0.5}
          color={atmosphericColor}
          castShadow={false}
        />

        {/* 🌟 EXPANDED: Soft Light Layer 1 - Primary Softening */}
        <pointLight
          position={softLightOffset1}
          intensity={intensity * 0.4}
          color="#ffffff"
          distance={60}
          decay={1.2}
        />

        {/* 🌟 EXPANDED: Soft Light Layer 2 - Atmospheric Enhancement */}
        <pointLight
          position={softLightOffset2}
          intensity={intensity * 0.35}
          color={atmosphericColor}
          distance={55}
          decay={1.0}
        />

        {/* 🌟 EXPANDED: Soft Light Layer 3 - Gentle Fill */}
        <pointLight
          position={softLightOffset3}
          intensity={intensity * 0.3}
          color="#f8f6f0"
          distance={65}
          decay={1.4}
        />
        
        {/* 🌟 VOLUMETRIC GLOW SYSTEM - Layer 1: Inner Core Glow */}
        <pointLight
          position={[0, 0, 12]}
          intensity={getGlowIntensity() * 0.8}
          color={atmosphericColor}
          distance={45}
          decay={0.5}
        />
        
        {/* 🌟 VOLUMETRIC GLOW SYSTEM - Layer 2: Mid Atmosphere */}
        <pointLight
          position={[0, 0, 20]}
          intensity={getGlowIntensity() * 0.6}
          color={atmosphericColor}
          distance={70}
          decay={1.0}
        />
        
        {/* 🌟 VOLUMETRIC GLOW SYSTEM - Layer 3: Outer Atmosphere */}
        <pointLight
          position={[0, 0, 30]}
          intensity={getGlowIntensity() * 0.4}
          color={atmosphericColor}
          distance={100}
          decay={1.8}
        />
        
        {/* 🌟 VOLUMETRIC GLOW SYSTEM - Layer 4: Far Field Glow */}
        <pointLight
          position={[0, 0, -25]}
          intensity={getGlowIntensity() * 0.3}
          color={atmosphericColor}
          distance={120}
          decay={2.2}
        />
        
        {/* 🌟 VOLUMETRIC GLOW SYSTEM - Multi-directional Atmospheric Haze */}
        <pointLight
          position={[15, 0, 0]}
          intensity={getGlowIntensity() * 0.25}
          color={atmosphericColor}
          distance={80}
          decay={1.5}
        />
        
        <pointLight
          position={[-15, 0, 0]}
          intensity={getGlowIntensity() * 0.25}
          color={atmosphericColor}
          distance={80}
          decay={1.5}
        />
        
        <pointLight
          position={[0, 15, 0]}
          intensity={getGlowIntensity() * 0.2}
          color={atmosphericColor}
          distance={75}
          decay={1.3}
        />
        
        <pointLight
          position={[0, -15, 0]}
          intensity={getGlowIntensity() * 0.2}
          color={atmosphericColor}
          distance={75}
          decay={1.3}
        />
        
        {/* 🌕 ENHANCED: Full Moon Glow with STABILIZED lighting (no flicker) */}
        {isFullMoon && (
          <>
            <pointLight
              position={[0, 0, 10]}
              intensity={1.0} // FIXED: Constant intensity to prevent flicker
              color="#fffbe6"
              distance={50}
              decay={0.8}
            />
            {/* 🌟 EXPANDED: Full Moon Soft Halo */}
            <pointLight
              position={[0, 0, 15]}
              intensity={0.6}
              color="#fff8e1"
              distance={80}
              decay={1.5}
            />
            {/* 🌟 NEW: Full Moon Wide Atmospheric Glow */}
            <pointLight
              position={[0, 0, -10]}
              intensity={0.4}
              color="#ffffe0"
              distance={70}
              decay={1.2}
            />
            {/* 🌟 VOLUMETRIC: Full Moon Mega Halo */}
            <pointLight
              position={[0, 0, 40]}
              intensity={0.5}
              color="#fffbe6"
              distance={150}
              decay={2.5}
            />
          </>
        )}
        
        {/* 🎬 EXPANDED: Transition Enhancement with wider coverage */}
        {isTransitioning && (
          <>
            <ambientLight 
              intensity={0.03} 
              color={atmosphericColor} 
            />
            {/* 🌟 EXPANDED: Transition Soft Glow */}
            <pointLight
              position={[0, 0, 20]}
              intensity={0.2}
              color={atmosphericColor}
              distance={90}
              decay={1.5}
            />
          </>
        )}
        
        {/* 🌟 EXPANDED: Softer fill light with much wider natural falloff */}
        <pointLight
          position={[-15, -10, 20]}
          intensity={0.25}
          color="#fff6e0"
          distance={70}
          decay={1.0}
        />
        
        {/* 🌟 EXPANDED: Softer rim light with wide gentle decay */}
        <pointLight
          position={[0, 20, -25]}
          intensity={0.2}
          color="#e6f3ff"
          distance={60}
          decay={1.2}
        />

        {/* 🌟 EXPANDED: Atmospheric Scattering with massive coverage */}
        <pointLight
          position={[sunPosition[0] * 0.3, sunPosition[1] * 0.3, sunPosition[2] * 0.3]}
          intensity={intensity * 0.12}
          color={atmosphericColor}
          distance={100}
          decay={2.0}
        />
      </group>
      
      {/* ANOMALY: UPGRADED Eclipse with dramatic corona effect */}
      {activeAnomalyMode === 'eclipse' && anomalyConfig && (
        <>
          <EclipseShadowMask 
            position={anomalyConfig.shadowPosition}
            intensity={anomalyConfig.shadowIntensity}
            coronaGlow={anomalyConfig.coronaGlow}
            exitingPhase={anomalyConfig.exitingPhase}
          />
          
          {/* NEW: Primary Corona Atmospheric Lighting */}
          <pointLight
            position={[0, 0, -25]}
            intensity={anomalyConfig.rimGlow * 1.2}
            color="#ffaa44"
            distance={100}
            decay={1.8}
          />
          
          {/* NEW: Secondary Corona Ring Light */}
          <pointLight
            position={[0, 0, 30]}
            intensity={anomalyConfig.coronaGlow * 0.8}
            color="#ffffff"
            distance={150}
            decay={2.2}
          />
          
          {/* NEW: Atmospheric Scattering - Multiple Layers */}
          <pointLight
            position={[15, 0, 0]}
            intensity={anomalyConfig.coronaGlow * 0.4}
            color="#ffcc88"
            distance={80}
            decay={1.5}
          />
          
          <pointLight
            position={[-15, 0, 0]}
            intensity={anomalyConfig.coronaGlow * 0.4}
            color="#ffcc88"
            distance={80}
            decay={1.5}
          />
          
          <pointLight
            position={[0, 15, 0]}
            intensity={anomalyConfig.coronaGlow * 0.3}
            color="#ffaa44"
            distance={70}
            decay={1.3}
          />
          
          <pointLight
            position={[0, -15, 0]}
            intensity={anomalyConfig.coronaGlow * 0.3}
            color="#ffaa44"
            distance={70}
            decay={1.3}
          />
          
          {/* NEW: Radial Flare Lighting System */}
          <pointLight
            position={[10, 10, -15]}
            intensity={anomalyConfig.rimGlow * 0.6}
            color="#ffffff"
            distance={60}
            decay={1.0}
          />
          
          <pointLight
            position={[-10, -10, -15]}
            intensity={anomalyConfig.rimGlow * 0.6}
            color="#ffffff"
            distance={60}
            decay={1.0}
          />
          
          {/* NEW: Mystical Ambient Eclipse Glow */}
          <ambientLight 
            intensity={0.05} 
            color="#ffaa44"
          />
          
          {/* Enhanced original corona rim lighting */}
          <pointLight
            position={[0, 0, -20]}
            intensity={anomalyConfig.rimGlow}
            color={anomalyConfig.color}
            distance={80}
            decay={1.5}
          />
        </>
      )}
      
      {/* ANOMALY: Sci-fi grid overlay */}
      {activeAnomalyMode === 'scifi' && anomalyConfig && (
        <SciFiGridOverlay
          pulseRate={anomalyConfig.pulseRate}
          gridIntensity={anomalyConfig.gridIntensity}
          colorCycle={anomalyConfig.colorCycle}
        />
      )}
      
      {/* ANOMALY: Supermoon rim light - extra glow around the edge */}
      {activeAnomalyMode === 'supermoon' && anomalyConfig && (
        <>
          {/* Main atmospheric glow */}
          <pointLight 
            position={[0, 0, 40]} 
            intensity={anomalyConfig.glowIntensity * 0.7} 
            distance={200} 
            decay={2.0}
            color={anomalyConfig.color}
          />
          
          {/* Side glow for dramatic effect */}
          <pointLight 
            position={[30, 10, 20]} 
            intensity={anomalyConfig.glowIntensity * 0.5} 
            distance={120} 
            decay={1.8}
            color={anomalyConfig.color}
          />
          
          {/* Bottom rim glow */}
          <pointLight 
            position={[0, -25, 15]} 
            intensity={anomalyConfig.glowIntensity * 0.4} 
            distance={100} 
            decay={1.5}
            color={anomalyConfig.color}
          />
          
          {/* Core intense glow */}
          <pointLight 
            position={[0, 0, 15]} 
            intensity={anomalyConfig.glowIntensity * 0.6} 
            distance={80} 
            decay={1.2}
            color={anomalyConfig.color}
          />
          
          {/* Ambient boost */}
          <ambientLight 
            intensity={0.2} 
            color={anomalyConfig.color}
          />
        </>
      )}
    </group>
  );
};

export default MoonLighting; 