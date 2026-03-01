import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Edit } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', githubLink: '', technologies: '', liveLink: '' });
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${API_URL}/projects`);
            setProjects(res.data);
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401 || err.response?.status === 403) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await axios.delete(`${API_URL}/projects/${id}`, axiosConfig);
            setProjects(projects.filter(p => p._id !== id));
        } catch (err) {
            alert('Error deleting project');
        }
    };

    const handleEditClick = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            githubLink: project.githubLink,
            technologies: project.technologies ? project.technologies.join(', ') : '',
            liveLink: project.liveLink || ''
        });
        setEditingId(project._id);
        setShowAddModal(true);
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const projectData = {
                ...formData,
                technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean)
            };

            if (editingId) {
                const res = await axios.put(`${API_URL}/projects/${editingId}`, projectData, axiosConfig);
                setProjects(projects.map(p => p._id === editingId ? res.data : p));
            } else {
                const res = await axios.post(`${API_URL}/projects`, projectData, axiosConfig);
                setProjects([res.data, ...projects]);
            }

            setShowAddModal(false);
            setEditingId(null);
            setFormData({ title: '', description: '', githubLink: '', technologies: '', liveLink: '' });
        } catch (err) {
            alert('Error saving project');
        }
    };

    // Minimal inline styles to ensure table renders perfectly
    const tableHeaderStyle = { padding: '1rem', textAlign: 'left', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontWeight: 500 };
    const tableCellStyle = { padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' };

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)', paddingBottom: '4rem' }}>
            {/* Admin Navbar */}
            <nav style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--glass-border)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                <div onClick={() => navigate('/')} className="font-bold text-xl text-white" style={{ cursor: 'pointer' }}>Portfolio <span className="text-gradient">Admin</span></div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button onClick={() => navigate('/')} className="text-sm text-text-secondary hover:text-white transition-colors" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>View Live Site</button>
                    <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </nav>

            <div className="container" style={{ marginTop: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 className="text-2xl font-bold text-white">Manage Projects</h1>
                    <button onClick={() => { setShowAddModal(true); setEditingId(null); setFormData({ title: '', description: '', githubLink: '', technologies: '', liveLink: '' }); }} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                        <Plus size={16} /> Add Project
                    </button>
                </div>

                {/* Projects Table inside a Glass Card */}
                <div className="glass-card animate-fade-in" style={{ overflow: 'hidden' }}>
                    {loading ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading data...</div>
                    ) : projects.length === 0 ? (
                        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No projects found. Add one to get started.</div>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={tableHeaderStyle}>Title</th>
                                        <th style={tableHeaderStyle}>Technologies</th>
                                        <th style={tableHeaderStyle}>Links</th>
                                        <th style={tableHeaderStyle}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project._id} style={{ transition: 'var(--transition-smooth)' }} className="hover:bg-[rgba(255,255,255,0.02)]">
                                            <td style={tableCellStyle}>
                                                <div style={{ fontWeight: 600 }}>{project.title}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.description}</div>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', maxWidth: '200px' }}>
                                                    {project.technologies?.slice(0, 3).map((t, i) => (
                                                        <span key={i} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}>{t}</span>
                                                    ))}
                                                    {project.technologies?.length > 3 && <span style={{ fontSize: '0.7rem', padding: '0.2rem', color: 'var(--text-secondary)' }}>+{project.technologies.length - 3}</span>}
                                                </div>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-accent)', fontSize: '0.875rem' }}>GitHub</a>
                                            </td>
                                            <td style={tableCellStyle}>
                                                <button onClick={() => handleEditClick(project)} style={{ background: 'rgba(56, 189, 248, 0.1)', color: 'var(--text-accent)', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', transition: 'var(--transition-smooth)', marginRight: '0.5rem' }} aria-label="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(project._id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', transition: 'var(--transition-smooth)' }} aria-label="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Project Modal Layer */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                    <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h2 className="text-xl font-bold text-white mb-6">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                        <form onSubmit={handleAddSubmit}>
                            <div className="input-group">
                                <label className="input-label">Project Title</label>
                                <input type="text" className="input-field" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Short Description</label>
                                <textarea className="input-field" required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Technologies (comma separated)</label>
                                <input type="text" className="input-field" placeholder="e.g. Python, Pandas, Matplotlib" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
                            </div>

                            <div className="input-group">
                                <label className="input-label">GitHub Repository URL</label>
                                <input type="url" className="input-field" required value={formData.githubLink} onChange={e => setFormData({ ...formData, githubLink: e.target.value })} />
                            </div>

                            <div className="input-group">
                                <label className="input-label">Live Demo URL (Optional)</label>
                                <input type="url" className="input-field" value={formData.liveLink} onChange={e => setFormData({ ...formData, liveLink: e.target.value })} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                                <button type="button" onClick={() => { setShowAddModal(false); setEditingId(null); }} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>{editingId ? 'Update Project' : 'Save Project'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
