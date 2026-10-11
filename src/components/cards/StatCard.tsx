import type { ReactNode } from "react";

export interface KPICardProps {
  label: string;
  value: string | number;
  description: string;
  footerIcon?: ReactNode;
  footerText?: string;
  footerColor?: string;
}

export function KPICard({
  label,
  value,
  description,
  footerIcon,
  footerText,
  footerColor = "#2F9E6B",
}: KPICardProps) {
  return (
    <div
      className="flex flex-col bg-surface rounded-xl p-5"
      style={{
        border: "1px solid #EAEAEF",
        boxShadow: "0 1px 2px rgba(22,22,29,0.04)",
        flex: 1,
      }}
    >
      <div
        className="text-text-tertiary uppercase mb-3"
        style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}
      >
        {label}
      </div>
      <div
        className="text-text-primary mb-1"
        style={{
          fontSize: 30,
          fontWeight: 600,
          lineHeight: "34px",
          fontFamily: "var(--font-tight)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div className="text-text-secondary mb-4" style={{ fontSize: 13 }}>
        {description}
      </div>
      {footerText && (
        <div
          className="mt-auto pt-3 flex items-center gap-1.5"
          style={{ borderTop: "1px solid #EAEAEF" }}
        >
          {footerIcon}
          <span style={{ fontSize: 12, color: footerColor, fontWeight: 500 }}>
            {footerText}
          </span>
        </div>
      )}
    </div>
  );
}

export default KPICard;
