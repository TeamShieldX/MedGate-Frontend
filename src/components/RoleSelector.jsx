import React from 'react';
import { ROLES } from '../context/AuthContext';

export default function RoleSelector({ selectedRole, onSelectRole }) {
  return (
    <div className="card">
      <label htmlFor="role-select" style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>
        Select Role:
      </label>
      <select
        id="role-select"
        value={selectedRole}
        onChange={(e) => onSelectRole(e.target.value)}
        style={{ padding: '0.4rem 0.8rem', borderRadius: '4px', border: '1px solid #ccc' }}
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
