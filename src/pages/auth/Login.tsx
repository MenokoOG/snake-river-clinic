import { FormEvent, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import usePageMeta from "../../seo/usePageMeta";

function friendlyAuthError(err: unknown) {
  const msg = String((err as any)?.message ?? err ?? "");
  if (msg.includes("auth/invalid-credential"))
    return "Invalid email or password.";
  if (msg.includes("auth/user-not-found"))
    return "No account found for this email.";
  if (msg.includes("auth/wrong-password")) return "Incorrect password.";
  if (msg.includes("auth/too-many-requests"))
    return "Too many attempts. Please try again later.";
  return "Login failed. Please try again.";
}

export default function Login() {
  usePageMeta({
    title: "Login • Snake River Adult Medicine",
    description: "Secure login for patient portal and staff access.",
  });

  const { login } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const from = useMemo(() => {
    const state = location.state as any;
    return (state?.from as string) || "/patient";
  }, [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      nav(from, { replace: true });
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-white">Log in</h1>
        <p className="mt-1 text-sm text-white/70">
          Patients can access the demo portal. Staff accounts can access admin
          tools.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm text-white/80">Email</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/80">Password</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl border border-white/10 bg-emerald-500/90 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? "Logging in…" : "Log in"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">New here?</span>
            <Link
              to="/signup"
              className="text-white underline underline-offset-4 hover:text-white/90"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
