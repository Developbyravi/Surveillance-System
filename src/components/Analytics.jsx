import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Box, Target, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, colorClass }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-panel p-6 rounded-xl flex flex-col gap-4 relative overflow-hidden group"
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 bg-${colorClass}/10 rounded-full blur-2xl group-hover:bg-${colorClass}/20 transition-all`}></div>
    
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-lg bg-${colorClass}/10 text-${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-400 font-mono">{title}</div>
        <div className="text-3xl font-bold mt-1 text-white">{value}</div>
      </div>
    </div>
    
    <div className="flex items-center gap-2 text-xs font-mono">
      <TrendingUp className="w-4 h-4 text-green-400" />
      <span className="text-green-400">{trend}%</span>
      <span className="text-gray-500">vs last hour</span>
    </div>
  </motion.div>
);

const Analytics = () => {
  return (
    <section id="analytics" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wide flex items-center gap-3">
            <BarChart3 className="text-cyber-purple w-8 h-8" />
            AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-cyber-purple">ANALYTICS</span>
          </h2>
          <p className="text-gray-400 mt-2 font-mono text-sm">REAL-TIME PERFORMANCE METRICS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="TOTAL DETECTIONS" value="14,208" icon={Box} trend="+12.5" colorClass="cyber-neon" />
          <StatCard title="PEOPLE COUNT" value="3,492" icon={Users} trend="+5.2" colorClass="cyber-purple" />
          <StatCard title="AVG CONFIDENCE" value="96.4%" icon={Target} trend="+1.1" colorClass="cyber-blue" />
          <StatCard title="UPTIME" value="99.9%" icon={Activity} trend="+0.0" colorClass="green-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-sm font-mono text-gray-400 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              TRAFFIC ANALYSIS (HOURLY)
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 60, 45, 80, 55, 90, 70, 85, 60, 40, 30, 50].map((height, i) => (
                <div key={i} className="w-full relative group flex justify-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-cyber-purple/20 to-cyber-neon/80 rounded-t-sm"
                  ></motion.div>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black/80 px-2 py-1 rounded text-xs font-mono border border-white/10 transition-opacity">
                    {height * 12}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs font-mono text-gray-500 border-t border-white/5 pt-2">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:59</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-sm font-mono text-gray-400 mb-6 flex items-center gap-2">
              <Box className="w-4 h-4" />
              CLASS DISTRIBUTION
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Person', val: 65, color: 'cyber-neon' },
                { name: 'Vehicle', val: 20, color: 'cyber-purple' },
                { name: 'Backpack', val: 10, color: 'cyber-blue' },
                { name: 'Other', val: 5, color: 'gray-400' }
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span>{item.name}</span>
                    <span>{item.val}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.val}%` }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                      className={`h-full bg-${item.color}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
