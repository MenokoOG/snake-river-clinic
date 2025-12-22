import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { AppRole } from "./types";

export default function RequireRole({
  role,
  children,
}: {
  role: AppRole;
  children: JSX.Element;
}) {
  const { role: currentRole, loading, user } = useAuth();
  const location = useLocation();

  // If auth is still loading, show a simple loading state.
  if (loading) {
    return (
      <div className="py-20 text-center text-white/70">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
          Checking permissions…
        </div>
      </div>
    );
  }

  // If not signed in, RequireAuth should have caught it,
  // but guard anyway in case of misuse.
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // If role is missing or insufficient, send to a safe page.
  if (currentRole !== role) {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
