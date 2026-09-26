import { useState } from "react";
import { Button } from "@/components/basics/Button";
import { SectionCard } from "@/components/layout/SectionBlock";
import { SettingsRow, SettingsSelect } from "./SettingsRow";

const TIMEZONES = [
  "Europe/London",
  "Europe/Berlin",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Singapore",
];

const WEEK_STARTS = ["Monday", "Sunday"];

const WORKING_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function GeneralPanel() {
  const [name, setName] = useState("Meridian Ops");
  const [timezone, setTimezone] = useState(TIMEZONES[0]);
  const [weekStart, setWeekStart] = useState(WEEK_STARTS[0]);
  const [days, setDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri"]);

  const toggleDay = (day: string) =>
    setDays((current) =>
      current.includes(day) ? current.filter((d) => d !== day) : [...current, day],
    );

  return (
    <div className="flex flex-col gap-5">
      <SectionCard>
        <div className="px-5 pt-5 pb-1">
          <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
            Workspace
          </h3>
        </div>
        <SettingsRow label="Workspace name">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-lg px-3 outline-none"
            style={{
              height: 34,
              width: 220,
              border: "1px solid #D5D5DE",
              background: "#FFFFFF",
              fontSize: 13,
              color: "#16161D",
            }}
          />
        </SettingsRow>
        <SettingsRow
          label="Time zone"
          help="Forecast dates and working-hour calculations use this zone."
        >
          <SettingsSelect value={timezone} options={TIMEZONES} onChange={setTimezone} width={200} />
        </SettingsRow>
        <SettingsRow label="Week starts on" last>
          <SettingsSelect value={weekStart} options={WEEK_STARTS} onChange={setWeekStart} width={120} />
        </SettingsRow>
      </SectionCard>

      <SectionCard>
        <div className="px-5 pt-5 pb-1">
          <h3 style={{ fontSize: 16, fontWeight: 600, fontFamily: "var(--font-tight)", margin: 0 }}>
            Working days
          </h3>
          <p className="text-text-secondary mt-1" style={{ fontSize: 12 }}>
            TAMA never forecasts work landing on a non-working day. Changing this
            moves every date in the workspace.
          </p>
        </div>
        <div className="flex gap-2 px-5 pt-4 pb-5">
          {WORKING_DAYS.map((day) => {
            const on = days.includes(day);
            return (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className="rounded-lg transition-colors cursor-pointer"
                style={{
                  width: 52,
                  height: 34,
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: on ? "#16161D" : "#9494A3",
                  background: on ? "#F3F3F6" : "#FFFFFF",
                  border: `1px solid ${on ? "#16161D" : "#D5D5DE"}`,
                }}
              >
                {day}
              </button>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard style={{ borderColor: "#F2D5D5" }}>
        <div className="flex items-center justify-between gap-6 p-5">
          <div>
            <div className="text-text-primary" style={{ fontSize: 13, fontWeight: 500 }}>
              Delete workspace
            </div>
            <div className="text-text-secondary mt-0.5" style={{ fontSize: 12 }}>
              Removes every project, forecast and signal history. This cannot be
              undone.
            </div>
          </div>
          <Button variant="secondary" size="sm">
            <span style={{ color: "#D64545" }}>Delete workspace</span>
          </Button>
        </div>
      </SectionCard>
    </div>
  );
}

export default GeneralPanel;
