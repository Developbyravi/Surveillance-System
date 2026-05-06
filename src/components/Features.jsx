import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShieldAlert, Zap, Globe, Lock, Search } from 'lucide-react';

const colorStyles = {
  "cyber-neon": {
    bg: "bg-cyber-neon/10",
    text: "text-cyber-neon",
    shadow: "group-hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
  },
  "cyber-purple": {
    bg: "bg-cyber-purple/10",
    text: "text-cyber-purple",
    shadow: "group-hover:shadow-[0_0_20px_rgba(188,19,254,0.4)]"
  },
  "cyber-blue": {
    bg: "bg-cyber-blue/10",
    text: "text-cyber-blue",
    shadow: "group-hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]"
  }
};

const FeatureCard = ({ icon: Icon, title, description, color, index }) => {
  const styles = colorStyles[color] || colorStyles["cyber-neon"];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-panel p-8 rounded-xl hover:-translate-y-2 transition-transform duration-300 group"
    >
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-shadow ${styles.bg} ${styles.shadow}`}>
        <Icon className={`w-8 h-8 ${styles.text}`} />
      </div>
      <h3 className="text-xl font-bold font-mono mb-3 text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "360° Vision Matrix",
      description: "Comprehensive spatial mapping and multi-camera stitching provides an unbroken field of view across the entire monitored sector.",
      color: "cyber-neon"
    },
    {
      icon: Zap,
      title: "Sub-Millisecond Response",
      description: "Hardware-accelerated inference engine guarantees detection-to-alert latency of less than 5ms under maximum load.",
      color: "cyber-purple"
    },
    {
      icon: ShieldAlert,
      title: "Predictive Threat Analysis",
      description: "Behavioral modeling algorithms identify potential security events before they occur based on kinematic anomalies.",
      color: "cyber-blue"
    },
    {
      icon: Globe,
      title: "Global Mesh Network",
      description: "Decentralized node architecture allows seamless integration of thousands of end-points across multiple geographical locations.",
      color: "cyber-neon"
    },
    {
      icon: Lock,
      title: "Quantum-Resistant Crypto",
      description: "All telemetry and video streams are secured using post-quantum cryptographic standards ensuring data integrity.",
      color: "cyber-purple"
    },
    {
      icon: Search,
      title: "Semantic Object Search",
      description: "Query the historical database using natural language to find specific objects, vehicles, or anomalous events instantly.",
      color: "cyber-blue"
    }
  ];

  return (
    <section id="features" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-wide mb-4">
            SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-neon">CAPABILITIES</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyber-purple to-cyber-neon mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
