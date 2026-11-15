'use client';

import { useEffect, useState } from 'react';

const WORDS = ['UI/UX Designer', 'Graphic Designer', 'Developer', '3D Artist'];

/**
 * Cycles the hero role on wide screens only — the mobile layout shows a
 * static role list instead, so a cycling word would be invisible noise.
 */
export default function RoleRotor() {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const mq = window.matchMedia('(min-width: 769px)');
    let interval = null;
    let timeout = null;

    const cycle = () => {
      setLeaving(true);
      timeout = window.setTimeout(() => {
        setIndex((current) => (current + 1) % WORDS.length);
        setLeaving(false);
      }, 320);
    };

    const sync = () => {
      if (mq.matches) {
        if (!interval) interval = window.setInterval(cycle, 2400);
        return;
      }

      if (interval) {
        window.clearInterval(interval);
        interval = null;
      }
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = null;
      }
      setLeaving(false);
    };

    mq.addEventListener('change', sync);
    sync();

    return () => {
      mq.removeEventListener('change', sync);
      if (interval) window.clearInterval(interval);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  return (
    <span id="rotor" className={leaving ? 'rotor-out' : undefined}>
      {WORDS[index]}
    </span>
  );
}
