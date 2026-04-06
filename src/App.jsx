import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for DOM to render the home page content before scrolling
      const id = hash.replace('#', '');
      const tryScroll = (attempts = 0) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempts < 10) {
          setTimeout(() => tryScroll(attempts + 1), 100);
        }
      };
      setTimeout(() => tryScroll(), 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollHandler />
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="container nav-content">
            <Link to="/" className="brand" aria-label="Home">
              <i className="fa-solid fa-house"></i>
            </Link>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
            </nav>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Alias routes for section deep-links */}
          <Route path="/projects" element={<Home />} />
          <Route path="/contact" element={<Home />} />
        </Routes>

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="social-links" style={{ justifyContent: 'center', marginBottom: '24px', marginTop: 0 }}>
              <a href="https://github.com/NayanAdhikary" className="social-icon" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="mailto:joydevadhikary468@gmail.com" className="social-icon">
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
            <p>© {new Date().getFullYear()} Nayan Adhikary. All rights reserved.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '8px', opacity: 0.7 }}>Built focusing on data and dynamic fetching via GitHub API.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
