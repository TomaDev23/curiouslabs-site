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
  showSlidingControl = true
}) => {
  const [missionTime, setMissionTime] = useState(new Date());
  const [controlMode, setControlMode] = useState('AUTO'); // AUTO or MANUAL
  const [manualPhase, setManualPhase] = useState(null);
  const [slidingControlVisible, setSlidingControlVisible] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lunarEvents, setLunarEvents] = useState(null);
  const [anomalyMode, setAnomalyMode] = useState(null);
  
  // Get real lunar data from our lighting system
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
  
  // Moon phases with extensive controls matching the lighting system
  const moonPhases = [
    { code: 'AUTO', name: 'Auto Sync', value: null, icon: '🔄', status: 'SYNC', color: 'lime' },
    { code: 'NEW', name: 'New Moon', value: 0.0, icon: '🌑', status: 'DARK', color: 'gray' },
    { code: 'WAX_C', name: 'Wax Crescent', value: 0.15, icon: '🌒', status: 'RISE', color: 'blue' },
    { code: 'FIRST', name: 'First Quarter', value: 0.28, icon: '🌓', status: 'HALF', color: 'yellow' },
    { code: 'WAX_G', name: 'Wax Gibbous', value: 0.4, icon: '🌔', status: 'BUILD', color: 'orange' },
    { code: 'FULL', name: 'Full Moon', value: 0.5, icon: '🌕', status: 'MAX', color: 'white' },
    { code: 'WAN_G', name: 'Wan Gibbous', value: 0.6, icon: '🌖', status: 'FADE', color: 'purple' },
    { code: 'LAST', name: 'Last Quarter', value: 0.72, icon: '🌗', status: 'DIM', color: 'cyan' },
    { code: 'WAN_C', name: 'Wan Crescent', value: 0.85, icon: '🌘', status: 'END', color: 'red' }
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

  // Get time for specific timezone
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
      return '--:--:--';
    }
  };

  // Check if timezone is in daylight (rough estimation)
  const isDaylight = (timezone) => {
    const now = new Date();
    const hour = parseInt(new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit'
    }));
    return hour >= 6 && hour < 20; // Rough daylight hours
  };

  // Handle phase selection - THIS ACTUALLY CONTROLS THE MOON!
  const handlePhaseSelect = (phase) => {
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
    
    // Call the parent's phase change handler
    onPhaseChange(phase.value);
  };

  // Get current lunar data using the lune library directly for display
  const getCurrentLunarData = () => {
    try {
      const moonData = lune.phase(new Date());
      const today = new Date();
      const lunarMonth = 29.53059; // Average lunar month in days
      const newMoonRef = new Date('2024-01-11'); // Reference new moon
      const daysSinceNew = (today - newMoonRef) / (1000 * 60 * 60 * 24);
      
      return {
        phase: moonData.phase,
        age: Math.floor(daysSinceNew % lunarMonth),
        illumination: Math.round(moonData.illuminated * 100),
        phaseName: moonData.phase_name || getMoonPhaseDescription(),
        isWaxing: moonData.phase < 0.5,
        nextPhase: getNextPhaseInfo(moonData.phase),
        lunarCycle: Math.floor(daysSinceNew / lunarMonth) + 1,
        distanceKm: getDistanceToEarth(),
        tideInfluence: getTideInfluence()
      };
    } catch (error) {
      console.warn('Failed to get lunar data:', error);
      return {
        phase: realPhase,
        age: 15,
        illumination: Math.round(realPhase * 100),
        phaseName: getMoonPhaseDescription(),
        isWaxing: realPhase < 0.5,
        nextPhase: 'Full Moon',
        lunarCycle: 1,
        distanceKm: 384400, // Average distance
        tideInfluence: 'Neutral'
      };
    }
  };

  // Get next phase information
  const getNextPhaseInfo = (currentPhase) => {
    const phases = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter'];
    const phaseValues = [0, 0.25, 0.5, 0.75];
    
    for (let i = 0; i < phaseValues.length; i++) {
      if (currentPhase < phaseValues[i]) {
        return phases[i];
      }
    }
    return phases[0]; // Next new moon
  };

  const lunarData = getCurrentLunarData();
  
  // Get the current active phase (manual override or real)
  const activePhase = controlMode === 'MANUAL' ? manualPhase : realPhase;
  const selectedPhase = moonPhases.find(p => p.value === activePhase) || moonPhases[0];
  
  // Format the current date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  }).format(missionTime);

  // Toggle anomaly mode
  const toggleAnomalyMode = (mode) => {
    const newMode = anomalyMode === mode ? null : mode;
    setAnomalyMode(newMode);
    
    // Call the parent's anomaly change handler
    onAnomalyChange(newMode);
    
    if (newMode) {
      console.log(`🔮 ANOMALY MODE ACTIVATED: ${newMode}`);
    } else {
      console.log(`🔮 ANOMALY MODE DEACTIVATED`);
    }
  };

  return (
    <>
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
            height: '31vh',
            minHeight: '250px',
            maxHeight: '380px',
            marginTop: '-15vh',
            boxShadow: '0 0 25px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(131, 204, 22, 0.18)',
          }}
        >
          {/* Integrated Mission Control Header with Toggle Button */}
          <div className="pt-2 pb-1.5 px-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className={`w-1.5 h-1.5 rounded-full ${controlMode === 'AUTO' ? 'bg-lime-400' : 'bg-orange-400'}`