import React, { useState, useEffect } from 'react';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Navigation links
  const navLinks = [
    { title: 'Home', href: '#', id: 'home' },
    { title: 'Services', href: '#services', id: 'services' },
    { title: 'Case Studies', href: '#case-studies', id: 'case-studies' },
    { title: 'Metrics', href: '#metrics', id: 'metrics' },
    { title: 'About', href: '#about', id: 'about' }
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Listen for scroll events and track active section
  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true when page is scrolled beyond 10px
      setIsScrolled(window.scrollY > 10);
      
      // Track active section for nav highlighting
      const currentScrollPos = window.scrollY + 100;
      const sections = navLinks.map(link => {
        const element = document.getElementById(link.id);
        if (element) {
          return { id: link.id, top: element.offsetTop, bottom: element.offsetTop + element.offsetHeight };
        }
        return { id: link.id, top: 0, bottom: 0 };
      });
      
      // Find the section currently in view
      const currentSection = sections.find(section => 
        currentScrollPos >= section.top && currentScrollPos < section.bottom
      );
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    // Add scroll event listener with performance optimization
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
    
    // Check initial scroll position
    handleScroll();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [navLinks]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-deep-black/80 backdrop-blur-md py-3 border-b border-curious-purple-600/20 shadow-[0_2px_20px_-2px_rgba(109,40,217,0.2)]' 
          : 'bg-transparent py-5'
      }`}
    >
      {/* Technical line accent at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-500/70 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative">
            <span className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-curious-purple-400 to-curious-blue-400">
              CuriousLabs
            </span>
            {/* Subtle underline with gradient */}
            <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-curious-purple-500/50 to-curious-blue-500/50"></div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeSection === link.id 
                ? 'text-white' 
                : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {link.title}
              {/* Active indicator */}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-curious-purple-500 to-curious-blue-500"></span>
              )}
            </a>
          ))}
          <a 
            href="#contact" 
            className="group relative bg-gradient-to-r from-curious-purple-600 to-curious-purple-500 text-white px-5 py-2 rounded-lg transition-all hover:-translate-y-1 overflow-hidden"
          >
            {/* Button glow overlay */}
            <div className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {/* Button text */}
            <span className="relative z-10">Contact</span>
            
            {/* Button bottom highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="relative text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
            
            {/* Button highlight effect */}
            {isMobileMenuOpen && (
              <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-curious-purple-500/70 to-transparent"></span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-deep-black/95 backdrop-blur-lg border-b border-curious-purple-900/30">
          <div className="px-4 py-5 space-y-5">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`block transition-colors relative pl-3 ${
                  activeSection === link.id 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {/* Active indicator for mobile */}
                {activeSection === link.id && (
                  <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-curious-purple-500"></span>
                )}
                {link.title}
              </a>
            ))}
            <a
              href="#contact"
              className="block w-full text-center bg-gradient-to-r from-curious-purple-600 to-curious-purple-500 text-white px-5 py-3 rounded-lg mt-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
} 