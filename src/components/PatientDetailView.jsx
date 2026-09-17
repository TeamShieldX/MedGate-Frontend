import React from 'react';
import RedactedField from './RedactedField';

export default function PatientDetailView({ patient, role }) {
  if (!patient) {
    return (
      <div className="tech-box">
        <p className="font-mono">Loading patient detail record...</p>
      </div>
    );
  }

  const isResearcher = role === 'Researcher';
  const isReceptionist = role === 'Receptionist';
  const isNurse = role === 'Nurse';

  // Redaction checks matching the backend's FIELD_PERMISSIONS
  const canViewPII = !isResearcher && Boolean(patient.firstName || patient.lastName);
  const canViewContact = !isResearcher && Boolean(patient.phone || patient.address);
  const canViewClinicalNotes = (role === 'Doctor' || role === 'Administrator') && Boolean(patient.confidentialNotes);
  const canViewClinicalRecords = !isReceptionist;
  const canViewAppointments = !isResearcher;

  const displayName = canViewPII
    ? `${patient.firstName || ''} ${patient.lastName || ''}`.trim()
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Patient Header Summary */}
      <div className="tech-box">
        <div className="tech-box-header">
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Patient Record Identifier: <span className="font-mono">{patient.id}</span>
            </span>
            <h2 style={{ marginTop: '4px' }}>
              {canViewPII ? (
                displayName
              ) : (
                <RedactedField
                  fieldName="Patient Name"
                  reason={isResearcher ? "Redacted for Researcher" : `Hidden for ${role}`}
                />
              )}
            </h2>
          </div>
          <span className="status-badge neutral font-mono">
            Active view: {role}
          </span>
        </div>

        {/* Demographics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
          <div>
            <span className="form-label">Date of birth</span>
            <span className="font-mono">{patient.birthDate || '—'}</span>
          </div>

          <div>
            <span className="form-label">Gender</span>
            <span>{patient.gender || '—'}</span>
          </div>

          <div>
            <span className="form-label">Primary phone</span>
            {canViewContact ? (
              <span className="font-mono">{patient.phone || '—'}</span>
            ) : (
              <RedactedField
                fieldName="Phone"
                reason={isResearcher ? "Redacted for Researcher" : `Hidden for ${role}`}
              />
            )}
          </div>

          <div>
            <span className="form-label">Physical address</span>
            {canViewContact ? (
              <span>{patient.address || '—'}</span>
            ) : (
              <RedactedField
                fieldName="Address"
                reason={isResearcher ? "Redacted for Researcher" : `Hidden for ${role}`}
              />
            )}
          </div>

          <div>
            <span className="form-label">Assigned physician</span>
            <span>{patient.assignedDoctor || '—'}</span>
          </div>

          <div>
            <span className="form-label">Department</span>
            <span>{patient.department || 'Internal Medicine'}</span>
          </div>
        </div>
      </div>

      {/* Confidential Notes Section */}
      <div className="tech-box">
        <div className="tech-box-header">
          <h3>Confidential Clinical Notes</h3>
          <span className="status-badge neutral">Special Category</span>
        </div>
        {canViewClinicalNotes ? (
          <p style={{ color: 'var(--text-primary)', fontStyle: 'normal' }}>
            {patient.confidentialNotes}
          </p>
        ) : (
          <div>
            <RedactedField
              fieldName="Confidential Notes"
              reason={
                isNurse
                  ? "Redacted for Nurse role"
                  : isReceptionist
                  ? "Hidden — Receptionist role"
                  : isResearcher
                  ? "Redacted for Researcher"
                  : `Redacted for ${role}`
              }
            />
            <p style={{ marginTop: '8px', fontSize: '0.8rem' }}>
              Psychiatric evaluations and protected clinician notes are restricted to Doctor and Administrator roles.
            </p>
          </div>
        )}
      </div>

      {/* Diagnoses & Primary Condition */}
      <div className="tech-box">
        <div className="tech-box-header">
          <h3>Clinical Diagnoses & Condition</h3>
          <span className="status-badge neutral">ICD-10 Graph</span>
        </div>

        {canViewClinicalRecords ? (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span className="form-label">Primary Condition</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                {patient.primaryCondition || 'None recorded'}
              </span>
            </div>

            {patient.diagnoses && patient.diagnoses.length > 0 ? (
              <div className="table-wrapper">
                <table className="tech-table">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Description</th>
                      <th>Onset Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.diagnoses.map((d, i) => (
                      <tr key={d.id || i}>
                        <td className="font-mono">{d.code}</td>
                        <td>{d.description}</td>
                        <td className="font-mono">{d.onsetDate || '—'}</td>
                        <td>
                          <span className="status-badge granted">{d.status || 'active'}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No secondary diagnoses recorded.</p>
            )}
          </div>
        ) : (
          <RedactedField
            fieldName="Diagnosis History"
            reason="Hidden — Receptionist role"
          />
        )}
      </div>

      {/* Prescribed Medications */}
      <div className="tech-box">
        <div className="tech-box-header">
          <h3>Active Medications</h3>
          <span className="status-badge neutral">RxNorm</span>
        </div>

        {canViewClinicalRecords ? (
          patient.medications && patient.medications.length > 0 ? (
            <div className="table-wrapper">
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>Rx Code</th>
                    <th>Description</th>
                    <th>Dosage & Frequency</th>
                    <th>Start Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.medications.map((m, i) => (
                    <tr key={m.id || i}>
                      <td className="font-mono">{m.code}</td>
                      <td>{m.description}</td>
                      <td>{m.dosage}</td>
                      <td className="font-mono">{m.startDate ? m.startDate.split('T')[0] : '—'}</td>
                      <td>
                        <span className="status-badge granted">{m.status || 'active'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No active medications prescribed.</p>
          )
        ) : (
          <RedactedField
            fieldName="Prescription Details"
            reason="Hidden — Receptionist role"
          />
        )}
      </div>

      {/* Observations & Vitals */}
      <div className="tech-box">
        <div className="tech-box-header">
          <h3>Observations & Vitals</h3>
          <span className="status-badge neutral">LOINC</span>
        </div>

        {canViewClinicalRecords ? (
          patient.observations && patient.observations.length > 0 ? (
            <div className="table-wrapper">
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>LOINC Code</th>
                    <th>Metric Description</th>
                    <th>Value</th>
                    <th>Unit</th>
                    <th>Recorded Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.observations.map((o, i) => (
                    <tr key={o.id || i}>
                      <td className="font-mono">{o.code}</td>
                      <td>{o.description}</td>
                      <td className="font-mono" style={{ fontWeight: 600 }}>{o.value}</td>
                      <td>{o.unit}</td>
                      <td className="font-mono">{o.recordedDate ? o.recordedDate.replace('T', ' ').substring(0, 19) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No vitals or lab observations recorded.</p>
          )
        ) : (
          <RedactedField
            fieldName="Vitals & Lab Values"
            reason="Hidden — Receptionist role"
          />
        )}
      </div>

      {/* Allergies */}
      <div className="tech-box">
        <div className="tech-box-header">
          <h3>Allergies & Sensitivities</h3>
          <span className="status-badge neutral">Clinical Criticality</span>
        </div>

        {canViewClinicalRecords ? (
          patient.allergies && patient.allergies.length > 0 ? (
            <div className="table-wrapper">
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>Allergen</th>
                    <th>Clinical Reaction</th>
                    <th>Severity</th>
                    <th>Recorded Date</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.allergies.map((a, i) => (
                    <tr key={a.id || i}>
                      <td style={{ fontWeight: 600 }}>{a.allergen}</td>
                      <td>{a.reaction}</td>
                      <td>
                        <span className={`status-badge ${a.severity === 'severe' ? 'denied' : 'neutral'}`}>
                          {a.severity}
                        </span>
                      </td>
                      <td className="font-mono">{a.recordedDate || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No known drug or environmental allergies recorded.</p>
          )
        ) : (
          <RedactedField
            fieldName="Allergies"
            reason="Hidden — Receptionist role"
          />
        )}
      </div>

      {/* Appointments Scheduling */}
      <div className="tech-box">
        <div className="tech-box-header">
          <h3>Scheduled Appointments</h3>
          <span className="status-badge neutral">Operational</span>
        </div>

        {canViewAppointments ? (
          patient.appointments && patient.appointments.length > 0 ? (
            <div className="table-wrapper">
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Scheduled Date</th>
                    <th>Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.appointments.map((apt, i) => (
                    <tr key={apt.id || i}>
                      <td>{apt.doctorName}</td>
                      <td>{apt.department}</td>
                      <td className="font-mono">{apt.appointmentDate ? apt.appointmentDate.replace('T', ' ').substring(0, 16) : '—'}</td>
                      <td>
                        <span className="status-badge granted">{apt.status}</span>
                      </td>
                      <td>{apt.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No upcoming appointments scheduled.</p>
          )
        ) : (
          <RedactedField
            fieldName="Appointments"
            reason="Redacted for Researcher"
          />
        )}
      </div>
    </div>
  );
}