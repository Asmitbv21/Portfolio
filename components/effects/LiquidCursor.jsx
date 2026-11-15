'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"]';

/**
 * Liquid cursor: a fast dot chases the pointer while a larger blob drifts
 * behind it; the SVG goo filter melts the two shapes together.
 * Desktop + fine pointers only.
 */
export default function LiquidCursor() {
  const layerRef = useRef(null);
  const dotRef = useRef(null);
  const blobRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const dot = dotRef.current;
    const blob = blobRef.current;
    if (!layer || !dot || !blob) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return undefined;

    const root = document.documentElement;
    root.classList.add('has-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let blobX = mouseX;
    let blobY = mouseY;
    let dotScale = 2;
    let blobScale = 2;
    let targetDotScale = 1;
    let targetBlobScale = 1;
    let pressed = false;
    let hovering = false;
    let frame = 0;

    const retarget = () => {
      targetDotScale = hovering ? 0.4 : 2;
      targetBlobScale = hovering ? 2 : 1;
      if (pressed) {
        targetDotScale *= 3;
        targetBlobScale *= 13;
      }
    };

    const onPointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      layer.style.opacity = '1';

      const wasHovering = hovering;
      hovering = Boolean(event.target.closest(INTERACTIVE));
      if (wasHovering !== hovering) retarget();
    };

    const onPointerDown = () => {
      pressed = true;
      retarget();
    };

    const onPointerUp = () => {
      pressed = false;
      retarget();
    };

    const onMouseLeave = () => {
      layer.style.opacity = '0';
    };

    const onMouseEnter = () => {
      layer.style.opacity = '1';
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;
      blobX += (mouseX - blobX) * 0.16;
      blobY += (mouseY - blobY) * 0.16;
      dotScale += (targetDotScale - dotScale) * 0.2;
      blobScale += (targetBlobScale - blobScale) * 0.14;

      dot.style.transform = `translate3d(${dotX.toFixed(1)}px, ${dotY.toFixed(1)}px, 0) scale(${dotScale.toFixed(3)})`;
      blob.style.transform = `translate3d(${blobX.toFixed(1)}px, ${blobY.toFixed(1)}px, 0) scale(${blobScale.toFixed(3)})`;

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    root.addEventListener('mouseleave', onMouseLeave);
    root.addEventListener('mouseenter', onMouseEnter);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      root.removeEventListener('mouseleave', onMouseLeave);
      root.removeEventListener('mouseenter', onMouseEnter);
      root.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <svg
        className="goo-defs"
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
      >
        <defs>
          <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feColorMatrix
              in="b"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
        </defs>
      </svg>

      <div className="cursor-layer" ref={layerRef} aria-hidden="true">
        <div className="cursor-blob" ref={blobRef} />
        <div className="cursor-dot" ref={dotRef} />
      </div>
    </>
  );
}
