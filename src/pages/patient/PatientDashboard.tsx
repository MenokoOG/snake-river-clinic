import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import usePageMeta from "../../seo/usePageMeta";

export default function PatientDashboard() {
  usePageMeta({
    title: "Patient Portal • Snake River Adult Medicine",
    description: "Patient portal demo dashboard.",
  });

  const { profile, logout } = useAuth();

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">
              Patient Portal (Demo)
            </h1>
            <p className="mt-1 text-sm text-white/70">
              Signed in as{" "}
              <span className="text-white/90">{profile?.email}</span>
            </p>
            <p className="mt-2 text-sm text-white/60">
              This portal is a demo. Do not submit sensitive information.
            </p>
          </div>

          <button onClick={logout} className="btn-ghost text-sm px-4 py-2">
            Log out
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Link
          to="/patient/calendar"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <div className="text-sm font-semibold text-white">Calendar</div>
          <div className="mt-1 text-sm text-white/70">
            View your upcoming appointments (demo).
          </div>
        </Link>

        <Link
          to="/request"
          className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <div className="text-sm font-semibold text-white">
            Request Appointment
          </div>
          <div className="mt-1 text-sm text-white/70">
            Submit a new appointment request.
          </div>
        </Link>
      </section>
    </div>
  );
}
