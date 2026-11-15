'use client';

import { dockLinks, site } from '@/lib/data';
import { useNavSpy } from './providers/NavSpyProvider';

export default function MobileDock() {
  const { activeId, activate } = useNavSpy();

  return (
    <nav className="dock" aria-label="Mobile navigation">
      {dockLinks.map((link) => {
        const isActive = activeId === link.section;
        return (
          <a
            key={link.href}
            href={link.href}
            className={`island dock-link nav-link${isActive ? ' is-active' : ''}`}
            aria-label={link.label}
            aria-current={isActive ? 'true' : undefined}
            onClick={() => activate(link.section)}
          >
            <i className={`fas ${link.icon}`} aria-hidden="true" />
          </a>
        );
      })}

      <a
        href={site.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="island dock-link dock-resume"
        aria-label="Resume"
      >
        <i className="fas fa-file-lines" aria-hidden="true" />
      </a>
    </nav>
  );
}
