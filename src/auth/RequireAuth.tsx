import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="py-20 text-center text-white/70">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
          Loading…
        </div>
      </div>
    );
  }

  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;

  return children;
}
