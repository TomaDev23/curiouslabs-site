import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from '../../ui/MagneticButton';
import CosmicNoiseOverlay from '../../ui/CosmicNoiseOverlay';
import ParticleField from '../../ui/ParticleField';

/**
 * FooterExperience - Enhanced footer with cosmic theme integration
 * Features CTA bridge, cosmic styling, and responsive grid layout
 */
const FooterExperience = () => {
  // Animation variants
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
  
  // Social media links
  const socialLinks = [
    { name: 'LinkedIn', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
    { name: 'GitHub', icon: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z' },
    { name: 'Twitter', icon: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' },
  ];
  
  // Products, resources, and company links
  const links = {
    products: [
      { name: 'CodeLab', path: '/codelab' },
      { name: 'OpsPipe', path: '/products/opspipe' },
      { name: 'MoonSignal', path: '/products/moonsignal' },
      { name: 'Guardian', path: '/products/guardian' },
    ],
    resources: [
      { name: 'Documentation', path: '/docs' },
      { name: 'Tutorials', path: '/docs/tutorials' },
      { name: 'Blog', path: '/blog' },
      { name: 'Community', path: '/community' },
    ],
    company: [
      { name: 'About', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy', path: '/privacy' },
    ]
  };

  return (
    <footer className="relative pt-32 bg-gradient-to-t from-black via-gray-900/90 to-transparent overflow-hidden">
      {/* Background enhancements */}
      <CosmicNoiseOverlay opacity={0.03} blendMode="overlay" />
      <ParticleField density="low" yDirection="down" zIndex={0} />
      
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/4 w-1/2 h-96 rounded-full opacity-10 blur-[100px]" 
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, rgba(17, 24, 39, 0) 70%)' }} 
      />
      
      {/* CTA Bridge Section */}
      <motion.div 
        className="container mx-auto px-4 text-center mb-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          style={{ 
            textShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)'
          }}
          variants={itemVariants}
        >
          Ready to Redefine?
        </motion.h2>
        
        <motion.p 
          className="text-xl text-purple-300 mb-8"
          variants={itemVariants}
        >
          Join the frontier of AI-driven development
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <MagneticButton
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium relative overflow-hidden group"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 opacity-0 bg-gradient-to-r from-purple-700 to-blue-700 transition-opacity duration-300 group-hover:opacity-100"></div>
          </MagneticButton>
        </motion.div>
      </motion.div>
      
      {/* Glowing divider */}
      <div className="relative h-px mb-16">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="absolute inset-x-0 h-[2px] blur-sm bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
      </div>
      
      {/* Footer Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Company Info */}
          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white">CuriousLabs</h3>
            <p className="text-gray-400">AI-powered solutions for modern development challenges. We're building the future of collaborative coding.</p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <motion.a 
                  key={link.name}
                  href="#" 
                  aria-label={link.name}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d={link.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Products */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6">Products</h3>
            <ul className="space-y-3">
              {links.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center"
                  >
                    <motion.span 
                      className="block w-1 h-1 rounded-full bg-purple-500 mr-2"
                      whileHover={{ scale: 2 }}
                      transition={{ duration: 0.2 }}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center"
                  >
                    <motion.span 
                      className="block w-1 h-1 rounded-full bg-blue-500 mr-2"
                      whileHover={{ scale: 2 }}
                      transition={{ duration: 0.2 }}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center"
                  >
                    <motion.span 
                      className="block w-1 h-1 rounded-full bg-purple-500 mr-2"
                      whileHover={{ scale: 2 }}
                      transition={{ duration: 0.2 }}
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center text-gray-500 mt-16 pt-8 border-t border-gray-800"
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} CuriousLabs. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by AI. Built with 💜 by curious minds.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterExperience; 