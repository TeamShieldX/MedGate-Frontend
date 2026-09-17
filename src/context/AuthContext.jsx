import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLES = ['Doctor', 'Nurse', 'Receptionist', 'Researcher', 'Administrator'];

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('medgate_role') || 'Doctor';
  });

  const [user, setUser] = useState(() => {
    const role = localStorage.getItem('medgate_role') || 'Doctor';
    return {
      id: `usr-${role.toLowerCase()}-101`,
      username: `${role.toLowerCase()}_user`,
      role,
    };
  });

  const setRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem('medgate_role', role);
    setUser({
      id: `usr-${role.toLowerCase()}-101`,
      username: `${role.toLowerCase()}_user`,
      role,
    });
  };

  const logout = () => {
    setCurrentRole('Doctor');
    localStorage.setItem('medgate_role', 'Doctor');
    setUser({
      id: 'usr-doctor-101',
      username: 'doctor_user',
      role: 'Doctor',
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('medgate_role')) {
      localStorage.setItem('medgate_role', currentRole);
    }
  }, [currentRole]);

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
