import MagneticLink from './effects/MagneticLink';
import HeroPortrait from './HeroPortrait';
import RoleRotor from './RoleRotor';
import Marquee from './Marquee';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-meta" data-reveal="" style={{ '--d': '.5s' }}>
            <i className="fas fa-location-dot" aria-hidden="true" /> Mumbai, India · working
            worldwide
          </p>

          <h1 className="hero-title">
            <span className="line" data-reveal="" style={{ '--d': '.06s' }}>
              Asmit
            </span>
            <span className="line outline" data-reveal="" style={{ '--d': '.16s' }}>
              Vishwakarma
            </span>
          </h1>

          <p className="hero-role-line" data-reveal="" style={{ '--d': '.26s' }}>
            <span className="role-rotor">
              I craft as a&nbsp;
              <span className="rotor-wrap">
                <RoleRotor />
              </span>
            </span>
            <span className="role-static">UI/UX Designer · Developer · 3D Artist</span>
          </p>

          <p className="hero-sub" data-reveal="" style={{ '--d': '.34s' }}>
            Computer Science student blending design and code, shipping interfaces, brands and
            3D that feel <em className="hl">as good as they look</em>.
          </p>

          <div className="hero-actions" data-reveal="" style={{ '--d': '.42s' }}>
            <MagneticLink href="#projects" className="btn btn-primary">
              View Selected Work <i className="fas fa-arrow-down" aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="#contact" className="btn btn-ghost">
              Get in Touch
            </MagneticLink>
          </div>

          <p className="hero-status" data-reveal="" style={{ '--d': '.5s' }}>
            <span className="pulse-dot" /> Open to work · Design Intern @ WeFrameTech
          </p>
        </div>

        <HeroPortrait />
      </div>

      <Marquee />
    </section>
  );
}
