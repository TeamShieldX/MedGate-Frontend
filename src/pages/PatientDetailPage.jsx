import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PatientDetailView from '../components/PatientDetailView';
import { getPatientById } from '../services/api';

export default function PatientDetailPage() {
  const { id } = useParams();
  const { currentRole } = useAuth();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getPatientById(id, currentRole)
      .then((res) => {
        if (!isMounted) return;
        setPatient(res.data || null);
      })
      .catch((err) => {
        console.error('Failed to retrieve patient record:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, currentRole]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Link
          to="/patients"
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
        >
          Back to Patient Directory
        </Link>
      </div>

      {loading ? (
        <div className="tech-box">
          <p className="font-mono">Evaluating least-privilege policy and decrypting patient record...</p>
        </div>
      ) : patient ? (
        <PatientDetailView patient={patient} role={currentRole} />
      ) : (
        <div className="tech-box">
          <p>Patient record not found or access denied.</p>
        </div>
      )}
    </div>
  );
}
