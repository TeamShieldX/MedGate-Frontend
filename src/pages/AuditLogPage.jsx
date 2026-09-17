import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import AuditLogTable from '../components/AuditLogTable';
import AccessDeniedBanner from '../components/AccessDeniedBanner';
import { getAuditLog } from '../services/api';

export default function AuditLogPage() {
  const { currentRole } = useAuth();
  const [logs, setLogs] = useState([]);
  const [integrity, setIntegrity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoPoll, setAutoPoll] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [denialReason, setDenialReason] = useState(null);

  const isAdmin = currentRole === 'Administrator';

  const fetchLogs = useCallback(async (isInitial = false) => {
    if (!isAdmin) {
      setAccessDenied(true);
      setDenialReason(`Role '${currentRole}' lacks permission to read resource 'audit-logs'. Only 'Administrator' is authorized.`);
      setLoading(false);
      return;
    }

    if (isInitial) setLoading(true);
    else setRefreshing(true);

    try {
      const res = await getAuditLog(currentRole);
      if (res.status === 403 || res.success === false) {
        setAccessDenied(true);
        setDenialReason(res.error || `Access denied for role ${currentRole}`);
      } else {
        setAccessDenied(false);
        const sorted = (res.data || []).sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setLogs(sorted);
        setIntegrity(res.integrity || {
          tamperEvidentChainValid: true,
          totalEntriesVerified: res.total || sorted.length
        });
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      if (isInitial) setLoading(false);
      setRefreshing(false);
    }
  }, [currentRole, isAdmin]);

  useEffect(() => {
    fetchLogs(true);
  }, [fetchLogs]);

  // Live polling stream every 4 seconds
  useEffect(() => {
    if (!autoPoll || !isAdmin) return;
    const interval = setInterval(() => {
      fetchLogs(false);
    }, 4000);
    return () => clearInterval(interval);
  }, [autoPoll, isAdmin, fetchLogs]);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1>Cryptographic Audit Trail</h1>
            <p style={{ marginTop: '4px' }}>
              Immutable SHA-256 hash-chained log of all authorization decisions (granted and denied).
            </p>
          </div>

          {isAdmin && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setAutoPoll(prev => !prev)}
                className={`status-badge ${autoPoll ? 'granted' : 'neutral'}`}
                style={{ cursor: 'pointer', padding: '6px 12px', fontSize: '0.78rem', background: 'none' }}
                title="Toggle real-time auto-polling"
              >
                {autoPoll ? '● Live Stream (4s)' : '○ Paused'}
              </button>
              <button
                type="button"
                onClick={() => fetchLogs(false)}
                disabled={loading || refreshing}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <span>{refreshing ? '...' : '↻ Refresh'}</span>
              </button>
            </div>
          )}
        </div>
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
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span className="status-badge neutral font-mono">
                  Showing {logs.length} entries (latest first)
                </span>
              </div>
            </div>

            <AuditLogTable logs={logs} />
          </div>
        </div>
      )}
    </div>
  );
}
