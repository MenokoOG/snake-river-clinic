import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import usePageMeta from "../../seo/usePageMeta";
import { firebaseAuth } from "../../firebase/auth"; // adjust if your file is named differently

export default function ForgotPassword() {
  usePageMeta({
    title: "Reset Password • Snake River Adult Medicine",
    description: "Request a password reset email.",
    noIndex: true,
  });

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const canSend = useMemo(
    () => email.trim().length >= 6 && email.includes("@"),
    [email]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setMessage("");

    try {
      await sendPasswordResetEmail(firebaseAuth, email.trim());
      setStatus("sent");
      setMessage(
        "If an account exists for that email, a reset link has been sent."
      );
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message ?? "Unable to send reset email.");
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-semibold text-white">
          Reset your password
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Enter your email and we will send a password reset link.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
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

          {message && (
            <div
              className={[
                "rounded-xl border px-3 py-2 text-sm",
                status === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-100"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-50",
              ].join(" ")}
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-2"
            disabled={!canSend || status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send reset link"}
          </button>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/login"
              className="text-white/80 hover:text-white underline underline-offset-4"
            >
              Back to login
            </Link>
            <Link
              to="/signup"
              className="text-white/80 hover:text-white underline underline-offset-4"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
