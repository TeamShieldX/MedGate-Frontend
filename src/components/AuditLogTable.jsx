import React from 'react';

function formatRelativeTime(timestamp) {
  if (!timestamp) return '—';
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp;

  const now = new Date();
  const elapsedSecs = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000));

  if (elapsedSecs < 5) {
    return '2 secs ago';
  }
  if (elapsedSecs < 60) {
    return `${elapsedSecs} secs ago`;
  }
  const minutes = Math.floor(elapsedSecs / 60);
  if (minutes < 60) {
    return minutes === 1 ? '1 min ago' : `${minutes} mins ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  }
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  const years = Math.floor(days / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

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
                <td
                  className="font-mono"
                  style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}
                  title={log.timestamp ? log.timestamp.replace('T', ' ').substring(0, 19) : ''}
                >
                  {formatRelativeTime(log.timestamp)}
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
