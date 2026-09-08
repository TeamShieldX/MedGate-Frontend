import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/PatientList';
import { getPatients } from '../services/api';

export default function PatientListPage() {
  const { currentRole } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients().then((res) => {
      setPatients(res.data);
      setLoading(false);
    });
  }, [currentRole]);

  return (
    <div>
      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Patient Records</h2>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Viewing as: <strong>{currentRole}</strong>
        </span>
      </div>
      {loading ? <p>Loading patient list...</p> : <PatientList patients={patients} />}
    </div>
  );
}
