'use client';

import { useEffect } from 'react';

/**
 * Recreates the original reveal-on-scroll behaviour: every [data-reveal]
 * element fades/blurs in when it enters the viewport and fades back out when
 * it leaves, so the effect is reversible in both directions.
 */
export default function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('revealed'));
      return undefined;
    }

    const observed = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('revealed', entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    const observeAll = () => {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    };

    observeAll();

    // Filtering and the modal mount new nodes, so keep watching.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
