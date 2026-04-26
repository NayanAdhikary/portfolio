import { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

const NAVBAR_HEIGHT = 72; // px — matches the actual navbar rendered height

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  /* ── Track scroll position for navbar background + active section ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine which section is currently in view
      const scrollPos = window.scrollY + NAVBAR_HEIGHT + 100;
      let current = '#hero';

      for (const item of NAV_ITEMS) {
        const el = document.querySelector(item.href);
        if (el && el.offsetTop <= scrollPos) {
          current = item.href;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Smooth scroll with navbar offset ── */
  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    const el = document.querySelector(href);
    if (!el) return;

    const targetY = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`} id="nav">
        <div className="container nav-content">
          <a
            href="#hero"
            className="nav-logo"
            onClick={e => handleNav(e, '#hero')}
            aria-label="Home"
          >
            NA
          </a>

          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.href ? 'active' : ''}
                onClick={e => handleNav(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <div
        className={`nav-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  );
}
