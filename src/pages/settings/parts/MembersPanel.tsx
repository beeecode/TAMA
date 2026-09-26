import { Icon } from "@/components/basics/Icon";
import { Avatar } from "@/components/basics/Avatar";
import { Button } from "@/components/basics/Button";
import { SectionCard } from "@/components/layout/SectionBlock";

interface Member {
  name: string;
  initials: string;
  color: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
  /** Capacity used this week, as a percentage. */
  load: number;
}

const MEMBERS: Member[] = [
  { name: "Courtney Webb", initials: "CW", color: "#16161D", email: "courtney@meridian.co", role: "Admin", load: 87 },
  { name: "Tom Keller", initials: "TK", color: "#22C55E", email: "tom@meridian.co", role: "Member", load: 124 },
  { name: "Sara Park", initials: "SP", color: "#0D9488", email: "sara@meridian.co", role: "Member", load: 72 },
  { name: "Alex Mora", initials: "AM", color: "#EC4899", email: "alex@meridian.co", role: "Admin", load: 95 },
  { name: "Rachel Kim", initials: "RK", color: "#8B5CF6", email: "rachel@meridian.co", role: "Member", load: 68 },
];

const PENDING = [{ email: "dev@meridian.co", role: "Member", sent: "2d ago" }];

function loadColor(load: number) {
  if (load > 110) return "#D64545";
  if (load > 90) return "#E0A32E";
  return "#2F9E6B";
}

export function MembersPanel() {
  return (
    <div className="flex flex-col gap-5">
      <SectionCard>
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
              Members
            </h3>
            <p className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
              {MEMBERS.length} of 10 seats used on the Team plan.
            </p>
          </div>
          <Button variant="primary" size="sm">Invite people</Button>
        </div>

        <div
          className="flex items-center gap-3 px-5"
          style={{ height: 36, borderTop: "1px solid #EAEAEF", borderBottom: "1px solid #EAEAEF", background: "#F7F7F9" }}
        >
          <span className="text-text-tertiary uppercase flex-1" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em" }}>
            Person
          </span>
          <span className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 120 }}>
            This week
          </span>
          <span className="text-text-tertiary uppercase" style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 90 }}>
            Role
          </span>
        </div>

        {MEMBERS.map((member, index) => (
          <div
            key={member.email}
            className="flex items-center gap-3 px-5"
            style={{ height: 56, borderTop: index > 0 ? "1px solid #EAEAEF" : "none" }}
          >
            <Avatar initials={member.initials} color={member.color} size={28} />
            <div className="flex-1 min-w-0">
              <div className="text-text-primary truncate" style={{ fontSize: 13 }}>
                {member.name}
              </div>
              <div className="text-text-tertiary truncate" style={{ fontSize: 11 }}>
                {member.email}
              </div>
            </div>
            <div className="flex items-center gap-2" style={{ width: 120 }}>
              <div className="rounded-full overflow-hidden" style={{ width: 56, height: 5, background: "#EAEAEF" }}>
                <div
                  style={{
                    width: `${Math.min(100, member.load)}%`,
                    height: "100%",
                    background: loadColor(member.load),
                  }}
                />
              </div>
              <span
                style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: loadColor(member.load) }}
              >
                {member.load}%
              </span>
            </div>
            <span className="text-text-secondary" style={{ fontSize: 12, width: 90 }}>
              {member.role}
            </span>
          </div>
        ))}
      </SectionCard>

      <SectionCard>
        <div className="px-5 pt-5 pb-3">
          <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
            Pending invitations
          </h3>
        </div>
        {PENDING.map((invite) => (
          <div
            key={invite.email}
            className="flex items-center gap-3 px-5"
            style={{ height: 52, borderTop: "1px solid #EAEAEF" }}
          >
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 28, height: 28, border: "1.5px dashed #D5D5DE" }}
            >
              <Icon name="plus" size={12} color="#9494A3" />
            </div>
            <span className="flex-1 text-text-primary" style={{ fontSize: 13 }}>
              {invite.email}
            </span>
            <span className="text-text-tertiary" style={{ fontSize: 12 }}>
              Sent {invite.sent}
            </span>
            <Button variant="ghost" size="sm">Resend</Button>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

export default MembersPanel;
