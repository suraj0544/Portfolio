import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Globe, Cpu, Terminal, Database } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import FloatingBubbles from '../components/FloatingBubbles';

const SP = { type: 'spring', stiffness: 380, damping: 40, mass: 0.8 };

const categories = [
  {
    title: 'Programming',
    icon: Code,
    color: 'from-cyan-400 to-purple-deep',
    glow: 'rgba(153,51,255,0.20)',
    skills: ['Python', 'C (Basics)', 'Bash Scripting'],
    level: 55,
  },
  {
    title: 'Cyber Tools',
    icon: Shield,
    color: 'from-purple-primary to-purple-accent',
    glow: 'rgba(153,51,255,0.35)',
    skills: ['Nmap', 'Kali Linux', 'Network Scanning', 'TryHackMe'],
    level: 70,
  },
  {
    title: 'Web Tech',
    icon: Globe,
    color: 'from-orange-400 to-purple-accent',
    glow: 'rgba(153,51,255,0.20)',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    level: 65,
  },
  {
    title: 'OS & Systems',
    icon: Terminal,
    color: 'from-green-400 to-purple-secondary',
    glow: 'rgba(153,51,255,0.18)',
    skills: ['Kali Linux', 'Ubuntu', 'Windows', 'CLI'],
    level: 60,
  },
  {
    title: 'Soft Skills',
    icon: Cpu,
    color: 'from-pink-400 to-purple-primary',
    glow: 'rgba(153,51,255,0.18)',
    skills: ['Critical Thinking', 'Teamwork', 'Adaptability'],
    level: 80,
  },
  {
    title: 'Databases',
    icon: Database,
    color: 'from-teal-400 to-purple-deep',
    glow: 'rgba(153,51,255,0.18)',
    skills: ['MySQL (Basics)', 'JSON', 'File Systems'],
    level: 40,
  },
];

function SkillBar({ level, color, glow }) {
  return (
    <div className="w-full mt-auto pt-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Proficiency</span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{level}%</span>
      </div>
      <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'rgba(153,51,255,0.12)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 180, damping: 30, delay: 0.3 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ boxShadow: `0 0 8px ${glow}` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      {/* Subtle dark bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      <FloatingBubbles count={14} />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SP}
          className="text-center mb-16"
        >
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Technical <span className="gradient-text">Toolkit</span>
          </h2>
          <p className="mt-4 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            Specialised in defensive security and ethical hacking foundations.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 36, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...SP, delay: i * 0.07 }}
                className="h-full"
              >
                <TiltCard className="h-full p-7 flex flex-col gap-5 group">
                  {/* Icon */}
                  <div
                    className={`self-start p-3.5 rounded-2xl bg-gradient-to-br ${cat.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                    style={{ boxShadow: `0 0 20px ${cat.glow}`, opacity: 0.9 }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Title */}
                   <h3 className="text-lg font-bold group-hover:text-purple-accent transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {cat.title}
                  </h3>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span key={s} className="skill-tag">{s}</span>
                    ))}
                  </div>

                  {/* Proficiency bar */}
                  <SkillBar level={cat.level} color={cat.color} glow={cat.glow} />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
