import { motion } from "framer-motion";

/**
 * Hero component with a starfield background and content
 * Self-contained with no external dependencies
 */
export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900/10 to-black overflow-hidden">
      {/* Canvas Starfield Background */}
      <div className="absolute inset-0 z-0">
        <canvas className="w-full h-full bg-black" id="starfield-canvas"></canvas>
      </div>
      
      {/* Hero Content */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Elite AI CodeOps 🤖
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Building AI tools for the future. Submit your bugs, and we return clean, test-passing code.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-lg font-medium shadow-lg hover:shadow-purple-500/20 transition duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.5)" }}
            whileTap={{ scale: 0.98 }}
          >
            Explore CodeLab
          </motion.button>
          
          <motion.button 
            className="px-8 py-4 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white rounded-xl text-lg font-medium transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
} 