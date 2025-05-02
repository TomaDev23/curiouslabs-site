import { motion } from "framer-motion";

/**
 * Enhanced hero content with branded messaging
 * Designed to work within the existing HeroFloatLayer
 */
export default function HeroContent() {
  return (
    <div className="text-center space-y-6">
      <motion.h1 
        className="text-5xl md:text-6xl lg:text-7xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Elite AI CodeOps 🤖
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-gray-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Building AI tools for the future.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-lg font-medium shadow-lg hover:shadow-purple-500/20 transition duration-300 transform hover:-translate-y-1">
          Explore CodeLab
        </button>
      </motion.div>
    </div>
  );
} 