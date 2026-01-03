import { useMemo, useState } from "react";
import usePageMeta from "../../seo/usePageMeta";

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
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

export default function PatientCalendar() {
  usePageMeta({
    title: "Calendar • Patient Portal",
    description: "Accessible calendar view of upcoming appointments (demo).",
  });

  const [cursor, setCursor] = useState(() => new Date());

  const { label, days } = useMemo(() => {
    const first = startOfMonth(cursor);

    const monthLabel = first.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });

    const grid: Array<{ date: Date; inMonth: boolean }> = [];
    const startDayIndex = first.getDay(); // 0..6
    const startGrid = new Date(first);
    startGrid.setDate(first.getDate() - startDayIndex);

    for (let i = 0; i < 42; i++) {
      const d = new Date(startGrid);
      d.setDate(startGrid.getDate() + i);
      grid.push({ date: d, inMonth: d.getMonth() === cursor.getMonth() });
    }

    return { label: monthLabel, days: grid };
  }, [cursor]);

  return (
    <div className="space-y-5">
      {/* Header card */}
      <div className="card p-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            Calendar
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {label}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            className="btn-ghost px-3 py-2 text-sm"
            onClick={() => setCursor((c) => addMonths(c, -1))}
          >
            Prev
          </button>
          <button
            className="btn-ghost px-3 py-2 text-sm"
            onClick={() => setCursor(() => new Date())}
          >
            Today
          </button>
          <button
            className="btn-ghost px-3 py-2 text-sm"
            onClick={() => setCursor((c) => addMonths(c, 1))}
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar grid card */}
      <div className="card p-5">
        <div className="grid grid-cols-7 gap-2 text-xs mb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-2" style={{ color: "var(--muted)" }}>
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map(({ date, inMonth }) => {
            const id = ymd(date);
            return (
              <button
                key={id}
                type="button"
                className={[
                  "h-12 rounded-xl border text-left px-2 py-1 transition focus:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-offset-0",
                  inMonth ? "hover:opacity-95" : "opacity-60",
                ].join(" ")}
                style={{
                  borderColor: "var(--border)",
                  background: "var(--panel)",
                  color: inMonth ? "var(--text)" : "var(--muted2)",
                  boxShadow: "none",
                }}
                aria-label={`Calendar day ${date.toDateString()}`}
                title={id}
              >
                <div className="text-sm font-medium">{date.getDate()}</div>
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
          Demo calendar UI. Next step is wiring appointment reads from Firestore
          and highlighting booked days.
        </p>
      </div>
    </div>
  );
}