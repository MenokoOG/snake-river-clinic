import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import usePageMeta from "../../seo/usePageMeta";
import { useInbox } from "../../messages/useMessages";
import { useAppointments } from "../../appointments/useAppointments";
import { useEffect, useMemo, useState } from "react";

export default function PatientDashboard() {
  usePageMeta({
    title: "Patient Portal • Snake River Adult Medicine",
    description: "Patient portal dashboard.",
    noIndex: true,
  });

  const { profile, logout } = useAuth();
  const email = profile?.email ?? "";

  const { messages, loading: msgLoading, markRead } = useInbox(email);
  const { fetchByEmail, archiveAndDelete } = useAppointments();

  const [myAppts, setMyAppts] = useState<any[]>([]);
  const [apptLoading, setApptLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function loadMine() {
    if (!email) return;
    setErr(null);
    setApptLoading(true);
    try {
      const rows = await fetchByEmail(email);
      setMyAppts(rows);
    } catch (e: any) {
      setErr(e?.message || "Failed to load appointments.");
    } finally {
      setApptLoading(false);
    }
  }

  useEffect(() => {
    loadMine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const unreadCount = useMemo(
    () => (messages || []).filter((m) => !m.readAt).length,
    [messages]
  );

  async function onDelete(id: string) {
    setErr(null);
    const ok = window.confirm(
      "Delete this appointment? This will remove it from your view and archive it."
    );
    if (!ok) return;

    try {
      await archiveAndDelete(id, {
        role: "patient",
        email,
        uid: profile?.uid,
      });
      await loadMine();
    } catch (e: any) {
      setErr(e?.message || "Failed to delete appointment.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <section className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
              Patient Portal
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
              Signed in as <span className="font-medium">{email}</span>
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--muted2)" }}>
              MVP portal — messages + appointments are live.
            </p>
          </div>

          <button onClick={logout} className="btn-ghost text-sm px-4 py-2">
            Log out
          </button>
        </div>
      </section>

      {/* Error card */}
      {err && (
        <div className="card p-4" style={{ borderColor: "var(--danger)" }}>
          <div className="font-semibold" style={{ color: "var(--danger)" }}>
            Error
          </div>
          <div style={{ color: "var(--muted)" }}>{err}</div>
        </div>
      )}

      {/* Quick actions */}
      <section className="grid gap-4 md:grid-cols-2">
        <Link
          to="/patient/calendar"
          className="card p-5 hover:opacity-95 transition focus:outline-none"
          style={{ boxShadow: "none" }}
        >
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            Calendar
          </div>
          <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            View your calendar.
          </div>
        </Link>

        <Link
          to="/request"
          className="card p-5 hover:opacity-95 transition focus:outline-none"
          style={{ boxShadow: "none" }}
        >
          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            Request Appointment
          </div>
          <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Submit a new request.
          </div>
        </Link>
      </section>

      {/* Messages */}
      <section className="card p-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              Messages
            </div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>
              {msgLoading
                ? "Loading…"
                : unreadCount
                ? `${unreadCount} unread`
                : "No unread messages"}
            </div>
          </div>
        </div>

        {(messages || []).length === 0 && (
          <div style={{ color: "var(--muted)" }}>No messages yet.</div>
        )}

        <div className="space-y-3">
          {(messages || []).slice(0, 10).map((m) => (
            <div key={m.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold" style={{ color: "var(--text)" }}>
                    {m.subject}
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    {new Date(m.createdAt).toLocaleString()}
                    {m.readAt ? " • Read" : " • Unread"}
                  </div>
                </div>

                {!m.readAt && (
                  <button
                    className="btn-ghost text-sm"
                    onClick={() => markRead(m.id!)}
                  >
                    Mark read
                  </button>
                )}
              </div>

              <div className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {m.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My appointments */}
      <section className="card p-6 space-y-3">
        <div>
          <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            My Appointments
          </div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>
            {apptLoading ? "Loading…" : "Appointments tied to your email."}
          </div>
        </div>

        {myAppts.length === 0 && !apptLoading && (
          <div style={{ color: "var(--muted)" }}>
            No appointments found for your email.
          </div>
        )}

        <div className="space-y-3">
          {myAppts.map((a) => (
            <div key={a.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold" style={{ color: "var(--text)" }}>
                    {a.date} @ {a.time}
                  </div>
                  <div className="text-sm" style={{ color: "var(--muted)" }}>
                    Status: <span className="font-semibold">{a.status}</span>
                  </div>
                </div>

                <button
                  className="btn-ghost text-sm"
                  onClick={() => onDelete(a.id)}
                >
                  Delete (Archive)
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}