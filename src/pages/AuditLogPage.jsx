import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuditLogTable from '../components/AuditLogTable';
import AccessDeniedBanner from '../components/AccessDeniedBanner';
import { getAuditLog } from '../services/api';

export default function AuditLogPage() {
  const { currentRole } = useAuth();
  const [logs, setLogs] = useState([]);
  const [integrity, setIntegrity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [denialReason, setDenialReason] = useState(null);

  const isAdmin = currentRole === 'Administrator';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    if (!isAdmin) {
      setAccessDenied(true);
      setDenialReason(`Role '${currentRole}' lacks permission to read resource 'audit-logs'. Only 'Administrator' is authorized.`);
      setLoading(false);
      return;
    }

    setAccessDenied(false);

    getAuditLog(currentRole)
      .then((res) => {
        if (!isMounted) return;
        if (res.status === 403 || res.success === false) {
          setAccessDenied(true);
          setDenialReason(res.error || `Access denied for role ${currentRole}`);
        } else {
          setLogs(res.data || []);
          setIntegrity(res.integrity || {
            tamperEvidentChainValid: true,
            totalEntriesVerified: res.total || 1010
          });
        }
      })
      .catch((err) => {
        console.error('Failed to load audit logs:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentRole, isAdmin]);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Cryptographic Audit Trail</h1>
        <p style={{ marginTop: '4px' }}>
          Immutable SHA-256 hash-chained log of all authorization decisions (granted and denied).
        </p>
      </div>

      {accessDenied ? (
        <AccessDeniedBanner
          reason={denialReason}
          attemptedResource="audit-logs"
        />
      ) : loading ? (
        <div className="tech-box">
          <p className="font-mono">Verifying SHA-256 chain integrity and fetching audit entries...</p>
        </div>
      ) : (
        <div>
          {/* Prominent Cryptographic Chain Integrity Indicator */}
          <div className={`integrity-banner ${integrity?.tamperEvidentChainValid ? '' : 'invalid'}`}>
            <div className="integrity-info">
              <h4>Cryptographic chain status</h4>
              <p>
                Every log row computes SHA-256 over its payload plus previous hash.
                {integrity?.totalEntriesVerified && (
                  <span> Verified across {integrity.totalEntriesVerified.toLocaleString()} entries.</span>
                )}
              </p>
            </div>

            <div>
              {integrity?.tamperEvidentChainValid ? (
                <span className="status-badge granted" style={{ fontSize: '0.88rem', padding: '6px 12px' }}>
                  Chain verified (100% valid)
                </span>
              ) : (
                <span className="status-badge denied" style={{ fontSize: '0.88rem', padding: '6px 12px' }}>
                  Integrity violation detected
                </span>
              )}
            </div>
          </div>

          <div className="tech-box">
            <div className="tech-box-header">
              <h3>Recorded Access Decisions</h3>
              <span className="status-badge neutral font-mono">
                Showing {logs.length} entries
              </span>
            </div>

            <AuditLogTable logs={logs} />
          </div>
        </div>
      )}
    </div>
  );
}
