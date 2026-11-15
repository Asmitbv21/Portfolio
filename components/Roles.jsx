'use client';

import { roles } from '@/lib/data';
import { useProjectFilter } from './providers/FilterProvider';

export default function Roles() {
  const { applyFilter } = useProjectFilter();

  return (
    <section id="roles" className="section roles">
      <div className="container">
        <h2 className="section-title" data-reveal="" style={{ '--d': '.08s' }}>
          Creative roles,
          <br />
          one mindset<span className="dot">.</span>
        </h2>
        <p className="section-sub" data-reveal="" style={{ '--d': '.16s' }}>
          Four disciplines, one obsession , details. Tap a role to jump straight to its work.
        </p>

        <div className="roles-list">
          {roles.map((role, index) => (
            <a
              key={role.filter}
              href="#projects"
              className="role-row"
              data-filter={role.filter}
              data-reveal=""
              style={{ '--d': `${0.05 + index * 0.07}s` }}
              onClick={() => applyFilter(role.filter)}
            >
              <span className="role-num">{role.num}</span>
              <span className="role-name">{role.name}</span>
              <span className="role-tags">{role.tags}</span>
              <span className="role-arrow">
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
