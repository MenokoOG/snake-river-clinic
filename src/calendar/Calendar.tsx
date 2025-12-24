import { useMemo, useState } from "react";
import type { Appointment, AppointmentStatus } from "../appointments/types";

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function addMonths(d: Date, months: number) {
  return new Date(d.getFullYear(), d.getMonth() + months, 1);
}
function pad(n: number) {
  return String(n).padStart(2, "0");
}
function ymd(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function statusPriority(s: AppointmentStatus): number {
  // Higher = more visually urgent
  if (s === "canceled") return 4;
  if (s === "rejected") return 3;
  if (s === "requested") return 2;
  return 1; // approved
}

function dotClassFor(status: AppointmentStatus) {
  if (status === "approved") return "dot dot--approved";
  if (status === "requested") return "dot dot--requested";
  if (status === "rejected") return "dot dot--rejected";
  return "dot dot--canceled";
}

export default function Calendar({
  appointments,
  onSelect,
}: {
  appointments: Appointment[];
  onSelect: (date: string) => void;
}) {
  const [cursor, setCursor] = useState(() => new Date());

  const { label, days } = useMemo(() => {
    const first = startOfMonth(cursor);

    const monthLabel = first.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });

    const grid: Array<{ date: Date; inMonth: boolean }> = [];
    const startDayIndex = first.getDay();
    const startGrid = new Date(first);
    startGrid.setDate(first.getDate() - startDayIndex);

    for (let i = 0; i < 42; i++) {
      const d = new Date(startGrid);
      d.setDate(startGrid.getDate() + i);
      grid.push({ date: d, inMonth: d.getMonth() === cursor.getMonth() });
    }

    return { label: monthLabel, days: grid };
  }, [cursor]);

  const byDate = useMemo(() => {
    const map = new Map<string, Appointment[]>();
    for (const a of appointments) {
      const arr = map.get(a.date) ?? [];
      arr.push(a);
      map.set(a.date, arr);
    }
    return map;
  }, [appointments]);

  return (
    <div className="card p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Calendar</div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            {label}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            className="btn-ghost text-sm"
            onClick={() => setCursor((c) => addMonths(c, -1))}
          >
            Prev
          </button>
          <button
            className="btn-ghost text-sm"
            onClick={() => setCursor(() => new Date())}
          >
            Today
          </button>
          <button
            className="btn-ghost text-sm"
            onClick={() => setCursor((c) => addMonths(c, 1))}
          >
            Next
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-7 gap-2 text-xs mb-2"
        style={{ color: "var(--muted)" }}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="px-2">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(({ date, inMonth }) => {
          const id = ymd(date);
          const appts = byDate.get(id) ?? [];

          const top =
            appts.length === 0
              ? null
              : appts
                  .slice()
                  .sort(
                    (a, b) =>
                      statusPriority(b.status) - statusPriority(a.status)
                  )[0].status;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={[
                "h-16 sm:h-20 rounded-2xl border text-left px-3 py-2 transition focus:outline-none",
                "focus-visible:ring-2 focus-visible:ring-offset-0",
                inMonth ? "hover:opacity-95" : "opacity-60",
              ].join(" ")}
              style={{
                borderColor: "var(--border)",
                background: "var(--panel)",
              }}
              aria-label={`Calendar day ${date.toDateString()}${
                appts.length ? ` with ${appts.length} appointments` : ""
              }`}
              title={id}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-base font-semibold">{date.getDate()}</div>
                {top && <span className={dotClassFor(top)} aria-hidden />}
              </div>

              {appts.length > 0 && (
                <div className="mt-2 text-xs" style={{ color: "var(--muted)" }}>
                  {appts.length} appt{appts.length === 1 ? "" : "s"}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <span className="pill pill--approved">
          <span className="dot dot--approved" /> Approved
        </span>
        <span className="pill pill--requested">
          <span className="dot dot--requested" /> Requested
        </span>
        <span className="pill pill--rejected">
          <span className="dot dot--rejected" /> Rejected
        </span>
        <span className="pill pill--canceled">
          <span className="dot dot--canceled" /> Canceled
        </span>
      </div>
    </div>
  );
}
