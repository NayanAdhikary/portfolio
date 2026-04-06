import { useState, useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Hero3D from '../components/Hero3D';
import TechStack3D from '../components/TechStack3D';


const projectsList = [
    {
        repo: 'IPL-Cricket-Performance-Analytics',
        title: 'IPL Cricket Performance Analytics',
        about: 'End-to-end analytics platform on IPL match data (2008–2025). Computes player KPIs — strike rate, economy rate, boundary %, dot-ball % — with rich visualisations built for a BCCI Performance Analyst profile.',
        link: 'https://github.com/NayanAdhikary/IPL-Cricket-Performance-Analytics',
        type: '📊 EDA · Sports Analytics',
        accent: 'linear-gradient(135deg,#a78bfa,#38bdf8)',
        accentColor: '#a78bfa',
        tags: ['Python', 'Pandas', 'Matplotlib', 'NumPy'],
        featured: true,
    },
    {
        repo: 'sf-salary-predictor',
        title: 'SF Salary Predictor',
        about: 'ML pipeline that predicts SF city employee salaries using a tuned Random Forest model achieving R² = 0.82.',
        link: 'https://github.com/NayanAdhikary/sf-salary-predictor',
        type: '🤖 Machine Learning',
        accent: 'linear-gradient(135deg,#f472b6,#a78bfa)',
        accentColor: '#f472b6',
        tags: ['Python', 'Scikit-learn', 'Random Forest', 'Pandas'],
        featured: false,
    },
    {
        repo: 'sf-salaries-insights',
        title: 'SF Salaries — EDA & Insights',
        about: 'In-depth exploratory data analysis on San Francisco salaries dataset — uncovering pay distributions, departmental trends, and outliers.',
        link: 'https://github.com/NayanAdhikary/sf-salaries-insights',
        type: '📊 Exploratory Analysis',
        accent: 'linear-gradient(135deg,#38bdf8,#34d399)',
        accentColor: '#38bdf8',
        tags: ['Python', 'Pandas', 'Seaborn', 'Jupyter'],
        featured: false,
    },
    {
        repo: 'sf-salaries-cleaning',
        title: 'SF Salaries — Data Cleaning',
        about: 'Rigorous data cleaning pipeline for SF City Employee salaries: handling nulls, type fixes, outlier treatment, and standardisation using Pandas.',
        link: 'https://github.com/NayanAdhikary/sf-salaries-cleaning',
        type: '🧹 Data Cleaning',
        accent: 'linear-gradient(135deg,#34d399,#38bdf8)',
        accentColor: '#34d399',
        tags: ['Python', 'Pandas', 'Data Wrangling'],
        featured: false,
    },
    {
        repo: 'cafe-sales-data-cleaning',
        title: 'Cafe Sales — Dirty Data',
        about: 'Cleaning pipeline for the Kaggle "Cafe Sales – Dirty Data" dataset. Tackles missing values, type coercion, text standardisation, with a before–after comparison analysis.',
        link: 'https://github.com/NayanAdhikary/cafe-sales-data-cleaning',
        type: '🧹 Data Cleaning',
        accent: 'linear-gradient(135deg,#fb923c,#fbbf24)',
        accentColor: '#fb923c',
        tags: ['Python', 'Pandas', 'Kaggle', 'EDA'],
        featured: false,
    }
];


function Home() {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
            .then((result) => {
                console.log(result.text);
                alert("Message Sent successfully!");
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                alert("Failed to send the message, please try again.");
            });
    };

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const fetchedData = await Promise.all(
                    projectsList.map(async (proj) => {
                        try {
                            const response = await fetch(`https://api.github.com/repos/NayanAdhikary/${proj.repo}`);
                            if (!response.ok) throw new Error('Failed to fetch');
                            const data = await response.json();

                            return {
                                ...proj,
                                stars: data.stargazers_count || 0,
                                forks: data.forks_count || 0,
                                language: data.language || 'Python',
                            };
                        } catch (err) {
                            console.error(`Error fetching ${proj.repo}:`, err);
                            // Fallback to defaults
                            return {
                                ...proj,
                                stars: 0,
                                forks: 0,
                                language: 'Python/Jupyter',
                            };
                        }
                    })
                );
                setProjectsData(fetchedData);
                setLoading(false);
            } catch (error) {
                console.error('Error in fetching projects:', error);
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    return (
        <main>
            {/* Hero Section */}
            <section id="hero" className="relative min-h-[85vh] flex items-center overflow-hidden pt-32 pb-24">
                <div className="container mx-auto px-4 z-10 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        {/* Text Content */}
                        <motion.div 
                            className="flex-1 text-left w-full"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Role badge */}
                            <motion.div
                                className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-semibold"
                                style={{
                                    background: 'rgba(167,139,250,0.12)',
                                    border: '1px solid rgba(167,139,250,0.35)',
                                    color: 'var(--accent-primary)',
                                    fontFamily: 'var(--font-heading)',
                                    letterSpacing: '0.04em',
                                }}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.6 }}
                            >
                                <span style={{ fontSize: '1rem' }}>📊</span>
                                Data Analyst &amp; Performance Analyst
                            </motion.div>

                            <motion.h1 
                                className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Hi, I'm <br/><span className="gradient-text">Nayan Adhikary</span>
                            </motion.h1>
                            
                            <motion.p 
                                className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                I turn raw data into <strong style={{color:'var(--accent-secondary)'}}>actionable insights</strong>. 
                                Specializing in EDA, Data Cleaning, ML modelling, and sports performance analytics.
                            </motion.p>
                            
                            <motion.div 
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                <a href="#projects" className="btn-primary">
                                    View My Work <i className="fa-solid fa-arrow-right"></i>
                                </a>
                                <Link to="/about" className="btn-secondary">
                                    About Me <i className="fa-regular fa-user"></i>
                                </Link>
                                <a href="https://github.com/NayanAdhikary" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                    GitHub <i className="fa-brands fa-github"></i>
                                </a>
                            </motion.div>

                            {/* Stats row */}
                            <motion.div
                                className="hero-stats"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
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

                        {/* Profile Image Card */}
                        <motion.div 
                            className="flex-1 w-full flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 100 }}
                        >
                            <Hero3D />
                        </motion.div>
                    </div>
                </div>
                
                {/* Scroll Down Indicator */}
                <motion.div 
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <a href="#projects" className="text-gray-500 hover:text-white transition-colors">
                        <i className="fa-solid fa-chevron-down text-3xl"></i>
                    </a>
                </motion.div>
            </section>

            {/* ── Projects Section ── */}
            <section id="projects" className="relative z-10 w-full" style={{ padding: '7rem 0' }}>
                <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem' }}>

                    {/* Section Header */}
                    <motion.div
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            background: 'rgba(56,189,248,0.10)', border: '1px solid rgba(56,189,248,0.25)',
                            borderRadius: '99px', padding: '6px 18px', marginBottom: '1.1rem',
                            fontFamily: 'var(--font-heading)', fontSize: '0.78rem', fontWeight: 700,
                            color: '#38bdf8', letterSpacing: '0.07em', textTransform: 'uppercase',
                        }}>
                            🚀 Portfolio Work
                        </div>
                        <h2 style={{
                            fontSize: 'clamp(2.2rem,5vw,3.4rem)', fontWeight: 800, margin: 0,
                            fontFamily: 'var(--font-heading)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-main)',
                        }}>
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                        <p style={{ marginTop: '0.9rem', color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0.9rem auto 0', lineHeight: 1.6 }}>
                            Real-world data problems I've tackled — from raw dirty data to ML-powered predictions
                        </p>
                    </motion.div>

                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="glass-card" style={{ padding: '2rem', borderRadius: '20px', height: i === 0 ? '260px' : '180px' }}>
                                    <div className="loading-pulse" style={{ height: '20px', width: '30%', marginBottom: '1rem', borderRadius: '8px' }} />
                                    <div className="loading-pulse" style={{ height: '28px', width: '65%', marginBottom: '1rem', borderRadius: '8px' }} />
                                    <div className="loading-pulse" style={{ height: '14px', width: '90%', borderRadius: '6px' }} />
                                </div>
                            ))}
                        </div>
                    ) : (() => {
                        const featured = projectsData.find(p => p.featured);
                        const rest = projectsData.filter(p => !p.featured);
                        return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                                {/* Featured Card */}
                                {featured && (
                                    <motion.a
                                        href={featured.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.65 }}
                                        whileHover={{ y: -4 }}
                                        style={{
                                            display: 'grid', gridTemplateColumns: '1fr auto',
                                            alignItems: 'center', gap: '2rem',
                                            borderRadius: '24px', padding: '2.5rem 2.8rem',
                                            background: 'rgba(10,10,22,0.82)',
                                            border: `1px solid ${featured.accentColor}35`,
                                            backdropFilter: 'blur(18px)',
                                            position: 'relative', overflow: 'hidden',
                                            textDecoration: 'none', cursor: 'pointer',
                                            boxShadow: `0 4px 40px ${featured.accentColor}22, 0 2px 12px rgba(0,0,0,0.5)`,
                                        }}
                                    >
                                        <div style={{ position: 'absolute', left: 0, top: '12%', bottom: '12%', width: '4px', borderRadius: '4px', background: featured.accent }} />
                                        <div style={{ position: 'absolute', top: '-40px', right: '5%', width: '280px', height: '280px', background: `radial-gradient(circle,${featured.accentColor}18,transparent 65%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />

                                        <div style={{ position: 'relative', zIndex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.06em', color: featured.accentColor, background: `${featured.accentColor}14`, border: `1px solid ${featured.accentColor}35`, borderRadius: '99px', padding: '3px 12px' }}>
                                                    {featured.type}
                                                </span>
                                                <span style={{ fontSize: '0.68rem', fontWeight: 800, fontFamily: 'var(--font-heading)', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fbbf24', background: 'rgba(251,191,36,0.10)', border: '1px solid rgba(251,191,36,0.30)', borderRadius: '99px', padding: '3px 10px' }}>
                                                    ★ Featured
                                                </span>
                                            </div>
                                            <h3 style={{ margin: '0 0 0.75rem', fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', lineHeight: 1.2 }}>
                                                {featured.title}
                                            </h3>
                                            <p style={{ margin: '0 0 1.4rem', color: 'var(--text-muted)', fontSize: '0.97rem', lineHeight: 1.65, maxWidth: '680px' }}>
                                                {featured.about}
                                            </p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {featured.tags.map(tag => (
                                                    <span key={tag} style={{ fontSize: '0.75rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '8px', padding: '3px 10px' }}>{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ position: 'relative', zIndex: 1, flexShrink: 0, width: '52px', height: '52px', borderRadius: '50%', background: `${featured.accentColor}18`, border: `1px solid ${featured.accentColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: featured.accentColor }}>
                                            <i className="fa-brands fa-github" />
                                        </div>
                                    </motion.a>
                                )}

                                {/* 2-col grid for the rest */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
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
                                            whileHover={{ y: -4 }}
                                            style={{
                                                display: 'flex', flexDirection: 'column',
                                                borderRadius: '20px', padding: '1.8rem',
                                                background: 'rgba(10,10,22,0.78)',
                                                border: `1px solid ${project.accentColor}28`,
                                                backdropFilter: 'blur(16px)',
                                                textDecoration: 'none', cursor: 'pointer',
                                                position: 'relative', overflow: 'hidden',
                                                boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
                                            }}
                                        >
                                            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: project.accent, borderRadius: '2px' }} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                                <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'var(--font-heading)', letterSpacing: '0.05em', color: project.accentColor, background: `${project.accentColor}12`, border: `1px solid ${project.accentColor}30`, borderRadius: '99px', padding: '3px 10px' }}>
                                                    {project.type}
                                                </span>
                                                <i className="fa-brands fa-github" style={{ fontSize: '1.1rem', color: 'var(--text-hint)' }} />
                                            </div>
                                            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.15rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--text-main)', lineHeight: 1.3 }}>
                                                {project.title}
                                            </h3>
                                            <p style={{ margin: '0 0 1.2rem', color: 'var(--text-muted)', fontSize: '0.87rem', lineHeight: 1.6, flexGrow: 1 }}>
                                                {project.about}
                                            </p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                                {project.tags.map(tag => (
                                                    <span key={tag} style={{ fontSize: '0.7rem', fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--text-hint)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '2px 8px' }}>{tag}</span>
                                                ))}
                                                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-hint)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <i className="fa-regular fa-star" /> {project.stars}
                                                </span>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </div>
            </section>

            {/* Tech Stack Section */}
            <TechStack3D />

            {/* Contact Section */}
            <section id="contact" className="relative z-10 w-full overflow-hidden" style={{ padding: '6rem 0' }}>
                <div className="container mx-auto px-4">
                    <motion.h2 
                        className="text-4xl md:text-5xl font-extrabold text-center mb-20"
                        style={{ marginBottom: '5rem' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Get In <span className="gradient-text">Touch</span>
                    </motion.h2>
                    <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                        <motion.div 
                            className="flex-1 flex flex-col justify-center glass-card p-10"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-slate-50 mb-8">Let's Connect</h3>
                            <p className="text-slate-300 text-lg mb-10 leading-relaxed">I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                            <div className="flex flex-col gap-8">
                                <a href="mailto:joydevadhikary468@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-violet-300 transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/25 group-hover:border-violet-400/50 transition-all">
                                        <i className="fa-solid fa-envelope text-xl text-violet-400"></i>
                                    </div>
                                    <span className="text-lg">joydevadhikary468@gmail.com</span>
                                </a>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="flex-1 glass-card p-10"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="user_name" className="text-sm font-semibold text-gray-300">Name</label>
                                    <input type="text" id="user_name" name="user_name" required placeholder="John Doe" className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="user_email" className="text-sm font-semibold text-gray-300">Email</label>
                                    <input type="email" id="user_email" name="user_email" required placeholder="john@example.com" className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600" />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="message" className="text-sm font-semibold text-gray-300">Message</label>
                                    <textarea id="message" name="message" required placeholder="Hello Nayan..." rows="5" className="bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-600 resize-none"></textarea>
                                </div>
                                <button type="submit" className="btn-primary mt-2 w-full justify-center py-4 text-lg">
                                    Send Message <i className="fa-regular fa-paper-plane ml-2"></i>
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
