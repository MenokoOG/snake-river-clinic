import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import usePageMeta from "../../seo/usePageMeta";

function friendlySignupError(err: unknown) {
  const msg = String((err as any)?.message ?? err ?? "");
  if (msg.includes("auth/email-already-in-use"))
    return "That email is already registered. Try logging in.";
  if (msg.includes("auth/invalid-email")) return "Please enter a valid email.";
  if (msg.includes("auth/weak-password"))
    return "Password is too weak. Use at least 6 characters.";
  return "Account creation failed. Please try again.";
}

export default function Signup() {
  usePageMeta({
    title: "Create Account • Snake River Adult Medicine",
    description:
      "Create a patient account to access the portal demo and appointment details.",
  });

  const { signup } = useAuth();
  const nav = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await signup({ email, password, displayName });
      nav("/patient", { replace: true });
    } catch (err) {
      setError(friendlySignupError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-white">Create account</h1>
        <p className="mt-1 text-sm text-white/70">
          Patient portal demo access. No sensitive info required.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-sm text-white/80">
              Name (optional)
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="First name"
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl border border-white/10 bg-emerald-500/90 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {busy ? "Creating…" : "Create account"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Already have an account?</span>
            <Link
              to="/login"
              className="text-white underline underline-offset-4 hover:text-white/90"
            >
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
