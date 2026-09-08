import React from 'react';

export default function AccessDeniedBanner({ reason }) {
  return (
    <div className="access-denied-banner">
      <strong>⛔ ACCESS DENIED</strong>
      <div>{reason || 'You do not have permission to access this field/resource.'}</div>
    </div>
  );
}
