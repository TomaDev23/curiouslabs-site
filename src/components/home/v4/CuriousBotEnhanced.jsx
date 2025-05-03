import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * CuriousBotEnhanced - An improved version of the CuriousBot component
 * Features animated bot movements, voice lines, and interactive elements
 */
const CuriousBotEnhanced = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  // Bot messages for the typing animation
  const messages = [
    "Hello explorer! Need assistance with your mission?",
    "I can help debug your code or explain concepts.",
    "Want to see our latest projects? Just ask!",
    "Curious about our services? I'm here to help."
  ];
  
  // Auto-rotate through messages
  useEffect(() => {
    if (isExpanded) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [isExpanded, messages.length]);
  
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 1 
      }}
    >
      {/* Bot Messages Bubble */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="bg-gray-900/90 backdrop-blur-md rounded-2xl p-4 mb-4 max-w-xs border border-purple-500/30 shadow-lg shadow-purple-500/20"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 mt-1 animate-pulse"></div>
              <div className="text-xs text-green-400 font-mono">CURIOUS-BOT</div>
            </div>
            
            <div className="min-h-[60px] font-medium text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  className="typewriter relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {messages[currentMessage]}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="bg-purple-600/40 hover:bg-purple-600/60 text-xs py-1 px-3 rounded-full text-white transition-colors">
                Projects
              </button>
              <button className="bg-blue-600/40 hover:bg-blue-600/60 text-xs py-1 px-3 rounded-full text-white transition-colors">
                Services
              </button>
              <button className="bg-green-600/40 hover:bg-green-600/60 text-xs py-1 px-3 rounded-full text-white transition-colors">
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bot Avatar Button */}
      <motion.button
        className="relative bg-gray-900 rounded-full w-16 h-16 flex items-center justify-center shadow-lg shadow-purple-500/20 border-2 border-purple-500/50 overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05, borderColor: "rgba(147, 51, 234, 0.8)" }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={{ 
          rotate: isHovering ? [0, -5, 5, -5, 5, 0] : 0,
          y: isHovering ? [0, -3, 0] : 0 
        }}
        transition={{ 
          rotate: { repeat: isHovering ? Infinity : 0, duration: 1.5 },
          y: { repeat: isHovering ? Infinity : 0, duration: 1.5 } 
        }}
      >
        {/* Animated Bot Face */}
        <div className="relative w-10 h-10">
          {/* Bot Head */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-600"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          
          {/* Bot Eyes */}
          <div className="absolute w-full h-full flex items-center justify-around px-1">
            <motion.div 
              className="w-2 h-2 rounded-full bg-gray-900"
              animate={{ 
                scaleY: isExpanded ? [1, 0.1, 1] : 1,
                x: isExpanded ? [0, 0.5, 0] : 0
              }}
              transition={{ 
                repeat: isExpanded ? Infinity : 0, 
                repeatDelay: 2,
                duration: 0.3 
              }}
            />
            <motion.div 
              className="w-2 h-2 rounded-full bg-gray-900"
              animate={{ 
                scaleY: isExpanded ? [1, 0.1, 1] : 1,
                x: isExpanded ? [0, -0.5, 0] : 0
              }}
              transition={{ 
                repeat: isExpanded ? Infinity : 0, 
                repeatDelay: 2,
                duration: 0.3 
              }}
            />
          </div>
          
          {/* Bot Mouth */}
          <motion.div 
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 rounded-full bg-gray-900"
            animate={{ 
              width: isExpanded ? [16, 10, 16] : 16,
              height: isExpanded ? [4, 6, 4] : 4
            }}
            transition={{ 
              repeat: isExpanded ? Infinity : 0, 
              repeatDelay: 1,
              duration: 0.5 
            }}
          />
        </div>
        
        {/* Glowing Notification */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div 
              className="absolute top-0 right-0 w-4 h-4 rounded-full bg-green-400"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              exit={{ scale: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </AnimatePresence>
      </motion.button>
      
      {/* Radial pulses when expanded */}
      {isExpanded && (
        <div className="absolute inset-0">
          <motion.div 
            className="w-full h-full rounded-full border-2 border-purple-500 absolute"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          />
          <motion.div 
            className="w-full h-full rounded-full border-2 border-purple-500 absolute"
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />
        </div>
      )}
    </motion.div>
  );
};

export default CuriousBotEnhanced; 