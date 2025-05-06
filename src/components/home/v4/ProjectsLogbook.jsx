import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useBreakpoint } from '../../../hooks/useBreakpoint.js';

/**
 * ProjectsLogbook - "Mission Logbook" section for displaying projects
 * Features terminal-style interface with CLI aesthetic for project display
 */
const ProjectsLogbook = () => {
  const prefersReducedMotion = useReducedMotion();
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  
  // Project data
  const projects = [
    {
      id: 1,
      title: 'CodeLab',
      slug: 'codelab',
      description: 'Interactive development environment with real-time collaboration and AI-assisted coding features.',
      icon: '🧪',
      iconColor: 'text-purple-400',
      colorClass: 'bg-gradient-to-r from-purple-500 to-purple-700',
      glowColor: 'bg-purple-500',
      tags: ['react', 'ai', 'collaboration', 'vscode-extension']
    },
    {
      id: 2,
      title: 'OpsPipe',
      slug: 'opspipe',
      description: 'Streamlined CI/CD pipeline automation with intelligent workflow optimization and monitoring.',
      icon: '🔄',
      iconColor: 'text-pink-400',
      colorClass: 'bg-gradient-to-r from-pink-500 to-purple-700',
      glowColor: 'bg-pink-500',
      tags: ['pipeline', 'automation', 'devops', 'monitoring']
    },
    {
      id: 3,
      title: 'MoonSignal',
      slug: 'moonsignal',
      description: 'Advanced anomaly detection system with AI-powered insights and real-time alerts for critical systems.',
      icon: '📡',
      iconColor: 'text-blue-400',
      colorClass: 'bg-gradient-to-r from-blue-500 to-indigo-700',
      glowColor: 'bg-blue-500',
      tags: ['ml', 'monitoring', 'alerts', 'anomaly-detection']
    }
  ];
  
  // Animation variants - optimized for mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <motion.section 
      className="relative pt-32 pb-32 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3,
        delay: 0.1,
        ease: "easeOut"
      }}
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-gray-900/50 to-gray-900/0"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3,
                delay: 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} variants={cardVariants} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.3,
            delay: 0.1,
            ease: "easeOut"
          }}
        >
          <motion.button
            className="px-8 py-3 border border-gray-700 rounded-lg text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors"
            whileHover={{ 
              y: -5,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            whileTap={{ y: 0 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Terminal-style project card component
const ProjectCard = ({ project, variants }) => {
  return (
    <motion.div
      className="group relative"
      variants={variants}
      whileHover={{ 
        y: -10,
        zIndex: 10,
        transition: { 
          duration: 0.3,
          ease: "easeOut"
        }
      }}
    >
      {/* Card */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 h-full transform-gpu">
        {/* Terminal header */}
        <div className="bg-gray-900 py-2 px-4 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="font-mono text-xs text-gray-400">
            ./projects/{project.slug}
          </div>
        </div>
        
        {/* Color bar based on project type */}
        <div className={`h-1 ${project.colorClass}`}></div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <span className={`mr-3 ${project.iconColor}`}>{project.icon}</span>
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          
          {/* Terminal-style tag list */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300 font-mono">
                {tag}
              </span>
            ))}
          </div>
          
          <motion.a 
            href="#"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium text-sm mt-2"
            whileHover={{ 
              x: 5,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
          >
            <span>View project</span>
            <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>
      </div>
      
      {/* Floating glow effect */}
      <div className={`absolute inset-0 -z-10 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${project.glowColor}`}></div>
    </motion.div>
  );
};

export default ProjectsLogbook; 