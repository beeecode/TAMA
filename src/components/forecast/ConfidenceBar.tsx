interface ConfidenceBarProps {
  p50Label: string;
  p85Label: string;
  p95Label: string;
  targetLabel?: string;
  targetPosition?: number; // 0-1 fraction along bar
  p50Position?: number;
  p85Position?: number;
  height?: number;
  isLearning?: boolean;
  isBreached?: boolean;
  compact?: boolean;
  className?: string;
}

export function ConfidenceBar({
  p50Label,
  p85Label,
  p95Label,
  targetLabel,
  targetPosition = 0.72,
  p50Position = 0.35,
  p85Position = 0.65,
  height = 10,
  isLearning = false,
  isBreached = false,
  compact = false,
  className = '',
}: ConfidenceBarProps) {
  const targetColor = isBreached ? '#D64545' : '#16161D';

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative w-full rounded-full overflow-hidden"
        style={{ height, background: '#EAEAEF' }}
      >
        {/* P50 solid fill */}
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${p50Position * 100}%`,
            background: '#8B8FE8',
          }}
        />
        {/* P50 → P85 mid fill */}
        <div
          className="absolute top-0 h-full"
          style={{
            left: `${p50Position * 100}%`,
            width: `${(p85Position - p50Position) * 100}%`,
            background: '#B9BCF0',
          }}
        />
        {/* P85 → P95 faint with fade */}
        <div
          className="absolute top-0 h-full"
          style={{
            left: `${p85Position * 100}%`,
            width: `${(1 - p85Position) * 100}%`,
            background: 'linear-gradient(to right, #DCDDF8, transparent)',
          }}
        />
        {/* Learning hatch overlay */}
        {isLearning && (
          <div className="absolute inset-0 hatch-overlay" />
        )}
        {/* Target line */}
        {targetLabel && (
          <div
            className="absolute top-0 h-full w-0.5"
            style={{ left: `${targetPosition * 100}%`, background: targetColor }}
          />
        )}
        {/* Tick marks at P50, P85, P95 */}
        {!compact && (
          <>
            <div className="absolute top-0 h-full w-px bg-text-primary opacity-40" style={{ left: `${p50Position * 100}%` }} />
            <div className="absolute top-0 h-full w-px bg-text-primary opacity-40" style={{ left: `${p85Position * 100}%` }} />
            <div className="absolute top-0 h-full w-px bg-text-primary opacity-40" style={{ right: 0 }} />
          </>
        )}
      </div>
      {!compact && (
        <div className="relative flex mt-1.5" style={{ fontSize: 10 }}>
          <span
            className="absolute font-mono text-text-tertiary"
            style={{ left: `${p50Position * 100}%`, transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {p50Label}
          </span>
          <span
            className="absolute font-mono text-text-tertiary"
            style={{ left: `${p85Position * 100}%`, transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {p85Label}
          </span>
          <span
            className="absolute font-mono text-text-tertiary"
            style={{ right: 0, fontFamily: 'var(--font-mono)', fontWeight: 500 }}
          >
            {p95Label}
          </span>
          {targetLabel && (
            <span
              className="absolute"
              style={{
                left: `${targetPosition * 100}%`,
                transform: 'translateX(-50%)',
                color: targetColor,
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                fontSize: 10,
                top: -18,
              }}
            >
              ↓ {targetLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default ConfidenceBar;
