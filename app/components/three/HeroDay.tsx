'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useStage } from './useStage';
import { londonClock, londonHours, progressAt, RELEASE_HOURS, CHECKS_PER_DAY } from './schedule';

const DayRing = dynamic(() => import('./DayRing'), { ssr: false });

export function HeroDay({ fallback }: { fallback: React.ReactNode }) {
  const { ref, webgl, animate, active } = useStage<HTMLDivElement>();
  const [now, setNow] = useState<number | null>(null);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => {
      setNow(londonHours());
      setClock(londonClock());
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const p = now === null ? null : progressAt(now);

  return (
    <div ref={ref} className="hero-stage">
      {webgl === false ? (
        fallback
      ) : (
        <>
          <div className="stage-3d stage-ring" aria-hidden="true">
            {webgl && now !== null ? <DayRing now={now} animate={animate} active={active} /> : null}
          </div>
          <p className="stage-readout" aria-live="off">
            {p ? (
              <>
                <span className="readout-time">It&rsquo;s {clock} in London.</span> By this time each day,
                buyX has run <b>{p.checks}</b> of its {CHECKS_PER_DAY} health checks and MMCC has published{' '}
                <b>{p.releases}</b> of {RELEASE_HOURS.length} YouTube releases.
              </>
            ) : (
              ' '
            )}
          </p>
        </>
      )}
    </div>
  );
}
