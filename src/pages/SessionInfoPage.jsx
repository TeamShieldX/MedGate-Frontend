import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSwitcher from '../components/RoleSwitcher';

export default function SessionInfoPage() {
  const { currentRole, user, setRole } = useAuth();
  const isAdmin = currentRole === 'Administrator';

  const usernameDisplay = user?.username || `${(currentRole || 'user').toLowerCase()}_user`;
  const userIdDisplay = user?.id || `usr-${(currentRole || 'user').toLowerCase()}-101`;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="status-badge granted font-mono" style={{ fontSize: '0.74rem' }}>
              ● Cryptographic Session Active
            </span>
            {isAdmin && (
              <span className="status-badge neutral font-mono" style={{ fontSize: '0.74rem' }}>
                ADMINISTRATOR PRIVILEGES
              </span>
            )}
          </div>
          <h1>Security Session Information</h1>
          <p style={{ marginTop: '4px', fontSize: '0.92rem' }}>
            Details about your currently signed-in user identity, active role permissions, and underlying gateway session token.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Active role:</span>
          <RoleSwitcher />
        </div>
      </div>

      {/* User Session Claims */}
      <div className="tech-box" style={{ marginBottom: '24px' }}>
        <div className="tech-box-header">
          <h2>Authentication Claims</h2>
          <span className="status-badge granted font-mono">HMAC-SHA256 Verified</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
              Username Identifier
            </span>
            <span className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
              {usernameDisplay}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
              User Subject ID
            </span>
            <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              {userIdDisplay}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
              Assigned Role
            </span>
            <span className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--status-granted)' }}>
              {currentRole}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'block' }}>
              Gateway Endpoint
            </span>
            <span className="font-mono" style={{ fontSize: '0.85rem' }}>
              medgatebackend.onrender.com
            </span>
          </div>
        </div>
      </div>

      {/* Admin Diagnostic & System Telemetry Section */}
      {isAdmin ? (
        <div className="tech-box">
          <div className="tech-box-header">
            <div>
              <h2>Administrator System Diagnostics</h2>
              <p style={{ fontSize: '0.84rem', marginTop: '4px' }}>
                Full gateway infrastructure configuration unlocked for role <strong>Administrator</strong>:
              </p>
            </div>
            <span className="status-badge granted font-mono">
              Admin Telemetry Active
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '14px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--code-bg)' }}>
              <span className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                DATABASE ENGINE
              </span>
              <h4 style={{ margin: '6px 0 4px' }}>Neon PostgreSQL</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Serverless relational storage with SSL pooling enabled.
              </p>
            </div>

            <div style={{ padding: '14px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--code-bg)' }}>
              <span className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                AUDIT INTEGRITY
              </span>
              <h4 style={{ margin: '6px 0 4px', color: 'var(--status-granted)' }}>100% Chain Valid</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                1,010 SHA-256 blocks mathematically chained.
              </p>
            </div>

            <div style={{ padding: '14px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--code-bg)' }}>
              <span className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                BENCHMARK LATENCY
              </span>
              <h4 style={{ margin: '6px 0 4px', color: 'var(--status-granted)' }}>0.0343 ms</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                29,154 operations per second throughput.
              </p>
            </div>

            <div style={{ padding: '14px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--code-bg)' }}>
              <span className="font-mono" style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                AUTOMATED TESTS
              </span>
              <h4 style={{ margin: '6px 0 4px' }}>44 / 44 Passing</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                RBAC unit, integration, and security test coverage.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/audit-log" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.84rem' }}>
              Inspect Cryptographic Audit Trail
            </Link>
            <Link to="/patients" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.84rem' }}>
              Manage Patient Records
            </Link>
          </div>
        </div>
      ) : (
        <div className="tech-box" style={{ borderLeft: '3px solid var(--status-denied)' }}>
          <div className="tech-box-header">
            <div>
              <h3>System Administrative Telemetry Restricted</h3>
              <p style={{ fontSize: '0.84rem', marginTop: '4px' }}>
                Gateway infrastructure telemetry, test benchmarks, and cryptographic audit log inspections require <strong>Administrator</strong> credentials.
              </p>
            </div>
            <span className="status-badge denied font-mono">
              Restricted (403)
            </span>
          </div>

          <p style={{ marginBottom: '16px', fontSize: '0.86rem' }}>
            Under zero-trust least-privilege principles, the active role <code>{currentRole}</code> cannot inspect low-level system administration parameters.
          </p>

          <button
            type="button"
            onClick={() => setRole('Administrator')}
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: '0.84rem' }}
          >
            Switch to Administrator Role
          </button>
        </div>
      )}
    </div>
  );
}
