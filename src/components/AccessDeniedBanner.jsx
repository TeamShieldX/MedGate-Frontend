import React from 'react';

export default function AccessDeniedBanner({ reason, attemptedResource = 'audit-logs' }) {
  return (
    <div className="access-denied-panel" role="alert">
      <div className="access-denied-title">403 Access Denied</div>
      <div className="access-denied-body">
        The access decision engine evaluated your security token and denied authorization
        to resource <code className="font-mono">{attemptedResource}</code>.
      </div>
      <div className="access-denied-reason font-mono">
        Policy reason: {reason || 'Restricted to role Administrator by zero-trust gateway rules.'}
      </div>
    </div>
  );
}
