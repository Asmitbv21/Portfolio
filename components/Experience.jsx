import { asset } from '@/lib/asset';
import WftGrid from './WftGrid';

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <h2 className="section-title" data-reveal="" style={{ '--d': '.08s' }}>
          My professional
          <br />
          experience<span className="dot">.</span>
        </h2>

        <div className="exp" data-reveal="" style={{ '--d': '.15s' }}>
          <div className="exp-info">
            <div className="exp-company">
              <img
                src={asset('/Media/WeFrameTech.png')}
                alt="WeFrameTech logo"
                className="exp-logo-img"
                decoding="async"
              />
              <div className="exp-id">
                <h3>WeFrameTech</h3>
                <p>UI/UX Design Intern · Mumbai, India</p>
              </div>
              <span className="exp-live">
                <span className="pulse-dot" /> Ongoing
              </span>
            </div>

            <p className="exp-desc">
              I am currently working as a UI/UX Design Intern at WeFrameTech, where I contribute
              to the design of websites and mobile applications. Working alongside experienced
              professionals, I am refining my design process and gaining practical exposure to how
              real products are planned, designed, and delivered , and I am learning a great deal
              in the process.
            </p>

            <ul className="exp-meta">
              <li>Website Design</li>
              <li>Mobile App Design</li>
              <li>UI/UX</li>
              <li>Prototyping</li>
            </ul>
          </div>

          <aside className="exp-figure">
            <p className="exp-duration">
              <span className="exp-since">Since</span> May 2026
              <span className="exp-sep">—</span> Present
            </p>
            <p className="exp-count">
              04<span className="exp-plus">+</span>
            </p>
            <p className="exp-count-label">
              Projects designed at WeFrameTech,
              <br />
              <strong>learning a great deal in the process</strong>
            </p>
          </aside>
        </div>

        <WftGrid />
      </div>
    </section>
  );
}
