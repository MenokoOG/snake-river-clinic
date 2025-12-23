export type AppointmentStatus =
  | "requested"
  | "approved"
  | "rejected"
  | "canceled";

export interface Appointment {
  id?: string;
  patientName: string;
  patientEmail: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  createdAt: number;
}
