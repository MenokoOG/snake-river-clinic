import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import SkipToContent from "./SkipToContent";
import { useAuth } from "../auth/AuthContext";

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg transition border ${
          isActive
            ? "border-white/30 bg-white/10"
            : "border-white/10 hover:border-white/20 hover:bg-white/5"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  const { user, role, logout } = useAuth();

  return (
    <div className="min-h-screen srams-grain">
      <SkipToContent />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link to="/home" className="font-semibold tracking-wide">
            Snake River Adult Medicine
          </Link>

          <nav aria-label="Primary navigation" className="flex gap-2">
            <NavItem to="/home" label="Home" />
            <NavItem to="/services" label="Services" />
            <NavItem to="/testimonials" label="Testimonials" />
            <NavItem to="/contact" label="Contact" />
            <NavItem to="/request" label="Appointments" />
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                {role === "admin" && (
                  <Link to="/admin" className="btn-hero">
                    Admin
                  </Link>
                )}
                <button className="btn-hero" onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-hero">
                Log in
              </Link>
            )}
          </div>
        </div>
      </header>

      <main id="main" role="main" className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </main>

      <footer className="border-t border-white/10 bg-ink-950/70">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-white/70 space-y-2">
          <p>
            <strong className="text-white/90">
              Snake River Adult Medicine
            </strong>{" "}
            — Primary care in Clarkston, WA.
          </p>
          <p>
            For emergencies, call 911. This site does not provide urgent or
            emergency medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
