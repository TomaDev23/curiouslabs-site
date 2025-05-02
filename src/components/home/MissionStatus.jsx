import React from 'react';
import { motion } from 'framer-motion';

/**
 * Mission Status Component - Phase 1 Placeholder
 * Will be fully implemented in Phase 5
 */
const MissionStatus = ({ isLowPerf = false }) => {
  return (
    <motion.div 
      className="fixed top-24 left-6 z-40"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-gray-700/50 p-2 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-xs font-bold">
            42
          </div>
          <div>
            <div className="text-xs text-gray-400">Mission Level</div>
            <div className="h-1.5 w-20 bg-gray-700 rounded-full mt-1">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full" 
                style={{ width: '0%' }}
                animate={{ width: '65%' }}
                transition={{ delay: 2, duration: isLowPerf ? 0.3 : 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MissionStatus; 