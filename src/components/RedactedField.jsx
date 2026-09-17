import React from 'react';

/**
 * Redaction Visibility Component
 * Displays a visibly struck-through / restricted placeholder with lock icon and reason.
 */
export default function RedactedField({ reason = 'Hidden — Restricted role', fieldName = null }) {
  return (
    <span
      className="redacted-placeholder"
      title={`Security Guarantee: This field is restricted by role access rules (${reason})`}
      aria-label={`Hidden field: ${reason}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="12"
        height="12"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      <span className="redacted-line">
        {fieldName ? `[${fieldName}]` : '••••••••'}
      </span>
      <span>— {reason}</span>
    </span>
  );
}
