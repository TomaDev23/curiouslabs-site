/**
 * @component MissionControlBoard
 * @description Real Mission Control for Moon Phase system - Connected to lunar calculations
 * @version 3.0.0 - Enhanced Lunar Intelligence Panel
 * @author CuriousLabs
 * @legit true - Mission Control protocol compliant with real lunar data
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMoonLighting } from '../../utils/useMoonLighting';
import lune from 'lune';
import { getDistanceToEarth, getTideInfluence, getNextLunarEvents, updateEventDays } from '../../utils/luneBridge';

// CSS animations for tidal effects
const tidalAnimations = `
  @keyframes tidalWave {
    0%, 100% { transform: translateY(0px); opacity: 0.8; }
    50% { transform: translateY(-1px); opacity: 1; }
  }
  
  @keyframes waveFlow {
    0% { opacity: 0.6; transform: scaleX(0.8); }
    50% { opacity: 1; transform: scaleX(1.2); }
    100% { opacity: 0.6; transform: scaleX(0.8); }
  }
  
  @keyframes orbitalPulse {
    0%, 100% { box-shadow: 0 0 4px rgba(251, 191, 36, 0.8); }
    50% { box-shadow: 0 0 8px rgba(251, 191, 36, 1), 0 0 12px rgba(251, 191, 36, 0.6); }
  }
`;

// Custom hook for responsive breakpoints - SSR safe
const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // SSR-safe check
    if (typeof window === 'undefined') return;
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkIsMobile();
    
    // Add listener
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  return { isMobile };
};

// Separate Sliding Moon Phase Control Card Component
const SlidingPhaseControl = ({ 
  isVisible, 
  onToggle, 
  moonPhases, 
  controlMode, 
  manualPhase, 
  onPhaseSelect,
  anomalyMode,
  onAnomalyToggle,
  className = "" 
}) => {
  return (
    <>
      {/* Sliding Phase Control Card - Horizontal Extension */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute -top-20 left-0 right-0 z-50 mx-2 md:mx-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl"
            style={{
              height: "auto",
              minHeight: "3.5rem",
              boxShadow: '0 0 25px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(132, 204, 22, 0.05)',
            }}
          >
            <div className="flex flex-wrap items-center p-3 md:p-4">
              <div className="flex items-center space-x-2 mr-6 mb-2 md:mb-0">
                <h3 className="text-lime-400 text-sm font-mono tracking-wider">PHASE CONTROL</h3>
                <div className={`text-xs font-mono ${controlMode === 'AUTO' ? 'text-lime-400' : 'text-orange-400'}`}>
                  {controlMode}
                </div>
              </div>
              
              {/* Horizontal Phase Control Grid - Expanded */}
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {/* AUTO Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPhaseSelect(moonPhases[0])}
                  className={`
                    relative flex items-center space-x-2 py-1.5 px-3 rounded-md transition-all duration-200
                    ${controlMode === 'AUTO'
                      ? 'bg-lime-900/30 text-lime-400 shadow-inner border border-lime-400/20' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }
                  `}
                >
                  <div className="text-lg">🔄</div>
                  <div className="text-xs font-medium whitespace-nowrap">AUTO SYNC</div>
                </motion.button>

                {/* Phase Buttons - Horizontal Layout with Full Names */}
                {moonPhases.filter(p => p.code !== 'AUTO').map((phase, index) => {
                  const isSelected = (controlMode === 'AUTO' && phase.value === null) || 
                                   (controlMode === 'MANUAL' && phase.value === manualPhase);
                  
                  return (
                    <motion.button
                      key={phase.code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onPhaseSelect(phase)}
                      className={`
                        relative flex items-center space-x-2 py-1.5 px-3 rounded-md transition-all duration-200 my-1
                        ${isSelected
                          ? 'bg-lime-900/30 text-lime-400 shadow-inner border border-lime-400/20' 
                          : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                        }
                      `}
                    >
                      <div className="text-lg">{phase.icon}</div>
                      <div className="text-xs font-medium whitespace-nowrap">{phase.name}</div>
                      {isSelected && (
                        <motion.div 
                          className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-lime-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  );
                })}
                
                {/* Anomaly Mode Buttons - Special Lighting Controls */}
                <div className="h-7 mx-1 border-l border-white/10"></div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAnomalyToggle('supermoon')}
                  className={`
                    relative flex items-center space-x-2 py-1.5 px-3 rounded-md transition-all duration-200 my-1
                    ${anomalyMode === 'supermoon'
                      ? 'bg-yellow-900/30 text-yellow-300 shadow-inner border border-yellow-400/20' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }
                  `}
                >
                  <div className="text-lg">✨</div>
                  <div className="text-xs font-medium whitespace-nowrap">Supermoon</div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAnomalyToggle('eclipse')}
                  className={`
                    relative flex items-center space-x-2 py-1.5 px-3 rounded-md transition-all duration-200 my-1
                    ${anomalyMode === 'eclipse'
                      ? 'bg-red-900/30 text-red-300 shadow-inner border border-red-400/20' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }
                  `}
                >
                  <div className="text-lg">🌑</div>
                  <div className="text-xs font-medium whitespace-nowrap">Eclipse</div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAnomalyToggle('scifi')}
                  className={`
                    relative flex items-center space-x-2 py-1.5 px-3 rounded-md transition-all duration-200 my-1
                    ${anomalyMode === 'scifi'
                      ? 'bg-cyan-900/30 text-cyan-300 shadow-inner border border-cyan-400/20' 
                      : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
                    }
                  `}
                >
                  <div className="text-lg">🌐</div>
                  <div className="text-xs font-medium whitespace-nowrap">Sci-Fi</div>
                </motion.button>
              </div>
              
              {/* Close Button */}
              <motion.button
                onClick={onToggle}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all duration-200 mt-2 md:mt-0"
              >
                <span className="text-white/60 text-xs">✕</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MissionControlBoard = ({ 
  currentPhase = null, 
  onPhaseChange = () => {},
  onAnomalyChange = () => {},
  className = "",
  showSlidingControl = false
}) => {
  const [missionTime, setMissionTime] = useState(new Date());
  const [controlMode, setControlMode] = useState('AUTO'); // AUTO or MANUAL
  const [manualPhase, setManualPhase] = useState(null);
  const [slidingControlVisible, setSlidingControlVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lunarEvents, setLunarEvents] = useState(null);
  const [anomalyMode, setAnomalyMode] = useState(null);
  
  // Responsive hook
  const { isMobile } = useResponsive();
  
  // Get real lunar data from our lighting system with error handling
  const { 
    phase: realPhase, 
    intensity, 
    sunPosition,
    phaseConfig,
    getMoonPhaseDescription,
    atmosphericColor,
    isTransitioning: lightingIsTransitioning 
  } = useMoonLighting(controlMode === 'MANUAL' ? manualPhase : null, anomalyMode);
  
  // Expanded time zones with UTC in center - More comprehensive world coverage
  const timeZones = [
    // Row 1 - Americas
    { code: 'LAX', name: 'Los Angeles', timezone: 'America/Los_Angeles', flag: '🇺🇸', country: 'US', size: 'small' },
    { code: 'NYC', name: 'New York', timezone: 'America/New_York', flag: '🇺🇸', country: 'US', size: 'small' },
    { code: 'SAO', name: 'São Paulo', timezone: 'America/Sao_Paulo', flag: '🇧🇷', country: 'BR', size: 'small' },
    { code: 'UTC', name: 'Mission Control', timezone: 'UTC', flag: '🌍', country: '', size: 'large' },
    { code: 'LON', name: 'London', timezone: 'Europe/London', flag: '🇬🇧', country: 'GB', size: 'small' },
    
    // Row 2 - Europe & Middle East
    { code: 'PAR', name: 'Paris', timezone: 'Europe/Paris', flag: '🇫🇷', country: 'FR', size: 'small' },
    { code: 'BER', name: 'Berlin', timezone: 'Europe/Berlin', flag: '🇩🇪', country: 'DE', size: 'small' },
    { code: 'DXB', name: 'Dubai', timezone: 'Asia/Dubai', flag: '🇦🇪', country: 'AE', size: 'small' },
    { code: 'TLV', name: 'Tel Aviv', timezone: 'Asia/Jerusalem', flag: '🇮🇱', country: 'IL', size: 'small' },
    { code: 'MOS', name: 'Moscow', timezone: 'Europe/Moscow', flag: '🇷🇺', country: 'RU', size: 'small' },
    
    // Row 3 - Asia & Oceania
    { code: 'DEL', name: 'Delhi', timezone: 'Asia/Kolkata', flag: '🇮🇳', country: 'IN', size: 'small' },
    { code: 'BEJ', name: 'Beijing', timezone: 'Asia/Shanghai', flag: '🇨🇳', country: 'CN', size: 'small' },
    { code: 'TYO', name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵', country: 'JP', size: 'small' },
    { code: 'SYD', name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺', country: 'AU', size: 'small' }
  ];
  
  // Moon phases for phase control
  const moonPhases = [
    { code: 'AUTO', name: 'AUTO SYNC', value: null, icon: '🔄', status: 'SYNC', color: 'lime' },
    { code: 'NEW', name: 'New Moon', value: 0, icon: '🌑', status: 'DARK', color: 'gray' },
    { code: 'WAX_C', name: 'Waxing Crescent', value: 0.15, icon: '🌒', status: 'RISE', color: 'blue' },
    { code: 'FIRST', name: 'First Quarter', value: 0.28, icon: '🌓', status: 'HALF', color: 'yellow' },
    { code: 'WAX_G', name: 'Waxing Gibbous', value: 0.4, icon: '🌔', status: 'BUILD', color: 'orange' },
    { code: 'FULL', name: 'Full Moon', value: 0.5, icon: '🌕', status: 'MAX', color: 'white' },
    { code: 'WAN_G', name: 'Waning Gibbous', value: 0.6, icon: '🌖', status: 'FADE', color: 'purple' },
    { code: 'LAST', name: 'Last Quarter', value: 0.72, icon: '🌗', status: 'DIM', color: 'cyan' },
    { code: 'WAN_C', name: 'Waning Crescent', value: 0.85, icon: '🌘', status: 'END', color: 'red' }
  ];

  // Update mission time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize and update lunar events
  useEffect(() => {
    // Get initial lunar events
    const events = getNextLunarEvents();
    setLunarEvents(updateEventDays(events));
    
    // Update lunar events every hour
    const interval = setInterval(() => {
      setLunarEvents(updateEventDays(getNextLunarEvents()));
    }, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Get time for specific timezone with enhanced error handling
  const getTimeForZone = (timezone) => {
    try {
      return new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch (e) {
      console.warn(`Failed to get time for timezone ${timezone}:`, e);
      return '--:--:--';
    }
  };

  // Check if timezone is in daylight (rough estimation) with error handling
  const isDaylight = (timezone) => {
    try {
      const now = new Date();
      const hour = parseInt(new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit'
      }));
      return hour >= 6 && hour < 20; // Rough daylight hours
    } catch (e) {
      console.warn(`Failed to determine daylight for timezone ${timezone}:`, e);
      return true; // Default to daylight if error
    }
  };

  // Handle phase selection - THIS ACTUALLY CONTROLS THE MOON! Enhanced with error handling
  const handlePhaseSelect = (phase) => {
    try {
      console.log(`🚀 MISSION CONTROL: Phase selected - ${phase.name} (${phase.value})`);
      
      // Temporarily set transitioning to true when changing phases
      setIsTransitioning(true);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1500);
      
      if (phase.value === null) {
        // AUTO mode - use real lunar data
        setControlMode('AUTO');
        setManualPhase(null);
        console.log('🌙 AUTO MODE: Syncing to real lunar phase');
      } else {
        // MANUAL mode - override with selected phase
        setControlMode('MANUAL');
        setManualPhase(phase.value);
        console.log(`🎛️ MANUAL OVERRIDE: Phase set to ${phase.value}`);
      }
      
      // Call the parent's phase change handler with error handling
      if (typeof onPhaseChange === 'function') {
        onPhaseChange(phase.value);
      }
    } catch (error) {
      console.error('Error in handlePhaseSelect:', error);
      setIsTransitioning(false); // Reset on error
    }
  };

  // Get current lunar data using the lune library directly for display with enhanced error handling
  const getCurrentLunarData = () => {
    try {
      const moonData = lune.phase(new Date());
      const today = new Date();
      const lunarMonth = 29.53059; // Average lunar month in days
      const newMoonRef = new Date('2024-01-11'); // Reference new moon
      const daysSinceNew = (today - newMoonRef) / (1000 * 60 * 60 * 24);
      
      // Use the same phase mapping as the lighting system for consistency
      const getPhaseNameFromValue = (phase) => {
        if (typeof phase !== 'number' || isNaN(phase)) return 'Unknown Phase';
        if (phase <= 0.07) return 'New Moon';
        if (phase <= 0.25) return 'Waxing Crescent';
        if (phase <= 0.32) return 'First Quarter';
        if (phase <= 0.48) return 'Waxing Gibbous';
        if (phase <= 0.52) return 'Full Moon';
        if (phase <= 0.68) return 'Waning Gibbous';
        if (phase <= 0.75) return 'Last Quarter';
        if (phase <= 0.93) return 'Waning Crescent';
        return 'New Moon'; // 0.93 - 1.0
      };
      
      // Validate moonData
      if (!moonData || typeof moonData.phase !== 'number') {
        throw new Error('Invalid moon data received');
      }
      
      const distanceKm = getDistanceToEarth() || 384400; // Fallback to average
      const tideInfluence = getTideInfluence() || 'Neutral'; // Fallback
      
      return {
        phase: moonData.phase,
        age: Math.max(0, Math.floor(daysSinceNew % lunarMonth)) || 0,
        illumination: Math.max(0, Math.min(100, Math.round((moonData.illuminated || 0) * 100))),
        phaseName: getPhaseNameFromValue(moonData.phase),
        isWaxing: moonData.phase < 0.5,
        nextPhase: getNextPhaseInfo(moonData.phase),
        lunarCycle: Math.max(1, Math.floor(daysSinceNew / lunarMonth) + 1),
        distanceKm: distanceKm,
        tideInfluence: tideInfluence
      };
    } catch (error) {
      console.warn('Failed to get lunar data, using fallbacks:', error);
      return {
        phase: realPhase || 0.5,
        age: 15,
        illumination: Math.round((realPhase || 0.5) * 100),
        phaseName: getMoonPhaseDescription ? getMoonPhaseDescription() : 'Full Moon',
        isWaxing: (realPhase || 0.5) < 0.5,
        nextPhase: 'Full Moon',
        lunarCycle: 1,
        distanceKm: 384400, // Average distance
        tideInfluence: 'Neutral'
      };
    }
  };

  // Get next phase information with error handling
  const getNextPhaseInfo = (currentPhase) => {
    try {
      if (typeof currentPhase !== 'number' || isNaN(currentPhase)) {
        return 'Full Moon'; // Default fallback
      }
      
      const phases = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'];
      const phaseValues = [0, 0.25, 0.5, 0.75];
      
      for (let i = 0; i < phaseValues.length; i++) {
        if (currentPhase < phaseValues[i]) {
          return phases[i];
        }
      }
      return phases[0]; // Next new moon
    } catch (error) {
      console.warn('Error calculating next phase:', error);
      return 'Full Moon'; // Safe fallback
    }
  };

  const lunarData = getCurrentLunarData();
  
  // Get the current active phase (manual override or real) with safety checks
  const activePhase = controlMode === 'MANUAL' ? manualPhase : realPhase;
  const selectedPhase = moonPhases.find(p => p.value === activePhase) || moonPhases[0];
  
  // Format the current date for display with error handling
  const formattedDate = (() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }).format(missionTime);
    } catch (error) {
      console.warn('Error formatting date:', error);
      return new Date().toDateString().slice(0, 10); // Fallback format
    }
  })();

  // Toggle anomaly mode with enhanced error handling
  const toggleAnomalyMode = (mode) => {
    try {
      // Determine the new mode (if current mode is the same, set to null)
      const newMode = anomalyMode === mode ? null : mode;
      
      // Update state and call parent handler
      setAnomalyMode(newMode);
      if (typeof onAnomalyChange === 'function') {
        onAnomalyChange(newMode);
      }
      
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        if (newMode) {
          console.log(`🔮 ANOMALY MODE ACTIVATED: ${newMode}`);
        } else {
          console.log(`🔮 ANOMALY MODE DEACTIVATED`);
        }
      }
    } catch (error) {
      console.error('Error in toggleAnomalyMode:', error);
    }
  };

  return (
    <>
      {/* Inject tidal animation styles */}
      <style>{tidalAnimations}</style>
      
      <div className={`relative w-full ${className}`}>
        {/* Sliding Phase Control Card - Positioned above main board */}
        {showSlidingControl && (
          <SlidingPhaseControl
            isVisible={slidingControlVisible}
            onToggle={() => setSlidingControlVisible(!slidingControlVisible)}
            moonPhases={moonPhases}
            controlMode={controlMode}
            manualPhase={manualPhase}
            onPhaseSelect={handlePhaseSelect}
            anomalyMode={anomalyMode}
            onAnomalyToggle={toggleAnomalyMode}
          />
        )}

        {/* Main Control Board - Compact Black Glassmorphism Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="backdrop-blur-xl bg-black/40 rounded-lg overflow-hidden mx-2 md:mx-4 border border-white/10"
          style={{
            height: '33vh',
            minHeight: '270px',
            maxHeight: '400px',
            marginTop: '-15vh',
            boxShadow: '0 0 25px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(131, 204, 22, 0.18)',
          }}
        >
          {/* Integrated Mission Control Header with Toggle Button */}
          <div className="pt-2 pb-1.5 px-2 md:px-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-3">
                <motion.div 
                  className={`w-1.5 h-1.5 rounded-full ${controlMode === 'AUTO' ? 'bg-lime-400' : 'bg-orange-400'}`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-lime-400/80 text-xs font-mono tracking-wider hidden sm:inline">
                  LUNAR CONTROL COMMAND BOARD
                </span>
                <span className="text-lime-400/80 text-xs font-mono tracking-wider sm:hidden">
                  LUNAR CONTROL
                </span>
                <div className={`text-xs font-mono ${controlMode === 'AUTO' ? 'text-lime-400' : 'text-orange-400'}`}>
                  {controlMode} {isTransitioning || lightingIsTransitioning ? '| TRANSIT' : '| OPERATIONAL'}
                </div>
                
                {/* Phase Control Toggle Button - Integrated in Header */}
                {showSlidingControl && (
                  <motion.button
                    onClick={() => setSlidingControlVisible(!slidingControlVisible)}
                    className="ml-2 md:ml-4 bg-black/30 backdrop-blur-md rounded-md px-2 md:px-3 py-1 border border-lime-400/20 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    animate={isTransitioning ? {
                      boxShadow: ['0 0 5px rgba(132, 204, 22, 0.2)', '0 0 10px rgba(132, 204, 22, 0.5)', '0 0 5px rgba(132, 204, 22, 0.2)'],
                      borderColor: ['rgba(132, 204, 22, 0.2)', 'rgba(132, 204, 22, 0.6)', 'rgba(132, 204, 22, 0.2)']
                    } : {}}
                    transition={{ duration: 1.5, repeat: isTransitioning ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <span className={`text-sm ${isTransitioning ? 'animate-pulse' : ''}`}>🌙</span>
                      <span className="text-lime-400 text-xs font-mono hidden md:inline">PHASE</span>
                      <motion.div
                        animate={{ rotate: slidingControlVisible ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-lime-400 text-xs">▲</span>
                      </motion.div>
                    </div>
                  </motion.button>
                )}
              </div>
              <div className="flex items-center space-x-2 md:space-x-4">
                <span className="text-yellow-400/80 text-xs font-mono tracking-wider hidden md:inline">
                  GLOBAL MISSION TIME
                </span>
                <span className="text-yellow-400/80 text-xs font-mono tracking-wider md:hidden">
                  GMT
                </span>
                <div className="text-lime-400 font-mono text-xs md:text-sm tracking-wide">
                  {missionTime.toUTCString().slice(17, 25)}
                </div>
              </div>
            </div>
            
            {/* NEW: Current Moon Phase Information Bar - Responsive */}
            <div className="flex items-center justify-between mt-2 text-xs overflow-x-auto">
              <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-shrink-0">
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="text-gray-400 font-mono">🌙</span>
                  <span className="text-white/90 truncate">{lunarData.phaseName}</span>
                </div>
                
                <div className="flex items-center space-x-1 md:space-x-2 hidden sm:flex">
                  <span className="text-gray-400 font-mono">📅</span>
                  <span className="text-white/90">{formattedDate}</span>
                </div>
                
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="text-gray-400 font-mono">🕐</span>
                  <span className="text-white/90">{lunarData.age}d</span>
                </div>
                
                <div className="flex items-center space-x-1 md:space-x-2">
                  <span className="text-gray-400 font-mono">⚙️</span>
                  <span className={controlMode === 'AUTO' ? 'text-lime-400' : 'text-orange-400'}>
                    {controlMode}
                  </span>
                </div>
              </div>
              
              {anomalyMode && (
                <div className="bg-black/30 px-2 py-0.5 rounded border border-lime-400/20 flex-shrink-0 ml-2">
                  <span className="text-yellow-400 text-xs font-mono">🔮 {anomalyMode.toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 h-[calc(100%-45px)] p-1 md:p-2">
            {/* Responsive Layout: Enhanced Lunar Control | World Clocks */}
            <div className="h-full flex gap-1 md:gap-2 flex-col md:flex-row">
              
              {/* Enhanced Lunar Control Section - Mobile: Full Width, Desktop: 30% */}
              <div className="w-full md:w-[30%] flex flex-col order-2 md:order-1">
                <div className="relative h-full" style={{ height: isMobile ? "180px" : "230px" }}>
                  <div className="absolute -left-1 top-0 h-full w-0.5 bg-gradient-to-b from-lime-400/60 to-transparent hidden md:block"></div>
                  
                  {/* Main Dashboard Container - Distance-Centered Design */}
                  <div className="h-full w-full p-1 md:p-2 bg-black/20 backdrop-blur-sm border-[0.5px] border-white/10 relative">
                    
                    {/* Top Data Strip - Compact lunar metrics - Responsive Grid */}
                    <div className="grid grid-cols-4 gap-1 md:gap-2 mb-2 md:mb-3">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Age</span>
                        <span className="text-lime-400 text-xs font-mono">{lunarData.age}d</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Light</span>
                        <span className="text-white text-xs font-mono">{lunarData.illumination}%</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Cycle</span>
                        <span className="text-yellow-400 text-xs font-mono">#{lunarData.lunarCycle}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Mode</span>
                        <span className={`text-xs font-mono ${controlMode === 'AUTO' ? 'text-lime-400' : 'text-orange-400'}`}>
                          {controlMode}
                        </span>
                      </div>
                    </div>

                    {/* HERO: Central Distance Visualization with Integrated Tidal System */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-center mb-2">
                        <span className="text-gray-300 text-sm font-mono tracking-wider">LUNAR DISTANCE</span>
                        <div className="text-white text-lg font-mono font-bold">
                          {Math.round(lunarData.distanceKm / 1000)}k km
                        </div>
                      </div>
                      
                      {/* Enhanced Large Orbital Distance Bar with Integrated Tidal Cycle */}
                      <div className="relative px-2">
                        <div className="w-full bg-black/60 rounded-full h-4 relative overflow-hidden border border-white/20">
                          {/* Orbital markers with better spacing */}
                          <div className="absolute top-0 left-0 w-1 h-full bg-orange-400/80 rounded-l-full" />
                          <div className="absolute top-0 left-1/4 w-0.5 h-full bg-yellow-300/60" />
                          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-yellow-300/60" />
                          <div className="absolute top-0 left-3/4 w-0.5 h-full bg-yellow-300/60" />
                          <div className="absolute top-0 right-0 w-1 h-full bg-red-400/80 rounded-r-full" />
                          
                          {/* Tidal influence overlay - shows as blue glow intensity based on distance */}
                          <div 
                            className="absolute inset-0 rounded-full transition-all duration-3000 ease-in-out"
                            style={{
                              background: `linear-gradient(90deg, 
                                rgba(59, 130, 246, ${lunarData.tideInfluence === 'High' ? '0.3' : lunarData.tideInfluence === 'Low' ? '0.1' : '0.2'}) 0%, 
                                rgba(147, 197, 253, ${lunarData.tideInfluence === 'High' ? '0.2' : lunarData.tideInfluence === 'Low' ? '0.05' : '0.1'}) 50%, 
                                rgba(59, 130, 246, ${lunarData.tideInfluence === 'High' ? '0.3' : lunarData.tideInfluence === 'Low' ? '0.1' : '0.2'}) 100%)`,
                              animation: 'tidalWave 4s ease-in-out infinite'
                            }}
                          />
                          
                          {/* Current position indicator - larger and more prominent */}
                          <div 
                            className="absolute top-0.5 bottom-0.5 w-3 bg-gradient-to-r from-orange-500 via-yellow-300 to-orange-500 rounded-full transition-all duration-2000 ease-out shadow-lg z-10"
                            style={{
                              left: `${Math.max(1, Math.min(93, ((lunarData.distanceKm - 356500) / (406700 - 356500)) * 93))}%`,
                              animation: 'orbitalPulse 3s ease-in-out infinite',
                              boxShadow: '0 0 8px rgba(251, 191, 36, 0.8), inset 0 1px 2px rgba(255,255,255,0.3)'
                            }}
                          >
                            {/* Pulsing center indicator */}
                            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse transform -translate-x-1/2 -translate-y-1/2 shadow-sm" />
                            {/* Velocity indicator trail */}
                            <div className="absolute top-1/2 left-0 w-1 h-0.5 bg-gradient-to-r from-transparent to-yellow-200 transform -translate-y-1/2 opacity-60" />
                          </div>
                        </div>
                        
                        {/* Enhanced orbital labels with integrated tidal info */}
                        <div className="flex justify-between mt-1 px-1">
                          <div className="flex flex-col items-start">
                            <span className="text-orange-400 font-mono text-xs font-bold">356k</span>
                            <span className="text-gray-400 text-xs">PERIGEE</span>
                            <span className="text-blue-300 text-xs">High Tide</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-yellow-300 font-mono text-xs">381k</span>
                            <span className="text-gray-400 text-xs">AVERAGE</span>
                            <span className={`text-xs font-mono ${
                              lunarData.tideInfluence === 'High' ? 'text-blue-300' :
                              lunarData.tideInfluence === 'Low' ? 'text-blue-500' : 'text-blue-400'
                            }`}>
                              🌊 {lunarData.tideInfluence}
                            </span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-red-400 font-mono text-xs font-bold">407k</span>
                            <span className="text-gray-400 text-xs">APOGEE</span>
                            <span className="text-blue-500 text-xs">Low Tide</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Integrated Events Info - Single Line */}
                    <div className="mt-4 flex justify-between items-center px-2">
                      <div className="flex items-center space-x-4">
                        <span className="text-yellow-400 text-xs">🌟</span>
                        {lunarEvents ? (
                          <>
                            <div className="text-gray-400 text-xs">
                              Super: <span className="text-yellow-300 font-mono">{lunarEvents.supermoon.daysFromNow}d</span>
                            </div>
                            <div className="text-gray-400 text-xs">
                              Eclipse: <span className="text-red-300 font-mono">{lunarEvents.eclipse.daysFromNow}d</span>
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-400 text-xs">Loading events...</div>
                        )}
                      </div>
                      
                      {/* Orbital position indicator */}
                      <div className="text-right">
                        <span className="text-gray-500 text-xs">Orbital: </span>
                        <span className="text-lime-300 text-xs font-mono">
                          {Math.round(((lunarData.distanceKm - 356500) / (406700 - 356500)) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* World Clock Section - Mobile: Full Width First, Desktop: 70% */}
              <div className="w-full md:w-[70%] flex flex-col order-1 md:order-2">
                <div className="relative">
                  <div className="absolute -left-1 top-0 h-full w-0.5 bg-gradient-to-b from-yellow-400/60 to-transparent hidden md:block"></div>
                </div>
                
                {/* Responsive Time Zone Grid - Mobile: Stacked, Desktop: Grid */}
                <div className="flex flex-col -gap-px" style={{ height: isMobile ? "auto" : "230px" }}>
                  {/* Mobile Layout: Simplified Grid */}
                  <div className="md:hidden">
                    <div className="grid grid-cols-3 gap-px">
                      {timeZones.slice(0, 9).map((zone, index) => (
                        <div key={`mobile-${zone.code}`} className="h-16">
                          {renderTimeZoneMobile(zone, index)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Desktop Layout: Original Complex Grid */}
                  <div className="hidden md:flex md:flex-col md:-gap-px">
                    {/* Row 1 */}
                    <div className="flex h-[76px] w-full -gap-px">
                      {timeZones.slice(0, 3).map((zone, index) => (
                        <div key={`r1c${index}`} className="w-1/5 h-full -mr-px">
                          {renderTimeZone(zone, index)}
                        </div>
                      ))}
                      <div className="w-1/5 h-full relative -mr-px" style={{zIndex: 10}}>
                        {renderTimeZone(timeZones[3], 3)}
                      </div>
                      <div className="w-1/5 h-full">
                        {renderTimeZone(timeZones[4], 4)}
                      </div>
                    </div>
                    
                    {/* Row 2 */}
                    <div className="flex h-[77px] w-full -gap-px">
                      {timeZones.slice(5, 8).map((zone, index) => (
                        <div key={`r2c${index}`} className="w-1/5 h-full -mr-px">
                          {renderTimeZone(zone, index + 5)}
                        </div>
                      ))}
                      <div className="w-1/5 h-full -mr-px" style={{marginTop: "-77px", opacity: 0}}>
                        {/* Spacer for UTC's second row */}
                      </div>
                      <div className="w-1/5 h-full">
                        {renderTimeZone(timeZones[8], 8)}
                      </div>
                    </div>
                    
                    {/* Row 3 */}
                    <div className="flex h-[77px] w-full -gap-px">
                      {timeZones.slice(9).map((zone, index) => (
                        <div key={`r3c${index}`} className="w-1/5 h-full ${index < 3 ? '-mr-px' : ''}">
                          {renderTimeZone(zone, index + 9)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ultra-Minimal Status Bar - Responsive */}
            <div className="absolute bottom-1 left-1 md:left-2 right-1 md:right-2 flex items-center justify-between text-xs text-gray-400/60 font-mono">
              <div className="flex items-center space-x-2 md:space-x-3">
                {/* Status indicators removed */}
              </div>
              <div className="text-xs">
                {missionTime.toISOString().slice(0, 19)}Z
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
  
  // Mobile-optimized timezone renderer
  function renderTimeZoneMobile(zone, index) {
    const isDay = isDaylight(zone.timezone);
    const zoneTime = getTimeForZone(zone.timezone);
    
    return (
      <motion.div
        key={`mobile-card-${zone.code}`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.02 }}
        className="relative bg-black/20 backdrop-blur-sm overflow-hidden border border-white/5 h-full w-full rounded-sm"
      >
        <div className={`
          absolute top-0 left-0 right-0 h-0.5
          ${isDay ? 'bg-yellow-500/40' : 'bg-blue-500/40'}
        `}></div>
        
        <div className="p-1 text-center h-full flex flex-col justify-center">
          <div className="text-white/90 font-medium mb-0.5 text-xs">
            {zone.flag} {zone.code}
          </div>
          <div className="text-white/80 font-mono text-xs mb-0.5">
            {zoneTime}
          </div>
          <div className={`rounded-full mx-auto w-1 h-1 ${isDay ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
        </div>
      </motion.div>
    );
  }

  // Helper function to render time zone cards with enhanced styling
  function renderTimeZone(zone, index) {
    const isDay = isDaylight(zone.timezone);
    const zoneTime = getTimeForZone(zone.timezone);
    const isUTC = zone.code === 'UTC';
    
    return (
      <motion.div
        key={`card-${zone.code}`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.02 }}
        className="relative bg-black/20 backdrop-blur-sm overflow-hidden border-r-[0.5px] border-b-[0.5px] border-white/5 h-full w-full"
        style={{
          height: isUTC ? "154px" : "77px",
          zIndex: isUTC ? 2 : 1,
          borderTop: index < 5 ? '0.5px solid rgba(255,255,255,0.05)' : 'none',
          borderLeft: [0, 5, 9].includes(index) ? '0.5px solid rgba(255,255,255,0.05)' : 'none'
        }}
      >
        <div className={`
          absolute top-0 left-0 right-0 h-0.5
          ${isDay ? 'bg-yellow-500/40' : 'bg-blue-500/40'}
        `}></div>
        
        <div className={`p-0.5 text-center h-full flex flex-col justify-center ${isUTC ? 'py-1' : ''}`}>
          {isUTC ? (
            <>
              <div className="text-xl mb-1">{zone.flag}</div>
              <div className="text-white/90 font-medium mb-1 text-xs">
                {zone.name}
              </div>
            </>
          ) : (
            <div className="text-white/90 font-medium mb-0.5 text-xs">
              {zone.flag} {zone.code}
            </div>
          )}
          <div className={`text-white/80 font-mono mb-0.5 ${isUTC ? 'text-sm' : 'text-xs'}`}>
            {zoneTime}
          </div>
          <div className={`rounded-full mx-auto ${isUTC ? 'w-2 h-2' : 'w-1 h-1'} ${isDay ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
        </div>
      </motion.div>
    );
  }
};

export default MissionControlBoard; 