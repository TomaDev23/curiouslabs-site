import React from 'react';
import { motion } from 'framer-motion';

/**
 * ProjectsSection component with project cards
 * Self-contained with no external dependencies
 */
export default function ProjectsSection() {
  // Projects data with placeholder images
  const projects = [
    {
      title: "CodeLab",
      description: "Interactive development environment with real-time collaboration and AI-assisted coding features.",
      emoji: "🧪",
      color: "bg-purple-600 hover:bg-purple-500"
    },
    {
      title: "OpsPipe",
      description: "Streamlined CI/CD pipeline automation with intelligent workflow optimization and monitoring.",
      emoji: "🔄",
      color: "bg-fuchsia-600 hover:bg-fuchsia-500"
    },
    {
      title: "Guardian",
      description: "Advanced security monitoring and threat detection for cloud infrastructure and applications.",
      emoji: "🛡️",
      color: "bg-red-600 hover:bg-red-500"
    },
    {
      title: "DataForge",
      description: "Data processing engine with ML-powered analytics and visualization capabilities.",
      emoji: "📊",
      color: "bg-teal-600 hover:bg-teal-500"
    },
    {
      title: "CloudPath",
      description: "Multi-cloud resource management with cost optimization and infrastructure as code integration.",
      emoji: "☁️",
      color: "bg-blue-600 hover:bg-blue-500"
    },
    {
      title: "Sentinel",
      description: "Intelligent system monitoring with predictive alerting and automated incident response.",
      emoji: "🔍",
      color: "bg-indigo-600 hover:bg-indigo-500"
    }
  ];

  // Animation variants for scroll and hover effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
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

  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-black py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">Our Projects</h2>
        <p className="text-xl text-gray-300 mb-16 text-center max-w-3xl mx-auto">
          Explore our innovative solutions designed to transform your digital infrastructure
          and development workflows.
        </p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`rounded-xl ${project.color} p-6 hover:scale-105 transition-all duration-300`}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">{project.emoji}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
              <p className="text-gray-100">{project.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 