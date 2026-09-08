import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleSelector from '../components/RoleSelector';
import { login } from '../services/api';

export default function LoginPage() {
  const { setRole, currentRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState(currentRole || 'Doctor');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(selectedRole);
    setRole(selectedRole);
    navigate('/patients');
  };

  return (
    <div className="card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>MedGate Login</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Select your role for demo access:
      </p>
      <form onSubmit={handleLogin}>
        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />
        <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>
          Log In as {selectedRole}
        </button>
      </form>
    </div>
  );
}
