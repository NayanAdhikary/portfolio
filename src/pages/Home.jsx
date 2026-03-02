import { useState, useEffect } from 'react';
import profileImg from '../assets/profile.jpg';

const projectsList = [
    {
        repo: 'sf-salaries-insights',
        about: 'Exploratory Data Analysis on SF Salaries - visualizations and insights',
        link: 'https://github.com/NayanAdhikary/sf-salaries-insights'
    },
    {
        repo: 'sf-salaries-cleaning',
        about: 'Data cleaning project on SF City Employee Salaries using Pandas',
        link: 'https://github.com/NayanAdhikary/sf-salaries-cleaning'
    },
    {
        repo: 'sf-salary-predictor',
        about: 'ML Salary Prediction - Random Forest (R²=0.82)',
        link: 'https://github.com/NayanAdhikary/sf-salary-predictor'
    },
    {
        repo: 'IPL-Cricket-Performance-Analytics',
        about: 'Data analysis project on IPL match data (2008-2025) using Python/Pandas. Computes player KPIs (strike rate, economy), visualizations for performance insights. Built for BCCI Performance Analyst portfolio.',
        link: 'https://github.com/NayanAdhikary/IPL-Cricket-Performance-Analytics'
    }
];

function Home() {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <section id="hero" className="hero pattern-bg">
                <div className="container">
                    <div className="hero-avatar fade-in">
                        <img src={profileImg} alt="Nayan Adhikary" className="profile-img" />
                    </div>
                    <h1 className="fade-in delay-1">
                        Hi, I'm <span className="gradient-text">Nayan Adhikary</span>
                    </h1>
                    <p className="fade-in delay-2">
                        Data Analyst & Performance Analyst specializing in Machine Learning,
                        Data Cleaning, Exploratory Data Analysis, and Performance Insights.
                    </p>
                    <div className="hero-actions fade-in delay-3">
                        <a href="#projects" className="btn-primary">
                            View My Work <i className="fa-solid fa-arrow-right"></i>
                        </a>
                        <a href="https://github.com/NayanAdhikary" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            GitHub Profile <i className="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="projects fade-in delay-3">
                <div className="container">
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>

                    <div className="projects-grid">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="glass-card project-card">
                                    <div className="loading-pulse" style={{ height: '32px', width: '40px', marginBottom: '20px' }}></div>
                                    <div className="loading-pulse" style={{ height: '24px', width: '80%' }}></div>
                                    <div className="loading-pulse" style={{ height: '16px', width: '100%', marginTop: '16px' }}></div>
                                    <div className="loading-pulse" style={{ height: '16px', width: '90%' }}></div>
                                </div>
                            ))
                            : projectsData.map((project, idx) => (
                                <div key={idx} className="glass-card project-card">
                                    <div className="project-header">
                                        <i className="fa-regular fa-folder folder-icon"></i>
                                        <div className="external-links">
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" title="View Source">
                                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                            </a>
                                        </div>
                                    </div>

                                    <h3 className="project-title">{project.repo.replace(/-/g, ' ')}</h3>

                                    <p className="project-desc">{project.about}</p>

                                    <div className="project-stats">
                                        <div className="stat-item" title="Language">
                                            <i className="fa-solid fa-circle" style={{ fontSize: '0.6rem', color: 'var(--accent-secondary)' }}></i>
                                            <span>{project.language}</span>
                                        </div>
                                        <div className="stat-item" title="GitHub Stars">
                                            <i className="fa-regular fa-star"></i>
                                            <span>{project.stars}</span>
                                        </div>
                                        <div className="stat-item" title="GitHub Forks">
                                            <i className="fa-solid fa-code-branch"></i>
                                            <span>{project.forks}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact fade-in delay-3">
                <div className="container">
                    <h2 className="section-title">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <div className="contact-content">
                        <div className="contact-info glass-card">
                            <h3>Let's Connect</h3>
                            <p>I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <i className="fa-solid fa-envelope"></i>
                                    <span>joydevadhikary468@gmail.com</span>
                                </div>
                            </div>
                        </div>
                        <div className="contact-form-container glass-card">
                            <form
                                action="https://formsubmit.co/joydevadhikary468@gmail.com"
                                method="POST"
                                className="contact-form"
                            >
                                {/* Honeypot for spam */}
                                <input type="text" name="_honey" style={{ display: 'none' }} />
                                {/* Disable Captcha for smoother UX, optional */}
                                <input type="hidden" name="_captcha" value="false" />

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" name="name" required placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" required placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" required placeholder="Hello Nayan..." rows="5"></textarea>
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Send Message <i className="fa-regular fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
