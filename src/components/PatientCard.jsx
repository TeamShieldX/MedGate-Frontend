import React from 'react';
import { Link } from 'react-router-dom';

export default function PatientCard({ patient }) {
  return (
    <div className="card">
      <h3>{patient.name}</h3>
      <p><strong>ID:</strong> {patient.id}</p>
      <p><strong>Appointment:</strong> {patient.appointmentTime}</p>
      <div style={{ marginTop: '0.75rem' }}>
        <Link to={`/patients/${patient.id}`} className="btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
          View Details
        </Link>
      </div>
    </div>
  );
}
