import { Appointment } from "../appointments/types";

interface Props {
  appointments: Appointment[];
  onSelect?: (date: string) => void;
}

export default function Calendar({ appointments, onSelect }: Props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const days = new Date(year, month + 1, 0).getDate();

  return (
    <div className="grid grid-cols-7 gap-2">
      {Array.from({ length: days }).map((_, i) => {
        const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          i + 1
        ).padStart(2, "0")}`;

        const hasAppt = appointments.some((a) => a.date === date);

        return (
          <div
            key={date}
            onClick={() => onSelect?.(date)}
            className={`p-3 rounded cursor-pointer border ${
              hasAppt ? "border-emerald-400" : "border-white/20"
            }`}
          >
            <div className="text-sm">{i + 1}</div>
          </div>
        );
      })}
    </div>
  );
}
