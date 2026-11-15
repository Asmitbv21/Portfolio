'use client';

import { useEffect, useState } from 'react';
import { projectFilters, projects } from '@/lib/data';
import { asset } from '@/lib/asset';
import { useProjectFilter } from './providers/FilterProvider';
import { useProjectModal } from './providers/ProjectModalProvider';

function ProjectCard({ project, visible, order, popToken }) {
  const { openProject } = useProjectModal();
  const [popping, setPopping] = useState(false);

  useEffect(() => {
    if (!visible || popToken === 0) {
      setPopping(false);
      return undefined;
    }

    setPopping(true);
    const delay = order * 60;
    const timer = window.setTimeout(() => setPopping(false), delay + 600);
    return () => window.clearTimeout(timer);
  }, [popToken, visible, order]);

  return (
    <article
      className={`project-card${popping ? ' pop' : ''}`}
      data-category={project.category}
      data-reveal=""
      style={{
        display: visible ? undefined : 'none',
        animationDelay: popping ? `${order * 60}ms` : undefined,
      }}
    >
      <div className="project-media">
        <div className="media-tilt">
          <img src={asset(project.image)} alt={project.alt} loading="lazy" decoding="async" />
        </div>
        <div className="project-overlay">
          <button
            type="button"
            className="view-btn"
            onClick={() =>
              openProject({
                title: project.modalTitle,
                image: project.image,
                description: project.description,
              })
            }
          >
            View Project{' '}
            <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { filter, applyFilter, popToken } = useProjectFilter();

  let visibleIndex = 0;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title" data-reveal="" style={{ '--d': '.08s' }}>
          Work that speaks<span className="dot">.</span>
        </h2>

        <div
          className="projects-filter"
          data-reveal=""
          style={{ '--d': '.14s' }}
          role="group"
          aria-label="Filter projects"
        >
          {projectFilters.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`filter-btn${filter === item.value ? ' active' : ''}`}
              data-filter={item.value}
              aria-pressed={filter === item.value}
              onClick={() => applyFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {projects.map((project) => {
            const visible = filter === 'all' || project.category === filter;
            const order = visible ? visibleIndex++ : 0;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                visible={visible}
                order={order}
                popToken={popToken}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
