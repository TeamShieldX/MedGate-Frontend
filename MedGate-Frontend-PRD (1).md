# PRD — MedGate Frontend (Client Interface)

## 1. Purpose

The client interface is what makes RBAC visible and demoable. It's not just a UI on top of the backend, it's the proof that the access-control system actually works: logging in as different roles must visibly change what a user can see and do, and any denial must be shown clearly on screen, not swallowed silently.

Corresponds to Linear issue **SHI-11 — Client Interface** (owned by Habib, with samkiel supporting).

---

## 2. Stack

- **Framework:** React
- **Bundler:** Vite
- **Backend:** consumes the MedGate-Backend API (see SHI-9) — language TBD, but API shape is defined below regardless

---

## 3. Roles in Scope

- Doctor
- Nurse
- Researcher
- Receptionist
- Administrator

Each sees a different slice of patient data. The frontend doesn't decide what's visible, it just reflects what the backend returns per role.

---

## 4. Pages

### 4.1 Login Page
- Simple role-based login (username/role select — doesn't need production-grade auth for a hackathon demo)
- On success, redirect to Patient List

### 4.2 Patient List Page
- Shows patients visible to the logged-in role
- Fields shown vary by role (e.g. Receptionist sees name + appointment only; Doctor sees a fuller summary)
- Click into a patient → Patient Detail

### 4.3 Patient Detail Page
- Full record **as filtered by role**
- Restricted fields must show a clear "access denied" state — this is core to the demo, don't just hide fields silently
- Every view/attempt here should trigger a backend access check (and therefore an audit log entry)

### 4.4 Audit Log / Access History Page
- Visible to Administrator role (at minimum)
- Table of: who, what resource, when, result (granted/denied), reason
- Pulls from `GET /audit-log`

### 4.5 Role Switcher (optional, recommended)
- Quick logout/switch-role affordance so the live demo doesn't require restarting the app between roles

---

## 5. Core Components

| Component | Purpose |
|---|---|
| `RoleSelector` / login form | Role-based login |
| `PatientList` / `PatientCard` | List view, role-filtered |
| `PatientDetailView` | Full record, per-field access gating |
| `AccessDeniedBanner` | Visually obvious denial state — this sells the demo |
| `AuditLogTable` | Access history view |
| `RoleSwitcher` (optional) | Fast role changes during demo |

---

## 6. API Dependency (from MedGate-Backend, SHI-9)

- `POST /auth/login`
- `GET /patients`
- `GET /patients/:id`
- `GET /audit-log`

Frontend work can start against a mocked version of these responses before the backend is ready — worth agreeing on response shapes early with whoever owns SHI-9 so both sides build in parallel instead of blocking on each other.

---

## 7. Acceptance Criteria

- Logging in as different roles visibly changes what's shown, not just what's clickable
- A denied access attempt is clearly shown on screen (not a silent fail or blank space)
- Audit log page reflects real backend data
- Demo-ready: an unscripted person could log in as 2-3 different roles and see the difference immediately

---

## 8. Out of Scope (for this build)

- Production-grade authentication (OAuth, password hashing, sessions) — a simplified role-select login is sufficient for the hackathon demo
- Mobile responsiveness — nice to have, not required
- Polished visual design — functional and clear beats polished but incomplete, given the 19-day window

---

*Last updated: 2 September 2026*
