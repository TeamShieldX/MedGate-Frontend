import React from 'react';
import { useAuth, ROLES } from '../context/AuthContext';

export default function RoleSwitcher() {
  const { currentRole, setRole } = useAuth();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Active Role:</span>
      <select
        value={currentRole || ''}
        onChange={(e) => setRole(e.target.value)}
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          border: '1px solid #475569',
          background: '#0f172a',
          color: '#fff',
          fontSize: '0.85rem'
        }}
      >
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    </div>
  );
}
