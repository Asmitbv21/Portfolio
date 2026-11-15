'use client';

import { useEffect, useRef } from 'react';
import { asset } from '@/lib/asset';
import { motionState } from '@/lib/motion';

/** Portrait that faces the pointer in 3D, plus the scroll-velocity tilt. */
export default function HeroPortrait() {
  const tiltRef = useRef(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return undefined;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let rotateX = 0;
    let rotateY = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;

    const onPointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const tick = () => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
        const nx = Math.max(-1, Math.min(1, (mouseX - (rect.left + rect.width / 2)) / rect.width));
        const ny = Math.max(-1, Math.min(1, (mouseY - (rect.top + rect.height / 2)) / rect.height));
        // Face towards the cursor: positive rotateX looks up,
        // negative rotateY turns right.
        targetX = -ny * 8;
        targetY = -nx * 10;
      }

      rotateX += (targetX - rotateX) * 0.08;
      rotateY += (targetY - rotateY) * 0.08;

      el.style.transform = `perspective(1100px) rotateX(${(rotateX + motionState.vel).toFixed(3)}deg) rotateY(${rotateY.toFixed(3)}deg)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      el.style.removeProperty('transform');
    };
  }, []);

  return (
    <figure className="hero-portrait" data-reveal="" style={{ '--d': '.2s' }}>
      <span className="portrait-ring" aria-hidden="true" />

      <div className="portrait-tilt" ref={tiltRef}>
        <img
          src={asset('/Media/PFP-web.jpg')}
          alt="Portrait of Asmit Vishwakarma"
          className="portrait-img"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <span className="corner-accent tr" aria-hidden="true" />
      <span className="corner-accent bl" aria-hidden="true" />

      <div className="chip chip-a">
        <span className="pulse-dot" /> Open to work
      </div>
      <div className="chip chip-b">
        <i className="fas fa-asterisk chip-star" aria-hidden="true" /> Design Intern @ WeFrameTech
      </div>
    </figure>
  );
}
