import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import { login } from '../services/api';

export default function LoginPage() {
  const { currentRole, setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState(currentRole || 'Doctor');
  const [username, setUsername] = useState(`${selectedRole.toLowerCase()}_user`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setUsername(`${role.toLowerCase()}_user`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await login(selectedRole, username);
      if (res.success || res.data?.token) {
        setRole(selectedRole);
        navigate('/patients');
      } else {
        setErrorMessage(res.error || 'Authentication rejected by security gateway');
      }
    } catch {
      // Local fallback
      setRole(selectedRole);
      navigate('/patients');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '520px' }}>
      <div className="tech-box">
        <div className="tech-box-header">
          <h1>Authenticate session</h1>
          <span className="status-badge neutral">zero-trust</span>
        </div>

        <p style={{ marginBottom: '20px' }}>
          Select a healthcare workforce role to simulate access permissions and dynamic data redaction:
        </p>

        {errorMessage && (
          <div className="access-denied-panel" style={{ marginBottom: '20px' }}>
            <div className="access-denied-title">Authentication error</div>
            <div className="access-denied-body">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="login-role-select" className="form-label">
              Assigned role:
            </label>
            <select
              id="login-role-select"
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="form-select"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="login-username" className="form-label">
              Username identifier:
            </label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%' }}
            >
              {isSubmitting ? 'Authenticating with gateway...' : `Log in as ${selectedRole}`}
            </button>
          </div>
        </form>
      </div>

      <div className="tech-box" style={{ marginTop: '20px' }}>
        <h3 style={{ marginBottom: '8px' }}>Active policy note</h3>
        <p style={{ fontSize: '0.85rem' }}>
          In a zero-trust model, all authentication tokens carry role claims evaluated against
          dynamic field gating tables. Access permissions are re-evaluated on every request.
        </p>
      </div>
    </div>
  );
}
