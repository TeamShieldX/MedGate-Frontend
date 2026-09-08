import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuditLogTable from '../components/AuditLogTable';
import AccessDeniedBanner from '../components/AccessDeniedBanner';
import { getAuditLog } from '../services/api';

export default function AuditLogPage() {
  const { currentRole } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = currentRole === 'Administrator';

  useEffect(() => {
    if (isAdmin) {
      getAuditLog().then((res) => {
        setLogs(res.data);
        setLoading(false);
      });
    }
  }, [currentRole, isAdmin]);

  return (
    <div>
      <h2>Audit & Access History</h2>
      {!isAdmin ? (
        <AccessDeniedBanner reason="Only Administrators are authorized to view system audit logs." />
      ) : loading ? (
        <p>Loading audit logs...</p>
      ) : (
        <AuditLogTable logs={logs} />
      )}
    </div>
  );
}
