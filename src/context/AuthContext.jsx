import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const ROLES = ['Doctor', 'Nurse', 'Researcher', 'Receptionist', 'Administrator'];

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState('Doctor');
  const [user, setUser] = useState({ username: 'doctor_user', role: 'Doctor' });

  const setRole = (role) => {
    setCurrentRole(role);
    setUser({ username: `${role.toLowerCase()}_user`, role });
  };

  const logout = () => {
    setCurrentRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentRole, user, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
