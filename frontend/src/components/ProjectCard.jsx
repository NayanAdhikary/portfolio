import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
    // Stagger animation based on index
    const delayClass = `delay-${(index % 3 + 1) * 100}`;

    return (
        <div className={`glass-card animate-fade-in ${delayClass}`} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.6 }}>{project.description}</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {project.technologies?.map((tech, i) => (
                    <span
                        key={i}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-[rgba(255,255,255,0.05)] text-text-accent border border-[rgba(255,255,255,0.1)]"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '9999px',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            color: 'var(--text-accent)',
                            border: '1px solid var(--glass-border)',
                            marginRight: '0.5rem',
                            marginBottom: '0.5rem',
                            display: 'inline-block'
                        }}
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="flex gap-4 mt-auto pt-4 border-t border-[rgba(255,255,255,0.1)]" style={{ borderTop: '1px solid var(--glass-border)', marginTop: 'auto', paddingTop: '1rem', display: 'flex', gap: '1rem' }}>
                <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
                >
                    <Github size={18} />
                    <span>Source Code</span>
                </a>

                {project.liveLink && (
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-text-accent hover:text-white transition-colors"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-accent)' }}
                    >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
