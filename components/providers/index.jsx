'use client';

import { ThemeProvider } from './ThemeProvider';
import { NavSpyProvider } from './NavSpyProvider';
import { FilterProvider } from './FilterProvider';
import { ProjectModalProvider } from './ProjectModalProvider';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <NavSpyProvider>
        <FilterProvider>
          <ProjectModalProvider>{children}</ProjectModalProvider>
        </FilterProvider>
      </NavSpyProvider>
    </ThemeProvider>
  );
}
