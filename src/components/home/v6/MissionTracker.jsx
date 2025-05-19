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
      'Hero Sequence',
      'Animation System'
    ]
  },
  TILE_D: {
    name: 'Product Showcase',
    tasks: [
      'Product Section',
      'Horizontal Scroll',
      'Planet Visualization',
      'Interactive Elements'
    ]
  },
  TILE_E: {
    name: 'Testing & Optimization',
    tasks: [
      'Performance Testing',
      'Accessibility Checks',
      'Cross-browser Testing',
      'Mobile Optimization'
    ]
  },
  TILE_F: {
    name: 'Final Integration',
    tasks: [
      'Route Configuration',
      'Analytics Integration',
      'Final QA',
      'Documentation'
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
  const [completedMissions, setCompletedMissions] = useState({});
  const [completedTasks, setCompletedTasks] = useState({});
  const [isDevMode, setIsDevMode] = useState(false);
  
  // Load saved mission progress on mount
  useEffect(() => {
    try {
      const savedMissions = localStorage.getItem('v6_mission_progress');
      const savedTasks = localStorage.getItem('v6_task_progress');
      
      if (savedMissions) {
        setCompletedMissions(JSON.parse(savedMissions));
      }
      
      if (savedTasks) {
        setCompletedTasks(JSON.parse(savedTasks));
      }
      
      // Check if in development mode
      setIsDevMode(process.env.NODE_ENV === 'development');
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
      
      {/* Developer mode mission tracker overlay */}
      {isDevMode && (
        <div className="fixed bottom-4 right-4 bg-opacity-80 bg-gray-900 p-4 rounded-lg shadow-lg z-50 text-sm">
          <h3 className="font-bold text-purple-400 mb-2">V6 Mission Tracker</h3>
          <div className="space-y-3">
            {Object.entries(MissionTiles).map(([id, { name, tasks }]) => (
              <div key={id}>
                <div className="flex items-center mb-1">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    completedMissions[id] ? 'bg-lime-400' : 'bg-gray-500'
                  }`} />
                  <span className="text-white font-medium">{name}</span>
                </div>
                <ul className="pl-5 space-y-1">
                  {tasks.map((task, index) => (
                    <li key={index} className="flex items-center text-xs">
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        completedTasks[`${id}_${index}`] ? 'bg-lime-400/50' : 'bg-gray-600'
                      }`} />
                      <span className="text-gray-400">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </MissionContext.Provider>
  );
};

export default MissionProvider; 