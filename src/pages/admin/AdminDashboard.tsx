import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import usePageMeta from "../../seo/usePageMeta";

export default function AdminDashboard() {
  usePageMeta({
    title: "Admin Dashboard | Snake River Adult Medicine",
    description:
      "Admin dashboard for managing site content and appointment requests.",
    canonicalPath: "/admin",
  });

  const { user, logout } = useAuth();

  return (
    <section className="space-y-6 max-w-4xl mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <button className="btn-hero" onClick={logout}>
          Log out
        </button>
      </header>

      <p className="opacity-80">
        Signed in as <strong>{user?.email}</strong>
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/admin/content"
          className="srams-card p-6 rounded-xl block border border-white/10 bg-white/5 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Edit Website Content</h2>
          <p className="opacity-75">
            Update text on every page of the site. No coding required.
          </p>
        </Link>

        <Link
          to="/admin/appointments"
          className="srams-card p-6 rounded-xl block border border-white/10 bg-white/5 hover:bg-white/10 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Appointments</h2>
          <p className="opacity-75">
            Review, approve, and reject appointment requests.
          </p>
        </Link>
      </div>
    </section>
  );
}
