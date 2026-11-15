'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/asset';

const ProjectModalContext = createContext(null);

/**
 * Single project modal shared by the Work grid and the WeFrameTech client
 * cards. Keeps the same DOM structure/classes as the original static site so
 * the existing CSS and transitions keep working.
 */
export function ProjectModalProvider({ children }) {
  const [project, setProject] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const open = Boolean(project);

  const openProject = useCallback((next) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setProject(next);
  }, []);
  const closeProject = useCallback(() => setProject(null), []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeProject();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    // Wait for the next frame so the modal is painted before moving focus.
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      triggerRef.current?.focus();
    };
  }, [open, closeProject]);

  return (
    <ProjectModalContext.Provider value={{ openProject, closeProject }}>
      {children}

      <div
        id="projectModal"
        className={`modal${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby="modal-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProject();
        }}
      >
        <div className="modal-content">
          <button
            type="button"
            className="modal-close"
            onClick={closeProject}
            aria-label="Close"
            ref={closeButtonRef}
            tabIndex={open ? 0 : -1}
          >
            <i className="fas fa-xmark" aria-hidden="true" />
          </button>
          <h2 id="modal-title">{project?.title ?? ''}</h2>
          {project ? (
            <img
              id="modal-image"
              src={asset(project.image)}
              alt={project.title}
              decoding="async"
            />
          ) : null}
          <p id="modal-description">{project?.description ?? ''}</p>
        </div>
      </div>
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const context = useContext(ProjectModalContext);
  if (!context) throw new Error('useProjectModal must be used inside ProjectModalProvider');
  return context;
}
