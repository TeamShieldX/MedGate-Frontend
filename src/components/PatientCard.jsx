import React from 'react';
import { Link } from 'react-router-dom';
import RedactedField from './RedactedField';

export default function PatientCard({ patient, role }) {
  const isResearcher = role === 'Researcher';
  const isReceptionist = role === 'Receptionist';

  const hasName = Boolean(patient.firstName || patient.lastName);
  const displayName = hasName
    ? `${patient.firstName || ''} ${patient.lastName || ''}`.trim()
    : null;

  return (
    <div className="tech-box" style={{ margin: 0 }}>
      <div className="tech-box-header">
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
            Patient ID: {patient.id}
          </span>
          <h3 style={{ marginTop: '4px', fontSize: '1.15rem' }}>
            {hasName ? (
              displayName
            ) : (
              <RedactedField
                fieldName="Patient Identity"
                reason={isResearcher ? "Hidden — Researcher role" : `Hidden — ${role} role`}
              />
            )}
          </h3>
        </div>
        <span className="status-badge neutral">{patient.gender || '—'}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Birth Date: </span>
          <span className="font-mono">{patient.birthDate || '—'}</span>
        </div>

        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Contact / Phone: </span>
          {patient.phone ? (
            <span className="font-mono">{patient.phone}</span>
          ) : (
            <RedactedField
              fieldName="Contact PII"
              reason={isResearcher ? "Hidden — Researcher role" : `Hidden — ${role} role`}
            />
          )}
        </div>

        <div>
          <span style={{ color: 'var(--text-secondary)' }}>Primary Condition: </span>
          {patient.primaryCondition ? (
            <span>{patient.primaryCondition}</span>
          ) : (
            <RedactedField
              fieldName="Clinical Diagnosis"
              reason={isReceptionist ? "Hidden — Receptionist role" : `Hidden — ${role} role`}
            />
          )}
        </div>

        {patient.assignedDoctor && (
          <div>
            <span style={{ color: 'var(--text-secondary)' }}>Assigned Clinician: </span>
            <span>{patient.assignedDoctor}</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
        <Link
          to={`/patients/${patient.id}`}
          className="btn-secondary"
          style={{ width: '100%', fontSize: '0.84rem', padding: '8px 12px' }}
        >
          View patient record
        </Link>
      </div>
    </div>
  );
}