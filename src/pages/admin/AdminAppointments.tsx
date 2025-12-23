import { useAppointments } from "../../appointments/useAppointments";
import Calendar from "../../calendar/Calendar";
import usePageMeta from "../../seo/usePageMeta";
import { useMemo, useState } from "react";

function pillFor(status: string) {
  if (status === "approved") return "pill pill--approved";
  if (status === "rejected") return "pill pill--rejected";
  if (status === "canceled") return "pill pill--canceled";
  return "pill pill--pending";
}

export default function AdminAppointments() {
  usePageMeta({
    title: "Manage Appointments | Admin | Snake River Adult Medicine",
    description:
      "Admin appointment management: review requests and approve, reject, or cancel.",
    canonicalPath: "/admin/appointments",
  });

  const { appointments, loading, updateStatus } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const list = useMemo(() => {
    return selectedDate
      ? appointments.filter((a) => a.date === selectedDate)
      : appointments;
  }, [appointments, selectedDate]);

  if (loading) return <div className="p-8">Loading…</div>;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Appointments</h1>
        <p className="text-[1.05rem]" style={{ color: "var(--muted)" }}>
          Select a day on the calendar to filter appointments. Status colors are
          shown on the calendar and in the list.
        </p>
      </header>

      <Calendar
        appointments={appointments}
        onSelect={(date) => setSelectedDate(date)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold">
          {selectedDate
            ? `Appointments for ${selectedDate}`
            : "All appointments"}
        </h2>

        {selectedDate && (
          <button
            className="btn-ghost"
            type="button"
            onClick={() => setSelectedDate(null)}
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="space-y-4" aria-live="polite">
        {list.length === 0 && (
          <div className="card p-5">No appointments found.</div>
        )}

        {list.map((a) => (
          <div key={a.id} className="card p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-1">
                <div className="text-lg font-semibold">{a.patientName}</div>

                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  {a.date} @ {a.time}
                </div>

                <div className={pillFor(a.status)}>
                  Status: <span className="font-semibold">{a.status}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  className="btn-hero"
                  type="button"
                  onClick={() => updateStatus(a.id!, "approved")}
                >
                  Approve
                </button>

                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => updateStatus(a.id!, "rejected")}
                  style={{
                    borderColor: "rgba(245,158,11,0.35)",
                  }}
                >
                  Reject
                </button>

                <button
                  className="btn-ghost"
                  type="button"
                  onClick={() => updateStatus(a.id!, "canceled")}
                  style={{
                    borderColor: "rgba(239,68,68,0.35)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
