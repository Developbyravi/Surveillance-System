import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Mail, Terminal } from 'lucide-react';

const Team = () => {
  return (
    <section id="team" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-wide mb-4">
            CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-purple">ARCHITECT</span>
          </h2>
          <p className="text-gray-400 font-mono">DEVELOPER OVERVIEW</p>
        </div>

        <div className="max-w-4xl mx-auto glass-panel rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
            <div className="md:col-span-2 relative h-80 md:h-auto bg-[#0a0a0f]">
              <div className="absolute inset-0 bg-cyber-blue/20 mix-blend-overlay"></div>
              {/* Replace with actual image later */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent md:bg-gradient-to-r"></div>
              <div className="absolute bottom-4 left-4 z-20">
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-black/80 border border-cyber-neon/50 rounded text-xs font-mono text-cyber-neon mb-2">
                  <span className="w-1.5 h-1.5 bg-cyber-neon rounded-full animate-pulse"></span>
                  ONLINE
                </div>
              </div>
            </div>
            
            <div className="md:col-span-3 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-5 h-5 text-cyber-purple" />
                <h3 className="text-2xl font-bold text-white font-mono">Pratik Thorat</h3>
              </div>
              <div className="text-cyber-blue text-sm font-mono mb-6 uppercase tracking-wider">Lead AI Engineer / System Architect</div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Specializing in computer vision and real-time edge AI deployments. Developed OmniSight to bridge the gap between complex deep learning models and intuitive, high-performance user interfaces. Passionate about cybernetics and cyberpunk aesthetics.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
                  <div className="w-24">EXPERTISE:</div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">PyTorch</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">React</span>
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">Three.js</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm font-mono text-gray-400">
                  <div className="w-24">CLEARANCE:</div>
                  <div className="text-cyber-neon">LEVEL 9 (ADMIN)</div>
                </div>
              </div>

              <div className="flex gap-4">
                <a href="#" className="p-2 glass-panel glass-panel-hover rounded-full text-gray-400 hover:text-white transition-colors">
                  <Code className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 glass-panel glass-panel-hover rounded-full text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 glass-panel glass-panel-hover rounded-full text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
