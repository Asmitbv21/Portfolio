'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const SECTION_IDS = ['home', 'experience', 'about', 'projects'];

const NavSpyContext = createContext(null);

/**
 * Tracks which section is currently in view so the navbar islands and the
 * mobile dock can highlight the matching link.
 */
export function NavSpyProvider({ children }) {
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Instant feedback on click — no waiting for the scroll to settle.
  const activate = useCallback((id) => setActiveId(id), []);

  return (
    <NavSpyContext.Provider value={{ activeId, activate }}>
      {children}
    </NavSpyContext.Provider>
  );
}

export function useNavSpy() {
  const context = useContext(NavSpyContext);
  if (!context) throw new Error('useNavSpy must be used inside NavSpyProvider');
  return context;
}
