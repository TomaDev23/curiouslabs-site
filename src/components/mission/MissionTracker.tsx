import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface MissionTask {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  subtasks: {
    id: string;
    title: string;
    completed: boolean;
    description: string;
  }[];
}

interface MissionContextType {
  tasks: MissionTask[];
  updateTaskStatus: (taskId: string, completed: boolean) => void;
  updateSubtaskStatus: (taskId: string, subtaskId: string, completed: boolean) => void;
  devMode: boolean;
  toggleDevMode: () => void;
}

const MissionContext = createContext<MissionContextType | null>(null);

export const useMission = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission must be used within a MissionProvider');
  }
  return context;
};

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<MissionTask[]>([
    {
      id: 'tile-a',
      title: 'Core Foundation',
      description: 'Core system setup and device capability management',
      completed: true,
      subtasks: [
        { 
          id: 'a1', 
          title: 'Device Capability Detection', 
          completed: true,
          description: 'WebGL, canvas support, and performance tier detection'
        },
        { 
          id: 'a2', 
          title: 'Performance Optimization', 
          completed: true,
          description: 'FPS management and resource optimization'
        },
        { 
          id: 'a3', 
          title: 'Mission Progress System', 
          completed: true,
          description: 'Task tracking and progress visualization'
        },
      ],
    },
    {
      id: 'tile-b',
      title: 'Background System',
      description: 'Visual effects and background management',
      completed: true,
      subtasks: [
        { 
          id: 'b1', 
          title: 'Cosmic Background', 
          completed: true,
          description: 'Gradient effects and base layer management'
        },
        { 
          id: 'b2', 
          title: 'Starfield System', 
          completed: true,
          description: 'Performance-optimized star rendering'
        },
        { 
          id: 'b3', 
          title: 'Grid Overlay', 
          completed: true,
          description: 'Perspective grid with performance tiers'
        },
      ],
    },
    {
      id: 'tile-c',
      title: 'Hero Elements',
      description: 'Main hero section components',
      completed: false,
      subtasks: [
        { 
          id: 'c1', 
          title: 'Logo Transitions', 
          completed: false,
          description: 'AnimatePresence-based logo animations'
        },
        { 
          id: 'c2', 
          title: 'Planet Textures', 
          completed: false,
          description: 'Dynamic texture loading system'
        },
        { 
          id: 'c3', 
          title: 'Text Reveal System', 
          completed: false,
          description: 'Staggered text animations'
        },
      ],
    },
  ]);

  const [devMode, setDevMode] = useState(true); // Set to true for development

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('v6_mission_progress');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (err) {
      console.error('Failed to load mission progress:', err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('v6_mission_progress', JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save mission progress:', err);
    }
  }, [tasks]);

  const updateTaskStatus = (taskId: string, completed: boolean) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed, subtasks: task.subtasks.map(st => ({ ...st, completed })) }
        : task
    ));
  };

  const updateSubtaskStatus = (taskId: string, subtaskId: string, completed: boolean) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(st =>
          st.id === subtaskId ? { ...st, completed } : st
        );
        const allCompleted = updatedSubtasks.every(st => st.completed);
        return { ...task, completed: allCompleted, subtasks: updatedSubtasks };
      }
      return task;
    }));
  };

  const toggleDevMode = () => setDevMode(prev => !prev);

  return (
    <MissionContext.Provider value={{ tasks, updateTaskStatus, updateSubtaskStatus, devMode, toggleDevMode }}>
      {children}
      <AnimatePresence>
        {devMode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed top-4 right-4 bg-black/90 p-4 rounded-lg text-white text-sm z-50 w-64"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-purple-400">V6 Mission Tracker</h3>
              <button 
                onClick={toggleDevMode}
                className="text-gray-400 hover:text-white text-xs"
              >
                Hide
              </button>
            </div>
            <div className="space-y-4">
              {tasks.map(task => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      task.completed ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <span className="font-medium">{task.title}</span>
                  </div>
                  <div className="text-xs text-gray-400 ml-5 mb-2">
                    {task.description}
                  </div>
                  <div className="ml-5 space-y-1">
                    {task.subtasks.map(subtask => (
                      <div key={subtask.id} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-1 ${
                          subtask.completed ? 'bg-green-400/50' : 'bg-gray-600'
                        }`} />
                        <div>
                          <div className="text-gray-300">{subtask.title}</div>
                          <div className="text-xs text-gray-500">{subtask.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MissionContext.Provider>
  );
};

export default MissionProvider; 