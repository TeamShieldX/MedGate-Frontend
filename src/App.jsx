import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import PatientListPage from './pages/PatientListPage';
import PatientDetailPage from './pages/PatientDetailPage';
import AuditLogPage from './pages/AuditLogPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/patients" replace />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="audit-log" element={<AuditLogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
