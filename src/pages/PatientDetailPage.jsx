import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PatientDetailView from '../components/PatientDetailView';
import { getPatientById } from '../services/api';

export default function PatientDetailPage() {
  const { id } = useParams();
  const { currentRole } = useAuth();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    getPatientById(id).then((res) => {
      setPatient(res.data);
    });
  }, [id, currentRole]);

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <Link to="/patients" style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>
          ← Back to Patient List
        </Link>
      </div>
      <PatientDetailView patient={patient} role={currentRole} />
    </div>
  );
}
