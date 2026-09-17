export const ROLE_PERMISSIONS = {
  Doctor: {
    patientList: [
      'name',
      'id',
      'appointmentTime',
      'diagnosis',
      'medications',
    ],
    patientDetail: [
      'name',
      'id',
      'dob',
      'appointmentTime',
      'diagnosis',
      'medications',
      'labResults',
      'receptionNote',
    ],
  },

  Nurse: {
    patientList: [
      'name',
      'id',
      'appointmentTime',
      'diagnosis',
    ],
    patientDetail: [
      'name',
      'id',
      'dob',
      'appointmentTime',
      'diagnosis',
      'medications',
      'labResults',
    ],
  },

  Researcher: {
    patientList: [
      'id',
      'dob',
      'diagnosis',
    ],
    patientDetail: [
      'id',
      'dob',
      'diagnosis',
      'labResults',
    ],
  },

  Receptionist: {
    patientList: [
      'name',
      'id',
      'appointmentTime',
    ],
    patientDetail: [
      'name',
      'id',
      'appointmentTime',
      'receptionNote',
    ],
  },

  Administrator: {
    patientList: [
      'name',
      'id',
      'appointmentTime',
      'diagnosis',
    ],
    patientDetail: [
      'name',
      'id',
      'dob',
      'appointmentTime',
      'diagnosis',
      'medications',
      'labResults',
      'receptionNote',
    ],
  },
};

export function canAccess(role, section, field) {
  return ROLE_PERMISSIONS[role]?.[section]?.includes(field) ?? false;
}