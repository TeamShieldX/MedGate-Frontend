import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import RoleSwitcher from './RoleSwitcher';

export default function Layout() {
  return (
    <div>
      <header className="header-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0 }}>MedGate Portal</h2>
          <nav>
            <NavLink to="/patients" className={({ isActive }) => (isActive ? 'active' : '')}>
              Patients
            </NavLink>
            <NavLink to="/audit-log" className={({ isActive }) => (isActive ? 'active' : '')}>
              Audit Log
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
              Login
            </NavLink>
          </nav>
        </div>
        <RoleSwitcher />
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
