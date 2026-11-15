import { site, socials } from '@/lib/data';
import { asset } from '@/lib/asset';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-cta">
            <h2 data-reveal="" style={{ '--d': '.08s' }}>
              Let&apos;s build something
              <br />
              worth shipping<span className="dot">.</span>
            </h2>

            <a
              href={`mailto:${site.email}`}
              className="email-cta"
              data-reveal=""
              style={{ '--d': '.16s' }}
            >
              {site.email}
              <span className="email-circle">
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </span>
            </a>

            <div className="contact-rows" data-reveal="" style={{ '--d': '.24s' }}>
              <a href={`mailto:${site.email}`} className="contact-row">
                <i className="fas fa-envelope" aria-hidden="true" /> {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="contact-row">
                <i className="fas fa-phone" aria-hidden="true" /> {site.phone}
              </a>
              <p className="contact-row">
                <i className="fas fa-location-dot" aria-hidden="true" /> {site.location}
              </p>
            </div>

            <div className="social-links" data-reveal="" style={{ '--d': '.3s' }}>
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

          <figure className="footer-video desktop-only" data-reveal="" style={{ '--d': '.2s' }}>
            <video
              src={asset('/Media/infinity3.mp4')}
              autoPlay
              loop
              muted
              playsInline
            />
            <figcaption>Thank you for scrolling</figcaption>
          </figure>
        </div>

        <div className="footer-bottom">
          <p>
            © <span id="year">{year}</span> Asmit Vishwakarma. All rights reserved.
          </p>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            Download Resume <i className="fas fa-download" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
