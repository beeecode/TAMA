import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "ai";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

const HEIGHT: Record<ButtonSize, number> = { sm: 32, md: 40, lg: 48 };
const PADDING: Record<ButtonSize, string> = {
  sm: "0 16px",
  md: "0 20px",
  lg: "0 24px",
};
const FONT_SIZE: Record<ButtonSize, number> = { sm: 12, md: 13, lg: 15 };

const VARIANT: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "var(--color-action)",
    color: "#FFFFFF",
    border: "none",
  },
  secondary: {
    background: "var(--color-surface)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border-strong)",
  },
  ghost: {
    background: "transparent",
    color: "var(--color-text-secondary)",
    border: "1px solid transparent",
  },
  // `ai` marks an action TAMA suggested rather than one the person chose.
  ai: {
    background: "var(--color-ai-subtle)",
    color: "var(--color-ai-strong)",
    border: "1px solid var(--color-ai-faint)",
  },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        height: HEIGHT[size],
        padding: PADDING[size],
        fontSize: FONT_SIZE[size],
        fontFamily: "var(--font-sans)",
        ...VARIANT[variant],
      }}
    >
      {children}
    </button>
  );
}

export default Button;
