import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Shield, Menu, X, Hexagon, Lock } from 'lucide-react';

const NAV_LINKS = [
  { name: 'About',        href: '#about'        },
  { name: 'Skills',       href: '#skills'       },
  { name: 'Projects',     href: '#projects'     },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact',      href: '#contact'      },
];

export default function Navbar() {
  const [scrolled,        setScrolled]        = useState(false);
  const [isOpen,          setIsOpen]          = useState(false);
  const [activeId,        setActiveId]        = useState('');
  const [isLogoRevealed,  setIsLogoRevealed]  = useState(false);

  /* Scroll progress bar */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 35, restDelta: 0.001 });

  /* Navbar backdrop on scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Logo reveal */
  useEffect(() => {
    const t = setTimeout(() => setIsLogoRevealed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  /* Active section tracker */
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.slice(1));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #6600CC, #9933FF, #BB66FF)',
          transformOrigin: 'left',
        }}
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? 'py-3 scrolled' : 'py-6 bg-transparent'
        }`}
        style={scrolled ? {
          backgroundColor: 'var(--nav-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(153,51,255,0.15)',
        } : {}}
      >
        <div className="nav-border-trace" />
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-10">

          {/* Logo */}
          <motion.a
            href="#hero"
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 42, mass: 0.75 }}
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group select-none"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isLogoRevealed ? [0, -10, 10, -4, 0] : 0,
                scale:  isLogoRevealed ? 1 : [0.8, 1.1, 1],
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, duration: isLogoRevealed ? 0.55 : 0.8 }}
              className="relative p-2 rounded-xl flex items-center justify-center w-11 h-11 overflow-hidden
                         transition-all duration-300"
              style={{
                background: 'rgba(153,51,255,0.10)',
                border: '1.5px solid rgba(153,51,255,0.30)',
                boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.08), 0 0 16px rgba(153,51,255,0.22)',
              }}
            >
              <AnimatePresence mode="wait">
                {!isLogoRevealed ? (
                  <motion.div
                    key="lock"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0, rotate: 15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Lock className="w-5 h-5" style={{ color: '#BB66FF' }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="brand"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    className="flex items-center justify-center"
                  >
                    <Hexagon
                      className="absolute w-10 h-10 animate-[spin_8s_linear_infinite]"
                      style={{ color: 'rgba(153,51,255,0.40)' }}
                      strokeWidth={1}
                    />
                    <Shield
                      className="w-5 h-5 relative z-10"
                      style={{
                        color: '#BB66FF',
                        filter: 'drop-shadow(0 0 8px rgba(153,51,255,0.85))',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <span className="text-lg font-black tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span style={{ color: 'var(--text-primary)' }}>Suraj</span>
              <span style={{ color: '#BB66FF' }}> Kumar</span>
            </span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 420, damping: 42, mass: 0.75, delay: i * 0.055 }}
                className={`nav-link ${activeId === link.href.slice(1) ? 'active' : ''}`}
              >
                {link.name}
              </motion.a>
            ))}

            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 42, mass: 0.75, delay: 0.33 }}
              className="btn-primary py-2 px-5 text-sm gap-1.5"
            >
              <span className="pulse-dot scale-[0.7]" />
              Hire Me
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center">
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => setIsOpen(p => !p)}
              className="p-2 rounded-xl"
              style={{
                border: '1.5px solid rgba(153,51,255,0.25)',
                background: 'rgba(153,51,255,0.08)',
                color: 'var(--text-primary)',
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu — clay-glass panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{    opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 42 }}
              className="md:hidden overflow-hidden"
              style={{
                backgroundColor: 'rgba(0,0,0,0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(153,51,255,0.15)',
              }}
            >
              <div className="px-6 py-6 space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -22 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 42, delay: i * 0.045 }}
                    className="flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-250"
                    style={
                      activeId === link.href.slice(1)
                        ? {
                            color: '#BB66FF',
                            background: 'rgba(153,51,255,0.12)',
                            border: '1px solid rgba(153,51,255,0.28)',
                            boxShadow: 'inset 0 1px 4px rgba(255,255,255,0.06)',
                          }
                        : { color: 'var(--text-secondary)' }
                    }
                  >
                    {link.name}
                  </motion.a>
                ))}
                <div className="pt-2">
                  <a href="#contact" onClick={() => setIsOpen(false)} className="btn-primary w-full justify-center gap-2">
                    <span className="pulse-dot scale-[0.7]" />
                    Hire Me
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
