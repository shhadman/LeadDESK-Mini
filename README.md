# LeadDesk Mini CRM

A lightweight Lead Management CRM built as part of the Digital Heroes Technical Assessment (Task B).

The application allows visitors to submit leads through a public landing page while providing an authenticated admin dashboard to manage those leads.

---

# Live Demo

Public Website:
https://YOUR-VERCEL-URL.vercel.app

Admin Login:
https://YOUR-VERCEL-URL.vercel.app/login

## Test Credentials

Email:
admin@gmail.com

Password:
********

---

# Tech Stack

Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS

Backend Services
- Supabase Authentication
- Supabase PostgreSQL Database

Deployment
- Vercel

---

# Features

## Public Website

- Responsive landing page
- Lead enquiry form
- Form validation
- Stores submissions directly in Supabase
- Modern UI

## Admin Dashboard

- Secure login using Supabase Authentication
- Protected admin routes
- View all submitted leads
- Search by Name or Email
- Filter leads by Status
- Update lead status
- Logout functionality

---

# Project Structure

src/

components/
- Navbar
- Hero
- LeadForm
- Footer

pages/
- Home.jsx
- Login.jsx
- Admin.jsx

services/
- supabase.js

App.jsx

---

# Data Model

The project uses a single table named:

leads

Columns:

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| created_at | Timestamp | Submission Time |
| name | Text | Customer Name |
| email | Text | Customer Email |
| budget | Text | Customer Budget |
| message | Text | Customer Requirement |
| status | Text | Current Lead Status |

Possible Status Values

- New
- Contacted
- Qualified
- Closed

---

# Authentication Approach

The application uses Supabase Authentication instead of hardcoded credentials.

Authentication Flow

1. User opens `/login`
2. Credentials are verified using:

```javascript
supabase.auth.signInWithPassword()
```

3. On successful login Supabase creates a secure authenticated session.

4. Protected routes verify the session before rendering the Admin Dashboard.

Unauthenticated users attempting to access `/admin` are automatically redirected to the Login page.

---

# Authorization

The application uses route protection to prevent unauthenticated users from accessing the Admin Dashboard.

Current Authorization Flow

Visitor

↓

Login Required

↓

Authenticated Session

↓

Access Admin Dashboard

Only authenticated users with valid credentials can access the dashboard.

For a production-scale CRM with multiple users, role-based authorization (Admin, Employee, Viewer) would be recommended.

---

# Lead Flow

Visitor

↓

Fill Lead Form

↓

Submit

↓

Supabase Database

↓

Admin Dashboard

↓

Search / Filter

↓

Update Lead Status

---

# Security

Implemented

- Supabase Authentication
- Protected Routes
- Session-based Authentication
- Row Level Security (RLS)
- Environment Variables
- No hardcoded passwords
- Secure API communication over HTTPS

---

# Deployment

Frontend

- Vercel

Backend

- Supabase

The frontend communicates directly with Supabase APIs without requiring a custom backend server.

---

# Local Setup

Clone Repository

```bash
git clone https://github.com/yourusername/leaddesk-mini.git
```

Install Dependencies

```bash
npm install
```

Create

```
.env
```

Add

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL

VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Run

```bash
npm run dev
```

Build

```bash
npm run build
```

---

# Future Improvements

- Role-Based Authorization (RBAC)
- Admin User Management
- Pagination
- Email Notifications
- Lead Notes
- Lead Assignment
- Dashboard Analytics
- CSV Export
- Activity Logs

---

# AI Usage

AI was used as a development assistant throughout this project.

It was primarily used to:

- Understand Supabase Authentication
- Learn Protected Route implementation
- Improve React component structure
- Refactor code where appropriate
- Explain architectural concepts

All functionality, project integration, testing, debugging, and implementation decisions were completed and verified manually.

---

# Credits

Built for the Digital Heroes Training Task.
