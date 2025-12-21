import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <div className="p-8">Home (DROP 4)</div>,
  },
  {
    path: "/contact",
    element: <div className="p-8">Contact (DROP 4)</div>,
  },
  {
    path: "/login",
    element: <div className="p-8">Login (DROP 3)</div>,
  },
  {
    path: "/admin",
    element: <div className="p-8">Admin Dashboard (DROP 6)</div>,
  },
  {
    path: "/patient",
    element: <div className="p-8">Patient Dashboard (DROP 6)</div>,
  },
];
