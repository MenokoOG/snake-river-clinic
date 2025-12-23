import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import usePageMeta from "../../seo/usePageMeta";

export default function Login() {
  usePageMeta({
    title: "Login • Snake River Adult Medicine",
    description: "Secure login for patients and clinic admin.",
    noIndex: true,
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const from = (location.state as any)?.from as string | undefined;

  const canSubmit = useMemo(() => {
    return email.trim().includes("@") && password.length >= 6;
  }, [email, password]);

  async function onGoogle() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      await loginWithGoogle();
      navigate(from || "/patient", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    setBusy(true);
    setError("");
    try {
      await login(email.trim(), password);
      navigate(from || "/patient", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Unable to log in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold text-white">Log in</h1>
        <p className="mt-2 text-sm text-white/70">
          Use Google sign-in for the most reliable prototype experience.
        </p>

        <div className="mt-5">
          <button
            onClick={onGoogle}
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            disabled={busy}
            aria-label="Continue with Google"
          >
            {busy ? "Signing in…" : "Continue with Google"}
          </button>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-white/50">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="space-y-2 block">
            <span className="text-xs text-white/70">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
            />
          </label>

          <label className="space-y-2 block">
            <span className="text-xs text-white/70">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
            />
          </label>

          {error && (
            <div
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-100"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            className="btn-primary w-full py-2"
            disabled={!canSubmit || busy}
          >
            {busy ? "Logging in…" : "Log in with Email"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/signup"
              className="text-white/80 hover:text-white underline underline-offset-4"
            >
              Create account
            </Link>
            <Link
              to="/"
              className="text-white/70 hover:text-white underline underline-offset-4"
            >
              Back to site
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
