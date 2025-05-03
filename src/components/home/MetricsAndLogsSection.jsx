import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MetricsAndLogsSection() {
  // Metrics data
  const metrics = [
    { label: "Bugs Resolved", value: 2483, icon: "🐛" },
    { label: "Tests Written", value: 15792, icon: "✅" },
    { label: "Deployments", value: 347, icon: "🚀" },
    { label: "AI Commits", value: 8261, icon: "🤖" }
  ];

  // Logs data
  const logs = [
    { text: "Fixed parser bug in OpsPipe v2.1.3", time: "2m ago", type: "fix" },
    { text: "Deployed Guardian security patch", time: "17m ago", type: "deploy" },
    { text: "Added 142 unit tests to CodeLab", time: "1h ago", type: "test" },
    { text: "Optimized CI/CD pipeline - 32% faster", time: "3h ago", type: "optimize" },
    { text: "Released DataForge v1.2 to production", time: "6h ago", type: "release" },
    { text: "Patched Kubernetes cluster vulnerability", time: "12h ago", type: "security" }
  ];

  // Animation variants for metrics
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Animation variants for logs
  const logContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const logItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Animated counter component
  const AnimatedCounter = ({ value }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      // Simple counter animation
      let start = 0;
      const end = value;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // Update every 16ms (60fps)
      
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [value]);
    
    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          📊 CuriousLabs Activity Log
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Metrics Column */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl text-purple-300 font-semibold">Real-time Metrics</h3>
            
            <div className="grid grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{metric.icon}</span>
                    <h4 className="text-gray-300 font-medium">{metric.label}</h4>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={metric.value} />
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Logs Column */}
          <motion.div
            className="space-y-6"
            variants={logContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-xl text-purple-300 font-semibold">Latest Activity</h3>
            
            <div className="space-y-3">
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  variants={logItemVariants}
                  className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-lg border-l-4 border-purple-500"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-white">{log.text}</p>
                    <span className="text-xs text-gray-400 ml-2">{log.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 