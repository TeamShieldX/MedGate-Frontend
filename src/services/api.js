// Placeholder API client for MedGate Frontend
// Real backend endpoint integration will replace these stubs once backend (SHI-9) is connected.

const MOCK_PATIENTS = [
  {
    id: "pat-101",
    name: "Jane Doe",
    dob: "1985-04-12",
    appointmentTime: "2026-09-10 10:30 AM",
    diagnosis: "Hypertension - Stage 1",
    medications: ["Lisinopril 10mg"],
    labResults: "Normal CBC, Elevated BP",
    receptionNote: "Check-in complete, copay paid."
  },
  {
    id: "pat-102",
    name: "John Smith",
    dob: "1972-11-23",
    appointmentTime: "2026-09-10 11:15 AM",
    diagnosis: "Type 2 Diabetes Mellitus",
    medications: ["Metformin 500mg"],
    labResults: "HbA1c: 7.2%",
    receptionNote: "Insurance verified."
  }
];

const MOCK_AUDIT_LOGS = [
  {
    id: "log-1",
    timestamp: "2026-09-07T04:00:00Z",
    actorRole: "Doctor",
    resource: "/patients/pat-101",
    action: "READ_PATIENT_RECORD",
    result: "GRANTED",
    reason: "Role 'Doctor' authorized for full medical summary"
  },
  {
    id: "log-2",
    timestamp: "2026-09-07T04:05:00Z",
    actorRole: "Receptionist",
    resource: "/patients/pat-101/diagnosis",
    action: "READ_DIAGNOSIS",
    result: "DENIED",
    reason: "Role 'Receptionist' is restricted from clinical diagnosis fields"
  }
];

export async function login(role) {
  // Stub for POST /auth/login
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: { username: `${role.toLowerCase()}_user`, role }
      });
    }, 200);
  });
}

export async function getPatients() {
  // Stub for GET /patients
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: MOCK_PATIENTS });
    }, 200);
  });
}

export async function getPatientById(id) {
  // Stub for GET /patients/:id
  return new Promise((resolve) => {
    setTimeout(() => {
      const patient = MOCK_PATIENTS.find((p) => p.id === id) || MOCK_PATIENTS[0];
      resolve({ success: true, data: patient });
    }, 200);
  });
}

export async function getAuditLog() {
  // Stub for GET /audit-log
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data: MOCK_AUDIT_LOGS });
    }, 200);
  });
}
