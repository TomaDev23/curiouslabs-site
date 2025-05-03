import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * NavBarCosmic - Space-themed navigation bar
 * Features hover animations and responsive design
 */
const NavBarCosmic = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items
  const navItems = [
    { name: 'Mission', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Community', href: '#community' },
    { name: 'Contact', href: '#contact' }
  ];
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-md shadow-lg shadow-purple-500/5 py-3' 
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="text-2xl font-bold text-white flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Curious
            </span>
            <span className="text-white">Labs</span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
            
            <motion.button
              className="ml-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch Mission
            </motion.button>
          </div>
          
          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gray-900/95 backdrop-blur-md border-t border-gray-800 mt-3 py-4 px-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white py-2 px-3 rounded-md hover:bg-gray-800 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                <motion.button
                  className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/20 w-full"
                  whileTap={{ scale: 0.95 }}
                >
                  Launch Mission
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Individual nav item with hover effects
const NavItem = ({ item }) => {
  return (
    <motion.a
      href={item.href}
      className="relative text-gray-300 hover:text-white transition-colors"
      whileHover="hover"
    >
      {item.name}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-500"
        initial={{ scaleX: 0, originX: 0 }}
        variants={{
          hover: { scaleX: 1 }
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};

export default NavBarCosmic; 