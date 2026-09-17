import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import RoleSwitcher from './RoleSwitcher';
import ThemeToggle from './ThemeToggle';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { currentRole, isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const publicRoutes = ['/', '/login', '/terms', '/privacy'];
  const isPublicPage = publicRoutes.includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const usernameDisplay = user?.username || `${(currentRole || 'user').toLowerCase()}_user`;

  // Public Layout (Landing, Login, Terms, Privacy)
  if (isPublicPage) {
    return (
      <div className="public-shell">
        <div className="public-navbar-wrapper">
          <header className="public-navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <span className="brand-title">MEDGATE</span>
              </Link>

              <nav className="public-nav-links" aria-label="Public navigation">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}
                >
                  Overview
                </NavLink>

                {/* Show Patients and Audit Log ONLY if user is logged in */}
                {isLoggedIn && (
                  <>
                    <NavLink
                      to="/patients"
                      className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}
                    >
                      Patients
                    </NavLink>

                    <NavLink
                      to="/audit-log"
                      className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}
                    >
                      Audit Log
                    </NavLink>
                  </>
                )}
              </nav>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <a
                href="https://github.com/TeamShieldX/MedGate-Frontend"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-toggle-btn"
                title="View TeamShieldX MedGate on GitHub"
              >
                GitHub
              </a>

              {/* When logged in: show Welcome [user], RoleSwitcher, and Log out */}
              {isLoggedIn ? (
                <>
                  <span className="user-welcome-badge">
                    Welcome, <strong>{usernameDisplay}</strong>
                  </span>
                  <RoleSwitcher />
                  <ThemeToggle />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <ThemeToggle />
                  {location.pathname !== '/login' && (
                    <Link
                      to="/login"
                      className="btn-primary"
                      style={{ padding: '6px 16px', fontSize: '0.84rem' }}
                    >
                      Login
                    </Link>
                  )}
                </>
              )}
            </div>
          </header>
        </div>

        <main className="public-page-container">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  }

  // Authenticated App Shell with Sidebar (Patients, Patient Detail, Audit Log)
  return (
    <div className="app-shell">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand-header">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="brand-title">MEDGATE</div>
          </Link>
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
            {isLoggedIn ? 'Session Info' : 'Login'}
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          {isLoggedIn ? (
            <div className="security-indicator">
              Active role: <strong>{currentRole}</strong>
              <span>User: {usernameDisplay}</span>
            </div>
          ) : (
            <div className="security-indicator">
              Session: <strong>Unauthenticated</strong>
              <Link to="/login" style={{ color: 'var(--status-granted)', textDecoration: 'underline' }}>
                Log in to authenticate
              </Link>
            </div>
          )}

          <div className="security-indicator">
            <span>Audit integrity: </span>
            <span style={{ color: 'var(--status-granted)' }}>SHA-256 chained</span>
          </div>

          <div style={{ marginTop: '8px', fontSize: '0.74rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Link to="/terms" style={{ color: 'var(--text-secondary)' }}>Terms</Link>
            <span style={{ color: 'var(--border-strong)' }}>•</span>
            <Link to="/privacy" style={{ color: 'var(--text-secondary)' }}>Privacy</Link>
            <span style={{ color: 'var(--border-strong)' }}>•</span>
            <a
              href="https://github.com/TeamShieldX/MedGate-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-secondary)' }}
            >
              GitHub
            </a>
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
            <a
              href="https://github.com/TeamShieldX/MedGate-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="theme-toggle-btn"
              title="View on GitHub"
            >
              GitHub
            </a>

            {/* When logged in: show Welcome [user], RoleSwitcher, and Log out */}
            {isLoggedIn ? (
              <>
                <span className="user-welcome-badge">
                  Welcome, <strong>{usernameDisplay}</strong>
                </span>
                <RoleSwitcher />
              </>
            ) : (
              <Link
                to="/login"
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
              >
                Log in to select role
              </Link>
            )}

            <ThemeToggle />

            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="btn-text"
                title="Log out of current session"
              >
                Log out
              </button>
            )}
          </div>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}