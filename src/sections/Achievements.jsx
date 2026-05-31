import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Target, Star, Medal, Shield } from 'lucide-react';
import FloatingBubbles from '../components/FloatingBubbles';

const SP = { type: 'spring', stiffness: 380, damping: 40, mass: 0.8 };

const tryHackMeStats = [
  { icon: Award,  value: 'Top 20%', label: 'Global Rank'    },
  { icon: Target, value: '85+ Days', label: 'Active Streak' },
  { icon: Star,   value: '25+ Labs', label: 'Labs Completed' },
];

const sports = [
  {
    title: 'District Level Tournament',
    desc:  '2 Gold + 1 Bronze medals achieved',
    level: 'Under-19 Boys',
  },
  {
    title: 'CBSE Inter-School Sports',
    desc:  '2 Gold medals at national scale',
    level: 'National Scale',
  },
  {
    title: 'State & National Representation',
    desc:  'Represented at highest junior levels',
    level: 'Under-19',
  },
];

/* Animated number counter */
function StatCard({ stat, delay }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...SP, delay }}
      className="glass-card p-6 text-center space-y-3 group hover:border-purple-primary/50 cursor-default"
    >
      <div className="flex justify-center">
        <motion.div
          whileHover={{ rotate: [0, -12, 12, 0], scale: 1.18 }}
          transition={{ duration: 0.5 }}
          className="p-3 rounded-xl bg-purple-primary/10 border border-purple-primary/20"
        >
          <Icon className="w-5 h-5 text-purple-accent" />
        </motion.div>
      </div>
      <div className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{stat.value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.012] to-transparent pointer-events-none" />
      <FloatingBubbles count={10} />

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
            Milestones &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="mt-4 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
            Recognition for technical excellence and athletic discipline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* ── TryHackMe ── */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={SP}
              className="text-xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}
            >
              <Shield className="text-purple-accent w-5 h-5" />
              Cybersecurity Labs · TryHackMe
            </motion.h3>

            <div className="grid grid-cols-3 gap-5">
              {tryHackMeStats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} delay={0.08 + i * 0.08} />
              ))}
            </div>

            <motion.a
              href="https://tryhackme.com/p/surajkumar0544f"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...SP, delay: 0.35 }}
              whileHover={{ scale: 1.02, borderColor: 'rgba(153,51,255,0.55)' }}
              className="block text-center p-4 rounded-xl border border-dashed
                         hover:text-purple-accent transition-all duration-300
                         font-mono text-xs tracking-wide"
              style={{ borderColor: 'rgba(153,51,255,0.25)', color: 'var(--text-muted)' }}
            >
              🔗 tryhackme.com/p/surajkumar0544f
            </motion.a>
          </div>

          {/* ── Athletics ── */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={SP}
              className="text-xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}
            >
              <Trophy className="text-purple-accent w-5 h-5" />
              Athletics &amp; Leadership
            </motion.h3>

            <div className="space-y-4">
              {sports.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 28, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...SP, delay: 0.08 + i * 0.09 }}
                  className="glass-card p-5 flex gap-5 items-center group"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 rounded-2xl bg-purple-primary/10 border border-purple-primary/20 flex-shrink-0"
                  >
                    <Medal className="text-purple-accent w-5 h-5" />
                  </motion.div>
                  <div>
                    <div className="text-[10px] font-mono text-purple-accent uppercase tracking-widest mb-0.5">
                      {item.level}
                    </div>
                     <div className="font-bold text-sm group-hover:text-purple-accent transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </div>
                     <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
