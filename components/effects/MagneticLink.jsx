'use client';

import { useEffect, useRef } from 'react';

/**
 * Anchor/button that leans towards the pointer. The offset is published as
 * --mx / --my so the CSS transform stays composable with :hover and :active.
 */
export default function MagneticLink({ className = '', children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return undefined;

    let rect = null;
    const measure = () => {
      rect = el.getBoundingClientRect();
    };

    const onPointerEnter = () => measure();

    const onPointerMove = (event) => {
      if (!rect) measure();
      if (!rect) return;
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
      el.style.setProperty('--mx', `${x.toFixed(1)}px`);
      el.style.setProperty('--my', `${y.toFixed(1)}px`);
    };

    const onPointerLeave = () => {
      rect = null;
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    };

    el.addEventListener('pointerenter', onPointerEnter);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerleave', onPointerLeave);

    return () => {
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <a ref={ref} className={className} {...props}>
      {children}
    </a>
  );
}
