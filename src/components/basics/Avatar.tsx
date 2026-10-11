export interface AvatarProps {
  initials: string;
  /** Any CSS colour — people keep one colour across the whole product. */
  color: string;
  size?: number;
  /** A photograph. Falls back to the initials tile when absent or broken. */
  src?: string;
  /** Used as the image's alt text. */
  name?: string;
  /** Turn off the white ring when the avatar is not overlapping anything. */
  ring?: boolean;
}

export function Avatar({
  initials,
  color,
  size = 24,
  src,
  name,
  ring = true,
}: AvatarProps) {
  const frame = {
    width: size,
    height: size,
    border: ring ? "2px solid white" : "none",
  } as const;

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? initials}
        loading="lazy"
        className="rounded-full flex-shrink-0 object-cover"
        style={{ ...frame, background: color }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-semibold flex-shrink-0"
      style={{
        ...frame,
        background: color,
        fontSize: size * 0.35,
        fontFamily: "var(--font-tight)",
      }}
    >
      {initials}
    </div>
  );
}

export default Avatar;
