import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#020203] pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-cyber-neon" />
              <span className="text-lg font-bold font-mono tracking-wider text-white">
                OMNI<span className="text-cyber-neon">SIGHT</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm font-mono max-w-sm mb-6">
              Next-generation AI surveillance system powered by YOLOv8. Designed for maximum performance and unparalleled situational awareness.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs font-mono text-green-500">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              ALL SYSTEMS NOMINAL
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-mono font-bold mb-4 uppercase text-sm tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-mono">
              <li><a href="#dashboard" className="hover:text-cyber-neon transition-colors">Dashboard</a></li>
              <li><a href="#analytics" className="hover:text-cyber-neon transition-colors">Analytics</a></li>
              <li><a href="#about" className="hover:text-cyber-neon transition-colors">Architecture</a></li>
              <li><a href="#features" className="hover:text-cyber-neon transition-colors">Capabilities</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-mono font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500 font-mono">
              <li><a href="#" className="hover:text-cyber-neon transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyber-neon transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyber-neon transition-colors">Data Processing</a></li>
              <li><a href="#" className="hover:text-cyber-neon transition-colors">Security Protocol</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs font-mono">
            &copy; {new Date().getFullYear()} OMNISIGHT SURVEILLANCE. ALL RIGHTS RESERVED.
          </p>
          <div className="text-gray-600 text-xs font-mono flex gap-4">
            <span>V 8.0.4</span>
            <span>BUILD: 2026.05</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
