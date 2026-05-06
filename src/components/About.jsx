import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Network, Zap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wide flex items-center gap-3">
              <Cpu className="text-cyber-blue w-8 h-8" />
              YOLOv8 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-blue to-cyber-neon">ARCHITECTURE</span>
            </h2>
            <p className="text-gray-400 font-sans leading-relaxed text-lg">
              The neural engine powering OmniSight is built on the state-of-the-art YOLOv8 (You Only Look Once) architecture. This represents a paradigm shift in real-time object detection, offering an unparalleled balance between accuracy and computational efficiency.
            </p>
            
            <div className="space-y-4 pt-4">
              {[
                { icon: Network, title: 'Deep Neural Network', desc: 'Advanced CSPDarknet53 backbone with spatial pyramid pooling for robust feature extraction.' },
                { icon: Zap, title: 'Anchor-Free Detection', desc: 'Direct center-point prediction eliminates manual anchor box design, increasing generalizability.' },
                { icon: Cpu, title: 'TensorRT Optimization', desc: 'Compiled for edge hardware delivering up to 120 FPS on dedicated GPU accelerators.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 glass-panel rounded-lg hover:border-cyber-blue/50 transition-colors">
                  <div className="p-3 bg-cyber-blue/10 rounded-lg text-cyber-blue h-fit">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-mono font-bold">{item.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[500px]"
          >
            <div className="absolute inset-0 glass-panel rounded-2xl flex items-center justify-center p-8 overflow-hidden group">
              <div className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#1e90ff_50%,#000000_100%)] opacity-20 animate-[spin_4s_linear_infinite]"></div>
              <div className="absolute inset-1 bg-[#050508] rounded-xl z-10"></div>
              
              <div className="relative z-20 w-full h-full flex flex-col items-center justify-center space-y-8">
                {/* Abstract Architecture Diagram */}
                <div className="flex items-center gap-4 w-full justify-between">
                  <div className="w-16 h-24 border border-cyber-blue/50 bg-cyber-blue/10 rounded flex items-center justify-center relative">
                    <span className="text-[10px] font-mono text-cyber-blue absolute -top-4">INPUT</span>
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-blue to-cyber-purple relative">
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyber-blue rounded-full shadow-[0_0_10px_#1e90ff] animate-[ping_2s_infinite]"></div>
                  </div>
                  <div className="w-24 h-32 border border-cyber-purple/50 bg-cyber-purple/10 rounded flex items-center justify-center relative">
                    <span className="text-[10px] font-mono text-cyber-purple absolute -top-4">BACKBONE</span>
                  </div>
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-cyber-purple to-cyber-neon relative">
                    <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyber-purple rounded-full shadow-[0_0_10px_#bc13fe] animate-[ping_2s_infinite_0.5s]"></div>
                  </div>
                  <div className="w-20 h-40 border border-cyber-neon/50 bg-cyber-neon/10 rounded flex items-center justify-center relative">
                    <span className="text-[10px] font-mono text-cyber-neon absolute -top-4">HEAD</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Neural Processing Pipeline</div>
                  <div className="text-2xl font-bold text-white mt-2 font-mono">15.2M <span className="text-sm text-cyber-blue">PARAMETERS</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
