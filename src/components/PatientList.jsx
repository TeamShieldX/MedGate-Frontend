import React from 'react';
import PatientCard from './PatientCard';

export default function PatientList({ patients = [], role }) {
  if (patients.length === 0) {
    return (
      <div className="tech-box">
        <p>No patient records returned for the requested parameters.</p>
      </div>
    );
  }

  return (
    <div className="patient-grid">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          role={role}
        />
      ))}
    </div>
  );
}
