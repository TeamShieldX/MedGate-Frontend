import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLES = ['Doctor', 'Nurse', 'Receptionist', 'Researcher', 'Administrator'];

function getSystemTheme() {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark';
}

export function AuthProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('medgate_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return getSystemTheme();
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem('medgate_auth'));
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('medgate_role') || 'Doctor';
  });

  const [user, setUser] = useState(() => {
    const role = localStorage.getItem('medgate_role') || 'Doctor';
    const savedUser = localStorage.getItem('medgate_username') || `${role.toLowerCase()}_user`;
    return {
      id: `usr-${role.toLowerCase()}-101`,
      username: savedUser,
      role,
    };
  });

  // Apply theme to html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen to system theme changes if user hasn't explicitly selected one
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const explicit = localStorage.getItem('medgate_theme');
      if (!explicit) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (mediaQuery?.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
      return () => mediaQuery.removeEventListener('change', handleSystemChange);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('medgate_theme', nextTheme);
  };

  const setRole = (role) => {
    setCurrentRole(role);
    localStorage.setItem('medgate_role', role);
    setUser((prev) => ({
      ...prev,
      id: `usr-${role.toLowerCase()}-101`,
      username: prev?.username || `${role.toLowerCase()}_user`,
      role,
    }));
  };

  const loginUser = (role, username) => {
    setIsLoggedIn(true);
    localStorage.setItem('medgate_auth', 'true');
    localStorage.setItem('medgate_role', role);
    localStorage.setItem('medgate_username', username);
    setCurrentRole(role);
    setUser({
      id: `usr-${role.toLowerCase()}-101`,
      username,
      role,
    });
  };

  const startDemoSession = () => {
    loginUser('Doctor', 'dr_moyin');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('medgate_auth');
    localStorage.removeItem('medgate_username');
    setCurrentRole('Doctor');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        theme,
        toggleTheme,
        isLoggedIn,
        currentRole,
        user,
        setRole,
        loginUser,
        startDemoSession,
        logout,
      }}
    >
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
