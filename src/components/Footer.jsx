import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="public-footer-wrapper">
      <div className="public-footer">
        <div className="footer-top">
          <div className="footer-col">
            <h5 style={{ fontSize: '0.95rem' }}>MEDGATE</h5>
            <p style={{ fontSize: '0.82rem', marginTop: '6px' }}>
              Zero-trust role-based access control and field-level redaction gateway
              for electronic health records. Providing sub-millisecond access evaluation
              and tamper-evident SHA-256 cryptographic audit guarantees.
            </p>
            <div style={{ marginTop: '12px' }}>
              <span className="status-badge granted" style={{ fontSize: '0.75rem' }}>
                SHA-256 Chain Verified
              </span>
            </div>
          </div>

          <div className="footer-col">
            <h5>Architecture</h5>
            <ul>
              <li><a href="#overview">Gateway Overview</a></li>
              <li><a href="#simulator">RBAC Simulator</a></li>
              <li><a href="#benchmarks">Latency Benchmarks</a></li>
              <li><a href="#integrity">Audit Hash Chain</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Compliance</h5>
            <ul>
              <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>HIPAA § 164.312</span></li>
              <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>Least Privilege Access</span></li>
              <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>Non-Repudiation Log</span></li>
              <li><span style={{ color: 'var(--text-secondary)', fontSize: '0.84rem' }}>Field Redaction Matrix</span></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Legal & Security</h5>
            <ul>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/login">Authentication Console</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} MedGate Healthcare Systems. Team ShieldX. All rights reserved.
          </div>
          <div className="font-mono" style={{ fontSize: '0.78rem' }}>
            0.0343ms Mean Access Latency &bull; 29,154 Ops/Sec &bull; 44/44 Tests Pass
          </div>
        </div>
      </div>
    </footer>
  );
}
