import React, { useState, useMemo } from 'react';

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

function getDynamicReason(log) {
  const role = (log.role || log.actorRole || '').trim();
  const resource = (log.resource || '').trim();
  const result = (log.result || '').toUpperCase();
  const action = (log.action || 'read').toLowerCase();
  const isGranted = result === 'GRANTED';

  let policyCode = 'PDP-01';
  let primaryReason = '';
  let policyDetail = '';

  if (resource === 'audit-logs') {
    if (isGranted) {
      policyCode = 'PDP-ADM';
      primaryReason = 'Cryptographic ledger audit verified';
      policyDetail = 'Root administrative clearance to inspect SHA-256 immutable block chain.';
    } else {
      policyCode = 'PDP-DENY';
      primaryReason = `Unauthorized audit inspection by '${role}'`;
      policyDetail = 'Policy violation: tamper-evident ledger access strictly requires Administrator role.';
    }
  } else if (resource === 'patients') {
    if (role === 'Doctor') {
      policyCode = 'PDP-DOC';
      primaryReason = 'Full clinical EHR access cleared';
      policyDetail = 'Physician authorization: unmasked diagnoses, LOINC vitals, RxNorm medications & protected notes.';
    } else if (role === 'Nurse') {
      policyCode = 'PDP-NUR';
      primaryReason = 'Care-delivery patient review';
      policyDetail = 'Encounters, vitals, and active prescriptions visible. Confidential clinician notes masked.';
    } else if (role === 'Receptionist') {
      policyCode = 'PDP-REC';
      primaryReason = 'Front-desk demographic clearance';
      policyDetail = 'Scheduling view granted. Clinical diagnoses, lab values, and medications dynamically redacted.';
    } else if (role === 'Researcher') {
      policyCode = 'PDP-RES';
      primaryReason = 'Epidemiological cohort evaluation';
      policyDetail = 'HIPAA Safe Harbor redaction active: patient name, address, and phone numbers de-identified.';
    } else if (role === 'Administrator') {
      policyCode = 'PDP-ADM';
      primaryReason = 'System administrative record review';
      policyDetail = 'Full administrative clearance for EHR system integrity and metadata verification.';
    } else {
      policyCode = isGranted ? 'PDP-RBAC' : 'PDP-DENY';
      primaryReason = isGranted ? `Role '${role}' authorized on ${resource}` : `Access denied for '${role}'`;
      policyDetail = log.reason || '';
    }
  } else if (resource === 'medications') {
    if (role === 'Receptionist') {
      policyCode = 'PDP-DENY';
      primaryReason = 'Clinical prescription access blocked';
      policyDetail = 'Front-desk role restricted from medication details under least-privilege policy.';
    } else {
      policyCode = isGranted ? 'PDP-MED' : 'PDP-DENY';
      primaryReason = isGranted ? `Medication review cleared for '${role}'` : `Medication access denied for '${role}'`;
      policyDetail = log.reason || '';
    }
  } else {
    policyCode = isGranted ? 'PDP-RBAC' : 'PDP-DENY';
    primaryReason = log.reason || `${action} on ${resource}`;
    policyDetail = `Policy evaluation outcome: ${result}`;
  }

  return { policyCode, primaryReason, policyDetail };
}

export default function AuditLogTable({ logs = [] }) {
  const [sortOrder, setSortOrder] = useState('desc'); // default: latest first
  const [filterOutcome, setFilterOutcome] = useState('ALL'); // ALL, GRANTED, DENIED
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (filterOutcome !== 'ALL' && (log.result || '').toUpperCase() !== filterOutcome) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const role = (log.role || log.actorRole || '').toLowerCase();
      const resource = (log.resource || '').toLowerCase();
      const reason = (log.reason || '').toLowerCase();
      const hash = (log.hash || '').toLowerCase();
      return role.includes(q) || resource.includes(q) || reason.includes(q) || hash.includes(q);
    });
  }, [logs, filterOutcome, searchQuery]);

  const sortedLogs = useMemo(() => {
    return [...filteredLogs].sort((a, b) => {
      const timeA = new Date(a.timestamp || 0).getTime();
      const timeB = new Date(b.timestamp || 0).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
  }, [filteredLogs, sortOrder]);

  if (!logs || logs.length === 0) {
    return (
      <div className="tech-box">
        <p>No audit events recorded.</p>
      </div>
    );
  }

  const grantedCount = logs.filter(l => (l.result || '').toUpperCase() === 'GRANTED').length;
  const deniedCount = logs.filter(l => (l.result || '').toUpperCase() === 'DENIED').length;

  return (
    <div>
      {/* Dynamic Controls Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setFilterOutcome('ALL')}
            className={filterOutcome === 'ALL' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
          >
            All ({logs.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterOutcome('GRANTED')}
            className={filterOutcome === 'GRANTED' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
          >
            Granted ({grantedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterOutcome('DENIED')}
            className={filterOutcome === 'DENIED' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
          >
            Denied ({deniedCount})
          </button>
        </div>

        <input
          type="text"
          placeholder="Filter by role, resource, or policy..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input"
          style={{ maxWidth: '280px', padding: '6px 10px', fontSize: '0.8rem', margin: 0 }}
        />
      </div>

      <div className="table-wrapper">
        <table className="tech-table">
          <thead>
            <tr>
              <th
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                title="Click to toggle chronological sort order"
              >
                Timestamp {sortOrder === 'desc' ? '▼ (Latest first)' : '▲ (Oldest first)'}
              </th>
              <th>Role</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Outcome</th>
              <th>Dynamic Reason & Zero-Trust Policy</th>
              <th>SHA-256 Hash</th>
            </tr>
          </thead>
          <tbody>
            {sortedLogs.map((log) => {
              const isGranted = (log.result || '').toUpperCase() === 'GRANTED';
              const shortHash = log.hash
                ? `${log.hash.substring(0, 8)}...${log.hash.substring(log.hash.length - 6)}`
                : 'verified';
              const policyInfo = getDynamicReason(log);

              return (
                <tr key={log.id || log.hash || Math.random()}>
                  <td
                    className="font-mono"
                    style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}
                    title={log.timestamp || ''}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {formatRelativeTime(log.timestamp)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {log.timestamp ? log.timestamp.replace('T', ' ').substring(0, 19) : '—'}
                    </div>
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
                  <td style={{ maxWidth: '340px', fontSize: '0.82rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span
                        className={`status-badge ${isGranted ? 'neutral' : 'denied'}`}
                        style={{ fontSize: '0.68rem', padding: '1px 5px', fontFamily: 'var(--font-mono)' }}
                      >
                        {policyInfo.policyCode}
                      </span>
                      <strong style={{ color: 'var(--text-primary)' }}>
                        {policyInfo.primaryReason}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                      {policyInfo.policyDetail}
                    </div>
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
    </div>
  );
}
