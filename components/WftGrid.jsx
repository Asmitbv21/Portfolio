'use client';

import { wftProjects } from '@/lib/data';
import { asset } from '@/lib/asset';
import { useProjectModal } from './providers/ProjectModalProvider';

/**
 * Client projects designed at WeFrameTech. The whole card is a hit target,
 * while the visible "Details" button stays the keyboard-accessible control.
 */
export default function WftGrid() {
  const { openProject } = useProjectModal();

  const open = (project) =>
    openProject({
      title: project.modalTitle,
      image: project.image,
      description: project.description,
    });

  return (
    <div className="wft">
      <div className="wft-head" data-reveal="" style={{ '--d': '.08s' }}>
        <div className="wft-head-txt">
          <span className="wft-eyebrow">
            <i className="fas fa-layer-group" aria-hidden="true" /> Client work
          </span>
          <h3 className="wft-title">Projects designed at WeFrameTech</h3>
        </div>
        <p className="wft-note">
          These client projects are covered by an NDA, so the thumbnails are placeholders. Full
          case studies are available on request.
        </p>
      </div>

      <div className="wft-grid">
        {wftProjects.map((project, index) => (
          <article
            key={project.id}
            className="wft-card"
            data-reveal=""
            style={{ '--d': `${0.12 + index * 0.06}s` }}
            onClick={() => open(project)}
          >
            <div className="wft-thumb">
              <img
                src={asset(project.image)}
                alt={project.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="wft-badge">
                <i className="fas fa-lock" aria-hidden="true" /> NDA
              </span>
              <span className="wft-scrim" aria-hidden="true" />
              <div className="wft-hover">
                <p className="wft-kind">{project.kind}</p>
                <h4 className="wft-name">{project.title}</h4>
              </div>
            </div>

            <div className="wft-foot">
              <span className="wft-index">{project.index}</span>
              <button
                type="button"
                className="wft-link"
                onClick={(event) => {
                  event.stopPropagation();
                  open(project);
                }}
              >
                Details <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
