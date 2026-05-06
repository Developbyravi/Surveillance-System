import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Menu, X, Cpu, Activity } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Analytics', href: '#analytics' },
    { name: 'About AI', href: '#about' },
    { name: 'Features', href: '#features' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#050508]/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <Shield className="w-8 h-8 text-cyber-neon relative z-10" />
              <div className="absolute inset-0 bg-cyber-neon blur-[10px] opacity-50 z-0"></div>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-mono tracking-wider">
                OMNI<span className="text-cyber-neon">SIGHT</span>
              </span>
              <span className="text-[10px] text-cyber-purple uppercase tracking-[0.2em] font-bold">
                YOLOv8 Core
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-cyber-neon transition-colors relative group uppercase tracking-wider"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyber-neon transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button className="glass-panel px-6 py-2 rounded-full flex items-center gap-2 text-sm hover:border-cyber-neon/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all">
              <Activity className="w-4 h-4 text-cyber-neon" />
              System Status
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel border-x-0 border-t-0 rounded-none"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyber-neon hover:bg-white/5 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
