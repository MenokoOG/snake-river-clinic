import { useAppointments } from "../../appointments/useAppointments";
import Calendar from "../../calendar/Calendar";
import usePageMeta from "../../seo/usePageMeta";
import { useState } from "react";

export default function AdminAppointments() {
  usePageMeta({
    title: "Manage Appointments | Admin | Snake River Adult Medicine",
    description:
      "Admin appointment management: review requests and approve or reject.",
    canonicalPath: "/admin/appointments",
  });

  const { appointments, loading, updateStatus } = useAppointments();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  if (loading) return <div className="p-8">Loading…</div>;

  const list = selectedDate
    ? appointments.filter((a) => a.date === selectedDate)
    : appointments;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-white/75 text-sm">
          Select a day on the calendar to filter appointments.
        </p>
      </header>

      <Calendar
        appointments={appointments}
        onSelect={(date) => setSelectedDate(date)}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {selectedDate
            ? `Appointments for ${selectedDate}`
            : "All appointments"}
        </h2>

        {selectedDate && (
          <button
            className="btn-hero"
            type="button"
            onClick={() => setSelectedDate(null)}
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="space-y-3" aria-live="polite">
        {list.length === 0 && (
          <div className="border border-white/10 bg-white/5 rounded-xl p-4">
            No appointments found.
          </div>
        )}

        {list.map((a) => (
          <div
            key={a.id}
            className="border border-white/10 bg-white/5 p-4 rounded-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{a.patientName}</div>
                <div className="text-sm opacity-80">
                  {a.date} @ {a.time}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  Status: <span className="font-medium">{a.status}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn-hero"
                  type="button"
                  onClick={() => updateStatus(a.id!, "approved")}
                >
                  Approve
                </button>
                <button
                  className="btn-hero"
                  type="button"
                  onClick={() => updateStatus(a.id!, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
