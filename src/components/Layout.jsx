import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import RoleSwitcher from './RoleSwitcher';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { currentRole } = useAuth();

  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand-header">
          <div className="brand-title">MEDGATE</div>
          <div className="brand-subtitle">Zero-Trust EHR Gateway</div>
        </div>

        <nav className="nav-group" aria-label="System navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Overview
          </NavLink>

          <NavLink
            to="/patients"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Patients
          </NavLink>

          <NavLink
            to="/audit-log"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Audit Log
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Login / Auth
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="security-indicator">
            Active role: <strong>{currentRole}</strong>
            <span>Least-privilege RBAC active</span>
          </div>
          <div className="security-indicator">
            <span>Audit integrity: </span>
            <span style={{ color: 'var(--status-granted)' }}>SHA-256 chained</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="top-bar">
          <div className="top-bar-left">
            <span className="system-title">MedGate Gateway Console</span>
          </div>

          <div className="top-bar-right">
            <RoleSwitcher />
          </div>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}