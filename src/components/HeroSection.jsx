import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profilePic from '../assets/profile-pic/profile pic.png';

/* ── Typing Animation Hook ── */
function useTypingEffect(text, speed = 60) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Floating Badge ── */
function FloatingBadge({ label, icon, style, delay = 0 }) {
  return (
    <motion.div
      className="floating-badge"
      style={style}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200 }}
    >
      <span className="floating-badge-icon">{icon}</span>
      <span className="floating-badge-label">{label}</span>
    </motion.div>
  );
}

export default function HeroSection() {
  const { displayed, done } = useTypingEffect("Hi, I'm Nayan Adhikary", 55);

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-content">
          {/* ── Text Column ── */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="section-label"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span>📊</span>
              Data Analyst &amp; MCA 2026
            </motion.div>

            <h1 className="typing-text" style={{ marginBottom: '0.3rem' }}>
              {displayed}
              {!done && <span className="typing-cursor" />}
            </h1>

            <motion.p
              className="hero-role glow-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              Data Analyst | MCA 2026 Batch
            </motion.p>

            <motion.p
              className="hero-desc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              Detail-oriented analyst skilled in acquiring data, handling large datasets, 
              and translating complex requirements into clear{' '}
              <strong style={{ color: 'var(--accent-primary)' }}>business insights</strong>.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 0.8 }}
            >
              <a href="#projects" className="btn-outline" onClick={e => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Explore My Work <i className="fa-solid fa-arrow-right" />
              </a>
              <a
                href="https://nayanadhikary.github.io/portfolio/"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Live Portfolio <i className="fa-solid fa-external-link" />
              </a>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
            >
              <div className="hero-stat">
                <span className="hero-stat-number">5+</span>
                <span className="hero-stat-label">Projects</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">3+</span>
                <span className="hero-stat-label">Years Exp.</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">8</span>
                <span className="hero-stat-label">Technologies</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">R²0.82</span>
                <span className="hero-stat-label">Best ML Score</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Visual Column ── */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <div className="profile-card-wrapper">
              <div className="profile-glow-backdrop" />
              <motion.div
                className="profile-frame"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
              >
                <div className="profile-ring" />
                <div className="profile-photo-circle">
                  <img src={profilePic} alt="Nayan Adhikary" className="profile-photo-img" />
                </div>
                <motion.div
                  className="available-badge"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <span className="available-dot" />
                  Available for work
                </motion.div>
              </motion.div>

              <FloatingBadge label="Python"   icon="🐍"  style={{ top: '8%',    left: '-10%' }}  delay={0.4} />
              <FloatingBadge label="SQL"      icon="🗄️" style={{ top: '22%',   right: '-12%' }} delay={0.55} />
              <FloatingBadge label="Pandas"   icon="🐼"  style={{ top: '55%',   left: '-14%' }}  delay={0.7} />
              <FloatingBadge label="ML"       icon="🤖"  style={{ bottom: '18%', right: '-10%' }} delay={0.85} />
              <FloatingBadge label="Power BI" icon="📊"  style={{ bottom: '4%', left: '10%' }}   delay={1.0} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <a href="#about" className="scroll-indicator" onClick={e => {
        e.preventDefault();
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }}>
        <i className="fa-solid fa-chevron-down" />
      </a>
    </section>
  );
}
