/**
 * @component MissionTracker
 * @description Tracks implementation progress for V6 website components
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - MissionTracker passes LEGIT protocol
 */

import React, { useState, useEffect, createContext, useContext } from 'react';

// Define mission tiles with subtasks
export const MissionTiles = {
  TILE_A: {
    name: 'Core Foundation',
    tasks: [
      'Scene Controller Setup',
      'Device Capability Detection',
      'Performance Optimization',
      'Mission Tracking System'
    ]
  },
  TILE_B: {
    name: 'Background System',
    tasks: [
      'Starfield Canvas',
      'Grid Overlay',
      'Nebula Effects',
      'Performance Tiers'
    ]
  },
  TILE_C: {
    name: 'Hero Elements',
    tasks: [
      'Planet 3D Implementation',
      'Adaptive Planet Component',
      'Z-Pattern Layout',
      'Animation System'
    ]
  },
  TILE_D: {
    name: 'Product Showcase',
    tasks: [
      'Services Orbital Component',
      'Card Rotation System',
      'Service Details View',
      'Interactive Elements'
    ]
  },
  TILE_E: {
    name: 'HUD System',
    tasks: [
      'Draggable HOC',
      'HUD Hub Component',
      'Mission Tracker Integration',
      'Section Control Panel'
    ]
  },
  TILE_F: {
    name: 'Layout & Optimization',
    tasks: [
      'Z-Pattern Finalization',
      'Responsive Layout',
      'Performance Testing',
      'Section Boundaries'
    ]
  },
  TILE_G: {
    name: 'Documentation',
    tasks: [
      'LEGIT Contracts',
      'HUD Documentation',
      'Developer Guides',
      'Mission Reports'
    ]
  }
};

// Create context
const MissionContext = createContext({
  completedMissions: {},
  completedTasks: {},
  markMissionComplete: () => {},
  markTaskComplete: () => {},
  resetMissions: () => {}
});

export const useMission = () => useContext(MissionContext);

export const MissionProvider = ({ children }) => {
  // Initial state with predefined completed items
  const initialMissions = {
    'TILE_A': true,
    'TILE_B': true,
    'TILE_C': true, 
    'TILE_D': true,
    'TILE_E': true,
    'TILE_F': false,
    'TILE_G': false
  };
  
  const initialTasks = {
    // TILE_A: Core Foundation
    'TILE_A_0': true, // Scene Controller Setup
    'TILE_A_1': true, // Device Capability Detection
    'TILE_A_2': true, // Performance Optimization
    'TILE_A_3': true, // Mission Tracking System
    
    // TILE_B: Background System
    'TILE_B_0': true, // Starfield Canvas
    'TILE_B_1': true, // Grid Overlay
    'TILE_B_2': true, // Nebula Effects
    'TILE_B_3': true, // Performance Tiers
    
    // TILE_C: Hero Elements
    'TILE_C_0': true, // Planet 3D Implementation
    'TILE_C_1': true, // Adaptive Planet Component
    'TILE_C_2': true, // Z-Pattern Layout
    'TILE_C_3': true, // Animation System
    
    // TILE_D: Product Showcase
    'TILE_D_0': true, // Services Orbital Component
    'TILE_D_1': true, // Card Rotation System
    'TILE_D_2': true, // Service Details View
    'TILE_D_3': true, // Interactive Elements
    
    // TILE_E: HUD System
    'TILE_E_0': true, // Draggable HOC
    'TILE_E_1': true, // HUD Hub Component
    'TILE_E_2': true, // Mission Tracker Integration
    'TILE_E_3': false, // Section Control Panel
    
    // TILE_F: Layout & Optimization
    'TILE_F_0': true, // Z-Pattern Finalization
    'TILE_F_1': true, // Responsive Layout
    'TILE_F_2': false, // Performance Testing
    'TILE_F_3': false, // Section Boundaries
    
    // TILE_G: Documentation
    'TILE_G_0': true, // LEGIT Contracts
    'TILE_G_1': true, // HUD Documentation
    'TILE_G_2': false, // Developer Guides
    'TILE_G_3': true  // Mission Reports
  };
  
  const [completedMissions, setCompletedMissions] = useState(initialMissions);
  const [completedTasks, setCompletedTasks] = useState(initialTasks);
  
  // Load saved mission progress on mount
  useEffect(() => {
    try {
      const savedMissions = localStorage.getItem('v6_mission_progress');
      const savedTasks = localStorage.getItem('v6_task_progress');
      
      if (savedMissions) {
        setCompletedMissions(prev => ({
          ...prev,
          ...JSON.parse(savedMissions)
        }));
      } else {
        // Store initial values to localStorage if none exist
        localStorage.setItem('v6_mission_progress', JSON.stringify(initialMissions));
      }
      
      if (savedTasks) {
        setCompletedTasks(prev => ({
          ...prev,
          ...JSON.parse(savedTasks)
        }));
      } else {
        // Store initial values to localStorage if none exist
        localStorage.setItem('v6_task_progress', JSON.stringify(initialTasks));
      }
    } catch (err) {
      console.error('Failed to load mission progress:', err);
    }
  }, []);
  
  // Save mission progress when updated
  useEffect(() => {
    try {
      localStorage.setItem('v6_mission_progress', JSON.stringify(completedMissions));
      localStorage.setItem('v6_task_progress', JSON.stringify(completedTasks));
    } catch (err) {
      console.error('Failed to save mission progress:', err);
    }
  }, [completedMissions, completedTasks]);
  
  // Mark a mission as complete
  const markMissionComplete = (missionId, isComplete = true) => {
    setCompletedMissions(prev => ({
      ...prev,
      [missionId]: isComplete
    }));
  };
  
  // Mark a task as complete
  const markTaskComplete = (missionId, taskIndex, isComplete = true) => {
    setCompletedTasks(prev => ({
      ...prev,
      [`${missionId}_${taskIndex}`]: isComplete
    }));
    
    // Check if all tasks are complete for this mission
    const allTasksComplete = MissionTiles[missionId].tasks.every(
      (_, index) => completedTasks[`${missionId}_${index}`]
    );
    
    if (allTasksComplete) {
      markMissionComplete(missionId, true);
    }
  };
  
  // Reset all mission progress
  const resetMissions = () => {
    setCompletedMissions({});
    setCompletedTasks({});
  };
  
  return (
    <MissionContext.Provider value={{ 
      completedMissions, 
      completedTasks,
      markMissionComplete, 
      markTaskComplete,
      resetMissions 
    }}>
      {children}
      
      {/* Mission tracker moved to V6HUDSystem as MissionTrackerHUD component */}
    </MissionContext.Provider>
  );
};

export default MissionProvider; 