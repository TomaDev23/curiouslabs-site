import { motion } from "framer-motion";

/**
 * MissionStatus component - floating level indicator in the top-left corner
 * Self-contained with no external dependencies
 */
export default function MissionStatus() {
  return (
    <motion.div 
      className="fixed top-24 left-6 z-40"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <div className="bg-gray-900/50 backdrop-blur-md rounded-lg border border-gray-700/50 p-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-sm font-bold"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            42
          </motion.div>
          
          <div>
            <div className="text-xs text-gray-400 mb-1">Mission Level</div>
            <div className="h-2 w-24 bg-gray-700 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ delay: 2.5, duration: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 