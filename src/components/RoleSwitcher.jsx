import React from 'react';
import { useAuth, ROLES } from '../context/AuthContext';

export default function RoleSwitcher() {
  const { currentRole, setRole } = useAuth();

  return (
    <div className="role-switcher-container">
      <label htmlFor="global-role-switcher" className="role-switcher-label">
        Role:
      </label>
      <select
        id="global-role-switcher"
        value={currentRole || 'Doctor'}
        onChange={(e) => setRole(e.target.value)}
        className="role-select"
        aria-label="Switch active demonstration role"
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
