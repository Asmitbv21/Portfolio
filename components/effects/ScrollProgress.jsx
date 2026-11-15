'use client';

import { useEffect, useRef } from 'react';

/** Thin red line across the top that tracks reading progress. */
export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return undefined;

    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${value})`;
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, []);

  return <div className="progress" ref={progressRef} aria-hidden="true" />;
}
