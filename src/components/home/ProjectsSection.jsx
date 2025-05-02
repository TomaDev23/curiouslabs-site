import React from 'react';
import { motion } from 'framer-motion';

/**
 * Projects Section Component - Phase 2 implementation with proper product logos
 * Displays a grid of featured projects with images and descriptions.
 * @component
 */
const ProjectsSection = ({ scrollProgress = 0, isReducedMotion = false }) => {
  // Projects data with proper image paths
  const projects = [
    {
      id: 1,
      title: 'CodeLab',
      image: '/images/products/codelab.svg',
      description: 'Interactive development environment with real-time collaboration and AI-assisted coding features.',
      color: 'bg-purple-600 hover:bg-purple-500'
    },
    {
      id: 2,
      title: 'OpsPipe',
      image: '/images/products/opspipe.svg',
      description: 'Streamlined CI/CD pipeline automation with intelligent workflow optimization and monitoring.',
      color: 'bg-fuchsia-600 hover:bg-fuchsia-500'
    },
    {
      id: 3,
      title: 'Guardian',
      image: '/images/products/guardian.svg',
      description: 'Advanced security monitoring and threat detection for cloud infrastructure and applications.',
      color: 'bg-red-600 hover:bg-red-500'
    },
    {
      id: 4,
      title: 'DataForge',
      image: '/images/products/dataforge.svg',
      description: 'Data processing engine with ML-powered analytics and visualization capabilities.',
      color: 'bg-teal-600 hover:bg-teal-500'
    },
    {
      id: 5,
      title: 'CloudPath',
      image: '/images/products/cloudpath.svg',
      description: 'Multi-cloud resource management with cost optimization and infrastructure as code integration.',
      color: 'bg-blue-600 hover:bg-blue-500'
    },
    {
      id: 6,
      title: 'Sentinel',
      image: '/images/products/sentinel.svg',
      description: 'Intelligent system monitoring with predictive alerting and automated incident response.',
      color: 'bg-blue-800 hover:bg-blue-700'
    },
    {
      id: 7,
      title: 'QuantumApp',
      image: '/images/products/quantumapp.svg', 
      description: 'Next-generation application platform with serverless architecture and quantum-ready computing.',
      color: 'bg-indigo-600 hover:bg-indigo-500'
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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`rounded-xl ${project.color} p-6 hover:scale-105 transition-all duration-300`}
              variants={isReducedMotion ? {} : itemVariants}
              whileHover={isReducedMotion ? {} : { y: -10, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 mr-4 bg-white/10 rounded-lg flex items-center justify-center">
                  <img 
                    src={project.image} 
                    alt={`${project.title} logo`} 
                    className="w-14 h-14"
                  />
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
};

export default ProjectsSection; 