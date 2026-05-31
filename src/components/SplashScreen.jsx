import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const HACKING_LOGS = [
  "> Initializing exploit payload...",
  "> TARGET: 127.0.0.1",
  "> BYPASSING FIREWALL...",
  "> STAGE 1: INFILTRATION [OK]",
  "> STAGE 2: BRUTE_FORCE [RUNNING]",
  "> STAGE 3: DATA_EXFILTRATION [PENDING]",
  "> SCANNING PORTS: 80, 443, 8080...",
  "> EXPLOIT: CVE-2026-6969 [SUCCESS]",
  "> GAINING ROOT ACCESS...",
  "> ACCESS GRANTED: WELCOME SURAJ",
];

function useMatrixRain(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      if (canvas) {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const CHARS = '01アイウエオカサシスセタチツハヒフ10110100';
    const SIZE  = 13;
    let columns = Math.ceil(window.innerWidth / SIZE);
    let drops   = Array.from({ length: columns }, () => Math.random() * -100);

    let id;
    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#ffffff' : Math.random() > 0.9 ? '#9933FF' : '#3D1266';
        ctx.fillText(ch, i * SIZE, drops[i] * SIZE);

        if (drops[i] * SIZE > canvas.height && Math.random() > 0.98) drops[i] = 0;
        else drops[i]++;
      }
      id = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}

const SplashScreen = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Stable binary strings to avoid re-generating on every render
  const binaryStrings = useMemo(() => 
    Array.from({ length: 15 }).map(() => Math.random().toString(2).substring(2, 40)),
  []);

  useMatrixRain(canvasRef);

  useEffect(() => {
    let currentLine = 0;
    const timers = [];

    const interval = setInterval(() => {
      if (currentLine < HACKING_LOGS.length) {
        const nextLine = HACKING_LOGS[currentLine];
        setLogs(prev => [...prev.slice(-10), nextLine]);
        currentLine++;
      } else {
        clearInterval(interval);
        
        timers.push(setTimeout(() => setIsGlitching(true), 150));
        timers.push(setTimeout(() => setIsExiting(true), 600));
        timers.push(setTimeout(() => {
          if (onComplete) onComplete();
        }, 1200));
      }
    }, 90);

    return () => {
      clearInterval(interval);
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center overflow-hidden font-mono"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.1, filter: 'blur(20px)' } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />
      
      {isGlitching && (
        <motion.div
          animate={{ opacity: [0, 1, 0, 0.8, 0] }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-50 bg-purple-primary/10 mix-blend-screen pointer-events-none"
        />
      )}

      <div className="relative z-10 w-full max-w-2xl px-6">
        <motion.div 
          animate={isGlitching ? { x: [-2, 2, -1, 1, 0], y: [1, -1, 2, -2, 0] } : {}}
          transition={{ duration: 0.2, repeat: Infinity }}
          className="border rounded-lg bg-black/90 backdrop-blur-sm overflow-hidden"
          style={{ borderColor: 'rgba(153,51,255,0.30)', boxShadow: '0 0 50px rgba(153,51,255,0.18)' }}
        >
          {/* Header */}
          <div className="px-4 py-2 flex items-center gap-2 border-b" style={{ background: 'rgba(153,51,255,0.15)', borderColor: 'rgba(153,51,255,0.28)' }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-grow-500/40" />
            </div>
            <span className="text-[9px] text-purple-accent/60 ml-2 font-bold tracking-widest">SURAJ-CYBER-TERMINAL</span>
          </div>

          {/* Body */}
          <div className="p-6 h-[280px] flex flex-col justify-end overflow-hidden">
            {Array.isArray(logs) && logs.map((log, i) => (
              <div
                key={i}
                className={`${log.includes('SUCCESS') || log.includes('GRANTED') ? 'text-green-400 font-bold' : log.includes('STAGE') ? 'text-purple-accent' : ''} text-xs md:text-sm mb-1 whitespace-nowrap overflow-hidden`}
                style={!log.includes('SUCCESS') && !log.includes('GRANTED') && !log.includes('STAGE') ? { color: 'var(--text-secondary)' } : {}}
              >
                <span className="text-purple-primary/40 mr-2">➜</span>
                {log}
              </div>
            ))}
            {!isExiting && (
              <motion.div
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-2 h-4 bg-purple-accent inline-block ml-1 align-middle mt-1"
              />
            )}
          </div>
        </motion.div>

        {/* Floating Binary */}
        <div className="absolute -inset-10 opacity-5 pointer-events-none text-[8px] leading-none text-purple-accent overflow-hidden break-all h-full mt-4">
          {binaryStrings.map((str, i) => (
            <div key={i} className="mb-2">{str}</div>
          ))}
        </div>
      </div>

      <div className="cyber-grid-container opacity-10">
        <div className="cyber-grid" />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
