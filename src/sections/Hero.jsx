import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Lock, ChevronDown, Award, Target, Zap } from 'lucide-react';
import Glow from '../components/Glow';
import FloatingBubbles from '../components/FloatingBubbles';

const roles = [
  'Penetration Tester in Training',
  'Digital Forensics Analyst',
  'Ethical Hacker & CTF Explorer',
  'Network Security Researcher',
  'Defender of the Digital Realm',
];

const stats = [
  { icon: Award,  value: 'Top 25%',  label: 'TryHackMe Rank' },
  { icon: Target, value: '35+ Days', label: 'Hacking Streak'  },
  { icon: Zap,    value: '25+ Labs', label: 'Completed'       },
];

const SP = { type: 'spring', stiffness: 420, damping: 42, mass: 0.75 };
const sd = (d) => ({ ...SP, delay: d });

export default function Hero() {
  const [roleIdx, setRoleIdx]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping]       = useState(true);

  /* Typewriter */
  useEffect(() => {
    let t;
    const cur = roles[roleIdx];
    if (typing) {
      if (displayed.length < cur.length) {
        t = setTimeout(() => setDisplayed(cur.slice(0, displayed.length + 1)), 44);
      } else {
        t = setTimeout(() => setTyping(false), 1900);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 24);
      } else {
        setRoleIdx((p) => (p + 1) % roles.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, roleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-14 overflow-hidden"
    >
      {/* Ambient glows */}
      <Glow className="-top-32 -left-24" color="var(--glow-primary)" size="750px" />
      <Glow className="bottom-10 -right-24" color="var(--glow-secondary)" size="650px" />
      <Glow
        className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3"
        color="var(--glow-secondary)"
        size="900px"
      />

      {/* Floating bubbles */}
      <FloatingBubbles count={24} className="z-0" />

      {/* Vector Perspective Grid Floor */}
      <div className="cyber-grid-container opacity-20">
        <div className="cyber-grid" />
      </div>

      {/* Radial vignette mask over grid to blend it */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 hero-vignette transition-colors duration-500"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ── Left Column: Text & CTA ── */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">


          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0  }}
            transition={sd(0.07)}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Suraj Kumar{' '}
            <span className="gradient-text lg:block">Ozha</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={sd(0.13)}
            className="flex items-center justify-center lg:justify-start gap-2 font-mono text-sm sm:text-lg
                       font-semibold text-purple-accent mb-3 min-h-[1.9rem]"
          >
            <Terminal className="w-4 h-4 opacity-55 shrink-0" />
            <span>
              {displayed}
              <span className="inline-block w-[2px] h-[1.1em] bg-purple-accent ml-[2px] align-middle animate-pulse" />
            </span>
          </motion.div>

          {/* Subtitle with Wave Reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
            className="text-sm sm:text-base font-mono tracking-wide mb-7 max-w-md" style={{ color: 'var(--text-muted)' }}
          >
            {"Securing the digital world — one vulnerability at a time.".split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 350 }}
                className={`inline-block mr-[0.25em] ${word === 'vulnerability' || word === 'digital' ? 'text-purple-accent font-semibold' : ''}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={sd(0.35)}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#projects" className="btn-primary gap-2 w-full sm:w-auto">
              <Shield className="w-4 h-4" />
              View Projects
            </a>
            <a href="#contact" className="btn-outline gap-2 w-full sm:w-auto">
              <Terminal className="w-4 h-4" />
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* ── Right Column: Stacked Stats ── */}
        <div className="flex flex-col gap-4 w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 28, scale: 0.88 }}
              animate={{ opacity: 1, x: 0,  scale: 1    }}
              transition={{ ...SP, delay: 0.28 + i * 0.1 }}
              className="glass-card px-6 py-5 flex items-center gap-5 group cursor-default"
            >
              <div className="p-3.5 rounded-2xl bg-purple-primary/10 border border-purple-primary/20 
                              group-hover:bg-purple-primary/20 group-hover:scale-110 
                              transition-all duration-300">
                <Icon className="w-6 h-6 text-purple-accent group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="text-left">
                 <span className="block font-black text-2xl leading-none tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>{value}</span>
                 <span className="block text-[10px] sm:text-xs font-mono uppercase tracking-widest leading-snug" style={{ color: 'var(--text-muted)' }}>
                   {label}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        aria-label="Scroll to About"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   hover:text-purple-accent transition-colors duration-300 cursor-pointer" style={{ color: 'var(--text-muted)' }}
      >
        <ChevronDown className="w-7 h-7" />
      </motion.button>
    </section>
  );
}
