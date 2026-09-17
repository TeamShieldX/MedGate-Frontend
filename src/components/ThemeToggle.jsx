import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useAuth();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Current theme: ${theme}. Click to switch.`}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      <span className="theme-toggle-text">{theme === 'dark' ? 'light' : 'dark'}</span>
    </button>
  );
}
