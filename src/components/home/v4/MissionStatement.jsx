import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal, sectionVariants, itemVariants } from '../../../utils/animation';

/**
 * MissionStatement - "Our Mission" section
 * Features animated mission statement with space-themed design elements
 */
const MissionStatement = () => {
  // Get scroll reveal functionality
  const { ref, inView } = useScrollReveal(0.2);
  
  // Mission stats
  const stats = [
    { label: 'Projects Completed', value: '250+' },
    { label: 'Code Quality', value: '99.8%' },
    { label: 'Client Satisfaction', value: '4.9/5' },
    { label: 'Team Members', value: '12' }
  ];
  
  return (
    <motion.section 
      ref={ref}
      className="relative pt-32 pb-32 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      viewport={{ once: true }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-900/70"></div>
      
      {/* Standardized nebula positioning - one top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-curious-purple-600/20 via-curious-blue-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      {/* Standardized nebula positioning - one bottom-left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-curious-blue-600/20 via-curious-purple-400/10 to-transparent rounded-full filter blur-[80px] opacity-30"></div>
      
      {/* Standardized particle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-white opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-y ${2 + Math.random() * 3}s ease-in-out infinite alternate`
            }}
          ></div>
        ))}
      </div>
      
      {/* Star burst */}
      <motion.div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.15, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-[1px] h-[1px] relative left-1/2">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-[600px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              style={{ transform: `rotate(${i * 22.5}deg)` }}
            />
          ))}
        </div>
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-curious-purple-400 to-curious-blue-400 bg-clip-text text-transparent text-center mb-12">
          Our Mission
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div variants={itemVariants}>
            <motion.p 
              variants={itemVariants} 
              className="text-base md:text-lg text-gray-300 leading-relaxed mb-6"
            >
              At CuriousLabs, we're pioneering a new approach to software development. 
              We combine cutting-edge AI technologies with human expertise to solve the most 
              challenging coding problems with unprecedented efficiency.
            </motion.p>
            
            <motion.p 
              variants={itemVariants} 
              className="text-base md:text-lg text-gray-300 leading-relaxed mb-10"
            >
              Our mission is to transform the software development lifecycle, making it 
              more accessible, efficient, and enjoyable for developers of all skill levels. 
              We're building the future of collaborative AI-assisted coding.
            </motion.p>
            
            {/* Mission stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="bg-gray-900/70 backdrop-blur-md p-4 rounded-2xl border border-gray-700 hover:border-curious-purple-700/40 shadow-curious-purple-600/30"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)" }}
                  variants={itemVariants}
                  custom={index}
                >
                  <div className="text-4xl font-bold tracking-tight bg-gradient-to-r from-curious-purple-400 to-curious-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Column - Space Station Illustration */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Space station design using CSS */}
              <div className="absolute inset-0 bg-gray-900/70 rounded-full border border-gray-700 backdrop-blur-md"></div>
              
              {/* Orbital rings */}
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-curious-purple-500/30 rounded-full"></div>
              </motion.div>
              
              <motion.div 
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border border-curious-blue-500/30 rounded-full"></div>
              </motion.div>
              
              {/* Central hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-gradient-to-br from-curious-purple-900/80 to-gray-900/80 rounded-full border border-curious-purple-500/50 backdrop-blur-md">
                {/* Pulsing core */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-gradient-to-br from-curious-purple-500 to-curious-blue-500 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
              </div>
              
              {/* Orbital satellites */}
              <motion.div 
                className="absolute top-[10%] left-[10%] w-4 h-4 bg-curious-blue-500 rounded-full shadow-lg shadow-curious-blue-500/50"
                animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 10px 2px rgba(59, 130, 246, 0.5)", "0 0 20px 4px rgba(59, 130, 246, 0.7)", "0 0 10px 2px rgba(59, 130, 246, 0.5)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              
              <motion.div 
                className="absolute bottom-[20%] right-[15%] w-6 h-6 bg-curious-purple-500 rounded-full shadow-lg shadow-curious-purple-500/50"
                animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 10px 2px rgba(147, 51, 234, 0.5)", "0 0 20px 4px rgba(147, 51, 234, 0.7)", "0 0 10px 2px rgba(147, 51, 234, 0.5)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
              
              <motion.div 
                className="absolute top-[60%] left-[20%] w-5 h-5 bg-curious-green-500 rounded-full shadow-lg shadow-curious-green-500/50"
                animate={{ scale: [1, 1.2, 1], boxShadow: ["0 0 10px 2px rgba(16, 185, 129, 0.5)", "0 0 20px 4px rgba(16, 185, 129, 0.7)", "0 0 10px 2px rgba(16, 185, 129, 0.5)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MissionStatement; 