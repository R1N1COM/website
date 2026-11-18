// One day in the two businesses, drawn on a 24-hour ruler.
// Every hairline tick is a five-minute health check on buyX (288 a day).

const W = 1000;
const H = 150;
const X0 = 0;
const X1 = W;
const x = (hour: number) => X0 + ((X1 - X0) * hour) / 24;

const PUBLISH = [8, 13, 18];

export function DaySvg() {
  const ticks = Array.from({ length: 288 }, (_, i) => i);
  return (
    <div className="day">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="day-svg"
        role="img"
        aria-labelledby="day-title day-desc"
      >
        <title id="day-title">A day of automated work across buyX and MMCC</title>
        <desc id="day-desc">
          288 health checks, a morning rehearsal and audit, and three YouTube releases at 08:00,
          13:00 and 18:00.
        </desc>

        {/* Morning band: rehearsal, page audit, lead summary */}
        <rect x={x(6)} y={18} width={x(9) - x(6)} height={70} className="day-morning" />

        {/* Five-minute health checks */}
        {ticks.map((i) => {
          const hourMark = i % 12 === 0;
          return (
            <line
              key={i}
              x1={x(i / 12)}
              x2={x(i / 12)}
              y1={hourMark ? 88 : 96}
              y2={110}
              className={hourMark ? 'day-hour' : 'day-tick'}
            />
          );
        })}
        <line x1={X0} x2={X1} y1={110} y2={110} className="day-base" />

        {/* YouTube releases */}
        {PUBLISH.map((h) => (
          <g key={h}>
            <line x1={x(h)} x2={x(h)} y1={10} y2={110} className="day-release" />
            <rect x={x(h) - 5} y={4} width={10} height={10} className="day-release-dot" />
          </g>
        ))}

        {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
          <text key={h} x={x(h) + 3} y={132} className={h % 6 ? 'day-label day-label-minor' : 'day-label'}>
            {String(h).padStart(2, '0')}:00
          </text>
        ))}
      </svg>
    </div>
  );
}

export function DayKey() {
  return (
      <div className="day-key">
        <p>
          <span className="key key-tick" aria-hidden="true" />
          <strong>288 health checks.</strong> buyX checks itself every five minutes. Two failures in a
          row count as a problem.
        </p>
        <p>
          <span className="key key-morning" aria-hidden="true" />
          <strong>Each morning.</strong> A test seller lists a test item and buyX runs 14 checks on
          itself. Every page is audited. MMCC&rsquo;s new leads arrive, qualified, in one summary.
        </p>
        <p>
          <span className="key key-release" aria-hidden="true" />
          <strong>08:00, 13:00, 18:00.</strong> Each MMCC job video is republished on YouTube with
          freshly written titles and descriptions.
        </p>
      </div>
  );
}
