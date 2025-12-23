import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand / clinic blurb */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
                <span className="text-sm font-bold">SR</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white">
                  Snake River Adult Medicine
                </div>
                <div className="text-xs text-white/60">
                  Clarkston, Washington
                </div>
              </div>
            </div>

            <p className="text-sm text-white/70">
              Respectful, human-centered care with a practical approach. Built
              for clarity, accessibility, and a smooth experience for patients
              and staff.
            </p>

            <div className="text-sm text-white/70">
              <div className="font-medium text-white/85">Business Email</div>
              <a
                className="hover:text-white underline underline-offset-4"
                href="mailto:snakeriveram@gmail.com"
              >
                snakeriveram@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">Explore</div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  className="text-white/70 hover:text-white transition"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/70 hover:text-white transition"
                  to="/services"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/70 hover:text-white transition"
                  to="/testimonials"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/70 hover:text-white transition"
                  to="/contact"
                >
                  Contact + Map
                </Link>
              </li>
              <li>
                <Link
                  className="text-white/70 hover:text-white transition"
                  to="/request"
                >
                  Request Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Small disclaimer + staff */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-white">Notes</div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70 space-y-2">
              <p>
                This site is for general information and appointment requests.
                It is not intended for emergencies.
              </p>
              <p className="text-white/60">
                In an emergency, call 911 or go to the nearest emergency
                department.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Staff Login
              </Link>

              <Link
                to="/admin"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-t border-white/10 pt-6">
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} Snake River Adult Medicine. All rights
            reserved.
          </div>

          <div className="text-xs text-white/60">
            Built by M3n0ko0g of Crimson Obsidain Industries, 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
