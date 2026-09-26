import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "@/types";
import { joinClasses } from "@/helpers/joinClasses";
import { Icon } from "./Icon";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  icon: IconName;
  /** Required: an icon alone never explains itself to a screen reader. */
  label: string;
  size?: "sm" | "md" | "lg";
  outline?: boolean;
  active?: boolean;
}

export function IconButton({
  icon,
  label,
  size = "md",
  outline = false,
  active = false,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  const glyphSize = size === "sm" ? 14 : size === "lg" ? 20 : 17;
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      aria-pressed={active || undefined}
      className={joinClasses(
        "icon-btn",
        size !== "md" && `icon-btn-${size}`,
        outline && "icon-btn-outline",
        active && "icon-btn-active",
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={glyphSize} />
    </button>
  );
}

export default IconButton;
