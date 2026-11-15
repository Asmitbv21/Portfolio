'use client';

import { useEffect } from 'react';
import { motionState } from '@/lib/motion';

/**
 * Publishes the smoothed scroll velocity as the global --sv custom property.
 * The CSS uses it to tilt the portrait and project thumbnails while scrolling.
 *
 * Unlike the original always-on rAF loop this one stops as soon as the
 * velocity settles, which keeps an idle tab completely quiet.
 */
export default function ScrollVelocity() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const root = document.documentElement;
    let lastY = window.scrollY;
    let velocity = 0;
    let frame = 0;
    let lastValue = '';

    const apply = (value) => {
      const next = `${value.toFixed(2)}deg`;
      if (next === lastValue) return;
      lastValue = next;
      root.style.setProperty('--sv', next);
    };

    const tick = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      // Clamped to ±3deg so the tilt stays subtle.
      const target = Math.max(-3, Math.min(3, delta * 0.3));
      velocity += (target - velocity) * 0.09;
      if (Math.abs(velocity) < 0.002) velocity = 0;

      motionState.vel = velocity;
      apply(velocity);

      frame = velocity !== 0 || delta !== 0 ? requestAnimationFrame(tick) : 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
      motionState.vel = 0;
      root.style.removeProperty('--sv');
    };
  }, []);

  return null;
}
