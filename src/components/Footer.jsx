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
              for electronic health records. Clinical records modeled using the open-source
              Synthea™ synthetic patient generator.
            </p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="status-badge granted" style={{ fontSize: '0.75rem' }}>
                SHA-256 Verified
              </span>
              <a
                href="https://synthea.mitre.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="status-badge neutral font-mono"
                style={{ fontSize: '0.75rem' }}
                title="Synthea Synthetic Patient Generator"
              >
                Synthea™ Dataset
              </a>
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
              <li><Link to="/privacy">HIPAA § 164.312</Link></li>
              <li><Link to="/terms">Least Privilege Access</Link></li>
              <li><a href="#integrity">Non-Repudiation Log</a></li>
              <li><a href="#simulator">Field Redaction Matrix</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Source Code</h5>
            <ul>
              <li>
                <a
                  href="https://github.com/TeamShieldX/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TeamShieldX Org
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TeamShieldX/MedGate-Frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Frontend Repo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/TeamShieldX/MedGate-Backend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Backend Repo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/synthetichealth/synthea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Synthea™ Source
                </a>
              </li>
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

        {/* NITDA Hackathon Official Participant Banner */}
        <div className="participant-banner-section">
          <span className="participant-label">Official Participant</span>
          <a
            href="https://nitda.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="participant-banner-link"
            title="National Information Technology Development Agency (NITDA)"
          >
            <img
              src="/nitda-hackathon-banner.png"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/nitda-hackathon-banner.svg";
              }}
              alt="NITDA International Cybersecurity Hackathon"
              className="participant-banner-img"
            />
          </a>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} MedGate Healthcare Systems &bull;{' '}
            <a
              href="https://github.com/TeamShieldX/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}
            >
              Team ShieldX
            </a>
            . All rights reserved.
          </div>
          <div className="font-mono" style={{ fontSize: '0.78rem' }}>
            0.0343ms Mean Access Latency &bull; 29,154 Ops/Sec &bull; Synthea™ Clinical Graph
          </div>
        </div>
      </div>
    </footer>
  );
}
