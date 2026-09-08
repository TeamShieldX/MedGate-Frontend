# MedGate-Frontend

MedGate Frontend is the client interface for demonstrating Role-Based Access Control (RBAC) across patient records and audit logs.

> **Note:** This repository contains **scaffolding only**. Page logic, full RBAC filtering rules, and authentic backend integration with MedGate-Backend (SHI-9) are the next steps per the MedGate Frontend PRD.

---

## 🛠️ Technology Stack

- **Framework:** React 18 (JavaScript)
- **Bundler:** Vite
- **Routing:** React Router DOM v6
- **Styling:** Minimal Functional CSS

---

## 📁 Folder Structure

```text
MedGate-Frontend/
├── public/
├── src/
│   ├── api/ or services/
│   │   └── api.js              # Fetch-based API client stubs with mock data
│   ├── components/
│   │   ├── AccessDeniedBanner.jsx  # Visual denial banner component
│   │   ├── AuditLogTable.jsx       # Access history table
│   │   ├── Layout.jsx              # Header & global navigation layout
│   │   ├── PatientCard.jsx         # Summary card for patient items
│   │   ├── PatientDetailView.jsx   # Detailed patient record view
│   │   ├── PatientList.jsx         # List container component
│   │   ├── RoleSelector.jsx        # Role dropdown/login selector
│   │   └── RoleSwitcher.jsx        # Header quick role switcher for demoing
│   ├── context/
│   │   └── AuthContext.jsx     # Context tracking logged-in role state
│   ├── pages/
│   │   ├── AuditLogPage.jsx    # /audit-log route page
│   │   ├── LoginPage.jsx       # /login route page
│   │   ├── PatientDetailPage.jsx # /patients/:id route page
│   │   └── PatientListPage.jsx # /patients route page
│   ├── App.jsx                 # Main application routes setup
│   ├── index.css               # Global functional styles
│   └── main.jsx                # Application root entrypoint
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## 🔄 Available Routes

- `/login` — Role selection login page
- `/patients` — Patient list page
- `/patients/:id` — Patient detail page with access control preview
- `/audit-log` — Audit log access history page (Administrator access preview)
