import { Avatar } from "./Avatar";

export interface AvatarGroupPerson {
  initials: string;
  color: string;
}

export interface AvatarGroupProps {
  people: AvatarGroupPerson[];
  max?: number;
  size?: number;
  className?: string;
}

/** Overlapping avatar stack. Anyone past `max` collapses into a +n chip. */
export function AvatarGroup({
  people,
  max = 4,
  size = 24,
  className = "",
}: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const overflow = people.length - shown.length;

  return (
    <div className={`flex -space-x-1.5 ${className}`}>
      {shown.map((person, index) => (
        <Avatar
          key={`${person.initials}-${index}`}
          initials={person.initials}
          color={person.color}
          size={size}
        />
      ))}
      {overflow > 0 && (
        <div
          className="flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: size,
            height: size,
            background: "#F3F3F6",
            color: "#62626F",
            fontSize: size * 0.33,
            fontWeight: 600,
            fontFamily: "var(--font-tight)",
            border: "2px solid white",
          }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
