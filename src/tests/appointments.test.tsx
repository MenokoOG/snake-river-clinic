import { describe, it, expect } from "vitest";
import { Appointment } from "../appointments/types";

describe("Appointment model", () => {
  it("creates a valid appointment object", () => {
    const appt: Appointment = {
      patientName: "Test",
      patientEmail: "test@test.com",
      date: "2025-01-01",
      time: "10:00",
      status: "requested",
      createdAt: Date.now(),
    };

    expect(appt.status).toBe("requested");
  });
});
