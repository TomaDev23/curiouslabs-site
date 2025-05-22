/**
 * @component MissionTrackerHUD
 * @description Draggable mission tracker for V6 HUD system
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - MissionTrackerHUD passes LEGIT protocol
 */

import React from 'react';
import withDraggable from './DraggableHOC';
import { MissionTiles, useMission } from '../MissionTracker';
import { useV6HUDContext } from './V6HUDHub';

/**
 * Mission Tracker HUD Content Component
 * @returns {React.ReactElement} Mission tracker UI
 */
function MissionTrackerHUDContent() {
  const { completedMissions, completedTasks, resetMissions, markMissionComplete, markTaskComplete } = useMission();
  const [expanded, setExpanded] = React.useState(true);
  
  const toggleExpanded = () => {
    setExpanded(prev => !prev);
  };
  
  const handleToggleTask = (missionId, taskIndex) => {
    const taskKey = `${missionId}_${taskIndex}`;
    const isCurrentlyComplete = !!completedTasks[taskKey];
    markTaskComplete(missionId, taskIndex, !isCurrentlyComplete);
  };
  
  const handleToggleMission = (missionId) => {
    const isCurrentlyComplete = !!completedMissions[missionId];
    markMissionComplete(missionId, !isCurrentlyComplete);
  };
  
  return (
    <div className="bg-gray-900/90 backdrop-blur-sm text-white rounded-lg border-2 border-green-500 overflow-hidden">
      {/* Header - always visible and draggable */}
      <div className="draggable-handle flex items-center justify-between p-2 bg-green-900 cursor-grab">
        <h3 className="text-xs font-bold">V6 Mission Tracker</h3>
        <div className="flex items-center">
          <button
            onClick={resetMissions}
            className="w-5 h-5 mr-1 flex items-center justify-center rounded hover:bg-green-700 text-xs"
            title="Reset mission progress"
          >
            ↻
          </button>
          <button
            onClick={toggleExpanded}
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-green-700"
          >
            {expanded ? '−' : '+'}
          </button>
        </div>
      </div>
      
      {/* Mission tracker content */}
      {expanded && (
        <div className="p-3 max-h-[60vh] overflow-y-auto">
          <div className="space-y-3">
            {Object.entries(MissionTiles).map(([id, { name, tasks }]) => {
              const isComplete = !!completedMissions[id];
              const tasksCompleted = tasks.filter((_, index) => !!completedTasks[`${id}_${index}`]).length;
              const totalTasks = tasks.length;
              const progressPercent = Math.round((tasksCompleted / totalTasks) * 100);
              
              return (
                <div key={id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <span 
                        className={`w-3 h-3 flex items-center justify-center rounded-full mr-2 
                          ${isComplete ? 'bg-lime-500 text-black' : 'bg-gray-600'} 
                          cursor-pointer hover:opacity-70 text-[8px] font-bold`}
                        onClick={() => handleToggleMission(id)}
                        title={`Toggle completion of ${name}`}
                      >
                        {isComplete ? '✓' : ''}
                      </span>
                      <span className={`font-medium ${isComplete ? 'text-lime-400' : 'text-white'}`}>
                        {name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{tasksCompleted}/{totalTasks}</span>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-1 bg-gray-700 rounded-full mb-2 w-full overflow-hidden">
                    <div 
                      className={`h-full ${isComplete ? 'bg-lime-500' : 'bg-blue-500'}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  
                  <ul className="pl-5 space-y-1">
                    {tasks.map((task, index) => {
                      const isTaskComplete = !!completedTasks[`${id}_${index}`];
                      return (
                        <li key={index} className="flex items-center text-xs">
                          <span 
                            className={`w-4 h-4 flex items-center justify-center rounded-sm mr-2 text-[8px] font-bold
                              ${isTaskComplete ? 'bg-lime-500/60 text-white border border-lime-400' : 'bg-gray-700 border border-gray-600'} 
                              cursor-pointer hover:opacity-70`}
                            onClick={() => handleToggleTask(id, index)}
                            title={`Toggle completion of ${task}`}
                          >
                            {isTaskComplete ? '✓' : ''}
                          </span>
                          <span className={`${isTaskComplete ? 'text-lime-300' : 'text-gray-400'} ${isTaskComplete ? 'line-through opacity-80' : ''}`}>
                            {task}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Create draggable version of MissionTrackerHUD
 */
const DraggableMissionTrackerHUD = withDraggable(MissionTrackerHUDContent, {
  defaultPosition: { x: window.innerWidth - 350, y: 100 },
  zIndex: 10001,
  storageId: 'v6_mission_tracker_position'
});

/**
 * MissionTrackerHUD - exported component
 * @returns {React.ReactElement|null} Draggable Mission Tracker or null if not visible
 */
export default function MissionTrackerHUD() {
  const { hudVisibility } = useV6HUDContext();
  
  // Only render if HUD ID 6 is visible
  if (!hudVisibility['hud_6']) return null;
  
  return <DraggableMissionTrackerHUD />;
} 