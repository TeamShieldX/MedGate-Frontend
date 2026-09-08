import React from 'react';

export default function AuditLogTable({ logs = [] }) {
  return (
    <div className="card">
      <h3>Access History & Audit Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Role</th>
            <th>Resource</th>
            <th>Action</th>
            <th>Result</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.actorRole}</td>
              <td><code>{log.resource}</code></td>
              <td>{log.action}</td>
              <td style={{ color: log.result === 'GRANTED' ? 'green' : 'red', fontWeight: 'bold' }}>
                {log.result}
              </td>
              <td>{log.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
