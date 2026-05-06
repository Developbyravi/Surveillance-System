import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Settings, Maximize2, Power, AlertTriangle, Database } from 'lucide-react';

const Dashboard = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [detections, setDetections] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const wsRef = useRef(null);
  const animationFrameId = useRef(null);
  const isWaitingForResponse = useRef(false);
  const hiddenCanvasRef = useRef(document.createElement('canvas'));

  // Connect to webcam
  useEffect(() => {
    if (isScanning && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(e => console.error("Video play failed:", e));
          }
        })
        .catch(err => {
          console.error("Error accessing webcam:", err);
          alert("Could not access webcam. Please ensure it is connected and permissions are granted.");
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setDetections([]);
    }
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning]);

  // Connect to WebSocket and start frame transmission
  useEffect(() => {
    if (isScanning) {
      // Connect to Python Backend
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8001/ws/detect';
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Connected to YOLOv8 Backend");
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        isWaitingForResponse.current = false;
        const data = JSON.parse(event.data);
        if (data.detections) {
          // Add timestamp to detections for the log
          const time = new Date().toLocaleTimeString('en-US', { hour12: false });
          const newDets = data.detections.map((d, i) => ({
            id: Date.now() + i,
            class: d.class,
            conf: d.conf,
            time: time,
            box: [d.x1, d.y1, d.x2, d.y2]
          }));
          
          setDetections(newDets);
          drawBoxes(newDets);
        }
        
        // Immediately trigger the next frame now that we've processed this one
        if (isScanning && ws.readyState === WebSocket.OPEN) {
          animationFrameId.current = requestAnimationFrame(sendFrame);
        }
      };

      ws.onclose = () => {
        console.log("Disconnected from backend");
        setIsConnected(false);
      };

      const sendFrame = () => {
        if (isWaitingForResponse.current) return; // Prevent backlog
        
        if (ws.readyState === WebSocket.OPEN && videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
          const video = videoRef.current;
          const canvas = hiddenCanvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Compress slightly to save bandwidth (0.5 JPEG quality)
          const base64Frame = canvas.toDataURL('image/jpeg', 0.5);
          isWaitingForResponse.current = true;
          ws.send(base64Frame);
        } else {
           // If video not ready, try again shortly
           setTimeout(() => {
              if (isScanning) animationFrameId.current = requestAnimationFrame(sendFrame);
           }, 100);
        }
      };

      // Start loop
      videoRef.current.onloadeddata = () => {
        animationFrameId.current = requestAnimationFrame(sendFrame);
      };

      return () => {
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (wsRef.current) wsRef.current.close();
      };
    }
  }, [isScanning]);

  const drawBoxes = (dets) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    // Match canvas size to video display size
    const rect = video.getBoundingClientRect();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dets.forEach(det => {
      const [x1, y1, x2, y2] = det.box;
      const width = x2 - x1;
      const height = y2 - y1;

      // Draw bounding box
      ctx.strokeStyle = det.conf > 0.8 ? '#00f3ff' : '#bc13fe';
      ctx.lineWidth = 3;
      ctx.strokeRect(x1, y1, width, height);

      // Draw corner accents
      ctx.lineWidth = 5;
      const s = 15; // corner length
      ctx.beginPath();
      ctx.moveTo(x1, y1 + s); ctx.lineTo(x1, y1); ctx.lineTo(x1 + s, y1);
      ctx.moveTo(x2, y1 + s); ctx.lineTo(x2, y1); ctx.lineTo(x2 - s, y1);
      ctx.moveTo(x1, y2 - s); ctx.lineTo(x1, y2); ctx.lineTo(x1 + s, y2);
      ctx.moveTo(x2, y2 - s); ctx.lineTo(x2, y2); ctx.lineTo(x2 - s, y2);
      ctx.stroke();

      // Draw label background
      ctx.fillStyle = det.conf > 0.8 ? 'rgba(0, 243, 255, 0.2)' : 'rgba(188, 19, 254, 0.2)';
      ctx.fillRect(x1, y1 - 25, width, 25);

      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillText(`${det.class.toUpperCase()} ${(det.conf * 100).toFixed(1)}%`, x1 + 5, y1 - 7);
    });
  };

  return (
    <section id="dashboard" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono tracking-wide flex items-center gap-3">
              <Camera className="text-cyber-neon w-8 h-8" />
              LIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-cyber-blue">FEED</span>
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-gray-400 font-mono text-sm">MAIN CAMERA CONCOURSE A-1 // SECTOR 7G</p>
              {isScanning && (
                <div className={`px-2 py-1 rounded text-[10px] font-mono flex items-center gap-2 ${isConnected ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                  <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
                  {isConnected ? 'YOLOv8 ENGINE CONNECTED' : 'CONNECTING TO BACKEND...'}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsScanning(!isScanning)}
              className={`px-6 py-2 rounded-md font-mono text-sm border flex items-center gap-2 transition-all ${
                isScanning 
                ? 'border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                : 'border-cyber-neon/50 bg-cyber-neon/10 text-cyber-neon hover:bg-cyber-neon/20'
              }`}
            >
              <Power className="w-4 h-4" />
              {isScanning ? 'HALT SYSTEM' : 'ENGAGE SYSTEM'}
            </button>
            <button className="p-2 glass-panel glass-panel-hover rounded-md text-gray-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="glass-panel rounded-xl overflow-hidden relative group">
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  REC
                </span>
                <button className="p-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded text-gray-300 hover:text-white">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Feed Container */}
              <div className="relative aspect-video bg-[#0a0a0f] overflow-hidden flex items-center justify-center">
                {!isScanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                    <Camera className="w-16 h-16 text-gray-600 mb-4" />
                    <p className="text-gray-500 font-mono text-sm">SYSTEM OFFLINE</p>
                  </div>
                )}
                
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`absolute w-full h-full object-cover transition-opacity ${isScanning ? 'opacity-80' : 'opacity-0'}`} 
                />
                
                <canvas
                  ref={canvasRef}
                  className={`absolute w-full h-full object-cover pointer-events-none z-10 ${isScanning ? 'opacity-100' : 'opacity-0'}`}
                />
                
                {isScanning && (
                  <>
                    <div className="absolute inset-0 radar-sweep opacity-30 pointer-events-none z-20"></div>
                    <div className="scanline z-20"></div>

                    {/* HUD Overlay */}
                    <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 z-20">
                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
                      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-cyber-neon/30 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-cyber-neon rounded-full"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Bottom stats bar */}
              <div className="bg-[#050508] border-t border-white/10 p-3 flex items-center justify-between font-mono text-[10px] text-gray-500">
                <div className="flex gap-6">
                  <span>RES: 640x480</span>
                  <span>FPS: <span className="text-cyber-neon">15.0</span></span>
                  <span>MODEL: YOLOv8N</span>
                </div>
                <div>NET: {isConnected ? 'WS CONNECTED' : 'DISCONNECTED'}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4 flex flex-col h-full">
            <div className="glass-panel p-4 rounded-xl flex-grow overflow-hidden flex flex-col">
              <h3 className="text-sm font-mono text-gray-400 border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" />
                DETECTION LOG
              </h3>
              
              <div className="flex-grow overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {detections.length === 0 ? (
                  <div className="text-xs text-gray-600 font-mono text-center py-4">NO OBJECTS DETECTED</div>
                ) : (
                  detections.slice(0, 10).map((det) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={det.id}
                      className="p-2 border border-white/5 rounded bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white uppercase">{det.class}</div>
                        <div className="text-[10px] text-gray-500 font-mono">{det.time}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-mono ${det.conf > 0.8 ? 'text-cyber-neon' : 'text-cyber-purple'}`}>
                          {(det.conf * 100).toFixed(1)}%
                        </div>
                        <div className="w-16 h-1 bg-white/10 rounded mt-1 overflow-hidden">
                          <div 
                            className={`h-full ${det.conf > 0.8 ? 'bg-cyber-neon' : 'bg-cyber-purple'}`} 
                            style={{ width: `${det.conf * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            <div className="glass-panel p-4 rounded-xl">
              <h3 className="text-sm font-mono text-gray-400 border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                SYSTEM ALERTS
              </h3>
              {detections.some(d => d.class === 'person') ? (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400 font-mono animate-pulse">
                  PERSON DETECTED IN CAMERA VIEW
                </div>
              ) : (
                <div className="p-3 bg-white/5 border border-white/10 rounded text-xs text-gray-500 font-mono">
                  ALL ZONES SECURE
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
