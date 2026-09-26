export type DeliveryStatus = "on-track" | "at-risk" | "slipping" | "pending";

export interface StatusPillProps {
  status: DeliveryStatus;
  size?: "sm" | "md";
}

/** Status colours are semantic — they never get used decoratively. */
const CONFIG: Record<DeliveryStatus, { bg: string; color: string; label: string }> = {
  "on-track": { bg: "#E8F7F1", color: "#2F9E6B", label: "On track" },
  "at-risk": { bg: "#FDF5E3", color: "#E0A32E", label: "At risk" },
  slipping: { bg: "#FBECEC", color: "#D64545", label: "Slipping" },
  pending: { bg: "#F3F3F6", color: "#A0A0AE", label: "Pending" },
};

export function StatusPill({ status, size = "md" }: StatusPillProps) {
  const { bg, color, label } = CONFIG[status];
  return (
    <span
      className="inline-flex items-center rounded-full font-medium"
      style={{
        background: bg,
        color,
        fontSize: size === "sm" ? 11 : 12,
        padding: size === "sm" ? "2px 8px" : "3px 10px",
      }}
    >
      {label}
    </span>
  );
}

export default StatusPill;
