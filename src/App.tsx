import { Routes, Route, Navigate } from "react-router-dom";

import SiteLayout from "./layout/SiteLayout";

// Public pages
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import Testimonials from "./pages/public/Testimonials";
import Contact from "./pages/public/Contact";
import RequestAppointment from "./pages/public/RequestAppointment";
import Unauthorized from "./pages/public/Unauthorized";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContentEditor from "./pages/admin/AdminContentEditor";
import AdminAppointments from "./pages/admin/AdminAppointments";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientCalendar from "./pages/patient/PatientCalendar";
import PatientAccount from "./pages/patient/PatientAccount";

// Guards
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        {/* Public */}
        <Route index element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<RequestAppointment />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Patient */}
        <Route
          path="/patient"
          element={
            <RequireAuth>
              <PatientDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/patient/calendar"
          element={
            <RequireAuth>
              <PatientCalendar />
            </RequireAuth>
          }
        />
        <Route
          path="/patient/account"
          element={
            <RequireAuth>
              <PatientAccount />
            </RequireAuth>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RequireRole role="admin">
                <AdminDashboard />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/content"
          element={
            <RequireAuth>
              <RequireRole role="admin">
                <AdminContentEditor />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <RequireAuth>
              <RequireRole role="admin">
                <AdminAppointments />
              </RequireRole>
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
