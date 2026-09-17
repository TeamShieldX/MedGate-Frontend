import React from 'react';

export default function AuditLogTable({ logs = [] }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="tech-box">
        <p>No audit events recorded.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="tech-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Role</th>
            <th>Action</th>
            <th>Resource</th>
            <th>Outcome</th>
            <th>Reason</th>
            <th>SHA-256 Hash</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            const isGranted = (log.result || '').toUpperCase() === 'GRANTED';
            const shortHash = log.hash
              ? `${log.hash.substring(0, 8)}...${log.hash.substring(log.hash.length - 6)}`
              : 'verified';

            return (
              <tr key={log.id || log.hash || Math.random()}>
                <td className="font-mono" style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                  {log.timestamp ? log.timestamp.replace('T', ' ').substring(0, 19) : '—'}
                </td>
                <td className="font-mono">
                  {log.role || log.actorRole || 'System'}
                </td>
                <td className="font-mono">
                  {log.action}
                </td>
                <td className="font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {log.resource}
                </td>
                <td>
                  <span className={`status-badge ${isGranted ? 'granted' : 'denied'}`}>
                    {log.result}
                  </span>
                </td>
                <td style={{ maxWidth: '280px', fontSize: '0.82rem' }}>
                  {log.reason}
                </td>
                <td className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }} title={log.hash}>
                  {shortHash}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
