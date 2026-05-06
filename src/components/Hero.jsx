import React from 'react';
import { motion } from 'framer-motion';
import { ScanFace, Target, Crosshair, Activity } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Replace with a futuristic robot spline if available, using a placeholder spline for now */}
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/50 to-[#050508] pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-neon/30 bg-cyber-neon/10 text-cyber-neon text-sm font-mono backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyber-neon animate-pulse"></span>
            SYSTEM ONLINE V8.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-cyber-blue">Neural</span><br/>
            Surveillance
          </h1>
          
          <p className="text-gray-400 text-lg max-w-xl font-mono">
            Next-generation real-time object detection powered by YOLOv8. 
            Achieving sub-millisecond inference with unprecedented accuracy.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="relative group px-8 py-4 bg-transparent overflow-hidden rounded-lg font-mono font-bold text-white tracking-wider">
              <span className="absolute inset-0 bg-cyber-neon/20 group-hover:bg-cyber-neon/30 transition-colors"></span>
              <span className="absolute inset-0 border border-cyber-neon rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.5)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.8)] transition-shadow"></span>
              <span className="relative flex items-center gap-2">
                <Target className="w-5 h-5" />
                INITIALIZE SCAN
              </span>
            </button>
            <button className="px-8 py-4 glass-panel glass-panel-hover rounded-lg font-mono text-white flex items-center gap-2">
              <Crosshair className="w-5 h-5" />
              VIEW DEMO
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-cyber-neon">99.8%</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-purple">120</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">FPS Max</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-blue">2ms</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Latency</div>
            </div>
          </div>
        </motion.div>

        <div className="hidden lg:block relative h-[600px] w-full">
          {/* Dashboard mockup floating element */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[80%] glass-panel p-4 rounded-xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-mono text-cyber-neon flex items-center gap-2">
                <Activity className="w-3 h-3" />
                LIVE FEED
              </div>
            </div>
            <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/5">
              <div className="absolute inset-0 radar-sweep"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
              
              {/* Fake Bounding Boxes */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute top-1/4 left-1/4 w-32 h-20 border-2 border-cyber-neon bg-cyber-neon/10"
              >
                <div className="absolute -top-6 left-[-2px] bg-cyber-neon text-black text-[10px] font-mono px-2 py-1 font-bold">
                  CAR 0.98
                </div>
              </motion.div>
              
              <div className="scanline"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
