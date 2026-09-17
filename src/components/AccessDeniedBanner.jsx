import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function AccessDeniedBanner({ reason, attemptedResource = 'audit-logs' }) {
  const { currentRole, setRole } = useAuth();

  return (
    <div className="access-denied-panel" role="alert">
      <div className="access-denied-title">403 Access Denied</div>
      <div className="access-denied-body">
        The access decision engine evaluated your security token (active role: <strong>{currentRole}</strong>)
        and denied authorization to resource <code className="font-mono">{attemptedResource}</code>.
      </div>
      <div className="access-denied-reason font-mono" style={{ marginBottom: '14px' }}>
        Policy reason: {reason || 'Restricted to role Administrator by zero-trust gateway rules.'}
      </div>

      <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(184, 76, 76, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <span style={{ fontSize: '0.84rem' }}>
          To inspect the SHA-256 cryptographic audit logs, switch to the <strong>Administrator</strong> role:
        </span>
        <button
          type="button"
          onClick={() => setRole('Administrator')}
          className="btn-primary"
          style={{ padding: '6px 14px', fontSize: '0.82rem' }}
        >
          Switch to Administrator
        </button>
      </div>
    </div>
  );
}
