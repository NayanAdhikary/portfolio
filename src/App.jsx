import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div className="container nav-content">
            <Link to="/" className="brand">
              <span className="gradient-text">NA</span><span className="dot">.</span>
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
