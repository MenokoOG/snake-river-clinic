import { Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";

export const routes = [
  { path: "/", element: <Navigate to="/home" /> },

  { path: "/home", element: <div className="p-8">Home (DROP 4)</div> },

  { path: "/contact", element: <div className="p-8">Contact (DROP 4)</div> },

  { path: "/login", element: <div className="p-8">Login (DROP 4)</div> },

  {
    path: "/admin",
    element: (
      <ProtectedRoute allow={["admin"]}>
        <div className="p-8">Admin Dashboard (DROP 6)</div>
      </ProtectedRoute>
    ),
  },

  {
    path: "/patient",
    element: (
      <ProtectedRoute allow={["user", "admin"]}>
        <div className="p-8">Patient Dashboard (DROP 6)</div>
      </ProtectedRoute>
    ),
  },
];
