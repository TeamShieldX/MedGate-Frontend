import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/PatientList';
import { getPatients } from '../services/api';

export default function PatientListPage() {
  const { currentRole } = useAuth();
  const [patients, setPatients] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [accessRole, setAccessRole] = useState(currentRole);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getPatients(currentRole)
      .then((res) => {
        if (!isMounted) return;
        setPatients(res.data || []);
        setTotalCount(res.total || (res.data ? res.data.length : 0));
        setAccessRole(res.accessRole || currentRole);
      })
      .catch((err) => {
        console.error('Failed to load patients:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentRole]);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1>Patient Directory</h1>
            <p style={{ marginTop: '4px' }}>
              Records filtered and redacted dynamically based on the active role's least-privilege policy.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="status-badge neutral font-mono">
              Role: {accessRole}
            </span>
            <span className="status-badge neutral font-mono">
              Total records: {totalCount}
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="tech-box">
          <p className="font-mono">Evaluating access permissions and retrieving patient records...</p>
        </div>
      ) : (
        <PatientList patients={patients} role={accessRole} />
      )}
    </div>
  );
}
