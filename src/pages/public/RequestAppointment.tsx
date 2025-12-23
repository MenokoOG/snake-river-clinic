import { useState } from "react";
import { useAppointments } from "../../appointments/useAppointments";

export default function RequestAppointment() {
  const { request } = useAppointments();
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form)) as any;

    await request({
      patientName: data.name,
      patientEmail: data.email,
      date: data.date,
      time: data.time,
    });

    setSent(true);
    form.reset();
  };

  return (
    <section className="max-w-xl mx-auto space-y-5">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Request Appointment</h1>
        <p className="text-[1.05rem]" style={{ color: "var(--muted)" }}>
          Submit a request and our team will follow up.
        </p>
      </header>

      <div className="card p-6 sm:p-7">
        {sent && (
          <div className="mb-4 pill pill--approved" role="status">
            Request submitted.
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <label
              className="text-sm font-semibold"
              style={{ color: "var(--muted)" }}
            >
              Name
            </label>
            <input
              name="name"
              required
              placeholder="Your name"
              className="input"
            />
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-semibold"
              style={{ color: "var(--muted)" }}
            >
              Email
            </label>
            <input
              name="email"
              required
              placeholder="you@example.com"
              className="input"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                className="text-sm font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Date
              </label>
              <input name="date" required type="date" className="input" />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-semibold"
                style={{ color: "var(--muted)" }}
              >
                Time
              </label>
              <input name="time" required type="time" className="input" />
            </div>
          </div>

          <button className="btn-hero w-full sm:w-auto">Submit</button>
        </form>
      </div>
    </section>
  );
}
