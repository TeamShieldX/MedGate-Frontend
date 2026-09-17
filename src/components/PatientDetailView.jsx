import React from 'react';
import AccessDeniedBanner from './AccessDeniedBanner';
import { canAccess } from '../config/permissions';

function Field({ role, field, label, value }) {
  const allowed = canAccess(role, 'patientDetail', field);

  if (!allowed) {
    return (
      <div className="detail-field denied-field">
        <div className="field-label">{label}</div>

        <AccessDeniedBanner
          reason={`Role '${role}' does not have permission to view ${label.toLowerCase()}.`}
        />
      </div>
    );
  }

  return (
    <div className="detail-field">
      <div className="field-label">{label}</div>
      <div className="field-value">{value || '—'}</div>
    </div>
  );
}

export default function PatientDetailView({ patient, role }) {
  if (!patient) {
    return (
      <div className="card loading-state">
        Loading patient details...
      </div>
    );
  }

  return (
    <div className="patient-detail-card">

      {/* Patient Header */}
      <div className="patient-detail-header">
        <div>
          <p className="detail-eyebrow">PATIENT RECORD</p>
          <h2>Patient Details</h2>
          <p className="detail-subtitle">
            Access-controlled medical record
          </p>
        </div>

        <div className="detail-role-badge">
          Viewing as <strong>{role}</strong>
        </div>
      </div>


      {/* Basic Information */}
      <section className="detail-section">
        <div className="section-heading">
          <div>
            <h3>Patient Information</h3>
            <p>Basic patient and appointment information</p>
          </div>
        </div>

        <div className="detail-grid">
          <Field
            role={role}
            field="name"
            label="Name"
            value={patient.name}
          />

          <Field
            role={role}
            field="id"
            label="Patient ID"
            value={patient.id}
          />

          <Field
            role={role}
            field="dob"
            label="Date of Birth"
            value={patient.dob}
          />

          <Field
            role={role}
            field="appointmentTime"
            label="Appointment"
            value={patient.appointmentTime}
          />
        </div>
      </section>


      {/* Clinical Information */}
      <section className="detail-section">
        <div className="section-heading">
          <div>
            <h3>Clinical Information</h3>
            <p>Medical information protected by role-based access</p>
          </div>

          <span className="section-security-badge">
            🔒 Protected
          </span>
        </div>

        <div className="detail-grid">
          <Field
            role={role}
            field="diagnosis"
            label="Diagnosis"
            value={patient.diagnosis}
          />

          <Field
            role={role}
            field="medications"
            label="Medications"
            value={patient.medications?.join(', ')}
          />

          <Field
            role={role}
            field="labResults"
            label="Lab Results"
            value={patient.labResults}
          />
        </div>
      </section>


      {/* Reception Information */}
      <section className="detail-section">
        <div className="section-heading">
          <div>
            <h3>Reception Information</h3>
            <p>Administrative and front-desk information</p>
          </div>
        </div>

        <div className="detail-grid">
          <Field
            role={role}
            field="receptionNote"
            label="Reception Note"
            value={patient.receptionNote}
          />
        </div>
      </section>

    </div>
  );
}