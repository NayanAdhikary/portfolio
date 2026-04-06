import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────
   DATA  –  skills organised by category
   proficiency: 'expert' | 'proficient' | 'learning'
───────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: 'languages', label: 'Languages', icon: '💻' },
  { id: 'data', label: 'Data', icon: '📊' },
  { id: 'ml', label: 'ML / AI', icon: '🤖' },
  { id: 'bi', label: 'BI & Viz', icon: '📉' },
  { id: 'tools', label: 'Tools', icon: '🛠️' },
  { id: 'web', label: 'Web', icon: '🌐' },
];

const SKILLS = [
  // Languages
  { id: 's1', cat: 'languages', name: 'Python',      icon: '🐍', prof: 'expert',     color: '#a78bfa' },
  { id: 's2', cat: 'languages', name: 'SQL',          icon: '🗄️', prof: 'proficient', color: '#38bdf8' },
  { id: 's3', cat: 'languages', name: 'JavaScript',   icon: '⚡', prof: 'proficient', color: '#fbbf24' },
  // Data
  { id: 's4', cat: 'data', name: 'Pandas',            icon: '🐼', prof: 'expert',     color: '#a78bfa' },
  { id: 's5', cat: 'data', name: 'NumPy',             icon: '🔢', prof: 'expert',     color: '#38bdf8' },
  { id: 's6', cat: 'data', name: 'Matplotlib',        icon: '📈', prof: 'expert',     color: '#34d399' },
  { id: 's7', cat: 'data', name: 'Seaborn',           icon: '🎨', prof: 'proficient', color: '#f472b6' },
  // ML
  { id: 's8', cat: 'ml', name: 'Scikit-learn',        icon: '🧠', prof: 'proficient', color: '#f472b6' },
  { id: 's9', cat: 'ml', name: 'Linear Regression',   icon: '📉', prof: 'proficient', color: '#a78bfa' },
  { id: 's10', cat: 'ml', name: 'Random Forest (Learning Phase)',      icon: '🌲', prof: 'proficient', color: '#34d399' },
  { id: 's11', cat: 'ml', name: 'EDA / Feature Eng.', icon: '🔬', prof: 'expert',     color: '#38bdf8' },
  // BI & Viz
  { id: 's12', cat: 'bi', name: 'Power BI(Learning Phase)',           icon: '🟡', prof: 'proficient', color: '#fbbf24' },
  { id: 's13', cat: 'bi', name: 'Plotly',             icon: '📊', prof: 'proficient', color: '#fb923c' },
  { id: 's14', cat: 'bi', name: 'Tableau(Learning Phase)',            icon: '🔵', prof: 'learning',   color: '#38bdf8' },
  { id: 's15', cat: 'bi', name: 'Excel / Sheets',     icon: '📋', prof: 'expert',     color: '#34d399' },
  // Tools
  { id: 's16', cat: 'tools', name: 'Jupyter',         icon: '📓', prof: 'expert',     color: '#f472b6' },
  { id: 's17', cat: 'tools', name: 'Git & GitHub',    icon: '🔀', prof: 'proficient', color: '#a78bfa' },
  { id: 's18', cat: 'tools', name: 'VS Code',         icon: '🖥️', prof: 'expert',     color: '#38bdf8' },
  // Web
  { id: 's19', cat: 'web', name: 'React',             icon: '⚛️', prof: 'proficient', color: '#61dafb' },
  { id: 's20', cat: 'web', name: 'HTML / CSS',        icon: '🎨', prof: 'proficient', color: '#fb923c' },
];

const PROF_META = {
  expert:     { label: 'Expert',     dot: '#34d399', bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)' },
  proficient: { label: 'Proficient', dot: '#38bdf8', bg: 'rgba(56,189,248,0.10)', border: 'rgba(56,189,248,0.28)' },
  learning:   { label: 'Learning',   dot: '#fbbf24', bg: 'rgba(251,191,36,0.10)', border: 'rgba(251,191,36,0.28)' },
};

/* ─── Skill Chip ─────────────────────────────────────────── */
function SkillChip({ skill, idx }) {
  const pm = PROF_META[skill.prof];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.28, delay: idx * 0.03 }}
      whileHover={{ y: -3, scale: 1.04 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '1.1rem 1rem',
        borderRadius: '16px',
        background: `rgba(255,255,255,0.035)`,
        border: `1px solid ${skill.color}28`,
        backdropFilter: 'blur(12px)',
        cursor: 'default',
        transition: 'box-shadow 0.25s ease',
        boxShadow: `0 2px 12px rgba(0,0,0,0.25)`,
        minWidth: '100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle top-edge glow */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: `linear-gradient(90deg, transparent, ${skill.color}55, transparent)`,
      }} />

      <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{skill.icon}</span>
      <span style={{
        fontSize: '0.78rem', fontWeight: 700,
        fontFamily: 'var(--font-heading)', color: '#e2e8f0',
        textAlign: 'center', letterSpacing: '0.01em',
      }}>{skill.name}</span>

      {/* proficiency badge */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        fontSize: '0.65rem', fontWeight: 700,
        fontFamily: 'var(--font-heading)', letterSpacing: '0.04em',
        color: pm.dot,
        background: pm.bg, border: `1px solid ${pm.border}`,
        borderRadius: '99px', padding: '2px 8px',
      }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: pm.dot, flexShrink: 0 }} />
        {pm.label}
      </span>
    </motion.div>
  );
}

/* ─── Legend ─────────────────────────────────────────────── */
function Legend() {
  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
      {Object.entries(PROF_META).map(([key, pm]) => (
        <span key={key} style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.75rem', fontWeight: 600,
          fontFamily: 'var(--font-heading)', color: 'var(--text-muted)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: pm.dot, boxShadow: `0 0 5px ${pm.dot}` }} />
          {pm.label}
        </span>
      ))}
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────── */
export default function TechStack3D() {
  const [active, setActive] = useState('all');

  const visible = active === 'all'
    ? SKILLS
    : SKILLS.filter(s => s.cat === active);

  return (
    <section id="tech-stack" style={{ position: 'relative', padding: '7rem 0', overflow: 'hidden' }}>

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '5%',   left: '10%',  width: 420, height: 420, background: 'radial-gradient(circle,rgba(167,139,250,0.06),transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '8%',  width: 360, height: 360, background: 'radial-gradient(circle,rgba(56,189,248,0.06),transparent 70%)',  borderRadius: '50%', filter: 'blur(50px)' }} />
      </div>

      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(167,139,250,0.10)', border: '1px solid rgba(167,139,250,0.25)',
            borderRadius: '99px', padding: '6px 18px', marginBottom: '1.1rem',
            fontFamily: 'var(--font-heading)', fontSize: '0.78rem', fontWeight: 700,
            color: 'var(--accent-primary)', letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            ⚡ Technical Arsenal
          </div>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 800, margin: 0,
            fontFamily: 'var(--font-heading)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-main)',
          }}>
            Tools I Work <span className="gradient-text">With</span>
          </h2>
          <p style={{ marginTop: '0.9rem', color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '0.9rem auto 0', lineHeight: 1.6 }}>
            Technologies I use daily to wrangle data, build models, and create insights
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '2rem' }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '99px', cursor: 'pointer',
                fontFamily: 'var(--font-heading)', fontSize: '0.82rem', fontWeight: 700,
                letterSpacing: '0.02em',
                background: active === cat.id ? 'rgba(167,139,250,0.18)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active === cat.id ? 'rgba(167,139,250,0.55)' : 'rgba(255,255,255,0.08)'}`,
                color: active === cat.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                transition: 'all 0.22s ease',
                boxShadow: active === cat.id ? '0 0 18px rgba(167,139,250,0.20)' : 'none',
              }}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Legend */}
        <Legend />

        {/* Skill chips */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '1rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((skill, idx) => (
              <SkillChip key={skill.id} skill={skill} idx={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Count summary */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center', marginTop: '2.5rem',
            color: 'var(--text-hint)', fontSize: '0.8rem',
            fontFamily: 'var(--font-heading)', letterSpacing: '0.04em',
          }}
        >
          Showing <strong style={{ color: 'var(--accent-primary)' }}>{visible.length}</strong> of {SKILLS.length} skills
          {active !== 'all' && ` in ${CATEGORIES.find(c => c.id === active)?.label}`}
        </motion.p>
      </div>
    </section>
  );
}
