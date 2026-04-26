import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    repo: 'IPL-Cricket-Performance-Analytics',
    title: 'IPL Analytics',
    desc: 'Analysis of 2008–2025 IPL data with KPI computation — strike rate, economy, boundary %, dot-ball % — built for a BCCI Performance Analyst profile.',
    type: '📊 EDA · Sports Analytics',
    tags: ['Python', 'Pandas', 'Matplotlib', 'NumPy'],
    accent: '#a78bfa',
    gradient: 'linear-gradient(135deg,#a78bfa,#38bdf8)',
    link: 'https://github.com/NayanAdhikary/IPL-Cricket-Performance-Analytics',
    featured: true,
  },
  {
    repo: 'cafe-sales-data-cleaning',
    title: 'Cafe Sales',
    desc: 'Database maintenance & cleaning pipeline resolving inconsistencies and type-casting errors in the Kaggle Cafe Sales dirty dataset.',
    type: '🧹 Data Cleaning',
    tags: ['Python', 'Pandas', 'Kaggle'],
    accent: '#fb923c',
    gradient: 'linear-gradient(135deg,#fb923c,#fbbf24)',
    link: 'https://github.com/NayanAdhikary/cafe-sales-data-cleaning',
    featured: false,
  },
  {
    repo: 'sf-salaries-insights',
    title: 'SF Salaries',
    desc: 'Exploratory Data Analysis (EDA) identifying spending patterns and actionable business insights from SF City employee salaries dataset.',
    type: '📊 Exploratory Analysis',
    tags: ['Python', 'Pandas', 'Seaborn'],
    accent: '#38bdf8',
    gradient: 'linear-gradient(135deg,#38bdf8,#34d399)',
    link: 'https://github.com/NayanAdhikary/sf-salaries-insights',
    featured: false,
  },
  {
    repo: 'sf-salary-predictor',
    title: 'Salary Predictor',
    desc: 'Random Forest (R² = 0.82) statistical model forecasting compensation trends for SF city employees.',
    type: '🤖 Machine Learning',
    tags: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas'],
    accent: '#f472b6',
    gradient: 'linear-gradient(135deg,#f472b6,#a78bfa)',
    link: 'https://github.com/NayanAdhikary/sf-salary-predictor',
    featured: false,
  },
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          PROJECTS.map(async (p) => {
            try {
              const res = await fetch(`https://api.github.com/repos/NayanAdhikary/${p.repo}`);
              if (!res.ok) throw new Error('fail');
              const data = await res.json();
              return { ...p, stars: data.stargazers_count || 0, forks: data.forks_count || 0 };
            } catch {
              return { ...p, stars: 0, forks: 0 };
            }
          })
        );
        setProjects(results);
      } catch {
        setProjects(PROJECTS.map(p => ({ ...p, stars: 0, forks: 0 })));
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="projects-section">
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
            <span>🚀</span> Portfolio Work
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world data problems — from dirty data to ML-powered predictions
          </p>
        </motion.div>

        {loading ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card" style={{ padding: '2rem', height: i === 1 ? 240 : 160 }}>
                <div className="loading-pulse" style={{ height: 20, width: '30%', marginBottom: '1rem', borderRadius: 8 }} />
                <div className="loading-pulse" style={{ height: 28, width: '60%', marginBottom: '1rem', borderRadius: 8 }} />
                <div className="loading-pulse" style={{ height: 14, width: '85%', borderRadius: 6 }} />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Featured Project */}
            {featured && (
              <motion.a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                whileHover={{ y: -6 }}
                className="project-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  alignItems: 'center',
                  gap: '2rem',
                  padding: '2.5rem 2.8rem',
                  borderColor: `${featured.accent}30`,
                  boxShadow: `0 4px 40px ${featured.accent}18, 0 2px 12px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Accent bar */}
                <div style={{ position: 'absolute', left: 0, top: '12%', bottom: '12%', width: 4, borderRadius: 4, background: featured.gradient }} />
                {/* Glow blob */}
                <div style={{ position: 'absolute', top: -40, right: '5%', width: 280, height: 280, background: `radial-gradient(circle,${featured.accent}15,transparent 65%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', color: featured.accent, background: `${featured.accent}14`, border: `1px solid ${featured.accent}35`, borderRadius: 99, padding: '3px 12px' }}>
                      {featured.type}
                    </span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fbbf24', background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.30)', borderRadius: 99, padding: '3px 10px' }}>
                      ★ Featured
                    </span>
                  </div>
                  <h3 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', lineHeight: 1.2 }}>
                    {featured.title}
                  </h3>
                  <p style={{ margin: '0 0 1.2rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 680 }}>
                    {featured.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {featured.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 1, flexShrink: 0, width: 52, height: 52, borderRadius: '50%', background: `${featured.accent}15`, border: `1px solid ${featured.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: featured.accent }}>
                  <i className="fa-brands fa-github" />
                </div>
              </motion.a>
            )}

            {/* Other Projects Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {rest.map((project, idx) => (
                <motion.a
                  key={project.repo}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.55, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="project-card"
                  style={{ borderColor: `${project.accent}20` }}
                >
                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 2, background: project.gradient, borderRadius: 2 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', color: project.accent, background: `${project.accent}12`, border: `1px solid ${project.accent}30`, borderRadius: 99, padding: '3px 10px' }}>
                      {project.type}
                    </span>
                    <i className="fa-brands fa-github" style={{ fontSize: '1.1rem', color: 'var(--text-hint)' }} />
                  </div>
                  <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', lineHeight: 1.3 }}>
                    {project.title}
                  </h3>
                  <p style={{ margin: '0 0 1.2rem', color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.6, flexGrow: 1 }}>
                    {project.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {project.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                    <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-hint)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <i className="fa-regular fa-star" /> {project.stars}
                    </span>
                  </div>

                  {/* Hover overlay with link */}
                  <div className="project-overlay">
                    <i className="fa-brands fa-github" style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                      View on GitHub →
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
