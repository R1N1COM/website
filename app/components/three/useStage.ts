'use client';

import { useEffect, useRef, useState } from 'react';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Shared state for a 3D stage: whether WebGL is available, whether motion is allowed,
 * and whether the stage is on screen (so offscreen canvases stop rendering).
 */
export function useStage<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [animate, setAnimate] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAnimate(!mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, webgl, animate, active };
}
