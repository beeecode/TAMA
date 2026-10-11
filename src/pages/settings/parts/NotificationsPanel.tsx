import { Icon } from "@/components/basics/Icon";
import { useState } from "react";
import { SectionCard } from "@/components/layout/SectionBlock";
import { SettingsRow, SettingsSelect, SettingsToggle } from "./SettingsRow";

type Channel = "inApp" | "email" | "slack";

interface NotificationEvent {
  id: string;
  label: string;
  help: string;
  channels: Record<Channel, boolean>;
}

const CHANNEL_LABELS: Record<Channel, string> = {
  inApp: "In-app",
  email: "Email",
  slack: "Slack",
};

/** The events worth interrupting someone for, in the order they matter. */
const EVENTS: NotificationEvent[] = [
  {
    id: "below-p50",
    label: "A commitment drops below P50",
    help: "The date you promised is now less likely than a coin flip.",
    channels: { inApp: true, email: true, slack: true },
  },
  {
    id: "forecast-moved",
    label: "A forecast moves more than 3 days",
    help: "Either direction — pulling in matters as much as slipping.",
    channels: { inApp: true, email: false, slack: true },
  },
  {
    id: "blocked",
    label: "A task stays blocked for 3 days",
    help: "Blockers are the single largest recoverable cause of slip.",
    channels: { inApp: true, email: false, slack: true },
  },
  {
    id: "over-capacity",
    label: "Someone goes over capacity",
    help: "Booked above 110% of their working hours for the week.",
    channels: { inApp: true, email: false, slack: false },
  },
  {
    id: "proposal",
    label: "TAMA has a new suggestion",
    help: "Collected in the inbox either way; this decides whether it pings.",
    channels: { inApp: true, email: false, slack: false },
  },
  {
    id: "digest",
    label: "Weekly forecast digest",
    help: "Friday summary of what moved and why, per project.",
    channels: { inApp: false, email: true, slack: false },
  },
];

const QUIET_HOURS = ["Off", "18:00 – 09:00", "20:00 – 08:00", "Weekends only"];

export function NotificationsPanel() {
  const [events, setEvents] = useState(EVENTS);
  const [quiet, setQuiet] = useState(QUIET_HOURS[1]);

  const toggle = (id: string, channel: Channel) =>
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...event, channels: { ...event.channels, [channel]: !event.channels[channel] } }
          : event,
      ),
    );

  return (
    <div className="flex flex-col gap-5">
      <SectionCard>
        <div className="px-5 pt-5 pb-4">
          <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
            What TAMA tells you about
          </h3>
          <p className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
            Forecasts move constantly. These are the movements worth an
            interruption.
          </p>
        </div>

        {/* Channel headings */}
        <div
          className="flex items-center gap-3 px-5"
          style={{
            height: 34,
            borderTop: "1px solid #EAEAEF",
            borderBottom: "1px solid #EAEAEF",
            background: "#F7F7F9",
          }}
        >
          <span className="flex-1" />
          {(Object.keys(CHANNEL_LABELS) as Channel[]).map((channel) => (
            <span
              key={channel}
              className="text-text-tertiary uppercase text-center"
              style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.06em", width: 56 }}
            >
              {CHANNEL_LABELS[channel]}
            </span>
          ))}
        </div>

        {events.map((event, index) => (
          <div
            key={event.id}
            className="flex items-center gap-3 px-5"
            style={{
              paddingTop: 14,
              paddingBottom: 14,
              borderTop: index > 0 ? "1px solid #EAEAEF" : "none",
            }}
          >
            <div className="flex-1 min-w-0" style={{ maxWidth: 400 }}>
              <div className="text-text-primary" style={{ fontSize: 13, fontWeight: 500 }}>
                {event.label}
              </div>
              <div className="text-text-secondary mt-0.5" style={{ fontSize: 12, lineHeight: "18px" }}>
                {event.help}
              </div>
            </div>
            {(Object.keys(CHANNEL_LABELS) as Channel[]).map((channel) => (
              <div key={channel} className="flex justify-center" style={{ width: 56 }}>
                <button
                  onClick={() => toggle(event.id, channel)}
                  aria-label={`${CHANNEL_LABELS[channel]} for ${event.label}`}
                  aria-pressed={event.channels[channel]}
                  className="rounded flex items-center justify-center cursor-pointer transition-colors"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `1.5px solid ${event.channels[channel] ? "#16161D" : "#D5D5DE"}`,
                    background: event.channels[channel] ? "#16161D" : "#FFFFFF",
                  }}
                >
                  {event.channels[channel] && (
                    <Icon name="check" size={11} color="#FFFFFF" />
                  )}
                </button>
              </div>
            ))}
          </div>
        ))}
      </SectionCard>

      <SectionCard>
        <div className="px-5 pt-5 pb-1">
          <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
            Delivery
          </h3>
        </div>
        <SettingsRow
          label="Quiet hours"
          help="Nothing but a commitment falling below P50 will reach you during these hours."
        >
          <SettingsSelect value={quiet} options={QUIET_HOURS} onChange={setQuiet} width={170} />
        </SettingsRow>
        <QuietRow />
      </SectionCard>
    </div>
  );
}

/** Separated so its own toggle state does not re-render the whole panel. */
function QuietRow() {
  const [batch, setBatch] = useState(true);
  return (
    <SettingsRow
      label="Batch low-priority notifications"
      help="Groups suggestions and progress updates into one notification per hour."
      last
    >
      <SettingsToggle on={batch} onChange={setBatch} label="Batch low-priority notifications" />
    </SettingsRow>
  );
}

export default NotificationsPanel;
