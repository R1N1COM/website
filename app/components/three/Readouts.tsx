'use client';

import { useEffect, useState } from 'react';
import { scroll } from './scroll';
import { CHECKS_PER_DAY, RELEASE_HOURS, londonClock, londonHours, progressAt } from './schedule';

/** "It's 12:38 in London..." under the hero. */
export function LiveReadout() {
  const [state, setState] = useState<{ clock: string; checks: number; releases: number } | null>(null);
  useEffect(() => {
    const tick = () => {
      const p = progressAt(londonHours());
      setState({ clock: londonClock(), ...p });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="readout">
      {state ? (
        <>
          <span className="readout-live" aria-hidden="true" />
          <span className="readout-time">It&rsquo;s {state.clock} in London.</span> By this time each day, buyX
          has run <b>{state.checks}</b> of its {CHECKS_PER_DAY} health checks and MMCC has published{' '}
          <b>{state.releases}</b> of {RELEASE_HOURS.length} YouTube releases.
        </>
      ) : (
        ' '
      )}
    </p>
  );
}

/** Network status pill that follows the cable in the 3D scene. */
export function UnplugStatus() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      setOff(scroll.unplug > 0.35);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <p className={`net ${off ? 'net-off' : ''}`} role="status">
      <span className="net-dot" aria-hidden="true" />
      {off ? 'Network unplugged. Still running.' : 'Network connected'}
    </p>
  );
}
