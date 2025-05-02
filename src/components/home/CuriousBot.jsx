import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CuriousBot Assistant Component - Phase 1 Placeholder
 * Will be fully implemented in Phase 5
 */
const CuriousBot = ({ isLowPerf = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5, type: "spring" }}
    >
      <motion.button
        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 border-2 border-white/10"
        whileHover={{ scale: isLowPerf ? 1 : 1.1 }}
        whileTap={{ scale: isLowPerf ? 0.95 : 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl">🤖</span>
      </motion.button>
      
      {isOpen && (
        <motion.div 
          className="absolute bottom-20 right-0 w-80 bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg">🤖</span>
                </div>
                <span className="font-bold text-white">Curious</span>
              </div>
              
              <button className="text-white/80 hover:text-white" onClick={() => setIsOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
              <p className="text-white text-sm">
                Hello! I'm Curious, your AI assistant. How can I help you with your project today?
              </p>
            </div>
            
            <div className="mt-4">
              <input 
                type="text" 
                className="w-full bg-gray-800/70 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ask me anything..."
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CuriousBot; 