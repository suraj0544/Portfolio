import React from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, MapPin, Code2, ShieldCheck } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import FloatingBubbles from '../components/FloatingBubbles';
import profileImg from '../assets/profile.jpg';

const SP = { type: 'spring', stiffness: 380, damping: 40, mass: 0.8 };
const sd = (d) => ({ ...SP, delay: d });

const infoCards = [
  {
    icon: GraduationCap,
    label: 'Education',
    title: 'B.Tech CSE — Cybersecurity & Forensics',
    sub:   'Dev Bhoomi Uttarakhand University, Dehradun',
    note:  '2024 — 2028 · Currently Pursuing',
  },
  {
    icon: MapPin,
    label: 'Location',
    title: 'Paonta Sahib',
    sub:   'Himachal Pradesh, India',
    note:  'Ready for the Digital Frontier',
  },
  {
    icon: Code2,
    label: 'Focus',
    title: 'Ethical Hacking & Forensics',
    sub:   'TryHackMe · Kali Linux · Network Security',
    note:  'Actively Sharpening Skills',
  },
  {
    icon: ShieldCheck,
    label: 'Mission',
    title: 'Digital Defence',
    sub:   'National & Organisational Cyber Safety',
    note:  'Stoic Learner · Defence Aspirant',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <FloatingBubbles count={10} />

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={sd(0)}
          className="text-center mb-12"
        >
          
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* ── Left: profile card ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={sd(0.1)}
            className="w-full max-w-[280px] sm:max-w-xs mx-auto lg:mx-0 flex-shrink-0"
          >
            <TiltCard className="p-1">
              <div className="aspect-square rounded-xl relative overflow-hidden group border border-white/10">
                {/* Profile Image */}
                <img
                  src={profileImg}
                  alt="Suraj Kumar Ozha"
                  className="w-full h-full object-cover filter grayscale-[15%] contrast-[105%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Cyberpunk overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />

                {/* Glowing borders/accents */}
                <div className="absolute inset-0 border border-purple-primary/20 group-hover:border-purple-accent/50 rounded-xl transition-colors duration-500 pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-left z-10">
                  <p className="font-extrabold text-xl tracking-tight text-white">Suraj Kumar Ozha</p>
                  <p className="text-purple-accent text-xs font-mono mt-1">B.Tech CSE · Cybersecurity & Forensics</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── Right: description + info cards ── */}
          <div className="flex-1 space-y-8">
            <motion.p
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={sd(0.12)}
              className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}
            >
              Hardworking and disciplined B.Tech student specialising in{' '}
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Cybersecurity and Digital Forensics</span>.
              Passionate about applying security principles to solve real-world problems. A stoic
              learner with a strong interest in the defence and cybersecurity sector — eager to
              contribute to organisational and national{' '}
              <span className="text-purple-accent">digital safety</span>.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {infoCards.map(({ icon: Icon, label, title, sub, note }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 22, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...SP, delay: 0.18 + i * 0.08 }}
                  className="glass-card p-5 space-y-2 group"
                >
                  <div className="flex items-center gap-2.5 text-purple-accent font-semibold text-sm">
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    {label}
                  </div>
                  <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{sub}</p>
                  <p className="text-purple-accent/50 text-[10px] font-mono">{note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
