import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import { Appointment } from "./types";
import { useAsync } from "../hooks";

export function useAppointments() {
  const fetchAll = async () => {
    const snap = await getDocs(collection(db, "appointments"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Appointment[];
  };

  const { value, loading, execute } = useAsync(fetchAll, []);

  const request = async (data: Omit<Appointment, "status" | "createdAt">) => {
    await addDoc(collection(db, "appointments"), {
      ...data,
      status: "requested",
      createdAt: Date.now(),
    });
    await execute();
  };

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    await updateDoc(doc(db, "appointments", id), { status });
    await execute();
  };

  return {
    appointments: value ?? [],
    loading,
    request,
    updateStatus,
    refresh: execute,
  };
}
