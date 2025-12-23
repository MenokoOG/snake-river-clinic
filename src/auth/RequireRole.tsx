import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { AppRole } from "./types";

export default function RequireRole({
  role,
  children,
}: {
  role: AppRole;
  children: React.ReactNode;
}) {
  const { loading, role: currentRole, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (currentRole !== role) {
    return <Navigate to="/patient" replace />;
  }

  return <>{children}</>;
}
