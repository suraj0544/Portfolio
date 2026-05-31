import React, { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';

function App() {
  const [splashDone, setSplashDone] = useState(false);
  const [error]                      = useState(null);

  /* Force dark mode permanently */
  useEffect(() => {
    document.documentElement.classList.remove('light');
    localStorage.removeItem('portfolio-theme');
  }, []);

  /* Smooth scroll */
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    } catch (e) {
      console.error('Lenis init failed:', e);
    }
    return () => { if (lenis) lenis.destroy(); };
  }, []);

  const handleSplashComplete = useCallback(() => {
    setSplashDone(true);
  }, []);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black text-red-500 flex items-center justify-center font-mono p-10">
        <div className="max-w-md">
          <h1 className="text-xl font-bold mb-4">CRITICAL ERROR</h1>
          <p className="text-sm opacity-80">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 border border-red-500/30 rounded hover:bg-red-500/10"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!splashDone ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative min-h-screen"
            style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
          >
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Achievements />
              <Contact />
            </main>

            <footer
              className="py-10 text-center text-sm"
              style={{ borderTop: '1px solid rgba(153,51,255,0.12)', color: 'var(--text-muted)' }}
            >
              <div className="max-w-7xl mx-auto px-6">
                <p>© {new Date().getFullYear()} Suraj Kumar Ozha. Built with React &amp; Tailwind.</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-30">
                  Scanning for vulnerabilities... Status: SECURE
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
