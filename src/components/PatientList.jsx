import React from 'react';
import PatientCard from './PatientCard';

export default function PatientList({ patients = [] }) {
  return (
    <div className="patient-list">
      {patients.length === 0 ? (
        <p>No patients available for your role.</p>
      ) : (
        patients.map((patient) => <PatientCard key={patient.id} patient={patient} />)
      )}
    </div>
  );
}
