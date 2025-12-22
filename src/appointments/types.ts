export type AppointmentStatus = "requested" | "approved" | "rejected";

export interface Appointment {
  id?: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  createdAt: number;
}
