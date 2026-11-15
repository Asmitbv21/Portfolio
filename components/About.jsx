import { site, skills, socials } from '@/lib/data';
import { asset } from '@/lib/asset';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section-title" data-reveal="" style={{ '--d': '.08s' }}>
          Design brain,
          <br />
          developer hands<span className="dot">.</span>
        </h2>

        <div className="about-grid">
          <div className="about-text" data-reveal="" style={{ '--d': '.14s' }}>
            <p>
              I&apos;m a Computer Science student with a passion for crafting intuitive, visually
              engaging digital experiences.
            </p>
            <p>
              My primary focus is <strong>UI/UX design</strong> , combining creativity and precision
              to build interfaces that are both functional and beautiful. Alongside it, I bring
              versatile skills in <strong>graphic design</strong>, <strong>web development</strong>{' '}
              and <strong>3D artistry</strong>, so I can contribute across every stage of a product ,
              from concept to execution.
            </p>
            <p>
              I am currently working as a UI/UX Design Intern at <strong>WeFrameTech</strong>, where
              I design websites and mobile applications , an experience that is teaching me how
              design decisions behave in the real world.
            </p>
            <p>
              I&apos;m detail-oriented, responsible and always eager to learn new techniques, explore
              emerging technologies, and push the boundaries of design and development.
            </p>

            <p className="about-loc">
              <i className="fas fa-location-dot" aria-hidden="true" /> {site.location}
            </p>

            <div className="social-links">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <i className={`fab ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="about-skills" data-reveal="" style={{ '--d': '.22s' }}>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <img
                    src={asset(skill.icon)}
                    alt={skill.name}
                    className="skill-icon"
                    loading="lazy"
                    decoding="async"
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
