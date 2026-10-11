export function ConfidenceChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-ai-strong bg-ai-subtle"
      style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.01em' }}
    >
      {label}
    </span>
  );
}

export default ConfidenceChip;
