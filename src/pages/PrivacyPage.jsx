import React from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
          Back to Overview
        </Link>
      </div>

      <div className="tech-box">
        <div className="tech-box-header">
          <h1>Privacy Policy & ePHI Protection</h1>
          <span className="status-badge granted font-mono">HIPAA § 164.312 Compliant</span>
        </div>

        <p style={{ marginBottom: '20px' }}>
          Effective Date: September 2026. This Privacy Policy details how MedGate protects electronic Protected
          Health Information (ePHI) through deterministic field-level redaction, role gating, and cryptographic non-repudiation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3>1. Principle of Least Privilege</h3>
            <p>
              MedGate minimizes ePHI exposure by implementing data-driven role-based access rules. Rather than
              releasing entire patient objects, our engine strips unneeded attributes in memory before responses
              leave the gateway layer.
            </p>
          </div>

          <div>
            <h3>2. Dynamic Field Redaction Matrix</h3>
            <p>
              Data redaction occurs server-side at runtime:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '8px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Researcher:</strong> Direct identifiers (Name, Address, Phone) and appointments are strictly redacted.</li>
              <li><strong>Receptionist:</strong> Diagnostic codes, prescriptions, confidential notes, and lab vitals are redacted.</li>
              <li><strong>Nurse:</strong> Confidential clinician notes are restricted to primary care physicians.</li>
              <li><strong>Administrator:</strong> Medical diagnostic notes are masked; system audit controls are unlocked.</li>
            </ul>
          </div>

          <div>
            <h3>3. Cryptographic Audit Trail and Privacy Logging</h3>
            <p>
              Every access attempt records the caller's role, requested endpoint, outcome (granted or denied),
              timestamp, and previous SHA-256 hash. These logs prove compliance with regulatory privacy frameworks
              and detect unauthorized attempts to inspect protected records.
            </p>
          </div>

          <div>
            <h3>4. Client-Side Data Transparency</h3>
            <p>
              Redacted fields are never silently withheld. MedGate provides on-screen cryptographic placeholders
              explaining the exact policy reason for restriction, guaranteeing patient privacy without sacrificing
              operational visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
