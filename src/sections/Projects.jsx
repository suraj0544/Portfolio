import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code2, ShieldCheck, Zap, Code } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const SP = { type: 'spring', stiffness: 360, damping: 40, mass: 0.8 };

const projects = [
  {
    title: 'MetaGuard AI (Ongoing)',
    description:
      'AI-driven security tool that monitors and protects digital assets from emerging threats. Focuses on real-time vulnerability detection, metadata analysis, and automated threat mitigation.',
    tags: ['AI', 'Python', 'Security', 'Vulnerability Research'],
    icon: ShieldCheck,
    accent: 'from-purple-primary to-purple-accent',
    glow: 'rgba(153,51,255,0.40)',
    github: 'https://github.com/surajkumar0544f',
    link: '#',
  }
  
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={SP}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16"
        >
          <div>
            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="mt-3 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
              Practical applications of security principles and tools.
            </p>
          </div>

          <motion.a
            href="https://github.com/surajkumar0544f"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="hidden sm:flex items-center gap-2 text-sm hover:text-purple-accent transition-colors duration-300 font-mono group"
            style={{ color: 'var(--text-muted)' }}
          >
            View GitHub
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 44, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...SP, delay: i * 0.1 }}
              >
                <TiltCard className="p-0 overflow-hidden group h-full flex flex-col">
                  {/* Top gradient bar */}
                  <div className={`h-[3px] w-full bg-gradient-to-r ${project.accent}`}
                       style={{ boxShadow: `0 0 12px ${project.glow}` }} />

                  <div className="p-8 flex flex-col gap-6 flex-1">
                    {/* Icon + links */}
                    <div className="flex justify-between items-start">
                      <motion.div
                        whileHover={{ scale: 1.12, rotate: 8 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${project.accent} bg-opacity-15 border border-white/10`}
                        style={{ boxShadow: `0 0 20px ${project.glow}` }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>

                      <div className="flex gap-3">
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className="p-2 rounded-xl border text-sm
                                       hover:text-purple-accent hover:border-purple-accent/40 hover:bg-purple-primary/8
                                       transition-colors duration-250"
                            style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
                          >
                            <Code2 className="w-5 h-5" />
                          </motion.a>
                        )}
                        <motion.a
                          href={project.link}
                          whileHover={{ scale: 1.2, y: -2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                          className="p-2 rounded-xl border text-sm
                                     hover:text-purple-accent hover:border-purple-accent/40 hover:bg-purple-primary/8
                                     transition-colors duration-250"
                          style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold group-hover:text-purple-accent transition-colors duration-350" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                      </h3>
                      <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map((tag) => (
                        <span key={tag} className="skill-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent sweep on hover */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.45, ease: [0.34, 1.1, 0.64, 1] }}
                    className={`h-[3px] bg-gradient-to-r ${project.accent} self-start`}
                    style={{ boxShadow: `0 0 12px ${project.glow}` }}
                  />
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
