import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MILESTONES = [
  {
    year: '2024–2026',
    title: 'Master of Computer Applications (MCA)',
    subtitle: 'Techno India Hooghly Campus',
    desc: 'Pursuing advanced studies in computer science, data analytics, and software engineering.',
    icon: '🎓',
    color: '#a78bfa',
  },
  {
    year: '2024',
    title: 'Graduated BCA — CGPA: 8.20',
    subtitle: 'Bachelor of Computer Applications',
    desc: 'Completed undergraduate degree with distinction, building a strong foundation in programming and databases.',
    icon: '📜',
    color: '#38bdf8',
  },
  {
    year: '2023–2024',
    title: 'Technical Head & Lead Organizer',
    subtitle: 'College Techfest',
    desc: 'Managed registration databases for 500+ participants and coordinated with stakeholders across departments.',
    icon: '🏆',
    color: '#fbbf24',
  },
  {
    year: '2021',
    title: 'Higher Secondary (60.2%)',
    subtitle: 'Class XII',
    desc: 'Completed higher secondary education with focus on science and mathematics.',
    icon: '📚',
    color: '#34d399',
  },
  {
    year: '2019',
    title: 'Secondary (40.2%)',
    subtitle: 'Class X',
    desc: 'Completed secondary education — foundation years that sparked interest in technology.',
    icon: '🏫',
    color: '#f472b6',
  },
];

export default function TimelineSection() {
  const [progress, setProgress] = useState(0);
  const [activeNodes, setActiveNodes] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = rect.height;
      
      // How far into the section we are
      const scrolled = Math.max(0, windowH - rect.top);
      const pct = Math.min(1, Math.max(0, scrolled / (totalH + windowH * 0.3)));
      setProgress(pct * 100);

      // Activate nodes
      const nodes = wrapperRef.current.querySelectorAll('.tl-item');
      const active = [];
      nodes.forEach((node, i) => {
        const nodeRect = node.getBoundingClientRect();
        if (nodeRect.top < windowH * 0.75) active.push(i);
      });
      setActiveNodes(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="timeline" className="timeline-section">
      <div className="container">
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            <span>📅</span> My Journey
          </div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Leadership</span>
          </h2>
          <p className="section-subtitle">
            Key milestones on my path from student to data professional
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-wrapper" ref={wrapperRef}>
          {/* Background line */}
          <div className="timeline-line" />
          {/* Animated progress line */}
          <div
            className="timeline-progress"
            style={{ height: `${progress}%` }}
          />

          {MILESTONES.map((m, i) => (
            <motion.div
              key={i}
              className={`timeline-item tl-item`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Node dot */}
              <div
                className={`timeline-node ${activeNodes.includes(i) ? 'active' : ''}`}
                style={{ borderColor: m.color, ...(activeNodes.includes(i) ? { background: m.color, boxShadow: `0 0 16px ${m.color}80` } : {}) }}
              />

              {/* Card */}
              <div className="timeline-card">
                <span className="timeline-year" style={{ color: m.color, borderColor: `${m.color}40`, background: `${m.color}10` }}>
                  {m.icon} {m.year}
                </span>
                <h4>{m.title}</h4>
                <p style={{ color: 'var(--accent-secondary)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                  {m.subtitle}
                </p>
                <p>{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
