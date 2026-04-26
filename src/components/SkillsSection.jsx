import { useRef } from 'react';
import { motion } from 'framer-motion';

const SKILL_GROUPS = [
  {
    id: 'reporting',
    icon: '📊',
    title: 'Reporting & BI',
    skills: ['Advanced Excel (Power Query, Pivot Tables)', 'Power BI', 'Tableau'],
    color: '#fbbf24',
  },
  {
    id: 'programming',
    icon: '💻',
    title: 'Programming Languages',
    skills: ['Python (Pandas, NumPy, Matplotlib)', 'JavaScript (ES6+)'],
    color: '#a78bfa',
  },
  {
    id: 'databases',
    icon: '🗄️',
    title: 'Databases & Management',
    skills: ['SQL', 'Internal Database Maintenance', 'Data Cleaning'],
    color: '#38bdf8',
  },
  {
    id: 'analysis',
    icon: '🧠',
    title: 'Core Analysis',
    skills: ['Statistical Techniques', 'Trend & Pattern Identification', 'Large Dataset Handling'],
    color: '#34d399',
  },
  {
    id: 'soft',
    icon: '🗣️',
    title: 'Soft Skills',
    skills: ['Translating Technical Data into Non-Technical Terms', 'High-Level Communication'],
    color: '#f472b6',
  },
];

/* 3D tilt effect on mouse move */
function TiltCard({ children, color, idx }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.borderColor = `${color}55`;
    card.style.boxShadow = `0 12px 40px ${color}18, 0 0 30px ${color}12`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    card.style.borderColor = '';
    card.style.boxShadow = '';
  };

  return (
    <motion.div
      ref={cardRef}
      className="skill-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: idx * 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="skills-section">
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 400, height: 400, background: 'radial-gradient(circle,rgba(0,212,170,0.05),transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 350, height: 350, background: 'radial-gradient(circle,rgba(56,189,248,0.05),transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '4rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            <span>⚡</span> Technical Arsenal
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="section-subtitle">
            Hover over the cards to see the interactive 3D tilt effect — each group represents a core competency area
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {SKILL_GROUPS.map((group, idx) => (
            <TiltCard key={group.id} color={group.color} idx={idx}>
              <span className="skill-card-icon">{group.icon}</span>
              <h3 className="skill-card-title">{group.title}</h3>
              <div className="skill-tags">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
