'use client';

import { createContext, useCallback, useContext, useEffect } from 'react';

const ThemeContext = createContext(null);

const THEME_COLORS = {
  light: '#f4f4f2',
  dark: '#0a0a0b',
};

function syncThemeColor(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
}

export function ThemeProvider({ children }) {
  // The inline script in app/layout.js already applied the saved theme before
  // paint; this just keeps the browser UI colour in sync on first load.
  useEffect(() => {
    const theme =
      document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    syncThemeColor(theme);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';

    root.classList.add('theming');
    root.setAttribute('data-theme', next);

    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage can be blocked — the theme still applies for this session */
    }

    syncThemeColor(next);
    window.setTimeout(() => root.classList.remove('theming'), 500);
  }, []);

  return <ThemeContext.Provider value={toggleTheme}>{children}</ThemeContext.Provider>;
}

export function useThemeToggle() {
  const toggleTheme = useContext(ThemeContext);
  if (!toggleTheme) throw new Error('useThemeToggle must be used inside ThemeProvider');
  return toggleTheme;
}
