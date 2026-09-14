import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import RoleSwitcher from './RoleSwitcher';

export default function Layout() {
  return (
    <div className="app-layout">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">M</div>

          <div>
            <h2>MedGate</h2>
            <span>Healthcare Portal</span>
          </div>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">MAIN MENU</p>

          <nav className="sidebar-nav">
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">▣</span>
              <span>Patients</span>
            </NavLink>

            <NavLink
              to="/audit-log"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="nav-icon">◷</span>
              <span>Audit Log</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">⇥</span>
            <span>Login</span>
          </NavLink>

          <div className="security-note">
            <span className="security-icon">✓</span>

            <div>
              <strong>Secure Access</strong>
              <small>Role-based protection</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-area">

        {/* Top Header */}
        <header className="topbar">
          <div>
            <p className="topbar-label">MEDICAL RECORD SYSTEM</p>
            <h1>MedGate Portal</h1>
          </div>

          <div className="role-area">
            <span className="role-label">Active Role</span>
            <RoleSwitcher />
          </div>
        </header>

        {/* Current Page */}
        <main className="page-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}