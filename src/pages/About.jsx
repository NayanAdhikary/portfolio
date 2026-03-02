import React from 'react';

function About() {
    const cvPath = import.meta.env.BASE_URL + 'cv/Nayan Adhikary Software Engineer CV.pdf';

    return (
        <main style={{ padding: '80px 0', minHeight: '80vh' }}>
            <section className="about-section fade-in">
                <div className="container">
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>

                    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left', lineHeight: '1.8' }}>
                        <p style={{ marginBottom: '24px', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            I am a results-oriented <strong>Data Analyst & Performance Analyst</strong> who thrives on translating complex datasets into actionable insights. With a growing foundation in Machine Learning, robust Data Cleaning methodologies, and Exploratory Data Analysis, I build data-driven solutions that improve decision-making processes.
                        </p>
                        <p style={{ marginBottom: '24px', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            My projects range from predicting SF salaries using Random Forest constraints to crunching a decade of IPL cricket match insights to identify high-potential KPIs for strategic coaching.
                        </p>
                        <p style={{ marginBottom: '32px', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            Right now, I am focusing on building my expertise and seeking dynamic roles where I can leverage statistics and programming to create measurable business impacts. I am always open to exploring new frontiers and tackling fresh data challenges!
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            {/* Added target="_blank" to ensure the PDF potentially opens in a new tab if supported via browser */}
                            <a href={cvPath} target="_blank" rel="noopener noreferrer" className="btn-primary">
                                View My CV <i className="fa-solid fa-file-pdf"></i>
                            </a>

                            <a href={cvPath} download className="btn-secondary">
                                Download CV <i className="fa-solid fa-download"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;
