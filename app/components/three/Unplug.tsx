'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useStage } from './useStage';

const ServerScene = dynamic(() => import('./ServerScene'), { ssr: false });

/** The private server: scrolling through the section pulls the network cable out. */
export function Unplug() {
  const { ref, webgl, animate, active } = useStage<HTMLDivElement>();
  const [pull, setPull] = useState(0);

  useEffect(() => {
    if (!animate) {
      setPull(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the stage's top reaches 85% of the viewport, 1 when it reaches 25%.
        const t = (vh * 0.85 - r.top) / (vh * 0.6);
        setPull(Math.max(0, Math.min(1, t)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [animate, ref]);

  if (webgl === false) return null;

  const unplugged = pull > 0.35;
  return (
    <div ref={ref} className="unplug">
      <div className="stage-3d stage-server" aria-hidden="true">
        {webgl ? <ServerScene pull={pull} animate={animate} active={active} /> : null}
      </div>
      <p className={`unplug-status ${unplugged ? 'is-off' : ''}`} role="status">
        <span className="unplug-dot" aria-hidden="true" />
        {unplugged ? 'Network unplugged. Still running.' : 'Connected'}
      </p>
    </div>
  );
}
