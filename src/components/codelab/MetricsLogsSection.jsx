import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Simple hook for animating number counting
const useCountAnimation = (targetValue, duration = 2, start = 0) => {
  const [count, setCount] = useState(start);
  const shouldReduceMotion = useReducedMotion();
  const countRef = useRef(targetValue);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    countRef.current = targetValue;
  }, [targetValue]);
  
  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setCount(targetValue);
      return;
    }
    
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * (countRef.current - start) + start));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, duration, start, shouldReduceMotion, targetValue]);
  
  return [count, setIsInView];
};

const MetricsLogsSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Metrics data
  const metrics = [
    { id: 1, value: 98, suffix: "%", label: "Quality Assurance Rate" },
    { id: 2, value: 340, suffix: "+", label: "Projects Completed" },
    { id: 3, value: 65, suffix: "%", label: "Faster Development" },
    { id: 4, value: 24, suffix: "/7", label: "Support Availability" }
  ];
  
  // Recent logs data
  const recentLogs = [
    { 
      id: 1, 
      timestamp: "2 hours ago", 
      status: "Completed", 
      title: "React Component Refactoring",
      description: "Optimized performance by 32% through component restructuring"
    },
    { 
      id: 2, 
      timestamp: "3 hours ago", 
      status: "In Progress", 
      title: "API Integration",
      description: "Adding OAuth2 support to existing endpoints"
    },
    { 
      id: 3, 
      timestamp: "5 hours ago", 
      status: "Completed", 
      title: "Bug Fix: Memory Leak",
      description: "Resolved event listener cleanup in useEffect hook"
    },
    { 
      id: 4, 
      timestamp: "1 day ago", 
      status: "Verified", 
      title: "Mobile Responsive UI",
      description: "Implemented breakpoint-based layout adjustments"
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Initialize count animations for each metric
  const metricCounters = metrics.map(metric => {
    const [count, setIsInView] = useCountAnimation(metric.value);
    
    // When the section comes into view, trigger the counting animation
    useEffect(() => {
      setIsInView(isInView);
    }, [isInView, setIsInView]);
    
    return count;
  });

  return (
    <motion.section
      ref={sectionRef}
      className="py-20 relative"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.span className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3 block" variants={itemVariants}>
            Track Record
          </motion.span>
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white mb-4" variants={itemVariants}>
            CodeLab Impact & Activity
          </motion.h2>
          <motion.p className="max-w-2xl mx-auto text-gray-300 text-lg" variants={itemVariants}>
            Real-time insights into our performance metrics and the latest development activities.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Metrics Panel */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6 md:p-8 shadow-xl">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-8">Performance Metrics</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {metrics.map((metric, index) => (
                  <motion.div 
                    key={metric.id}
                    className="flex flex-col"
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-2 h-1.5 bg-gradient-to-r from-purple-600/30 to-transparent rounded-full"></div>
                    <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
                      {metricCounters[index]}{metric.suffix}
                    </div>
                    <div className="text-gray-400 mt-1">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Logs Panel */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6 md:p-8 shadow-xl">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-8">Recent Activity</h3>
              
              <div className="space-y-4">
                {recentLogs.map((log, index) => (
                  <motion.div 
                    key={log.id}
                    className="bg-black/30 border border-purple-500/10 hover:border-purple-500/30 rounded-xl p-4 transition-all duration-300"
                    variants={itemVariants}
                    custom={index}
                    whileHover={{ 
                      x: 5,
                      borderColor: "rgba(139, 92, 246, 0.3)",
                      boxShadow: "0 4px 12px -4px rgba(139, 92, 246, 0.2)"
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs text-gray-500">{log.timestamp}</div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        log.status === "Completed" ? "bg-green-900/30 text-green-400" :
                        log.status === "In Progress" ? "bg-blue-900/30 text-blue-400" :
                        log.status === "Verified" ? "bg-purple-900/30 text-purple-400" :
                        "bg-gray-900/30 text-gray-400"
                      }`}>
                        {log.status}
                      </div>
                    </div>
                    <h4 className="text-white font-semibold mb-1">{log.title}</h4>
                    <p className="text-gray-400 text-sm">{log.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default MetricsLogsSection; 