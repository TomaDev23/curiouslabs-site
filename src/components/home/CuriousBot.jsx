import { motion } from "framer-motion";

/**
 * CuriousBot component - a floating assistant in the bottom-right corner
 * Self-contained with no external dependencies
 */
export default function CuriousBot() {
  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        bounce: 0.5,
        delay: 1.5, 
        duration: 0.8 
      }}
    >
      <motion.button
        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 border-2 border-white/10"
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)",
          rotate: [0, -10, 10, -10, 0]
        }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="text-2xl">🤖</span>
      </motion.button>
      
      <motion.div 
        className="absolute bottom-full right-0 mb-4 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-xl text-white text-sm max-w-[200px] shadow-lg"
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
      >
        <div className="relative">
          <p>Need help? Click to chat with Curious!</p>
          <div className="absolute bottom-[-8px] right-3 w-4 h-4 bg-purple-600 transform rotate-45"></div>
        </div>
      </motion.div>
    </motion.div>
  );
} 