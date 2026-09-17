import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PatientListPage from './pages/PatientListPage';
import PatientDetailPage from './pages/PatientDetailPage';
import AuditLogPage from './pages/AuditLogPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DashboardOverviewPage from './pages/DashboardOverviewPage';
import SessionInfoPage from './pages/SessionInfoPage';

import ScrollToTopAndHash from './components/ScrollToTopAndHash';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTopAndHash />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="overview" element={<DashboardOverviewPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="patients" element={<PatientListPage />} />
          <Route path="patients/:id" element={<PatientDetailPage />} />
          <Route path="audit-log" element={<AuditLogPage />} />
          <Route path="session" element={<SessionInfoPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
