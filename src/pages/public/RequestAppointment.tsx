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
    <section className="p-10 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Request Appointment</h2>

      {sent && <p className="mb-4">Request submitted.</p>}

      <form onSubmit={submit} className="space-y-3">
        <input name="name" required placeholder="Name" className="input" />
        <input name="email" required placeholder="Email" className="input" />
        <input name="date" required type="date" className="input" />
        <input name="time" required type="time" className="input" />
        <button className="btn-hero">Submit</button>
      </form>
    </section>
  );
}
