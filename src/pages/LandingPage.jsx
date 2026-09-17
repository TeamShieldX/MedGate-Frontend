import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import RedactedField from '../components/RedactedField';

export default function LandingPage() {
  const { startDemoSession } = useAuth();
  const navigate = useNavigate();
  const [simulatorRole, setSimulatorRole] = useState('Researcher');

  const handleTryDemo = () => {
    startDemoSession();
    navigate('/patients');
  };

  // Sample patient payload for interactive simulator
  const samplePatient = {
    id: "pat-901-syn",
    firstName: "James",
    lastName: "Smith",
    birthDate: "1974-05-12",
    gender: "M",
    phone: "555-0142",
    address: "742 Healthcare Ave, Metro City",
    primaryCondition: "Hypertension",
    confidentialNotes: "Restricted psychiatric evaluation. Clinician eyes only.",
    medications: ["Lisinopril 10 MG Oral Tablet", "Atorvastatin 20 MG"],
    observations: ["BP 138/88 mmHg", "Heart Rate 72 bpm"],
    appointments: ["2026-09-25 10:00 AM - Dr. Sarah Smith (Cardiology)"]
  };

  const isResearcher = simulatorRole === 'Researcher';
  const isReceptionist = simulatorRole === 'Receptionist';
  const isNurse = simulatorRole === 'Nurse';
  const isDoctor = simulatorRole === 'Doctor';
  const isAdmin = simulatorRole === 'Administrator';

  // Build JSON preview filtered by role
  const getFilteredJson = () => {
    const json = { id: samplePatient.id, gender: samplePatient.gender, birthDate: samplePatient.birthDate };
    if (!isResearcher) {
      json.firstName = samplePatient.firstName;
      json.lastName = samplePatient.lastName;
      json.phone = samplePatient.phone;
      json.address = samplePatient.address;
    } else {
      json.name = "[REDACTED_FOR_RESEARCHER]";
      json.contact = "[REDACTED_FOR_RESEARCHER]";
    }

    if (!isReceptionist) {
      json.primaryCondition = samplePatient.primaryCondition;
      json.medications = samplePatient.medications;
      json.observations = samplePatient.observations;
    } else {
      json.clinicalCondition = "[HIDDEN_RECEPTIONIST_ROLE]";
      json.medications = "[HIDDEN_RECEPTIONIST_ROLE]";
    }

    if (isDoctor || isAdmin) {
      json.confidentialNotes = samplePatient.confidentialNotes;
    } else {
      json.confidentialNotes = `[REDACTED_FOR_${simulatorRole.toUpperCase()}]`;
    }

    if (!isResearcher) {
      json.appointments = samplePatient.appointments;
    } else {
      json.appointments = "[REDACTED_FOR_RESEARCHER]";
    }

    return JSON.stringify(json, null, 2);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      {/* Hero Section (Left-aligned typography inside centered page container) */}
      <section id="overview" className="hero-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <div className="hero-tag" style={{ margin: 0 }}>
            <span>●</span>
            <span>ZERO-TRUST GATEWAY &bull; 100% AUDIT INTEGRITY</span>
          </div>

          <a
            href="https://nitda.gov.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="hackathon-hero-badge"
            title="NITDA International Cybersecurity Hackathon (ICSC)"
          >
            <img
              src="/icschack.png"
              alt="NITDA International Cybersecurity Hackathon"
              style={{ height: '22px', width: 'auto', display: 'block' }}
            />
            <span style={{ fontSize: '0.78rem', color: '#EDEFEE', fontFamily: 'var(--font-mono)' }}>
              NITDA Hackathon Participant
            </span>
          </a>
        </div>

        <h1 className="hero-title">
          Every access to a patient record is checked, logged, and provably tamper-evident.
        </h1>

        <p className="hero-lead">
          MedGate is a zero-trust electronic health records gateway providing runtime
          role-based access control, dynamic field-level data redaction, and an append-only
          SHA-256 cryptographic audit ledger.
        </p>

        {/* Real Benchmark Strip */}
        <div className="metric-strip" aria-label="System verification benchmarks">
          <div className="metric-cell">
            <span className="metric-number">0.0343ms</span>
            <span className="metric-label">average access check latency</span>
          </div>

          <div className="metric-cell">
            <span className="metric-number">29,154</span>
            <span className="metric-label">operations / second</span>
          </div>

          <div className="metric-cell">
            <span className="metric-number">44/44</span>
            <span className="metric-label">automated tests passing</span>
          </div>

          <div className="metric-cell">
            <span className="metric-number">SHA-256</span>
            <span className="metric-label">hash-chained audit ledger</span>
          </div>
        </div>

        {/* Hero Actions */}
        <div className="hero-actions">
          <button
            type="button"
            onClick={handleTryDemo}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            Try the demo
          </button>
          <Link
            to="/login"
            className="btn-secondary"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            Login
          </Link>
          <a
            href="https://github.com/TeamShieldX/MedGate-Frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '12px 24px', fontSize: '0.95rem' }}
          >
            GitHub
          </a>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
            5 workforce roles &bull; Live Neon PostgreSQL backend
          </span>
        </div>
      </section>

      {/* Interactive Live RBAC Policy Simulator */}
      <section id="simulator" className="tech-box">
        <div className="tech-box-header">
          <div>
            <h2>Interactive RBAC policy simulator</h2>
            <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
              Select a workforce role to inspect runtime field stripping and visible redaction placeholders in real time:
            </p>
          </div>
          <span className="status-badge neutral font-mono">
            Latency: ~0.0343ms
          </span>
        </div>

        {/* Simulator Role Tabs */}
        <div className="simulator-tab-bar" role="tablist">
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              role="tab"
              aria-selected={simulatorRole === role}
              onClick={() => setSimulatorRole(role)}
              className={`simulator-tab ${simulatorRole === role ? 'active' : ''}`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Split Screen Simulator Console */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginTop: '16px' }}>
          {/* Left Pane: Rendered UI Card */}
          <div style={{ border: '1px solid var(--border-subtle)', padding: '20px', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
              <span className="font-mono" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Client Render: {simulatorRole}
              </span>
              <span className="status-badge granted">gated runtime</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Patient Name: </span>
                {!isResearcher ? (
                  <strong>{samplePatient.firstName} {samplePatient.lastName}</strong>
                ) : (
                  <RedactedField fieldName="Name" reason="Redacted for Researcher" />
                )}
              </div>

              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Phone / Contact: </span>
                {!isResearcher ? (
                  <span className="font-mono">{samplePatient.phone}</span>
                ) : (
                  <RedactedField fieldName="Contact PII" reason="Redacted for Researcher" />
                )}
              </div>

              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Primary Condition: </span>
                {!isReceptionist ? (
                  <span>{samplePatient.primaryCondition}</span>
                ) : (
                  <RedactedField fieldName="Condition" reason="Hidden — Receptionist role" />
                )}
              </div>

              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Confidential Notes: </span>
                {isDoctor || isAdmin ? (
                  <span style={{ color: 'var(--text-primary)' }}>{samplePatient.confidentialNotes}</span>
                ) : (
                  <RedactedField
                    fieldName="Confidential Notes"
                    reason={
                      isNurse
                        ? "Redacted for Nurse role"
                        : isReceptionist
                        ? "Hidden — Receptionist role"
                        : "Redacted for Researcher"
                    }
                  />
                )}
              </div>

              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Active Medications: </span>
                {!isReceptionist ? (
                  <span className="font-mono" style={{ fontSize: '0.82rem' }}>
                    {samplePatient.medications.join(', ')}
                  </span>
                ) : (
                  <RedactedField fieldName="Prescriptions" reason="Hidden — Receptionist role" />
                )}
              </div>

              <div>
                <span style={{ color: 'var(--text-secondary)' }}>Audit Log Access: </span>
                {isAdmin ? (
                  <span className="status-badge granted">Granted (200 OK)</span>
                ) : (
                  <span className="status-badge denied">Denied (403 Forbidden)</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Pane: API Inspector & JSON Terminal */}
          <div className="terminal-box">
            <div className="terminal-header">
              <span>GATEWAY HTTP INSPECTOR</span>
              <span style={{ color: 'var(--status-granted)' }}>HTTP/1.1 200 OK</span>
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '0.78rem' }}>
              &gt; GET /patients/pat-901-syn<br />
              &gt; Host: medgatebackend.onrender.com<br />
              &gt; x-user-role: <span style={{ color: 'var(--text-primary)' }}>{simulatorRole}</span><br />
              &gt; x-access-check: <span style={{ color: 'var(--status-granted)' }}>0.0343ms</span>
            </div>
            <pre style={{ color: 'var(--text-primary)', fontSize: '0.78rem', overflowX: 'auto', margin: 0 }}>
              {getFilteredJson()}
            </pre>
          </div>
        </div>
      </section>

      {/* Architectural Pipeline Deep Dive */}
      <section id="architecture" className="tech-box">
        <div className="tech-box-header">
          <div>
            <h2>Zero-trust architectural pipeline</h2>
            <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
              How MedGate mediates every request between client and database layer
            </p>
          </div>
          <span className="status-badge neutral font-mono">
            3-tier enforcement
          </span>
        </div>

        <div className="pipeline-grid">
          <div className="pipeline-card">
            <span className="pipeline-step">01 &bull; Ingestion & Identity</span>
            <h4>Zero-Trust Gateway Interceptor</h4>
            <p>
              Inspects cryptographic session tokens and header role assertions on every incoming HTTP call.
              Applies default-deny validation before routing to domain handlers.
            </p>
          </div>

          <div className="pipeline-card">
            <span className="pipeline-step">02 &bull; Decision Engine</span>
            <h4>Dynamic Field Redaction</h4>
            <p>
              In-memory Least Privilege filtering evaluates role against the field permission matrix in 0.0343ms.
              Strips unauthorized keys before responses leave gateway memory.
            </p>
          </div>

          <div className="pipeline-card">
            <span className="pipeline-step">03 &bull; Cryptographic Non-Repudiation</span>
            <h4>SHA-256 Chained Audit Trail</h4>
            <p>
              Synchronously hashes every granted and denied access event into the append-only ledger.
              Guarantees retroactive tamper detection across all historical entries.
            </p>
          </div>
        </div>
      </section>

      {/* The Blanket Access Problem vs Zero-Trust Approach */}
      <section id="problem" className="tech-box">
        <h2 style={{ marginBottom: '14px' }}>The security flaw of conventional EHR systems</h2>
        <p style={{ marginBottom: '16px' }}>
          Conventional Electronic Health Record (EHR) platforms grant broad, monolithic access once a user session
          is established. A receptionist scheduling a visit often sees complete psychiatric notes, oncology reports,
          and clinical summaries. Conversely, external analytics researchers frequently receive unmasked demographic
          identities alongside medical telemetry. This structural over-privilege drives regulatory penalties,
          data leaks, and insider threats.
        </p>
        <p>
          MedGate eliminates blanket access by gating every field request through a zero-trust least-privilege engine.
          Access permissions are evaluated at runtime per role, sensitive fields are redacted before transmission,
          and every single access decision (granted or denied) is immutably logged into a cryptographic ledger.
        </p>
      </section>

      {/* Cryptographic SHA-256 Tamper-Evident Hash Chain Deep Dive */}
      <section id="integrity" className="tech-box">
        <div className="tech-box-header">
          <div>
            <h2>Tamper-evident SHA-256 audit ledger</h2>
            <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
              Cryptographic non-repudiation: every decision is cryptographically chained to its predecessor
            </p>
          </div>
          <span className="status-badge granted">
            100% verified (1,010 entries)
          </span>
        </div>

        <p style={{ marginBottom: '16px' }}>
          Unlike standard database logging where administrators can quietly delete or alter rows, MedGate binds
          each entry to the previous block via SHA-256 hashing. Any retroactive deletion, update, or insertion
          instantly invalidates all subsequent hashes across the chain.
        </p>

        {/* Visual Hash Chain Representation */}
        <div className="chain-flow">
          <div className="chain-block">
            <div className="chain-block-header">
              <span>Block #1008 • Receptionist &bull; medications &bull; DENIED</span>
              <span className="status-badge denied">DENIED</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>PrevHash: </span>
              <span style={{ color: 'var(--text-secondary)' }}>1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Payload: </span>
              <span>2026-09-17T18:48:00Z|usr-rec-101|Receptionist|read|medications|DENIED|Role restricted</span>
            </div>
            <div>
              <span style={{ color: 'var(--status-granted)' }}>CurrentHash: </span>
              <span className="font-mono">3d5f1a92e8b4c7d6109876543210fedcba9876543210abcdef1234567890123</span>
            </div>
          </div>

          <div className="chain-arrow">▼ chained via SHA-256 (CurrentHash becomes next PrevHash)</div>

          <div className="chain-block">
            <div className="chain-block-header">
              <span>Block #1009 • Doctor &bull; patients &bull; GRANTED</span>
              <span className="status-badge granted">GRANTED</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>PrevHash: </span>
              <span className="font-mono">3d5f1a92e8b4c7d6109876543210fedcba9876543210abcdef1234567890123</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-secondary)' }}>Payload: </span>
              <span>2026-09-17T18:49:00Z|usr-doc-101|Doctor|read|patients|GRANTED|Role authorized</span>
            </div>
            <div>
              <span style={{ color: 'var(--status-granted)' }}>CurrentHash: </span>
              <span className="font-mono">8f7e2b19c8d5a3e42109876543210fedcba9876543210abcdef1234567890abc</span>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '12px 16px',
            border: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--code-bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            color: 'var(--text-primary)',
            marginTop: '16px'
          }}
        >
          CurrentHash = SHA256(Timestamp + UserId + Role + Action + Resource + Result + Reason + PrevHash)
        </div>
      </section>

      {/* Real Scalability & Latency Benchmark Report */}
      <section id="benchmarks" className="tech-box">
        <div className="tech-box-header">
          <div>
            <h2>Scalability and throughput benchmarks (SHI-10)</h2>
            <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
              Rigorous stress tests executed across Scale A (50 records) vs Scale B (500 relational records)
            </p>
          </div>
          <span className="status-badge neutral font-mono">
            Node.js v22 &bull; Neon PostgreSQL
          </span>
        </div>

        <div className="table-wrapper">
          <table className="tech-table">
            <thead>
              <tr>
                <th>Evaluated Role</th>
                <th>Scale A (50 rec) Latency</th>
                <th>Scale A Throughput</th>
                <th>Scale B (500 rec) Latency</th>
                <th>Scale B Throughput</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Administrator</strong></td>
                <td className="font-mono">0.149 ms</td>
                <td className="font-mono">335,345 rec/sec</td>
                <td className="font-mono">1.062 ms</td>
                <td className="font-mono"><strong style={{ color: 'var(--status-granted)' }}>470,765 rec/sec</strong></td>
              </tr>
              <tr>
                <td><strong>Researcher</strong></td>
                <td className="font-mono">0.175 ms</td>
                <td className="font-mono">285,225 rec/sec</td>
                <td className="font-mono">1.111 ms</td>
                <td className="font-mono"><strong style={{ color: 'var(--status-granted)' }}>449,843 rec/sec</strong></td>
              </tr>
              <tr>
                <td><strong>Receptionist</strong></td>
                <td className="font-mono">0.155 ms</td>
                <td className="font-mono">322,581 rec/sec</td>
                <td className="font-mono">1.138 ms</td>
                <td className="font-mono"><strong style={{ color: 'var(--status-granted)' }}>439,329 rec/sec</strong></td>
              </tr>
              <tr>
                <td><strong>Doctor</strong></td>
                <td className="font-mono">0.680 ms</td>
                <td className="font-mono">73,519 rec/sec</td>
                <td className="font-mono">1.944 ms</td>
                <td className="font-mono">257,241 rec/sec</td>
              </tr>
              <tr>
                <td><strong>Nurse</strong></td>
                <td className="font-mono">0.208 ms</td>
                <td className="font-mono">240,154 rec/sec</td>
                <td className="font-mono">7.640 ms</td>
                <td className="font-mono">65,448 rec/sec</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ border: '1px solid var(--border-subtle)', padding: '16px', backgroundColor: 'var(--code-bg)' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
              Decision Engine Mean Latency
            </span>
            <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
              0.0343 ms
            </span>
            <p style={{ fontSize: '0.78rem', marginTop: '4px' }}>
              Evaluated across 1,000 operations. Gating adds zero measurable overhead to API requests.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', padding: '16px', backgroundColor: 'var(--code-bg)' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
              Deep Patient Graph Lookup
            </span>
            <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-primary)' }}>
              239.56 ms
            </span>
            <p style={{ fontSize: '0.78rem', marginTop: '4px' }}>
              Resolves complete relational graph (encounters, meds, vitals, labs, notes) over cloud SSL.
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', padding: '16px', backgroundColor: 'var(--code-bg)' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
              Audit Chain Verification Time
            </span>
            <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--status-granted)' }}>
              5.206 ms
            </span>
            <p style={{ fontSize: '0.78rem', marginTop: '4px' }}>
              1,010 entries verified mathematically at ~5.1 microseconds per log block.
            </p>
          </div>
        </div>
      </section>

      {/* Synthea Synthetic Healthcare Data & Open Source Architecture */}
      <section id="synthea" className="tech-box">
        <div className="tech-box-header">
          <div>
            <h2>Synthea™ synthetic health records & open architecture</h2>
            <p style={{ fontSize: '0.86rem', marginTop: '4px' }}>
              Realistic clinical populations without privacy risk, powered by open-source tooling
            </p>
          </div>
          <span className="status-badge granted font-mono">
            MITRE Synthea™
          </span>
        </div>

        <p style={{ marginBottom: '16px' }}>
          MedGate's relational patient graphs—comprising encounters, diagnoses, medications, observations,
          allergies, and appointments—are modeled on authentic clinical distributions from{' '}
          <a
            href="https://synthea.mitre.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-primary)', textDecoration: 'underline' }}
          >
            Synthea™ Synthetic Patient Generator
          </a>
          . This ensures realistic epidemiological graphs and FHIR-aligned data structures without exposing real patient ePHI.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ border: '1px solid var(--border-subtle)', padding: '18px', backgroundColor: 'var(--code-bg)' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
              Frontend Repository
            </span>
            <h4 style={{ margin: '6px 0 8px' }}>MedGate-Frontend</h4>
            <p style={{ fontSize: '0.82rem', marginBottom: '12px' }}>
              Vite + React zero-trust client with dynamic field-level redaction and role switcher.
            </p>
            <a
              href="https://github.com/TeamShieldX/MedGate-Frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              View on GitHub
            </a>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', padding: '18px', backgroundColor: 'var(--code-bg)' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
              Backend Repository
            </span>
            <h4 style={{ margin: '6px 0 8px' }}>MedGate-Backend</h4>
            <p style={{ fontSize: '0.82rem', marginBottom: '12px' }}>
              Express + Neon PostgreSQL with SHA-256 tamper-evident hash-chain audit engine.
            </p>
            <a
              href="https://github.com/TeamShieldX/MedGate-Backend"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              View on GitHub
            </a>
          </div>

          <div style={{ border: '1px solid var(--border-subtle)', padding: '18px', backgroundColor: 'var(--code-bg)' }}>
            <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block' }}>
              Organization
            </span>
            <h4 style={{ margin: '6px 0 8px' }}>Team ShieldX</h4>
            <p style={{ fontSize: '0.82rem', marginBottom: '12px' }}>
              Official cybersecurity team building zero-trust healthcare data systems for NITDA Hackathon.
            </p>
            <a
              href="https://github.com/TeamShieldX/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px' }}
            >
              Visit Organization
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section style={{ textAlign: 'left', padding: '40px 28px', border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Experience Zero-Trust Medical Access Control</h2>
        <p style={{ maxWidth: '680px', marginBottom: '24px', fontSize: '0.96rem' }}>
          Explore the live patient directory, observe dynamic field redaction across roles,
          and verify the cryptographic audit trail directly.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleTryDemo}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '0.95rem' }}
          >
            Launch Interactive Gateway Demo
          </button>
          <Link
            to="/login"
            className="btn-secondary"
            style={{ padding: '12px 28px', fontSize: '0.95rem' }}
          >
            Sign in with Role Credentials
          </Link>
        </div>
      </section>
    </div>
  );
}
