import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const SOCIALS = [
  { icon: 'fa-brands fa-github', href: 'https://github.com/NayanAdhikary', label: 'GitHub' },
  { icon: 'fa-solid fa-envelope', href: 'mailto:nayan56793@gmail.com', label: 'Email' },
  { icon: 'fa-solid fa-phone', href: 'tel:+919330494579', label: 'Phone' },
];

/* ── Magnetic Icon ── */
function MagneticIcon({ icon, href, label }) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px) scale(1.15)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="social-link"
      aria-label={label}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <i className={icon} />
    </a>
  );
}

export default function FooterSection() {
  return (
    <footer id="contact" className="footer-reveal">
      <div className="container">
        <motion.h2
          className="footer-big-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Ready to turn data into{' '}
          <span className="gradient-text">actionable insights</span>?{' '}
          Let's connect.
        </motion.h2>

        <motion.div
          className="social-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {SOCIALS.map(s => (
            <MagneticIcon key={s.label} {...s} />
          ))}
        </motion.div>

        {/* Contact details text */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '2rem' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            <a href="https://github.com/NayanAdhikary" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
              github.com/NayanAdhikary
            </a>
            <span style={{ margin: '0 12px', color: 'var(--text-hint)' }}>·</span>
            <a href="mailto:nayan56793@gmail.com" style={{ color: 'var(--accent-secondary)', textDecoration: 'none' }}>
              nayan56793@gmail.com
            </a>
            <span style={{ margin: '0 12px', color: 'var(--text-hint)' }}>·</span>
            <a href="tel:+919330494579" style={{ color: 'var(--accent-tertiary)', textDecoration: 'none' }}>
              +91 9330494579
            </a>
          </p>
        </motion.div>

        <div className="footer-copy">
          <p>© {new Date().getFullYear()} Nayan Adhikary. All rights reserved.</p>
          <p style={{ marginTop: '6px', fontSize: '0.78rem', opacity: 0.6 }}>
            Built with React, Framer Motion & ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
