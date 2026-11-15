'use client';

import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/data';
import { asset } from '@/lib/asset';
import { useNavSpy } from './providers/NavSpyProvider';
import { useThemeToggle } from './providers/ThemeProvider';
import MagneticLink from './effects/MagneticLink';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { activeId, activate } = useNavSpy();
  const toggleTheme = useThemeToggle();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <a
          href="#home"
          className="island island-logo"
          aria-label="Asmit Vishwakarma , home"
          onClick={() => activate('home')}
        >
          <img
            src={asset('/Media/PFP-web.jpg')}
            alt=""
            className="nav-avatar"
            decoding="async"
          />
          <span className="nav-name">Asmit&nbsp;Vishwakarma</span>
        </a>

        <nav className="nav-menu" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeId === link.section;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`island nav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => activate(link.section)}
              >
                {link.label}
              </a>
            );
          })}

          <MagneticLink
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="island nav-link nav-resume"
          >
            Resume <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
          </MagneticLink>
        </nav>

        <button
          type="button"
          className="island theme-toggle"
          id="themeToggle"
          onClick={toggleTheme}
          aria-label="Toggle light / dark theme"
        >
          <i className="fas fa-moon" aria-hidden="true" />
          <i className="fas fa-sun" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
