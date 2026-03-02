import React, { useState, useEffect } from 'react';
import { Database, BarChart2, Server, ChevronRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Contact Form State
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('https://api.github.com/users/NayanAdhikary/repos?sort=updated');
                if (!res.ok) throw new Error('Failed to fetch repositories');
                const data = await res.json();
                const formattedProjects = data
                    .filter(repo => !repo.fork) // only include original projects
                    .map(repo => ({
                        _id: repo.id.toString(),
                        title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        description: repo.description || 'No description provided.',
                        githubLink: repo.html_url,
                        liveLink: repo.homepage || '',
                        technologies: repo.language ? [repo.language] : []
                    }));
                setProjects(formattedProjects);
            } catch (err) {
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const subject = encodeURIComponent(`Portfolio Contact from ${contactForm.name}`);
        const body = encodeURIComponent(`Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`);
        window.location.href = `mailto:joydevadhikary468@gmail.com?subject=${subject}&body=${body}`;

        setSubmitStatus('success');
        setContactForm({ name: '', email: '', message: '' });
        setIsSubmitting(false);

        // Clear status message after 5 seconds
        setTimeout(() => {
            setSubmitStatus(null);
        }, 5000);
    };

    return (
        <div className="min-h-screen">
            {/* Navbar Minimal */}
            <nav className="navbar" style={{ position: 'fixed', top: 0, width: '100%', padding: '1.5rem 0', zIndex: 50, backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--glass-border)' }}>
                <div className="container nav-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <Link to="/" className="font-bold text-2xl text-white tracking-tight" style={{ textDecoration: 'none' }}>
                        Nayan<span className="text-gradient">.dev</span>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px', position: 'relative' }}>
                {/* Background Decorative Blur */}
                <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '40%', height: '40%', background: 'rgba(56, 189, 248, 0.15)', filter: 'blur(120px)', borderRadius: '50%', zIndex: -1 }}></div>
                <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '30%', height: '50%', background: 'rgba(129, 140, 248, 0.15)', filter: 'blur(120px)', borderRadius: '50%', zIndex: -1 }}></div>

                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '9999px', color: 'var(--text-accent)', marginBottom: '2rem', fontSize: '0.875rem', fontWeight: 500 }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-accent)', boxShadow: '0 0 10px var(--text-accent)' }}></span>
                            Available for Data Analyst Roles
                        </div>

                        <h1 style={{ fontSize: '4.5rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1.5rem', lineHeight: 1.1, color: '#fff' }}>
                            Transforming <span className="text-gradient">Raw Data</span> into <br />
                            Actionable Intelligence.
                        </h1>

                        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.6 }}>
                            I'm Nayan Adhikary, a passionate Data Performance Analyst specializing in Python, Pandas, Machine Learning, and interactive visualizations.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#projects" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}>
                                View Projects <ChevronRight size={20} />
                            </a>
                            <a href="mailto:joydevadhikary468@gmail.com" className="btn btn-outline" style={{ padding: '0.875rem 2rem', fontSize: '1.1rem', borderRadius: '12px' }}>
                                Contact Me
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Projects Section */}
            <section id="projects" style={{ padding: '6rem 0', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>Featured <span className="text-gradient">Projects</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            A curated selection of my data analysis, machine learning, and visualization work.
                        </p>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading projects...</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
                            {projects.map((project, index) => (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Skills Section */}
            <section style={{ padding: '6rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <div style={{ background: 'rgba(56, 189, 248, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-accent)', marginBottom: '1.5rem' }}>
                                <Database size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Data Processing</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Expertise in cleaning, transforming, and analyzing large datasets to ensure data integrity.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>Python</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>Pandas</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>SQL</span>
                            </div>
                        </div>

                        <div className="glass-card delay-100" style={{ padding: '2rem' }}>
                            <div style={{ background: 'rgba(129, 140, 248, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818CF8', marginBottom: '1.5rem' }}>
                                <BarChart2 size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Visual Analytics</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Creating interactive dashboards and compelling visual stories that drive strategic decisions.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>Matplotlib</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>Seaborn</span>
                            </div>
                        </div>

                        <div className="glass-card delay-200" style={{ padding: '2rem' }}>
                            <div style={{ background: 'rgba(56, 189, 248, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-accent)', marginBottom: '1.5rem' }}>
                                <Server size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#fff' }}>Machine Learning (Learning state)</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Building predictive models to forecast trends and optimize complex business processes.</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>Scikit-Learn</span>
                                <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>Random Forest</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer / Contact minimal */}
            <footer id="contact" style={{ padding: '6rem 0 4rem', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>Let's work <span className="text-gradient">together</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>I'm currently open for new opportunities in data analysis and engineering.</p>
                    </div>

                    <div className="glass-card" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
                        <form onSubmit={handleContactSubmit}>
                            <div className="input-group">
                                <label className="input-label">Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    required
                                    value={contactForm.name}
                                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Email</label>
                                <input
                                    type="email"
                                    className="input-field"
                                    required
                                    value={contactForm.email}
                                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Message</label>
                                <textarea
                                    className="input-field"
                                    required
                                    rows={5}
                                    value={contactForm.message}
                                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                                    placeholder="How can I help you?"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>

                            {submitStatus === 'success' && (
                                <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#34D399', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                                    Message sent successfully! I'll get back to you soon.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#F87171', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>
                                    Failed to send message. Please try again later.
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', opacity: isSubmitting ? 0.7 : 1 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    <div style={{ marginTop: '5rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center' }}>
                        © {new Date().getFullYear()} Nayan Adhikary. All rights reserved. Built with MERN Stack.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
