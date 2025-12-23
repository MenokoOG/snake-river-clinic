import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import type { Appointment, AppointmentStatus } from "./types";
import { useAsync } from "../hooks";

function statusPriority(s: AppointmentStatus): number {
  // Higher number = more urgent / attention needed
  switch (s) {
    case "canceled":
      return 4;
    case "rejected":
      return 3;
    case "requested":
      return 2;
    case "approved":
      return 1;
    default:
      return 0;
  }
}

function safeCompare(a: string, b: string) {
  return a.localeCompare(b);
}

function sortAppointments(list: Appointment[]) {
  return list.slice().sort((a, b) => {
    // Primary: date ascending
    const d = safeCompare(a.date, b.date);
    if (d !== 0) return d;

    // Secondary: time ascending
    const t = safeCompare(a.time, b.time);
    if (t !== 0) return t;

    // Tertiary: status priority (urgent first)
    const sp = statusPriority(b.status) - statusPriority(a.status);
    if (sp !== 0) return sp;

    // Last: createdAt descending (most recent first)
    return (b.createdAt ?? 0) - (a.createdAt ?? 0);
  });
}

export function useAppointments() {
  const fetchAll = async () => {
    // If you later want server-side ordering, keep query + orderBy.
    // For now we still sort client-side to ensure stable ordering regardless of missing fields.
    const q = query(
      collection(db, "appointments"),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);

    const rows = snap.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<Appointment, "id">),
    })) as Appointment[];

    return sortAppointments(rows);
  };

  const { value, loading, execute, error } = useAsync(fetchAll, []);

  const request = async (
    data: Omit<Appointment, "status" | "createdAt" | "id">
  ) => {
    await addDoc(collection(db, "appointments"), {
      ...data,
      status: "requested" as AppointmentStatus,
      createdAt: Date.now(),
    });

    await execute();
  };

  const updateStatus = async (id: string, status: AppointmentStatus) => {
    await updateDoc(doc(db, "appointments", id), { status });
    await execute();
  };

  return {
    appointments: value ?? [],
    loading,
    error,
    request,
    updateStatus,
    refresh: execute,
  };
}
