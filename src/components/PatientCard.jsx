import React from 'react';
import { Link } from 'react-router-dom';
import { canAccess } from '../config/permissions';

export default function PatientCard({ patient, role }) {
  return (
    <div className="card">

      {canAccess(role, 'patientList', 'name') && (
        <h3>{patient.name}</h3>
      )}

      {canAccess(role, 'patientList', 'id') && (
        <p>
          <strong>ID:</strong> {patient.id}
        </p>
      )}

      {canAccess(role, 'patientList', 'dob') && (
        <p>
          <strong>Date of Birth:</strong> {patient.dob}
        </p>
      )}

      {canAccess(role, 'patientList', 'appointmentTime') && (
        <p>
          <strong>Appointment:</strong>{' '}
          {patient.appointmentTime}
        </p>
      )}

      {canAccess(role, 'patientList', 'diagnosis') && (
        <p>
          <strong>Diagnosis:</strong>{' '}
          {patient.diagnosis}
        </p>
      )}

      {canAccess(role, 'patientList', 'medications') && (
        <p>
          <strong>Medications:</strong>{' '}
          {patient.medications?.join(', ')}
        </p>
      )}

      <div style={{ marginTop: '0.75rem' }}>
        <Link
          to={`/patients/${patient.id}`}
          className="btn"
          style={{
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          View Details
        </Link>
      </div>

    </div>
  );
}