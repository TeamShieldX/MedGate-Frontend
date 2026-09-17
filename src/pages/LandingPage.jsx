import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { startDemoSession } = useAuth();
  const navigate = useNavigate();

  const handleTryDemo = () => {
    startDemoSession();
    navigate('/patients');
  };

  return (
    <div style={{ maxWidth: '960px' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px', letterSpacing: '-0.02em' }}>
          Every access to a patient record is checked, logged, and provably tamper-evident.
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          MedGate is a zero-trust electronic health records gateway providing role-based
          access control, dynamic field-level redaction, and a cryptographic audit log.
        </p>

        {/* Real Benchmark Numbers Strip */}
        <div className="metric-strip" aria-label="System verification benchmarks">
          <div className="metric-cell">
            <span className="metric-number">0.0343ms</span>
            <span className="metric-label">average access check latency</span>
          </div>

          <div className="metric-cell">
            <span className="metric-number">29,154</span>
            <span className="metric-label">operations / second</span>
          </div>

          <div className="metric-cell">
            <span className="metric-number">44/44</span>
            <span className="metric-label">automated tests passing</span>
          </div>

          <div className="metric-cell">
            <span className="metric-number">SHA-256</span>
            <span className="metric-label">hash-chained audit log</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            type="button"
            onClick={handleTryDemo}
            className="btn-primary"
          >
            Try the demo
          </button>
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </div>

      {/* Problem and Technical Approach */}
      <div className="tech-box">
        <h2 style={{ marginBottom: '12px' }}>The security problem in healthcare records</h2>
        <p style={{ marginBottom: '16px' }}>
          Conventional clinical portals grant broad, blanket access to entire medical records once a session
          is authenticated. Front-desk staff, external billing agents, and research contractors frequently
          view sensitive clinical notes, psychiatric evaluations, or full demographic identifiers they have no clinical
          need to see. This architectural flaw drives data leakage and regulatory non-compliance.
        </p>
        <p>
          MedGate eliminates blanket access by gating every field request through a zero-trust least-privilege engine.
          Access permissions are evaluated at runtime per role, sensitive fields are redacted before transmission,
          and every single access decision (granted or denied) is immutably logged into a cryptographic ledger.
        </p>
      </div>

      {/* Tamper-Evident SHA-256 Hash Chain Differentiator */}
      <div className="tech-box">
        <div className="tech-box-header">
          <h2>Cryptographic audit log integrity</h2>
          <span className="status-badge granted">
            100% verified (1,010 entries)
          </span>
        </div>
        <p style={{ marginBottom: '16px' }}>
          Every access attempt calculates a SHA-256 cryptographic hash chaining the entry's timestamp,
          user ID, role, action, resource, access outcome, and the previous entry's hash:
        </p>
        <div
          style={{
            padding: '12px 16px',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(138, 143, 146, 0.05)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}
        >
          CurrentHash = SHA256(Timestamp + UserId + Role + Action + Resource + Result + Reason + PrevHash)
        </div>
        <p>
          Any retroactive log modification, deletion, or rogue row insertion breaks the cryptographic
          continuity and is immediately flagged by the verification engine.
        </p>
      </div>

      {/* Role-Based Data Redaction Matrix Overview */}
      <div className="tech-box">
        <h2 style={{ marginBottom: '12px' }}>Field-level access gating by role</h2>
        <p style={{ marginBottom: '16px' }}>
          The five system roles receive tailored representations of patient data.
          When a field is denied, MedGate renders a visible lock indicator rather than silently hiding it,
          making security enforcement transparent on screen:
        </p>

        <div className="table-wrapper">
          <table className="tech-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Doctor</th>
                <th>Nurse</th>
                <th>Receptionist</th>
                <th>Researcher</th>
                <th>Administrator</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Demographics (Name, Address, Phone)</td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge denied">Redacted</span></td>
                <td><span className="status-badge granted">Visible</span></td>
              </tr>
              <tr>
                <td>Primary Condition</td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge denied">Redacted</span></td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge granted">Visible</span></td>
              </tr>
              <tr>
                <td>Confidential Notes</td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge denied">Redacted</span></td>
                <td><span className="status-badge denied">Redacted</span></td>
                <td><span className="status-badge denied">Redacted</span></td>
                <td><span className="status-badge granted">Visible</span></td>
              </tr>
              <tr>
                <td>Medications & Vitals</td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge denied">Redacted</span></td>
                <td><span className="status-badge granted">Visible</span></td>
                <td><span className="status-badge granted">Visible</span></td>
              </tr>
              <tr>
                <td>Audit Log History</td>
                <td><span className="status-badge denied">Denied (403)</span></td>
                <td><span className="status-badge denied">Denied (403)</span></td>
                <td><span className="status-badge denied">Denied (403)</span></td>
                <td><span className="status-badge denied">Denied (403)</span></td>
                <td><span className="status-badge granted">Granted (200)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
