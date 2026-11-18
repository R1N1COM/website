'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { scroll, CHAPTERS } from './scroll';
import { londonHours } from './schedule';

const Stage = dynamic(() => import('./Stage'), { ssr: false });

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Fixed full-screen 3D world behind the page. Sections marked data-chapter="n" drive the camera.
 * The canvas stops rendering once the reader is past the last chapter or the tab is hidden.
 */
export function Backdrop() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [animate, setAnimate] = useState(true);
  const [now, setNow] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    setNow(londonHours());
    const id = window.setInterval(() => setNow(londonHours()), 30_000);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setAnimate(!mq.matches);
    syncMotion();
    mq.addEventListener('change', syncMotion);
    return () => {
      window.clearInterval(id);
      mq.removeEventListener('change', syncMotion);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const mid = vh * 0.5;
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
      let chapter = 0;
      for (const el of els) {
        const n = Number(el.dataset.chapter);
        const r = el.getBoundingClientRect();
        // Fraction of this section that has passed the middle of the screen.
        const f = (mid - r.top) / Math.max(1, r.height);
        if (f >= 0) chapter = Math.max(chapter, n + Math.min(1, f) - 0.5);
        if (el.id === 'your-data') {
          scroll.unplug = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height * 0.6)));
        }
      }
      scroll.chapter = Math.max(0, Math.min(CHAPTERS - 1, chapter));
      setPaused(scroll.chapter >= CHAPTERS - 1 || document.hidden);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    document.addEventListener('visibilitychange', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onScroll);
    };
  }, []);

  return (
    <div className="backdrop" aria-hidden="true">
      {webgl && now !== null ? <Stage now={now} animate={animate} paused={paused} /> : null}
    </div>
  );
}
