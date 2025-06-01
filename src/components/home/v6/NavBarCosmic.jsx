/**
 * LEGACY COMPONENT - DEPRECATED
 * 
 * This NavBarCosmic component has been replaced by MissionControlNavbar
 * Located at: src/components/navigation/MissionControlNavbar.jsx
 * 
 * This file is kept for reference and rollback purposes only.
 * Do not use this component in new development.
 * 
 * Migration completed: [Current Date]
 * Replacement: MissionControlNavbar with Mission Control theme
 */

/**
 * @component NavBarCosmic
 * @description Main navigation for V6 site with cosmic styling
 * 
 * @metadata
 * @version 1.0.0
 * @author CuriousLabs
 * @legit true - NavBar passes LEGIT protocol
 */

import React, { useState } from 'react';

const NavBarCosmic = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Navigation links
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-110 bg-black/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-serif text-xl glow-on-hover glow-purple">
              <span className="font-bold">Curious</span>Labs
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white hover:text-lime-400 transition-colors glow-on-hover glow-blue"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBarCosmic; 