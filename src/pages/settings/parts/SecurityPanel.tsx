import { useState } from "react";
import { Button } from "@/components/basics/Button";
import { SectionCard } from "@/components/layout/SectionBlock";
import { SettingsRow, SettingsSelect, SettingsToggle } from "./SettingsRow";

const SESSION_LENGTHS = ["8 hours", "24 hours", "7 days", "30 days"];
const RETENTION = ["90 days", "1 year", "2 years", "Forever"];

const AUDIT_ENTRIES = [
  { actor: "Courtney Webb", action: "Changed default confidence level to P85", when: "2h ago" },
  { actor: "Alex Mora", action: "Connected Slack", when: "1d ago" },
  { actor: "TAMA", action: "Exported forecast summary to leadership", when: "3d ago" },
  { actor: "Courtney Webb", action: "Invited dev@meridian.co as Member", when: "2d ago" },
  { actor: "Tom Keller", action: "Signed in from a new device", when: "1w ago" },
];

export function SecurityPanel() {
  const [sso, setSso] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [session, setSession] = useState(SESSION_LENGTHS[1]);
  const [retention, setRetention] = useState(RETENTION[1]);

  return (
    <div className="flex flex-col gap-5">
      <SectionCard>
        <div className="px-5 pt-5 pb-1">
          <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
            Access
          </h3>
        </div>
        <SettingsRow
          label="Require two-factor authentication"
          help="Everyone in the workspace must set up 2FA before their next sign-in."
        >
          <SettingsToggle on={twoFactor} onChange={setTwoFactor} label="Require two-factor authentication" />
        </SettingsRow>
        <SettingsRow
          label="SAML single sign-on"
          help="Available on the Scale plan. Members sign in through your identity provider."
        >
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded-full"
              style={{ background: "#F3F3F6", fontSize: 10, color: "#A0A0AE", fontWeight: 500 }}
            >
              Scale plan
            </span>
            <SettingsToggle on={sso} onChange={setSso} label="SAML single sign-on" />
          </div>
        </SettingsRow>
        <SettingsRow label="Session length" help="How long a sign-in lasts before it expires." last>
          <SettingsSelect value={session} options={SESSION_LENGTHS} onChange={setSession} width={140} />
        </SettingsRow>
      </SectionCard>

      <SectionCard>
        <div className="px-5 pt-5 pb-1">
          <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
            Data
          </h3>
        </div>
        <SettingsRow
          label="Signal retention"
          help="How long TAMA keeps the completed-work history it calibrates on. Shorter retention widens forecast bands."
        >
          <SettingsSelect value={retention} options={RETENTION} onChange={setRetention} width={140} />
        </SettingsRow>
        <SettingsRow
          label="Export workspace data"
          help="Every project, task, forecast and signal as JSON."
          last
        >
          <Button variant="secondary" size="sm">Request export</Button>
        </SettingsRow>
      </SectionCard>

      <SectionCard>
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
              Audit log
            </h3>
            <p className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
              Every change to settings, access and forecast data.
            </p>
          </div>
          <Button variant="ghost" size="sm">View all</Button>
        </div>
        {AUDIT_ENTRIES.map((entry) => (
          <div
            key={`${entry.actor}-${entry.when}`}
            className="flex items-center gap-3 px-5"
            style={{ height: 46, borderTop: "1px solid #EAEAEF" }}
          >
            <span
              className="text-text-primary"
              style={{ fontSize: 12, width: 130, fontWeight: entry.actor === "TAMA" ? 500 : 400 }}
            >
              {entry.actor}
            </span>
            <span className="flex-1 text-text-secondary truncate" style={{ fontSize: 12 }}>
              {entry.action}
            </span>
            <span
              className="text-text-tertiary"
              style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}
            >
              {entry.when}
            </span>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

export default SecurityPanel;
