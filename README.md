# Helping Hand - NGO Donation Platform

**Helping Hand** is a comprehensive web application designed to streamline the process of charitable donations. It connects donors with a transparent platform where they can contribute to causes and track their impact, while providing powerful tools for administrators to manage and analyze donation data.

##  Project Overview

The platform is built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) and features a Role-Based Access Control (RBAC) system to ensure secure and appropriate access for different user types.

### Key Goals
- **Transparency**: Donors can view their donation history and real-time status.
- **Efficiency**: Admins have access to visual analytics and reporting tools.
- **Security**: Robust authentication and role management (Donor, Admin, Superadmin).

##  Features

###  For Donors
- **Easy Registration**: Simple sign-up process to get started instantly.
- **Secure Donations**: Simulate donation payments (Sandbox environment).
- **History Tracking**: View a personal log of all past contributions with status updates.

###  For Admins
- **Analytics Dashboard**: Visual charts showing donation trends and totals (in ₹).
- **Recent Activity**: Real-time list of the latest donations.
- **Data Export**: One-click **CSV Download** for offline reporting.
- **Contribution**: Admins can also participate by making donations.
- *Note: Admin accounts require Superadmin approval before becoming active.*

###  For Superadmins
- **Master Control**: Oversee the entire platform.
- **Admin Management**: Approve or Reject new Admin registration requests.
- **Global Insights**: View analytics for all donations system-wide.
- **Data Export**: Full access to download donation records.

##  Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React (Icons), Recharts (Data Visualization).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB.
- **Authentication**: JWT (JSON Web Tokens).

##  Setup & Installation

Follow these steps to run the project locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally on port 27017 or use a cloud URI)

### 2. Installation
**Clone the repository:**
```bash
git clone <repository-url>
cd ngo
```

**Install Server Dependencies:**
```bash
cd server
npm install
```

**Install Client Dependencies:**
```bash
cd ../client
npm install
```

### 3. Database Seeding (Important)
To create the **Superadmin** account, run the seeder script once:
```bash
cd server
node seeder.js
```

### 4. Running the App
Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
*Server runs on `http://localhost:5000`*

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
*Client runs on `http://localhost:5173`*

##  Login Credentials

| Role | Email | Password | Notes |
| :--- | :--- | :--- | :--- |
| **Superadmin** | `superadmin@ngo.com` | `superadmin123` | Pre-created via seeder. |
| **Admin** | *(Register manually)* | *(Your Choice)* | Must be approved by Superadmin. |
| **Donor** | *(Register manually)* | *(Your Choice)* | Instant access. |

---
*Developed as a project to facilitate helping others through technology.*


