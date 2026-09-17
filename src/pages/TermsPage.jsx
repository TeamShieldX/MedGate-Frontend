import React from 'react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
          Back to Overview
        </Link>
      </div>

      <div className="tech-box">
        <div className="tech-box-header">
          <h1>Terms of Service</h1>
          <span className="status-badge neutral font-mono">v1.2.0 • Zero-Trust Policy</span>
        </div>

        <p style={{ marginBottom: '20px' }}>
          Effective Date: September 2026. These Terms of Service govern access and programmatic interactions
          with the MedGate Electronic Health Record (EHR) Zero-Trust Access Control Gateway.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div id="least-privilege">
            <h3>1. Zero-Trust Access Authorization</h3>
            <p>
              Access to electronic protected health information (ePHI) mediated by MedGate requires
              explicit cryptographic token validation. Sessions do not grant blanket authorization. Every API call
              is subject to least-privilege role evaluation, dynamic field redaction, and deterministic denial
              for unauthorized scopes.
            </p>
          </div>

          <div id="accountability">
            <h3>2. Role Accountability and Workforce Duties</h3>
            <p>
              Users must authenticate solely under their certified healthcare workforce role (Doctor, Nurse,
              Receptionist, Researcher, or Administrator). Misrepresenting credentialed role scopes or attempting
              to circumvent runtime redaction algorithms constitutes a breach of technical access agreements
              and triggers automated audit logging alerts.
            </p>
          </div>

          <div id="non-repudiation">
            <h3>3. Tamper-Evident Cryptographic Ledger</h3>
            <p>
              All interactions—both granted requests and access denials—are immutably committed to an append-only
              SHA-256 hash-chained audit trail. Users acknowledge that access logs cannot be expunged, altered,
              or retracted, providing mathematical non-repudiation in compliance with healthcare audit integrity regulations.
            </p>
          </div>

          <div id="synthetic-data">
            <h3>4. Synthetic and Clinical Data Gating</h3>
            <p>
              MedGate applies real-time transformation pipelines on relational datasets. Researchers and external
              analytics roles agree that de-identification algorithms (PII redaction, contact masking) must not
              be subjected to re-identification reverse engineering.
            </p>
          </div>

          <div id="benchmarks">
            <h3>5. System Availability and Benchmarks</h3>
            <p>
              MedGate is engineered for sub-millisecond access evaluation (0.0343ms average latency). Scheduled
              maintenance of cryptographic ledger verifiers or database migration pipelines will be broadcast
              to gateway administrator consoles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
