import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import RoleSwitcher from './RoleSwitcher';
import ThemeToggle from './ThemeToggle';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';

function HamburgerToggle({ isOpen, onClick, label = 'Toggle navigation' }) {
  return (
    <button
      type="button"
      className="hamburger-btn"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      )}
    </button>
  );
}

export default function Layout() {
  const { currentRole, isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const publicRoutes = ['/', '/login', '/terms', '/privacy'];
  const isPublicPage = publicRoutes.includes(location.pathname);

  // Close menu on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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
            <div className="public-navbar-brand-row">
              <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="/logo.jpg" alt="MedGate Logo" className="brand-logo-img" />
                <span className="brand-title">MEDGATE</span>
              </Link>

              <div className="mobile-header-actions">
                {isLoggedIn && <RoleSwitcher />}
                <ThemeToggle />
                <HamburgerToggle
                  isOpen={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(prev => !prev)}
                  label="Toggle mobile navigation menu"
                />
              </div>
            </div>

            <div className="desktop-nav-group">
              <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                {/* Show Console, Patients and Audit Log ONLY if user is logged in */}
                {isLoggedIn && (
                  <nav className="public-nav-links" aria-label="Public navigation">
                    <NavLink
                      to="/overview"
                      className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}
                    >
                      Console
                    </NavLink>

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
                  </nav>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                {/* Show GitHub ONLY when logged out */}
                {!isLoggedIn && (
                  <a
                    href="https://github.com/TeamShieldX/MedGate-Frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-toggle-btn"
                    title="View TeamShieldX MedGate on GitHub"
                  >
                    GitHub
                  </a>
                )}

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
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
              <div className="public-mobile-menu">
                {isLoggedIn && (
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }} aria-label="Mobile navigation">
                    <NavLink
                      to="/overview"
                      className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Console
                    </NavLink>
                    <NavLink
                      to="/patients"
                      className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Patients
                    </NavLink>
                    <NavLink
                      to="/audit-log"
                      className={({ isActive }) => `public-nav-link ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Audit Log
                    </NavLink>
                  </nav>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                  {isLoggedIn ? (
                    <>
                      <span className="user-welcome-badge">
                        Welcome, <strong>{usernameDisplay}</strong>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                        className="btn-secondary"
                        style={{ width: '100%', padding: '8px 12px', fontSize: '0.82rem', marginTop: '4px' }}
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="https://github.com/TeamShieldX/MedGate-Frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-toggle-btn"
                        style={{ textAlign: 'center' }}
                      >
                        GitHub
                      </a>
                      {location.pathname !== '/login' && (
                        <Link
                          to="/login"
                          className="btn-primary"
                          onClick={() => setMobileMenuOpen(false)}
                          style={{ textAlign: 'center', padding: '8px 16px', fontSize: '0.84rem' }}
                        >
                          Login
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </header>
        </div>

        <main className="public-page-container">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  }

  // Authenticated App Shell with Desktop Sidebar & Mobile Top Bar Drawer
  return (
    <div className="app-shell">
      {/* Desktop Sidebar Navigation */}
      <aside className="sidebar">
        <div className="brand-header">
          <Link
            to="/"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <img src="/logo.jpg" alt="MedGate Logo" className="brand-logo-img" />
            <div>
              <div className="brand-title">MEDGATE</div>
              <div className="brand-subtitle">Zero-Trust EHR Gateway</div>
            </div>
          </Link>
        </div>

        <nav className="nav-group" aria-label="System navigation">
          <NavLink
            to={isLoggedIn ? "/overview" : "/"}
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
            to={isLoggedIn ? "/session" : "/login"}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {isLoggedIn ? 'Session Info' : 'Login'}
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          {isLoggedIn ? (
            <div className="security-indicator">
              <div>Active role: <strong>{currentRole}</strong></div>
              <div>User: <strong>{usernameDisplay}</strong></div>
            </div>
          ) : (
            <div className="security-indicator">
              Session: <strong>Unauthenticated</strong>
              <Link
                to="/login"
                style={{ color: 'var(--status-granted)', textDecoration: 'underline' }}
              >
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

          <a
            href="https://nitda.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="hackathon-hero-badge"
            style={{ marginTop: '10px', padding: '4px 8px' }}
            title="Built for the NITDA International Cybersecurity Hackathon (ICSC)"
          >
            <span className="hackathon-badge-prefix" style={{ fontSize: '0.72rem' }}>Built for</span>
            <img
              src="/icschack.png"
              alt="ICSC"
              className="hackathon-hero-img"
              style={{ height: '16px' }}
            />
            <span className="hackathon-badge-suffix" style={{ fontSize: '0.72rem' }}>Hackathon</span>
          </a>

          {/* Log out at the bottom of the sidebar */}
          {isLoggedIn && (
            <button
              type="button"
              onClick={handleLogout}
              className="btn-secondary sidebar-logout-btn"
              title="Log out of current session"
            >
              Log out
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="top-bar">
          <div className="top-bar-main-row">
            <div className="top-bar-left">
              <span className="system-title">
                <span className="title-desktop">MedGate Gateway Console</span>
                <span className="title-mobile">MedGate</span>
              </span>
            </div>

            <div className="top-bar-right">
              {/* Desktop-only welcome badge */}
              {isLoggedIn && (
                <span className="user-welcome-badge desktop-only-item">
                  Welcome, <strong>{usernameDisplay}</strong>
                </span>
              )}

              {/* Role selector always in view */}
              {isLoggedIn ? (
                <RoleSwitcher />
              ) : (
                <Link
                  to="/login"
                  className="btn-secondary desktop-only-item"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  Log in
                </Link>
              )}

              {/* Theme toggle always in view */}
              <ThemeToggle />

              {/* Hamburger button on the FAR RIGHT */}
              <HamburgerToggle
                isOpen={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                label="Toggle console navigation menu"
              />
            </div>
          </div>

          {/* Authenticated Mobile Dropdown Menu right under top bar */}
          {mobileMenuOpen && (
            <div className="top-bar-mobile-menu">
              {isLoggedIn && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span className="user-welcome-badge">
                    Welcome, <strong>{usernameDisplay}</strong>
                  </span>
                  <span className="status-badge neutral font-mono" style={{ fontSize: '0.76rem' }}>
                    {currentRole}
                  </span>
                </div>
              )}

              <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} aria-label="Mobile console navigation">
                <NavLink
                  to={isLoggedIn ? "/overview" : "/"}
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Overview
                </NavLink>

                <NavLink
                  to="/patients"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Patients
                </NavLink>

                <NavLink
                  to="/audit-log"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Audit Log
                </NavLink>

                <NavLink
                  to={isLoggedIn ? "/session" : "/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {isLoggedIn ? 'Session Info' : 'Login'}
                </NavLink>
              </nav>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '0.76rem' }}>
                  <Link to="/terms" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)' }}>Terms</Link>
                  <span style={{ color: 'var(--border-strong)' }}>•</span>
                  <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-secondary)' }}>Privacy</Link>
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

                <a
                  href="https://nitda.gov.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hackathon-hero-badge"
                  style={{ padding: '4px 8px' }}
                  title="Built for the NITDA International Cybersecurity Hackathon (ICSC)"
                >
                  <span className="hackathon-badge-prefix" style={{ fontSize: '0.72rem' }}>Built for</span>
                  <img
                    src="/icschack.png"
                    alt="ICSC"
                    className="hackathon-hero-img"
                    style={{ height: '16px' }}
                  />
                  <span className="hackathon-badge-suffix" style={{ fontSize: '0.72rem' }}>Hackathon</span>
                </a>

                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="btn-secondary sidebar-logout-btn"
                    style={{ width: '100%', marginTop: '4px' }}
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}