import React from 'react';
import AccessDeniedBanner from './AccessDeniedBanner';

export default function PatientDetailView({ patient, role }) {
  if (!patient) return <div className="card">Loading patient details...</div>;

  // Placeholder role check simulation
  const isReceptionist = role === 'Receptionist';

  return (
    <div className="card">
      <h2>Patient Record: {patient.name}</h2>
      <p><strong>ID:</strong> {patient.id}</p>
      <p><strong>DOB:</strong> {patient.dob}</p>
      <p><strong>Appointment:</strong> {patient.appointmentTime}</p>
      <hr style={{ margin: '1rem 0', borderColor: 'var(--border-color)' }} />

      <h3>Clinical Information</h3>
      {isReceptionist ? (
        <AccessDeniedBanner reason="Role 'Receptionist' does not have authorization to view clinical diagnosis or lab results." />
      ) : (
        <>
          <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
          <p><strong>Medications:</strong> {patient.medications?.join(', ')}</p>
          <p><strong>Lab Results:</strong> {patient.labResults}</p>
        </>
      )}
    </div>
  );
}
