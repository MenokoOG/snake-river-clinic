import { NavLink, Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";
import { useAuth } from "../auth/AuthContext";

const baseLink =
  "px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60";
const active = "bg-white/10 text-white";
const inactive = "text-white/80 hover:text-white hover:bg-white/5";

export default function Header() {
  const { user, role, logout } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
            <span className="text-sm font-bold">SR</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">
              Snake River Adult Medicine
            </div>
            <div className="text-xs text-white/60">Clarkston, WA</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/testimonials"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Testimonials
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/request"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Request Appointment
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!user ? (
            <Link
              to="/login"
              state={{ from: location.pathname }}
              className="btn-hero text-sm px-4 py-2"
            >
              Staff Login
            </Link>
          ) : (
            <>
              {role === "admin" ? (
                <Link to="/admin" className="btn-hero text-sm px-4 py-2">
                  Admin
                </Link>
              ) : (
                <Link to="/patient" className="btn-hero text-sm px-4 py-2">
                  Portal
                </Link>
              )}

              <button onClick={logout} className="btn-ghost text-sm px-3 py-2">
                Log out
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-white/10">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/testimonials"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Testimonials
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/request"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            Appointment
          </NavLink>
        </div>
      </div>
    </header>
  );
}
